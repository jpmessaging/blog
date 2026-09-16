# 既存抄訳記事の更新対応自動化 (計画)

## 目的

この文書は、英語ブログの原文記事が更新された際に、対応する日本語の抄訳記事の見直しを効率化するための自動化計画をまとめたものです。

新規記事の翻訳自動化 ([`translation-automation.md`](./translation-automation.md)) が既に稼働しているのに対し、この文書が扱う「既存記事の更新検出」は現時点では計画段階です。実装はステップごとに子セッションを立てて進めるため、この文書は全体の設計判断と進捗を一箇所にまとめておくための管理用ドキュメントです。

## 背景: 現在の運用

現在、英語記事の更新検知は次の手順で行われています。

1. PowerShell (`ExchangeOutlookCaseMonitor` モジュール, `Test-BlogArticleUpdate`) が翻訳済み英語記事を定期的にクロールする
2. 前回クロール時の本文をキャッシュとして保持しており、新たに取得した本文との差異を `Compare-Object` で比較する
3. すべての記事のチェックが終わったら、結果一覧の CSV ファイルを生成する
4. CSV と、変更があった記事の変更前後の本文を保存した HTML ファイルを 1 つの zip にまとめ、SharePoint Online (SPO) にアップロードする
5. SPO へのアップロードをトリガーに Power Automate のフローが起動する
6. フローが zip を展開する
7. CSV を見て、更新があった記事があれば Blog チームの Teams チャットに通知する
8. Blog チームが TechCommunity 上でグラフィカルな変更履歴・diff を確認し、抄訳記事の修正が必要かどうかを判断する
9. 修正が必要な場合、Blog チームのメンバーが手作業で抄訳記事を修正し、PR を作成する
10. 別のメンバーがレビューし、必要なら修正してマージする
11. マージ後、GitHub Actions により GitHub Pages へ自動的に公開される

この文書が扱うのは、上記の 7〜9 (通知〜修正着手) を段階的に自動化する計画です。

## 段階的な自動化方針

一気に完全自動化するのではなく、2 段階に分けて進めます。

| 段階 | 範囲 | 状態 |
|---|---|---|
| 第 1 段階 | Teams への通知の高度化 (アダプティブ カード) と、Blog チームの判断結果を起点とした GitHub Issue の自動作成 | 計画中 |
| 第 2 段階 | Issue への Copilot cloud agent の割り当てまでの自動化 | 保留 (下記「第 2 段階を保留する理由」を参照) |

### 第 2 段階を保留する理由

新規記事翻訳の自動化においても、Issue への Copilot cloud agent の割り当ては現状手動です。将来、割り当てまで自動化するタイミングでは、新規記事翻訳フローも「Teams のボタンから Issue を作成する」形に変更する可能性が高いと考えています。そのため、更新記事対応の第 2 段階は、新規記事翻訳フローの見直しと足並みをそろえて着手します。

## 第 1 段階の設計判断

検討の過程で、次の設計判断を行いました。

### 記事ごとの構造化 JSON 差分は作らない

現実の更新内容は多様であり、単純な構造化スキーマ (追加/削除/変更の分類など) には収まらないため、記事ごとの JSON 差分は作成しないことにしました。

### 事前のハッシュ計算は行わない

変更前後の本文のハッシュ値を計算しておく案もありましたが、PowerShell が取得する本文領域と、Copilot cloud agent が実際にインターネットから取得する本文領域が完全に一致する保証がないため、事前ハッシュ比較のメリットは薄いと判断しました。

### Compare-Object は正規化済みテキストブロックに対して実行する

PowerShell 側は現在、記事本文を抽出した生の HTML 文字列同士を `Compare-Object` で比較して「差分の有無」だけを判定しています。この生 HTML をそのまま人間可読な diff として出力すると、タグ・属性・改行位置の変動がノイズになり読みにくくなります。

そこで、比較前に HTML を見出し・段落・リスト項目・テーブル セルなどのブロック要素単位でテキストへ正規化してから `Compare-Object` を実行し、読みやすいプレーンテキストの diff を生成する方式を採用しました。

`Compare-Object` は行 (要素) 単位の集合比較であり、LCS ベースの整列は行わないため、「段落内の一部だけの変更」でも旧ブロック全体が削除・新ブロック全体が追加として表示されます。この制約は許容し、人間のレビューおよび Copilot cloud agent への手掛かりとして十分と判断しました。

### 正規化 diff の用途と Issue 本文への転記

Blog チームは英語記事の更新内容を TechCommunity 上のグラフィカルな変更履歴で確認できるため、Teams 通知自体には「どの記事が更新されたか」の情報があれば十分です。

一方で、第 1 段階には「Blog チームが修正要否を判断した後、GitHub Issue を自動作成し、更新対応専用の Copilot cloud agent を割り当てる」という工程が含まれます。Issue に割り当てられた agent は Issue 本文の情報のみを手掛かりに作業を開始するため、「英語記事のどこがどう変わったか」を Issue 本文に含めておく必要があります。そのため、正規化した diff テキストは Issue 本文へ埋め込むために生成します。

### 新しい zip は別ファイル・別 SPO フォルダーとして追加する

既存の `Test-BlogArticleUpdate` の動作 (CSV 生成、既存 zip 生成、既存 SPO フォルダーへのアップロード) は完全に維持します。そのうえで、diff テキストを含む新しい zip を追加で生成し、既存とは別の新しい SPO フォルダーへアップロードします。

これにより、`Test-BlogArticleUpdate` を実行しても、稼働中の Power Automate フロー (既存 zip の SPO フォルダーを監視) には影響を与えません。

新しい zip の詳細:

| 項目 | 内容 |
|---|---|
| zip の中身 | 更新があった記事ごとの diff テキストファイルのみ (変更前後の HTML ファイルは含めない) |
| CSV | 従来の `Result.csv` をそのまま複製 (更新がなかった記事の行も含む) |
| アップロード先 SPO フォルダー | `Shared Documents/ExchangeOutlookCaseMonitor/BlogMonitor/ReportsV2` (既存の `Reports` と並列) |

### テスト容易性のための関数分離

監視対象の英語記事数が多く `Test-BlogArticleUpdate` の全件実行には時間がかかるため、新しい zip の「生成」と「アップロード」を独立した関数に分離します。これにより、本番のクロール処理を実行せずに、新しい zip の生成・アップロードだけを単体でテストできます。

また、Issue 作成や Copilot cloud agent の動作確認を効率的に行うため、実際のクロールを行わずにテスト用の diff zip を作成・アップロードできる関数も用意します。従来処理 (`Add-BlogMonitorResult`) がアップロードする zip は `$ReportFolder` をそのまま `Compress-Archive` したものであり、展開すれば #3 の入力形式 (Result.csv + 更新記事ごとの `<ID>-CacheArticle.html`/`<ID>-CurrentArticle.html`) とそのまま一致します。そのため、実際に更新が検知された日の従来 zip を保存しておき、それを展開するだけでテストデータとして再利用できます。記事 ID は実在の監視対象記事のものになるため、Copilot cloud agent が実際の英語記事本文をインターネットから取得して動作確認する際にも使えます。

## 第 1 段階の実装ステップ

実装は PowerShell モジュール側とリポジトリ側に分かれます。PowerShell モジュールは `ExchangeOutlookCaseMonitor` リポジトリ (`C:\Users\rykoma\source\repos\ExchangeOutlookCaseMonitor`) の `PowerShell Module\vNext\` 配下で行います。

| # | ステップ | 内容 | 実装場所 | 状態 |
|---|---|---|---|---|
| 1 | 正規化・diff 生成関数の作成 | HTML をブロック要素単位でテキストに正規化する `Get-BlogArticleTextBlock` と、正規化済みテキストを比較して読みやすい diff テキストを生成する `Compare-BlogArticleText` を実装する | `PowerShell Module\vNext\BlogArticleDiff.psm1` (新規ファイル) | ✅ 完了・単体動作確認済み |
| 2 | モジュール登録 | マニフェストの `NestedModules` に `BlogArticleDiff.psm1` を、`FunctionsToExport` に新関数を追加する | `PowerShell Module\vNext\ExchangeOutlookCaseMonitor.psd1` | ✅ 完了 |
| 3 | diff zip 生成関数の実装 | `Test-BlogArticleUpdate` が作る `$ReportFolder` (Result.csv + 記事ごとの `<ID>-CacheArticle.html`/`<ID>-CurrentArticle.html` ペア) を読み取り、更新があった記事ごとに `Compare-BlogArticleText` で diff テキストを生成し、diff テキストのみを含む新しい zip を組み立てる関数。SPO へのアップロードは含めない | `BlogArticleDiff.psm1` (`Export-BlogArticleDiffReport` を追加) | ✅ 完了 (未コミット、小間さんが手動でコミット予定) |
| 4 | diff zip アップロード関数の実装 | #3 で作った zip を SPO フォルダー `.../BlogMonitor/ReportsV2` へアップロードするだけの関数 (`Add-BlogArticleDiffMonitorResult` 案) | `SpoManagement.psm1` | ✅ 完了 (未コミット、小間さんが手動でコミット予定) |
| 5 | `Test-BlogArticleUpdate` への追記 | 既存処理 (CSV 作成、従来 zip 作成・アップロード、フォルダー削除判定) を一切変更せず、フォルダー削除前に #3→#4 の呼び出しを追加する。失敗しても従来処理に影響しないよう try/catch で保護する | `BlogManagement.psm1` | ✅ 完了 (未コミット、小間さんが手動でコミット予定) |
| 6 | 単体記事テストデータ生成関数の実装 | 従来処理でアップロードされた実際の zip (`$ReportFolder` をまるごと `Compress-Archive` したもの) を展開し、`Result.csv` の存在などを検証したうえで展開先フォルダーのパスを返すだけの薄いラッパー関数 (`New-BlogArticleDiffTestReport` 案)。戻り値は #3 の `-ReportFolder` にそのまま渡せる | `BlogArticleDiff.psm1` | ✅ 完了 |
| 7 | テスト用一気通貫アップロード関数の実装 | #6 → #3 (`Export-BlogArticleDiffReport`) → #4 (`Add-BlogArticleDiffMonitorResult`) を順に呼び出し、既存 zip から diff zip を生成して `ReportsV2` へアップロードするまでを 1 コマンドで行うテスト専用関数 (`Invoke-BlogArticleDiffTestUpload` 案)。展開フォルダーと diff zip は既定で削除し、`-KeepExtractedFolder`/`-KeepDiffZip` で保持可能にする。アップロード先は常に `ReportsV2` のみで、本番 `Reports` フォルダーには一切触れない | `BlogArticleDiff.psm1` | ✅ 完了 |
| 8 | Teams 通知 (アダプティブ カード) | 新フォルダーの zip を検知し、更新記事の一覧を表示する。記事ごとに「更新不要」/「Issue 作成」ボタンを用意する | Power Automate | ⬜ 未着手 (フローの詳細設計は小間さんが手動で行うため Copilot 側の作業なし) |
| 9 | Issue 自動作成 | 「Issue 作成」ボタン押下で、対象記事の diff テキストを本文に含めた GitHub Issue を作成する。タイトル・本文フォーマットは下記「Issue タイトル・本文フォーマット」の通り確定済み | Power Automate + GitHub API (標準コネクタ) | ⬜ 未着手 (フォーマットは確定済み。フロー自体は小間さんが手動で作成) |
| 10 | 更新対応専用 custom agent の作成 | 新規記事翻訳の `translate-blog-post.agent.md` に相当する、既存記事の更新対応専用の agent を新規作成する。人間が対話的に使う `.github/prompts` は作成しない (Issue に割り当てて cloud agent が実行する用途のみ)。設計内容は下記「`update-translated-blog-post` agent の設計」の通り確定済み | `.github/agents/update-translated-blog-post.agent.md` (このリポジトリ) | ✅ 完了 ([#319](https://github.com/jpmessaging/blog/pull/319)) |
| 11 | Issue への手動割り当て | Blog チームが Issue で更新対応専用の custom agent を選択し、Copilot cloud agent を手動で割り当てる | GitHub (人手作業、変更なし) | - |
| 12 | agent による修正・PR 作成 | agent が Issue 本文の diff を手掛かりに抄訳記事を修正し、Draft PR を作成する | Copilot cloud agent | ⬜ 未着手 (#10 の agent 定義に依存) |
| 13 | レビュー・マージ・公開 | 既存のレビュー・マージ・GitHub Pages 公開フロー (変更なし) | このリポジトリ | - |
| 14 | 運用ドキュメントの整備 | 稼働後、この計画書を実運用ドキュメントとして書き直すか、`translation-automation.md` と統合する | `docs/operations/` | ⬜ 未着手 |

## Issue タイトル・本文フォーマット (#9)

Power Automate の GitHub 標準コネクタは Issue 作成時にタイトルと本文しか指定できません (ラベル等は指定不可)。また、PowerShell からアップロードされる zip には日本語記事のファイル名や原文タイトルは含まれず、CSV にある原文 URL と diff テキストファイルのみが使える情報です。そのため、日本語記事の特定は custom agent 側の責務としました。

```
タイトル: [更新検知] <原文 URL>

本文:
## 更新対象
- 原文 URL: <英語記事の URL>

## 原文の変更箇所 (自動生成された diff。ヒントであり全てではない)
<diff テキストをそのまま貼り付け>

## 作業内容
この Issue が GitHub Copilot cloud agent に割り当てられた場合は、次の手順で対応してください。
1. 原文 URL のスラッグから日本語記事のファイル名を推測し、見つからない場合は抄訳記事冒頭の注釈内の URL を検索して対象記事を特定する
2. 原文を取得し、diff をヒントとしつつ原文全体と日本語記事全体を広く比較して変更箇所を洗い出す (diff に現れない変更も見落とさない)
3. リポジトリの `.github/copilot-instructions.md` と `.github/agents/update-translated-blog-post.agent.md` に従う
4. 修正が完了し、Hexo のビルドが成功することを確認したうえで、Draft PR を作成する
```

日本語記事の特定に前提とした 2 つの重要な事情:

- 英語記事の front matter (フロントマター) には原文 URL は保持していません。日本語記事のファイル名は原文 URL のスラッグを基に作成されているため、そこから逆算して探します。
- ブログの URL は微修正やリダイレクトが起こり得るため、抄訳記事冒頭の注釈に書かれた原文 URL と Issue タイトルの原文 URL が完全一致しない場合を考慮する必要があります。

また、diff には変更があった行しか含まれないため (特に原文への追加はこの制約の影響を受けやすい)、agent には「diff はヒントであり全てではない」ことを明示し、原文取得を必須としたうえでアグレッシブに変更箇所を探すよう指示しています。

## `update-translated-blog-post` agent の設計 (#10)

新規記事翻訳用の `.github/agents/translate-blog-post.agent.md` を土台としつつ、更新対応特有の判断 (対象記事の特定、diff の位置づけ、修正範囲の限定) を追加する形で設計しました。設計時の主な論点と結論は次の通りです。

- **修正の粒度**: 変更検出そのものは原文全体と広く比較するが、実際に加える修正は特定した変更箇所へのピンポイント修正に限定する (変更と無関係な既存の文章・構成は変更しない)。
- **修正不要と判断した場合の扱い**: 記事は修正せず、判断内容と根拠を Issue にコメントして終了する。PR は作成せず、Issue はオープンのまま残す (agent はクローズしない)。ステップ 8 の Teams カードで人間が既に「更新不要」記事を弾いている前提のため、Issue 化された時点では基本的に修正が必要なはずだが、agent が調べた結果影響なしと判断した場合のフォールバックとして採用した。
- **front matter**: `lastupdate` は実際に更新した日付で更新し、`date` は変更しない。原文本文中に更新日時の記載があれば翻訳して本文にも反映する。
- **ビルド確認・PR 作成**: 新規翻訳 agent と同様に `npm ci`/`npm run clean`/`npm run build` を必須とし、Draft PR に `Closes #<Issue 番号>` を付与する。

agent 定義の全文は `.github/agents/update-translated-blog-post.agent.md` を参照してください。

## 未確定・今後検討する事項

- Power Automate 側のアダプティブ カードの具体的なレイアウトとボタン設計 (#8。細部は小間さんが手動で作成するため Copilot 側での検討は行わない)
- 第 2 段階 (Issue 作成・Copilot 割り当てまでの自動化) は、新規記事翻訳フローの見直しタイミングに合わせて着手する

## 子セッションでの作業の進め方

この文書の「第 1 段階の実装ステップ」の各行を単位として、小間さんの指示に基づき、この文書を管理する親セッションから子セッションを作成して実装を進めます。子セッション側の判断で新たな子セッションを作成することはしません。

この文書自体の更新 (状態列 ✅/⬜ の更新を含む) は、必ず親セッションで行います。子セッションでこの文書を更新することは禁止します。子セッションは実装が完了したらその旨を親セッションに報告し、親セッションがこの文書へ反映します。

PowerShell モジュール側の変更 (#1〜#7) は `ExchangeOutlookCaseMonitor` リポジトリ側の作業であり、このリポジトリ (`jpmessaging/blog`) の PR にはなりません。custom agent の作成 (#10) 以降は、このリポジトリでの変更となります。

### `ExchangeOutlookCaseMonitor` リポジトリでのコミットの扱い

`ExchangeOutlookCaseMonitor` リポジトリはモジュールのバージョン管理があるため、このリポジトリへのコミットは子セッション・親セッションともに Copilot からは行いません。ローカルの変更が一段落し、コミットしておいたほうがよいタイミング (キリのよい区切り、次のステップに進む前など) になったら、小間さんへコミットを促してください。コミットとバージョン番号の更新は小間さんが手動で行います。

### `jpmessaging/blog` リポジトリでのコミットの扱い

このリポジトリ (`jpmessaging/blog`) への変更についても、コミットする前には必ず小間さんに確認してください。ただし、小間さんからコミットするよう指示があった場合は、コミットや PR の作成を Copilot が行って構いません。
