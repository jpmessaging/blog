---
title: "2026 年 9 月の Exchange Server V2 セキュリティ更新プログラムが公開されました"
date: 2026-10-05 17:15
tags:
- Exchange
---
※ この記事は、[Released: September 2026 V2 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-september-2026-v2-exchange-server-security-updates/4561718) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています。

- [Exchange SE RTM](https://www.microsoft.com/en-us/download/details.aspx?id=108855)
- Exchange Server 2019 CU14 および CU15 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)への登録が必要)
- Exchange Server 2016 CU23 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)への登録が必要)

2026 年 9 月の V2 セキュリティ更新プログラム (SU) は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスによって発見された脆弱性に対応しています。

2026 年 9 月の最初のセキュリティ更新プログラムからの変更点は、[CVE-2026-96940](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-96940) が追加されたことです。詳細については、ダウンロード ページの KB 記事を参照してください。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回の SU で対応された脆弱性について既に保護されているため、特別な対応は不要です。ただし、環境内にある Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションは更新してください。

特定の脆弱性 (CVE) に関する詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) (Exchange SE については Product Family で "Server Software" を、Exchange Server 2016 および 2019 については "ESU" を選択してフィルター) を参照してください。

### Exchange Server 2016 および 2019 の更新プログラムは第 2 期 ESU プログラムでのみ提供されています

Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しています。2026 年 5 月から 10 月までにリリースされる Exchange Server 2016 および 2019 のセキュリティ更新プログラムを入手できるのは、[第 2 期 Extended Security Update (ESU) プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様のみです。

第 2 期 ESU プログラムに参加していない場合は、[Exchange Server Subscription Edition (SE) に移行](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)して、最新のセキュリティ更新プログラムを引き続き受け取ってください。

*既に第 2 期 ESU を購入済みで*、最新の SU へのアクセス方法を確認したい場合は、[ExchangeandSfBServerESUInquiry@service.microsoft.com](mailto:ExchangeandSfBServerESUInquiry@service.microsoft.com?subject=We%20purchased%20Exchange%20ESU%20need%20access) にメールでお問い合わせください。

### このリリースの既知の問題

- [公開済みの予定表 (.ics) を予定表アプリケーションで開くと HTTP 500 エラーが返される | Microsoft Support](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5126672) - 今後の更新プログラムで修正予定です。
- [韓国語の WordBreaker ルール ファイルが見つからず ContentEngine でデッドロックが発生する | Microsoft Support](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5130098) - 韓国語のメールを利用する環境に影響する問題で、今後の更新プログラムで対応予定です。

### このリリースで解決された問題

- [ハイブリッド環境の共有メールボックスの受信トレイにラッパー メッセージが表示される | Microsoft Support](https://support.microsoft.com/en-us/servicing/exchange/server/hotfix/2026/5105719)
- [Graph API のみを使用する Exchange ハイブリッド展開で、代理人のメールボックスの空き時間情報を取得できない | Microsoft Support](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5127092)

### 更新プログラムのインストール

利用可能な更新パスは以下のとおりです。

![](Sep2026V2SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、更新が必要な Exchange サーバーのインベントリを作成し、各サーバーの更新状況 (CU、SU、手動対応) を確認してください。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) で現在の CU と目標 CU を選択し、手順を確認してください。
- セットアップ完了後、サーバーを再起動し、すべての Exchange サービスが正常に起動したことを確認してください。一部のサービスが無効状態になっている場合は、更新プログラムのインストールが中断されたことを示しています。詳細については、[この記事](https://learn.microsoft.com/troubleshoot/exchange/client-connectivity/exchange-security-update-issues#services-dont-start-after-su-installation)の「回避策 1」を参照してください。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[失敗した Exchange Server の累積更新プログラムとセキュリティ更新プログラムのインストールを修復する方法](https://aka.ms/ExchangeFAQ)や、[Exchange Server の更新プログラムをインストールしようとしたときのファイル バージョン エラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も確認してください。

### よくあるご質問

**Exchange Online とのハイブリッド構成を使用しています。対応は必要ですか？**  
Exchange Online は既に保護されていますが、管理目的のみで利用している場合も含め、Exchange サーバーには今回の SU を必ずインストールしてください。SU のインストール後に認証証明書を変更する場合は、ハイブリッド構成ウィザードを再実行する必要があります。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を順番に適用する必要がありますか？**  
すべての SU は累積的です。SU でサポートされている CU を使用している場合、すべての SU や HU を順番にインストールする必要はなく、最新の SU を適用するだけで問題ありません。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を確認してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？「Exchange 管理ツールのみ」がインストールされたマシンはどうなりますか？**  
すべての Exchange Server、および Exchange 管理ツールがインストールされたすべてのサーバーとワークステーションに SU を適用することを推奨します。これにより、管理ツールのクライアントとサーバー間の互換性が確保されます。稼働中の Exchange Server が存在しない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)を確認してください。

**Windows Server 2025 環境で Exchange の SU または HU をインストールしましたが、Windows Server 2025 では更新プログラム一覧に表示されません。どのようにアンインストールすればよいですか？**  
セキュリティ更新プログラムのアンインストールは推奨していません。必要な場合は、[Windows Server 2025 のコントロール パネルで Exchange のセキュリティ更新プログラムまたは修正プログラムを表示またはアンインストールできない | Microsoft Support](https://support.microsoft.com/en-us/servicing/office/can-t-view-or-uninstall-exchange-security-or-hotfix-updates-in-control-panel-on-windows-server-2025)を参照してください。

**Exchange Server 2016 および 2019 の第 2 期 ESU に登録していません。現在の Exchange Server 2016 または 2019 の更新プログラムを入手するにはどうすればよいですか？**  
Exchange Server 2016 および 2019 は現在[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しているため、2026 年 5 月以降にリリースされる Exchange Server 2016 または 2019 の更新プログラムを入手できるのは、2026 年 5 月から 10 月まで有効な[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様のみです。Exchange Server 2016 または 2019 を引き続き利用している場合は、できるだけ早く[Exchange SE にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することを推奨します。

**この更新プログラムのリリース時期が通常と異なるのはなぜですか？**  
CVE-2026-96940 を追加した今回の更新プログラムは、予定より前倒しで公開されました。展開ガイダンスを確認し、できるだけ早く更新プログラムを適用することを推奨します。

この脆弱性は内部で発見されており、現時点で悪用は確認されていません。

追加の更新プログラムについては、通常のセキュリティ更新プログラムのチャネルを参照してください。

<p style="background: #f0f0f0">本記事公開時点では、関連するドキュメントが完全には利用できない場合があります。</p>

この記事は今後更新される可能性があります。更新があった場合は、こちらに記載します。
