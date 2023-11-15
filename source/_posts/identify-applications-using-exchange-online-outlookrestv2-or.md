---
title: Outlook REST v2 API または Exchange Web Services (EWS) API を使用しているアプリケーションを見つける
date: 2023-11-15
tags: EXO
---
※ この記事は、[Identify applications using Exchange Online OutlookRESTv2 or Exchange Web Services (EWS) APIs](https://techcommunity.microsoft.com/t5/exchange-team-blog/identify-applications-using-exchange-online-outlookrestv2-or/ba-p/3957435) の抄訳です。最新の情報はリンク先をご確認ください。

この投稿は [EWS (Exchange Web Services) to Microsoft Graph Migration Guide Series](https://techcommunity.microsoft.com/t5/exchange-team-blog/ews-exchange-web-services-to-microsoft-graph-migration-guide/ba-p/3957158) の一部です。  

2023 年 10 月上旬に Exchange チームは Exchange Online に接続する API の利用に影響のある 2 つの大きな変更を発表しました。

- Outlook REST v2 API は 2024 年 3 月 31 日に廃止される予定です。詳細は [こちら](https://techcommunity.microsoft.com/t5/exchange-team-blog/outlook-rest-api-v2-0-and-beta-endpoints-decommissioning-update/ba-p/3920254) の情報を参照ください。
- Exchange Web Services (EWS) API を利用したリクエストは 2026 年 10 月 1 日からブロックが開始される予定です。詳細は [こちら](https://techcommunity.microsoft.com/t5/exchange-team-blog/retirement-of-exchange-web-services-in-exchange-online/ba-p/3924440) の情報を参照ください。

一部のお客様にて、これらの API を利用しているテナント内のアプリケーションを事前に特定するためのガイダンスや支援について Microsoft サポートに問い合わせをいただいています。

この記事の目的は、どのような手段が利用可能であるかを説明し、一連の詳細手順を提供することです。

Exchange Online に接続するための API のアクセス許可を付与する場所は、使用されている API に応じて以下の 2 つが存在します。

- Azure AD におけるアプリの登録: Outlook REST v2 API、Exchange Web Services (EWS)、Microsoft Graph、IMAP、POP、SMTP を含むすべての Exchagne Online の API に対して使用されます。
- Exchange Online におけるアプリケーション用の RBAC: Microsoft Graph および EWS アプリケーションにのみ使用されます。

Azure AD では 'Microsoft Entra 管理センター' または Windows PowerShell を利用することで、個々のアプリケーションそれぞれに付与されている API のアクセス許可を確認することができます。

'Microsoft Entra 管理センター' にて個々のアプリの登録を手動で確認するのは、特にテナントに数百ものアプリケーションが登録されている場合には、非常に手間と時間のかかる作業です。

Windows PowerShell を使用して Azure AD から API の権限をエクスポートすることも、気の遠くなるような作業であるため、必要な手順の詳細な説明を提供することがこの記事の目的です。  
> 注: Azure AD から API のアクセス許可をエクスポートするサンプル スクリプトは、この記事の末尾にて掲載しています。  

前述の通り、Azure AD にて付与された API のアクセス許可に加えて、Microsoft Graph と EWS API 向けには Exchange Online の RBAC の役割を通じてアクセス許可を付与することが可能であり、[こちら](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac) のドキュメントに詳細が記載されています。

現時点で、アプリケーション用の RBAC で付与された API のアクセス許可を確認する唯一の方法は、Exchange Online Management v3 PowerShell モジュールを使用することです。これらのアクセス許可を確認するための詳細な手順は、このタスクを自動化するためのサンプル スクリプトと併せて後述します。

## Azure Active Directory にて付与された API のアクセス許可をエクスポートする

前述の通り、Azure AD にて付与された API のアクセス許可を確認するには 2 つの方法があります。  

### Microsoft Entra 管理センターの GUI を利用する

- グローバル管理者にて [Microsoft Entra 管理センター](https://entra.microsoft.com/) にサインインします。
- \[ID\] メニューを展開し、 \[アプリケーション\] > \[アプリの登録\] を選択します。
- \[アプリの登録\] 画面にて、\[すべてのアプリケーション\] タブから、確認したい各アプリケーション登録を選択します。アプリケーション登録の \[概要\] ペインが開かれます。
- ウィンドウの左ペインから、\[管理\] メニュー配下の \[API のアクセス許可\] を選択します。

### PowerShell: AzureAD または Microsoft.Graph モジュールのいずれかを利用する

PowerShell で実施する場合、'AzureAD' モジュールまたは 'Microsoft.Graph' モジュールのいずれかを使用することが可能で、どちらも同じような高度なアプローチをかけることができます。

'Microsoft.Graph' モジュールをアプリケーションのアクセス許可で使用する場合には、テナントに Microsoft Graph モジュール用のアプリが登録され、'Application.Read.All' のアクセス許可が適切に付与されていることを確認ください。

これらの手順の詳細については、[Authentication module cmdlets in Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/authentication-commands?view=graph-powershell-1.0) の情報を参照ください。  

> この記事の最後に、記事で紹介したステップを自動化するために役立ついくつかのサンプル スクリプトのリンクがあります。

### 'AzureAD' PowerShell モジュールを利用する

重要: AzureAD PowerShell モジュールは 2024 年 3 月 30 日に廃止される予定です。詳細については、[Important: Azure AD Graph Retirement and Powershell Module Deprecation](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/important-azure-ad-graph-retirement-and-powershell-module/ba-p/3848270) および [Upgrade from Azure AD PowerShell to Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0) の情報を参照ください。

<ins>詳細手順</ins>

最新の Azure AD モジュールがインストールされていることを確認します。Azure AD モジュールは PowerShell 7 では利用できませんのでご注意ください。

```PowerShell
PS C:\> Get-InstalledModule 'AzureAD' | Select-Object Name, Version
Name    Version
----    -------
AzureAD 2.0.2.182
```

グローバル管理者アカウントにて Connect-AzureAD コマンドレットを実行し、Azure Active Directory に接続します。  

```PowerShell
PS C:\> Connect-AzureAD
```

`Get-AzureADApplication -All $true` コマンドを実行すると、すべてのアプリの登録を取得できます。

注: 以降の説明では、EWS の委任およびアプリケーションのアクセス許可を持つ特定のアプリの登録 (ObjectId が 7cb7d375-b0e9-40e3-8abe-4c4fcfe4e1de であるもの) を例に使用しています。

```PowerShell
PS C:\> $AppReg = Get-AzureADApplication -ObjectId 7cb7d375-b0e9-40e3-8abe-4c4fcfe4e1de
PS C:\> $AppReg | Select-Object DisplayName, AppId
DisplayName        AppId
-----------        -----
My EWS Application 5951643e-5013-442f-963c-1ee875bbe74a
```

アプリの登録について、RequiredResourceAccess コレクションを取得します。RequireResourceAccess コレクションに含まれるそれぞれのアイテムについて、ResourceAppId プロパティ (GUID) と ResourceAccess コレクションの両方を取得します。上記のコマンドで取得した特定のアプリの登録に対して、次の例では RequiredResourceAccess コレクションの最初の 1 つのオブジェクトの ResourceAppId および ResourceAccess コレクションのみを取得しています。

```PowerShell
PS C:\> $ReqResAccess = $AppReg.RequiredResourceAccess[0]
PS C:\> $ReqResAccess[0].ResourceAppId
00000002-0000-0ff1-ce00-000000000000
PS C:\> $ReqResAccess[0].ResourceAccess
Id                                   Type
--                                   ----
3b5f3d61-589b-4a3c-a359-5dd4b5ee5bd5 Scope
dc890d15-9560-4a4c-9b7f-a736ec74ec40 Role
```

取得した ResourceAppId プロパティ (GUID) を使って `Get-AzureADServicePrincipal` コマンドを実行することで、ResourceAppId に対応する Service Principal オブジェクトを Azure AD から取得します。

```PowerShell
PS C:\> $ServicePrincipal = Get-AzureADServicePrincipal -All $true | Where-Object {$_.AppId -eq $($ReqResAccess[0].ResourceAppId)}
PS C:\> $ServicePrincipal | Select-Object AppId, DisplayName
AppId                                DisplayName
-----                                -----------
00000002-0000-0ff1-ce00-000000000000 Office 365 Exchange Online
```

RequiredResourceAccess コレクション内のアイテムそれぞれに対して前記の手順をループして実行します。  

ResourceAccess コレクション内のアイテムの Type プロパティが 'Scope' の場合、そのアイテムは委任されたアクセス許可です。Service Principal オブジェクトの Oauth2Permissions コレクション内のエントリのうち、ID プロパティが対象の ResourceAccess コレクション内のアイテムの ID プロパティと合致するエントリを探します。次の例では、委任されたアクセス許可が ResourceAccess コレクション内の最初のオブジェクトであるため、インデックスが 0 となります。

```PowerShell
PS C:\> $ReqResAccess[0].ResourceAccess[0]
Id                                   Type
--                                   ----
3b5f3d61-589b-4a3c-a359-5dd4b5ee5bd5 Scope
PS C:\> $AppScope = $ServicePrincipal.Oauth2Permissions | Where-Object {$_.Id -eq "$($ReqResAccess[0].ResourceAccess[0].Id)"}
PS C:\> $AppScope | Select-Object Type, Value
Type Value
---- -----
User EWS.AccessAsUser.All
```

ResourceAccess コレクション内のアイテムの Type プロパティが 'Role' の場合、そのアイテムはアプリケーションのアクセス許可です。Service Principal オブジェクトの AppRoles コレクション内のエントリのうち、ID プロパティが対象の ResourceAccess コレクション内のアイテムの ID プロパティと合致するエントリを探します。次の例では、アプリケーションのアクセス許可が ResourceAccess コレクション内の 2 番目のオブジェクトであるため、インデックスが 1 となります。

```PowerShell
PS C:\> $ReqResAccess[0].ResourceAccess[1]
Id                                   Type
--                                   ----
dc890d15-9560-4a4c-9b7f-a736ec74ec40 Role
PS C:\> $AppRole = $ServicePrincipal.AppRoles | Where-Object {$_.Id -eq "$($ReqResAccess[0].ResourceAccess[1].Id)"}
PS C:\> $AppRole | Select-Object AllowedMemberTypes, Value
AllowedMemberTypes Value
------------------ -----
{Application}      full_access_as_app
```

### 'Microsoft.Graph' PowerShell モジュールを利用する

<ins>詳細手順</ins>

最新の Microsoft.Graph モジュールがインストールされていることを確認します。

```PowerShell
PS C:\> Get-InstalledModule 'Microsoft.Graph' | Select-Object Name, Version
Name            Version
----            -------
Microsoft.Graph 2.6.1
```

グローバル管理者アカウントにて Connect-MgGraph コマンドレットを実行し、Microsoft Graph に接続します。ベスト プラクティスとして必要最小限のアクセス許可を使用しているため、ここでは Application.Read.All を Scopes に指定します。

```PowerShell
Connect-MgGraph -Scopes Application.Read.All
```

`Get-MgApplication -All` コマンドを実行すると、すべてのアプリの登録を取得できます。

注: 以降の説明では、Microsoft Graph の委任された 'User.Read' のアクセス許可、および、アプリケーションの 'User.Read.All' のアクセス許可を持つ特定のアプリの登録 (AppId が 283a0ec7-65c3-45a8-9739-1322b5696045 であるもの) を例に使用しています。

```PowerShell
PS C:\> $AppReg = Get-MgApplication | Where {$_.AppId -eq '283a0ec7-65c3-45a8-9739-1322b5696045'}
PS C:\> $AppReg | Select-Object DisplayName, AppId
DisplayName          AppId
-----------          -----
My Graph Application 283a0ec7-65c3-45a8-9739-1322b5696045
```

アプリの登録について、 RequiredResourceAccess コレクションを取得します。RequireResourceAccess コレクションに含まれるそれぞれのアイテムについて、ResourceAppId プロパティ (GUID) と ResourceAccess コレクションの両方を取得します。次の例では RequiredResourceAccess コレクションの最初の 1 つのオブジェクトの ResourceAppId および ResourceAccess コレクションのみを取得しています。

```PowerShell
PS C:\> $ReqResAccess = $AppReg.RequiredResourceAccess[0]
PS C:\> $ReqResAccess.ResourceAppId
00000002-0000-0ff1-ce00-000000000000
PS C:\> $ReqResAccess.ResourceAccess
Id                                   Type
--                                   ----
e1fe6dd8-ba31-4d61-89e7-88639da4683d Scope
df021288-bdef-4463-88db-98f22de89214 Role
```

取得した ResourceAppId プロパティ (GUID) を使って `Get-MgServicePrincipal` コマンドを実行することで、ResourceAppId に相当する Service Principal オブジェクトを Graph から取得します。

```PowerShell
PS C:\> $ServicePrincipal = Get-MgServicePrincipal -All | Where-Object {$_.AppId -eq $($ReqResAccess.ResourceAppId)}
PS C:\> $ServicePrincipal | Select-Object AppId, DisplayName
AppId                                DisplayName
-----                                -----------
00000003-0000-0000-c000-000000000000 Microsoft Graph
```

RequiredResourceAccess コレクション内のアイテムそれぞれに対して前記の手順をループして実行します。  

ResourceAccess コレクション内のアイテムの Type プロパティが 'Scope' の場合、そのアイテムは委任されたアクセス許可です。Service Principal オブジェクトの Oauth2Permissions コレクション内のエントリのうち、ID プロパティが対象の ResourceAccess コレクション内のアイテムの ID プロパティと合致するエントリを探します。次の例では、委任されたアクセス許可が ResourceAccess コレクション内の最初のオブジェクトであるため、インデックスが 0 となります。

```PowerShell
PS C:\> $ReqResAccess.ResourceAccess[0]
Id                                   Type
--                                   ----
e1fe6dd8-ba31-4d61-89e7-88639da4683d Scope
PS C:\> $AppScope = $ServicePrincipal. Oauth2PermissionScopes | Where-Object {$_.Id -eq "$($ReqResAccess.ResourceAccess[0].Id)"}
PS C:\> $AppScope | Select-Object Type, Value
Type Value
---- -----
User User.Read
```

ResourceAccess コレクション内のアイテムの Type プロパティが 'Role' の場合、そのアイテムはアプリケーションのアクセス許可です。Service Principal オブジェクトの AppRoles コレクション内のエントリのうち、ID プロパティが対象の ResourceAccess コレクション内のアイテムの ID プロパティと合致するエントリを探します。次の例では、アプリケーションのアクセス許可が ResourceAccess コレクション内の 2 番目のオブジェクトであるため、インデックスが 1 となります。

```PowerShell
PS C:\> $ReqResAccess.ResourceAccess[1]
Id                                   Type
--                                   ----
df021288-bdef-4463-88db-98f22de89214 Role
PS C:\> $AppRole = $ServicePrincipal.AppRoles | Where-Object {$_.Id -eq "$($ReqResAccess.ResourceAccess[1].Id)"}
PS C:\> $AppRole | Select-Object AllowedMemberTypes, Value
AllowedMemberTypes Value
------------------ -----
{Application}      User.Read.All
```

## Exchange Online にて RBAC を利用してアプリケーション用に付与された API のアクセス許可をエクスポートする

注: 下記で説明する方法とは別の方法として、`Test-ServicePrincipalAuthorization` コマンドレットを実行することで RBAC を利用して付与された API のアクセス許可を確認することもできます。  

<ins>詳細手順</ins>

最新の ExchangeOnlineManagement v3 モジュールがインストールされていることを確認します。

```PowerShell
PS C:\> Get-InstalledModule 'ExchangeOnlineManagement' | Select-Object Name, Version
Name                     Version
----                     -------
ExchangeOnlineManagement 3.3.0
```

Exchange 管理者アカウントにて Connect-ExchangeOnline コマンドレットを実行し、Exchange Online に接続します。

```PowerShell
PS C:\> Connect-ExchangeOnline
```

`Get-ServicePrincipal` コマンドを実行すると、Exchange Online 内のすべての Service Principal オブジェクトを取得できます。

以降の説明では、'Application EWS.AccessAsApp' 役割が割り当てられている特定の Service Principal (Identity が 9672ee63-6e28-4ced-885e-fb595158a843 であるもの) を例に使用しています。

```PowerShell
PS C:\> $SP = Get-ServicePrincipal -Identity 9672ee63-6e28-4ced-885e-fb595158a843
PS C:\> $SP | Select-Object DisplayName, AppId
DisplayName                   AppId
-----------                   -----
SP for My EWS Application     5951643e-5013-442f-963c-1ee875bbe74a
```

Service Principal オブジェクトについて `Get-ManagementRoleAssignment` コマンドを実行し、すべての ManagementRoleAssignment を取得します。取得した ManagementRoleAssignment コレクションのそれぞれについて、Role、RoleAssignee、CustomerResourceScope を表示させるよう、ループして実行します。

```PowerShell
PS C:\> $AllMgmtRoleAssigment = Get-ManagementRoleAssignment -RoleAssignee $($SP.Identity)
PS C:\> $AllMgmtRoleAssigment[0] | Select-Object RoleAssignee, Role, CustomResourceScope
RoleAssignee                         Role                        CustomResourceScope
------------                         ----                        -------------------
9672ee63-6e28-4ced-885e-fb595158a843 Application EWS.AccessAsApp User1 scope
```

割り当てられた Role に関する詳細情報を取得したい場合には、`Get-ManagementRole` コマンドレットを実行します。

```PowerShell
PS C:\> Get-ManagementRole -Identity $($AllMgmtRoleAssigment[0].Role)
Name                        RoleType
----                        --------
Application EWS.AccessAsApp ApplicationEWSAccessAsApp
```

CustomResourceScope に関する詳細情報を取得したい場合には、RecipientWriteScope プロパティを確認します。そして、RecipientWriteScope の値に応じて、次のいずれかを実行します。

RecipientWriteScope が CustomRecipientScope の場合には、`Get-ManagementScope` コマンドレットを実行します。  

```PowerShell
PS C:\> $AllMgmtRoleAssigment[0].RecipientWriteScope
CustomRecipientScope
PS C:\> Get-ManagementScope -Identity $($AllMgmtRoleAssigment[0].CustomResourceScope)
Name        ScopeRestrictionType Exclusive RecipientRoot RecipientFilter   ServerFilter
----        -------------------- --------- ------------- ---------------   ------------
User1 scope RecipientScope       False                   Alias -eq 'user1'
```

RecipientWriteScope が AdministrativeUnit の場合には、`Get-AdministrativeUnit` コマンドレットを実行します。

```PowerShell
PS C:\> $AllMgmtRoleAssigment[1].RecipientWriteScope
AdministrativeUnit
PS C:\> get-AdministrativeUnit -Identity $AllMgmtRoleAssigment[1].CustomResourceScope
Name                                                    DisplayName
----                                                    -----------
60f565a0-9a30-40e6-a34e-4023db4616c2                    Europe Admin Unit
```

## Azure Active Directory にて付与された API のアクセス許可をエクスポートするためのサンプル スクリプト

Azure AD に登録されたそれぞれのアプリの API のアクセス許可をエクスポートするサンプル スクリプト **Export-AppReg_APIPermissions** は [こちらの GitHub サイトより利用可能](https://github.com/DirkBuntinx/Export-App-Registration-API-Permissions) です。

重要: このスクリプトは、Azure Active Directory に対して読み取り操作のみ実行します。  

このスクリプトには 3 つの必須のパラメーターがあります。詳細情報は、スクリプトのドキュメントを参照ください。  

以下にいくつか使用例を挙げます。

```PowerShell
.\Export-AppReg_APIPermissions_v1.0.ps1 -UsePSModule:Microsoft.Graph -ExportAPIPermissions:EWS -OutputPath:'C:\temp'
```

'Microsoft.Graph' PowerShell モジュールを利用して Azure AD からすべてのアプリの登録を取得し、すべての 'EWS' API のアクセス許可をディレクトリ 'C:\temp' 配下のファイル 'Export-AppReg_APIPermissions_<timestamp>.csv' にエクスポートします。

```PowerShell
.\Export-AppReg_APIPermissions_v1.0.ps1 -UsePSModule:AzureAD -ExportAPIPermissions:EWS -OutputPath:'C:\temp'
```

'AzureAD' PowerShell モジュールを利用して Azure AD からすべてのアプリの登録を取得し、すべての 'EWS' API のアクセス許可をディレクトリ 'C:\temp' 配下のファイル 'Export-AppReg_APIPermissions_<timestamp>.csv' にエクスポートします。

```PowerShell
.\Export-AppReg_APIPermissions_v1.0.ps1 -UsePSModule:Microsoft.Graph -ExportAPIPermissions:OutlookRESTv2 -OutputPath:'C:\temp'
```

'Microsoft.Graph' PowerShell モジュールを利用して Azure AD からすべてのアプリの登録を取得し、すべての Outlook REST v2 API のアクセス許可をディレクトリ 'C:\temp' 配下のファイル 'Export-AppReg_APIPermissions_<timestamp>.csv' にエクスポートします。

## Exchange Online にて RBAC を利用してアプリケーション用に付与された API のアクセス許可をエクスポートするためのサンプル スクリプト

Exchange Online 内のそれぞれの Service Principal オブジェクトについて API のアクセス許可をエクスポートするサンプル スクリプト **Export-RBAC_APIPermissions** は [こちらの GitHub サイトより利用可能](https://github.com/DirkBuntinx/Export-RBAC-for-Applications-Permissions) です。

重要: このスクリプトは、Exchange Online に対して読み取り操作のみ実行します。  

記事の投稿内容に対するフィードバックをお待ちしています。

Dirk Buntinx