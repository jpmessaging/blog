---
title: 'ダイレクト送信の概要とセキュアに利用する方法'
date: 2025/8/6
lastupdate: 
tags:
- Exchange Online
---

※ この記事は、[What is Direct Send and how to secure it](https://techcommunity.microsoft.com/blog/exchange/what-is-direct-send-and-how-to-secure-it/4439865) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#ff7518">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px"><path fill="#ff7518" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
訳者注
</div>
本記事では Direct Send を別の単語に訳した場合に文中で使用すると意味が伝わりにくくなる場合があるため「ダイレクト送信」と訳して統一しています。<br>
公開情報等では「直接送信」などの記載になっている場合がございますので、ご注意ください。
</div>

先日公開した [Exchange Online におけるダイレクト送信の制御機能強化の導入](/blog/introducing-more-control-over-direct-send-in-exchange-online/)の記事以降、ダイレクト送信の仕組みについて多くのご質問をいただいています。本記事では、それらの疑問にお答えします。

### Exchange Online のメール フローの仕組みとは？ 

[Exchange Online](https://learn.microsoft.com/exchange/exchange-online) は、Microsoft 365 サブスクリプションに含まれる Exchange Online サービスを利用して、組織 (テナント) がクラウド上でメール サービスを運用できる環境です。テナント管理者はユーザーの作成やライセンスの割り当てを行い、ユーザーがメール サービスを利用できるように設定します。

Exchange Online サブスクリプションが有効なテナントには、インターネット上の任意のドメインからのメールを受信するための既定のインバウンド コネクタが自動的に作成されます。この既定のインバウンド コネクタはテナント管理者からは表示されず、無効化や変更を行うことはできません。

複雑なメール ルーティングが必要な組織では、管理者がカスタム コネクタやメール フロー ルールを作成して、柔軟にメール フローを構成できます。Exchange Online のコネクタやメール フロー ルールの詳細については、以下の記事をご参照ください。

- [Exchange Online でコネクタを使用してメール フローを構成する](https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow)

- [Exchange Online のメール フロー ルール (トランスポート ルール)](https://learn.microsoft.com/exchange/security-and-compliance/mail-flow-rules/mail-flow-rules)

### ダイレクト送信とは？

ダイレクト送信とは、テナントに自動的にプロビジョニングされる既定のインバウンド コネクタを経由して、各ドメインごとに自動生成されるエンドポイント アドレス (例: contoso-com.mail.protection.outlook.com) 宛てに直接メールを送信する方式を指します。この方法では、MX レコードの設定先に関係なく、カスタム インバウンド コネクタを経由せずにメールが配信されます。

ダイレクト送信の詳細については、以下の記事をご参照ください : [Microsoft 365 または Office 365 を使用してメールを送信するように多機能デバイスまたはアプリケーションをセットアップする方法](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365#direct-send-send-mail-directly-from-your-device-or-application-to-microsoft-365-or-office-365)

### ダイレクト送信をセキュアに利用するには？

一部のケースでは、ドメインの MX レコードが Microsoft 365 以外のサービスを指している場合、組織によっては既定のインバウンド コネクタ経由でメールを受信したくない、またはそのようなメールを特定の方法で処理するよう制限したい場合があります。

ダイレクト送信をセキュアに運用するための推奨策は、定義済みのインバウンド コネクタを経由したメールのみ受信するようにサービスを構成することです。具体的には、サポート記事 [Exchange Online でサードパーティ クラウド サービスを利用する際のメール フロー ベスト プラクティス](https://learn.microsoft.com/exchange/mail-flow-best-practices/manage-mail-flow-using-third-party-cloud) の手順 4 で推奨されているように、インバウンド コネクタを作成し、「RestrictDomainsToCertificate」や「RestrictDomainsToIPAddresses」などの設定を追加することで、指定したコネクタ経由のトラフィックのみに制限できます。これにより、インバウンド コネクタを通過しないメールはテナントに配信されず、拒否されます。

さらに、「Reject Direct Send」機能を有効化することも推奨されます。この機能を有効にすると、P1 送信ドメイン (エンベロープ From) がテナントの受信ドメインである場合、構成済みのインバウンド コネクタ経由でない限りメールが拒否されます。機能の詳細や設定方法については、以下の記事をご参照ください。 : [Exchange Online におけるダイレクト送信の制御機能強化の導入](/blog/introducing-more-control-over-direct-send-in-exchange-online)

#### テナントのロック ダウンや Reject Direct Send の有効化にまだ対応できない場合は？

ダイレクト送信の制限を強化することで、正当なメールも拒否されてしまうことを懸念される場合は、承認済みの送信元 IP アドレス以外から送信されたメールを隔離またはリダイレクトするトランスポート ルール (メール フロー ルール) を作成することを推奨します。

以下は、メール フロー ルールの構成例です。推奨事項として、他のルールよりも先に処理されるようにルールの優先度を 0 に設定し、「他のルールの処理を停止する」オプションを有効にしてください。 

この例はシンプル化したものです。実際の運用環境や要件に応じて、各組織でメール フロー ルールを調整してください。ルールの設定に関してご不明な点がある場合は、Microsoft サポートまでお問い合わせください。

このメール フロー ルールは、MX レコードの IP アドレスやオンプレミスの IP アドレス、その他承認済みの IP アドレス以外から Exchange Online に直接送信されたすべてのメールを隔離します (コネクタ経由 / 非経由を問わず適用されます)。

ルールのパラメーターは以下の通りです。

- このルールを適用する条件: *すべてのメッセージに適用*
- 実行する処理: *メッセージをホストされた検疫にリダイレクト* および *他のルールの処理を停止*
- 例外条件: *送信元 IP アドレスが"MX レコード、オンプレミス IP アドレス、その他承認済み IP アドレス"のいずれかに該当する場合*

または

- *'X-MS-Exchange-Organization-AuthAs' ヘッダーに「Internal」が含まれている場合*

![](DS01.jpg)

PowerShell でこれを実行するには、次のコマンドを使用します。

``` PowerShell
New-TransportRule -Name "Redirect to quarantine if not coming from known IPs" -Quarantine $true -ExceptIfHeaderContainsMessageHeader 'X-MS-Exchange-Organization-AuthAs' -ExceptIfHeaderContainsWords 'Internal' –ExceptIfSenderIpRanges ‘MX records + on-premises IPs + other authorized IPs ' -StopRuleProcessing $true -Priority 0
```
#### ダイレクト送信 (コネクタを経由しないメール) の受信状況を確認する方法は？

インバウンド コネクタを経由せずに受信したメールのレポートを生成する方法はいくつかあります。なお、MX レコードとしてサード パーティ サービスを利用している場合、そのサービスから受信したメールについてインバウンド コネクタが作成されていない場合は、これらのメールもレポートに含まれるため、必要に応じて除外するフィルタリングが必要です。

**オプション 1:** [メッセージ追跡ログ](https://learn.microsoft.com/powershell/module/exchange/start-historicalsearch?view=exchange-ps)を利用して、コネクタを経由せずに受信したすべてのインバウンド メールのレポートを生成できます。レポートは過去 90 日間分まで取得可能です。

``` PowerShell
Start-HistoricalSearch -ReportTitle DirectSendMessages -StartDate 07/01/2025 -EndDate 07/24/2025 -ReportType ConnectorReport -ConnectorType NoConnector -Direction Received -NotifyAddress admin@contoso.com 
```

上記と同様のレポートを UI から生成する場合は、Exchange 管理センターの "レポート" &gt; "メール フロー" &gt; "受信メッセージのレポート" を利用できます。詳細は [Exchange Online の新しい EAC の受信メッセージと送信メッセージ レポート](https://learn.microsoft.com/exchange/monitoring/mail-flow-reports/mfr-inbound-messages-and-outbound-messages-reports)をご参照ください（これらのレポートに含まれない例外についても記載されています）。

![](DS02.jpg)

**オプション 2:** Defender for Office P2 サブスクリプションをお持ちの組織では、Threat Explorer や Advanced Hunting を利用して追加のレポートを生成できます。

Threat Explorer では以下のフィルターを使用すると、コネクタを経由せずにテナントで受信したすべてのメールを表示できます（過去 30 日間分のデータが対象です）。

``` Text
Directionality = Inbound, Connector > equals none of > list all the Inbound connectors in the tenant comma separated (without quotes)
```

![](DS03.jpg)

Advanced Hunting では次のクエリを実行し、「CSV にエクスポート」機能を利用してください。

``` KQL
EmailEvents 
|where Timestamp > ago(30d) 
|where EmailDirection == 'Inbound' and Connectors == '' and isnotempty(SenderIPv4) 
|project Timestamp, RecipientEmailAddress, SenderFromAddress, Subject, NetworkMessageId, EmailDirection, Connectors, SenderIPv4, SenderIPv6
```
