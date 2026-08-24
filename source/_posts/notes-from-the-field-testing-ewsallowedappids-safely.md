---
title: "現場からのメモ: EWSAllowedAppIDs を安全にテストする方法"
date: 2026-08-24
tags:
- Exchange Online
---

※ この記事は、[Notes from the field: testing EWSAllowedAppIDs safely](https://techcommunity.microsoft.com/blog/exchange/notes-from-the-field-testing-ewsallowedappids-safely/4548568) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online における Exchange Web Services (EWS) 廃止の最終フェーズに向けて準備を進める管理者から、同じ実務上の質問が多く寄せられています。「EWSAllowedAppIDs に依存する本番運用を始める前に、正しく機能していることを実証するにはどうすればよいか」という質問です。このフィールド ガイドでは、条件を管理した許可テストと拒否テストの手順、テスト結果が意味すること、そして管理者とのやり取りですでに見受けられる、紛らわしい名称に起因する重要な落とし穴について説明します。

### 現場からのメモ

最もよくある混乱は、PowerShell の構文に関するものではありません。異なるレイヤーで動作する、名前のよく似た 2 つの制御に関するものです。EWSAllowedAppIDs は、EWS 向けの新しいアプリケーション ID 制御です。以前からある EWSAllowList と EWSBlockList は EwsApplicationAccessPolicy に関連付けられたユーザー エージェント制御であり、EWS と REST の両方のトラフィックに影響する可能性があります。

### テスト前に 2 つの制御を理解する

EWSAllowedAppIDs は、テナント レベルのアプリケーション (クライアント) ID リストです。EWS が有効で、リストに 1 つ以上のアプリケーション ID が含まれている場合、リストに登録されたアプリケーションだけが EWS にアクセスできます。廃止への移行期間中にアプリケーションの EWS アクセスをテストする場合は、この制御を検証します。

EWSAllowList と EWSBlockList は、以前からあるユーザー エージェント ベースの制御です。その名前にかかわらず、基になるアクセス ポリシーは EWS だけに限定されず、REST 要求にも影響する可能性があります。これらの設定をすでに使用している組織では、EWS の廃止後も REST のアクセス制御にこれらの設定が必要になることがあります。

これらの制御は個別に評価されます。実際には、EWS 要求はアプリケーション ID 制御を通過した後、該当するユーザー エージェント制御も通過する必要があります。そのため、App ID のテストが成功しても、別のユーザー エージェント ポリシーが正しく構成されていることの証明にはなりません。

### テストで実証できること

次の条件をすべて満たす場合に限り、変更前と変更後を比較する適切なテストによって EWSAllowedAppIDs の動作を実証できます。

- アプリケーションが OAuth トークンを取得できる。
- アプリケーションに EWS のアプリケーション権限があり、テナント全体の管理者の同意が付与されている。
- テスト時に `EWSEnabled` が `True` に設定されている。
- テスト用メールボックスの受信トレイに 1 つ以上のアイテムがある。
- 許可時のテストでは App ID がリストにあり、拒否時のテストではリストにない。
- 許可リストを変更するたびに、24 時間以上経過している。

### 始める前に

可能であれば、テスト用テナントでこの手順を実行してください。リストからアプリケーションを削除すると、構成変更の反映後に、本番ワークロードが EWS にアクセスできなくなる可能性があります。

次のものを準備します。

- 受信トレイに 1 つ以上のアイテムがあるテスト用メールボックス。
- メールボックスと同じテナントにあるアプリの登録。
- テナント全体の管理者の同意が付与された EWS のアプリケーション権限。
- アプリケーション認証用のクライアント シークレットまたは証明書。クライアント シークレットはパスワードとして扱い、共有スクリプトやソース管理リポジトリには保存しないでください。
- Exchange Online PowerShell へのアクセス権と、`Get-OrganizationConfig` および `Set-OrganizationConfig` を実行する権限。
- [Test-EWSAppAccess.ps1](https://github.com/David-Barrett-MS/PowerShell-EWS-Scripts/blob/master/Legacy/Test-EWSAppAccess.ps1) スクリプト。実際のアプリでテストする場合を除き、このテスト スクリプトを使用できます。スクリプトのドキュメントは、[Testing EWS App Access](https://github.com/David-Barrett-MS/PowerShell-EWS-Scripts/wiki/Testing-EWS-App-Access) で確認できます。

開始する前に、テナント ID、アプリケーション (クライアント) ID、テスト用メールボックスの SMTP アドレス、選択した認証情報を記録します。

### テスト 1: アプリが許可されているときにアクセスできることを確認する

- Exchange Online PowerShell に接続します。

```powershell
Connect-ExchangeOnline
```

- 現在の EWS の状態を確認し、既存の App ID リスト全体を記録します。

```powershell
Get-OrganizationConfig | Format-List EWSEnabled
Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy | Format-List EwsAllowedAppIDs
```

- 条件を管理したテストを行うため、`EWSEnabled` を `$null` に設定します。この状態ではすべての EWS アクセスが許可され、App ID 許可リストは無視されます。

```powershell
Set-OrganizationConfig -EWSEnabled $null
```

- 既存のエントリを上書きせずに、テスト用 App ID を追加します。`EwsAllowedAppIDs` を設定するコマンドはリスト全体を書き込むため、現在の値を保持してください。

```powershell
$current = (Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy).EwsAllowedAppIDs
$updated = @($current -split "," | ForEach-Object { $_.Trim() } | Where-Object { $_ }; $appId) | Select-Object -Unique
Set-OrganizationConfig -EwsAllowedAppIDs ($updated -join ",")
```

- App ID が書き込まれたことを確認します。

```powershell
Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy | Format-List EwsAllowedAppIDs
```

- 変更が反映されるまで待ちます。Exchange Online の構成キャッシュにより、最大 24 時間かかることがあります。
- `EWSEnabled` を `True` に設定します。

```powershell
Set-OrganizationConfig -EWSEnabled $true
```

- 変更が有効になるまで 1 時間待ちます。
- [Test-EWSAppAccess.ps1](https://github.com/David-Barrett-MS/PowerShell-EWS-Scripts/blob/master/Legacy/Test-EWSAppAccess.ps1) をダウンロードし、アプリケーション認証を指定して実行します。アプリケーション権限を使用する場合は、`Mailbox` パラメーターが必要です。

```powershell
.\Test-EWSAppAccess.ps1 -AppId $appId -TenantId $tenantId -Mailbox $mailbox -SecretKey $secretKey
```

- テストが成功した場合は、アプリケーションがメールボックスにアクセスできたことを示す次のメッセージが表示されます。

```text
Application <appid> successfully accessed mailbox <mailbox>
```

- `$LASTEXITCODE` が `0` であることを確認し、変更記録とともに出力を保存します。

### テスト 2: アプリを削除し、アクセスがブロックされることを確認する

- 他のすべてのエントリを保持したまま、テスト用 App ID だけを削除します。

```powershell
$current = (Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy).EwsAllowedAppIDs
$updated = $current -split "," | ForEach-Object { $_.Trim() } | Where-Object { $_ -and $_ -ne $appId }
Set-OrganizationConfig -EwsAllowedAppIDs ($updated -join ",")
```

- App ID がリストから削除されたことを確認します。

```powershell
Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy | Format-List EwsAllowedAppIDs
```

- 再テストするまで 24 時間以上待ちます。すぐにテストして成功した場合は、Exchange Online サーバーに以前の構成がキャッシュされているだけの可能性があります。
- 同じ `Test-EWSAppAccess.ps1` コマンドをもう一度実行します。
- 変更が反映された後は、テストが失敗することが期待されます。

```text
Application <appid> failed to access mailbox <mailbox>
```

プロセスの終了コードが `1` であることを確認します。最初のテストも失敗した場合は、許可リストが原因だと判断する前に、認証、権限、同意、メールボックスへのアクセス、スクリプトの依存関係をトラブルシューティングします。

- 他のすべてのエントリを保持した完全なリストにテスト用 App ID を追加し直し、構成を確認します。変更が反映されるまで待ってから、アクセス成功のテストをもう一度実行します。

本番環境のテナントで、App ID 許可リストが意図せず空になったり、不完全な状態になったりしないようにしてください。

### App ID によるブロック後に EWS を最も早く再有効化する方法

テナントでこの手順をテストしていて、`EWSEnabled = True` に設定し、EWSAllowedAppIDs に値を設定した後、期待した結果にならず、変更をできるだけ早く元に戻してテナントの EWS を再有効化する必要があるとします。

- EWSAllowedAppIDs の変更がテナント全体に反映されるまでには、約 24 時間かかります。
- `EWSEnabled` の変更には約 1 時間かかります。
- `EWSEnabled` が `Null` に設定されている場合、EWSAllowedAppIDs (許可リスト) は無視されます。

したがって、制限なしで EWS を最も早く再有効化するには、`EWSEnabled` を `Null` に戻します。1 時間後、EWS の制限が解除されます。

```powershell
Set-OrganizationConfig -EWSEnabled $null
```

### EWSEditor も利用可能

対話形式の EWS API エクスプローラーを使用したい管理者や開発者は、[EWSEditor](https://github.com/dseph/EwsEditor) も利用できます。検証対象と同じアプリケーション ID を使って、テスト用メールボックスに対して実際の EWS 呼び出しを行う場合に役立ちます。

その場合も、正しく構成された OAuth アプリケーション、EWS の権限と同意、状態を管理できるテスト用メールボックス、記録したベースライン、EWSAllowedAppIDs の変更が反映されるまでの十分な時間が必要です。

### 避けるべき一般的な落とし穴

- App ID を削除した直後に拒否時のテストを実行する。
- 既存の App ID を保持せず、リスト全体を置き換える。
- テスト スクリプトが受信トレイの最初のアイテムを読み取るにもかかわらず、受信トレイが空の状態でテストする。
- OAuth、権限、同意、資格情報のエラーを、EWSAllowedAppIDs によって要求がブロックされた証拠と見なす。
- ユーザー エージェント ベースの EWSAllowList または EWSBlockList と、新しい App ID ベースの EWSAllowedAppIDs 制御を混同する。
- REST を使用しているものの EWS を呼び出さないワークロードの App ID を追加する。

### 管理者向けガイダンスを 1 段落でまとめると

アプリケーションが EWS を呼び出し、廃止への移行期間中に一時的なアクセスを必要とする場合は、テスト用テナントで EWSAllowedAppIDs を使ってアプリケーション ID を検証します。テナントで EwsApplicationAccessPolicy をすでに使用している場合は、EWSAllowList または EWSBlockList を個別に評価してください。これらのユーザー エージェント設定は REST にも影響する可能性があります。名前が似ていても、これらの制御は置き換えて使用できません。

ルールはシンプルです。新しい EWS のアプリケーション ID ゲートには EWSAllowedAppIDs を使用し、以前からあるユーザー エージェント ポリシーにのみ EWSAllowList または EWSBlockList を使用します。各レイヤーを個別にテストしてください。

この違いが重要なのは、「EWS」で始まる設定はすべて EWS 廃止の例外プロセスに含まれると考える管理者が、すでに見受けられるためです。実際には含まれません。このように誤解すると、不要な構成変更を行ったり、もともと EWS を使用していない REST ワークロードを中断したりする可能性があります。

### 参考資料

- Testing EWS App Access、PowerShell-EWS-Scripts Wiki: [https://github.com/David-Barrett-MS/PowerShell-EWS-Scripts/wiki/Testing-EWS-App-Access](https://github.com/David-Barrett-MS/PowerShell-EWS-Scripts/wiki/Testing-EWS-App-Access)
- EWSEditor プロジェクト: [https://github.com/dseph/EwsEditor](https://github.com/dseph/EwsEditor)
