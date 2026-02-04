---
title: >
 Graph API を使用したメッセージ トレースのサポートにおけるパブリック プレビューのご案内
date: 2026-01-22
lastupdate: 2026-02-03
tags: Exchange Online
categories:
---

<span style="background-color: yellow; font-weight: bold;">2026/2/3 編集: オンボーディングに関する詳細な手順は、[こちら](https://learn.microsoft.com/exchange/monitoring/trace-an-email-message/graph-api-message-trace) に纏めました。</span>

※ この記事は、[Message Trace Support Using Graph API is now in Public Preview](https://techcommunity.microsoft.com/blog/exchange/message-trace-support-using-graph-api-is-now-in-public-preview/4488587) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Graph API を使用したメッセージ トレースのサポートがパブリック プレビュー となったことをお知らせします。コミュニティからのフィードバックを受け、メッセージ トレース全体のエクスペリエンスを改善するための強化を行っています。
GA（一般提供）は 1 月末から展開を開始し、2 月第 1 週までに完了する予定です。
この RESTful Web API を使用すると、Exchange Online 組織全体での電子メールメッセージを追跡できます。
Graph API を使用した新しいメッセージトレース サポートは、既存の Reporting Webservice API を使用したメッセージ トレースを置き換えるものです。
詳細については、Graph API ドキュメント [exchangeMessageTrace resource type - Microsoft Graph beta | Microsoft Learn](https://learn.microsoft.com/graph/api/resources/exchangemessagetrace?view=graph-rest-beta) をご参照ください。

## オンボーディング
[サービス プリンシパルを使用しない認証の廃止](https://review.learn.microsoft.com/entra/identity-platform/retire-service-principal-less-authentication?branch=main)に伴い、本機能を利用するには追加の対応が必要となります。詳細については、以下のオンボーディング ドキュメントをご参照ください。

[Graph-based message trace API onboarding guide | Microsoft Learn](https://learn.microsoft.com/exchange/monitoring/trace-an-email-message/graph-api-message-trace)

新しいサービス プリンシパルの作成後、プロビジョニングが完了するまでに数時間かかる場合があります。
この間、401 (Unauthorized) エラーが発生する可能性がありますので、プロビジョニングが完了、及び、反映されるまで数時間お待ちください。
関連情報については、以下のページをご参照ください。

[Retirement of service principal-less authentication - Microsoft identity platform | Microsoft Learn](https://learn.microsoft.com/entra/identity-platform/retire-service-principal-less-authentication?branch=main)


## 移行ガイダンスおよび廃止スケジュール
現在、Reporting Webservice を使用したメッセージ トレースを利用している場合は、2026 年 4 月 6 日までに Graph API を使用したメッセージ トレースへ移行してください。

**Reporting Webservice を使用した Message Trace および Message Trace Detail のサポートは、2026 年 4 月 6 日から非推奨 (廃止開始) となります。**

なお、Exchange Online に新規オンボーディングされるすべての組織では、移行作業の一環として、既定では Reporting Webservice を使用したメッセージ トレースへのアクセスはすでに提供されていません。

## スロットリング
Exchange Online リソースの不正利用・悪用のリスクを低減し、すべてのユーザーに対するサービスの可用性を確保しつつ、予測可能なエクスペリエンスを提供するため、一定時間内のリクエスト数に基づくレート制限（スロットリング）を実装します。Message Trace および Message Trace Detail へのすべての呼び出しは同一の数量制限を共有します。
1 テナントあたり、5 分間の実行ウィンドウ内で最大 100 件のメッセージ トレース クエリ リクエストが受け入れられます。過去 5 分間のリクエストが 100 件未満の場合、スロットリングは適用されません。スロットリングの閾値を超えて頻繁にクエリを実行するような自動化など使用されている場合、閾値を超えないように自動化の調整をご検討ください。

なお、クエリ リクエスト数と結果サイズは同じではありません。1 回のクエリ リクエストで、最大 5,000 件の結果を返すことができます。これにより、5 分間の実行ウィンドウ内で取得可能な最大結果数は 500,000 件となります。クエリを分散させることで、1 日あたり最大 1 億 4,400 万件の結果を取得できます。このスロットリング制限は、すべてのテナントに対する公平性とサービスの可用性を確保するためのものです。

| **Cmdlet** | **テナントレベルの制限** |
| --- | --- |
| [Get-MessageTraceV2](https://learn.microsoft.com/powershell/module/exchange/get-messagetracev2?view=exchange-ps) | 5 分あたり 100 リクエスト |
| [Get-MessageTraceDetailV2](https://learn.microsoft.com/powershell/module/exchange/get-messagetracedetailv2?view=exchange-ps) | 5 分あたり 100 リクエスト |
