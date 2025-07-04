---
title: 現行バージョンからExchange Server SEへのアップグレード
date: 2024-10-15 10:00:00
lastupdate: 2025-07-04 15:00:00
tags: Exchange
alias: Upgrading your organization from current versions to Exchange Server SE/index.html
---

<p style="background:#66FF99"><b>2025 年 7 月 1 日更新 : Exchange SE が<a href="https://jpmessaging.github.io/blog/exchange-server-subscription-edition-se-is-now-available/">公開されました</a>。本記事は最新の情報に基づき更新されています。</b></p>

Made relevant updates to this blog post.

※ この記事は、[Upgrading your organization from current versions to Exchange Server SE](https://techcommunity.microsoft.com/t5/exchange-team-blog/upgrading-your-organization-from-current-versions-to-exchange/ba-p/4241305) をもとに日本のお客様向けに抄訳したものです。最新の情報は元の Blog を参照してください。

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームです。

2024 年 5 月に、私たちは [Exchange Server Roadmap Update](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742) と今後の計画を共有しました。この重要な発表以来、お寄せ頂いた質問の中で今後の移行計画に役立ちそうな質問とその回答を本記事にまとめました。
*抄訳版:「[Exchange Server のロードマップの更新](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/) 」

この投稿で使用される用語をいくつか紹介します。

- CU は累積更新 (Cumulative Update) を意味します。
- SU はセキュリティ更新 (Security Update) を意味します。
- CY は暦年 (Calendar Year) を意味します。
- H1 / H2 は暦年の上半期 / 下半期 (First half / Second half) を意味します。
- RTM はソフトウェア製品の最初のリリース (Release to Manufacturing) を指します。
- 共存 (Coexistence) は、同じ Exchange 組織内で共存できるバージョンを指します。

Exchange Server 2016 および Exchange Server 2019 から Exchange Server Subscription Edition (SE) へのアップグレード パスは、いくつかの理由でこれまでとは異なります。本投稿ではさまざまなシナリオ、タイムライン、および取るべきアクションの詳細を最初に記載し、この投稿の最後に FAQ を用意して役立つ回答を提供します。

これらの変更は、オンプレミス Exchange Server のみの状態、Exchange ハイブリッド展開の状態、または管理ツールのみの状態 (受信者管理用) であるかどうかに関係なく、**すべての Exchange Server を利用している環境** が対象となります。


## リリース内容と時期

今後リリースが予定されている Exchange Server のバージョンについてご紹介します。

- Exchange Server 2019 CU15 (リリースされました)
- Exchange Server SE RTM ([リリースされました](/blog/exchange-server-subscription-edition-se-is-now-available/))
- Exchange Server SE CU1
- Exchange Server SE CU2

これらのリリースと以前のバージョンとの共存に関する影響をまとめた表を以下に示します。

| 名称                      | 提供日 | 詳細 | 共存 |
| -------------------------- | ---- | ------ | ----- | 
| Exchange Server 2019 CU15 | 2025 年上半期 [リリースされました](/blog/released-2025-h1-cumulative-update-for-exchange-server/) | Exchange Server 2019 の 最終 CU：Exchange Server SE RTM と同等のコード (Exchange Server SE RTM 前にリリースされた SU および HU を除く) です。| Exchange Server 2013 との共存はできません (CU15 のセットアップによってにブロックされます)。|
| Exchange Server SE RTM | [リリースされました](/blog/exchange-server-subscription-edition-se-is-now-available/) | Exchange Server 2019 CU14 または CU15 からのインプレース アップグレードを可能にします。 Exchange Server 2019 CU15 + CU15 以降にリリースされた SU および HU と同等のコード (新機能やその他のコード変更はありません) です。| Exchange Server 2013 との共存はできません (RTM のセットアップによってブロックされます)。|
| Exchange Server SE CU1 | 2026 年上半期 | Exchange Server SE の最初の機能更新です。| 変更はありません。引き続き Exchange Server 2016, 2019 との共存が可能です。 |
| Exchange Server SE CU2 | 2026 年下半期 | Exchange Server SE の開発プロセスの継続的な更新です。| Exchange Server 2013、Exchange Server 2016、Exchange Server 2019 との共存はできません（CU2 のセットアップによりインストールがブロックされます）。|

## Exchange Server のバージョンごとのサポート状況

Exchange Server の 最後の 3 つのバージョンとそのライフサイクル、および上記のリリースによる影響は、以下の表に詳述されています。

| Exchange バージョン | サポート終了日 | Exchange 2019 CU15 リリース時点のサポート状況 | Exchange Server SE RTM リリース時点のサポート状況 | Exchange Server SE CU1 リリース以降のサポート状況 |
| --- | --- | --- | --- | --- |
| Exchange Server 2013 (すべての CU) | [2023 年 4 月 11 日](https://learn.microsoft.com/lifecycle/products/exchange-server-2013) | サポートされません | サポートされません | サポートされません |
| Exchange Server 2016 CU23 | [2025 年 10 月 14 日](https://learn.microsoft.com/lifecycle/products/exchange-server-2016) | 延長サポート | 延長サポート | サポートされません |
Exchange Server 2019 CU14/CU15 | [2025 年 10 月 14 日](https://learn.microsoft.com/lifecycle/products/exchange-server-2019) | 延長サポート | 延長サポート | サポートされません |

他のすべてのバージョンとビルドの Exchange Server はサポートされていません。


## 同じ組織内での異なるバージョンの共存

私たちは、同じ組織内での古いバージョンとの共存に影響を与える Exchange Server の変更を行っています。これまでは、新しいバージョンの Exchange Server がある組織内で、古い (サポートされていない) バージョンの Exchange Server を引き続き実行することが可能でした。これが 2 つの非常に重要な方法で変更されます。

- Exchange Server 2019 CU15 および Exchange Server SE RTM のセットアップでは、Exchange Server 2013 との共存がブロックされます。
- Exchange Server SE CU2 のセットアップでは、すべてのサポートされていないバージョン (例：Exchange Server 2013、Exchange Server 2016、Exchange Server 2019) との共存がブロックされ、Exchange Server SE とのみ共存が許可されます。

2025 年 10 月 14 日に Exchange Server SE 以外のすべてのバージョンの Exchange Server はサポートされなくなり、Exchange Server SE CU2 では Exchange Server SE 以外のバージョンとの共存ができなくなります。以下の表に詳述されているように、CU2 (またはそれ以降) をインストールするには、まず組織内のすべての古いバージョンの Exchange Server を廃止して削除する必要があります。

- <b>共存対応表</b>

|  | Exchange 2019 CU14 | Exchange 2019 CU15 | Exchange SE RTM | Exchange SE CU1 | Exchange SE CU2 |
| --- | --- | --- | --- | --- | --- |
| <b>Exchange 2013 (すべての CU)</b> | 可能<br>(非サポート)| 不可<br>(ブロックされる) | 不可<br>(ブロックされる) | 不可<br>(ブロックされる) | 不可<br>(ブロックされる) |
| <b>Exchange 2016 CU23</b> | 可能 | 可能 | 可能 | 可能<br>(非サポート) | 不可<br>(ブロックされる) |
| <b>Exchange 2019 CU14/CU15</b>  | 可能 | 可能 | 可能 | 可能<br>(非サポート) | 不可<br>(ブロックされる) |


## 混在バージョン組織から Exchange Server SE 組織への移行

現在の状態から Exchange Server SE のみに移行するには、いくつかのオプションがあります。現時点では、Exchange Server 2016 CU23 および/または Exchange Server 2019 CU13/CU14 を実行している必要があります。Exchange Server 2016 を CU23 より前のバージョンで実行している場合は、直ちに CU23 に更新する必要があります。Exchange Server 2019 をご利用のお客様は CU14 を実行することをお勧めしますが、CU13 もサポートしています。Exchange Server の古いバージョン (例：Exchange Server 2013 以前) を実行している場合は、Exchange Online に移行するか、最新の CU を使用して Exchange Server 2019 にアップグレードすることで、そのインフラストラクチャを廃止する必要があります。

Exchange Server 2016 および Exchange Server 2019 から Exchange Server SE への移行には、2 つのアップグレード方法があります。

- レガシー アップグレード：Exchange Server の新しいメジャー バージョンに移行する従来の方法です。これには、新しいサーバーを組織に導入し、古いサーバーから新しいサーバーにすべてのメールボックスとリソースを移動し、古いサーバーをアンインストールする必要があります。レガシー アップグレードは、Exchange Server 2016 から Exchange Server 2019 への移行、Exchange Server 2016 から Exchange Server SE への移行に必要です。また、新しいハードウェアや Windows Server の新しいバージョンに移行する際にも使用されます。
- インプレース アップグレード：Exchange Server の新しいバージョンにアップグレードする新しい方法です。これは CU のインストールと同じであり、Exchange 2019 CU14 / CU15 から Exchange Server SE へのアップグレードにおいてのみサポートされます。

現在ご利用中の Exchange Server のバージョンから Exchange Server SE へ移行するために必要な手順をまとめた表を以下に示します。こちらは、先述の表を若干更新したものです。

| 既存の Exchange Server | Exchange Server 2019 CU15 ([リリースされました](https://jpmessaging.github.io/blog/released-2025-h1-cumulative-update-for-exchange-server/)) | Exchange Server SE RTM ([リリースされました](/blog/exchange-server-subscription-edition-se-is-now-available/)) |
| --- | --- | --- |
| Exchange Server 2013 (すべての CU) | 組織内に共存することはサポートされず、セットアップ実行時にブロックされます。<br><br>今すぐ Exchange Server 2019 CU14 へ従来のアップグレードを行い、Exchange Server 2013 を撤去してから Exchange Server 2019 CU15 を適用します。 | 組織内に共存することはサポートされず、セットアップ実行時にブロックされます。<br><br>今すぐ Exchange Server 2019 CU14 へ従来のアップグレードを行い、Exchange Server 2013 を撤去してから、Exchange Server 2019 CU15 を適用します。<br>その後、Exchange Server SE にインプレース アップグレードを行います。 |
| Exchange Server 2016 CU23 | Exchange Server 2019 CU15 へ従来のアップグレードを行います。 | Exchange Server 2019 CU15 へ従来のアップグレードを行います。<br>その後、Exchange Server SE にインプレース アップグレードを行います。<br><br>または、Exchange SE RTM/CU1 サーバーを組織に参加させ、メールボックスを移行した後、Exchange Server 2016 を Exchange SE CU2 より前に廃止・削除します。 |
| Exchange Server 2016 CU22 以前 | このバージョンはサポートされません。<br><br>今すぐ Exchange Server 2019 CU15 へ従来のアップグレードを行うか、または、今すぐ Exchange Server 2016 CU23 を適用し、Exchange Server 2019 CU15 へ従来のアップグレードを行います。| このバージョンはサポートされません。<br><br>今すぐ Exchange Server 2016 CU23 を適用し、Exchange Server 2019 CU15 へ従来のアップグレードを行います。<br>その後 Exchange Server SE にインプレース アップグレードを行います。<br><br>または、Exchange SE RTM/CU1 サーバーを組織に参加させ、メールボックスを移行した後、Exchange Server 2016 を Exchange SE CU2 より前に廃止・削除します。 |
| Exchange Server 2019 CU14/CU15 | Exchange Server SE RTM 同等の動作を確認したい場合は Exchange Server 2019 CU14 に Exchange Server 2019 CU15 を適用します。 | Exchange Server SE にインプレース アップグレードします。 |
| Exchange Server 2019 CU13 以前 | このバージョンはサポートされません。<br><br>今すぐ Exchange Server 2019 CU15 を適用します。 |このバージョンはサポートされません。<br><br>今すぐ Exhcnage Server 2019 CU15 を適用します。<br>その後、Exchange Server SE にインプレース アップグレードを行います。 |


下図はいつ何をすべきかのタイムラインをまとめたものです。

![](screenshot003.png)
# FAQs

2024 年 5 月にロードマップを発表して以来、お寄せいただいた質問の一部を以下に紹介します。

**Exchange Server SE RTM ではサーバー ロールやエディション、前提条件に変更は発生しますか。**

いいえ。Exchange Server SE RTM では、Exchange Server 2019 と同じサーバー ロール、エディション、前提条件となります。

**Exchange Server SE に関して、パフォーマンスやサイジングといったアーキテクチャに関するガイダンスに変更はありますか。**

いいえ。Exchange Server SE のサイジングやスケーリングおよび展開に関するガイダンスに関しては、Exchange Server 2019 と同じです。

**Exchange Server SE から廃止されたり削除される機能はありますか。**

Exchange Server SE CU1 以降までは、機能の削除は行われません。

**新機能がないのに、なぜ以前のバージョンから Exchange Server SE RTM にアップグレードする必要があるのでしょうか。**

Exchange Server 2016 および Exchange Server 2019 は、2025 年 10 月 14 日 にサポートが終了します。 Exchange Server 2019 からの迅速かつ容易なインプレース アップグレードを可能にするため、新しい機能の追加を Exchange Server 2019 CU15 に前倒ししたり、Exchange Server SE CU1 以降に追加するようにしました。これにより、Exchange Server SE RTM は、新しいライフサイクルとサポート ポリシーを導入するブランディング アップデートという位置付けになりました。サポートされた方法で Exchange Server SE CU1 以降にアップグレードするためのパスとしてお客様のサーバーを Exchange Server SE RTM に移行することが必要となります。Exchange SE CU2 がリリースされると、それ以前のバージョンはすべてサポート対象外となります。Exchange Server SE CU1 以降にもさらに多くの機能が予定されており、Exchange Server の開発は継続して行われます。

**Exchange Server SE のライセンス要件についてもっと明確にしていただけますか。**

Exchange Server SE のライセンスは、1 つの例外を除いて Exchange Server 2019 と同じです。Microsoft は、ライセンスのみの購入は提供しなくなりました (Exchange Server 2019 で使用されるライセンス モデルの詳細については、[Microsoft Exchange Server licensing and FAQ](https://www.microsoft.com/microsoft-365/exchange/microsoft-exchange-server-licensing-licensing-overview) を参照してください)。

Exchange Server SE の場合、必要なサーバー ライセンスと CAL を購入するだけでなく、お客様はアクティブなサブスクリプションも維持する必要があります。つまり、以下のいずれかを購入する必要があります。

- Exchange Server SE にアクセスするすべてのユーザーとデバイスを対象としたクラウド サブスクリプション ライセンス (例えば、Microsoft 365 E3 または E5 ライセンスが該当します)
- Exchange Server SE サーバー ライセンスと CAL に [Software Assurance](https://www.microsoft.com/licensing/licensing-programs/software-assurance-default) (SA) を追加したもの

Microsoft 365 E3/E5 以外のクラウド サブスクリプション ライセンスでも要件を満たしますが、E3/E5 を挙げたのは、追加料金なしで無制限の Office Server ライセンスを提供する拡張使用権が含まれているためです (詳細は [Microsoft Product Terms](https://www.microsoft.com/licensing/terms/productoffering/Microsoft365/EAEAS) を参照してください)。

クラウド サブスクリプション ライセンスを購入しない場合は、購入するサーバー ライセンスおよび CAL にはソフトウェア アシュアランスが必要です。

ライセンス オプションをまとめると以下のようになります (いずれかを満たす必要があります):

- **ユーザー向けの対象クラウド サブスクリプション ライセンス (例:Microsoft 365 E3/E5):** この方法を選択する場合は、Exchange Server SE にアクセスするすべてのユーザーが E3 または E5 ライセンスを保有している必要があります。
- **ライセンス (サーバーおよび CAL) + Exchange Server 2016/2019 の SA:** Exchange Server SE および更新プログラムへアクセスして使用するには SA を持つ必要があります。
- **ライセンス (サーバーおよび CAL) + Exchange Server SE 用の SA (リリース後)** リリース後は Exchange Server SE 用の SA を持つことでも、Exchange Server SE および更新プログラムへアクセスして使用することができます。

**Exchange Server SE をダウンロードし、プロダクト キー (入手可能な場合) を入手するにはどうすればよいですか。**

ボリューム ライセンス (VL) 契約でライセンスされたソフトウェア製品 (Exchange Server 2019 など) は、以前はボリューム ライセンス サービス センター (VLSC) からダウンロードすることができました。しかし、レガシーの VLSC は終了しており、これらの配布は Microsoft 365 管理センターに移りました。Exchange Server SE (およびその他の VL ソフトウェア) を購入するお客様は、Microsoft 365 管理センターから製品をダウンロードし、プロダクト キーを取得します。詳細については、[Administering Volume Licensing Frequently Asked Questions](https://learn.microsoft.com/licensing/vlsc-faqs-home-page) を参照してください。  
また、Exchange Server SE は Microsoft ダウンロード センターからも入手可能となります。Hotfix やセキュリティ更新プログラムの配布方法についても変更はありません。

**Exchange Server Subscription Edition という名称をふまえると、定期的なオンライン ライセンス確認が必要となりますか。**

いいえ、有効な Exchange Server SE プロダクト キーが入力されると、追加のライセンス チェックは行われません。上記で案内した通りサブスクリプションを継続してご契約いただければ、ライセンス コンプライアンスが維持され、Microsoft 365 管理センターのボリューム ライセンス ページから将来の Exchange Server SE アップデートを入手することが可能です。

**弊社では、ソフトウェア アシュアランス (SA) なしの Exchange Server 2016 のサーバー ライセンスと CAL を保有しています。Exchange Server 2019 のサポートが 2025 年に終了する予定であるにもかかわらず、なぜ Exchange Server 2019 の SA を購入して今すぐアップグレードする必要があるのでしょうか。**

Exchange Server 2016 から Exchange Server 2019 への移行は、新しいサーバーの導入とメールボックスの新しいバージョンへの移行を必要とするレガシー アップグレードと呼ばれるプロセスが必要なります。現在 Exchange Server 2016 を利用しているお客様にとって、Exchange Server 2019 へのアップグレードは、Exchange Server SE が利用可能になる前の最後のレガシー アップグレードを開始 (および完了) できることを意味します。そして Exchange Server 2016 から Exchange Server SE へのレガシー アップグレードを用いた直接の移行を待たずに、今すぐそのアップグレードを開始することができる方法となります (くわえて、Exchange Server 2019 へのアップグレード進めることを強く推奨します)。Exchange Server 2019 にアップグレードすれば、Exchange Server SE がリリースされたらすぐに Exchange Server SE へのインプレース アップグレードを行うことができます。Exchange Server 2019 に今すぐ移行すれば、Exchange Server SE へのアップグレードの準備に多くの時間を確保することができます。

**Exchange Server SE にはハイブリッド構成をとるための無料ライセンスが含まれるのでしょうか。**

はい。以前のバージョンと同様に、Exchange Server SE では、ハイブリッド構成ウィザード (HCW) を介して、ハイブリッド用途向けの無料ライセンスが引き続き提供されます。ただし、以前のバージョンとは異なり、Exchange Server のアップデートを取得するには、このライセンスに対して SA を購入するか、要件を満たすクラウド サブスクリプション ライセンスを取得する必要があります。ハイブリッド ライセンスは受信者管理のみを目的としたものであることにご注意ください。メールボックスをホストする場合やオンプレミスでエッジ トランスポート サーバーを利用される場合、SMTP リレー サーバーをオンプレミスで利用する場合は、引き続き Exchange Server ライセンスが必要です。[この FAQ](https://www.microsoft.com/en-us/microsoft-365/exchange/microsoft-exchange-licensing-faq-email-for-business)  をご覧ください。また、Exchange Server 2019 と同様に、PowerShell と [Exchange 管理ツールを使用することで、Exchange Server を実行する必要なく受信者を管理できる](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools)ため、その場合にはハイブリッド ライセンスは不要になります。

**Exchange Server 2016 および Exchange Server 2019 のサポート期限の延長や延長サポートの提供、拡張セキュリティ更新プログラム (ESU) の提供は予定されていますか。**

Exchange Server 2016 または Exchange Server 2019 のサポート終了日を延長することはありません。また、どちらのバージョンに対しても現在予定されている以上の延長サポートや ESU を提供することはありません。私たちは、既存の Exchange 2019 を利用されているお客様がシームレスにアップグレードできるよう、Exchange Server SE のリリースを準備することに集中しています。引き続きオンプレミスの Exchange Server をご利用されるお客様においては、できるだけ早く Exchange Server 2019 にアップグレードされることを強くお勧めします。

**Exchange Server SE のパブリック ベータ版は提供されますか。**

いいえ。Exchange Server SE のパブリック ベータ版は提供されません。[TAP プログラム](https://techcommunity.microsoft.com/t5/exchange-team-blog/open-enrollment-for-exchange-server-2019-tap/ba-p/3421627)のメンバーのお客様は、Exchange Server SE のリリースに早期アクセスできます。ただし、[以前にお知らせ](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742) ([抄訳版](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/)) したとおり、Exchange Server SE RTM は Exchange 2019 CU15 (およびその間にリリースされたすべての SU) と同等のコードが使われます。言い換えますと、TAP プログラムに参加していないお客様においても、組織内で Exchange 2019 CU15 を展開することで Exchange Server SE RTM の動作を早期に確認することができます。

**Exchange Server SE では、Exchange がすでにインストールされている場合でも Windows Server OS のインプレース アップグレードが可能となりますでしょうか。**

いいえ。Exchange Server 上の Windows OS のアップグレードはサポートされておらず、今後もサポートされる予定はありません。このようなご要望あることは承知しており、現在も評価を行っている際中です (現時点では発表できるものはありません)。新しいサーバーを構築されるお客様には、Exchange Server をインストールする前に、最新の Windows OS をインストールすることをお勧めします (Exchange 2019 CU15 がリリースされた後は、Windows Server 2025 もサポートされる OS になります)。


**バージョンの共存に関して、今までは同一組織内での N-2 (現在および過去2つのバージョン) の Exchange Server の共存がサポートされていました。なぜ Exchange Server SE でこれが変更されるのでしょうか。**

Exchange Server SE の RTM リリース後、間もなく Exchange Server 2016 と Exchange Server 2019 がサポート終了を迎えるためです。Exchange Server SE CU1 のリリースにより、Exchange Server SE が唯一のサポート対象バージョンとなることにくわえて他のすべてのバージョンがサポート対象外となるため、N-2 が適用されなくなります。
