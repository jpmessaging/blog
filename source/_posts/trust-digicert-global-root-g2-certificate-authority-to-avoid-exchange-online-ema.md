---
title: Exchange Online のメール中断を回避するため、DigiCert Global Root G2 認証局 (CA) を信頼してください
date: 2026-01-30
lastupdate:
tags: Exchange Online
---

※ この記事は、[Trust DigiCert Global Root G2 Certificate Authority to Avoid Exchange Online Email Disruption](https://techcommunity.microsoft.com/blog/exchange/trust-digicert-global-root-g2-certificate-authority-to-avoid-exchange-online-ema/4488311) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

組織と Exchange Online 間のメール フローの中断を回避するために、Exchange Online との間でメールを送受信する組織は、**2026 年 4 月 30 日までに**、サーバーとクライアントが **DigiCert Global Root G2 認証局 (Certificate Authority (以降、CA)) およびその下位 CA** を信頼するようにする必要があります。

ルート CA と下位 CA のチェーンの包括的な一覧は、[Azure 証明機関の詳細](https://learn.microsoft.com/azure/security/fundamentals/azure-certificate-authority-details?tabs=certificate-authority-chains#root-and-subordinate-certificate-authority-chains) のドキュメントおよび [DigiCert ナレッジベース](https://knowledge.digicert.com/general-information/digicert-trusted-root-authority-certificates#otherroots) で確認できます。

**DigiCert Global Root G2 証明書**を識別するには、以下の情報をご参照ください:


**SHA1 Thumbprint:**
 DF3C24F9BFD666761B268073FE06D1CC8D4F82A4

 **Serial Number:**
 03:3A:F1:E6:A7:11:A9:A0:BB:28:64:B1:1D:09:FA:E5


#### どのような場合に対応が必要か

<p style="background: #66FF99;"><strong>注:</strong> Windows オペレーティング システムは、既定で証明書の信頼を自動的に更新します。Windows 上でメール ワークロードを実行しているお客様 (例: オンプレミス Exchange Server) で、この Windows 機能を既定のまま有効にしている場合は、対応の必要はありません。</p>

ただし、組織が以下の 2 つの条件のいずれかに該当する場合は、「**何をすべきか**」に記載されているインストール手順を実行する必要がある場合があります。

**1.** お客様組織で Windows CTL Updater 機能を無効にしている場合
この機能は、信頼されたルート証明書と信頼されていないルート証明書を含む[証明書信頼リスト (CTL)](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-trust) を既定でダウンロードします。グループ ポリシーや [Microsoft 自動更新 URL のリダイレクト](https://learn.microsoft.com/windows-server/identity/ad-cs/configure-trusted-roots-disallowed-certificates)を使用して、独自の信頼されたルート証明書および中間証明書のセットを管理している場合、この機能が無効になっている可能性があります。

信頼されたルート証明書および信頼されていないルート証明書の最終同期状態を確認するには、Windows コマンド プロンプトから以下のコマンドを実行します (注: これらのコマンドを実行すると、この機能が明示的に無効になっておらず、かつ Windows がローカルの AuthRoot CTL が古いか不完全であると判断した場合、Microsoft の信頼されたルート リストのオンデマンド同期が開始されます):

```command
certutil -verifyctl AuthRoot | findstr /i "lastsynctime"
certutil -verifyctl Disallowed | findstr /i "lastsynctime"
```

返された時刻が最近のものであれば、Windows CTL Updater 機能は正常に動作しています。ほとんどのお客様はこの機能を無効にしていません。

**2.** Exchange Online との接続やメールの受信に、古いアプリケーション ランタイム環境 (レガシーな Java ランタイム (例: 古い JDK/JRE バージョン)、組み込みシステムやアプライアンス、カスタムまたは古い Linux イメージ、エアギャップ環境など) を使用している場合

この変更は、Exchange Server、セキュリティ アプライアンス、およびサードパーティ製のメール ゲートウェイなど、**Exchange Online に対して完全な証明書チェーン検証を実行するすべてのシステム**に適用されます。サードパーティ製のメール アプライアンスを使用している場合は、ベンダーに直接お問い合わせください。

#### なぜこの対応が重要か

ルート認証局 (CA) は、公開証明書の信頼の基盤を形成しています。オペレーティング システム、ブラウザー、およびアプリケーションは、信頼ストア内のルート証明書に依存しています。CA はこれらのルート証明書を使用して中間 CA 証明書を発行し、中間 CA が TLS やその他のデジタル証明書を発行します。

ルート CA 証明書が無効になったり信頼されなくなったりすると、その中間 CA によって発行されたすべての証明書も信頼を失います。つまり、ルート CA が明示的に信頼されていない場合、その中間 CA によって発行された証明書も有効ではなくなります。

Microsoft は、DigiCert Global Root G2 ルート CA から発行された複数の中間 CA を使用して、サービス (Exchange Online など) の TLS 証明書に署名しています。この信頼チェーンが機能するためには、DigiCert Global Root G2 ルート証明書がクライアントの信頼ストアに存在し、信頼されている必要があります。そうでない場合、TLS 接続は失敗します。

DigiCert Global Root G2 ルート証明書が**インストールされていない**場合、またはクライアントが **TLS ハンドシェイク中にサーバーから中間 CA 証明書を取得できない、もしくは Authority Information Access (AIA) 拡張機能を介して取得できない**場合、以下のような問題が発生する可能性があります:

- 厳格な証明書検証が有効になっている場合、クライアントはメールの送信を拒否する可能性があります。または、許可されている場合は暗号化されていない SMTP にフォールバックする可能性があります。
- クライアントは Exchange Online からの受信接続を拒否する可能性があり、メールの取得が失敗または遅延する可能性があります。

メール クライアントがサーバーを信頼できない場合、セキュリティで保護された通信がブロックされます。

#### 何をすべきか

##### お使いのマシンに DigiCert Global Root G2 証明書がインストールされているか確認する

以下の PowerShell コマンドを使用して、DigiCert ルート証明書が信頼されているかどうかを確認できます:

```PowerShell
Get-ChildItem -Path Cert:\LocalMachine\Root\ | Where-Object { $_.Thumbprint -eq "DF3C24F9BFD666761B268073FE06D1CC8D4F82A4" }
```

このコマンドで証明書が返された場合 (出力に Thumbprint と Subject が表示されます)、問題ありません。*追加の対応は必要ありません*:
![必要な証明書がローカルの Windows マシンで既に信頼されていることを示す結果](Cert01.jpg)

結果が返されない場合は、対応が必要です:

##### **最新の Microsoft 365 ルート証明書チェーン バンドルを手動でダウンロードしてインポートする**

Microsoft は、Microsoft 365 サービスで必要となる証明書を発行する中間 CA の信頼を確保するために、信頼すべきルート証明書のセットを提供しています。

証明書バンドル (**.p7b / PKCS #7** ファイル形式) は、以下からダウンロードできます:

- [Microsoft 365 Root Certificate Chain Bundle – Worldwide](https://www.microsoft.com/download/details.aspx?id=102267)
  - 21Vianet が運営する Microsoft 365 をご利用のお客様は、Worldwide バンドルを使用してください
- [Microsoft 365 Certificate Bundle - DoD/GCC High](https://www.microsoft.com/download/details.aspx?id=100934)

ダウンロード後、管理者権限でコマンド プロンプトを開き、以下のコマンドを実行します。パスとファイル名は、取得した実際の .p7b バンドルに合わせて更新してください:

```command
certutil -addstore Root "C:\path\to\m365_root_certs.p7b"
```

上記の「お使いのマシンに DigiCert Global Root G2 証明書がインストールされているか確認する」セクションで説明した PowerShell コマンドを実行して、インポートが正常に完了したことを確認してください。

#### 対応しないとどうなるか

DigiCert Global Root G2 ルート証明書をインストールせず、システムが古いルート証明書に依存して検証を行っている場合、2026 年 4 月 30 日以降、メール フローが中断される可能性があります。発生する具体的な問題は、オペレーティング システムとアプリケーションの構成によって異なります。以下にいくつかの例を示します:

Exchange Online がオンプレミスの Exchange Server に接続できない場合、Exchange Online 管理センターでメッセージ追跡を実行すると、以下のような内容が表示されることがあります:

> Reason: [{LED=450 4.4.317 Cannot establish session with remote server [Message=451 5.7.3 STARTTLS is required to send mail]

![受信側サーバーが証明書を信頼しない場合に Exchange Online のメッセージ追跡で表示される可能性があるエラー](Cert02.jpg)
オンプレミス環境から Exchange Online に接続しようとする場合にも、同様の問題が発生する可能性があります。オンプレミスのプロトコル ログには、以下のようなエラーが記録されます:

> 451 5.7.3 STARTTLS is required, 5.7.0 Must issue a STARTTLS command first

OpenSSL を使用して接続する場合 (例: Linux オペレーティング システムを実行しているマシンや、OpenSSL を利用するアプリケーション)、ローカル発行者を取得できません:

> OpenSSL s_client -starttls smtp -connect \<tenant>\.mail.protection.outlook.com:25 -showcerts

![Exchange Online に接続しようとしたときに証明書を信頼していない場合に (例えば) Linux システムで表示される可能性があるエラー](Cert03.jpg)

#### まとめ

このブログ記事に記載されている手順を **2026 年 4 月 30 日までに** 完了することが非常に重要です。これらの更新を実施しない場合、組織と Exchange Online 間のメール フローに重大な中断が発生する可能性があります。

必要な証明書がインストールされ、最新の状態であることを確認することで、お客様のシステムと Microsoft 365 間の安全で中断のない通信を維持できます。期限後のメール配信に関する潜在的な問題を回避するために、これらの対応を優先的に実施してください。

**備考** Exchange Online をご利用のお客様には、メッセージ センター (MC) にて MC1224565 として本件に関する投稿が公開されています。
