---
title: EWSAllowedAppIDs で Exchange Online の EWS 廃止最終フェーズに備える
date: 2026/06/22 10:00
lastupdate:
tags:
- Exchange Online
---

※ この記事は、[Introducing EWSAllowedAppIDs: Preparing for the Final Phase of EWS Retirement](https://techcommunity.microsoft.com/blog/exchange/introducing-ewsallowedappids-preparing-for-the-final-phase-of-ews-retirement/4529471) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online における Exchange Web Services (EWS) の廃止は、最終フェーズに入りつつあります。過去数年にわたり、Microsoft は製品チーム、独立系ソフトウェア ベンダー (ISV)、エコシステム全体のお客様と協力し、ワークロードを Microsoft Graph やその他のモダン API へ移行してきました。多くの移行は完了しており、その他の移行も順調に進んでいます。

Exchange Online で EWS の段階的な無効化が 2026 年 10 月に近づく中、管理者が制御しやすく、予測しやすい形で準備を進められるようにするため、新しい機能 **EWSAllowedAppIDs** を導入します。これは、[Exchange Online EWS: 廃止期限が迫っています](/blog/exchange-online-ews-your-time-is-almost-up/) でお知らせした許可リスト機能です。

EWSAllowedAppIDs は、管理者が残っている依存関係を把握し、承認済みアプリケーションだけに EWS アクセスを制限し、廃止の適用が始まる際の中断リスクを減らすための実用的な手段になります。

この機能は現在ロールアウトを開始しています。すべてのテナントで `Get-OrganizationConfig` を実行した際にパラメーターを確認できるはずですが、ロールアウトが対象テナントに到達するまではリストを設定できません。

#### EWSAllowedAppIDs とは

EWSAllowedAppIDs はテナント レベルの許可リストです。Exchange Online 管理者は、App ID に基づいて、EWS へのアクセスを引き続き許可するアプリケーションを明示的に定義できます。

構成すると、テナント レベルの `EWSEnabled` が `True` に設定されている場合、許可リストに App ID が含まれているアプリケーションだけが、そのテナントで EWS を引き続き使用できます。

この機能は、広範で制限のない EWS アクセスから、廃止期間中に厳密に範囲を絞った意図的な利用へ移行する最終段階を支援するために設計されています。

注: Exchange で長年提供されてきた EWSAllowList 機能は、*User Agent* に基づくもので、*App ID ではありません*。両方を併用できますが、呼び出し元アプリケーションの異なる側面に対して動作します。

管理者は、この機能を使用して次のことができます。

- EWS を引き続き必要とするアプリケーションを特定する
- 承認済みアプリケーションだけに EWS アクセスを制限する
- Exchange Online における EWS の最終的な廃止に備える

#### EWSAllowedAppIDs が EWS の最終段階にどう関係するか

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#ff7518">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px"><path fill="#ff7518" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
訳者注
</div>
EWSEnabled はテナント レベルとユーザー レベルの設定があり、本記事ではテナント レベルの EWSEnabled について記載しております。ユーザー レベルで EWSEnabled が False の場合は、テナント レベルの EWSEnabled の設定に関係なくそのユーザーは EWS を利用できません。詳細は<a target="_blank" rel="noopener" href="/blog/the-way-to-control-ews-usage-in-exchange-online-is-changing/">こちらの記事</a>をご確認ください。
</div>


以前に、Exchange Online で EWS の段階的な無効化を 2026 年 10 月に開始すると[お知らせしました](/blog/exchange-online-ews-your-time-is-almost-up/)。

EWSAllowedAppIDs が重要な理由を理解するには、この日付の前後で Exchange Online の動作がどのように変わるかを見るとわかりやすくなります。廃止モデルでは、既存の組織レベル設定 `EWSEnabled` と、新しい EWSAllowedAppIDs 許可リストを組み合わせて使用します。(`EWSEnabled` スイッチの動作と設定方法については、[こちら](/blog/exchange-online-ews-your-time-is-almost-up/) をご確認ください)

2026 年 10 月より前は、依存関係の棚卸し、許可リストの展開、EWS を引き続き必要とするアプリケーションの検証を行う時間を確保するため、意図的に許容的な動作になっています。

**2026 年 10 月より前:**

| EWSEnabled の値 | 許可リストの状態 | 動作 |
| --- | --- | --- |
| `Null` (既定) | 無視 | すべての EWS トラフィックを許可 |
| `True` | 空 | すべての EWS トラフィックを許可 |
| `True` | 設定済み | リストに含まれるアプリケーションのみ許可 |
| `False` | 任意 | すべての EWS トラフィックをブロック |

この 10 月より前の期間により、管理者は既存のアプリケーションをすぐに停止させることなく、許可リストを展開してテストできます。

##### 2026 年 10 月に何が変わるか

2026 年 10 月以降、Exchange Online はテナントを廃止適用の動作へ移行し始めます。

この時点以降、許可リストを構成せずに EWS を有効化しても、制限なしで「すべてを許可する」モードとしては動作しなくなります。

**2026 年 10 月以降:**

| EWSEnabled の値 | 許可リストの状態 | 動作 |
| --- | --- | --- |
| `Null` | 無視 | すべての EWS を許可 (ただし、Microsoft による段階的ロールアウトの一環として、いずれテナントの `EWSEnabled` は `False` に設定されます) |
| `True` | 空 | すべての EWS トラフィックをブロック |
| `True` | 設定済み | リストに含まれるアプリケーションのみ許可 |
| `False` | 任意 | すべての EWS トラフィックをブロック |

これは管理者が理解しておくべき最も重要な動作変更です。適用開始後は、許可リストなしで `EWSEnabled=True` を設定すると、*実質的にすべてをブロックする構成になります*。

この変更は意図的なものです。目的は EWS を無期限に利用できるようにすることではなく、EWS がまだ必要であることの明示的な確認を求め、その利用を既知の承認済みアプリケーションに絞ることです。

廃止プロセスの目的は、単に EWS を無期限に「オン」のままにすることではなく、次のことにあります。

1. EWS がまだ必要であることの明示的な確認を必須にする
2. 利用範囲を既知の承認済みアプリケーションに絞る
3. Microsoft Graph とモダン API への移行を加速する

### テナント管理者が何もしない場合

現在、多くのテナントでは `EWSEnabled` が未設定 (`Null`) のままになっており、この状態では制限のないアクセスとして動作します。

2026 年 10 月に段階的な廃止ロールアウトが始まると、これらのテナントでは段階的な停止プロセスの一環として EWS が無効化されます (`EWSEnabled` が `False` に設定されます)。

その時点で EWS がまだ必要な管理者は、明示的な対応を行う必要があります。

推奨される流れは次の通りです。

1. EWSAllowedAppIDs 許可リストを構成または検証する (9 月に、未構成のテナント向けにこのリストを設定するとお伝えしています。詳細は[こちら](/blog/exchange-online-ews-your-time-is-almost-up/)をご確認ください。ただし、正しい内容であることを確認する責任は管理者にあります)。
2. `EWSEnabled=True` を設定する

この作業を事前に完了している組織では、より広範な廃止ロールアウト中に中断が発生する可能性を大きく減らせます。

#### この機能を今有効化することを強く推奨する理由

EWSAllowedAppIDs は 2026 年 10 月だけを目的とした機能だと考えるべきではありません。この機能の最大の価値は、適用が始まる前の準備期間にあります。

許可リストを今展開して検証することで、管理者は未知の依存関係を見つけ、不要になったアプリケーションを削除し、まだ EWS に依存しているベンダーと調整を始め、Microsoft Graph への移行を始める時間を確保できます。

- 未知の EWS 依存関係を検出する
- 不要になったアプリケーションを削除する
- まだ EWS を必要としているベンダーに連絡する
- Microsoft Graph API への移行を始める
- 例外が本当に必要なアプリケーションを検証する
- 将来のサポート エスカレーションや停止を減らす

段階的な無効化の影響を受け始めてから対応する管理者は、修復に使える時間がかなり短くなり、中断が発生する可能性も大幅に高くなります。

### 管理者向けの推奨される次の手順

Exchange Online 管理者には、今すぐ次の作業を始めることを強く推奨します。

#### EWS の利用状況を棚卸しする

組織内で現在 EWS を使用しているすべてのアプリケーションとサービスを特定します。テナントで利用可能な場合は EWS 使用状況レポートを使用し、テナントの使用状況をまとめたメッセージ センターの投稿も確認します。詳しくは、[現場レポート: EWS 廃止前に行う EWS アプリ利用状況の確認と対策](/blog/notes-from-the-field-finding-and-remediating-ews-app-usage-before-retirement/) をご確認ください。

#### 許可リストを作成する

EWS を引き続き必要とすることがわかっているアプリケーションだけを含む EWSAllowedAppIDs 許可リストを作成します。

管理者が許可したいアプリケーションを既に把握している場合は、1 つ以上の App ID を指定して、新しい許可リストを直接作成できます。

例:

```powershell
Set-OrganizationConfig -EwsAllowedAppIDs "11111111-2222-3333-4444-555555555555,aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
```

このコマンドは、現在の値を指定した承認済みアプリケーションのセットに置き換えます。

値を設定した後、管理者は次のコマンドで構成済みのリストを確認できます。

```powershell
Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy | Format-List EwsAllowedAppIDs
```

<p style="background: #F0F0F0"><code>RetrieveEwsOperationAccessPolicy</code> の使用はパフォーマンス上の理由で必要です。このリストは、管理者が明示的に要求した場合にのみ取得するようにしています。</p>

<p style="background: #F0F0F0">このプロパティを設定すると、リスト全体の値が書き込まれる点に注意してください。プロパティに既に App ID が含まれている場合、新しいコマンドに含めない限り、それらは置き換えられます。この点については次の例も参照してください。</p>

### 徹底的にテストする

許可リストに含めたすべてのアプリケーションが期待通りに動作し続けることを検証し、見落とした依存関係がないか確認します。App ID を追加または削除する必要がある場合は、現在のリストを読み取り、更新後のリストを計算してから、値全体を書き戻す必要があります。現時点では、このコマンドレットは 1 件ずつ追加または削除する操作をサポートしていません。

リストを更新する 2 つの例を示します。

**例: 新しい App ID を追加する**

一般的なパターンは、現在のリストを読み取り、新しい App ID を追加してから、結合したリスト全体を書き戻す方法です。

```powershell
# 現在の許可リストを読み取る
$current = (Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy | Select-Object -ExpandProperty EwsAllowedAppIDs)
# 追加する新しい App ID を定義する
$newAppId = "99999999-8888-7777-6666-555555555555"
# 既存の値と新しい値を結合する
$updated = @($current, $newAppId)
# 更新後の許可リストを書き戻す
Set-OrganizationConfig -EwsAllowedAppIDs ($updated -join ",")
```

**例: App ID を削除する**

現時点では単一項目の削除操作がないため、削除する場合もリスト全体を再計算する必要があります。

```powershell
# 現在の許可リストを読み取る
$current = (Get-OrganizationConfig -RetrieveEwsOperationAccessPolicy | Select-Object -ExpandProperty EwsAllowedAppIDs)
# 削除する App ID を定義する
$removeAppId = "99999999-8888-7777-6666-555555555555"
# コンマ区切りのリストを個々の App ID に分割する
$appIds = $current -split ","
# 指定した App ID を削除する
$updated = $appIds | Where-Object { $_ -ne $removeAppId }
# 更新後の許可リストを書き戻す
Set-OrganizationConfig -EwsAllowedAppIDs ($updated -join ",")
```

#### 全体像

EWS は、約 20 年にわたって Exchange エコシステムを支えてきました。

しかし、セキュリティ、信頼性、コンプライアンス、スケールに関する現在の要件には、よりモダンな API プラットフォームが必要です。Microsoft Graph は、Exchange Online の多くの連携シナリオにおける長期的な戦略プラットフォームです。

EWSAllowedAppIDs は、EWS からの迅速な移行を促しながらも、最終的な移行を管理しやすく予測しやすいものにするために設計されています。

早めに準備した組織ほど、この移行を円滑に進められます。今のうちに依存関係を棚卸しし、2026 年 10 月より十分前に許可リストを検証しておく管理者は、段階的な廃止が始まったときに中断を避けるうえで、はるかに有利な状況になります。

準備を始めるなら今です。

全体計画、機能差分の対応状況、関連リソースへのリンクに関する最新情報は、[**Exchange Online における Exchange Web Services の廃止**](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online) のページをご確認ください。
