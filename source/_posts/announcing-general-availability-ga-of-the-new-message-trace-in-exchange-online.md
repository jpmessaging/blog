---
title: 'Exchange Online の新しいメッセージ追跡の一般提供 (GA) を発表'
date: 2025-06-04
lastupdate: 2025-06-11
tags: 'Exchange Online'
---

※ この記事は、[Announcing General Availability (GA) of the New Message Trace in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/announcing-general-availability-ga-of-the-new-message-trace-in-exchange-online/4420243) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #FFFF99;"><strong>更新 2025年8月25日: </strong>Reporting Web サービスにおける従来のメッセージ追跡サポートに関する詳細情報とスケジュールを追加しました。</p>

本日、Exchange Online の Exchange 管理センター (EAC) における新しいメッセージ追跡の一般提供 (GA) を、ワールド ワイド (WW) のお客様向けに発表いたします。機能の展開は 6 月中旬より開始し、7 月中に完了する予定です。[パブリック プレビュー](https://techcommunity.microsoft.com/blog/exchange/announcing-public-preview-of-the-new-message-trace-in-exchange-online/4356561)と同様に、管理者の皆様は Exchange 管理センターの "メール フロー" > "メッセージ追跡" から新しいメッセージ追跡に既定でアクセスできるようになります。パブリック プレビュー期間中には、新しいメッセージ追跡の設計、パフォーマンス、機能の充実について多くの貴重なご意見をいただきました。今後は新しいメッセージ追跡体験への移行を進めてまいります。追加のご意見がございましたら、Exchange 管理センターの "フィードバックの送信" よりお寄せください。

## スロットリング制限

Exchange Online のリソースの不正利用や濫用のリスクを低減し、すべてのユーザーにサービスの可用性と予測可能な利用体験を提供するため、一定期間内のリクエスト数に基づくレート制限 (スロットリング) を導入します。1 テナントあたり 5 分間で最大 100 件のクエリ リクエストが受け付けられます。過去 5 分間のリクエスト数が 100 件を下回る状態ではスロットリングは適用されません。自動化などでスロットリングの閾値を超える頻度でクエリを実行している場合は、制限内に収まるように設定を見直してください。

| コマンドレット | テナント レベルの制限 |
| --- | --- |
| <a class="lia-external-url" href="https://learn.microsoft.com/powershell/module/exchange/get-messagetracev2?view=exchange-ps" target="_blank" rel="noopener noreferrer">Get-MesesageTraceV2</a> | 5 分あたり最大 100 件のリクエスト |
| <a class="lia-external-url" href="https://learn.microsoft.com/powershell/module/exchange/get-messagetracedetailv2?view=exchange-ps" target="_blank" rel="noopener noreferrer">Get-MessageTraceDetailV2</a> | 5 分あたり最大 100 件のリクエスト |

## 従来のメッセージ追跡インターフェイスおよびコマンドレットの廃止スケジュール

移行を円滑に進めるため、Exchange 管理センターの従来のメッセージ追跡のユーザー インターフェイスおよびコマンドレット（Get-MessageTrace、Get-MessageTraceDetail）は、新しいメッセージ追跡のインターフェイスおよびコマンドレット（Get-MessageTraceV2、Get-MessageTraceDetailV2）と並行して、数か月間ご利用いただけます。**従来のメッセージ追跡のインターフェイスおよびコマンドレット（Get-MessageTrace、Get-MessageTraceDetail）は、2025 年 9 月 1 日よりワールド ワイドのお客様向けに廃止プロセスが開始されます。**　

お客様からいただいたフィードバックを受けて、Reporting Web サービスによるメッセージ追跡機能のサポートを **2026 年 2 月 28 日** まで延期いたします。さらに、新しいメッセージ追跡機能を Graph API に導入する予定です。Graph API での新しいメッセージ追跡のパブリック プレビューは、現時点では 11 月を予定しています。詳細については、パブリック プレビュー公開時期が近づき次第改めてご案内いたします。

なお、このスケジュールはワールド ワイド (WW) 環境のみに適用され、GCC、GCC-High、DoD、その他のソブリン クラウドには影響しません。GCC、GCC-High、DoD、およびその他のソブリン クラウド向けのスケジュールについては、2025 年後半 (CY25H2) にご案内予定です。

## 移行に向けて必要な対応

- まだ新しいメッセージ追跡のユーザー インターフェイスをご利用でない場合は、Exchange 管理センターで新しいメッセージ追跡をご利用ください。従来のメッセージ追跡のユーザー インターフェイスは 2025 年 9 月 1 日より廃止が開始されます。
- 従来のメッセージ追跡コマンドレットを既存の自動化処理に組み込んで利用している場合は、遅くとも 2025 年 8 月末までに新しいメッセージ追跡コマンドレットへの移行をお願いします。Get-MessageTrace および Get-MessageTraceDetail は 2025 年 9 月 1 日より廃止が開始されます。
- Reporting Web サービスを利用してメッセージ追跡データを取得している場合は、2026 年 2 月までに新しいメッセージ追跡 PowerShell コマンドレットへの移行をお願いします。新しいメッセージ追跡は Reporting Web サービスでは利用できず、Reporting Web サービスでのメッセージ追跡機能も 2026 年 3 月より廃止プロセスが開始されます。

新しいメッセージ追跡コマンドレットの公式ドキュメントは、一般提供 (GA) のタイミングで公開予定です。主な変更点については、[パブリック プレビュー](https://techcommunity.microsoft.com/blog/exchange/announcing-public-preview-of-the-new-message-trace-in-exchange-online/4356561)の記事をご参照ください。
