---
title: "どのリソース メールボックスが実際に使われているかを把握する方法"
date: 2026/05/22 09:00
lastupdate: 2026/06/17 11:00
tags:
- Exchange Online
---

※ この記事は、[How to determine which Resource Mailboxes are being actively used](https://techcommunity.microsoft.com/blog/exchange/how-to-determine-which-resource-mailboxes-are-being-actively-used/4521577) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

今回は、何度か質問を受けたテーマを短く取り上げます。組織でリソース メールボックスを作成したものの、実際にどのメールボックスが使われているのか把握したい、というケースを考えてみてください。もっともな要望です。

ここでいうリソース メールボックスには、会議室メールボックス、設備メールボックス、Workspace が含まれます。残念ながら、本記事執筆時点では、リソース メールボックスの実際の利用状況を把握できるネイティブ レポートはありません。そこで、その状況を把握するためのいくつかの方法を紹介します。環境に合うものを選んでください。

### オプション 1: Get-CalendarViewDiagnostics を使う

[Get the ID of a meeting - Exchange | Microsoft Learn](https://learn.microsoft.com/troubleshoot/exchange/calendars/cdl/get-meeting-id#use-exchange-online-powershell)

この方法では、指定したメールボックスの予定表を確認し、指定した期間内に予定表に存在するすべての会議の情報を出力できます。

次の例では、過去 6 か月から未来 6 か月までの予定表上の会議一覧を取得します。

```powershell
Get-CalendarViewDiagnostics resource@contoso.com -WindowStartUtc (Get-Date).AddMonths(-6) -WindowEndUtc (Get-Date).AddMonths(6)
```

この方法は高速に結果を返し、対象も予定表に限定されます。一方で、会議の件名は公開されているプロパティではないため、取得できません。

ただし、どの会議室に予定が入っているか、あるいは全体件数だけを把握したいのであれば、この方法は非常に有効です。

この方法の利点は、Exchange Online PowerShell に豊富なフィルター機能があることです。たとえば、会議室メールボックスだけ、あるいは設備メールボックスだけを対象に簡単に絞り込めます。

例:

```powershell
$roommailboxes = Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails RoomMailbox
$roommailboxes | ForEach { Write-Host "Processing Mailbox $($_.Displayname)" ; Get-CalendarViewDiagnostics $_ -WindowStartUtc (Get-Date).AddMonths(-6) -WindowEndUtc (Get-Date).AddMonths(6) }
```

### オプション 2: Graph を使って予定表イベントの詳細を取得する

<div style="margin:1.25em;border-left:4px solid #f85149;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#f85149">
<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" style="margin-right:8px">
<path fill="#f85149" d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>
訳者注
</div>
Microsoft Graph PowerShell SDK はオープン ソースで開発され MIT ライセンスにより配布されているライブラリです。</br >
サポートの提供が限定的となり、本ブログ執筆時点で Calendar に関してはサポートを提供しておりません。
</div>

[List calendarView - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/graph/api/calendar-list-calendarview?view=graph-rest-1.0&tabs=powershell)

リンク先の記事の下部に、要求例が掲載されています。これを PowerShell で使うには、Microsoft.Graph.Calendar モジュールと、適切な Graph 権限を追加した Microsoft Entra ID のアプリ登録が必要です。

利用できる権限の種類は、委任された権限またはアプリケーション権限です。

- 委任された権限では、ユーザー アカウントを使って Graph API にアクセスするため、サインインが求められます。
- アプリケーション権限は、サインイン画面を使えない非対話型のアプリケーションやスクリプト向けです。

アプリケーション権限を使う例を示します。

1. Microsoft Entra ID でアプリ登録を作成します。
2. Graph のアプリケーション権限 `Calendars.Read` を追加します。これにより、アプリケーションはすべてのメールボックスの予定表データを読み取れます。
3. 認証用のクライアント シークレットを作成するか、証明書をアップロードします。証明書を使う場合は、自己署名証明書でもかまいません。
4. PowerShell を起動して Graph モジュールをインポートします。

```powershell
Import-Module Microsoft.Graph
```

5. 証明書を使って PowerShell から Graph に接続します。

```powershell
Connect-MgGraph -ClientId <App ID> -TenantId <your tenant ID> -CertificateThumbprint <cert thumbprint>
```

または、クライアント シークレットを使って接続します。

```powershell
Connect-MgGraph -ClientSecretCredential -TenantId <your tenant ID>
```

6. 指定した期間の予定表アイテムを一覧表示し、開催者、件名、開始時刻、終了時刻などのプロパティを表示します。ここでも、Get-CalendarViewDiagnostics と同じく、過去 6 か月から未来 6 か月までを対象にしています。

```powershell
Get-MgUserCalendarView -UserId resource@contoso.com -StartDateTime (Get-Date).AddMonths(-6) -EndDateTime (Get-Date).AddMonths(6) | select @{n='Organizer';e={$_.Organizer.EmailAddress.Name}}, subject, @{n='StartTime';e={$_.Start.DateTime}},@{n='EndTime';e={$_.End.DateTime}}
```

Graph にもフィルター機能はありますが、個人的には Exchange Online PowerShell ほど簡単ではありません。Exchange Online PowerShell と Graph PowerShell の両方に同じセッションで接続できるのであれば、両者を組み合わせて、変数に格納したメールボックス一覧に対して実行できます。

例:

まず、Exchange Online PowerShell でメールボックス一覧を取得します。

```powershell
$roommailboxes = Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails RoomMailbox
```

次に、Graph PowerShell を使って予定表イベントを取得します。

```powershell
$roommailboxes | foreach {Write-Host "Processing Mailbox $($_.DisplayName)"; Get-MgUserCalendarView -UserId $_.PrimarySmtpAddress -StartDateTime (Get-Date).AddMonths(-6) -EndDateTime (Get-Date).AddMonths(6) | select @{n='Organizer';e={$_.Organizer.EmailAddress.Name}}, subject, @{n='StartTime';e={$_.Start.DateTime}},@{n='EndTime';e={$_.End.DateTime}}}
```

上の例で示したもの以外にも、利用できるプロパティはあります。どのプロパティを表示したいかは、ご自身で判断する必要があります。開催者や開始、終了時刻のように Type プロパティとして返るものもあるため、上の例のように式を組み立てて処理する必要があります。Graph は、PowerShell 以外にも HTTP、C#、Java など多くの言語から利用できます。

Graph を使う方法では、特定のメールボックス群だけにアクセスを制限することもできます。たとえば、リソース メールボックスのみに限定するといったことが可能です。

[Role Based Access Control for Applications in Exchange Online | Microsoft Learn](https://learn.microsoft.com/exchange/permissions-exo/application-rbac)

これにより、Microsoft Entra ID のアプリが、どのメールボックスから予定表の詳細を取得できるかを制御できます。

設定するには、まず管理スコープを構成し、受信者フィルターを使って対象のメールボックス一覧を定義します。その後、Microsoft Entra ID 側の Graph 権限を削除し、Exchange Online 側で RBAC (`New-ManagementRoleAssignment`) を使って権限を付与します。

### オプション 3: Get-MailboxFolderStatistics を使う

非常にシンプルにリソース メールボックスの利用状況を把握したいだけであれば、Get-MailboxFolderStatistics で十分な場合があります。`IncludeOldestAndNewestItems` と `FolderScope` を組み合わせることで、予定表フォルダーを対象にできます。

例:

```powershell
Get-MailboxFolderStatistics resource@contoso.com -IncludeOldestAndNewestItems -FolderScope Calendar
```

Get-CalendarViewDiagnostics と同様に、複数の受信者に対して一括実行できます。

例:

```powershell
$roommailboxes | Foreach { Get-MailboxFolderStatistics $_ -IncludeOldestAndNewestItems -FolderScope Calendar}
```

### この用途で Get-CalendarDiagnosticObjects は使わないでください

最後に、Calendar Diagnostic Logs と Get-CalendarDiagnosticObjects コマンドレットを使おうとするケースを見かけます。*この方法は使わないでください。*

[Get Calendar diagnostic logs for Exchange Online mailboxes - Exchange | Microsoft Learn](https://learn.microsoft.com/troubleshoot/exchange/calendars/cdl/get-calendar-diagnostic-logs)

たしかに会議の詳細を取得すること自体はできますが、これは大量の予定表イベントを一括収集する目的で設計されたものではありません。もともとは、個別の会議に関する問題をトラブルシューティングするための仕組みです。Calendar Diagnostic Log のデータには、予定表だけでなく、受信トレイ、送信済みアイテム、削除済みアイテム、さらに Calendar Logging などの回復可能なアイテム フォルダーを含む、予定表関連の情報が格納されるほかのフォルダーのデータも含まれます。単一の会議を照会するだけでも、1,000 件を超えるログが返ることがあります。そのため、多数の会議を対象にメールボックスへ一括実行すると、失敗したり、タイムアウトしたり、エラーが発生したりする可能性があります。この方法を使って問題が発生し、実際その可能性はかなり高いのですが、サポートへ問い合わせても、案内するのは結局ここで紹介した別の方法になります。

まとめると、どのリソース メールボックスが実際に使われているかを把握できるネイティブ レポートはありませんが、利用できる方法はいくつかあります。既に Exchange Online PowerShell に接続しているのであれば、Get-CalendarViewDiagnostics が最も簡単な選択肢かもしれません。Get-CalendarViewDiagnostics で公開されている以上のプロパティが必要な場合や、別の言語を使うカスタム アプリケーションで利用したい場合は、Graph を使う方法を推奨します。
