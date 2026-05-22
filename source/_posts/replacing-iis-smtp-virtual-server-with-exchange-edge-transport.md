---
title: "IIS SMTP 仮想サーバーから Exchange Edge Transport への移行"
date: 2026/05/25 11:00
tags:
- Exchange
---
※ この記事は、[Replacing the IIS SMTP Virtual Server with Exchange Edge Transport](https://techcommunity.microsoft.com/blog/exchange/replacing-iis-smtp-virtual-server-with-exchange-edge-transport/4517517) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

長い年月がたった今でも、サポートが終了している IIS 6.0 の SMTP 仮想サーバー機能を使い続けている環境が見られます。このコンポーネントがどれほど古いかというと、[IIS に組み込まれていた SMTP 仮想サーバー スタックは Windows Server 2003 の時代のもの](https://learn.microsoft.com/iis/application-frameworks/install-and-configure-php-on-iis/configure-smtp-e-mail-in-iis-7-and-above)です。この記事では、IIS SMTP の利用を終了し、サポートされている Microsoft のソリューションへ移行するための実践的な選択肢を紹介します (IIS SMTP 仮想サーバーはすでに長らくサポート対象外です)。

これまで [特定のシナリオ](https://learn.microsoft.com/exchange/decommission-on-premises-exchange) においては、最後のオンプレミス Exchange サーバーを残しておくことを推奨してきました。特に多いのは、すべてのメールボックスを Exchange Online に移行した後も、オンプレミスのアプリケーションがメール リレーのために Exchange を必要としているケースです。

一方で、Exchange Online のみを利用している環境では、最後のオンプレミス Exchange サーバーをすでに廃止している、あるいはもともと利用していないケースもあります。こうした環境では、さまざまな理由により、アプリケーションや Fax、プリンターから Exchange Online 経由の直接メール リレーを構成できない場合があります。このような場合、IIS SMTP の利用を廃止するための最もシンプルでサポートされた方法は、**スタンドアロンの Exchange Edge Transport サーバー**に置き換えることです。これにより、複数のアプリケーションやデバイスを個別に管理する代わりに、1 台または少数の Edge サーバーに集約して管理できるため、管理の効率化にもつながります。

あまり知られていないかもしれませんが、スタンドアロンの Exchange Edge Transport サーバーは、運用負荷は最小限に抑えることができます。

ここでの *"スタンドアロン"* の意味を明確にしておくことが重要です。スタンドアロンの Edge Transport サーバーは、**Active Directory サイトにサブスクライブされていない** 構成です。サーバーがドメイン参加しているかどうかは本質的に関係ありません。重要なのは、Edge Transport サーバーが Active Directory に対して Edge サブスクリプションされていない点です。この構成では、Active Directory 側から見ると、この Exchange サーバーの存在は認識されません。

なぜこれが重要なのでしょうか。それは、Edge Transport サーバーを AD サイトにサブスクライブすると、EdgeSync や Direct Trust 用の専用証明書、追加の運用上の考慮事項など、構成が複雑になるためです。<u>この記事の目的は、環境に不要な複雑さを持ち込まずに、レガシーな IIS 6.0 SMTP サーバーの利用を最終的に廃止できる、シンプルで手間のかからない、かつサポートされた方法を紹介することです</u>。

利用できる選択肢の全体像をつかむために、次のフローチャートをご覧ください。
![](IISreplacementflow.jpg)

¹ アプリケーションやデバイスが、Exchange Online のメールボックス宛てのみに送信するのか、それとも外部ドメインにも送信するのかを確認することが重要です。要件に応じて、次の [記事](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365) にあるオプションを検討してください。外部ドメインへの送信 (つまり Exchange Online 経由のリレー) が必要な場合は、次の方法があります。

- [TLS 証明書ベースの SMTP リレー用コネクタ](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365#configure-a-tls-certificate-based-connector-for-smtp-relay) を構成する: これはより安全なリレー方法です。証明書の Subject または Subject Alternative Name (SAN) に、Microsoft 365 の [承認済みドメイン](https://learn.microsoft.com/exchange/mail-flow-best-practices/manage-accepted-domains/manage-accepted-domains) が含まれている必要があります。

または

- [IP アドレス ベースの SMTP リレー用コネクタ](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365#configure-an-ip-address-based-connector-for-smtp-relay) を構成する: こちらはセキュリティ面で劣るため、推奨されません。この方法では、MAIL FROM に指定する送信ドメインが、テナントの承認済みドメインのいずれかと一致している必要があります。

証明書ベースと IP ベースのどちらのコネクタを選ぶ場合でも、次の [記事](https://learn.microsoft.com/troubleshoot/exchange/email-delivery/office-365-notice) に記載された要件を満たしていることを確認してください。

##### すべてのオンプレミス アプリケーションを Exchange Online に切り替えることは可能か

次のように、複数の課題 (制約) が存在する可能性があります。

- 外部へのアウトバウンド通信が許可されていないアプリケーション
- 所有者や設定が不明なレガシー アプリケーション
- 既存アプリケーションの更新や再構成が難しい

アプリケーションやデバイスから Exchange Online へ直接送信またはリレーするには、いくつかの課題があります。たとえば、TLS/STARTTLS をサポートしていないアプリケーションやデバイスがあるほか、拠点にあるプリンターなど複数のエンドポイントに対して証明書を管理すると、運用が複雑になり、セキュリティ リスクも高まります。

このような場合には、スタンドアロンの Edge Transport サーバーを導入する方がより適しています。これにより、SMTP リレー機能を集約し、個々のデバイスやアプリケーションに厳格な TLS 要件や証明書要件を求めることなく、Exchange Online や外部ドメインへ安全にメールを送信できるようになります。

##### これらのアプリケーションではどの認証方式を使っているか

たとえば、Basic 認証や NTLM を使用している場合です。これらのいずれかを使っている場合は、次の点に注意が必要です。

- [Exchange Online では SMTP の Basic 認証は廃止されます](https://jpmessaging.github.io/blog/Updated-Exchange-Online-SMTP-AUTH-Basic-Authentication-Deprecation-Timeline/)
- Exchange Online の SMTP シナリオでは NTLM はサポートされていません

そのため、これらの認証方式に依存していると、Exchange Online を利用できない可能性があります。

### IIS 6.0 SMTP の利用状況の評価

IIS SMTP サーバーを置き換えると決めたら、最初に行うべき最も重要な作業の 1 つは、現在の利用状況を詳細に評価することです。

まだログ取得を有効にしていない場合は、次の手順で設定してください。  
**IIS → SMTP Virtual Server → Properties → Enable Logging → Properties → Advanced**

その後、どのアプリケーションやシステムが IIS SMTP サーバーに依存しているかを特定できるよう、必要な拡張ログ項目をすべて選択します。

また、十分な量のデータを取得できるよう、一定期間ログを収集することをお勧めします。これにより、断続的にしか使われないアプリケーションや、利用頻度の低いシステムも把握しやすくなります。

そのほか、次の点も確認してください。

**Access タブ → 認証 (Authentication)**  
有効になっている認証方式を確認します。たとえば次のような項目です。

- 匿名アクセス (Anonymous access)
- Basic 認証 (Basic Authentication)
- 統合 Windows 認証 (Integrated Windows Authentication)

**Access タブ → リレー制限 (Relay Restrictions)**

リレーが特定の IP アドレス一覧に制限されているか、またその制限範囲が適切かを確認します。

**Delivery タブ → 詳細設定 (Advanced)**

送信メールがどのようにルーティングされているかを確認します。

- **smart host** を使用しているか、それとも **DNS 参照を直接実行しているか**

smart host を構成している場合は、次の点も確認してください。

- **Access タブ → Outbound Security** に戻る
- smart host への接続に認証が必要かどうか、および使用している認証方式を確認します。

これらの設定を Exchange Edge Transport に対応付ける際には、次の点を意識してください。

- IIS SMTP の **Access** タブで設定した内容は、通常 Edge Transport サーバーの **受信コネクタ (Receive Connector)** に対応します。
- IIS SMTP の **Delivery** タブで設定した内容は、**送信コネクタ (Send Connector)** に対応します。

IIS SMTP のログ取得を有効化し、十分なデータを収集できたら、次はログを分析して利用状況の傾向を把握します。主な確認項目は次のとおりです。

- IIS SMTP サーバーを利用しているアプリケーションの送信元 IP アドレス
- 送信者 SMTP アドレス
- 宛先 SMTP アドレス
- アプリケーションごと・日ごとのメール送信量

IIS SMTP のログは、特に大規模環境では分析しやすい形式とは言えません。そのため、有用な情報を引き出すには、主に次の方法があります。

- [Log Parser](https://www.microsoft.com/en-us/download/details.aspx?id=24659) と [Log Parser Studio](https://techcommunity.microsoft.com/blog/exchange/log-parser-studio-2-0-is-now-available/593266) を使って、独自の SQL クエリを作成する  
*または*
- IIS SMTP ログを Copilot に共有し、要件に応じて解析させる

もう 1 つ重要な評価ポイントは、アプリケーションが IIS SMTP サーバーへどのように接続する設定になっているかです。

- アプリケーションは IIS SMTP サーバーを固定 IP アドレス (ハードコード) で指定しているのか、それとも DNS エイリアスを使用しているのかを確認します。エイリアスは **CNAME** レコードまたは **ホスト (A) レコード** が使用されている場合があります。

アプリケーションが DNS エイリアスを使っている場合は、Exchange Edge Transport への移行は比較的シンプルです。この場合、DNS でエイリアスに紐づく IP アドレスを更新するだけで、メール フローを切り替えることができます。一方で、アプリケーションが固定 IP アドレスで構成されている場合は、移行の難易度が上がります。この場合は、主に以下の 2 つの方法が考えられます。

1. 各アプリケーションを個別に更新する方法 : IIS SMTP サーバーの IP アドレスを Exchange Edge Transport の IP アドレスに置き換えます。最もクリーンな方法ですが、作業時間がかかり、運用面の負荷も高くなりがちです。
2. 既存の IIS SMTP の IP アドレスを再利用する方法 : 同じ IP アドレスを Exchange Edge Transport サーバーにセカンダリ IP として割り当てます。Microsoft は一般的に Exchange 環境での IP 再利用を推奨していませんが、これは主に Active Directory と統合された Exchange の役割を想定したガイダンスです。今回のように Edge Transport がスタンドアロンであり、Active Directory にオブジェクトを保持しないため、十分に計画・管理されたうえであれば、IP 再利用は許容できる場合があります。

IIS SMTP に関するすべてのデータを収集・分析したら、Exchange Edge Transport の展開に進むことができます。

評価フェーズでさらに詳細が必要な場合は、FAQ セクションを参照してください。そこでは、一般的な注意点や IIS SMTP 特有の考慮事項について説明されています。

### Exchange Edge Transport の考慮事項

IIS SMTP を廃止し、メール リレーに Exchange Edge Transport 役割を使うと決めた場合、次に重要となるのは、Edge Transport サーバーをドメイン参加済みのマシンに展開するかどうかです。

Microsoft では一般的に、Edge Transport 役割をドメインに参加していないサーバーに展開することを推奨しています。ただし、この推奨は主に、Edge Transport を境界ネットワークに配置し、Mailbox サーバーを含む Active Directory サイトとサブスクリプションを構成する従来の Exchange 環境を前提としています。

Exchange の Mailbox 役割が存在しないシナリオでは、認証・セキュリティ・管理要件に基づいて判断する必要があります。この判断の参考として、以下の点を確認してください。

- ドメイン サービス アカウントを使って Basic 認証や統合 Windows 認証を実施する必要があるか: 必要な場合は、Edge Transport をドメイン参加サーバーとして展開する必要があります。
- ローカル アカウントで認証できるか (例: ドメイン依存のない Basic 認証): 可能な場合は、ドメイン参加していないサーバーでも対応できます。
- GPO (Group Policy Objects) や一元的なセキュリティ ベースラインを適用する必要があるか: 必要な場合、一元管理とコンプライアンス適用を実現するために、ドメイン参加構成を検討してください。

なお、Edge をドメイン参加サーバーにインストールするかどうかにかかわらず、Active Directory へのサブスクリプションを作成しない構成では、Edge のインストール時に Exchange Server 向けのスキーマ拡張や AD の事前準備は不要です。

### 要件

設計方針が決まったら、最新の状態に更新されたサーバーに Exchange Edge Transport 役割をインストールします。環境準備は [公式の前提条件ドキュメント](https://learn.microsoft.com/exchange/plan-and-deploy/prerequisites#exchange-server-edge-transport-server-role) に従って進めてください。必要なコンポーネントは次のとおりで、比較的限定されています。

- .NET Framework
- Visual C++ 2012 Redistributable
- Active Directory Lightweight Directory Services (AD LDS)

追加の Exchange 役割や依存コンポーネントは不要です。

ネットワークおよびセキュリティ:

- Edge サーバーと、メール リレーに Exchange Edge Transport を利用するアプリケーション/デバイス間では、TCP 25 番ポートの通信を許可する必要があります。通常、これらのアプリケーションやデバイスが組織内部ネットワークにある前提であるため、インターネットへは公開しない構成が一般的です。
- 外部ネットワークとの SMTP 通信を可能にするため、Edge サーバーから外部への TCP ポート 25（アウトバウンド通信）も許可する必要があります。
- 一般的なセキュリティ ベスト プラクティスに従って、サーバーを適切にセキュリティ強化 (ハードニング) を実施してください。
- Exchange Server で動作するウイルス対策ソフトについては、この [記事](https://learn.microsoft.com/exchange/antispam-and-antimalware/windows-antivirus-software) を参照してください。Edge Transport に必要な除外項目は、「Servers」列で確認できます。

高可用性が必要な場合は、2 台のスタンドアロン Edge Transport サーバーをロード バランサー配下、または DNS ラウンドロビン構成で展開することを検討してください。これにより、Windows や Exchange のパッチ適用などのメンテナンス時に発生するサービス影響を最小限に抑えられます。

### 承認済みドメイン

Exchange Edge Transport 役割のインストール手順は比較的シンプルなため、この記事では詳細な手順を取り上げません。ここでは、Edge Transport サーバーはすでに正常に展開され、稼働している前提とします。

最初のステップは、Edge Transport サーバーで承認済みドメインを構成することです。具体的なコマンド構文や必要なパラメーターについては、[関連ドキュメント](https://learn.microsoft.com/powershell/module/exchangepowershell/new-accepteddomain?view=exchange-ps) を参照してください。

なお、スタンドアロンの Edge Transport 役割には *Resolve* エンジンがありません (例: Active Directory や ADAM に対する受信者/送信者の検証機能) が存在しない点に注意が必要です。そのため、この構成においては Authoritative ドメインと Internal Relay ドメインの違いは、Edge Transport サーバーの動作に実質的な影響を与えません。

### 受信コネクタ

Edge Transport をインストールすると、[この記事](https://learn.microsoft.com/exchange/mail-flow/connectors/receive-connectors#default-receive-connectors-in-the-transport-service-on-edge-transport-servers) で説明されている通り、受信コネクタが自動的に作成されます。

要件に合わせて受信コネクタをカスタマイズするには、アプリケーションがメール リレーのために IIS SMTP をどのように使用していたかを理解する必要があります。ここでは、承認済みドメインが contoso.com のみであると仮定します。

- アプリケーションが、認証なしで contoso.com 宛てに送信している場合 (例 : [app1@contoso.com] から [john@contoso.com] への送信): 既定のコネクタを使用でき、新しいコネクタの作成は不要です。
- アプリケーションが Basic 認証または統合 Windows 認証を使い、送信元 SMTP アドレスとして contoso.com を使用して、任意の受信者へ送信する場合 (例 ： [app1@contoso.com] から [john@contoso.com] と [adele@fabrikam.com] へ送信):

1. **ExchangeUsers** のアクセス許可グループで新しい受信コネクタを作成し、認証方式として **BasicAuth** および/または **Integrated** を設定したうえで、アプリケーションの IP アドレスまたは IP アドレス範囲を **RemoteIPRanges** に追加します。
```
New-ReceiveConnector -Name "BasicAuth" -AuthMechanism BasicAuth -RemoteIPRanges "192.168.0.1" -PermissionGroups ExchangeUsers -Custom -Bindings 0.0.0.0:25
```

1. 次に、コネクタへ **ms-Exch-SMTP-Accept-Authoritative-Domain-Sender** 権限を追加します。前述のとおり、Edge Transport には Resolve エンジンがないため、認証されたユーザーのプライマリ SMTP アドレスを検証することができません。この権限を付与しない場合、"*550 5.7.60 SMTP; Client does not have permissions to send as this sender"* エラーが発生します。
```
Get-ReceiveConnector BasicAuth | Add-ADPermission -User "NT AUTHORITY\Authenticated Users" -ExtendedRights "ms-Exch-SMTP-Accept-Authoritative-Domain-Sender"
```
- アプリケーションで *オープン リレー* が必要な場合 (推奨はされません) は、この [記事](https://learn.microsoft.com/exchange/mail-flow/connectors/allow-anonymous-relay) の手順に従って設定することが可能です。

### 送信コネクタ

新規に Exchange Edge Transport をインストールした場合、既定で送信コネクタは作成されません。そのため、最初から手動で送信コネクタを構成する必要があります。

前述のとおり、まずは現在の IIS SMTP サーバーが送信リレーをどのように処理しているかを把握することが重要です。具体的には、次の点を確認します。

- DNS 参照を直接実行しているか、またはスマートホストを使用しているか (必要に応じて Basic 認証の有無も確認)
- ドメインごとに異なるルーティングを設定する必要があるか

これらの情報は、Edge Transport サーバーの送信コネクタ設定に直接影響します。送信コネクタの作成と設定に必要なコマンドやパラメーターの詳細は、[関連ドキュメント](https://learn.microsoft.com/powershell/module/exchangepowershell/new-sendconnector?view=exchange-ps) を参照してください。

### メール フローの切り替え

この段階で、IIS SMTP の評価は完了しており、アプリケーションが DNS レコード経由で接続しているのか、固定 IP アドレスで接続しているのかを把握できている前提とします。

- **DNS エイリアスを使用している場合** (例: CNAME または A レコード):  
移行は比較的シンプルです。DNS レコードの参照先を Exchange Edge Transport サーバーに更新することで、メール フローを切り替えることができます。
- **アプリケーションが固定 IP アドレスを使用している場合:**  
既存の IIS SMTP サーバーの IP アドレスを再利用する方法を検討します。手順は比較的シンプルです。
    - IIS SMTP サーバー側でネットワーク インターフェイス (NIC) を無効化する
    - IIS SMTP サーバーで使用していた IP アドレスを、Exchange Edge Transport サーバーにセカンダリ IP として割り当てる
    - IIS SMTP サーバーに紐づいていた既存の DNS A レコードを、Exchange Edge Transport サーバーを指すように更新する

ベスト プラクティスとして、本番切り替えを行う前に、まずは一部のアプリケーションでメール フローを検証してください。これにより、潜在的な問題を早期に特定し、スムーズに移行を進めることができます。

### (任意) Exchange Online をスマートホストとして設定する

Exchange Online テナントを利用している場合、Edge の送信コネクタでテナントの MX をスマートホストとして設定することで、スタンドアロン Edge Transport から Exchange Online 経由でメールをリレーできます。必須ではありませんが、Exchange Online の承認済みドメインと同じドメイン名の証明書をバインドすることを推奨します。これにより、適切な [メッセージの帰属 (message attribution)](https://jpmessaging.github.io/blog/office-365-message-attribution/) が行われ、Edge Transport から送信されるメールは Originating として扱われます。

- まず、テナントの MX レコードを確認します。確認方法はこの [付録](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365#appendix-find-the-mx-record-for-the-chosen-accepted-domain-in-microsoft-365-or-office-365) を参照してください。
- [送信コネクタのスマートホストとして MX レコードの値を設定します。](https://learn.microsoft.com/powershell/module/exchangepowershell/set-sendconnector?view=exchange-ps#-smarthosts)
- [証明書をローカル コンピューターの「個人」ストアにインポートし、SMTP サービスを割り当てます。](https://learn.microsoft.com/powershell/module/exchangepowershell/enable-exchangecertificate?view=exchange-ps)
- 証明書を送信コネクタにバインドします。
```
$Cert = Get-ExchangeCertificate -Thumbprint "<new certificate thumbprint>"
$TLSCertificateName = "<i>$($Cert.Issuer)<s>$($Cert.Subject)"
Set-SendConnector -Identity "Send Connector Identity" -TlsCertificateName $TLSCertificateName
```
- コネクタに次のプロパティを設定します。
```
Set-SendConnector -Identity "Send Connector Identity" -RequireTLS $True -TlsAuthLevel DomainValidation -TlsDomain mail.protection.outlook.com
```
- 次に、Exchange Edge Transport から送信されるこれらのメッセージを正しく識別 (属性付け) させるため、Exchange Online 側で Inbound コネクタを作成します。
```
New-InboundConnector -Name "FromEdgeTransport" -ConnectorType OnPremises -SenderDomains * -RequireTls $True -TlsSenderCertificateName "Your Certificate CN"
```

最後に、[こちら](https://learn.microsoft.com/microsoft-365/enterprise/external-domain-name-system-records?view=o365-worldwide#external-dns-records-required-for-spf) の説明に沿って、公開 DNS の SPF レコードに EOP と Edge Transport のグローバル IP アドレスを追加してください。これは、外部の受信者にメールがなりすましと判定されたり、EOP によって Edge からのメールがなりすましと判定されたりすることを防ぐための重要な設定です。さらにセキュリティを強化したい場合は、[DKIM を有効化](https://learn.microsoft.com/defender-office-365/email-authentication-dkim-configure) や、[ドメインの DMARC ポリシーを作成](https://learn.microsoft.com/defender-office-365/email-authentication-dmarc-configure) することも検討してください。

### FAQ

**IIS SMTP で Basic 認証に使用されているドメイン アカウントまたはローカル アカウントの確認方法は?**
残念ながら、IIS SMTP のログだけでは、メール送信時に Basic 認証で使用されたアカウントを確認することはできません。以下の XML クエリを使用して、セキュリティ イベント ビューアーのログをフィルターすることができます。
```
<QueryList> 
 <Query Id="0" Path="Security"> 
  <Select Path="Security"> 
   *[System[(EventID=4624)]]
    and 
   *[EventData[Data[@Name='LogonType']='3']]
    and 
   *[EventData[Data[@Name='ProcessName']='C:\Windows\System32\inetsrv\inetinfo.exe']] 
  </Select>
 </Query>
</QueryList>
```

**IIS 6.0 SMTP をやめて Exchange Edge Transport に移行するメリットは?**
IIS 6.0 はすでにサポート終了しているため、今後はセキュリティ更新プログラムや Microsoft サポートによる支援を受けることができません。技術的な観点では、Exchange Edge Transport 役割を利用することで、メール フローに関する機能や制御の幅が大きく向上します。たとえば次のような点です。

- メッセージ追跡ログやパイプライン トレースなど、より詳細なログ機能を利用できる
- 強化されたセキュリティと制御機能
- トランスポート ルールの適用が可能 (ただし、Exchange Mailbox 役割に比べると機能は限定的)

総合的に見ると、Exchange Edge Transport はレガシーな IIS SMTP と比較して、より先進的でセキュア、かつ管理しやすいソリューションと言えます。

**スタンドアロンの Edge Transport で Address Rewrite 機能は使えるか?**  
使えます。ただし、いくつか重要な注意点があります。

Inbound Address Rewrite は、スタンドアロン Edge Transport でもサポートされており、期待どおりに動作します。[ドキュメント](https://learn.microsoft.com/exchange/architecture/edge-transport-servers/address-rewriting-procedures) に記載されている標準的な手順に従って、安全に構成することができます。

一方、Outbound Address Rewrite には制約があります。この機能は **Address Rewriting Outbound Agent** に依存しており、MAIL FROM が「認証済み」として扱われる場合にのみ動作します。具体的には、*X-MS-Exchange-Organization-AuthAs: Internal* ヘッダーが付与されている必要があります。

一見すると、Basic 認証や統合 Windows 認証を使えば条件を満たせるように見えます。しかし、スタンドアロン Edge Transport 環境では **そうなりません**。スタンドアロン Edge Transport に送信する際にどの認証方式を使っても、*X-MS-Exchange-Organization-AuthAs* ヘッダーは常に **Anonymous** になります。

その結果、通常の構成では Outbound Address Rewrite エージェントは実行されません。

スタンドアロン Edge Transport でメッセージを Internal として扱わせ、Outbound Address Rewrite を有効にするための唯一のサポートされた方法は、受信コネクタに [*ExternalAuthoritative*](https://learn.microsoft.com/exchange/mail-flow/connectors/allow-anonymous-relay#configure-the-connections-as-externally-secured) 認証を設定することです。これにより、*AuthAs* の値は実質的に **Internal** になります。

ただし、*ExternalAuthoritative* を有効にすると、受信コネクタは実質的に *オープン リレー* のような状態になります。そのため、IP アドレス制限や厳格なアクセス制御などの適切な対策を必ず実施し、不正利用を防ぐ必要があります。詳細はこの [記事](https://techcommunity.microsoft.com/blog/exchange/why-is-my-address-rewriting-not-working-as-expected/607458) を参照してください。

**スタンドアロン Edge Transport から送信されるメールに対して、Microsoft 365 の IP スロットリングはどのように適用されるか?**  
「Exchange Online をスマートホストとして設定する」セクションの推奨に従っている場合、Hybrid メール フローと同様の扱いになります。オンプレミスのハイブリッド Exchange 環境からスタンドアロン Edge Transport へ移行する場合は、従来の Exchange Server で使っていたグローバル IP アドレスを、そのまま新しい Edge Transport でも継続して使うことを推奨します。これは、その IP アドレスに既存の送信実績があり、信頼性（レピュテーション）が確立されているためです。

**スタンドアロン Edge Transport を Azure VM として展開できるか?**  
展開は可能です。ただし、Azure VM からの SMTP アウトバウンドは、Enterprise Agreement または Microsoft Customer Agreement for enterprise (MCA-E) サブスクリプションを利用している場合にのみサポートされます。詳細はこの [記事](https://learn.microsoft.com/troubleshoot/azure/virtual-network/troubleshoot-outbound-smtp-connectivity) を参照してください。

また、アプリケーションから Azure VM への適切なネットワーク接続を確立する必要があります。通常は、Azure ExpressRoute などのネットワーク ルーティングを構成し、オンプレミスから Edge Transport VM へ安全かつ安定して通信できるようにします。

**Edge Transport で Exchange Online をスマートホストとして使っているが、メールが "AuthAs:Anonymous" として受信される。Internal 扱いに変更できるか?**  
Edge Transport 役割は、Edge が Mailbox Exchange Server にサブスクライブされているか、スタンドアロンかにかかわらず、ヘッダーの昇格 (header promotion) を行いません。この処理は、Mailbox 役割が担当しており、*Organization* ヘッダーを *CrossPremises* へ昇格させたうえで、Edge はその結果をそのまま使用します。ヘッダー昇格の詳細はこの [記事](https://techcommunity.microsoft.com/blog/exchange/demystifying-and-troubleshooting-hybrid-mail-flow-when-is-a-message-internal/1420838) を参照してください。

Edge Transport から送信されたメッセージを "AuthAs:Internal" として扱うための唯一の方法は、Exchange Online の Inbound コネクタで [*TreatMessagesAsInternal*](https://learn.microsoft.com/powershell/module/exchangepowershell/set-inboundconnector?view=exchange-ps#-treatmessagesasinternal) 属性を有効にすることです。この方法は、送信元ドメインが Exchange Online の承認済みドメインと一致している場合にのみ有効です。

本記事のレビューとサポートをいただいた Arindam Thokder 氏に感謝します。

