---
title: 'ダイレクト送信と Exchange Online テナントへの直接送信の違い'
date: 2025-08-08
lastupdate: 
tags: 'Exchange Online'
---

※ この記事は、[Direct Send vs sending directly to an Exchange Online tenant](https://techcommunity.microsoft.com/blog/exchange/direct-send-vs-sending-directly-to-an-exchange-online-tenant/4439865) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#ff7518">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px"><path fill="#ff7518" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
訳者注
</div>
本記事では Direct Send を別の単語に訳した場合に文中で使用すると意味が伝わりにくくなる場合があるため「ダイレクト送信」と訳して統一しています。<br>
公開情報等では「直接送信」などの記載になっている場合がございますので、ご注意ください。
</div>

先日公開した [Exchange Online におけるダイレクト送信の制御機能強化の導入](/blog/introducing-more-control-over-direct-send-in-exchange-online/)の記事以降、ダイレクト送信とは異なるシナリオ、たとえば送信者がドメインの MX レコードを無視して Exchange Online テナントに直接メールを送信できるのではないか、といったご質問を多くいただいています。本記事では、そうした疑問にお答えします。

### Exchange Online におけるメール フローの仕組み

[Exchange Online](https://learn.microsoft.com/exchange/exchange-online) は、Microsoft 365 サブスクリプションに Exchange Online サービスを含めて契約することで、組織 (テナント) がメール サービスをクラウド上で利用できる環境です。テナント管理者はユーザーを作成し、ライセンスを割り当てることで、ユーザーがメール サービスを利用できるように設定できます。

Exchange Online サブスクリプションが有効なテナントには、MX レコードの設定に使用できるエンドポイントが自動的に作成されます。このエンドポイントは、IP アドレスを直接指定する必要がない、使いやすい代替手段です。例えば、以下のようなエンドポイントです。

    contoso-com.mail.protection.outlook.com

**注意:** このエンドポイントは秘密にするものではなく、誰でも推測可能です。公開されているエンドポイントを知られてもセキュリティ上の脅威にはなりません。このエンドポイントには認証はなく、単にサービスの IP アドレスに解決されるだけです。たとえば、誰かが Contoso のエンドポイント宛てにメールを送信し、別のテナントのメールボックス宛てにアドレス指定した場合でも、(テナントのリージョン設定が許可していれば) そのメールは実際の受信者のテナントに配信されます。

例えば、Contoso と Fabrikam という 2 つの異なるテナントが Exchange Online 上に存在するとします。送信者が *contoso-com.mail.protection.outlook.com* を利用して Exchange Online に接続し、fabrikam.com のメールボックス宛てにメールを送信した場合、そのメールは直接 Fabrikam テナントのメールボックスに配信され、Contoso テナントは一切関与しません。(Contoso の) エンドポイントは単にサービスで共有されている IP アドレスに解決されるだけです。

この方法を利用して、あるテナントから別のテナントへメールがリレーされているというご指摘を多くいただきますが、これは<u>誤り</u>です。*テナント間でリレーが行われることはありません*。

Exchange Online には充実した保護機能が備わっており、何百万ものお客様がメールを直接受信するために当サービスを信頼してご利用いただいています。しかし一部のお客様は、より複雑なメール ルーティング構成を選択し、MX レコードを他のフィルタリング サービスやリレー サービスに向けてから Exchange Online にメールを転送するケースもあります。

メール フローに複雑なルーティングを導入する場合、その影響を十分に理解し、Exchange Online の既定の動作を変更するためのアクションを実行する必要があります。メールの設計上、既定では宛先が自組織のメールボックスであれば、直接送信されたすべてのメールを受信します。

複雑なメール ルーティングが必要な組織では、管理者がカスタム コネクタやメール フロー ルール (トランスポート ルール) を作成して、柔軟にメール フローを構成できます。Exchange Online におけるコネクタやメール フロー ルールの詳細については、以下の記事をご参照ください。

- [Exchange Online でコネクタを使用してメール フローを構成する](https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow)
- [Exchange Online のメール フロー ルール (トランスポート ルール)](https://learn.microsoft.com/exchange/security-and-compliance/mail-flow-rules/mail-flow-rules)

### "ダイレクト送信" とは？

ダイレクト送信（Direct Send）とは、上記のブログ記事で詳しく定義されている通り、ユーザーまたはオンプレミスのコネクタ認証を行わず、自分が所有するドメインから自組織のメールボックス宛てに直接メールを送信する方法を指す用語です。ダイレクト送信は、他の送信方法が利用できない場合に、自組織宛てのメール送信手段として利用されます。お客様がこの方法を利用しない場合、不正な送信者が自組織のドメインを偽装してメールボックスにメールを送信しようとした際に拒否できるよう、ダイレクト送信を無効化する設定も導入されています。ダイレクト送信によるメールは、弊社が提供する MX レコードのエンドポイントや、サード パーティ サービスが提供するエンドポイント宛てに送信され、そこからメールがルーティングされます。

ダイレクト送信およびその無効化方法の詳細については、次のブログ記事をご参照ください: [Exchange Online におけるダイレクト送信の制御機能強化の導入](/blog/introducing-more-control-over-direct-send-in-exchange-online/)。

デバイスやアプリケーションからダイレクト送信を利用してメールを送信する方法の詳細については、こちらをご参照ください: [Microsoft 365 または Office 365 を使用してメールを送信するように多機能デバイスまたはアプリケーションをセットアップする方法](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365#direct-send-send-mail-directly-from-your-device-or-application-to-microsoft-365-or-office-365)

### ダイレクト送信とは*異なる*もの

上記の定義に基づき、お客様からよくご質問をいただくのが、「ダイレクト送信」ではなく、より一般的な *Exchange Online テナントへの直接送信* というシナリオです。Exchange Online が提供するエンドポイントは公開されており、誰でもインターネット経由でそのテナント宛てにメールを送信できます。これはメールの仕組み上、当然の動作です。一方で、複雑なメール ルーティングを導入しているお客様の中には、この仕組みを「抜け道」と捉え、望ましくないと感じる場合もあります。しかし、これはメール ルーティングを複雑化した結果として生じるものであり、必要に応じて適切な対策を講じて制御する必要があります。

### MX レコードが Exchange Online を指して*いない*場合に、Exchange Online テナントへの直接送信を防ぐ方法

一部のケースでは、ドメインの MX レコードが Microsoft 365 以外のサービスを指している場合、組織として Exchange Online のエンドポイント経由でメールが直接配信されることを望まない、あるいはそのようなメールを特定の方法で処理するよう制限したい場合があります。

"Exchange Online の公開エンドポイント宛てに直接メールが送信される経路" を防ぐ推奨される解決策は、定義済みの受信コネクタ経由で届いたメール以外を拒否するようにサービスを構成することです。これには、サポート記事 [サードパーティ クラウド サービスと Exchange Online を併用する場合のメール フローのベスト プラクティス](https://learn.microsoft.com/exchange/mail-flow-best-practices/manage-mail-flow-using-third-party-cloud) の手順 4 で推奨されているように、受信コネクタを作成し、コネクタの種類に応じて "RestrictDomainsToCertificate" または "RestrictDomainsToIPAddresses" を設定して、指定したコネクタ経由のトラフィックのみに制限することで実現できます。これにより、受信コネクタを経由したメールのみがテナントに配信され、それ以外は拒否されます。これらの設定を行うことで、テナントへの直接配信を防ぐことができます。また、「ダイレクト送信の拒否」機能を有効にすることも可能です。この機能を有効にすると、P1 送信ドメイン (エンベロープ From) がテナントの承認済みドメインであり、かつインバウンド コネクタ経由でない場合、そのメールは拒否されます。詳細や設定方法については、次の記事をご参照ください: [Exchange Online におけるダイレクト送信の制御機能強化の導入](/blog/introducing-more-control-over-direct-send-in-exchange-online/)。

### テナントのロック ダウンやダイレクト送信の拒否をまだ有効化できない場合は？

直接送信を制限することで、正当なメールも拒否されてしまうことを懸念される場合は、承認済みのリモート IP 以外から送信されたメールをすべて検疫またはリダイレクトするトランスポート ルールの作成を推奨します。

以下は、メール フロー ルールの構成例です。ルールの優先度を 0 に設定して他のルールよりも先に処理されるようにし、「以降のルールは処理しない」を有効にすることを推奨します。

※ 下記はあくまでシンプルな構成例です。実際の運用環境や既存のメール フロー構成に応じて、各組織でルール内容を適切に調整してください。メール フロー ルールの設定に関してご不明な点がある場合は、Microsoft サポートまでお問い合わせください。

このメール フロー ルールは、MX レコードの IP アドレスやオンプレミスの IP アドレス、その他許可された IP アドレス以外から Exchange Online に直接送信されたすべてのメールを検疫します (コネクタ経由かどうかは問いません)。

ルールのパラメーター例は以下の通りです。

- **このルールを適用する条件:** *すべてのメッセージに適用*
- **実行する処理:** *メッセージをホストされた検疫にリダイレクト* および *他のルールの処理を停止*
- **例外条件:** *送信元 IP アドレスが"MX レコード、オンプレミス IP アドレス、その他承認済み IP アドレス"のいずれかに該当する場合*

または

- *'X-MS-Exchange-Organization-AuthAs' ヘッダーに「Internal」が含まれている場合*

![](DS01.jpg)

これを PowerShell で実行する場合は、次のコマンドを使用できます。

``` PowerShell
New-TransportRule -Name "Redirect to quarantine if not coming from known IPs" -Quarantine $true -ExceptIfHeaderContainsMessageHeader 'X-MS-Exchange-Organization-AuthAs' -ExceptIfHeaderContainsWords 'Internal' –ExceptIfSenderIpRanges ‘MX records + on-premises IPs + other authorized IPs ' -StopRuleProcessing $true -Priority 0
```

### コネクタを経由せずにテナントへ直接送信されたメールをすべて確認する方法は？

インバウンド コネクタを経由せずに受信したメールのレポートを生成する方法はいくつかあります。MX レコードとして利用しているサード パーティ サービスからのメールについて、組織でインバウンド コネクタを作成していない場合は、これらのメールもレポートに含まれるため、必要に応じて除外するフィルターを適用してください。

**以下のオプションは、MX レコードがサード パーティ サービスを指している場合に有用です。MX レコードが Exchange Online を直接指している場合は、すべての受信メールが表示される可能性があります。**

**オプション 1:** [メッセージ追跡ログ](https://learn.microsoft.com/powershell/module/exchange/start-historicalsearch?view=exchange-ps)を使用して、コネクタを経由せずに受信したすべての受信メールのレポートを生成できます。レポートは過去 90 日間分まで作成可能です。

``` PowerShell
Start-HistoricalSearch -ReportTitle DirectSendMessages -StartDate 07/01/2025 -EndDate 07/24/2025 -ReportType ConnectorReport -ConnectorType NoConnector -Direction Received -NotifyAddress admin@contoso.com
```

上記と同様のレポートを UI から生成する場合は、Exchange 管理センターの [レポート] &gt; [メール フロー] &gt; [受信メッセージのレポート] から利用できます。詳細は [Exchange Online の新しい EAC の受信メッセージと送信メッセージ レポート](https://learn.microsoft.com/exchange/monitoring/mail-flow-reports/mfr-inbound-messages-and-outbound-messages-reports) をご参照ください (これらのレポートに含まれないメッセージの例外についてもご注意ください)。

![](DS02.jpg)

**オプション 2:** Defender for Office P2 サブスクリプションをお持ちの組織では、Threat Explorer や Advanced Hunting を活用して、さらに詳細なレポートを作成できます。

Threat Explorer で以下のフィルターを使用すると、コネクタを経由せずにテナントで受信したすべてのメールを表示できます（過去 30 日間分のデータが取得可能です）。

**Directionality = Inbound, Connector &gt; equals none of &gt;** *list all the Inbound connectors in the tenant comma separated (without quotes).*

![](DS03.jpg)

Advanced Hunting で以下のクエリを実行し、結果を CSV 形式でエクスポートすることも可能です。

```
EmailEvents
|where Timestamp > ago(30d)
|where EmailDirection == 'Inbound' and Connectors == '' and isnotempty(SenderIPv4)
|project Timestamp, RecipientEmailAddress, SenderFromAddress, Subject, NetworkMessageId, EmailDirection, Connectors, SenderIPv4,
```

送信元 IP アドレスごとにメール数を集計するクエリ例は以下の通りです。

``` KQL
EmailEvents
| where EmailDirection == "Inbound" and Timestamp>= ago(30d) and Connectors == "" and isnotempty(SenderIPv4)
| summarize count() by SenderIPv4
```
