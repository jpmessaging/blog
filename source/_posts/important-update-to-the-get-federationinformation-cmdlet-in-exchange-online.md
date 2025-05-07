---
title: Exchange Online の Get-FederationInformation コマンドレットに関する重要なお知らせ
date: 2025-05-07 17:00:00
lastupdate: 
tags: Exchange Online
---

※ この記事は、[Important Update to the Get-FederationInformation Cmdlet in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/important-update-to-the-get-federationinformation-cmdlet-in-exchange-online/4410095) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft では、お客様のセキュリティとプライバシーを最優先に考えています。この取り組みの一環として、Microsoft Exchange Online の **Get-FederationInformation** コマンドレットに重要な更新を行います。この変更は、認可されていないユーザーによるドメイン名の露出を制限することで、テナント情報のセキュリティを強化することを目的としています。本記事では、この変更の内容、背景にある理由、およびお客様の運用に与える可能性のある影響について説明します。

### 現在の動作

現在、**Get-FederationInformation** コマンドレットでは、認証を必要とせずに任意のユーザーが指定されたドメインのフェデレーション情報を取得することが可能です。この情報には、ターゲット テナントのすべての承認済みドメインのリストを返す "DomainNames" フィールドなどが含まれます。

例えば、次のコマンドを実行すると、次のような結果が返されます。

``` PowerShell
Get-FederationInformation -DomainName contoso.com
```

出力の例

>TargetApplicationUri : outlook.com
DomainNames : <span style="color:red">{ contoso.com, contoso.net, mail.contoso.com, …}</span>
TargetAutodiscoverEpr : https&#58;//autodiscover-s.outlook.com/autodiscover/autodiscover.svc/WSSecurity
TokenIssuerUris : {urn:federation:MicrosoftOnline}
IsValid : True
ObjectState : Unchanged

このように、対象テナントのすべてのフェデレーション ドメイン名が公開されるため、明示的な同意がない限り、この情報を共有するべきではありません。

### 変更後の動作

この問題に対処するため、Get-FederationInformation コマンドレットを更新します。今後、"DomainNames" フィールドはすべてのフェデレーション ドメイン情報を返すのではなく、パラメーターとして指定されたドメイン情報のみを含むようになります。

例えば、更新後に同じコマンドを実行すると、次のような結果が返されます。

``` PowerShell
Get-FederationInformation -DomainName contoso.com
```

出力の例

>TargetApplicationUri : outlook.com
DomainNames : <span style="color:limegreen">{ contoso.com }</span>
TargetAutodiscoverEpr : https&#58;//autodiscover-s.outlook.com/autodiscover/autodiscover.svc/WSSecurity
TokenIssuerUris : {urn:federation:MicrosoftOnline}
IsValid : True
ObjectState : Unchanged

この変更により、テナント情報のセキュリティとプライバシーが強化されます。

### お客様への影響

この変更により、現在のワークフローに影響が出る可能性があることを理解しています。特に、ターゲット テナントのすべてのフェデレーション ドメイン名を取得するために Get-FederationInformation コマンドレットに依存している場合は注意が必要です。この変更は 6 月中旬から適用される予定であり、それ以降、この情報が必要な場合は、対象テナントの管理者と直接連携する必要があります。

テナント管理者は、Get-FederatedOrganizationIdentifier コマンドレットを使用してフェデレーション ドメインのリストを取得し、必要に応じて他のテナントと共有することで、予定表の空き時間情報の共有などのテナント間の関係を確立することができます。

### 組織の関係を作成する際のチップス

Microsoft 365 にホストされているテナントとの組織の関係を作成する際には、DomainNames リストに &lt;tenant&gt;.mail.onmicrosoft.com を含めることをお勧めします。例えば、Microsoft 365 のマルチテナント エンドポイントにホストされているテナントとの組織の関係を作成する場合は、次のように指定します。

>New-OrganizationRelationship -Name "Office 365 Contoso" -Enabled $true -FreeBusyAccessEnabled $true -FreeBusyAccessLevel LimitedDetails -TargetApplicationUri outlook.com -TargetAutodiscoverEpr https&#58;//autodiscover-s.outlook.com/autodiscover/autodiscover.svc/WSSecurity -DomainNames contoso.onmicrosoft.com, **contoso.mail.onmicrosoft.com**, contoso.com

### 次のステップ

現在の Get-FederationInformation コマンドレットの使用状況を確認し、必要に応じてワークフローを調整することをお勧めします。ご不明な点やさらなるサポートが必要な場合は、ぜひお問い合わせください。

この変更の実施にあたり、ご理解とご協力をお願いいたします。Microsoft Exchange Online を引き続きご利用いただき、誠にありがとうございます。
