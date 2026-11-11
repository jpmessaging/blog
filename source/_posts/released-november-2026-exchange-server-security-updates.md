---
title: "2026 年 11 月の Exchange Server セキュリティ更新プログラムが公開されました"
date: 2026-11-11 10:46
tags:
- Exchange
---
※ この記事は、[Released: November 2026 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-november-2026-exchange-server-security-updates/4570368) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品で見つかった脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)

以下の Exchange Server のバージョン向けに SU が提供されています。

- [Exchange SE RTM](https://www.microsoft.com/en-us/download/details.aspx?id=108908)

2026 年 11 月の SU は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスで発見された脆弱性に対応しています。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回の SU で対応された脆弱性から既に保護されているため、環境内の Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションを更新する以外の対応は不要です。

特定の脆弱性 (CVE) の詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) (Exchange SE については Product Family で "Server Software" を選択してフィルター) を参照してください。

### Exchange Server 2016 および 2019 の情報をお探しですか？

Exchange Server 2016 および 2019 はサポートが終了しているため、脆弱性の検証は行われず、更新プログラムもリリースされません。これらのバージョンを使用している場合、恒久的に脆弱な状態にあるものとして、直ちに[組織を Exchange Server Subscription Edition (SE) にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)してください。

### 解決された問題

- [2026 年 10 月の Windows 更新プログラム適用後、Exchange サーバーが不安定になる可能性があります](/blog/exchange-servers-may-become-unstable-after-installation-of-october-2026-windows-updates/)。任意のバージョンの Exchange が 2026 年 10 月の Windows Server 更新プログラムのインストール後に不安定になる可能性がある問題に対処するには、Windows Server の 2026 年 11 月の更新プログラムをインストールしてください。10 月の問題に対処するためにレジストリ キーを作成した場合、そのまま残しておいて問題ありませんが、11 月の Windows Server 更新プログラムをインストールすれば、このキーは不要です。2026 年 11 月の Exchange Server と Windows Server の更新プログラムをインストールする順序は問いません。

### 更新プログラムのインストール

利用可能な更新パスは以下のとおりです。

![](November2026SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して Exchange サーバーのインベントリを作成し、必要な更新プログラムを確認してください。このスクリプトを実行すると、CU、SU、手動対応の適用漏れがある Exchange サーバーを確認できます。
- セットアップ完了後、サーバーを再起動し、すべての Exchange サービスが正常に起動したことを確認してください。一部のサービスが無効状態の場合は、更新プログラムのインストールが何らかの理由で中断されたことを示しています。詳細については、[この記事](https://learn.microsoft.com/troubleshoot/exchange/client-connectivity/exchange-security-update-issues#services-dont-start-after-su-installation)の「回避策 1」を参照してください。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に正常に動作しない場合は、[失敗した Exchange 累積更新プログラムおよびセキュリティ更新プログラムのインストールを修復する方法](https://aka.ms/ExchangeFAQ)を参照してください。また、[Exchange Server の更新プログラムをインストールしようとしたときに発生するファイル バージョン エラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も参照してください。

### よくあるご質問

**組織は Exchange Online とのハイブリッド モードです。何か対応が必要ですか？**<br />
Exchange Online は既に保護されていますが、管理目的のみで使用している場合も含め、Exchange サーバーにはこの SU をインストールする必要があります。SU のインストール後に認証証明書を変更した場合は、ハイブリッド構成ウィザードを再実行してください。

**最後にインストールした SU/HU は数か月前のものです。最新の SU をインストールするために、すべての SU をインストールする必要がありますか？**<br />
SU は累積的です。SU でサポートされている CU を実行している場合、SU や HU を順番にすべてインストールする必要はありません。最新の SU をインストールしてください。詳細については、[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を参照してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？「Exchange 管理ツールのみ」がインストールされたマシンはどうなりますか？**<br />
管理ツール クライアントとサーバー間の互換性を確保するため、すべての Exchange Server、および Exchange 管理ツールを実行しているすべてのサーバーとワークステーションに SU をインストールすることを推奨します。稼働中の Exchange Server がない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)を参照してください。

**Exchange SU または HU をインストール済みで、Windows Server 2025 を実行しています。Windows Server 2025 では更新プログラムが一覧に表示されません。どのようにアンインストールできますか？**<br />
セキュリティ更新プログラムのアンインストールは推奨しません。詳細については、[Windows Server 2025 のコントロール パネルで Exchange のセキュリティ更新プログラムまたは修正プログラムを表示またはアンインストールできない場合](https://support.microsoft.com/servicing/office/can-t-view-or-uninstall-exchange-security-or-hotfix-updates-in-control-panel-on-windows-server-2025)を参照してください。

**組織では引き続き Exchange Server 2016 または 2019 を使用しています。2026 年 10 月以降、これらのバージョンの更新プログラムや脆弱性に関する記載がありません。脆弱性はないということでしょうか？**<br />
Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しており、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)も終了しました。このため、脆弱性の検証は行われず、更新プログラムもリリースされません。これらのバージョンを使用している場合、恒久的に脆弱な状態にあるものとして、直ちに[組織を Exchange Server SE にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)してください。

本記事の公開時点では、関連ドキュメントが完全には公開されていない場合があります。

この記事は今後更新される可能性があります。更新があった場合は、こちらに記載します (該当する場合)。

Exchange Server チーム
