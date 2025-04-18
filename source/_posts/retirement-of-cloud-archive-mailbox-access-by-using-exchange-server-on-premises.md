---
title: 'オンプレミス Exchange Server の OWA によるクラウド アーカイブ メールボックス アクセスの廃止'
date: 2025-04-18
lastupdate:
tags: Exchange Online
---

※ この記事は、[Retirement of cloud archive mailbox access by using Exchange Server on-premises OWA](https://techcommunity.microsoft.com/blog/exchange/retirement-of-cloud-archive-mailbox-access-by-using-exchange-server-on-premises-/4405432) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online では、これまでオンプレミスの Exchange Server にホストされているプライマリ メールボックスを持つユーザーが、Outlook on the Web (OWA) を使用して Exchange Online にホストされているアーカイブ メールボックスにアクセスできる機能を提供していましたが、この Exchange Online の機能を廃止します。この変更は、OWA の使用にのみ影響し、他のサポートされている Outlook クライアントを使用したアーカイブ メールボックスへのアクセスには影響しません。

以下の状況を想像してください。Exchange Server ハイブリッド環境が構築されており、一部のメールボックスが Exchange Server 上にホストされています。その中には、クラウド アーカイブが有効化されているメールボックスもあり、これらのアーカイブ メールボックスは Exchange Online 上にホストされています。これまでは、ユーザーは Outlook on the Web (OWA) を使用してこれらのアーカイブ メールボックスにアクセスすることが可能でした。しかし、**2025 年 5 月 12 日**以降、このアクセスは利用できなくなります。なお、ユーザーは引き続き Outlook デスクトップ クライアントを使用してアーカイブ メールボックスにアクセスすることが可能です。

このワークフローを過去 30 日間に使用したすべてのお客様を特定済みです。この変更の影響を受ける組織には、Microsoft 365 管理センターのメッセージ センターに **MC1053644** という投稿が表示されるはずです。このワークフローを使用しているにもかかわらず、メッセージ センターの投稿が表示されない場合は、**exchonpremfeedback[AT]microsoft.com** 宛てにご連絡ください。
