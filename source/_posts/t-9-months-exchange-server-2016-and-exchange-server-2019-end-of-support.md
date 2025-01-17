---
title: '残り 9 か月 : Exchange Server 2016 および Exchange Server 2019 のサポート終了'
date: 2025-01-16
lastupdate: 2025-01-17
tags: Exchange
--- 

※ この記事は、[T-9 months: Exchange Server 2016 and Exchange Server 2019 End of Support](https://techcommunity.microsoft.com/blog/exchange/t-9-months-exchange-server-2016-and-exchange-server-2019-end-of-support/4366605) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2025 年 10 月 14 日、**今日から 9 か月後**に [Exchange Server 2016](https://learn.microsoft.com/lifecycle/products/exchange-server-2016) および [Exchange Server 2019](https://learn.microsoft.com/lifecycle/products/exchange-server-2019) のサポートが終了します。2025 年 10 月 14 日以降、Microsoft は Exchange Server 2016 または Exchange Server 2019 に関する問題に対する技術サポートを提供しなくなります。これには以下が含まれます：

- 発生する可能性のある問題に対する技術サポート。
- サーバーの安定性と使いやすさに影響を与える可能性のある問題に対する不具合の修正。
- サーバーがセキュリティ侵害に対して脆弱になる可能性のある脆弱性に対するセキュリティ修正。
- タイム ゾーンの更新。

もちろん、お客様がインストールした Exchange Server 2016 および Exchange Server 2019 は 2025 年10 月 14 日以降も引き続き動作しますが、サポート終了日が近づいていることや将来のセキュリティ リスクの可能性があるため、今すぐ行動することを強くお勧めします。

お客様には、[Exchange Online への移行](https://learn.microsoft.com/exchange/mailbox-migration/decide-on-a-migration-path)を行うか、2025 年下半期の前半に利用可能になる [Exchange Server Subscription Edition (SE) へのアップグレード](https://jpmessaging.github.io/blog/Upgrading%20your%20organization%20from%20current%20versions%20to%20Exchange%20Server%20SE/)の準備をすることをお勧めします。

## Exchange Online や Microsoft 365 への移行

クラウドへの移行は、Exchange Server の展開を廃止するための最良かつ最も簡単なオプションです。Microsoft クラウドに移行すると、オンプレミスの展開から一度に移行し、クラウドで利用可能な新機能や技術（高度な生成 AI 技術を含む）を活用できます。Exchange Online や Microsoft 365 への完全な移行により、最高の価値とユーザー エクスペリエンスを得られると強く信じています。

クラウドへの移行を検討している場合、Microsoft FastTrack サービスを利用できる可能性があります。FastTrack はベスト プラクティスを共有し、移行をできるだけシームレスにするためのツールとリソースを提供します。さらに、計画と設計から最後のメールボックスの移行まで、サポート エンジニアが支援します。FastTrack の詳細については、[Microsoft FastTrack](https://fasttrack.microsoft.com/) を参照してください。

## Exchange Server SE へのアップグレード準備

今年の初めに、[Exchange Server ロードマップの更新](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/)と、オンプレミスで Exchange Server を引き続き運用する場合の [Exchange Server SE へのアップグレード](https://jpmessaging.github.io/blog/Upgrading%20your%20organization%20from%20current%20versions%20to%20Exchange%20Server%20SE/)方法に関する詳細を提供しました。

Exchange Server 2019 を使用している場合は、Exchange Server を最新の状態に保ち、利用可能になったときに Exchange Server SE へのインプレース アップグレードを行うことをお勧めします。

Exchange Server 2016 を使用している場合は、今すぐ Exchange Server 2019 へのレガシー アップグレードを実行し、利用可能になったときに Exchange Server SE へのインプレース アップグレードを実行することをお勧めします。Exchange Server 2016 から Exchange Server SE RTM へのレガシー アップグレードを実行し、Exchange Server 2019 を完全にスキップするオプションもあります。ただし、Exchange Server SE のリリースと Exchange Server 2016 のサポート終了の間には 4 か月未満しかないため、展開の規模やその他の要因によっては十分な時間がない可能性があります（Exchange Server 2016 から Exchange Server SE へのインプレース アップグレードは利用できません）。このため、今すぐ [Exchange Server 2019 へのアップグレード](https://setup.cloud.microsoft/exchange/deployment-assistant)を実行し、[Exchange Server 2016 を廃止](https://jpmessaging.github.io/blog/Decommissioning-Exchange-Server-2016/)し、Exchange Server SE が利用可能になったときにインプレース アップグレードを実行することをお勧めします。

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
組織内にまだ Exchange Server 2013 以前のバージョンがある場合は、Exchange Server 2019 CU15 をインストールするか Exchange Server SE にアップグレードする前に、まずそれを削除する必要があります。
</div>

## Exchange Server Technology Adoption Program

お客様が Exchange Server の運用を継続する予定であり、Exchange Server SE のプレリリース ビルドをテストおよび評価したい場合は、[Exchange Server Technology Adoption Program (TAP)](https://techcommunity.microsoft.com/t5/exchange-team-blog/open-enrollment-for-exchange-server-2019-tap/ba-p/3421627) への参加を申し込むことができます。

Exchange Server TAP に参加することにはいくつかの利点があります。例えば、将来のアップデートに関する意見やフィードバックを提供できること、Exchange Server のエンジニアリング チームとの密接な関係を築けること、Exchange Server に関するプレリリース情報を受け取れることなどです。また、TAP メンバーは TAP に関連する問題について Microsoft から追加料金なしでサポートを受けることができます。

すべてのお申込みは、受け入れ前に審査されます。すべての法的書類が適切に処理されるまで、お客様はプレリリースのダウンロードや情報にアクセスすることはできません。お申込みは受け入れを意味するものではなく、すべてのお申込みいただいたお客様が TAP に選ばれるわけではありません。お申し込みが受け入れられた場合、必要な書類の手続きを開始するためにご連絡いたします。

TAP プログラムに参加しなくても、Exchange Server 2019 CU15 をインストールすることで、お客様組織内で Exchange Server SE 相当のコードをテストすることができます。

## 2025 年 10 月 14 日にサポート終了となる関連 Microsoft 製品

Exchange Server 2016 および Exchange Server 2019 に加えて、いくつかの他の製品（Exchange Server と一緒に使用されることが多い製品も含む）も 2025 年 10 月 14 日に[サポート終了または廃止](https://learn.microsoft.com/lifecycle/announcements/october-14-2025-products-end-of-support)となります。これには、[Microsoft Office 2016](https://learn.microsoft.com/lifecycle/products/microsoft-office-2016)、[Microsoft Office 2019](https://learn.microsoft.com/lifecycle/products/microsoft-office-2019)、[Outlook 2016](https://learn.microsoft.com/lifecycle/products/outlook-2016)、[Outlook 2019](https://learn.microsoft.com/lifecycle/products/outlook-2019)、[Skype for Business 2016](https://learn.microsoft.com/lifecycle/products/skype-for-business-2016)、[Skype for Business 2019](https://learn.microsoft.com/lifecycle/products/skype-for-business-2019)、[Skype for Business Server 2015](https://learn.microsoft.com/lifecycle/products/skype-for-business-server-2015)、[Skype for Business Server 2019](https://learn.microsoft.com/lifecycle/products/skype-for-business-server-2019)、[Windows 10](https://learn.microsoft.com/lifecycle/products/windows-10-enterprise-and-education) などが含まれます。

Microsoft 製品およびサービスの詳細情報については、[製品およびサービスのライフサイクル情報を検索](https://learn.microsoft.com/lifecycle/products/)してください。

<font color="#CF3600">Exchange Server Engineering Team</font>