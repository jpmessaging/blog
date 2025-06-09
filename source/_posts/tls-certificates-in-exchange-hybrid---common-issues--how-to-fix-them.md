---
title: Exchange ハイブリッド環境における TLS 証明書 - よくある問題とその解決方法
date: 2025-06-09 10:00:00
lastupdate: 
tags: Exchange
---

※ この記事は、[TLS Certificates in Exchange Hybrid - Common Issues & How to Fix them](https://techcommunity.microsoft.com/blog/exchange/tls-certificates-in-exchange-hybrid---common-issues--how-to-fix-them/4420592) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

## ハイブリッド メール フローの概要

Exchange Server (オンプレミス) と Exchange Online 間のハイブリッド構成では、同一ドメイン (例 : Contoso.com) の名前空間を利用し、両環境間で安全なメール ルーティングを実現します。オンプレミス環境内のサーバー間通信には自己署名証明書でも十分ですが、ハイブリッド構成を行う場合は、信頼されたサード パーティ認証局 (CA) から購入した証明書を使用し、適切に構成する必要があります。通常、ハイブリッド構成ウィザード (HCW) を実行することで、証明書の割り当てや Exchange Online との送受信コネクタの設定が自動的に行われます。しかし、オンプレミスの SMTP 用サード パーティ証明書を更新した際、メール フローに問題が発生する場合があります。

本記事では、ハイブリッド環境における Exchange 証明書関連のよくあるメール フローの問題と、その効果的な解決策について解説します。

まず初めに以下の記事を確認し、ハイブリッド メール フローの基本を理解することを強くお勧めします。

- [ハイブリッド展開の証明書要件](https://learn.microsoft.com/exchange/certificate-requirements)
- [Microsoft 365 または Office 365 と独自の電子メール サーバーの間のメールをルーティングするようにコネクタを設定する](https://docs.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/set-up-connectors-to-route-mail)
- [Demystifying and troubleshooting hybrid mail flow: when is a message internal? | Microsoft Community Hub](https://techcommunity.microsoft.com/blog/exchange/demystifying-and-troubleshooting-hybrid-mail-flow-when-is-a-message-internal/1420838)
- ハイブリッド メール フローの基本や本記事で取り上げているシナリオについて解説している動画 [Establishing Exchange Hybrid Mail flow](https://www.youtube.com/watch?v=1i_SO6nKe0o) もあわせてご覧ください。

ハイブリッド メール フローの主な構成要素はコネクタです。コネクタは 2 組存在し、Exchange Online からオンプレミス Exchange へのメール フローでは、Exchange Online 側のアウトバウンド コネクタが通常オンプレミス Exchange サーバーを宛先とします。オンプレミス側では、"Default Frontend" 受信コネクタがメールを受け取ります。逆方向、つまりオンプレミスから Exchange Online へのメール ルーティングには、「Outbound to Office 365 &lt;GUID&gt;」という名前の送信コネクタがオンプレミス側に作成され、通常は自身の Exchange Online テナントを宛先とします。Exchange Online 側ではインバウンド コネクタがオンプレミス サーバーからのメールを受け入れます。これらのコネクタは、HCW を実行することで新規作成されるか、既存のコネクタが変更されます。

![ハイブリッド メール フローで主に関与するコネクタ](Hyb01.jpg)

## Exchange 証明書を更新する際の重要な注意点

1. 証明書署名要求 (CSR) を作成する際は、`PrivateKeyExportable` を TRUE に設定し、サード パーティ証明書プロバイダーにリクエストを提出してください。詳細は [Exchange Server 証明書を更新する | Microsoft Learn](https://learn.microsoft.com/exchange/architecture/client-access/renew-certificates?view=exchserver-2019) を参照してください。

2. Exchange 管理シェルを使用して保留中の証明書要求を完了します。`Import-ExchangeCertificate` コマンドを使用する際は、特に複数の Exchange サーバーがある場合、`PrivateKeyExportable` を TRUE に設定してください。CSR 作成時に `PrivateKeyExportable` を TRUE にしていれば、証明書 MMC から新しい証明書をインポートすることも可能です。[保留中の Exchange Server 証明書要求を完了する | Microsoft Learn](https://learn.microsoft.com/exchange/architecture/client-access/complete-pending-certificate-requests?view=exchserver-2019) を参照してください。秘密鍵付きの証明書は、下図のように鍵アイコンが表示されます。

![](hyb02.jpg)

3. サーバーにリーフ証明書、中間証明書、ルート証明書が正しくインストールされていることを確認してください。

![](hyb03.jpg)

証明書チェーンの健全性をテストするには、以下のコマンドを使用できます。

```PowerShell
Get-ChildItem -Path “Cert:\LocalMachine\My\<thumbprint>” | Test-Certificate | FL
```

証明書チェーンに問題がある場合は、警告やエラーが表示されます。

![](hyb04.jpg)

4. 更新した証明書に SMTP サービスを割り当てる際、Exchange から既存のトランスポート サービス用証明書を上書きするかどうか確認されます。この警告の意味や「はい」「いいえ」を選択した場合の影響が分かりづらい場合がありますので、詳しく解説します。

デフォルトでは、Exchange サーバーは自己署名証明書をトランスポート サービスにバインドしています。現在の証明書バインド状況は、以下のコマンドで確認できます。

```PowerShell
Get-TransportService <Server Name> | FL Name, InternalTransportCertificateThumbprint
```

Exchange はこの証明書を他のトランスポート サービスとの内部通信に使用します。この証明書は自組織内のみで利用されるため、有効期限切れでも自己署名証明書を使い続けても問題ありません。

新しい証明書に SMTP サービスを割り当てると、Exchange からトランスポート証明書の上書き確認が表示されます。**注意 :** 内部トランスポート通信には自己署名証明書の継続利用を推奨します。

![](hyb05.jpg)

内部トランスポート通信で自己署名証明書をサード パーティ証明書に置き換えても基本的には問題ありませんが、Edge Transport Server で Edge サブスクリプションを利用している場合は注意が必要です。自己署名証明書は 5 年間有効ですが、サード パーティ証明書は通常 1 年です。トランスポート サービスがサード パーティ証明書を使用して Edge サブスクリプションを完了した場合、毎年 [Edge サーバーの再サブスクリプション](https://learn.microsoft.com/exchange/architecture/edge-transport-servers/edge-subscription-procedures?view=exchserver-2019#resubscribe-an-edge-transport-server) が必要になります。自己署名証明書の場合は 5 年ごとです。このため、特別な理由がない限り、デフォルトの SMTP 証明書は上書きしないことを推奨します。

5. Exchange が SMTP 通信でどの証明書を選択するかの仕組みを理解することも重要です。[受信 STARTTLS 証明書の選択 | Microsoft Learn](https://learn.microsoft.com/exchange/mail-flow/mail-routing/inbound-starttls-certificates-selection?view=exchserver-2019) に詳しく記載されていますが、Exchange はまずコネクタに設定された `TlsCertificateName` を確認し、証明書ストア内で一致する発行者・サブジェクトの証明書を検索します。同じ値の証明書が複数ある場合、有効期限が最も新しいものが選択されます。なお、Exchange は一致した証明書に SMTP サービスが有効かどうかは確認しません。そのため、証明書のインポートは SMTP サービス割り当ての準備ができてから行うことが重要です。

## Exchange 証明書を更新した後に実施すべき手順

**ハイブリッド構成ウィザード (HCW) の利用について**

前述の通り、ハイブリッド環境で証明書を更新した場合は、HCW の実行が推奨されます。最新バージョンの HCW では、コネクタ用のメール証明書のみを更新することが可能となっており、カスタム設定には影響を与えずに証明書の更新が行えます。HCW 実行時は、[Update Secure Mail Certificate for Connectors](https://learn.microsoft.com/exchange/hybrid-configuration-wizard-choose-configuration-feature#update-secure-mail-certificate-for-connectors) オプションを選択してください。詳細は [[Exchange ハイブリッド構成] を選択する](https://learn.microsoft.com/exchange/hybrid-configuration-wizard-choose-configuration-feature) をご参照ください。

ハイブリッド環境でメール フロー構成のために HCW を実行すると、既存または新規作成されるコネクタに対して以下のパラメーターが設定または変更されます。

**オンプレミス Exchange サーバー側**

- **送信コネクタ (Default Hybrid connector [Outbound to 365])**
    - AddressSpaces = smtp:&lt;domain&gt;.mail.onmicrosoft.com;1
    - CloudServicesMailEnabled = TRUE
    - DNSRoutingEnabled = TRUE
    - RequireTLS = TRUE
    - SmartHosts = 0
    - SourceTransportServers = 選択したすべてのトランスポート サーバー
    - TlsAuthLevel = DomainValidation
    - TlsCertificateName = 選択したサード パーティ証明書に応じて設定
    - TlsDomain = mail.protection.outlook.com

- **受信コネクタ (Default Frontend &lt;ServerName&gt;)**
    - AuthMechanism = Tls, Integrated, BasicAuth, BasicAuthRequireTLS, ExchangeServer
    - TlsCertificateName = 選択したサード パーティ証明書に応じて設定
    - PermissionGroups = AnonymousUsers, ExchangeServers, ExchangeLegacyServers
    - TlsDomainCapabilities = mail.protection.outlook.com:AcceptCloudServicesMail

**Exchange Online 側**

- **標準インバウンド コネクタ (Inbound from &lt;GUID&gt;)**
    - CloudServicesMailEnabled = TRUE
    - ConnectorSource = HybridWizard
    - ConnectorType = OnPremises
    - RequireTLS = TRUE
    - SenderDomains = smtp:\*;1
    - TlsSenderCertificateName = サード パーティ証明書のサブジェクトに応じて設定

- **標準アウトバウンド コネクタ (Outbound to &lt;GUID&gt;)**
    - CloudServicesMailEnabled = TRUE
    - ConnectorSource = HybridWizard
    - ConnectorType = OnPremises
    - RecipientDomains = &lt;PrimarySMTPDomain&gt;
    - RouteAllMessagesViaOnPremises = False (既定で CMT は無効)
    - SmartHosts = オンプレミス サーバーの SMTP アドレス
    - TLSDomain = サード パーティ証明書のサブジェクトに応じて設定
    - TlsSettings = DomainValidation
    - IsTransportRuleScoped = False
    - UseMXRecord = False

HCW でコネクタ構成を更新した場合、HCW 実行前後のコネクタ設定を比較することで、カスタム設定に変更がないか確認できます。

### オプション 1 – HCW を再実行する前に現在の構成をバックアップする

- いずれかのオンプレミス Exchange サーバーにログインします。
- Exchange Management Shell を開き、以下のコマンドを実行して現在のコネクタ設定をエクスポートします。
    - `Get-SendConnector | Export-Clixml c:\temp\OnPremSendConBkp.xml`
    - `Get-ReceiveConnector | Export-Clixml c:\temp\OnPremRcptConBkp.xml`

- [Exchange Online PowerShell に接続します。](https://learn.microsoft.com/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps)
- 以下のコマンドで Exchange Online 側のコネクタ設定をエクスポートします。
    - `Get-InboundConnector | Export-Clixml c:\temp\EXOInConBkp.xml`
    - `Get-OutboundConnector | Export-Clixml c:\temp\EXOOutConBkp.xml`

- メール フローの問題発生時などに以前の設定内容を確認したい場合は、次のコマンドでエクスポートした XML ファイルをインポートして比較できます。
    - `$VariableName = Import-Clixml c:\temp\<filename>.xml`

### オプション 2 – HCW 実行後に HCW ログを確認する

- ログ ファイルの場所 : *C:\Users\\&lt;Admin Profile&gt;\AppData\Roaming\Microsoft\Exchange Hybrid Configuration*
- 最新の .log ファイルを開きます。
- “actual” で検索すると、[Send connector / Receive Connector / Inbound Connector / Outbound Connector] の 4 つのテーブルが表示され、各コネクタの設定情報が確認できます。

![](hyb06.jpg)

- 'Equals' 列に False がある場合は、HCW 実行によってその項目が変更されたことを意味します。元に戻したい場合は、Actual の値に設定し直してください。
## Exchange 証明書構成を手動で更新する方法

HCW (ハイブリッド構成ウィザード) を実行せずに、サード パーティ証明書の更新後に手動でコネクタ設定を変更したい場合は、以下の項目を確認・設定してください。

**Exchange Online からオンプレミス Exchange へのメール フロー**

- **Exchange Online 側のアウトバウンド コネクタ**
    - TlsDomain はオンプレミス Exchange のサードパーティ証明書の SAN (Subject Alternative Name) と一致させてください。
    - TlsSettings は "DomainValidation" に設定してください。
    - CloudServicesMailEnabled は $True に設定してください。
    - 以下のコマンドで設定を確認してください。

        ```PowerShell
        Get-OutboundConnector -Identity "Outbound to <GUID>" | FL Name,TLSDomain,TLSSettings,CloudServicesMailEnable
        ```
        出力例 :
        ```
        Name : Outbound to <GUID>
        TlsDomain : *.contoso.com
        TlsSettings : DomainValidation
        CloudServicesMailEnabled : True
        ```

- **オンプレミス Exchange の受信コネクタ**
    - 通常 "Default Frontend" 受信コネクタが Exchange Online からの SMTP トラフィックを受け入れます。TlsCertificateName を更新したサード パーティ証明書に設定してください。以下のコマンドで設定できます。

        ```PowerShell
        $cert = Get-ExchangeCertificate -Thumbprint "<新しい証明書の拇印>"
        $TLSCertificateName = "<i>$($cert.Issuer)<s>$($cert.Subject)"
        Set-ReceiveConnector -Identity "<受信コネクタ名>" -TlsCertificateName $TLSCertificateName
        ```

**オンプレミス Exchange から Exchange Online へのメール フロー**

- **オンプレミス Exchange の送信コネクタ**
    - 通常 "Outbound to Office 365 <GUID>" コネクタが Exchange Online へのメール ルーティングを担当します。(宛先は "<domain>.mail.onmicrosoft.com")
    - TlsCertificateName を有効なサード パーティ証明書に設定してください。以下のコマンドで設定できます。

        ```PowerShell
        $cert = Get-ExchangeCertificate -Thumbprint "<新しい証明書の拇印>"
        $TLSCertificateName = "<i>$($cert.Issuer)<s>$($cert.Subject)"
        Set-SendConnector -Identity "<送信コネクタ名>" -TlsCertificateName $TLSCertificateName
        ```

- **Exchange Online 側のインバウンドコネクタ**
    - TlsSenderCertificateName がオンプレミス Exchange のサード パーティ SMTP 証明書の SAN と一致していることを確認してください。以下のコマンドで確認できます。

        ```PowerShell
        Get-InboundConnector -Identity "Inbound from <GUID>" | FL Name,TlsSenderCertificateName
        ```
        出力例 :
        ```
        Name: Inbound from <GUID>
        TlsSenderCertificateName : *.contoso.com
        ```

ハイブリッド環境の TLS 証明書構成を確認したい場合は、[Exchange Health Checker](https://aka.ms/ExchangeHealthChecker) の利用もおすすめです。

## ハイブリッド環境で Exchange SMTP 証明書を更新した後によく発生する問題とその対処法
#### Exchange Online からオンプレミス Exchange サーバーのメール フローのエラー (1)

| エラー内容 | エラー確認箇所 |
| --- | --- |
| Reason: [{LED=450 4.4.317 Cannot connect to remote server [Message=SubjectMismatch Expected<br><br>Subject: \*.contoso.com. Presented Subject: CN=ExchangeServer01. Thumbprint:<br><br>D0AC2FC63B9C5798828B45D849BE8D33.] [LastAttemptedServerName=mail.contoso.com]<br><br>[LastAttemptedIP=72.x.x.x.:25] [SmtpSecurity=-1;-1] [BN7. OutboundProxyTargetIP:<br><br>72.x.x.x. OutboundProxyTargetHostName: mail.contoso.com | Exchange Online メッセージ追跡<br>※ このエラーはオンプレミス Exchange のメッセージ追跡ログや SMTP 受信ログには<i>表示されません</i>。 |

**考えられる原因**

オンプレミス Exchange の受信コネクタで、正しい TlsCertificateName または FQDN が設定されていません。

**対処方法**

Exchange Online からの接続に対して、オンプレミス Exchange が正しい受信コネクタを使用して応答しているか確認してください。

- すべての受信コネクタで ProtocolLogging が有効になっていることを確認します。
- フロントエンド SMTP Receive ログは "%ExchangeInstallPath%\TransportRoles\Logs\FrontEnd\ProtocolLog\SmtpReceive" に保存されています。
- 最新のログファイルを開き、エラーに記載されている証明書の拇印 (Thumbprint) で検索します。該当する受信コネクタ名を確認してください。通常、Exchange Online からのトラフィックは "Default Frontend" 受信コネクタが使われます。
- 正しい受信コネクタが使用されている場合、そのコネクタの TlsCertificateName の値を確認し、EXO のアウトバウンド コネクタで設定されている TLSDomain の値と一致しているか確認します。
- 必要に応じて、以下のコマンドで正しい TlsCertificateName を設定してください。
    ``` PowerShell
    $cert = Get-ExchangeCertificate -Thumbprint "<新しい証明書の拇印>"
    $tlscertificatename = "<i>$($cert.Issuer)<s>$($cert.Subject)"
    Set-ReceiveConnector -Identity "<受信コネクタ名>" -TlsCertificateName $tlscertificatename
    ```

#### Exchange Online からオンプレミス Exchange サーバーのメール フローのエラー (2)

| エラー内容 | エラー確認箇所 |
| --- | --- |
| LED=450 4.4.317 Cannot connect to remote server [Message=451 5.7.3 STARTTLS is required to send mail] | Exchange Online メッセージ追跡 |

**考えられる原因**

証明書チェーンに問題がある場合に発生します。

**対処方法**

Frontend 受信コネクタのログを確認すると、Exchange Online からの接続で StartTLS が呼び出されていないことが分かります。

<p style="background:#F0F0F0">
2025-01-29T20:14:51.470Z,E19\Default Frontend<br>
E19,08DD34FA3086278D,3,10.0.0.1:25,104.47.58.43:57811,>,250 E19.Contoso.lab Hello [104.47.58.43] SIZE 37748736 PIPELINING DSN ENHANCEDSTATUSCODES X-ANONYMOUSTLS AUTH NTLM X-EXPS GSSAPI NTLM 8BITMIME BINARYMIME CHUNKING SMTPUTF8 XRDST,
</p>

Exchange Online からのトラフィックを受け入れる受信コネクタで設定されている TlsCertificateName の値を確認し、以下のコマンドで証明書チェーンを検証してください。エラーが表示される場合は、証明書チェーンが正しく構成されていないか、信頼されていないルート証明書ストアに登録されている可能性があります。リーフ証明書、中間証明書、ルート証明書が正しいコンテナーにインストールされているか確認してください。

``` PowerShell
Get-ChildItem -Path "Cert:\LocalMachine\My\886843E0A76558D7209FD3945B62A951FD08ECD8" | Test-Certificate |fl
WARNING: Chain status: 
    CERT_TRUST_IS_REVOKED
    CERT_TRUST_IS_UNTRUSTED_ROOT
    CERT_TRUST_REVOCATION_STATUS_UNKNOWN
    CERT_TRUST_IS_OFFLINE_REVOCATION
Test-Certificate : The certificate is revoked. 0x80092010 (-2146885616 CRYPT_E_REVOKED)
```

また、アプリケーション イベント ログも確認し、証明書や証明書チェーンに問題がある場合はイベント ID 12014 が記録されていないか確認してください。

#### オンプレミス Exchange サーバーから Exchange Onlineのメール フローのエラー (1)

| エラー内容 | エラー確認箇所 |
| --- | --- |
| {[{LED=550 5.7.51 TenantInboundAttribution; There is a partner connector configured that matched the message's recipient domain. The connector had either the RestrictDomainsToIPAddresses or RestrictDomainsToCertificate set<br>[CH3PEPF00000016.namprd21.prod.outlook.com 2025-01-29T19:07:30.476Z 08DD3FA5DBC8F401]};{MSG=};{FQDN=contoso-mail-onmicrosoft-com.mail.protection.outlook.com};{IP=52.101.194.15};{LRT=1/29/2025 7:07:29 PM}]} | オンプレミス Exchange メッセージ追跡ログ |

**考えられる原因**

オンプレミス Exchange の送信コネクタで、正しい TlsCertificateName または FQDN が設定されていません。

**対処方法**

このエラーは、受信者ドメインに対してテナント属性付与 (Tenant attribution) が行われ、サーバー IP やサーバー証明書による認証ができなかった場合に発生します。Exchange Online 側で証明書ベースのインバウンド コネクタを使用している場合、オンプレミス Exchange の送信コネクタで設定されている TlsCertificateName の値が、Exchange Online のインバウンド コネクタで設定されている TlsSenderCertificateName の値と一致しているか確認してください。一致していない場合は、以下のコマンドで正しい値に設定し直してください。

``` PowerShell
$cert = Get-ExchangeCertificate -Thumbprint "<新しい証明書の拇印>"
$tlscertificatename = "<i>$($cert.Issuer)<s>$($cert.Subject)"
Set-SendConnector -Identity "<送信コネクタ名>" -TlsCertificateName $tlscertificatename
```

また、Exchange Online 側で TlsSenderCertificateName が "\*.contoso.com" のようなワイルドカード値で設定されていない場合は、TlsSenderCertificateName の値が AcceptedDomain に追加されていることを確認してください。追加されていない場合、オンプレミス Exchange から Exchange Online へのメール送信時に同じエラーが発生します。

#### オンプレミス Exchange サーバーから Exchange Onlineのメール フローのエラー (2)

| エラー内容 | エラー確認箇所 |
| --- | --- |
| 454 4.7.5 The certificate specified in TlsCertificateName of the SendConnector could not be found. | オンプレミス Exchange メッセージ追跡ログ |

**考えられる原因**

送信コネクタに設定されている TlsCertificateName の値が正しくありません。

**対処方法**

- オンプレミス Exchange のメッセージ追跡ログを確認し、メールが Exchange サーバーで受信されたものの、その後処理されていないことを確認します。
- オンプレミス Exchange サーバーのキューを確認し、エラー内容を確認します。

このエラーは、送信コネクタに設定されている TlsCertificateName の値が、サーバーに存在する証明書と一致しない場合や、該当する証明書が無効な場合に発生します。

該当する送信コネクタの TlsCertificateName の値を、正しい Exchange 証明書と一致するように修正してください。
