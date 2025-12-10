---
title: "2025 年 12 月の Exchange Server のセキュリティ更新プログラムが公開されました"
date: 2025/12/10
lastupdate: 2025/12/10
tags:
- Exchange
---
※ この記事は、[Released: December 2025 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-december-2025-exchange-server-security-updates/4474949) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています。

- Exchange SE [RTM](http://www.microsoft.com/download/details.aspx?id=108493)
- Exchange Server 2019 CU14 and CU15 (アクセスするには、[ESU プログラム](https://jpmessaging.github.io/blog/announcing-exchange-2016--2019-extended-security-update-program/)の登録が必要)
- Exchange Server 2016 CU23 (アクセスするには、[ESU プログラム](https://jpmessaging.github.io/blog/announcing-exchange-2016--2019-extended-security-update-program/)の登録が必要)

2025 年 12 月のセキュリティ更新プログラム（SU）は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスによって発見された脆弱性に対応しています。現時点でこれらの脆弱性を悪用した攻撃は確認されていませんが、環境を保護するため、できるだけ早くこれらの更新プログラムを適用することを推奨します。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回のセキュリティ更新プログラムで対応された脆弱性について既に保護されていますので、特別な対応は不要です。ただし、環境内に存在する Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションについては、引き続き更新プログラムの適用を行ってください。

特定の脆弱性 (CVE) に関する詳細は、[Security Update Guide](https://msrc.security.microsoft.com/update-guide/) (Exchange SE については Product Family で "Server Software" でフィルター、Exchange Server 2016 および 2019 については Product Family で "ESU" でフィルター) を参照してください。

### 解決済み: ハイブリッド専用アプリ有効化後の Skype for Business 統合の問題
この更新プログラムは、[Exchange ハイブリッド専用アプリ](https://jpmessaging.github.io/blog/exchange-server-security-changes-for-hybrid-deployments/)を有効にした後に発生する Exchange Server と Skype for Business Server 間の統合に影響する問題を解決します。この問題の影響を受けている場合は、[KB 記事](https://support.microsoft.com/topic/b6614f37-c49f-456c-b073-da2da8d3a0b2) に記載されている情報を確認してください。

### Exchange 2016 および 2019 の更新プログラムは ESU プログラムで*のみ*提供されています

Exchange Server 2016 および 2019 は[サポートが終了](https://jpmessaging.github.io/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しています。

[拡張セキュリティ更新プログラム (ESU) プログラム](https://jpmessaging.github.io/blog/announcing-exchange-2016--2019-extended-security-update-program/)に登録しているお客様は、Exchange Server 2016 および 2019 向けの 2025 年 12 月およびそれ以降のセキュリティ更新プログラムを受け取ることができます。

ESU プログラムに登録していない場合は、[Exchange Server SE に移行](https://jpmessaging.github.io/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)して、最新のセキュリティ更新プログラムを引き続き受け取ることができます。

*既に ESU を購入済みで*、最新のセキュリティ更新プログラムへのアクセスに関する情報が必要な場合（アカウント チームから情報を受け取っていない場合）は、[ExchangeandSfBServerESUInquiry@service.microsoft.com](mailto:ExchangeandSfBServerESUInquiry@service.microsoft.com?subject=We%20purchased%20Exchange%20ESU%20need%20access) にメールを送信してお問い合わせください。ESU の購入については製品のサポート チームより*サポートできません*ので、アカウント チームにお問い合わせください。

### 更新プログラムのインストール

利用可能な更新パスは以下の通りです。
![](Dec2025SU.jpg)
- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、更新が必要な Exchange サーバーのインベントリを作成し、各サーバーの更新状況 (CU、SU、手動対応) を確認してください。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) を利用して、現在の CU と目標 CU を選択し、手順を確認してください。
- 更新プログラムのインストール後に再度 Health Checker を実行し、追加の対応が必要かどうかを確認します。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[失敗した Exchange Server の更新プログラムの修復方法](https://aka.ms/ExchangeFAQ)や、[ファイル バージョン エラーに関する KB 記事](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も確認してください。

### よくあるご質問

**弊社の環境は Exchange Online とのハイブリッド構成ですが、対応は必要ですか？**  
Exchange Online は既に保護されていますが、管理目的のみで利用している場合も含め、オンプレミスの Exchange サーバーには今回のセキュリティ更新プログラム (SU) を必ずインストールしてください。SU 適用後に認証証明書を変更する場合は、ハイブリッド構成ウィザードを再実行する必要があります。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を順番に適用する必要がありますか？**  
すべての SU は累積的です。サポートされている CU を使用している場合、すべての SU や HU を順番にインストールする必要はなく、最新の SU を適用するだけで問題ありません。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を確認してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？"Exchange 管理ツールのみ" インストールされたマシンはどうなりますか？**  
<u>すべて</u>の Exchange Server および Exchange 管理ツールがインストールされたすべてのサーバー / ワークステーションに SU を適用することを推奨します。これにより、管理ツールのクライアントとサーバー間の互換性が確保されます。稼働中の Exchange Server が存在しない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)をご参照ください。 

**弊社は Exchange 2016 および 2019 の ESU を登録していません。現在の Exchange 2016 または 2019 の更新プログラムを入手するにはどうすればよいですか？**  
Exchange 2016 および 2019 は現在[サポートが終了](https://jpmessaging.github.io/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しているため、[ESU プログラムに登録](https://jpmessaging.github.io/blog/announcing-exchange-2016--2019-extended-security-update-program/)しているお客様（2026 年 4 月まで有効）のみが、ESU 対象としてリリースされる Exchange 2016 または 2019 の更新プログラムを入手できます。Exchange 2016 または 2019 を引き続き利用しているすべてのお客様には、できるだけ早く [Exchange Server SE に移行](https://jpmessaging.github.io/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することを推奨します。

本記事公開時点では、関連するドキュメントが完全には利用できない場合があります。

今後、記事内容に更新があった場合は、こちらに追記します。