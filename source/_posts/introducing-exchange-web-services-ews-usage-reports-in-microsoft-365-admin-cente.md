---
title: Microsoft 365 管理センターでの Exchange Web Services (EWS) 利用状況レポートの導入
date: 2025-05-08 16:00:00
lastupdate: 
tags: Exchange Online
---

※ この記事は、[Introducing Exchange Web Services (EWS) Usage Reports in Microsoft 365 Admin Center](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-web-services-ews-usage-reports-in-microsoft-365-admin-cente/4411263) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

私たちは、Microsoft 365 管理センターにおける Exchange Web Services (EWS) 利用状況レポートのリリースを発表できることを大変嬉しく思います。この新機能は、EWS 依存を解消する取り組みを支援するために設計されており、管理者の監視業務を簡素化し、強化することを目的としています。EWS の廃止に向けた管理者の取り組みを支援するための実用的なインサイトとツールを提供するという、私たちのコミットメントにおけるもう一つの重要なマイルストーンとなります。

### なぜこれが重要なのか？

Exchange Web Services (EWS) は、2026 年 10 月より廃止される予定です。この決定は、[以前発表された](https://techcommunity.microsoft.com/blog/exchange/retirement-of-exchange-web-services-in-exchange-online/3924440)ものであり、ユーザーが Microsoft Graph のようなモダンで安全なソリューションへ移行することを促進する目的があります。この廃止は、スケーラビリティ、セキュリティ、コンプライアンスを重視し、古い技術を段階的に廃止していくという Microsoft の取り組みを反映しています。

EWS への依存度を評価するために、Microsoft 365 管理センターでは EWS 利用状況レポートを提供しています。このレポートは、利用状況の傾向に関する重要なインサイトを提供し、廃止に先立って積極的な調整やスムーズな移行を可能にします。また、データをダウンロードしてさらなる分析やアーカイブに活用することもできます。

### EWS 利用状況レポートへのアクセス方法

レポートは、Microsoft 365 管理センターを通じて Worldwide (WW) テナントでアクセス可能です。確認手順は以下の通りです。

- [Microsoft 365 管理センター](https://admin.microsoft.com/) にログインします。
- "レポート" セクションに移動します。
- "利用状況" を選択し、概要ページから **Exchange** &gt; **EWS usage** を選択します。

詳細な手順については、こちらのガイドをご参照ください : [Microsoft 365 管理センターのレポート – EWS 利用状況](https://learn.microsoft.com/microsoft-365/admin/activity-reports/ews-usage?view=o365-worldwide)

![](EWSreport.jpg)

### これらのレポートを利用できるのは誰ですか？

Microsoft 365 管理センターのレポートは、Worldwide (WW) テナントのお客様のみが利用可能です。政府機関やその他の主権クラウドでの EWS 利用状況を把握する必要がある場合は、[こちらのプロジェクト](https://aka.ms/ewsToolsBlog)をご参照ください。このプロジェクトでは、利用状況データを取得するためのセルフ サービス ツールを提供しています。
