---
title: オンプレミス Exchange メールボックスの Microsoft 365 への移行で OAuth 認証が利用可能に
date: 2026-11-10 21:36
tags:
- Exchange
- Exchange Online
---

※ この記事は、[Now available: OAuth authentication for on-premises Exchange mailbox migrations to Microsoft 365](https://techcommunity.microsoft.com/blog/exchange/now-available-oauth-authentication-for-on-premises-exchange-mailbox-migrations-t/4571777) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft 365 とオンプレミスの Exchange 環境間でメールボックスを移行する際に、Microsoft 365 Mailbox Replication Service (MRS) で認証方式として OAuth がサポートされるようになりました。OAuth は、オンプレミスの Active Directory の特権ユーザーの Basic 認証資格情報 (ユーザー名とパスワード) を使用する方法に代わる、より安全な認証方式です。

これまで、MRS ではこれらの移行において OAuth 認証を使用できませんでした。MRS 向けの OAuth 認証を構成すると、テナント管理者は OAuth 認証を使用する移行エンドポイントを作成し、移行バッチ、またはオンボーディングやオフボーディングの移動ジョブで使用できるようになります。この方法は、ハイブリッド環境と非ハイブリッド環境の両方で利用できます。

メールボックス移行における OAuth 認証は、以下の環境で利用できます。

- Microsoft 365 の **マルチテナント (WW)** 環境のみ。他のクラウド環境での利用については、今後数か月以内にお知らせする予定です。
- オンプレミス環境では、2026 年 10 月以降のバージョンの Exchange Server Subscription Edition (Exchange SE)、または最新の ESU (2026 年 10 月) を適用した Exchange Server 2019 CU15 を実行している必要があります。

OAuth 認証は Basic 認証に代わるオプションの認証方式であり、置き換えるものではありません。そのため、新たな対応は不要で、既存の移行エンドポイントや進行中の移行に影響はありません。

手順については、[OAuth 認証を使用して移行エンドポイントを作成する | Microsoft Learn](https://learn.microsoft.com/exchange/hybrid-deployment/oauth-migration-endpoint) をご確認ください。
