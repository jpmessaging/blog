---
title: '残り 6 か月 : Exchange Server 2016 および Exchange Server 2019 のサポート終了'
date: 2025-04-15
lastupdate: 
tags: Exchange
--- 

※ この記事は、[T-6 months: Exchange Server 2016 and Exchange Server 2019 End of Support](https://techcommunity.microsoft.com/blog/exchange/t-6-months-exchange-server-2016-and-exchange-server-2019-end-of-support/4403017) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2025 年 10 月 14 日、つまり**あと 6 か月**で [Exchange Server 2016](https://learn.microsoft.com/lifecycle/products/exchange-server-2016) および [Exchange Server 2019](https://learn.microsoft.com/lifecycle/products/exchange-server-2019) のサポートが終了します。引き続きサポートとセキュリティを確保するために、今すぐアップグレードの計画を立てることが重要です。

2025 年 10 月 14 日以降、Microsoft は技術サポートを提供しなくなります。これにより、Exchange 2016 および Exchange 2019 のユーザーは以下を受け取ることができなくなります。

- サーバーの安定性や使いやすさに影響を与える可能性のある問題の修正。
- サーバーがセキュリティ侵害に対して脆弱になる可能性のある脆弱性に対するセキュリティ修正。
- タイムゾーンの更新。

2025 年 10 月 14 日以降も、Exchange 2016 および Exchange 2019 をインストールした環境は引き続き動作します。しかし、サポート終了後もこれらの製品を使用し続けることは、潜在的なセキュリティリスクを招く可能性があります。そのため、今すぐ行動を起こすことを強くお勧めします。

お客様には、[Exchange Online への移行](https://learn.microsoft.com/exchange/mailbox-migration/decide-on-a-migration-path)を検討するか、2025 年 7 月にリリース予定の [Exchange Server Subscription Edition (SE) へのアップグレード](https://techcommunity.microsoft.com/t5/exchange-team-blog/upgrading-your-organization-from-current-versions-to-exchange/ba-p/4241305)の準備を進めることをお勧めします。この移行をよりスムーズにする方法の一つとして、現在 [Exchange Server 2019 CU15](https://www.microsoft.com/download/details.aspx?id=106402) をインストールすることが挙げられます。これにより、Exchange 2019 から Exchange SE へのインプレース アップグレードが可能となり、移行が大幅に迅速かつ容易になります。

### Exchange Online または Microsoft 365 に移行する

Exchange Online または Microsoft 365 への完全移行は、最大の価値と最良のユーザー エクスペリエンスを提供すると私たちは確信しています。クラウドへの移行は、Exchange Server の展開を終了するための最善かつ最も簡単な選択肢です。Microsoft クラウドに移行することで、オンプレミス展開から一歩進み、クラウドでのみ利用可能な高度な生成 AI 技術を含む新しい機能や技術の恩恵を受けることができます。

クラウドへの移行を検討されている場合、Microsoft FastTrack サービスをご利用いただける可能性があります。FastTrack は、移行を可能な限りスムーズに進めるためのベスト プラクティス、ツール、およびリソースを提供します。さらに、計画や設計から最後のメールボックスの移行まで、サポート エンジニアが支援します。FastTrack の詳細については、[Microsoft FastTrack](https://fasttrack.microsoft.com/) をご覧ください。

### Exchange Server SE へのアップグレードを準備する

2024 年 5 月、[Exchange Server のロードマップ](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742)に関する最新情報と、オンプレミスで Exchange Server を引き続き運用する場合の [Exchange Server SE へのアップグレード方法](https://techcommunity.microsoft.com/t5/exchange-team-blog/upgrading-your-organization-from-current-versions-to-exchange/ba-p/4241305)の詳細を提供しました。

Exchange 2019 をご利用の場合は、Exchange サーバーを最新の状態に保つことをお勧めします。2025 年後半に Exchange Server SE が利用可能になった際には、インプレース アップグレードを実施することができます。

Exchange 2016 をご利用の場合、現在の環境を Exchange 2019 にレガシー (サイド バイ サイド) アップグレードし、その後 Exchange Server SE がリリースされた際にインプレース アップグレードを実施することをお勧めします。Exchange 2016 から Exchange Server SE RTM へのレガシー アップグレードを直接行い、Exchange 2019 をスキップするオプションもあります。しかし、Exchange Server SE のリリースと Exchange 2016 のサポート終了までの期間が数か月しかないため、展開規模やその他の要因によっては十分な時間が確保できない可能性があります (Exchange 2016 から Exchange SE へのインプレース アップグレードは利用できません)。そのため、[Exchange Server 2019 へのアップグレード](https://setup.cloud.microsoft/exchange/deployment-assistant)を今すぐ実施し、[Exchange 2016 サーバーを廃止](https://techcommunity.microsoft.com/t5/exchange-team-blog/decommissioning-exchange-server-2016/ba-p/4214475)し、Exchange Server SE が利用可能になった際にインプレース アップグレードを行うことを強くお勧めします。

**注:** 組織内に Exchange Server 2013 またはそれ以前のバージョンが残っている場合、[Exchange Server 2019 CU15](https://www.microsoft.com/en-us/download/details.aspx?id=106402) をインストールするか、Exchange Server SE にアップグレードする前に、Exchange Server 2013 をすべて削除する必要があります。

## Exchange Server Technology Adoption Program

お客様が Exchange Server の運用を継続する予定であり、Exchange Server SE のプレリリース ビルドをテストおよび評価したい場合は、[Exchange Server Technology Adoption Program (TAP)](https://techcommunity.microsoft.com/t5/exchange-team-blog/open-enrollment-for-exchange-server-2019-tap/ba-p/3421627) への参加を申し込むことができます。

Exchange Server TAP に参加することにはいくつかの利点があります。例えば、将来のアップデートに関する意見やフィードバックを提供できること、Exchange Server のエンジニアリング チームとの密接な関係を築けること、Exchange Server に関するプレリリース情報を受け取れることなどです。また、TAP メンバーは TAP に関連する問題について Microsoft から追加料金なしでサポートを受けることができます。

すべてのお申込みは、受け入れ前に審査されます。すべての法的書類が適切に処理されるまで、お客様はプレリリースのダウンロードや情報にアクセスすることはできません。お申込みは受け入れを意味するものではなく、すべてのお申込みいただいたお客様が TAP に選ばれるわけではありません。お申し込みが受け入れられた場合、必要な書類の手続きを開始するためにご連絡いたします。

TAP プログラムに参加しなくても、[Exchange 2019 CU15](https://www.microsoft.com/en-us/download/details.aspx?id=106402) をインストールすることで、お客様組織内で Exchange Server SE 相当のコードをテストすることができます。
