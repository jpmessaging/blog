---
title: "Microsoft 365 Business スイートのメールボックス容量が最大 100 GB になる仕組み"
date: 2026-08-20
tags:
- Exchange Online
---
※ この記事は、[Understanding the new 100 GB mailbox entitlement for Microsoft 365 Business suites](https://techcommunity.microsoft.com/blog/exchange/understanding-the-new-100-gb-mailbox-entitlement-for-microsoft-365-business-suit/4548243) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft 365 Business Basic、Business Standard、Business Premium では、対象ユーザーが利用できるプライマリ メール ストレージが 50 GB 追加されました。これにより、サポートされるプライマリ メールボックスの容量は 50 GB から最大 100 GB になります。この記事では、Exchange Online の管理者向けに、このメールボックス容量の増加がどのように提供されるかを説明します。ここではメールボックスの容量だけを取り上げます。

## Business スイートの変更点

Microsoft は、2026 年の Microsoft 365 パッケージ更新の一環として、Microsoft 365 Business Basic、Business Standard、Business Premium のメール ストレージを 50 GB 追加することを[発表しました](https://www.microsoft.com/en-us/licensing/news/2026-M365-Packaging-Pricing-Updates)。パッケージの変更は 2026 年 6 月から 9 月にかけて展開され、テナントで変更が利用可能になる前に、メッセージ センターを通じて事前に通知されます。

ストレージの追加により、対象となる Business スイート ユーザーの有効なプライマリ メールボックス容量は 50 GB から 100 GB に変わります。対象となる法人向け製品スイートは次のとおりです。

- Microsoft 365 Business Basic
- Microsoft 365 Business Standard
- Microsoft 365 Business Premium

展開後、該当するライセンスが割り当てられているすべてのユーザーに、新しいサービス プランと、それに対応するメールボックス クォータの増加が適用されます。

このメールボックス容量の増加は、上記のスイート ライセンスだけに適用される点に注意してください。スタンドアロンの Exchange Online Plan 1 など、メールボックスの最大容量が引き続き 50 GB となるライセンスもあります。

## サポートされるクォータ

追加のストレージにより、対象となる Business スイートでは、有効なクォータの上限が 100 GB になります。

- 適用される Exchange メールボックス プランのうち、Business スイートのプランが最上位であるユーザーは、ストレージ アドオンがある場合、有効なクォータが 100 GB になります。
- 100 GB のメールボックスを提供する Enterprise ライセンスまたはスタンドアロンの Exchange ライセンスも割り当てられているユーザーは、引き続き 100 GB を利用できます。
- 複数の Exchange サービス プランを含む複数のライセンスが割り当てられている場合 (これは[同時ライセンス](https://techcommunity.microsoft.com/blog/exchange/introducing-support-for-concurrent-exchange-online-license-assignments/3721098)と呼ばれます)、1 つの製品が提供する最大クォータが適用されます。製品をまたいでクォータが加算されることはありません。例えば、Business スイートのいずれかと、Exchange Online Plan 2 を含む別の Enterprise ライセンスが割り当てられているユーザーが利用できる容量は、引き続き 100 GB です。Business スイートのクォータ増加は、基本のメールボックス容量だけに適用されます。アーカイブ機能は提供されません。

## 追加クォータの実装方法

Business スイートでは、次のサービス プランの組み合わせによってストレージの合計容量が提供されます。

- Business スイートの Exchange プランは BPOS_S_STANDARD で表され、50 GB のストレージが付与されます。
- 追加の権利は EXCHANGE_STORAGE_50GB サービス プランで表されます。このプランによって 50 GB が追加され、合計クォータは 100 GB になります。

ユーザーが 100 GB の全容量を利用するには、両方のプランが有効になっている必要があります。

Microsoft 365 管理センターでは、次のように「標準」のライセンスとアドオンが表示されます。

![](microsoft-365-admin-center-license-and-add-on.png)

## カスタム メールボックス クォータの維持

管理者がカスタム メールボックス クォータを設定している場合、ストレージを追加する処理によってその設定が上書きされることはありません。同様に、アドオンを削除しても、後から管理者が設定したカスタム値に代わる値は設定されません。これにより、テナントのメールボックスを管理するために意図して設定した値が保護されます。

例えば、管理者が Business スイート ユーザーのメールボックスを、元の既定値である 50 GB から 20 GB に変更していた場合、追加のサービス プランが割り当てられた後も、そのユーザーのクォータは 20 GB のままです。

## ユーザーのライセンスとサービス プランの確認

Microsoft 365 管理センターで [ユーザー] > [アクティブなユーザー] を開き、ユーザーを選択して [ライセンスとアプリ] を確認します。対象となる Microsoft 365 Business スイートがユーザーに割り当てられ、それに含まれるサービスが有効になっていることを確認してください。[課金情報] > [ライセンス] ページでは、製品が直接割り当てられたか、グループ ベースのライセンスによって割り当てられたかも確認できます。

Microsoft Graph PowerShell では、サービス プランをさらに詳しく確認できます。次の例では、割り当てられたライセンスの詳細を取得し、ストレージのサービス プランを検索します。

```powershell
$licenses = Get-MgUserLicenseDetail -UserId user@contoso.com
$licenses.ServicePlans | Where-Object ServicePlanName -eq "EXCHANGE_STORAGE_50GB" | Select-Object ServicePlanName, ProvisioningStatus
```

## 有効な Exchange メールボックス クォータの確認

Exchange Online PowerShell では、Exchange がメールボックスに対して提示するクォータ値を確認できます。次に例を示します。

```powershell
Get-Mailbox -Identity user@contoso.com | Format-List IssueWarningQuota, ProhibitSendQuota, ProhibitSendReceiveQuota, UseDatabaseQuotaDefaults
```

追加のストレージ サービス プランがあり、カスタム クォータが設定されていない対象の Business スイート ユーザーでは、有効なメールボックス クォータの上限が 100 GB になります。

## 一般的なライセンスとクォータのシナリオ

- Business スイートと 50 GB のストレージ アドオン : ユーザーの有効なプライマリ メールボックス容量の上限は 100 GB です。
- Business スイートのみで 50 GB のストレージ アドオンがない場合 : 追加のサービス プランがプロビジョニングされるまで、Business メールボックスの基本クォータが引き続き適用されます。サービス プランは自動的にプロビジョニングされる予定です。
- Business スイートと、既に 100 GB を付与する Enterprise プランまたはスタンドアロン プラン : Exchange ではクォータを加算せず、適用される最上位の権利が使用されるため、有効な上限は 100 GB のままです。
- Business スイートと、下位の Exchange 機能 (F3 ライセンスなど) : Business プランが最上位の機能となるため、アドオンによって有効な上限を 100 GB に増やすことができます。
- カスタム クォータ : 管理者が設定した値が引き続き適用され、50 GB を自動的に追加する処理によって置き換えられることはありません。
- 50 GB のアドオンを明示的に削除した場合 : 既定のプラン クォータを使用するメールボックスでは、Exchange によって該当するプランの既定値に戻されます。管理者が設定したカスタム値は、そのまま維持されます。

## 展開とライセンスの反映

追加のストレージはライセンス データによって表されるため、Exchange がより大きな有効クォータを返すには、サービス プランが割り当てられ、処理されている必要があります。大規模なサービス プランの展開やバックフィル処理の間は、同じ組織内でも、すべてのユーザーに変更が同時に反映されるとは限りません。一部のユーザーにはメールボックス容量の 50 GB 追加が反映され、ほかのユーザーには反映されていない場合があります。対象となる Business スイート ライセンスが割り当てられていれば、この状態は自動的に解消される見込みです。

Microsoft サポートから明示的に案内された場合を除き、クォータを強制的に更新する目的だけで Exchange ライセンスを削除して再割り当て*しないでください*。**製品ライセンスを削除すると、そのサービスにアクセスできなくなり、該当するデータ保持ライフサイクルが開始されます。** 通常のライセンス割り当てプロセスを引き続き使用してください。
