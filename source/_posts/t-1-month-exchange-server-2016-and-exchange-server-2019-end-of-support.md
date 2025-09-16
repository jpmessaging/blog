---
title: "残り 1 か月 : Exchange Server 2016 および Exchange Server 2019 のサポート終了"
date: 2025/09/17
lastupdate: 2025/09/17
tags: Exchange
---
※ この記事は、[T-1 month: Exchange Server 2016 and Exchange Server 2019 End of Support](https://techcommunity.microsoft.com/blog/exchange/t-1-month-exchange-server-2016-and-exchange-server-2019-end-of-support/4453133) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2025 年 10 月 14 日、**あと 1 か月**で [Exchange Server 2016](https://learn.microsoft.com/lifecycle/products/exchange-server-2016) および [Exchange Server 2019](https://learn.microsoft.com/lifecycle/products/exchange-server-2019) のサポートが終了します。引き続きサポートとセキュリティを確保するために、今すぐアップグレードすることが重要です。

2025 年 10 月 14 日以降、Microsoft は技術サポートを提供しなくなります。これにより、Exchange Server 2016 および Exchange Server 2019 のユーザーは以下を受け取ることができなくなります。 

- サーバーの安定性や使いやすさに影響を与える可能性のある問題の修正。
- サーバーがセキュリティ侵害に対して脆弱になる可能性のある脆弱性に対するセキュリティ修正。
- タイムゾーンの更新。

2025 年 10 月 14 日以降も、Exchange Server 2016 および Exchange Server 2019 をインストールした環境は引き続き動作します。しかし、サポート終了後もこれらの製品を使用し続けることは、潜在的なセキュリティ リスクを招く可能性があります。そのため、今すぐ行動を起こすことを強くお勧めします。

お客様には、[Exchange Online への移行](https://learn.microsoft.com/exchange/mailbox-migration/decide-on-a-migration-path) を検討するか、[Exchange Server Subscription Edition (SE) へアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することをお勧めします。  

## Exchange Online または Microsoft 365 に移行する

Exchange Online または Microsoft 365 への移行は、最大の価値と最良のユーザー エクスペリエンスを提供すると私たちは確信しています。クラウドへの移行は、Exchange Server の展開を終了するための最善かつ最も簡単な選択肢です。Microsoft クラウドに移行することで、オンプレミス展開から一歩進み、クラウドでのみ利用可能な高度な生成 AI 技術を含む新しい機能や技術の恩恵を受けることができます。

クラウドへの移行を検討されている場合、Microsoft FastTrack サービスをご利用いただける可能性があります。FastTrack は、移行を可能な限りスムーズに進めるためのベスト プラクティス、ツール、およびリソースを提供します。さらに、計画や設計から最後のメールボックスの移行まで、サポート エンジニアが支援します。FastTrack の詳細については、[Microsoft FastTrack](https://fasttrack.microsoft.com/) をご覧ください。

## Exchange Server SE へのアップグレード 

2025 年 7 月、[Exchange Server サブスクリプション エディション (SE) の一般提供開始を発表し、](/blog/exchange-server-subscription-edition-se-is-now-available/) オンプレミスで Exchange Server を引き続き運用する場合のアップグレード方法の詳細も提供しました。

- Exchange Server 2019 をご利用の場合は、 [Exchange Server SE への インプレース アップグレード](/blog/why-in-place-upgrade-from-exchange-2019-to-exchange-se-is-low-risk/)をお勧めします。

- Exchange Server 2016 をご利用の場合は、Exchange Server SE にレガシー（サイド バイ サイド）方式で直接アップグレードすることをお勧めします。

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
組織内にまだ Exchange Server 2013 以前のバージョンがある場合は、<a href="https://www.microsoft.com/download/details.aspx?id=106402">Exchange Server 2019 CU15</a> をインストールするか Exchange Server SE にアップグレードする前に、まずそれを削除する必要があります。
</div>

## Exchange Server Technology Adoption Program 

お客様が Exchange Server の運用を継続する予定であり、Exchange Server SE のプレリリース ビルドをテストおよび評価したい場合は、[Exchange Server Technology Adoption Program (TAP)](https://techcommunity.microsoft.com/t5/exchange-team-blog/open-enrollment-for-exchange-server-2019-tap/ba-p/3421627) への参加を申し込むことができます。 

Exchange Server TAP に参加することにはいくつかの利点があります。例えば、将来のアップデートに関する意見やフィードバックを提供できること、Exchange Server のエンジニアリング チームとの密接な関係を築けること、Exchange Server に関するプレリリース情報を受け取れることなどです。また、TAP メンバーは TAP に関連する問題について Microsoft から追加料金なしでサポートを受けることができます。 

すべてのお申込みは、受け入れ前に審査されます。すべての法的書類が適切に処理されるまで、お客様はプレリリースのダウンロードや情報にアクセスすることはできません。お申込みは受け入れを意味するものではなく、すべてのお申込みいただいたお客様が TAP に選ばれるわけではありません。お申し込みが受け入れられた場合、必要な書類の手続きを開始するためにご連絡いたします。

TAP プログラムの参加有無にかかわらず、[Exchange Server Subscription Edition RTM](https://www.microsoft.com/download/details.aspx?id=108244) をダウンロードし、ご利用の組織内で Exchange Server SE をすぐに評価することができます。