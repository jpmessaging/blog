---
title: >
 Exchange Online における SMTP AUTH 基本認証廃止スケジュールの更新のご案内
date: 2026-01-28 12:00:00
lastupdate: 2026-01-30 11:00
tags: Exchange Online
categories:
---
※ この記事は、[Updated Exchange Online SMTP AUTH Basic Authentication Deprecation Timeline](https://techcommunity.microsoft.com/blog/exchange/updated-exchange-online-smtp-auth-basic-authentication-deprecation-timeline/4489835) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

多くの方が従来の電子メール ワークフローの最新化において、現実的な課題に直面され続け、実行可能で安全な代替手段を導入するために十分な時間が必要とすることを認識しています。

皆様からのフィードバック、及び、実際の利用状況を踏まえ、より明確なマイルストーンと追加の移行猶予期間を提供するため、[Exchange Online SMTP AUTH Basic Authentication Deprecation](https://techcommunity.microsoft.com/blog/exchange/exchange-online-to-retire-basic-auth-for-client-submission-smtp-auth/4114750) のスケジュールを以下のように見直しました。

* **2026 年 12 月まで:** SMTP AUTH 基本認証の動作に変更はありません。
* **2026 年 12 月末:** SMTP AUTH 基本認証は**既存テナントでは既定で無効化されます。** 管理者は必要に応じて有効化できます。
* **2026 年 12 月以降に作成される新規テナントの場合:** SMTP AUTH 基本認証は**既定で使用できません。** サポートされる認証方式は OAuth のみとなります。
* **2027 年後半:** SMTP AUTH 基本認証の**最終的な削除日**を発表されます。

これらの更新は、すべてのクラウド環境を含む当サービスをご利用のお客様に対し、最新の認証方式への移行を計画、検証、展開するための十分な時間を確保しつつ、既定のセキュリティ水準を維持できることを目的としています。
