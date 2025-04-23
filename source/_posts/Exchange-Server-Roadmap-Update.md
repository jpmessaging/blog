---
title: Exchange Server ロードマップの更新
date: 2024-07-25
lastupdate: 2025-04-23
tags: Exchange
---


※ この記事は、[Exchange Server Roadmap Update](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742) をもとに日本のお客様向けに抄訳、再編集したものです。最新の情報は元の Blog を参照してください。

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームです。

2024 年 5 月 7 日に公開された [Blog](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742) 記事では今後のオンプレミス Exchange Server を運用する上での重要な情報が公開されており、主に以下の点についてアナウンスがありました。  

- Exchange Server 2019 に対して最後の CU となる CU15 をリリースします。公開時期は 2024 年後期を予定しています。(更新 : CU15 が[リリースされました](https://jpmessaging.github.io/blog/released-2025-h1-cumulative-update-for-exchange-server/))  
- Exchange Server Subscription Edition (Exchange Server SE) の最初のリリース (RTM バージョン) を [2025 年 7 月](https://techcommunity.microsoft.com/blog/microsoft_365blog/licensing-and-pricing-updates-for-on-premises-server-products-coming-july-2025/4400174)に公開を予定しています。
- Exchange Server SE の RTM に続く、最初の更新プログラムである CU1 を 2025 年の終わり頃に公開予定です。   

# サポート チームからの推奨事項

今後も Exchange Server をご利用になる場合には、現在運用中のすべての Exchange Server を現時点で最新である Exchange Server 2019 CU14 に移行していただき、Exchange Server SE のリリースに備えていただくことを強く推奨いたします。

多くのお客様に [Exchange Server 2016](https://learn.microsoft.com/ja-jp/lifecycle/products/exchange-server-2016) および [Exchange Server 2019](https://learn.microsoft.com/ja-jp/lifecycle/products/exchange-server-2019) をご利用いただいておりますが、どちらのバージョンも 2025 年 10 月 14 日にサポート終了となります。

サポート終了時期間近に上記の次期バージョンである Exchange Server SE RTM がリリースされることとなります。Exchange Server SE のインプレース アップグレードは通常の CU 適用と同じ流れで実施できることや、Exchange Server 2019 CU15 からの主たる機能更新が存在しないことから、インプレース アップグレード自体で影響が生じるシナリオは稀かと思います。
一方、その後にリリース予定である Exchange Server SE CU1 以降では下位バージョンとの共存環境をサポートしておりません。言い換えれば、その時点ですべてのサーバーが Exchange Server SE RTM 以上である必要があり、Exchange Server SE CU1 への移行までを視野に入れると、出来る限りはやく Exchange Server SE への移行を完了し、加えて Exchange Server 2016 / Exchange Server 2019 の撤去を行う必要があります。

スムーズに Exchange Server SE RTM へアップグレード、および Exchange Server SE CU1 への移行を行うために、まずはすべてのサーバーを Exchange Server 2019 CU14 (現時点で最新) へ移行し、準備いただくことをご検討ください。 

- **Exchange Server 2016 をご利用の場合:** すぐに Exchange Server 2019 CU14 へ移行し、CU15 のリリース後に CU15 を適用し、Exchange Server SE へのインプレース アップグレードをします。

- **Exchange Server 2019 をご利用の場合:** 現時点で最新の CU14 を適用した上で、CU15 のリリース後に CU15 を適用し、Exchange Server SE へのインプレース アップグレードをします。

# Exchange Server 2019 CU15 について

Exchange Server 2019 CU15 では、Exchange Server SE の RTM リリースをサポートするための新機能と変更が導入されます。

## Exchange Server 2019 CU15 の新機能

Exchange Server 2019 CU15 にはいくつかの新しい機能が追加されています。  

- **TLS1.3 のサポート:** 従来の暗号化アルゴリズム方式よりもセキュリティの観点で強く、改善されたバージョンがサポートされるようになります。

- **Exchange 管理センター (EAC) の証明書の管理機能:** Exchange Server 2019 CU12 / Exchange Server 2016 CU23 以降では、[こちら](https://support.microsoft.com/ja-jp/topic/exchange-server-powershell-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%83%AC%E3%83%83%E3%83%88%E3%81%A8-unc-%E3%83%91%E3%82%B9%E5%85%A5%E5%8A%9B%E3%81%AEexchange%E7%AE%A1%E7%90%86%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E3%81%AE%E5%A4%89%E6%9B%B4-kb5014278-36af1640-4389-4ff1-b805-d1d63715a0dd) の情報のとおり Exchange 管理センター上で証明書の管理ができないように変更となっておりました。一方、Exchange Server 2019 CU15 では、改めて GUI 上で管理することができるようになります。例えば証明書要求の作成、証明書要求の完了、 PFX ファイルへのエクスポート、および PFX ファイルからのインポートが行えるようになります。

## Exchange Server SE への対応に向けた更新

上記の他にも Exchange Server 2019 CU15 では、今後リリースされる Exchange Server SE に対応するためいくつかの更新がされます。  

- **[Exchange Server 2013](https://learn.microsoft.com/ja-jp/lifecycle/products/exchange-server-2013) との共存がサポートされなくなります:** Exchange Server 2013 は昨年サポートが終了しており、Exchange Server SE と共存することができません。これに先駆けて Exchange Server 2019 CU15 では Exchange Server 2013 との共存がサポートされなくなります。万が一、Exchange Server 2013 が組織内に存在する場合は Exchange Server 2019 CU15 や Exchange Server SE をインストールする前の段階で Exchange Server 2013 をアンインストールして撤去いただく必要があります。

- **新しいプロダクト キーがサポートされます:** ハイブリッド構成ウィザードを介して無料のプロダクト キーを利用可能なハイブリッド展開用のサーバーを除き、Exchange Server SE を利用する上では新しいプロダクトキーが必要となります。Exchange Server 2019 CU15 では、これらの新しいプロダクト キーがサポートできるよう更新され、Exchange Server SE がリリースされたタイミングで新しいプロダクトキーが公開されます。  

- **Windows Server 2025 がサポートされます:** 現在、Exchange Server 2019 は Windows Server 2019/2022 にインストールすることが可能ですが、Exchange Server 2019 CU15 では Windows Server 2025 がサポートされるようになります。Windows Server 2025 は 2024 後半ごろに GA 予定です。  

その他、CU15 で予定されている変更は次の通りです。

- Visual Studio 2022 に付属するバージョンへ Visual C++ 再頒布可能パッケージが更新されます。

- UCMA 6.0 と Outlook on the web のインスタント メッセージング機能がサポートされなくなります。

- Windows MSMQ コンポーネントは、セットアップによってインストールされなくなります。

- [Exchange Server AMSI 統合](https://techcommunity.microsoft.com/t5/exchange-team-blog/more-about-amsi-integration-with-exchange-server/ba-p/2572371)の機能が強化されます。

- [Exchange Server CBC 暗号化](https://support.microsoft.com/ja-jp/topic/exchange-server-august-2023-su-%E3%81%A7-aes256-cbc-%E6%9A%97%E5%8F%B7%E5%8C%96%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E6%9C%89%E5%8A%B9%E5%8C%96%E3%81%99%E3%82%8B-add63652-ee17-4428-8928-ddc45339f99e) の対象として PDF ファイルの追加されます。

# Exchange Server Subscription Edition について

Exchange Server Subscription Edition の概要をご紹介します。

- **ダウンロード方法について:** Exchange Server SE は Microsoft 365 管理センター (以前は [ボリューム ライセンス サービス センター](https://learn.microsoft.com/ja-jp/licensing/vlsc-faqs-home-page)) にて [2025 年 7 月](https://techcommunity.microsoft.com/blog/microsoft_365blog/licensing-and-pricing-updates-for-on-premises-server-products-coming-july-2025/4400174)にダウンロードすることが可能となる見込みです。

- **ライセンスについて:** ライセンシング モデルは [SharePoint Server Subscription Edition](https://www.microsoft.com/licensing/terms/productoffering/SharePointServer/EAEAS) と同様のモデルとなります。  サーバー ライセンスとユーザー ライセンスにはサブスクリプション ライセンスまたはアクティブなソフトウェア アシュアランス付きのライセンスが必要です。なお、Hybrid 用の Exchange Server では、今後も[ハイブリッド構成ウィザード](https://learn.microsoft.com/ja-jp/exchange/hybrid-configuration-wizard)経由で無償のライセンスが提供されます。

- **ハードウェア要件について:** [ハードウェア要件](https://learn.microsoft.com/ja-jp/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#hardware-requirements-for-exchange-2019) や、サポート対象[オペレーティング システム](https://learn.microsoft.com/ja-jp/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#supported-operating-systems-for-exchange-2019)は Exchange Server 2019 CU15 と同じであり、今後 Windows Server 2025 もサポートされる予定です。  

- **Active Directory に対する変更について:** Exchange Server 2019 から Exchange Server SE の RTM へアップグレードする場合は、特に Active Directory へ変更はなく、Active Directory スキーマへの更新もありません。Windows Server 2012 R2 のフォレスト機能レベルもサポートします。  

- **Exchange Server SE のサポータビリティについて:** Exchange Server SE は [モダン ライフサイクル ポリシー](https://learn.microsoft.com/ja-jp/lifecycle/policies/modern)に従いサポートされます。  

## Exchange Server SE リリースの詳細情報:  

Exchange Server SE をより早く採用いただくため、Exchange Server SE では次の変更を除き Exchange Server 2019 CU15 と同等のコードになっています。

- GUI で Setup を実行してインストールする際に表示される使用許諾契約書が更新されます。

- 名前が Microsoft Exchange Server 2019 から Microsoft Exchange Server Subscription Edition に変更されます。

- ビルドとバージョン番号が更新されます。

以下の点についてもご注意ください。

- Exchange Server 2019 CU15 がリリースされる前に Security Update (SU) がリリースされた場合は、CU15 にはそれらの SU も含まれた状態でリリースされます。

- Exchange Server 2019 CU15 以降に SU がリリースされた場合、Exchange Server SE には Exhange Server 2019 CU15 に加え、最新の SU が含まれた状態でリリースされます。  

## 下位バージョンから Exchange Server SE へのアップグレード方法について

Exchange Server 2019 から簡単に Exchange Server SE へ移行可能なインプレース アップグレード、またインプレース アップグレードがサポートされない Exchange Server 2016 からでも Exchagne Server SE へ移行可能な従来のアップグレードの 2 つの方法がサポートされます。  

- **インプレース アップグレード:** 最速で簡単に Exchange Server 2019 を Exchange Server SE にアップグレードする方法です。CU 適用作業と同様の操作でアップグレードが可能です。

- **従来のアップグレード :** これまでと同様に、新規 Windows Server OS をインストールしたサーバーを用意して Exchange Server SE をインストールし、名前空間とメールボックスをその新しいインフラストラクチャに移動する従来のアップグレードもサポートしています。この方法は Exchange Server のハードウェアをリプレースする場合や、新しい Windows Server OS に更新したい場合などのシナリオで利用されます。

既存環境で Exchange Server 2016 のみをご利用いただいている場合で今後もオンプレミス Exchange Server をご利用予定の場合、Exchange Server 2016 からはインプレース アップグレードを行うことができないため、少なくとも 1 回は従来のアップグレードをする必要があります。  
Exchange Server 2016 から Exchange Server SE へのタイムリーな移行を確実に遂行するためにも、速やかに Exchange Server 2016 から Exchange Server 2019 へ従来のアップグレードにて移行していただくことを推奨します。  

## Exchange Server 2019 CU15 および Exchange Server SE の更新パス

以前のすべてのバージョンと同様に、Exchange Server SE を使用して新しい Exchange オンプレミス組織を最初から作成したり、サポートされているバージョン (Exchange Server 2016 CU23 や Exchange Server 2019 CU14 以降など) のみを含む Exchange 組織に共存したりできます。サポートされていないバージョンの Exchange 組織には導入できません。

今後リリース予定の Exchange Server のバージョンと、共存がサポートされる Exchange Server のバージョンは、以下の表のとおりです。
なお、今後 Exchange Server SE CU1 以降がリリースされる際に、下位バージョンとの共存がサポートされなくなりますので、できる限り早めに Exchange Server SE へのアップグレードを実施いただくことをご検討ください。  

| 今後リリース予定の Exchange Server のバージョン | 共存がサポートされる Exchange Server のバージョン |
| -------------------------------- | ------------------------------------------------------------- |
| Exchange Server 2019 CU15        | Exchange Server 2016 CU23 と Exchange Server 2019 CU13/CU14 のみ |
| Exchange Server SE               | Exchange Server 2016 CU23 と Exchange Server 2019 CU14/CU15 のみ |
| Exchange Server SE CU1           | Exchange Server SE のみ |

既存環境から Exchange Server 2019 CU15 や Exchange Server SE へアップグレードする際のアップデート パスは以下の通りです。

| 既存の Exchange Server          | Exchange Server 2019 CU15 ([リリースされました](https://jpmessaging.github.io/blog/released-2025-h1-cumulative-update-for-exchange-server/))                                                                                                                                | Exchange Server SE RTM                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exchange Server 2013 | 組織内に共存することはサポートされません。<br><br>今すぐ Exchange Server 2019 CU14 へ従来のアップグレードを行ったうえで Exchange Server 2013 を撤去します。また、Exchange Server 2019 CU15 を適用します。 | 組織内に共存することはサポートされません。<br><br>今すぐ Exchange Server 2019 CU14 へ従来のアップグレードを行ったうえで Exchange Server 2013 を撤去します。また、Exchange Server 2019 CU15 を適用します。その後 Exchange Server SE がリリースされたら、Exchange Server SE にインプレース アップグレードを行います。 |
| Exchange Server 2016 CU23 | 今すぐ Exchange Server 2019 CU15 へ従来のアップグレードを行います。 | 今すぐ Exchange Server 2019 CU15 へ従来のアップグレードを行います。<br>その後 Exchange Server SE がリリースされたら、インプレース アップグレードを行います。 |
| Exchange Server 2016 CU22 以前 | 組織内に共存することはサポートされません。<br><br>今すぐ Exchange Server 2019 CU15 へ従来のアップグレードを行います。<br> または、今すぐ Exchange Server 2016 CU23 を適用し、Exchange Server 2019 CU15 へ従来のアップグレードを行います。 | 組織内に共存することはサポートされません。<br><br>今すぐ Exchange Server 2016 CU23 を適用し、Exchange Server 2019 CU15 へ従来のアップグレードを行います。<br>その後 Exchange Server SE がリリースされたら、インプレース アップグレードを行います。 |
| Exchange Server 2019 CU14 / CU15 | Exchange Server SE RTM 同等の動作を確認したい場合は Exchange Server 2019 CU14 に Exchange Server 2019 CU15 を適用します。 | Exchange Server SE にインプレース アップグレードします。 |
| Exchange Server 2019 CU13 | このバージョンは Exchange Server 2019 CU15 ではサポートされません。Exchange Server 2019 CU15 へアップデートしてください。 | このバージョンは Exchange Server SE がリリースされたらサポートされません。<br><br>今すぐ Exhcnage Server 2019 CU15 を適用します。<br>その後 Exchange Server SE がリリースされたら、インプレース アップグレードを行います。 |
| Exchange Server 2019 CU12 以前 | このバージョンはサポートされません。<br><br>今すぐ Exchange Server 2019 CU15 を適用します。 |このバージョンはサポートされません。<br><br>今すぐ Exhcnage Server 2019 CU15 を適用します。<br>その後 Exchange Server SE がリリースされたら、インプレース アップグレードを行います。 |


# Exchange Server SE CU1 について

Exchange Server SE は年に 2 度 CU を公開し、2025 年 10 月には Exchange Server SE CU1 をリリース予定です。  
Exchange Server SE CU1 には以下の変更が含まれる予定ですが、詳細はリリースをお待ちください。

- **サーバー間のケルベロス認証:** Exchange Server 間の通信は NTLMv2 ではなく Kerberos を用いて行われるようになります。すべての仮想ディレクトリに対して Kerberos を有効化します。  

- **RPS の廃止と Admin API の追加:** Admin API は REST ベースの API であり、Exchange Server の管理に使用されます。これまで使用されていた Remote PowerShell (RPS) も CU1 でサポートされますが、それ以降の CU で廃止予定となります。これは PowerShell での管理を廃止するのではなく、PowerShell クライアントとサーバー間のプロトコルをモダン化する対応となります。  

- **Outlook Anywhere の削除 (一時的に廃止を遅延することになりました):** Exchange Online や Microsoft 365 では数年前に Outlook Anywhere (RPC over HTTP) を用いた接続のサポートを終了しました。Exchange Server SE CU1 以降で、Outlook Anywhere は削除されます。Outlook Anywhere を使うサードパーティ アドインなどに影響がございます。 

**更新:** この廃止により影響を受けるお客様からフィードバックをいただきました。現在、これらの障害を解決するために取り組んでおり、Exchange SEリリース後にRPC/HTTP（Outlook Anywhere）の廃止に関する新しいタイムラインを発表する予定です。

- **下位バージョンとの共存の削除:** CU1 がリリースされた後は、Exchange Server SE が唯一サポートされるバージョンとなります。そのため、すべての下位バージョン (Exchange Server 2016 / Exchange Server 2019 を含みます) はサポート対象外となります。また、Exchange Server SE CU1 の Setup 実行時には下位バージョンが共存しているかどうかをチェックし、もし Exchange Server SE RTM 以外のバージョンを検知した場合は Setup によるインストールが失敗します。

## 今行っていただく準備について

直ちに Exchange Server 2019 CU14 に移行することをご検討ください。
特に以下の 3 つのポイントをご確認ください。

- 今後もオンプレミス Exchange Server を利用する場合、Exchange Server 2019 CU14 (OS としてWindows Server 2022 をご用意ください) へすぐに移行します。   

- Windows Server 2025 のリリースを待つ場合、Windows Server 2025 が利用可能になり次第、Exchange Server 2019 CU15 に移行します。

- もし Exchange Server 2019 を運用されている場合、必ず [最新の CU や SU](https://learn.microsoft.com/ja-jp/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019) 、最新の Windows Server OS の更新プログラムを適用し、常に最新の状態に保つよう管理・運用をしてください。  

Windows Server 2019 は 2029 年 1 月にサポート終了が予定されているため、Exchange Server 2019 CU15 と Exchange Server SE RTM を新規に導入する場合には、Windows Server 2022 もしくは 将来リリースされる Windows Server 2025 にインストールすることを推奨します。

# FAQ  

**Q1: Exchange Server SE がリリースされた少し後、間もなく Exchange Server 2016/2019 のサポート終了となります。どのようにアップグレードすれば良いでしょうか。**

A1: Exchange Server 2019 に対してインプレース アップグレードで Exchange Server SE RTM に簡単にアップグレードすることが可能です。インプレース アップデートであれば新たなサーバーを用意する必要はありません。インプレース アップグレードはマイクロソフトが推奨する移行方法であり、最も簡単かつ最速のアップグレード方法となります。  

**Q2: マイクロソフトが Exchange Server 2016/2019 のサポート期間を延期する予定はありますか。もしくは、ESU (延長サポート) に対応する予定はありますか。**

A2: いいえ、サポート期間の延期はありません。また、ESU も提供いたしません。マイクロソフトとしてはスムーズな移行のため、Exchange Server SE のリリースやインプレース アップグレードの準備に注力しております。Exchange Server 2016 をご利用のお客様は直ちに Exchange Server 2019 へ移行することを強く推奨します。  

**Q3: マイクロソフトの推奨通り、Exchange Server 2016 から Exchange Server 2019 へ移行し、そこから Exchange Server SE へインプレース アップグレードをする予定です。Exchange Server 2019 CU15 がリリースされる前に CU14 を Windows Server 2022 にインストールしたほうが良いでしょうか。もしくは、CU15 を待って Windows Server 2025 RTM にインストールしたほうが良いでしょうか。**

A3: Windows Server 2022 と今後リリース予定の Windows Server 2025 はどちらも Exchange Server 2019 CU15 や Exchange Server SE でサポートされる OS です。Exchange Server 観点で必要とする OS の機能の差異はありません。サポート ライフサイクルに違いがあり、Windows Server 2025 の方が数年サポート ライフサイクルが長いため、その点はご留意ください。Windows Server 2022 のサポートライフサイクルは[こちら](https://learn.microsoft.com/ja-jp/lifecycle/products/windows-server-2022)で公開しています。

**Q4: Exchange Server SE でサポートされる Outlook バージョンはどれですか。**

A4: [Exchange Server 2019 と同じクライアント](https://learn.microsoft.com/ja-jp/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#supported-clients-with-latest-updates-in-exchange-2019)をサポートします。
Outlook 2016/2019 も Exchange Server SE がリリースされた後すぐにサポート対象外となる予定です。なお、"新しい Outlook for Windows" は Exchange Server SE CU1 以降からサポートされる予定です。  

**Q5: DAG メンバー サーバーに対してインプレース アップグレードはどのようにできますか。**

A5: インプレース アップグレードは通常の CU 適用作業と同様に実施いただけます。このため、DAG メンバー サーバーは 1 台ずつインプレース アップグレードを試みてください。  

**Q6: 現行は Windows Server 2019 上に Exchange Server 2019 CU14 をインストールしています。Exchange Server SE では Windows Server 2019 はサポートされますか。**

A6: Exchange Server SE は Windows Server 2019 と Windows Server 2022 のどちらもサポートします。ただし、Exchange Server 2019 CU15 からサポートされる TLS1.3 は Windows Server 2022 以降でサポートされるため、Windows Server 2019 では利用できません。また、サポート ライフサイクルの観点としても Windows Server 2022/2025 を利用する方がより長くサーバーを利用できます。  

**Q7. Exchange Server 2016 の組織に Exchange Server 2019 と Exchange Server SE RTM の両方を共存させ、Exchange Server 2016 から Exchange SE にメールボックスを移行する方法はサポートされますか。**

A7. 構成としてはサポートさますが、推奨しておりません。上記のとおり、Exchange Server 2016/2019 のサポート終了時期間近に Exchange Server SE RTM がリリースされるため、Exchange Server 2016/2019 から Exchange Server SE への移行期間が非常に短く、従来の移行をやりきるのは困難となる場合も想定されるためです。まずは Exchange Server 2019 への移行を行っていただいたうえで、Exchange Server SE RTM がリリースされましたら、インプレース アップグレードにより移行いただくことを推奨いたします。

**Q8. Exchange Server SE でもハイブリッド環境で受信者オブジェクトを管理するための管理ツールは提供されますか。**

A8. はい、提供される見込みです。なお、ハイブリッド環境での受信者管理を目的とした管理ツールは Exchange Server 2019 CU12 から提供を開始しておりますが、通常のアップグレードと同様に CU14 / CU15 からのインプレース アップグレードも可能となる見込みです。
