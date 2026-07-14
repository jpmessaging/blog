---
title: "2026 年 6 月の Exchange Server のセキュリティ更新プログラムが公開されました"
date: 2026/6/10
lastupdate: 2026/7/13
tags:
- Exchange
---
※ この記事は、[Released: June 2026 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-june-2026-exchange-server-security-updates/4524491) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています。

- [Exchange SE RTM](https://www.microsoft.com/download/details.aspx?id=108698)
- Exchange Server 2019 CU14 および CU15 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)の登録が必要)
- Exchange Server 2016 CU23 (アクセスするには、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)の登録が必要)

2026 年 6 月のセキュリティ更新プログラム (SU) は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスによって発見された脆弱性に加え、以前お知らせした [CVE-2026-42897](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-42897) ([Exchange Server の 2026 年 5 月の脆弱性 CVE-2026-42897 への対処](/blog/addressing-exchange-server-may-2026-vulnerability-cve-2026-42897/)) に対応しています。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回のセキュリティ更新プログラムで対応された脆弱性について既に保護されていますので、特別な対応は不要です。ただし、環境内に存在する Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションについては、引き続き更新プログラムの適用を行ってください。

特定の脆弱性 (CVE) に関する詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) (Exchange SE については Product Family で "Server Software" でフィルター、Exchange Server 2016 および 2019 については Product Family で "ESU" でフィルター) を参照してください。

### Exchange Emergency Mitigation (EM) と Feature Flighting サービスの継続利用に必要な更新

サービス側の変更により、Exchange を 2026 年 6 月の更新プログラム以降に更新していない場合、[Exchange Emergency Mitigation (EM)](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-emergency-mitigation-service) と [Exchange Flighting](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/feature-flighting) サービスは、2026 年 7 月以降にリリースされる構成ファイルを利用できなくなります。既にダウンロードされ適用済みの緩和策は引き続き機能しますが、更新プログラムをインストールしない限り、2026 年 7 月以降に新しい緩和策を利用できません。

詳細は、[Exchange mitigation and flighting services fail due to "Unknown Issuer" error](https://support.microsoft.com/topic/e2d8ccf3-209f-4056-845e-07d3e4a28646) を参照してください。

### インストール後の CVE-2026-42897 緩和策

セキュリティ強化と環境全体の防御力向上に向けた継続的な取り組みの一環として、クロスサイト スクリプティング攻撃への保護を引き続き強化しています。CVE-2026-42897 の緩和策は有効なままにしておくことを推奨します。この緩和策は追加の防御層となり、さらなる改善がリリースされるまで継続的な保護を確保するのに役立ちます。追加情報は、提供可能になり次第お知らせします。

2026 年 6 月の更新プログラムをインストールしても、既に適用済みの CVE-2026-42897 緩和策は自動的には削除されません。そのため、インストール後に緩和策を削除する場合は、以下の対応を行ってください。

**Exchange Emergency Mitigation (EM) Service を使用して緩和策を適用していた場合:**

1. [緩和策 M2.1.0 の再適用をブロック](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-emergency-mitigation-service#blocking-or-removing-mitigations)します。CVE-2026-42897 の緩和策を有効なままにしておくことを推奨しているため、2026 年 6 月の SU に更新済みのサーバーに緩和策が適用されないようにする変更は、現時点ではまだ行っていません。そのため、まず緩和策が再適用されないようにブロックする必要があります。
2. [緩和策 M2 の IIS ルールを削除](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-emergency-mitigation-service#rollback-procedures-for-released-mitigations)します。

**ダウンロード可能な EOMT スクリプト [https://aka.ms/UnifiedEOMT](https://aka.ms/UnifiedEOMT) を使用して緩和策を適用していた場合:**

1. [緩和策をロール バック](https://microsoft.github.io/CSS-Exchange/Security/EOMT/#roll-back-a-mitigation)します。

### Exchange 2016 および 2019 の更新プログラムは第 2 期 ESU プログラムでのみ提供されています

Exchange Server 2016 および 2019 は[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しています。2026 年 5 月から 10 月までの間にリリースされる Exchange Server 2016 および 2019 のセキュリティ更新プログラムを入手できるのは、[第 2 期 Extended Security Update (ESU) プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様のみです。

第 2 期 ESU プログラムに参加していない場合は、[Exchange Server Subscription Edition (SE) に移行](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)して、最新のセキュリティ更新プログラムを引き続き受け取ってください。

*既に第 2 期 ESU を購入済みで*、最新のセキュリティ更新プログラムへのアクセスに関する情報が必要な場合は、[ExchangeandSfBServerESUInquiry@service.microsoft.com](mailto:ExchangeandSfBServerESUInquiry@service.microsoft.com?subject=We%20purchased%20Exchange%20ESU%20need%20access) にメールを送信してお問い合わせください。

### このリリースに関する既知の問題点

- [Wrapper messages appear in shared mailbox in hybrid environments after installing the June 2026 Security Update | Microsoft Support](https://support.microsoft.com/servicing/exchange/server/hotfix/2026/5105719)

### 更新プログラムのインストール

利用可能な更新パスは以下の通りです。
![](June2026SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、更新が必要な Exchange サーバーのインベントリを作成し、各サーバーの更新状況 (CU、SU、手動対応) を確認してください。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) を利用して、現在の CU と目標 CU を選択し、手順を確認してください。
- 更新プログラムのインストール後に再度 Health Checker を実行し、追加の対応が必要かどうかを確認します。
- セットアップ完了後、サーバーを再起動し、すべての Exchange サービスが正常に起動したことを確認します。一部のサービスが無効状態になっている場合は、更新プログラムのインストールが何らかの理由で中断されたことを示しています。詳細については、[この記事](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)の「回避策 1」を参照してください。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[失敗した Exchange Server の更新プログラムの修復方法](https://aka.ms/ExchangeFAQ)や、[Exchange Server の更新プログラムをインストールしようとしたときのファイル バージョン エラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)も確認してください。

### よくあるご質問

**CVE-2026-42897 の緩和策がリリースされたとき、いくつかの既知の問題が報告されていました。CVE-2026-42897 の修正 (2026 年 6 月 SU) では、それらは解決されていますか？**  
はい。2026 年 6 月の SU をインストールし、緩和策を削除すると、既知の問題も解決されるはずです。ただし、SU をインストールしても緩和策は自動的には削除されません。また、もうしばらくの間は緩和策を有効にしておくことを推奨しています。

**一部のサーバーを更新したものの、他のサーバーを更新できない場合、更新できないサーバーでは CVE-2026-42897 の緩和策を有効にしたままにできますか？更新済みのサーバーと、緩和策を利用したままのサーバーが混在していても問題ありませんか？**  
2026 年 6 月の SU 以降に更新できないサーバーでは、緩和策を引き続き利用できます。ただし、そのサーバーでは緩和策による既知の問題も引き続き発生します。また、この更新プログラムを適用した後、組織内のすべての Exchange サーバーが更新されるまで、Office Online Server (OOS) と Exchange Server の統合が期待通りに機能しない場合があります。

**サーバーを 2026 年 6 月以降の更新プログラムに更新しましたが、緩和策が原因の既知の問題がまだ発生しています。なぜですか？**  
2026 年 6 月以降の更新プログラムをインストールしても、緩和策は自動的には削除されません。上記の説明を確認してください。現時点では緩和策を有効なままにしておくことを推奨していますが、上記の手順で削除することもできます。

**弊社の環境は Exchange Online とのハイブリッド構成ですが、対応は必要ですか？**  
Exchange Online は既に保護されていますが、管理目的のみで利用している場合も含め、オンプレミスの Exchange サーバーには今回のセキュリティ更新プログラム (SU) を必ずインストールしてください。SU 適用後に認証証明書を変更する場合は、ハイブリッド構成ウィザードを再実行する必要があります。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を順番に適用する必要がありますか？**  
すべての SU は累積的です。サポートされている CU を使用している場合、すべての SU や HU を順番にインストールする必要はなく、最新の SU を適用するだけで問題ありません。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)を確認してください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？"Exchange 管理ツールのみ" インストールされたマシンはどうなりますか？**  
<u>すべて</u>の Exchange Server および Exchange 管理ツールがインストールされたすべてのサーバー / ワークステーションに SU を適用することを推奨します。これにより、管理ツールのクライアントとサーバー間の互換性が確保されます。稼働中の Exchange Server が存在しない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)を確認してください。

**弊社は Exchange 2016 および 2019 の第 2 期 ESU を登録していません。現在の Exchange 2016 または 2019 の更新プログラムを入手するにはどうすればよいですか？**  
Exchange 2016 および 2019 は現在[サポートが終了](/blog/support-for-exchange-server-2016-and-exchange-server-2019-ends-today/)しているため、[第 2 期 ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に登録しているお客様 (2026 年 5 月から 10 月まで有効) のみが、2026 年 5 月以降にリリースされる Exchange 2016 または 2019 の更新プログラムを入手できます。Exchange 2016 または 2019 を引き続き利用しているすべてのお客様には、できるだけ早く [Exchange SE にアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)することを推奨します。

<p style="background: #f0f0f0">本記事公開時点では、関連するドキュメントが完全には利用できない場合があります。</p>

**この記事の重要な更新:**

- 2026 年 7 月 13 日: 既知の問題セクションを追加しました
- 2026 年 6 月 15 日: 緩和策のブロックに関する説明を明確化しました
- 2026 年 6 月 11 日: ドキュメント公開に関する問題のバナーを削除しました (現在は解決済み)
