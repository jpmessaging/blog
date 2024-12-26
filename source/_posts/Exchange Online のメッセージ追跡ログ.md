---
title: >
  Exchange Online のメッセージ追跡ログ
date: 2021-08-13
tags: Exchange Online
---

こんにちは。Exchange / Outlook サポートの柳本です。以前までこちらのブログで Exchange Online で採取可能なメッセージ追跡ログに関する記事を公開しておりました。数年前に公開された記事であり内容が古くなってきたため、改めて Exchange Online のメッセージ追跡ログの取得方法についてご案内します。Exchange Online にはいくつかの種類のメッセージ追跡ログがあるのですが、今回は弊社サポートから最もご案内する頻度が高い HistoricalSearch と呼ばれるタイプのメッセージ追跡ログを Windows PowerShell のコマンド ベースで取得する方法をご案内します。

## 事前準備

Windows Powershell から Exchange Online に接続します。

[Exchange Online PowerShell に接続する](https://docs.microsoft.com/ja-jp/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps)

## HistoricalSearch 取得手順

※ 取得対象のメッセージの送信 or 受信後すぐにメッセージ追跡ログを取得しようとすると結果が得られない可能性があります。<span style="background: linear-gradient(transparent 80%, #ffcc99 80%)">取得可能になるまでメッセージの送受信後から数時間要する</span>場合がございますので、結果が得られない場合は数時間置いて再度本手順を実行してください。

### 1. メッセージ追跡 (HistoricalSearch) を開始

取得対象メッセージのメッセージ ID が判明している場合は下記 [メッセージ ID を指定して実行する場合] を、メッセージ ID が不明な場合などは [送信者、受信者を指定して実行する場合] を実行してください。

**メッセージ ID を指定して実行する場合**

```PowerShell
Start-HistoricalSearch -ReportTitle <任意の実行名> -StartDate yyyy/mm/dd -EndDate yyyy/mm/dd -MessageID '<メッセージ ID>' -ReportType MessageTraceDetail -NotifyAddress <通知メールアドレス>
```

実行例:

```PowerShell
Start-HistoricalSearch -ReportTitle HistoricalSearch01 -StartDate 2021/8/12 -EndDate 2021/8/14 -MessageID '<TYAP286MB0889D5500E1B82DC368C092F95FA9@TYAP286MB0889.JPNP286.PROD.OUTLOOK.COM>' -ReportType MessageTraceDetail -NotifyAddress admin@contoso.com
```

メッセージ ID の確認方法がわからない方は[こちらの公開情報](https://support.microsoft.com/ja-jp/office/cd039382-dc6e-4264-ac74-c048563d212c)をご参照ください。

**送信者、受信者を指定して実行する場合**

```PowerShell
Start-HistoricalSearch -ReportTitle <任意の実行名> -StartDate yyyy/mm/dd -EndDate yyyy/mm/dd -SenderAddress <送信者メールアドレス> -RecipientAddress <受信者メールアドレス> -ReportType MessageTraceDetail -NotifyAddress <通知メールアドレス>
```

実行例:

```PowerShell
Start-HistoricalSearch -ReportTitle HistoricalSearch01 -StartDate 2021/8/12 -EndDate 2021/8/14 -SenderAddress sender@contoso.com -RecipientAddress recipient@contoso.com -ReportType MessageTraceDetail -NotifyAddress admin@contoso.com
```

上記は送受信者ともに指定していますが、送信者 (-SenderAddress) または受信者 (-RecipientAddress) のどちらか一方のパラメーターのみを指定して実行することも可能です。(利用シナリオ例: ある送信者が送信したメールを受信者を問わず取得したい時)

※ パラメーターの<span style="background: linear-gradient(transparent 80%, #ffcc99 80%)"> StartDate および EndDate は協定世界時 (UTC) を基準としています</span>。日本標準時 (JST) での受信時刻とは異なりますので、例えば、2021/08/13 (JST) に受信した場合は、StartDate を 2021/08/12、EndDate を 2021/08/14 と指定することをお勧めします。

### 2. HistoricalSearch のステータス確認

手順 1. 実行後に表示された JobId を控えておき、以下のコマンドを実行して Status が Done となっていることを確認します。
Status が Done となるまでには数時間かかる場合があるので、以下のコマンドは Start-HistoricalSearch でのメッセージ追跡開始後、しばらく時間が経ってから実行することをお勧めします。

```PowerShell
Get-HistoricalSearch -JobId 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' | FL
```

### 3. 実行結果 (CSV ファイル) のダウンロード

該当の JobId の Status が Done となったら、FileUrl に記載されている URL より CSV 形式のメッセージ追跡ログをダウンロードします。
URL アクセス時に証明書の警告画面が表示された場合には、[キャンセル] を押して処理を進めます。

注意点:

- 1 日経過しても Status が Done とならない場合には、再度新しく HistoricalSearch を作成、開始いただけますようお願いいたします。
- 手順 3 にて CSV 形式のメッセージ追跡ログをダウンロードできる回数には制限があります。2021 年 8 月時点では 20 回以上ダウンロードすると以下のエラーとなります。

  > 503
  > サーバーがビジー状態です
  > サービスはビジー状態です。しばらくしてからもう一度やり直してください。

  エラーとなる場合は、再度手順 1 からメッセージ追跡の手順を実施ください。

#### 補足

本記事では PowerShell コマンドによるメッセージ追跡ログ (HistoricalSearch) の取得手順をご案内しました。
Microsoft 365 管理センター上でメッセージ追跡ログを取得する手順につきましては下記の公開情報をご参照ください。

- [Message trace in the modern Exchange admin center](https://docs.microsoft.com/en-us/exchange/monitoring/trace-an-email-message/message-trace-modern-eac)
- (機械翻訳版) [最新の Exchange 管理センターでのメッセージの追跡](https://docs.microsoft.com/ja-jp/exchange/monitoring/trace-an-email-message/message-trace-modern-eac)

#### 参考リンク

- [Start-HistoricalSearch](https://docs.microsoft.com/en-us/powershell/module/exchange/start-historicalsearch?view=exchange-ps)

本記事は 2021 年 8 月 13 日時点で執筆されたものであり、ご紹介したコマンドの動作、機能は今後変更される場合がございます。
