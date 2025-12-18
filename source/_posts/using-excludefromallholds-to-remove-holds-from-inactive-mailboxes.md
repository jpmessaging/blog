---
title: ExcludeFromAllHolds を使用して非アクティブなメールボックスからホールドを解除する
date: 2025-12-15
tags: Exchange Online
---
※ この記事は、[Using ExcludeFromAllHolds to Remove Holds from Inactive Mailboxes](https://techcommunity.microsoft.com/blog/exchange/using-excludefromallholds-to-remove-holds-from-inactive-mailboxes/4476933) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #99ffa7ff;">非アクティブなメールボックスに対する保持機能のサポートが、<strong>パブリック クラウド</strong>で利用可能になりました。詳細と今後のマイルストーンについては、こちらの<strong>ロードマップ</strong><a href = https://www.microsoft.com/microsoft-365/roadmap?id=537204> (https://www.microsoft.com/microsoft-365/roadmap?id=537204)</a> をご確認ください。</p>

### はじめに

Microsoft Exchange Online で非アクティブなメールボックスを管理する際、管理者はコンプライアンス要件を維持しつつ、完全削除を可能にするためにホールドを解除する必要がよくあります。[ExcludeFromAllHolds](https://learn.microsoft.com/powershell/module/exchangepowershell/set-mailbox?view=exchange-ps#-excludefromallholds) パラメーターは、非アクティブなメールボックスに適用されている複数種類のホールドを、1 回の操作で削除できる包括的かつ強化されたソリューションを提供します。

この記事では、ExcludeFromAllHolds パラメーターの使用方法、削除対象となるホールド、前提条件、および RemoveComplianceTagHold スイッチとの関連性について説明します。これらのオプションを組み合わせることで、コンプライアンスの整合性を維持しながら、非アクティブなメールボックスのライフサイクルを効率的に管理できます。

### 概要と目的

ExcludeFromAllHolds パラメーターは、電子情報開示ホールド、訴訟ホールド、および RestrictiveRetention パラメーターを true に設定した保持ポリシー (以下、当記事では便宜上 "制限付き保持ポリシー" とします) を除き、非アクティブなメールボックスに適用されているすべてのホールドを削除するためのコマンドレット スイッチです。このパラメーターは、訴訟ホールドや制限付き保持ポリシーが適用されていない場合に、不要な保持ホールドを削除し、メールボックスを完全に削除できるようにするシナリオを対象としています。ただし、コマンドレットは規制遵守に必要な訴訟ホールドを引き続き保持します。

一方、RemoveComplianceTagHold スイッチは、コンプライアンス タグ ベースのホールド (ComplianceTagHoldApplied) のみをメールボックスから削除します。これにより、他のホールドから除外せずにコンプライアンス タグの適用のみを調整する場合に、より詳細な制御が可能になります。

#### 主な機能

- 包括的なカバレッジ： ExcludeFromAllHolds は組織レベルとユーザーレベルの両方の保持ポリシーに対応
- 柔軟なスコープ： 静的スコープとアダプティブ スコープの両方で動作
- コンプライアンスの維持： 電子情報開示ホールド、インプレース ホールド (eDiscovery-ComplianceSearch)、訴訟ホールド、および制限付き保持ポリシーを維持
- 自動処理： 1 つのコマンドで複数種類のホールドを同時に削除
- 関連付けがなくなったホールドの削除： このコマンドは、組織レベルおよびユーザーレベルでスコープ指定された関連付けがなくなったホールドを削除
- 詳細なタグ制御： RemoveComplianceTagHold は、他のホールドに影響を与えず、コンプライアンス タグ ホールドのみを削除

#### 主な使用例

ExcludeFromAllHolds の主な使用例は、コンプライアンス要件を維持しながらホールドを削除することで、非アクティブなメールボックスを完全に削除することです。これは特に以下のような場合に役立ちます。

- 訴訟期間終了後のユーザー アカウントの廃止
- 法的要件を維持しながらコンプライアンス体制を合理化
- 組織変更時の非アクティブなメールボックスの一括処理

RemoveComplianceTagHold は、他のすべてのホールドをそのまま維持しながら、コンプライアンス タグ ホールドのみを削除する必要がある場合に使用されます (たとえば、タグ ロジックの再計算や変更を許可する場合など)。RemoveComplianceTagHold はアクティブなメールボックスにも使用でき、主に移行関連のシナリオで使用されます。

### ExcludeFromAllHolds はどのようなホールドを削除するか？

ExcludeFromAllHolds パラメーターは、コンプライアンス要件とポリシーの種類に基づいて、選択的にホールドを削除します。

**削除されるホールド:**

| **ホールドの種類** | **説明** | **スコープ** |
| --- | --- | --- |
| 組織レベルの保持ポリシー | すべてまたはほとんどのメールボックスに適用される組織全体のホールド | グローバル |
| ユーザーレベルの保持ポリシー | 対象範囲を指定した特定のメールボックスのホールド | 個別 |
| コンプライアンス タグ ホールド | コンテンツベースの保持ホールド (制限付きポリシーが存在しない場合) | コンテンツ固有 |
| 遅延ホールド | ポリシー移行時の一時的なホールド | 一時的 |
| 遅延リリース ホールド | ポリシー変更時に即時削除を防ぐホールド | 一時的 |

**削除されないホールド:**

| **ホールドの種類** | **保持される理由** | **影響** |
| --- | --- | --- |
| インプレース ホールド (ComplianceSearch - eDiscovery) | 法令遵守要件 | コンプライアンスのため維持 |
| 電子情報開示ホールド | 法令遵守および訴訟要件 | コンプライアンスのため維持 |
| 訴訟ホールド | 法令遵守および訴訟要件 | コンプライアンスのため維持 |
| 制限付き保持ポリシー | 規制遵守要件 | コンプライアンス ルールに従って保持 |
| ポリシー構成 | ポリシー除外リストは更新されない | ポリシーの変更なし |

**重要:** ExcludeFromAllHolds はポリシー自体を変更しません。特定のメールボックスだけをホールドから除外し、他のメールボックスには既存のポリシーをそのまま維持します。
#### 前提条件

##### 1. PowerShell 環境

- Exchange Online PowerShell での実行が必要です。Exchange 管理センター (EAC) または Microsoft Purview ポータル (SCC) では使用できません。
- [Exchange Online PowerShell に接続する](https://learn.microsoft.com/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps)必要があります。


##### 2. メールボックスの状態

- メールボックスは非アクティブ状態である必要があります (ホールドが適用されたソフトデリート)。
- アクティブ/非アクティブなパブリック フォルダー/スケジュール/会議室メールボックス、完全に削除されたメールボックス、アクティブなメール ユーザー、アクティブなグループ メールボックスには使用できません。
- 実行前に非アクティブ状態を確認してください。

```powershell
# 非アクティブなメールボックスの状態を確認
Get-Mailbox -InactiveMailboxOnly -Identity "user@contoso.com" |
    Select-Object Name, IsInactiveMailbox, InPlaceHolds
```

##### 3. RBAC 権限

必要な RBAC 権限は次のとおりです。

- Mailbox Import Export role (メールボックスのインポートとエクスポートの役割)
- Retention Management role (保持管理の役割)
- eDiscovery Manager role (電子情報開示マネージャーの役割：eDiscovery ホールドを表示する場合)

##### 4. コンプライアンスの検証

- 削除前に現在のホールドを文書化する
- 法的要件とコンプライアンス要件を確認する
- アクティブな訴訟または規制要件がないことを確認する

#### 構文と例

##### 基本的な構文
```powershell
Set-Mailbox -Identity <inactive-mailbox-identity> -ExcludeFromAllHolds
```
##### 例 1: 単一の非アクティブなメールボックスからホールドを削除する
```powershell
Set-Mailbox -Identity "john.doe@contoso.com" -ExcludeFromAllHolds

Get-Mailbox -InactiveMailboxOnly -Identity "john.doe@contoso.com" | 
    Select-Object Name, InPlaceHolds, IsInactiveMailbox
```
##### 例 2: 複数の非アクティブなメールボックスを一括処理する
```powershell
$InactiveMailboxes = Get-Mailbox -InactiveMailboxOnly

foreach ($Mailbox in $InactiveMailboxes) {
    Write-Host "Processing: $($Mailbox.DisplayName)"
    $CurrentHolds = $Mailbox.InPlaceHolds
    Write-Host "Current holds: $($CurrentHolds.Count)"
    Set-Mailbox -Identity $Mailbox.Guid -ExcludeFromAllHolds
    $UpdatedMailbox = Get-Mailbox -InactiveMailboxOnly -Identity $Mailbox.Guid
    Write-Host "Remaining holds: $($UpdatedMailbox.InPlaceHolds.Count)"
}
```
##### 例 3: 事前検証による選択的処理

```powershell
function Test-HaseDiscoveryHolds {
    param($Mailbox)
    foreach ($Hold in $Mailbox.InPlaceHolds) {
        if ($Hold -match "^cld|^skp|^unih") {
            return $true
        }
    }
    return $false
}

$InactiveMailboxes = Get-Mailbox -InactiveMailboxOnly
foreach ($Mailbox in $InactiveMailboxes) {
    if (!(Test-HaseDiscoveryHolds -Mailbox $Mailbox)) {
        Write-Host "Safe to process: $($Mailbox.DisplayName)"
        Set-Mailbox -Identity $Mailbox.DistinguishedName -ExcludeFromAllHolds
    } else {
        Write-Warning "eDiscovery holds detected on: $($Mailbox.DisplayName)"
    }
}
```
#### 検証と監視

##### 即時検証

メールボックスにスタンプされている除外を確認します。
```powershell
Get-Mailbox - SoftDeletedMailbox -Identity "user@contoso.com" |  Select-Object Name, InPlaceHolds, ComplianceTagHoldApplied, DelayHoldApplied, DelayReleaseHoldApplied
```
##### 状態遷移の監視

メールボックスが非アクティブからソフトデリートされたメールボックスに遷移した状態を確認します。
```powershell
Get-Mailbox -SoftDeletedMailbox -Identity "user@contoso.com" |  Select-Object Name, IsInactiveMailbox, WasInactiveMailbox, InactiveMailboxRetireTime, WhenSoftDeleted
```
##### 監査証跡の確認

```powershell
Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-7) -EndDate (Get-Date) `
    -RecordType ExchangeAdmin -Operations "Set-Mailbox" `
    -FreeText "ExcludeFromAllHolds"
```
#### 他の Exchange オブジェクトに ExcludeFromAllHolds の使用

##### 例 4: 非アクティブなメール ユーザーに対する ExcludeFromAllHolds の使用

```powershell
# 非アクティブなメール ユーザーを取得
$MailUser = Get-MailUser -Identity "user@contoso.com" -SoftDeletedMailUser

# 関連付けられた非アクティブなメールボックスを適用可能なすべてのホールドから除外
Set-MailUser -Identity $MailUser.ExchangeGuid -ExcludeFromAllHolds

# 非アクティブなメールボックスの状態とホールドを確認
Get-MailUser -SoftDeletedMailUser -Identity $MailUser.ExchangeGuid | 
    Select-Object Name, IsInactiveMailbox, InPlaceHolds
```

##### 例 5: 非アクティブなグループ メールボックスに対する ExcludeFromAllHolds の使用

```powershell
# 非アクティブなグループ メールボックスを取得
$Group = Get-Mailbox -Identity "group@contoso.com" -SoftDeletedMailbox -GroupMailbox

# 関連付けられた非アクティブなメールボックスを適用可能なすべてのホールドから除外
Set-Mailbox -Identity $Group.ExchangeGuid -ExcludeFromAllHolds -GroupMailbox

# 非アクティブなメールボックスの状態とホールドを確認
Get-Mailbox -Identity "group@contoso.com" -SoftDeletedMailbox -GroupMailbox | 
    Select-Object Name, IsInactiveMailbox, InPlaceHolds
```
#### RemoveComplianceTagHold の使用

一部のシナリオでは、メールボックスに適用可能なすべての保持ポリシーやその他のホールドからメールボックスを除外せずに、コンプライアンス タグ ベースのホールドのみを削除したい場合があります。Set-Mailbox の RemoveComplianceTagHold スイッチを使用すると、より詳細な制御が可能になります。

##### 例 6: 非アクティブなメールボックスからコンプライアンス タグ ホールドのみを削除する

```powershell
# 非アクティブなメールボックスからコンプライアンス タグ ホールドのみを削除
Set-Mailbox -Identity "john.doe@contoso.com" -RemoveComplianceTagHold

# ComplianceTagHoldApplied がクリアされ、他のホールドは残っていることを確認
Get-Mailbox -InactiveMailboxOnly -Identity "john.doe@contoso.com" |
    Select-Object Name, InPlaceHolds, ComplianceTagHoldApplied, DelayHoldApplied, DelayReleaseHoldApplied
```

##### 例 7: 同意を得たうえ、アクティブなメールボックスからコンプライアンス タグ ホールドを削除する

```powershell
# アクティブなメールボックスからコンプライアンス タグ ホールドのみを削除 (明示的な同意が必要)
Set-Mailbox -Identity "active.user@contoso.com" -RemoveComplianceTagHold -ProvideConsent

# アクティブなメールボックスの更新されたホールド状態を確認
Get-Mailbox -Identity "active.user@contoso.com" | 
    Select-Object Name, InPlaceHolds, ComplianceTagHoldApplied
```
#### ベスト プラクティスと考慮事項

- 削除前に現在の状態を文書化する
- 法的要件とコンプライアンス要件を確認する
- 小さなバッチで処理する
- 監査ログと承認ワークフローを有効にする
- 進行状況を監視および追跡する

#### トラブルシューティング: よくある問題

##### ExcludeFromAllHolds が効果を示さない

**原因:**

- 電子情報開示ホールドまたは制限付きホールドのみが存在する
- 権限が不足している
- メールボックスが非アクティブではない
```powershell
Get-Mailbox -InactiveMailboxOnly -Identity "user@contoso.com" |  Select-Object InPlaceHolds | Format-List
```
##### 部分的なホールドの削除

**期待される動作:** インプレース ホールド (eDiscovery-ComplianceSearch)、電子情報開示ホールド、訴訟ホールド、および制限付きホールドは保持されます
```powershell
$Mailbox = Get-Mailbox -InactiveMailboxOnly -Identity "user@contoso.com"
foreach ($Hold in $Mailbox.InPlaceHolds) {
    $HoldType = switch -Regex ($Hold) {
        '^cld' { "eDiscovery Hold (Preserved)" }
        '^unih' { "eDiscovery Hold (Preserved)" }
        '^mbx' { "Retention Policy (Should be removed, check if restrictive policy)" }
        default { "ComplianceSearch (Preserved)" }
    }
    Write-Host "$Hold - $HoldType"
}
```
##### 関連するコマンドとツール
```powershell
Get-Mailbox -InactiveMailboxOnly
Get-RetentionCompliancePolicy
Get-ComplianceSearch
Get-Mailbox -SoftDeletedMailbox
Set-Mailbox -Identity <mailbox> -RecalculateInactiveMailbox
```
#### まとめ

ExcludeFromAllHolds パラメーターは、コンプライアンスの整合性を維持しながら、非アクティブなメールボックスからホールドを削除するための包括的かつ安全な方法を提供します。RemoveComplianceTagHold スイッチは、必要に応じてコンプライアンス タグ ホールドのみを削除できるようにすることで、この機能を補完します。

重要なポイント:

- コンプライアンスの安全性を確保した包括的なホールド削除
- 電子情報開示ホールドおよび制限付きホールドは保持される
- 監査およびコンプライアンス レポートをサポート
- 非アクティブなメール ユーザーおよび非アクティブなグループ メールボックスにも使用可能
- RemoveComplianceTagHold を使用したコンプライアンス タグ ホールドの詳細な削除 (アクティブなメールボックスには -ProvideConsent を使用)

### よくあるご質問

**Q: ExcludeFromAllOrgHolds とどう違いますか？**  
**A:** ExcludeFromAllOrgHolds は、組織設定にスタンプされた保持ポリシーから除外します。このスイッチは、保管ロックが有効なポリシーを除き、適用可能なすべての保持ポリシー (ユーザー + 組織スコープ) から除外します。

**Q: 適用済みの保持ラベルも削除されますか？**  
**A:** いいえ、保持ラベルはアイテムから削除されません。保管ロックされているポリシーが存在しない場合、メールボックスからコンプライアンス タグ ホールドを削除します。保持ラベルが適用されたアイテムがメールボックスにある場合、メール ライフサイクル アシスタントによってホールドが再適用されます。

**Q: メールボックスを ExcludeFromAllHolds で除外すると、メールボックスはすぐに削除されますか？**  
**A:** いいえ、メールボックスはソフトデリートされた状態に移行し、ソフトデリートされたメールボックスのライフサイクルに従って削除されます。

**Q: 切り戻しするにはどうすればよいですか？**  
**A:** スタンプされた除外と RemoveComplianceTagHold アクションは、コマンドレットで元に戻すことはできません。改めて新しいポリシーを適用する必要があります。以前に除外された状態は自動的には復元されません。メールボックスに保持ラベルが適用されたアイテムがある場合、コンプライアンス タグ ホールドはメール ライフサイクル アシスタントによって再適用されます。

**Q: 除外が有効になるまでに遅延はありますか？**  
**A:** キャッシュの影響で、設定が反映されるまで 5 分未満の遅延が発生する可能性があります。変更のタイムスタンプを記録し、完全削除の操作を実行する前に十分な反映時間を確保してください。

**Q: 制限やクォータはありますか？**  
**A:** テナントごとの特定の除外上限はありませんが、一括自動化は調整される可能性があります。大規模なバッチは段階的に実行し、サービス正常性メッセージを監視してください。

**Q: アダプティブ スコープ ポリシーについて想定される動作は何ですか？**  
**A:** メールボックスにスタンプされたアダプティブ スコープ ポリシーは除外されます。一度除外されると、メールボックスをポリシーに再スコープすることはできません。

**Q: RemoveComplianceTagHold とどう違いますか？**  
**A:** ExcludeFromAllHolds は、インプレース ホールド (eDiscovery-ComplianceSearch)、電子情報開示、訴訟、および制限付き保持ポリシーを保持しながら、適用可能な複数のホールド (組織レベル、ユーザーレベル、遅延ホールド、およびコンプライアンス タグ ホール (許可されている場合)) を削除します。RemoveComplianceTagHold は、メールボックスからコンプライアンス タグ ホールドのみを削除し、他のすべてのホールドはそのまま残します。

**Q: 適用済みの保持ラベルも削除されますか？**  
**A:** いいえ、アイテムから保持ラベルは削除されません。ExcludeFromAllHolds と RemoveComplianceTagHold の両方とも、保管ロックされているポリシーが存在しない場合、メールボックスからコンプライアンス タグベースのホールドを削除します。メールボックスに保持ラベルが適用され、適用可能なポリシーが適用されているアイテムがある場合、ホールドはメール ライフサイクル アシスタントによって再適用される可能性があります。

**Q: アクティブなメールボックスからコンプライアンス タグ ホールドを削除できますか？**  
**A:** はい。Set-Mailbox -Identity &lt;active-mailbox&gt; -RemoveComplianceTagHold -ProvideConsent を使用してください。アクティブなメールボックスでは、コンプライアンス タグ ホールドを削除する場合、コンプライアンス上の影響を確認するために -ProvideConsent スイッチが必要です。
