---
title: "2026 年 10 月の Exchange Server のセキュリティ更新プログラムが公開されました"
date: 2026-10-14 10:58
lastupdate: 2026-10-19
tags:
- Exchange
---
※ この記事は、[Released: October 2026 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-october-2026-exchange-server-security-updates/4563014) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #FFFF99; padding: .5em; margin: 1em 0 1em 0;"><strong>2026 年 10 月 16 日更新:</strong> 2026 年 10 月の Windows Server の更新プログラムのインストールと Exchange Server への影響については、<a href="/blog/exchange-servers-may-become-unstable-after-installation-of-october-2026-windows-updates/">「2026 年 10 月の Windows 更新プログラム適用後、Exchange サーバーが不安定になる可能性があります」</a>を参照してください。</p>

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています。

- [Exchange SE RTM](https://www.microsoft.com/en-us/download/details.aspx?id=108875)
- Exchange Server 2019 CU14 および CU15 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)への登録が必要)
- Exchange Server 2016 CU23 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)への登録が必要)

2026 年 10 月の SU は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスで発見された脆弱性に対応しています。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回の SU で対応された脆弱性について既に保護されているため、特別な対応は不要です。ただし、環境内に存在する Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションには、引き続き更新プログラムを適用してください。

特定の脆弱性 (CVE) の詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) を参照してください。Exchange SE については Product Family で "Server Software" を選択し、Exchange Server 2016 および 2019 については Product Family で "ESU" を選択してフィルターしてください。

### Exchange Server 2016 および 2019 向けの第 2 期 ESU プログラムが終了します

Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)してから 1 年が経過しました。2026 年 10 月は、[第 2 期 Extended Security Update (ESU) プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様が、Exchange Server 2016 および 2019 向けの新しいセキュリティ更新プログラムを受け取れる最後の月です。

2026 年 10 月以降:

- 更新プログラムは Exchange Server Subscription Edition (SE) 向けのみリリースされます。
- 更新プログラムのお知らせや MSRC が公開する CVE で、Exchange Server 2016 および 2019 に言及されなくなります。これは、これらのバージョンが今後のセキュリティ上の問題の影響を受けないという意味ではありません。Exchange Server 2016 および 2019 の脆弱性のテストは終了します。
- 第 2 期 ESU を購入できる期間はしばらく継続しますが、購入しても 2026 年 10 月のリリースまでのセキュリティ更新プログラムが適用された状態になります。

引き続き、[組織の Exchange SE へのアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)を進めてください。

### このリリースで解決された問題

- [公開済みの予定表 (.ics) を予定表アプリケーションで開くと HTTP 500 エラーが返される | Microsoft Support](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5126672)
- [韓国語の WordBreaker ルール ファイルが見つからず ContentEngine でデッドロックが発生する | Microsoft Support](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5130098)

### 更新プログラムのインストール

利用可能な更新パスは以下のとおりです。

![](October2026SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、必要な更新プログラムを特定するために Exchange サーバーのインベントリを作成してください。このスクリプトを実行すると、Exchange サーバーに CU、SU、手動対応の適用漏れがないか確認できます。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) で現在の CU と適用先の CU を選択し、手順を確認してください。
- セットアップ完了後、サーバーを再起動し、すべての Exchange サービスが正常に起動したことを確認してください。一部のサービスが無効状態の場合は、更新プログラムのインストールが中断されたことを示しています。詳細については、[この記事](https://learn.microsoft.com/troubleshoot/exchange/client-connectivity/exchange-security-update-issues#services-dont-start-after-su-installation)の「回避策 1」を参照してください。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[Exchange Server の累積更新プログラムとセキュリティ更新プログラムのインストール失敗を修復する方法](https://aka.ms/ExchangeFAQ)や、[Exchange Server の更新プログラムをインストールしようとしたときのファイル バージョン エラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も確認してください。

### よくあるご質問

**Exchange Online とのハイブリッド構成を使用しています。対応は必要ですか？**

Exchange Online は既に保護されていますが、管理目的のみで使用している場合も含め、Exchange サーバーにはこの SU をインストールする必要があります。SU のインストール後に認証証明書を変更した場合は、ハイブリッド構成ウィザードを再実行してください。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を適用する必要がありますか？**

SU は累積的です。SU でサポートされている CU を使用している場合、SU や HU を順番にすべてインストールする必要はありません。最新の SU をインストールしてください。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を参照してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか。「管理ツールのみ」がインストールされたマシンはどうなりますか？**

管理ツール クライアントとサーバーの互換性を確保するため、すべての Exchange Server、および Exchange 管理ツールを実行するすべてのサーバーとワークステーションに SU をインストールすることを推奨します。稼働中の Exchange サーバーがない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)を参照してください。

**Exchange の SU または HU をインストール済みで、Windows Server 2025 を使用しています。更新プログラムが一覧に表示されない場合、どのようにアンインストールすればよいですか？**

セキュリティ更新プログラムのアンインストールは推奨しません。詳細は、[Windows Server 2025 のコントロール パネルで Exchange のセキュリティ更新プログラムまたは修正プログラムを表示またはアンインストールできない場合](https://support.microsoft.com/servicing/office/can-t-view-or-uninstall-exchange-security-or-hotfix-updates-in-control-panel-on-windows-server-2025)を参照してください。

**Exchange Server 2016 および 2019 の第 2 期 ESU に登録していません。最新の Exchange Server 2016 または 2019 の更新プログラムを入手するにはどうすればよいですか？**

Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しているため、第 2 期 ESU プログラム (2026 年 5 月から 10 月まで有効) に登録しているお客様のみが、2026 年 5 月以降にリリースされた Exchange Server 2016 または 2019 の更新プログラムを入手できます。Exchange Server 2016 または 2019 を引き続き使用している場合は、できるだけ早く[組織を Exchange SE にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することを推奨します。

本記事の公開時点では、関連ドキュメントが完全には公開されていない場合があります。

この記事の更新内容:

- **2026 年 10 月 15 日:** 2026 年 10 月の Windows Server の更新プログラムにより Exchange Server で問題が発生する可能性があること (2026 年 10 月の Exchange SU のインストールは不要) を知らせるバナーを追加しました。
- **2026 年 10 月 16 日:** Exchange サーバーが影響を受けた場合の対応方法を説明する記事へのリンクをバナーに追加しました: [2026 年 10 月の Windows 更新プログラム適用後、Exchange サーバーが不安定になる可能性があります](/blog/exchange-servers-may-become-unstable-after-installation-of-october-2026-windows-updates/)。

この記事は今後更新される可能性があります。更新があった場合は、こちらに記載します (該当する場合)。
