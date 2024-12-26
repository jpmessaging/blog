---
title: 'Exchange Online のクライアント アクセス ルール廃止に関する最新情報'
date: 2024-12-23
lastupdate:
tags: 'Exchange Online'
---
※ この記事は、[Update on Client Access Rules Deprecation in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/update-on-client-access-rules-deprecation-in-exchange-online/4354809) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2022 年 9 月に、Exchange Online でのクライアント アクセス ルール（CARs）の廃止を開始することを[発表](https://techcommunity.microsoft.com/t5/exchange-team-blog/deprecation-of-client-access-rules-in-exchange-online/ba-p/3638563)しました。それ以来、アクティブルールのないテナントではすでに CARs が廃止されています。CARs は 2025 年 9 月 1 日にすべてのテナントで廃止されます。さらに、テナントが期限前に CARs をオフにすることを選択した場合、私たちはそのテナントの CARs を無効にします。スムーズな移行を確保し、継続的アクセス評価（CAE）を備えた条件付きアクセス（CA）が提供する強化されたセキュリティ機能を活用するために、できるだけ早く CARs から移行することをお勧めします。

### 背景

CARs は、クライアントのプロパティやクライアント アクセス要求に基づいて Exchange Online 組織へのアクセスを制御するのに役立ちます。ただし、CARs は現在レガシー技術と見なされています。さらに、サービスで定義された CARs は Exchange Online でのみ機能します。
CARs の代わりに [条件付きアクセス](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/overview) (CA) と [継続的アクセス評価](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-continuous-access-evaluation) (CAE) を使用することをお勧めします。CAE は、IP ロケーションベースの CA ポリシーを構成するときにロケーション ポリシーが適用されることを保証します。複数の Microsoft 365 サービスが CAE をサポートしており、Exchange Online、SharePoint Online、Teams などが含まれます。

Exchange Online のみを考慮しても、Exchange Online にはこれまでに多くの新しいプロトコルやサービスが導入されており、CARs を強制するプロトコルはごく一部に過ぎません。それに対して、CA と CAE はこれらのサービスへのアクセスを真に許可またはブロックすることができます。さらに、CARs は IP アドレス、プロトコル、ユーザーによるフィルタリングなどの基本的な強制しか提供しません。デバイスの物理的な場所、多要素認証 (MFA)、デバイスのコンプライアンスなど、より高いセキュリティ基準に必要な最新の強制コントロールが欠けています。

これにより、CARs は時代遅れとなり、高いセキュリティ要件を満たすには不十分です。CARs が提供する限られた機能は、CA および CAE と重複しています。Exchange Online は CAE を実装しており、IP ロケーション CA ポリシーが Exchange Online へのアクセスごとに評価されるため、CARs と同等の機能を提供します。

条件付きアクセスは、ポリシーの適用方法に関する可視性をIT管理者に提供する豊富な監視およびレポート機能も提供します。Microsoftは、Entra ID サービスの一環として CA および CAE の両方を強化し続けており、この分野での継続的な改善と投資を確保しています。

なお、Exchange Server オンプレミスの CAR は、この廃止およびガイダンスとは完全に別物であり、引き続きオンプレミスで個別に管理されます。

### CARs から CAE への移行

CARs を使用している場合、2025 年 9 月 1 日以降は使用できなくなります。CARs から移行するには、次の点を考慮してください:

- [必要な IP ロケーション条件付きアクセス ポリシーを構成する](https://learn.microsoft.com/entra/identity/conditional-access/policy-block-by-location) ことで、Exchange Online にアクセスする際に [継続的アクセス評価](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation#example-flow-diagrams) を使用した IP ロケーションの強制を有効にします。
- [Set-CASMailbox](https://learn.microsoft.com/powershell/module/exchange/set-casmailbox?view=exchange-ps) および [Set-CASMailboxPlan](https://learn.microsoft.com/powershell/module/exchange/set-casmailboxplan?view=exchange-ps) コマンドレットを使用して、特定のプロトコルに対するメールボックスのクライアント アクセス設定を構成します。たとえば、Exchange ActiveSync、Outlook、Outlook on the web、POP3、および IMAP4 の設定を構成できます。

<strong><em>2025 年 9 月までに</em> 対応する必要があります。&nbsp; この日以降、既存の CAR は機能しなくなります。</strong>


### 移行オプション

単一ルールの移行は、以下の表に示すように、IP アドレス条件とプロトコル条件のバリエーションを使用して 3 つのカテゴリに分類されます。
この表を使用して、ルールがどのカテゴリに該当するかを分析してください。
新しい CA ルールを設定する前にテストすることをお勧めします。
また、CA を設定した後、ポリシーが Exchange Online と同期するのを待つために、CAR を削除する前に 24 時間待つことをお勧めします。
これにより、テナントがルールによって保護されていない期間がないことを確認できます。

<table border="1" width="646px">
<tbody>
<tr>
<td width="200.891px">
<p>&nbsp;</p>
</td>
<td width="58.7969px">
<p>&nbsp;</p>
</td>
<td colspan="2" width="385.312px">
<p><strong>AnyOfClientIPAddressesOrRanges</strong> または <strong>ExceptAnyOfClientIPAddressesOrRanges</strong> が設定されているか</p>
</td>
</tr>
<tr>
<td width="200.891px">
<p>&nbsp;</p>
</td>
<td width="58.7969px">
<p>&nbsp;</p>
</td>
<td width="203.562px">
<p>いいえ</p>
</td>
<td width="181.75px">
<p>はい</p>
</td>
</tr>
<tr>
<td rowspan="2" width="200.891px">
<p><strong>AnyOfProtocols</strong> または <strong>ExceptAnyOfProtocols</strong> が設定されているか</p>
</td>
<td width="58.7969px">
<p>いいえ</p>
</td>
<td width="203.562px">
<p><span style="color: green;">サポートされています</span></p>
<p>以下の「ユーザーのみを対象としたルールの移行」セクションを参照してください。</p>
</td>
<td width="181.75px">
<p><span style="color: green;">サポートされています</span></p>
<p>以下の「IP アドレスのみを対象としたルールの移行」セクションを参照してください。</p>
</td>
</tr>
<tr>
<td width="58.7969px">
<p>はい</p>
</td>
<td width="203.562px">
<p><span style="color: orange;">部分的にサポートされています</span></p>
<p>以下の「プロトコルのみを対象としたルールの移行」セクションを参照してください。</p>
</td>
<td width="181.75px">
<p><span style="color: red;">サポートされていません</span></p>
<p>「IP アドレスおよびプロトコル条件を持つルールについて」を参照してください。</p>
</td>
</tr>
</tbody>
</table>



### カテゴリ 1: ユーザーのみを対象としたルールの移行

これらのルールには、IPアドレスやプロトコルに基づく条件はありません。基本的に、Exchange Online全体へのアクセスを許可または拒否します。

<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1" width="623px">
<thead>
<tr>
<td width="392">
<p><strong>クライアント アクセス ルールが次のようになっている場合</strong></p>
</td>
<td width="231">
<p><strong>次の操作を行います</strong></p>
</td>
</tr>
<tr>
<td width="392">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : contoso.com\jsmith<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
</td>
<td width="231">
<p>CAR で使用されている同じユーザーを参照して、Exchange Online アプリケーションへのアクセスを許可または拒否する条件付きアクセス ポリシーを作成します。</p>
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="392">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : contoso.com\admin*<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
</td>
<td width="231">
<p>ユーザー プリンシパル名プロパティの正規表現を基準として使用する動的メンバーシップを持つセキュリティ グループを作成します（domain\user 形式はサポートされていません）。詳細はこちらをご覧ください: <a href="https://learn.microsoft.com/entra/identity/users/groups-dynamic-membership" target="_blank" rel="noopener noreferrer">Microsoft Entra ID での動的メンバーシップ グループのルール管理</a>。</p>
<p>次に、Exchange Online アプリケーションへのアクセスを許可または拒否する条件付きアクセス ポリシーを作成し、上記のセキュリティ グループを参照する条件を設定します。</p>
</td>
</tr>
<tr>
<td width="392">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : City -eq 'Redmond'</pre>
</td>
<td width="231">
<p>同じフィルターを使用する動的メンバーシップを持つセキュリティ グループを作成します。詳細はこちらをご覧ください: <a href="https://learn.microsoft.com/entra/identity/users/groups-dynamic-membership" target="_blank" rel="noopener noreferrer">Microsoft Entra ID での動的メンバーシップ グループのルール管理</a>。</p>
<p>CAR で使用されている同じセキュリティ グループを参照して、Exchange Online アプリケーションへのアクセスを許可または拒否する条件付きアクセス ポリシーを作成します。</p>
</td>
</tr>
</thead>
</table>
</div>

### カテゴリ 2: IP アドレスのみを対象としたルールの移行

これは、プロトコル条件（AnyOfProtocols または ExceptAnyOfProtocols のいずれか）を指定せずに、IP アドレス条件（AnyOfClientIPAddressesOrRanges または ExceptAnyOfClientIPAddressesOrRanges のいずれか）を指定するルールに適用されます。

これらのルールには、ユーザーに基づく条件（UsernameMatchesAnyOfPatterns、ExceptUsernameMatchesAnyOfPatterns、UserIsMemberOf、ExceptUserIsMemberOf のいずれか）が含まれている場合と含まれていない場合があります。
上記のセクションで説明した手順は、ユーザーを指定する方法のバリエーションに対しても適用されます。
<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1" width="623px">
<thead>
<tr>
<td width="392">
<p><strong>クライアント アクセス ルールが次のようになっている場合</strong></p>
</td>
<td width="231">
<p><strong>次の操作を行います</strong></p>
</td>
</tr>
<tr>
<td width="392">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 203.0.113.4<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p><strong>または</strong></p>
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : 203.0.113.4<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
</td>
<td width="231">
<p>これらの IP アドレスに対して Exchange Online アプリケーションへのアクセスを許可または拒否する条件付きアクセス ポリシーを作成します。</p>
<p><a href="https://learn.microsoft.com/entra/identity/conditional-access/concept-assignment-network" target="_blank" rel="noopener noreferrer">条件付きアクセス ポリシーのネットワーク</a></p>
<p>&nbsp;</p>
<p>ポリシーを設定するための手順については、<a href="https://learn.microsoft.com/entra/identity/conditional-access/policy-block-by-location" target="_blank" rel="noopener noreferrer">条件付きアクセス - 場所によるアクセスのブロック</a> を参照してください。</p>
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="392">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 203.0.113.4<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : contoso.com\jsmith<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p><strong>または</strong></p>
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : 203.0.113.4<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : contoso.com\jsmith<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
</td>
<td width="231">
<p>これらの IP 範囲に対して、特定のユーザーにのみ適用される条件付きアクセス ポリシーを作成します。</p>
</td>
</tr>
</thead>
</table>
</div>

上記の例のいずれかに一致する条件付きアクセス ポリシーを作成するためのサンプル手順:

    $params = @{ 
        "@odata.type" = "#microsoft.graph.ipNamedLocation" 
        DisplayName = "Corp network IPv4 address" 
        IsTrusted = $true 
        IpRanges = @( 
            @{ 
                "@odata.type" = "#microsoft.graph.iPv4CidrRange" 
                CidrAddress = "203.0.113.4/32" 
            } 
        )
    }
    $namedLocation = New-MgIdentityConditionalAccessNamedLocation -BodyParameter $params 
    $params = @{
         displayName = "Allow access only from corp network." 
         state = "enabled" 
         conditions = @{ 
            clientAppTypes = @("all") 
            applications = @{ includeApplications = @("00000002-0000-0ff1-ce00-000000000000") } 
            locations = @{ includeLocations = @($namedLocation.Id) }
        } 
        grantControls = @{ 
            operator = "OR" 
            builtInControls = @("block") 
        }
    }
    New-MgIdentityConditionalAccessPolicy -BodyParameter $params



### カテゴリ 3: プロトコルのみを対象としたルールの移行

これは、プロトコル条件（AnyOfProtocols または ExceptAnyOfProtocols のいずれか）を指定するが、IP アドレス条件（AnyOfClientIPAddressesOrRanges または ExceptAnyOfClientIPAddressesOrRanges のいずれか）を指定しないルールに適用されます。

#### プロトコルが Active Sync、Admin Center、EWS、IMAP、OutlookAnywhere、OWA、または POP の場合

<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1" width="623px">
<thead>
<tr>
<td width="391.547px">
<p><strong>クライアント アクセス ルールが次のようになっている場合</strong></p>
</td>
<td width="230.453px">
<p><strong>次の操作を行います</strong></p>
</td>
</tr>
<tr>
<td width="391.547px">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <br>{OutlookWebApp, ExchangeWebServices}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
</td>
<td width="230.453px">
<p>このルールが適用される既存のユーザー（メールボックスとライセンスを持つ）に対して、次のコマンドを実行します（例として、OWA と EWS を使用）：</p>
<p>Set-CASMailbox -EwsEnabled  -OWAEnabled </p>
<p>これらの制限を特定のライセンスを持つすべての将来のユーザーに適用したい場合、次の CAS メールボックス プランを作成することもできます（上記の Set-CASMailbox と同じ例を使用）：</p>
<p>Set-CASMailboxPlan -EwsEnabled  -OWAEnabled </p>
<p>ただし、特定の新しいユーザーにのみ適用したい場合は、将来そのユーザーに対して Set-CASMailbox を実行する必要があります。</p>
<p>（注：以下の表で、CARs パラメーター名に対応する Set-CASMailboxPlan パラメーター名を参照してください。）</p>
</td>
</tr>
</thead>
</table>
</div>


#### プロトコルが RemotePowerShell の場合

<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1">
<tbody>
<tr>
<td width="392">
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : RemotePowerShell<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p>&nbsp;</p>
</td>
<td width="231">
<p>このルールが適用される既存のユーザーに対して、次のコマンドを実行します:</p>
<p>Set-User –RemotePowerShellEnabled </p>
<p>このルールが適用される新しいユーザーに対しても、同じ方法で Set-User を再度実行する必要があります。Set-CASMailboxPlan は、特定のライセンスが適用されたメールボックスを持つユーザーにのみ適用されるため、この場合カバレッジにギャップが生じます。しかし、RPS はメールボックスやライセンスを持たないユーザーでも使用できるため、将来のユーザーに対してもギャップを防ぐために Set-User を適用する必要があります。</p>
</td>
</tr>
</tbody>
</table>
</div>



#### プロトコルが OfflineAddressBook、PowerShellWebServices、または REST の場合

これは、プロトコルのみを対象としたルールで、プロトコルが次のいずれかである場合に適用されます: OfflineAddressBook、PowerShellWebServices、REST。
<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1">
<tbody>
<tr>
<td width="392">
<pre>ルールは特定のプロトコルおよび特定のユーザー名/ユーザー名パターン/ユーザーグループ<br>に適用されますが、IP 範囲には適用されません。プロトコルが次のいずれかの場合: <br>OfflineAddressBook、PowerShellWebServices、REST。<br><br>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : REST<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p>&nbsp;</p>
</td>
<td width="231">
<p>OfflineAddressBook、PowerShellWebServices、REST のプロトコルに対して他のコマンドレットを使用する同等の方法はありません。</p>
<p>OfflineAddressBook は Outlook Win32 および Outlook for Mac のみが使用するサービスであり、OutlookAnywhere を使用して Outlook Win32 へのユーザーアクセスをブロックする場合、Outlook クライアントが OfflineAddressBook にアクセスすることはないため、OfflineAddressBook をブロックする必要はありません。</p>
</td>
</tr>
</tbody>
</table>
</div>

#### IP アドレスおよびプロトコル条件を持つルールについて

これは、プロトコル条件（AnyOfProtocols または ExceptAnyOfProtocols のいずれか）と IP アドレス条件（AnyOfClientIPAddressesOrRanges または ExceptAnyOfClientIPAddressesOrRanges のいずれか）を指定するルールに適用されます。

複数のルールがあり、それらのルールが異なる IP アドレスまたはアドレス範囲を使用しているが、すべてのユーザーに対して同じプロトコルリストを持っている場合、これらの IP アドレスを持つ IP ロケーション CA ポリシーを構成し、プロトコルの条件を CASMailbox および CASMailboxPlan に移行できます。
<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1" width="623px">
<tbody>
<tr>
<td width="392">
<p><strong>クライアント アクセス ルールが次のようになっている場合</strong></p>
</td>
<td width="231">
<p><strong>次の操作を行います</strong></p>
</tr>
<tr>
<td width="392">
<p>ルール 1:</p>
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 203.0.113.4<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : OutlookAnywhere<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p>ルール 2:</p>
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 203.0.201.10<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : OutlookAnywhere<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
</td>
<td width="231">
<p>これらの異なる IP アドレスセットに対して、Exchange Online アプリケーションへのアクセスを許可または拒否する条件付きアクセス ポリシーを作成します。</p>
<p>&nbsp;</p>
<p>Set-CASMailbox を使用して、既存のすべてのユーザーに対して MapiEnabled を除くすべてのプロトコルへのアクセスを無効にします。Set-CASMailboxPlan を使用して、将来作成されるすべてのユーザーに同じポリシーを設定します。</p>
</td>
</tr>
</tbody>
</table>
</div>

複数のルールがあり、それらのルールが異なるプロトコルセットを持っているが、同じ IP アドレスまたはアドレス範囲を持っている場合、IP ロケーション CA ポリシーと CASMailbox および CASMailboxPlan を構成できます。
<div class="styles_lia-table-wrapper__h6Xo9 styles_table-responsive__MW0lN">
<table border="1" width="623px">
<thead>
<tr>
<td width="392" height="31px">
<p><strong>クライアント アクセス ルールが次のようになっている場合</strong></p>
</td>
<td width="231" height="31px">
<p><strong>次の操作を行います</strong></p>
</td>
</tr>
</thead>
<tbody>
<tr>
<td width="392" height="601px">
<p>ルール 1:</p>
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 203.0.113.4<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : OutlookAnywhere<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
<p>ルール 2:</p>
<pre>AnyOfClientIPAddressesOrRanges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 203.0.113.4<br>ExceptAnyOfClientIPAddressesOrRanges : {}<br>AnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptAnyOfProtocols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : ExchangeActiveSync<br>UsernameMatchesAnyOfPatterns&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}<br>ExceptUsernameMatchesAnyOfPatterns&nbsp;&nbsp; : {}<br>UserRecipientFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}</pre>
</td>
<td width="231" height="601px">
<p>その IP アドレスに対して、Exchange Online アプリケーションへのアクセスを許可または拒否する条件付きアクセス ポリシーを作成します。</p>
<p>&nbsp;</p>
<p>Set-CASMailbox を使用して、既存のすべてのユーザーに対して MapiEnabled および ActiveSync を除くすべてのプロトコルへのアクセスを無効にします。Set-CASMailboxPlan を使用して、将来作成されるすべてのユーザーに同じポリシーを設定します。</p>
</td>
</tr>
</tbody>
</table>
</div>


ただし、複数のルールがあり、それらのルールが異なるプロトコルセットと異なる IP アドレスセットまたはアドレス範囲を持っている場合、それらのルールに対する移行オプションはありません。私たちの推奨は、すべてのアドレスのスーパーセットである単一の IP アドレスセットまたはアドレス範囲を持つようにルールを調整し、それを条件付きアクセス ポリシーで Exchange Online アプリケーションに適用することです。

### Set-CASMailboxPlan に対応するパラメーター

以下は、CARs プロトコル名と Set-CASMailboxPlan に対応するパラメーターの表です:

| **CARs プロトコル** | **SetCASMailboxPlan パラメーター** |
| --- | --- |
| ExchangeActiveSync | ActiveSyncEnabled |
| ExchangeAdminCenter | ECPEnabled |
| ExchangeWebServices | EwsEnabled |
| IMAP4 | ImapEnabled |
| OutlookAnywhere | MAPIEnabled |
| OutlookWebApp | OWAEnabled |
| POP3 | PopEnabled |

### よくある質問

*1. IP ベースのポリシー CARs を条件付きアクセスに移行しました。Exchange Online へのアクセス ポリシーは以前と同じように強制されますか？*

移行後もアクセス ポリシーは有効ですが、その強制のメカニズムが変わります。CARs では、ユーザーが Exchange Online リソースに接続する際に IP ベースのアクセス ポリシーが評価されましたが、条件付きアクセスではログイン時に評価され、その後 CAE によってリソース アクセス時に評価されます。

*2. 厳格な強制を伴う CAE とは何ですか？また、組織を保護するために必要ですか？*

[名前付き IP ロケーション CA ポリシーが正しく構成されている場合](https://learn.microsoft.com/entra/identity/conditional-access/policy-block-by-location?source=recommendations)、CAE は CA ポリシーで構成された信頼できるロケーションにない IP アドレスからの Exchange Online へのアクセスを直ちに拒否します。CAE の IP ポリシーが機能するために厳格なロケーション強制は必要ありません。

一部の[複雑なネットワーク トポロジ](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation#ip-address-variation-and-networks-with-ip-address-shared-or-unknown-egress-ips)では、アクセス要求が許可されていない IP アドレスから発信されても、認証要求が許可された IP アドレスから来ることがあります。このような場合、Microsoft Entra は Exchange Online の IP アドレス チェックを 1 時間停止し、ロケーション チェックはトークン発行時に毎時間定期的に行われます。この例外は、重要なリソースへのアクセスを確保することでユーザーの生産性を維持します。これらのトポロジでは、厳格なロケーション強制を有効にしないでください。ユーザーは直ちに Exchange Online へのアクセスを失うことになります。

安定したネットワークでは、ログイントラフィックとデータ接続の両方が一貫してIPロケーションCAポリシーに一致する場合、[厳格なロケーション強制モード（プレビュー）](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation-strict-enforcement)を選択できますが、ドキュメントに従って慎重に有効にしてください。ユーザーに悪影響を及ぼす可能性があります。

この投稿がCARの廃止についての明確さを提供することを願っています。

The Exchange Online Team