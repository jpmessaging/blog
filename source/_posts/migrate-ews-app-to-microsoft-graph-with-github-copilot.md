---
title: GitHub Copilot を使って EWS アプリを Microsoft Graph に移行してみた
date: 2026-08-27
tags:
- Exchange Online
- Microsoft 365 Developer
---

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームの山内です。
[Exchange Online EWS: 廃止期限が迫っています](/blog/exchange-online-ews-your-time-is-almost-up/) では、ほとんどのアプリは限られた EWS の機能しか使用しておらず、AI を活用した移行などの最新ツールを使うことで、想像しているよりも簡単に移行できるケースが多いと紹介しました。

とはいえ、実際の EWS アプリを AI に渡すと、どこまで Microsoft Graph へ移行できるのでしょうか。移行前と同じ動作を保てるのか、コード以外に何を変更し、人は何を確認する必要があるのかも気になるところです。

そこで今回は、読者も手元で検証しやすいように、受信トレイのメールを取得する小さな PowerShell スクリプトを GitHub Copilot で Microsoft Graph 版へ変換し、実際に動かしてみます。ここで紹介する進め方は、C# など他の言語で作られた EWS アプリにも応用できます。変換前後の結果を比べながら、AI を活用した移行がどの程度手軽に進められるのかを確認します。

### 想定読者と本記事の位置付け

本記事は、EWS を利用したアプリケーションおよび AI を使用したアプリケーションの開発経験があり、Microsoft Graph への移行を検討しているアプリケーション開発者を対象としています。

本記事は、Exchange Online の管理者を対象とした記事ではありません。また、アプリケーション開発の経験がない管理者が、本記事を参考に AI を使って自力で Microsoft Graph への移行を行うことを推奨するものでもありません。
AI は移行作業を支援するためのツールであり、生成されたコードをそのまま利用できるとは限りません。必ず、AI の出力を技術的にレビューし、必要に応じて修正できるアプリケーション開発者が、移行作業と動作確認を行ってください。

本記事では、Visual Studio Code で GitHub Copilot を利用できるように構成されている環境を前提としています。

### 今回変換する EWS コード

変換元は、EWS の `FindItem` を使って、指定したメールボックスの受信トレイから最新 10 件を取得するスクリプトです。表示する項目は次の 3 つだけです。

- 受信日時
- 差出人の表示名
- 件名

スクリプト全体はこちらから確認できます。

{% asset_link Get-EwsInboxMessages.ps1 "Get-EwsInboxMessages.ps1" %}

このスクリプトでは、OAuth 2.0 のクライアント資格情報フローで EWS 用のアクセス トークンを取得し、SOAP リクエストを `https://outlook.office365.com/EWS/Exchange.asmx` へ送信しています。

### まず EWS 版を動かしてみる

Client Secret はコードに書かず、実行時に SecureString として入力します。実際の値へ置き換えるのは Tenant ID、Client ID、メールボックスの 3 か所です。

```powershell
$clientSecret = Read-Host "Client Secret" -AsSecureString

.\Get-EwsInboxMessages.ps1 `
    -TenantId '<tenant-id>' `
    -ClientId '<client-id>' `
    -ClientSecret $clientSecret `
    -Mailbox 'user@contoso.com'
```

受信トレイの最新 10 件が、`ReceivedDateTime`、`From`、`Subject` の 3 列で表示されます。この結果を、変換後の動作を確認するための基準にします。

![EWS 版で受信トレイの最新 10 件を取得した結果](ews-result.png)

### Copilot に変換を依頼する

`Get-EwsInboxMessages.ps1` を `Get-GraphInboxMessages.ps1` という名前でコピーし、コピーしたファイルを Visual Studio Code で開きます。その状態で GitHub Copilot Chat に次のプロンプトを渡します。

実際のアプリでは、使っている EWS の操作や入出力をすべて把握し、プロンプトに列挙することが難しい場合があります。そこで、具体的な API や処理内容は指定せず、まずコードから現在の動作を読み取るように依頼します。また、EWS と Microsoft Graph は必ずしも 1 対 1 で対応しないため、単一の API 呼び出しではなく、必要に応じて周辺のコードも変更しながらアプリ全体の動作を保つように依頼します。

```text
このワークスペースにある EWS を使用したアプリケーションを分析し、Microsoft Graph を使用する実装へ移行してください。

移行にあたって、次の作業を行ってください。

- コード全体を確認し、使用している EWS の操作、認証方式、入力、出力、エラー処理、外部から見た動作を特定する
- EWS の各操作に対応する Microsoft Graph v1.0 の API と、機能や動作の差を確認する
- 現在の言語、実行環境、認証方式、公開されているパラメーターや戻り値をできる限り維持する
- 1 対 1 で置き換えられる Graph API がない場合も、複数の Graph API、取得後の処理、呼び出し側などを変更することで、アプリケーション全体として現在の動作を維持できるか検討する
- アプリケーション全体の動作を維持するために必要であれば、EWS を呼び出している箇所だけでなく、その前後のコードも含めた変更を提案し、整合するように編集する
- 既存のエラー処理と秘密情報の扱いを維持し、実環境の値をコードへ埋め込まない
- 移行後の処理に必要な最小の Microsoft Graph のアクセス許可を、委任されたアクセス許可かアプリケーションのアクセス許可かを含めて示す
- Microsoft Entra ID で変更が必要な設定を示す
- 現在の動作を維持できない箇所は、変換不能と判断する前に、Microsoft Graph との機能差、データ モデル、アクセス許可、認証方式などの理由を特定する
- その箇所を変換できるようになる条件と、考えられる代替方法、代替方法を採用した場合の動作の違いを示す
- コードから動作を判断できない箇所は推測で実装せず、不足している情報と確認方法を示す
- 現在の動作を維持した移行を完了した後に、Microsoft Graph の機能を活用して効率化できる処理や、見直せる要件と実装がないか分析する
- 改善候補は互換性を維持するための変更と分け、期待できる効果、動作への影響、採用前に人が確認すべき要件とともに提案する。確認を得るまでは改善候補をコードへ反映しない

書き換え後に、特定した現在の動作、EWS と Microsoft Graph の対応関係、変更した箇所、必要なアクセス許可、維持できない動作とその理由、変換可能になる条件、移行後に人が確認すべき項目を簡潔に説明してください。さらに、互換性を維持するための変更とは別に、Microsoft Graph を前提とした改善候補を示してください。
```

1 対 1 で対応する Graph API がないことだけで、アプリ全体を移行できないとは限りません。複数の API やアプリ側の処理で同じ結果を実現できる場合があります。それでも動作を維持できない場合は、理由と変換可能になる条件を示してもらうことで、要件の見直しや代替方法を判断できます。

プロンプトはテキスト ファイルでもダウンロードできます。

{% asset_link copilot-prompt.txt "copilot-prompt.txt" %}

![GitHub Copilot が EWS 版を Microsoft Graph 版へ変換した画面](copilot-conversion.png)

### 生成されたコードを確認する

生成 AI の性質上、GitHub Copilot の生成結果は常に同じになるとは限らず、使用するモデル、対象のコード、プロンプトを実行したときのコンテキストなどによって変わります。以下は、今回のスクリプトに対する生成結果を人が確認した一例です。コードは 1 回の依頼で Microsoft Graph 版へ変換されましたが、EWS 版と実行結果を比較したところ、受信日時に 9 時間の差が見つかりました。同じプロンプトを使っても、必ず同じコードが生成されるわけではないため、生成後のレビューと動作確認は必要です。

変換後のスクリプト全体はこちらです。

{% asset_link Get-GraphInboxMessages.ps1 "Get-GraphInboxMessages.ps1" %}

主な変更は 3 か所だったことがわかります。

1. アクセス トークンの対象を `https://outlook.office365.com/.default` から `https://graph.microsoft.com/.default` へ変更する。
2. SOAP の `FindItem` を、Microsoft Graph の `/users/{mailbox}/mailFolders/inbox/messages` への GET リクエストへ変更する。
3. XML の EWS 応答ではなく、JSON の `value` から受信日時、差出人、件名を取り出す。

Microsoft Graph へのリクエスト部分は、次のようにかなり短くなりました。

```powershell
$mailboxPath = [System.Uri]::EscapeDataString($Mailbox)
$messagesUri = "https://graph.microsoft.com/v1.0/users/$mailboxPath/mailFolders/inbox/messages?`$select=receivedDateTime,from,subject&`$orderby=receivedDateTime desc&`$top=10"

$response = Invoke-RestMethod -Method Get -Uri $messagesUri -Headers @{
    Authorization = "Bearer $($tokenResponse.access_token)"
} -ErrorAction Stop
```

検証環境では、生成されたコードのまま実行すると、EWS 版と Microsoft Graph 版の受信日時に 9 時間の差がありました。日時の扱いを次のように 1 行調整したところ、同じ結果になりました。

```powershell
ReceivedDateTime = ([datetimeoffset]$_.receivedDateTime).UtcDateTime
```

パラメーターと出力プロパティ名は EWS 版から変えていません。API の内側は SOAP から REST へ変わりましたが、スクリプトを呼び出す側への影響は抑えられています。

### Microsoft Entra ID のアクセス許可を変更する

GitHub Copilot の応答に、必要な権限として Microsoft Graph のアプリケーション権限 Mail.ReadBasic.All と書かれており、技術的に確認しても Mail.ReadBasic.All のアクセス許可が妥当となるので、以下の通りアクセス許可を変更します。
より複雑なアプリなどでアクセス許可を設定する場合は、アプリによって複数のアクセス許可が必要な場合など、今回のアクセス許可と異なる場合があります。

1. [Microsoft Entra 管理センター](https://entra.microsoft.com) で対象のアプリ登録を開き、[API permissions] から Microsoft Graph のアプリケーション権限 `Mail.ReadBasic.All` を追加します。
2. 追加したアクセス許可に管理者の同意を付与します。
3. [App registrations] の構成済みアクセス許可から、Office 365 Exchange Online の `full_access_as_app` を削除します。
4. 同じ [API permissions] 画面下部の、テナントに付与されたその他のアクセス許可の一覧で、`full_access_as_app` のメニューから [管理者の同意を取り消す] を選びます。

![Microsoft Graph の Mail.ReadBasic.All に管理者の同意を付与した状態](entra-graph-permission.png)

![EWS の full_access_as_app に対する管理者の同意を取り消す操作](entra-revoke-ews-permission.png)

[App registrations] からアクセス許可を削除する操作は、アプリが今後要求するアクセス許可の構成を変更するものです。削除後も、既に付与された EWS のアプリケーション権限は同じ [API permissions] 画面下部に表示されます。EWS の権限を確実に外すため、そのメニューから管理者の同意も取り消します。

今回のスクリプトが取得するのは基本的なメール プロパティだけなので、`Mail.ReadBasic.All` を使います。本文、添付ファイル、拡張プロパティなどを取得するアプリでは要件が異なるため、実際に使っているデータに合わせて権限を選びます。

### Microsoft Graph 版を EWS 版と同じ条件で動かしてみる

権限の変更が反映されたら、EWS 版と同じパラメーターで Microsoft Graph 版を実行します。今回の例では変わるのはスクリプトのファイル名だけでした。

```powershell
$clientSecret = Read-Host "Client Secret" -AsSecureString

.\Get-GraphInboxMessages.ps1 `
    -TenantId '<tenant-id>' `
    -ClientId '<client-id>' `
    -ClientSecret $clientSecret `
    -Mailbox 'user@contoso.com'
```

Microsoft Graph 版でも、受信トレイの最新 10 件が `ReceivedDateTime`、`From`、`Subject` の 3 列で表示されます。

![Microsoft Graph 版で受信トレイの最新 10 件を取得した結果](graph-result.png)

変換前後を並べると、違いは次のようになります。

| 項目 | EWS 版 | Microsoft Graph 版 |
|---|---|---|
| スクリプトのパラメーター | Tenant ID、Client ID、Client Secret、Mailbox | 同じ |
| 取得するメール | 受信トレイの最新 10 件 | 同じ |
| 表示する項目 | 受信日時、差出人表示名、件名 | 同じ |
| トークンの対象 | Office 365 Exchange Online | Microsoft Graph |
| API | EWS の `FindItem` | Microsoft Graph の List messages |
| 要求と応答 | SOAP / XML | REST / JSON |
| アプリケーション権限 | `full_access_as_app` | `Mail.ReadBasic.All` |

内部で使う API やデータ形式は変わっています。一方、スクリプトの入力と出力を維持したため、利用者から見た動作はほとんど変わりません。

### Copilot に任せる部分と人が確認する部分

今回のような小さな EWS 呼び出しでは、コード変換の多くを Copilot に任せられます。ただし、生成されたコードをそのまま本番で使うのではなく、権限と動作は人が確認します。

| Copilot に任せた部分 | 人が確認すべき部分 |
|---|---|
| トークンの対象リソースと API エンドポイントの変更 | EWS の操作に対応する Microsoft Graph API があること |
| SOAP リクエストから REST リクエストへの変更 | 取得するデータに対して権限が過剰でないこと |
| XML から JSON への応答処理の変更 | 管理者の同意と EWS 権限の失効が完了していること |
| 1 対 1 で対応しない処理の代替案と周辺コードの変更 | 代替方法による動作の違いを許容できること |
| 既存のパラメーターと出力形式の維持 | 変換前後の件数、並び順、表示内容が同等であること |
| JSON から出力オブジェクトへの変換 | 日時のタイム ゾーンや型が変換前後で一致していること |
| エラー処理を含むコードのたたき台の作成 | コードや画面に秘密情報が残っていないこと |

コードのたたき台を短時間で作れることは、Microsoft Graph への移行を始めるうえで大きな助けになります。人が確認すべきポイントを先に押さえておけば、既存の EWS コードを 1 つずつ Microsoft Graph 版へ置き換えていく流れもイメージしやすくなります。

### まとめ

EWS の `FindItem` を使う PowerShell スクリプトを GitHub Copilot に渡し、Microsoft Graph の List messages を使うコードへ変換しました。API の呼び出し方は変わりましたが、パラメーターと出力を維持することで、変換前後の動作はほぼ同じにできました。

今回は読者が手元で簡単に検証できるように PowerShell を使いましたが、この進め方は PowerShell に限定されません。C# など他の言語で作られた EWS アプリでも、Copilot に既存コードを分析させ、EWS の処理を対応する Graph API へ置き換え、権限と変換前後の動作を確認するという同じ流れで移行を進められます。言語によってコードや利用するライブラリは異なりますが、この記事で紹介したプロンプトと確認のポイントは共通して利用できます。

すべてを Copilot に任せるのではなく、API の機能対応、最小権限、管理者の同意、実際の出力を人が確認することがポイントです。既存アプリの小さな EWS 呼び出しを 1 つ選び、同じように変換前後を比べてみると、Microsoft Graph への移行を具体的に始められます。

まずは変換前と同じ動作を確認することが大切ですが、移行は既存の実装や要件を見直すよい機会でもあります。この見直しも、既存コードを Copilot に分析してもらい、改善候補と影響を整理しながら一緒に進めることができます。取得するデータ、処理の流れや頻度、必要な権限が現在も最適かを確認し、認証方法、対象メールボックスの制限、ページング、スロットリング、再試行、監視などを Microsoft Graph を前提に検討すれば、想像しているよりも取り組みやすくなります。

Copilot の提案をそのまま採用するのではなく、業務要件や運用への影響は人が判断する必要があります。それでも、EWS への依存を解消するだけでなく、これからも運用しやすいアプリへ発展させるための最初の一歩を、Copilot と一緒に踏み出すことができます。

### 参考資料

- [EWS アプリを Microsoft Graph に移行する](https://learn.microsoft.com/graph/migrate-exchange-web-services-overview)
- [List messages](https://learn.microsoft.com/graph/api/user-list-messages)
- [Microsoft identity platform と OAuth 2.0 クライアント資格情報フロー](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
- [Microsoft Graph のアクセス許可リファレンス: Mail.ReadBasic.All](https://learn.microsoft.com/graph/permissions-reference#mailreadbasicall)
- [エンタープライズ アプリケーションに付与されたアクセス許可を確認して失効する](https://learn.microsoft.com/entra/identity/enterprise-apps/manage-application-permissions)

#### 免責事項
<p style="background: #F0F0F0;">
本サンプル コードは、あくまでも説明のためのサンプルとして提供されるものであり、製品の実運用環境で使用されることを前提に提供されるものではありません。
本サンプル コードおよびそれに関連するあらゆる情報は、「現状のまま」で提供されるものであり、商品性や特定の目的への適合性に関する黙示の保証も含め、明示・黙示を問わずいかなる保証も付されるものではありません。
マイクロソフトは、お客様に対し、本サンプル コードを使用および改変するための非排他的かつ無償の権利ならびに本サンプル コードをオブジェクト コードの形式で複製および頒布するための非排他的かつ無償の権利を許諾します。
但し、お客様は、(1) 本サンプル コードが組み込まれたお客様のソフトウェア製品のマーケティングのためにマイクロソフトの会社名、ロゴまたは商標を用いないこと、(2) 本サンプル コードが組み込まれたお客様のソフトウェア製品に有効な著作権表示をすること、および (3) 本サンプル コードの使用または頒布から生じるあらゆる損害 (弁護士費用を含む) に関する請求または訴訟について、マイクロソフトおよびマイクロソフトの取引業者に対し補償し、損害を与えないことに同意するものとします。 </p>
