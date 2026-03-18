# Copilot Instructions for Japan Exchange & Outlook Support Blog

このリポジトリは Hexo で構築された日本マイクロソフト Exchange & Outlook サポート チームの技術ブログです。

## プロジェクト構造

- 記事ファイル: `source/_posts/` に Markdown で配置
- 画像等のアセット: `post_asset_folder: true` のため、記事と同名のフォルダーに配置
- テーマ: `themes/jpmessaging/`
- スキャフォールド: `scaffolds/post.md`

## 記事のフロントマター

```yaml
---
title: "記事タイトル"
date: YYYY/MM/DD HH:mm
lastupdate: YYYY/MM/DD
tags:
- タグ名
---
```

- `title`: 日本語タイトル。コロンを含む場合はダブルクォートで囲む
- `date`: 公開日時
- `lastupdate`: 更新日 (更新がない場合は空欄、もしくは lastupdate フィールド自体を省略)
- `tags`: Exchange, Exchange Online, Outlook, New Outlook など
- ファイル名は英語のケバブケース (例: `released-february-2026-exchange-server-security-updates.md`)

## タイトルのルール

記事のタイトルは、タイトルを見てどのような記事かわかるものにする。「xxx について」など抽象的なものは避ける。

## 抄訳記事のルール

### 抄訳記事のヘッダー

英語記事を日本語に翻訳 (抄訳) する場合、フロントマターの直後に必ず以下の注釈を入れる:

```
※ この記事は、[英語記事のタイトル](英語記事のURL) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。
```

### 翻訳のガイドライン

以下のポイントに気を付けて翻訳を行う:

- すべての単語を日本語に置き換える必要はない。
- 原文と意味が変わってしまっていないかチェックしながら翻訳する。
- 翻訳するだけではなく、日本語として理解できる文章になっているか推敲する。
- 1 文が長くなるようであれば 2 文以上に分ける。
- 省略しても意味が変わらない英語表現やフランクな英語表現はあえて翻訳しなくても問題ない。
- 少なくとも抄訳版では、内容をつけ足したり、文章の構造を変えたりしない。内容をつけ足したり、文章の構成を変えたりするのは、日本のお客様向けの再編集にあたる。
- 原文に主語がない場合は、無理に主語をつけない。
- 原文の主語が We や Microsoft のように特定の人物やグループを特定できない場合は、翻訳後の文章の主語を「私たち」や「Microsoft」にしてしまうと日本語として不自然になる場合が多い。そのような場合は翻訳後の文章には主語を付けなくても問題ない。

### 固有名詞の翻訳

以下の固有名詞は記載の通りに翻訳すること:

| 英語表記 | 日本語表記 |
|---|---|
| Accepted Domain | 承認済みドメイン |
| Inbound Connector | 受信コネクタ |
| Outbound Connector | 送信コネクタ |

### 翻訳記事における更新日時の取り扱い

翻訳記事のフロントマターの `date` は、原文の記事の公開日とは関係なく、翻訳記事を最初に公開した日付を入れること。

翻訳記事は原文の記事が更新されたときに内容を見直して必要に応じて翻訳を更新する必要がある。翻訳記事のフロントマターの `lastupdate` は、原文の記事の更新日とは関係なく、翻訳記事を更新した日付を入れること。
翻訳記事の `lastupdate` は、特段の事情がない限りは翻訳記事を更新したときに毎回更新すること。
翻訳記事の原文の本文中に更新日時が記載されている場合は、翻訳記事の本文中にも原文にある通りに更新日時を翻訳して記載すること。結果として翻訳記事の本文中の更新日時とフロントマターの `lastupdate` の日付が異なることがあっても問題ない。

## MS Japanese スタイルガイド

日本語の文章は MS Japanese スタイルガイド (https://aka.ms/japanese-styleguide) に準拠すること。特に以下を厳守する:

### 半角・全角ルール

- 半角カタカナは使用しない (常に全角カタカナを使用)
- 半角でも全角でも表現できる記号は半角を使用する
  - NG: `（` `）` `：` → OK: `(` `)` `:`
- 句読点は全角の `。` と `、` を使用する

### スペースの挿入ルール

句読点以外の全角文字と半角文字の間には半角スペースを挿入する:

- NG: `最新のAI` → OK: `最新の AI`
- NG: `Microsoftの社員` → OK: `Microsoft の社員`
- NG: `2025年9月15日` → OK: `2025 年 9 月 15 日`
- NG: `Exchange Serverを利用` → OK: `Exchange Server を利用`

## 製品名・用語の表記

以下の正式な表記を使用すること。かっこ内は文中で許容される省略表記:

| 正式名称 | 省略表記 |
|---|---|
| 新しい Outlook for Windows | 新しい Outlook |
| 従来の Outlook for Windows | 従来の Outlook |
| Outlook on the web | Ootw |
| Exchange Server Subscription Edition | Exchange SE |
| Outlook for Mac | - |
| Outlook for Mobile | - |
| Outlook for iOS | - |
| Outlook for Android | - |
| Exchange Server | - |
| Exchange Online | - |
| Microsoft Entra ID | - |
| Microsoft Entra Connect | - |
| Microsoft 365 Copilot | - |
| Microsoft 365 Copilot Chat | Copilot Chat |
| Copilot in Outlook | - |

- 初出時はフルネームを使用し、省略表記がある場合は `フルネーム (省略表記)` の形式で記載する
- 製品名は英語のまま記載する (カタカナに変換しない)
- "Azure AD" は使用せず "Microsoft Entra ID" を使用する

## リンクの書き方

- ブログ内の他の記事へのリンクは相対パスを使用: `/blog/記事スラッグ/`
- 外部リンクは完全な URL を使用
- Microsoft Learn のリンクは日本語版 (ja-jp) がある場合でもロケール (`ja-jp`) を省略した URL を使用する。
  - 例: `https://learn.microsoft.com/ja-jp/office365/servicedescriptions/exchange-online-service-description/exchange-online-service-description` → `https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-service-description`

## 文体の注意

ビジネス文書のような硬い文章ではなく、ブログらしい少しやわらかい文章を心掛ける。

`お客様` は Microsoft のお客様全体を示す場合以外はなるべく使わないようにする。ブログの読者のことを示す場合には `管理者の皆さま` や `利用者の皆さま` などに言い換える。
英語で書いたときに `Microsoft customers` と言えるものは `お客様`、`You` と言えるものは別の言い方にすると考えると、適切な表現が見つかることが多い。

敬語表現は少なめにするように意識すると、柔らかい文章になる。「していただく」「させていただく」「おります」「ございます」などは別の言い方ができるのであれば言いかえをしたほうが文章が柔らかくなる。
