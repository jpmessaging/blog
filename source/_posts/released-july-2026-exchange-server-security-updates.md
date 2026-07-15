---
title: "2026 年 7 月の Exchange Server のセキュリティ更新プログラムが公開されました"
date: 2026-07-15 15:00:00
tags:
- Exchange
---
※ この記事は、[Released: July 2026 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-july-2026-exchange-server-security-updates/4534146) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています。

- [Exchange SE RTM](https://www.microsoft.com/download/details.aspx?id=108746)
- Exchange Server 2019 CU14 および CU15 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)の登録が必要)
- Exchange Server 2016 CU23 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)の登録が必要)

2026 年 7 月のセキュリティ更新プログラム (SU) は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスによって発見された脆弱性に対応しています。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回のセキュリティ更新プログラムで対応された脆弱性について既に保護されていますので、特別な対応は不要です。ただし、環境内に存在する Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションについては、引き続き更新プログラムの適用を行ってください。

特定の脆弱性 (CVE) に関する詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) (Exchange SE については Product Family で "Server Software" でフィルター、Exchange Server 2016 および 2019 については Product Family で "ESU" でフィルター) を参照してください。

### レガシー Exchange セキュリティ グループの存在確認

今回の 2026 年 7 月の SU リリースと直接関係ありませんが、[Exchange Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)で、非常に古く既に非推奨となっている Exchange Server のセキュリティ グループである **Exchange Domain Servers** と **Exchange Enterprise Servers** の存在有無も確認できるようになりました。これらのグループは Exchange Server 2007 以降で非推奨となっており、現在は使用されるべきではありません。また、最新の Exchange セキュリティ グループよりも広範な権限を持つ可能性があるため、存在する場合は削除することを推奨します。関連ドキュメントは[こちら](https://learn.microsoft.com/previous-versions/office/exchange-server-2010/gg576862%28v=exchg.141%29)を参照してください。

また、既にオンプレミスの Exchange Server をすべて廃止している環境についても、これらのグループが残っていないか確認し、存在する場合は削除することで、不正利用のリスク低減につながります。さらに、オンプレミスの Exchange Server を完全に廃止している環境では、これらのグループの削除に加え、関連する Active Directory オブジェクトのクリーンアップも実施することをお勧めします。詳細は、[こちらの記事](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#active-directory-clean-up) を確認してください。

### CVE-2026-42897 の緩和策の削除について

2026 年 7 月の更新プログラムをインストールしても、既に適用済みの CVE-2026-42897 緩和策は自動的には削除されません。そのため、7 月の SU をインストールした後は、適用方法に応じて以下の対応を実施してください。

**Exchange Emergency Mitigation (EM) Service を使用して緩和策を適用していた場合:**

注: 2026 年 7 月の更新プログラムを、CVE-2026-42897 の緩和策が不要なビルドとして扱うための EM Service 側の変更は、現在展開中であり、展開完了予定日は 2026 年 7 月 16 日です。
この更新が完了するまでは、EM Service により緩和策が再適用されます。

- [緩和策 M2.1.0 の IIS ルールを削除](https://learn.microsoft.com/Exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-emergency-mitigation-service#rollback-procedures-for-released-mitigations)します。

**ダウンロード可能な EOMT スクリプト [https://aka.ms/UnifiedEOMT](https://aka.ms/UnifiedEOMT) を使用して緩和策を適用していた場合:**

- [緩和策をロール バック](https://microsoft.github.io/CSS-Exchange/Security/EOMT/#roll-back-a-mitigation)します。

### Exchange 2016 および 2019 の更新プログラムは第 2 期 ESU プログラムでのみ提供されています

Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しています。2026 年 5 月から 10 月までの間にリリースされる Exchange Server 2016 および 2019 のセキュリティ更新プログラムを入手できるのは、[第 2 期 Extended Security Update (ESU) プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様のみです。

第 2 期 ESU プログラムに参加していない場合は、[Exchange Server Subscription Edition (SE) に移行](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)して、最新のセキュリティ更新プログラムを引き続き受け取ってください。

*既に第 2 期 ESU を購入済みで*、最新のセキュリティ更新プログラムへのアクセスに関する情報が必要な場合は、[ExchangeandSfBServerESUInquiry@service.microsoft.com](mailto:ExchangeandSfBServerESUInquiry@service.microsoft.com?subject=We%20purchased%20Exchange%20ESU%20need%20access) にメールを送信してお問い合わせください。

### このリリースの既知の問題

- [Wrapper messages appear in shared mailbox inbox in hybrid environments | Microsoft Support](https://support.microsoft.com/servicing/exchange/server/hotfix/2026/5105719)

### 更新プログラムのインストール

利用可能な更新パスは以下の通りです。

![](July2026SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、更新が必要な Exchange サーバーのインベントリを作成し、各サーバーの更新状況 (CU、SU、手動対応) を確認してください。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) を利用して、現在の CU と目標 CU を選択し、手順を確認してください。
- 更新プログラムのインストール後に再度 Health Checker を実行し、追加の対応が必要かどうかを確認します。
- セットアップ完了後、サーバーを再起動し、すべての Exchange サービスが正常に起動したことを確認します。一部のサービスが無効状態になっている場合は、更新プログラムのインストールが何らかの理由で中断されたことを示しています。詳細については、[この記事](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)の「回避策 1」を参照してください。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[失敗した Exchange Server の更新プログラムの修復方法](https://aka.ms/ExchangeFAQ)や、[Exchange Server の更新プログラムをインストールしようとしたときのファイル バージョン エラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も確認してください。

### よくあるご質問

**CVE-2026-42897 の緩和策がリリースされたとき、いくつかの既知の問題が報告されていました。この更新プログラムではそれらは解決されていますか？**  
はい。2026 年 7 月の SU をインストールし、<u>緩和策を削除すると</u>、緩和策による既知の問題も解決されます。

**一部のサーバーを更新したものの、他のサーバーを更新できない場合、更新できないサーバーでは CVE-2026-42897 の緩和策を有効にしたままにできますか？更新済みのサーバーと、緩和策を利用したままのサーバーが混在していても問題ありませんか？**  
2026 年 7 月の SU 以降に更新できないサーバーでは、緩和策を引き続き利用できます。ただし、そのサーバーでは緩和策による既知の問題も引き続き発生します。また、この更新プログラムを適用した後、組織内のすべての Exchange サーバーが更新されるまで、Office Online Server (OOS) と Exchange Server の統合が期待通りに機能しない場合があります。

**弊社の環境は Exchange Online とのハイブリッド構成ですが、対応は必要ですか？**  
Exchange Online は既に保護されていますが、管理目的のみで利用している場合も含め、オンプレミスの Exchange サーバーには今回のセキュリティ更新プログラム (SU) を必ずインストールしてください。SU 適用後に認証証明書を変更する場合は、ハイブリッド構成ウィザードを再実行する必要があります。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を順番に適用する必要がありますか？**  
すべての SU は累積的です。サポートされている CU を使用している場合、すべての SU や HU を順番にインストールする必要はなく、最新の SU を適用するだけで問題ありません。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を確認してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？"Exchange 管理ツールのみ" インストールされたマシンはどうなりますか？**  
<u>すべて</u>の Exchange Server および Exchange 管理ツールがインストールされたすべてのサーバー / ワークステーションに SU を適用することを推奨します。これにより、管理ツールのクライアントとサーバー間の互換性が確保されます。稼働中の Exchange Server が存在しない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)を確認してください。

**弊社は Exchange 2016 および 2019 の第 2 期 ESU を登録していません。現在の Exchange 2016 または 2019 の更新プログラムを入手するにはどうすればよいですか？**  
Exchange 2016 および 2019 は現在[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しているため、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様 (2026 年 5 月から 10 月まで有効) のみが、2026 年 5 月以降にリリースされる Exchange 2016 または 2019 の更新プログラムを入手できます。Exchange 2016 または 2019 を引き続き利用しているすべてのお客様には、できるだけ早く [Exchange SE にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することを推奨します。

<p style="background: #f0f0f0">本記事公開時点では、関連するドキュメントが完全には利用できない場合があります。</p>

この記事は今後更新される可能性があります。更新があればここに記載します。