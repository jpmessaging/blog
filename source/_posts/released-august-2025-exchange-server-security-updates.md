---
title: "2025 年 8 月の Exchange Server のセキュリティ更新プログラムが公開されました"
date: 2025/08/13
lastupdate: 
tags:
- Exchange
---

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#ff7518">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px"><path fill="#ff7518" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
訳者注
</div>
当ブログでは、Exchange Server の更新プログラムの公開時の記事に関して、極めて重要な問題の修正が含まれる場合や、管理者による追加の操作が必要となる場合にのみ翻訳記事の提供を実施しております。更新プログラムの公開について基本的には<a href="https://techcommunity.microsoft.com/category/exchange/blog/exchange">弊社の英語のブログ</a>にてご確認をお願いいたします。<br />
今回のセキュリティ更新プログラムは <a href="https://portal.msrc.microsoft.com/security-guidance/advisory/CVE-2025-53786">CVE-2025-53786 の脆弱性対応</a>を検討されているお客様の作業計画に影響を及ぼす可能性があり、元の英語のブログ記事にはこれに関連する「よくあるご質問」の記載があるため、翻訳記事の提供をしています。
</div>

※ この記事は、[Released: August 2025 Exchange Server Security Updates](https://techcommunity.microsoft.com/blog/exchange/released-august-2025-exchange-server-security-updates/4441596) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以下の製品に存在する脆弱性に対応するセキュリティ更新プログラム (SU) をリリースしました。

- Exchange Server Subscription Edition (SE)
- Exchange Server 2019
- Exchange Server 2016

以下の Exchange Server のバージョン向けに SU が提供されています：

- Exchange SE [RTM](https://www.microsoft.com/download/details.aspx?id=108335)
- Exchange Server 2019 [CU14](https://www.microsoft.com/download/details.aspx?id=108336) and [CU15](https://www.microsoft.com/download/details.aspx?id=108334)
- Exchange Server 2016 [CU23](https://www.microsoft.com/download/details.aspx?id=108333)

2025 年 8 月のセキュリティ更新プログラム (SU) は、セキュリティ パートナーから責任を持って報告された脆弱性や、Microsoft の内部プロセスによって発見された脆弱性に対応しています。現時点で悪用が確認されている事例はありませんが、環境を保護するため、できるだけ早くこれらの更新プログラムを適用することを推奨します。

これらの脆弱性は Exchange Server に影響します。Exchange Online のお客様は、今回のセキュリティ更新プログラムで対応された脆弱性について既に保護されていますので、特別な対応は不要です。ただし、環境内に存在する Exchange サーバーや Exchange 管理ツールをインストールしたワークステーションについては、引き続き更新プログラムの適用を行ってください。

特定の脆弱性 (CVE) に関する詳細は、[Security Update Guide](https://msrc.microsoft.com/update-guide/) (Product Family で "Server Software" を選択してフィルター) をご参照ください。

## Exchange Server AMSI 本文スキャンが既定で有効化されます

[2024 年 11 月の Exchange Server セキュリティ更新プログラム (SU)](https://support.microsoft.com/help/5044062) から、AMSI 統合機能が強化され、「HTTP メッセージ本文」のスキャン機能が追加されました。この機能は、2025 年 8 月の Exchange Server セキュリティ更新プログラムのインストール以降、すべてのプロトコルで既定で有効化されます。

8 月のセキュリティ更新プログラム (SU) 適用後にパフォーマンスの低下が見られる場合は、[Exchange Server の AMSI 統合機能に関するドキュメント](https://aka.ms/ExchangeAMSI#disable-exchange-server-amsi-body-scanning)を参照し、AMSI 本文スキャン機能の無効化手順をご確認ください。

## 更新プログラムのインストール方法

利用可能な更新パスは以下の通りです。

![](Aug2025SU.jpg)

- [Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker)を使用して、更新が必要な Exchange サーバーのインベントリを作成し、各サーバーの更新状況 (CU、SU、手動対応) を確認してください。
- 最新の CU をインストールします。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) を利用して、現在の CU と目標 CU を選択し、手順を確認してください。
- 更新プログラムのインストール後に再度 Health Checker を実行し、追加の対応が必要かどうかを確認します。
- Exchange Server のインストール中やインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に問題が発生した場合は、[失敗した Exchange Server の更新プログラムを修正する](https://aka.ms/ExchangeFAQ)や、[2024 年 11 月 SU Exchange Serverインストールしようとするとファイル バージョン エラーが発生する](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15)もご参照ください。

## よくあるご質問

**2025 年 8 月の更新プログラムには、最近発表された [CVE-2025-53786](https://portal.msrc.microsoft.com/security-guidance/advisory/CVE-2025-53786) への対応が含まれていますか？**  
はい、すべての Exchange 更新プログラムは[累積的](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-server-update-faq)なものです。2025 年 8 月のセキュリティ更新プログラム (SU) には CVE-2025-53786 の脆弱性対応に必要な Exchange ハイブリッド専用アプリの仕様をサポートする機能が含まれています。ただし 2025 年 8 月のセキュリティ更新プログラムをインストールするのみではなくガイダンスに従って、組織のシナリオに適用できるようにアプリを構成する必要があります。[ハイブリッド展開における Exchange Server のセキュリティ変更](/blog/exchange-server-security-changes-for-hybrid-deployments/)を参照してください。  

**弊社の環境は Exchange Online とのハイブリッド構成ですが、対応は必要ですか？**  
Exchange Online は既に保護されていますが、管理目的のみで利用している場合も含め、オンプレミスの Exchange サーバーには今回のセキュリティ更新プログラム (SU) を必ずインストールしてください。SU 適用後に認証証明書を変更する場合は、ハイブリッド構成ウィザードを再実行する必要があります。

**最後にインストールした SU/HU は数か月前のものですが、最新の SU をインストールするためにすべての SU を順番に適用する必要がありますか？**  
すべての SU は累積的です。サポートされている CU を使用している場合、すべての SU や HU を順番にインストールする必要はなく、最新の SU を適用するだけで問題ありません。詳細は[こちらのブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/why-exchange-server-updates-matter/ba-p/2280770)をご参照ください。

**組織内のすべての Exchange Server に SU をインストールする必要がありますか？"Exchange 管理ツールのみ" インストールされたマシンはどうなりますか？**  
<u>すべて</u>の Exchange Server および Exchange 管理ツールがインストールされたすべてのサーバー / ワークステーションに SU を適用することを推奨します。これにより、管理ツールのクライアントとサーバー間の互換性が確保されます。稼働中の Exchange Server が存在しない環境で Exchange 管理ツールのみを更新する場合は、[こちら](https://learn.microsoft.com/exchange/manage-hybrid-exchange-recipients-with-management-tools#update-the-exchange-server-management-tools-only-role-with-no-running-exchange-server-to-a-newer-cumulative-or-security-update)をご参照ください。  

本記事公開時点では、関連するドキュメントが完全には利用できない場合があります。

今後、記事内容に更新があった場合は、こちらに追記します。
