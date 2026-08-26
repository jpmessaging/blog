---
title: "2026 年 8 月の Exchange Server のセキュリティ更新プログラムが公開されました"
date: 2026-08-12
lastupdate: 2026-08-26
tags:
- Exchange
---
※ この記事は、[Released: August 2026 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-august-2026-exchange-server-security-updates/4543951) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています。

- [Exchange SE RTM](https://www.microsoft.com/download/details.aspx?id=108785)
- Exchange Server 2019 CU14 および CU15 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/) の登録が必要)
- Exchange Server 2016 CU23 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/) の登録が必要)

2026 年 8 月のセキュリティ更新プログラム (SU) は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスによって発見された脆弱性に対応しています。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回のセキュリティ更新プログラムで対応された脆弱性について既に保護されているため、特別な対応は不要です。ただし、環境内に存在する Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションについては、引き続き更新プログラムを適用してください。

特定の脆弱性 (CVE) に関する詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) (Exchange SE については Product Family で "Server Software" を選択し、Exchange Server 2016 および 2019 については Product Family で "ESU" を選択してフィルター) を参照してください。

### この更新プログラム以降、OWA Light は無効になります

数週間前にお知らせしたとおり、この更新プログラム (および今後の更新プログラム) を Exchange サーバーにインストールすると、OWA Light クライアントは恒久的に無効になります。詳細については、関連する [CVE-2026-62914](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-62914) を参照してください。

2026 年 8 月以降の更新プログラムをインストールできない場合は、この CVE に対処するため、[Exchange サーバーで OWA Light を無効にしてください](/blog/upcoming-retirement-of-owa-light-in-exchange-server/)。

### Exchange Server 2016 および 2019 の更新プログラムは第 2 期 ESU プログラムでのみ提供されています

Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しています。2026 年 5 月から 10 月までの間にリリースされる Exchange Server 2016 および 2019 のセキュリティ更新プログラムを入手できるのは、[第 2 期 Extended Security Update (ESU) プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様のみです。

第 2 期 ESU プログラムに参加していない場合は、[Exchange Server Subscription Edition (SE) に移行](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)して、最新のセキュリティ更新プログラムを引き続き受け取ってください。

*既に第 2 期 ESU を購入済みで*、最新のセキュリティ更新プログラムへのアクセスに関する情報が必要な場合は、[ExchangeandSfBServerESUInquiry@service.microsoft.com](mailto:ExchangeandSfBServerESUInquiry@service.microsoft.com?subject=We%20purchased%20Exchange%20ESU%20need%20access) にメールを送信してお問い合わせください。

### このリリースの既知の問題

- [Wrapper messages appear in shared mailbox inbox in hybrid environments | Microsoft Support](https://support.microsoft.com/servicing/exchange/server/hotfix/2026/5105719) - 今後の更新プログラムで対応予定です。
- 複数の Exchange Server で構成され、受信 MRS 接続をプロキシするフロントエンド サーバーと、メールボックスをホストするバックエンド サーバーが異なる環境で、バックエンド サーバーには 2026 年 8 月の SU がインストールされているものの、フロントエンド サーバーが以前のバージョンのままである場合、MRS 移行が `TooManyTransientFailureRetriesPermanentException` エラーで失敗することがあります。この問題は、`Test-MigrationServerAvailability` を含むすべての MRS 要求で発生する可能性があります。フロントエンド サーバーに 2026 年 8 月の SU をインストールすると、この問題は解決する見込みです。
- 2026 年 8 月の SU をインストールすると、匿名で公開された Exchange カレンダーの購読内容が更新されなくなります。購読に使用しているアプリケーションではサーバー エラーが報告され、URL は HTTP 500 エラーを返します。同じ公開カレンダーの URL を Web ブラウザーで開くと、通常どおりカレンダーが表示されます。回避策として、購読時に `.ics` リンクへ `?layout=premium` を追加してください (URL の末尾は `calendar.ics?layout=premium` のようになります)。

### 更新プログラムのインストール

利用可能な更新パスは以下のとおりです。

![](August2026SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、更新が必要な Exchange サーバーのインベントリを作成し、各サーバーの更新状況 (CU、SU、手動対応) を確認してください。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) を利用して、現在の CU と目標 CU を選択し、手順を確認してください。
- 更新プログラムのインストール後に再度 Health Checker を実行し、追加の対応が必要かどうかを確認します。
- セットアップ完了後、サーバーを再起動し、すべての Exchange サービスが正常に起動したことを確認します。一部のサービスが無効状態になっている場合は、更新プログラムのインストールが何らかの理由で中断されたことを示しています。詳細については、[この記事](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)の「回避策 1」を参照してください。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[失敗した Exchange Server の更新プログラムの修復方法](https://aka.ms/ExchangeFAQ)や、[Exchange Server の更新プログラムをインストールしようとしたときのファイル バージョン エラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も確認してください。

### よくあるご質問

**Exchange Online とのハイブリッド構成を使用しています。対応は必要ですか？**  
Exchange Online は既に保護されていますが、管理目的のみで利用している場合も含め、Exchange サーバーには今回のセキュリティ更新プログラム (SU) を必ずインストールしてください。SU のインストール後に認証証明書を変更する場合は、ハイブリッド構成ウィザードを再実行する必要があります。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を順番に適用する必要がありますか？**  
すべての SU は累積的です。SU でサポートされている CU を使用している場合、すべての SU や HU を順番にインストールする必要はなく、最新の SU を適用するだけで問題ありません。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を確認してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？「Exchange 管理ツールのみ」がインストールされたマシンはどうなりますか？**  
<u>すべて</u>の Exchange Server、および Exchange 管理ツールがインストールされたすべてのサーバーとワークステーションに SU を適用することを推奨します。これにより、管理ツールのクライアントとサーバー間の互換性が確保されます。稼働中の Exchange Server が存在しない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)を確認してください。

**Exchange Server 2016 および 2019 の第 2 期 ESU に登録していません。現在の Exchange Server 2016 または 2019 の更新プログラムを入手するにはどうすればよいですか？**  
Exchange Server 2016 および 2019 は現在[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しているため、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様 (2026 年 5 月から 10 月まで有効) のみが、2026 年 5 月以降にリリースされる Exchange Server 2016 または 2019 の更新プログラムを入手できます。Exchange Server 2016 または 2019 を引き続き利用している場合は、できるだけ早く [Exchange SE にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することを推奨します。

<p style="background: #f0f0f0">本記事公開時点では、関連するドキュメントが完全には利用できない場合があります。</p>

**この記事の重要な更新:**

- 2026 年 8 月 25 日: 2026 年 8 月の SU のインストール後に匿名で公開されたカレンダーが更新されなくなる既知の問題と、その回避策を追加しました。
- 2026 年 8 月 24 日: すべてのサーバーに 2026 年 8 月の更新プログラムがまだ適用されていない場合に MRS 移行で発生する可能性がある既知の問題を追加しました。