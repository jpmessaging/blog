---
title: 'リリース: 2025 年 4 月の Exchange Server HotFix 更新'
date: 2025-04-21
lastupdate: 
tags: Exchange
--- 

※ この記事は、[Released: April 2025 Exchange Server Hotfix Updates](https://techcommunity.microsoft.com/blog/exchange/released-april-2025-exchange-server-hotfix-updates/4402471) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft は、以前の更新プログラムで発生していた問題を解決し、新しい機能をサポートする Hotfix Updates (HU) をリリースしました。

- Exchange Server 2019
- Exchange Server 2016

HU は以下の特定のバージョンの Exchange Server に対して提供されています。

- Exchange Server [2019 CU14](https://www.microsoft.com/download/details.aspx?id=108146) および [2019 CU15](https://www.microsoft.com/download/details.aspx?id=108144)
- Exchange Server 2016 CU23（ダウンロードセンターの問題により、このバージョンは一時的に利用できません）

2025 年 4 月の HU には、新しい Exchange Server のセキュリティ更新プログラムは含まれていません。この更新プログラムに含まれる以下の機能について特にご紹介します。

## 専用の Exchange ハイブリッド アプリケーションの発表

Microsoft の [Secure Future Initiative (SFI)](https://www.microsoft.com/trust-center/security/secure-future-initiative) の一環として、Exchange ハイブリッド構成のセキュリティを向上させるための変更を行っています。この取り組みの一環として、Microsoft Entra ID に専用の Exchange ハイブリッド アプリケーションを作成し、Exchange Server と Exchange Online のアイデンティティを分離します。これは、Exchange Online からレガシーな Exchange Web Services (EWS) API を廃止し、より細かい Graph API 権限を使用した Graph API 呼び出しに移行するための全体的な取り組みの一部です。

2025 年 4 月の HU のリリースにより、この移行の最初のステップを開始する準備が整いました。

<mark>*Exchange ハイブリッド構成を利用して Exchange Online とリッチな共存機能を必要とするお客様*は、2025 年 4 月の HU リリースから 2025 年 10 月までの間に対応を行う必要があります。2025 年 10 月までに専用の Exchange ハイブリッド アプリケーションに更新し、その後 2026 年 10 月までに Graph 権限モデルに移行する手順を実施しない場合、いくつかの Exchange ハイブリッド機能が動作しなくなる可能性があります（オンプレミスと Exchange Online ユーザー間の空き時間情報の共有、MailTips、プロフィール写真の共有）。</mark>

専用の Exchange ハイブリッド アプリケーションおよびその他の関連変更については、専用のブログ記事 [Exchange Server Security Changes for Hybrid Deployments](https://techcommunity.microsoft.com/blog/exchange/exchange-server-security-changes-for-hybrid-deployments/4396833)、[ドキュメント](https://aka.ms/ConfigureExchangeHybridApplication-Docs)、および [FAQ](https://techcommunity.microsoft.com/blog/exchange/exchange-server-security-changes-for-hybrid-deployments/4396833) をご参照ください。

### この更新の既知の問題

- [Edge Transport サービス (EdgeTransport.exe) が応答を停止し、その後再起動する](https://support.microsoft.com/topic/edge-transport-service-stops-responding-after-installing-november-2024-su-fb157463-5daf-4717-ad1b-25a8a0170cb2) 問題が発生する場合があります。この問題は、Azure Rights Management (Azure RMS) によって保護された外部ソースから送信されたメッセージを Exchange Server が復号化しようとする際に発生します。

## 更新のインストール

以下の更新パスが利用可能です。

![](Apri2025HUs.jpg)

- Exchange サーバーのインベントリを作成し、[Exchange Server Health Checker スクリプト](https://aka.ms/ExchangeHealthChecker) を使用して必要な更新プログラムを確認してください。このスクリプトを実行することで、Exchange サーバーが更新プログラム (CU、SU、または手動操作) に遅れているかどうかを確認できます。
- 最新の CU をインストールしてください。[Exchange Update Wizard](https://aka.ms/ExchangeUpdateWizard) を使用して、現在の CU と目標とする CU を選択し、手順を確認してください。
- 更新プログラムをインストールした後、Health Checker を再実行して、さらに必要な操作があるかどうかを確認してください。
- Exchange Server のインストール中またはインストール後にエラーが発生した場合は、[SetupAssist スクリプト](https://aka.ms/ExSetupAssist)を実行してください。更新後に何かが正しく動作しない場合は、[Exchange Cumulative および Security 更新プログラムの失敗したインストールを修復する](https://aka.ms/ExchangeFAQ) を参照してください。また、[Exchange Server 更新プログラムのインストール時に発生するファイルバージョンエラー](https://support.microsoft.com/topic/file-version-error-when-you-try-to-install-exchange-server-november-2024-su-a650da30-f8fb-469d-a449-47396cab0a15) もご確認ください。

## Hotfix 更新の FAQ

**最後のセキュリティ更新プログラムをインストールしました。後の Hotfix 更新プログラムもインストールすべきですか？**  
Exchange Server の HU は *オプションの更新プログラム* ですが、組織にとって有益な機能や修正が含まれている場合があります。詳細については、リリース KB 記事をご確認ください。

**以前のセキュリティ更新プログラムをまだインストールしていません。後からリリースされた HU をインストールする前に、最後に利用可能な SU をインストールする必要がありますか？**  
Exchange の更新プログラム (HU または SU) はすべて累積的です。そのため、新しい HU には、以前の古い SU に含まれていたすべての変更が含まれています。古い SU をまだインストールしていない場合でも、新しい HU を直接インストールし、古い SU をスキップすることができます。

**私たちの Exchange サーバーは Windows/Microsoft Update を通じて自動的に更新されます。この場合、HU 更新プログラムも自動的にインストールされますか？**  
HU はサーバーに対して *オプションの更新プログラム* として表示されます。この更新プログラムは、数日遅れて Microsoft Update Catalog でも利用可能になります。

**HU でリリースされた新機能や修正は今後の更新プログラムにも含まれますか、それともこの特定の HU をインストールする必要がありますか？**  
この HU に含まれる内容は、今後リリースされる Exchange Server の更新プログラムにも含まれます。

**HU を (必要に応じて) アンインストールすることは可能ですか？**  
はい。HU は SU と同様にアンインストールすることが可能です。

<span style="background-color:#d3d3d3">この記事の公開時点では、関連するドキュメントが完全に利用可能でない場合があります。</span>

この記事は将来的に更新される可能性があります。更新が行われた場合は、こちらに追記されます。
