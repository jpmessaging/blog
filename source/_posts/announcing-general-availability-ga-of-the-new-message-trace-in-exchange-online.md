---
title: 'Exchange Online の新しいメッセージ トレースの一般提供 (GA) を発表します'
date: 2025-6-4
lastupdate:
tags: 'Exchange Online'
---

※ この記事は、[Announcing General Availability (GA) of the New Message Trace in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/announcing-general-availability-ga-of-the-new-message-trace-in-exchange-online/4420243) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

本日、Exchange Online の Exchange 管理センター (EAC) における新しいメッセージ トレースの一般提供 (GA) を、ワールド ワイド (WW) のお客様向けに発表いたします。ロール アウトは 6 月中旬より開始し、7 月中に完了する予定です。[パブリック プレビュー](https://techcommunity.microsoft.com/blog/exchange/announcing-public-preview-of-the-new-message-trace-in-exchange-online/4356561)と同様に、管理者の皆様は Exchange 管理センターの "メール フロー" > "メッセージ トレース" から新しいメッセージ トレースとその機能に既定でアクセスできるようになります。パブリック プレビュー期間中には、新しいメッセージ トレースの設計、パフォーマンス、機能の充実について多くの貴重なご意見をいただきました。今後は新しいメッセージ トレース体験への移行を進めてまいります。追加のご意見がございましたら、Exchange 管理センターの "フィードバックの送信" よりお寄せください。

### 従来のメッセージ トレース インターフェイスおよびコマンドレットの廃止スケジュール

移行を円滑に進めるため、Exchange 管理センターの従来のメッセージ トレース ユーザー インターフェイスおよびコマンドレット（Get-MessageTrace、Get-MessageTraceDetail）は、新しいメッセージ トレース インターフェイスおよびコマンドレット（Get-MessageTraceV2、Get-MessageTraceDetailV2）と並行して、数か月間ご利用いただけます。**従来のメッセージ トレース インターフェイスおよびコマンドレット（Get-MessageTrace、Get-MessageTraceDetail）は、2025 年 9 月 1 日よりワールド ワイドのお客様向けに廃止が開始されます。** また、**Reporting Webservice を利用したメッセージ トレース データの取得サポートも、2025 年 9 月 1 日より廃止が開始されます。**

なお、このスケジュールはワールド ワイド (WW) 環境のみに適用され、GCC、GCC-High、DoD、その他のソブリン クラウドには影響しません。GCC、GCC-High、DoD、およびその他のソブリン クラウド向けのスケジュールについては、2025 年後半 (CY25H2) にご案内予定です。

### 移行に向けて必要な対応

- まだ新しいメッセージ トレース ユーザー インターフェイスをご利用でない場合は、Exchange 管理センターで新しいメッセージ トレースをご利用ください。従来のメッセージ トレース ユーザー インターフェイスは 2025 年 9 月 1 日より廃止が開始されます。
- 既存の自動化で従来のメッセージ トレース コマンドレットを利用している場合は、遅くとも 2025 年 8 月末までに新しいメッセージ トレース コマンドレットへの移行をお願いします。Get-MessageTrace および Get-MessageTraceDetail は 2025 年 9 月 1 日より廃止が開始されます。
- Reporting Webservice を利用してメッセージ トレース データを取得している場合は、2025 年 8 月末までに新しいメッセージ トレース PowerShell コマンドレットへの移行をお願いします。新しいメッセージ トレースは Reporting Webservice では利用できず、Reporting Webservice でのメッセージ トレース サポートも 2025 年 9 月 1 日より廃止が開始されます。

新しいメッセージ トレース コマンドレットの公式ドキュメントは、一般提供 (GA) のタイミングで公開予定です。主な変更点については、[パブリック プレビュー](https://techcommunity.microsoft.com/blog/exchange/announcing-public-preview-of-the-new-message-trace-in-exchange-online/4356561) の記事をご参照ください。
