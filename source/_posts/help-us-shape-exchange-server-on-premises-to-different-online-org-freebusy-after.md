---
title: EWS 廃止後の Exchange Server から別組織の Exchange Online への空き時間情報共有に関するご意見を募集
date: 2026-08-26
tags:
- Exchange
- Exchange Online
---
※ この記事は、[Help us shape Exchange Server on-premises to different online org Free/Busy after EWS retirement](https://techcommunity.microsoft.com/blog/exchange/help-us-shape-exchange-server-on-premises-to-different-online-org-freebusy-after/4549691) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

[Exchange Online EWS: 廃止期限が迫っています](/blog/exchange-online-ews-your-time-is-almost-up/) でお知らせしたとおり、Exchange Online の Exchange Web Services (EWS) は 2026 年 10 月から段階的に無効化が始まり、2027 年 4 月に完全に無効化されます。この取り組みの一環として、現在 Exchange Online の EWS エンドポイントに依存している、Exchange Server の組織間連携シナリオへの対応を進めています。

Exchange Server の空き時間情報に関するほとんどのシナリオは変わりません。2 つの Exchange Server 組織 (完全なオンプレミス環境) 間の空き時間情報共有では、引き続きフェデレーション / DAuth と組織の関係を使用します。Exchange ハイブリッド組織では、専用の [Exchange ハイブリッド アプリ](https://learn.microsoft.com/exchange/hybrid-deployment/deploy-dedicated-hybrid-app) を通じて OAuth と IntraOrganizationConnector を使用することで、Exchange Server と同じ組織の Exchange Online テナントとの間で空き時間情報を引き続き共有できます。モダン ハイブリッド フローでは、EWS が Graph に置き換わります。

新たな仕組みが必要になるのは、EWS に依存する組織の関係を介して、<strong><span style="color:#169179;">Exchange Server 組織が別組織の Exchange Online テナントから空き時間情報またはメール ヒントを取得する</span></strong>シナリオです。Exchange Server から外部の Exchange Online へのこのシナリオでは、[Microsoft 365 クロステナント アクセス ポリシー](https://learn.microsoft.com/exchange/sharing/migrate-to-m365-xtap) の利用を検討しています。このポリシーは、Microsoft 365 テナント間で空き時間情報、予定表、メール ヒントを共有するための標準的な方法として利用が進んでいます。

方針を確定する前に、お客様やパートナーの皆さま、特に既存の Microsoft 365 テナントを持たずに Exchange Server を運用している組織からのフィードバックを募集します。

このアプローチについて、[アンケート](https://forms.cloud.microsoft/r/BmHCNzncEf) からご意見をお寄せください。

<p style="background: #F0F0F0; padding: .5em; margin: 1em 0 1em 0;">このフィードバック募集は、<strong>Exchange Server (組織 A) から別組織の Exchange Online (組織 B) への共同作業</strong>を対象としています。Exchange Server 間の組織の関係 (2 つの完全なオンプレミス組織) は<em>対象外であり、変更なく継続されます</em>。</p>
