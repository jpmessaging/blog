---
title: 'リリース: Exchange Server 2019 向け 2025 H1 累積更新プログラム'
date: 2025-02-13
lastupdate: 
tags: Exchange
--- 

※ この記事は、[Released: 2025 H1 Cumulative Update for Exchange Server](https://techcommunity.microsoft.com/blog/exchange/released-2025-h1-cumulative-update-for-exchange-server/4362055) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

本日、Exchange Server 2019 向け 2025 H1 累積更新プログラム (CU) (別名 CU15) の提供を発表します。これは、Exchange Server 2019 向けにリリースする最後の CU です。

CU15 には、新機能、お客様から報告された問題の修正、セキュリティ更新が含まれており、これまでにリリースされたすべてのセキュリティ更新プログラム (SU) が組み込まれています。

<mark>CU15 には、[2024 年 11 月の SU v2](https://techcommunity.microsoft.com/blog/exchange/re-release-of-november-2024-exchange-server-security-update-packages/4341892) (再リリース パッケージ) に含まれるすべてのセキュリティ更新が含まれており、[2024 年 11 月の SU における既知のタイムゾーンの問題](https://support.microsoft.com/topic/time-zone-exception-occurs-after-installing-exchange-server-november-2024-su-version-1-or-version-2-851b3005-6d39-49a9-a6b5-5b4bb42a606f)の修正も含まれています。</mark>

CU15 の修正の完全なリストは、CU15 の KB 記事に記載されていますが、この記事では CU15 の重要な変更点をいくつか紹介します。

### Exchange Server 機能フライティング

CU15 では、Exchange Server Subscription Edition (SE) に導入される新機能 「[機能フライティング](https://learn.microsoft.com/Exchange/plan-and-deploy/post-installation-tasks/feature-flighting)」のサーバー側コンポーネントが導入されます。従来、Exchange Server の更新プログラムを本番環境にインストールする前に、テスト環境で更新プログラムを展開し、まずその更新プログラムを検証してから本番環境に展開することが一般的でした。これは重要な作業ですが、時間がかかるため、重要な更新プログラムの展開が遅れることがあります。さらに、すべてのお客様がテスト環境を持っているわけではありません。

機能フライティングは、管理者が Exchange Server SE 組織全体で選択した新機能をテストおよび展開する方法を提供します。機能フライティングは、オンプレミスの Exchange Server 向けのオプションのクラウド ベース サービスです。Emergency Mitigation サービスや Microsoft Office クライアントが使用しているのと同じ Office Config Service (OCS) のエンドポイントを使用して、Microsoft からの機能フライティングに関連する情報を取得します。

機能フライティングを使用すると、管理者は更新を即座に展開したり、フライトされた機能が環境内で有効になるタイミングを制御したりできます。また、機能フライティングにより、フライトされた機能を含む更新プログラムがリリースされた後に重大な問題が発見された場合、Microsoft がその機能を無効にすることも可能です。

機能フライティングは、すべての新機能や変更に適用されるわけではありません。Exchange Server エンジニアリング チームが、どの機能を機能フライティングで配布するかを決定し、フライトされた機能の詳細なリストは[こちら](https://learn.microsoft.com/Exchange/plan-and-deploy/post-installation-tasks/feature-flighting#flighted-features)で随時更新されます。

機能フライティングの使用はオプションですが、デフォルトで有効になっています。設定や無効化の手順については、[ドキュメント](https://learn.microsoft.com/Exchange/plan-and-deploy/post-installation-tasks/feature-flighting)をご参照ください。

**注:** CU15 ではフライトされる機能はありません。また、コードの同等性の約束により、Exchange Server SE RTM でもフライトされる機能はありません。機能フライティングは今後の更新にのみ適用され、フライトされる機能がある場合は、今後の更新で詳細を提供します。

### オプションの追加診断データの Microsoft への送信

Microsoft は、Exchange Server を安全かつ最新の状態に保ち、問題を見つけて修正し、脅威を特定して軽減するために診断データを収集します。管理者が有効にすると、Exchange Server 2019 は[診断データ](https://learn.microsoft.com/Exchange/diagnostic-data-exchange-server)を OCS に送信します。

CU15 から、Exchange Server は Microsoft に[追加の診断データ](https://learn.microsoft.com/Exchange/diagnostic-data-exchange-server#diagnostic-data-collected)を収集して送信します。これには、フライトされた機能に関する追加情報も含まれます。この追加データは、サーバーで診断データが有効になっている場合にのみ収集および送信されます。

### Windows Server 2025 のサポート

CU14 および CU15 の両方で、Windows Server 2025 上での Exchange Server 2019 の動作がサポートされ、また、Windows Server 2025 の Active Directory サーバーの組織での利用がサポートされることをお知らせします。これにより、Windows Server 2025 を搭載した新しいハードウェアに CU14 または CU15 のいずれかをインストールし、その後 [Exchange Server Subscription Edition (SE) にインプレース アップグレード](https://jpmessaging.github.io/blog/Upgrading%20your%20organization%20from%20current%20versions%20to%20Exchange%20Server%20SE/)することで、サーバーの[最大サポート製品ライフサイクル](https://learn.microsoft.com/lifecycle/products/windows-server-2025)を得ることができます。このサポートは CU15 に提供されると以前お伝えしましたが、最新バージョンの Windows Server への移行を容易にするために、このシナリオに対して CU14 も検証しました。

### Oracle Outside In Technology が DocParser に置き換わります

Exchange Server は以前から使用されていた Oracle Outside In Technology の代わりに CU15 から DocParser を使用します。DocParser は、さまざまなファイル形式を解析するために設計された Microsoft のライブラリです。これは、データ損失防止 (DLP) および Exchange トランスポート ルールのために、トランスポート中のメールを処理する際にテキスト抽出を行います。

### 部分的な TLS 1.3 のサポート

CU15 から、Exchange Server 2019 は Windows Server 2022 以降で、SMTP を除くすべてのプロトコルに対して TLS 1.3 をサポートします。CU15 が Windows Server 2022 以降にインストールされると、TLS 1.3 は既定で有効になります (ただし、CU15 は既存の TLS バージョンを*無効にすることはありません*)。

SMTP に対する TLS 1.3 のサポートは、将来の更新で追加される予定です。

### Exchange Server の AMSI 統合の改善

CU15 には、[2024 年 11 月の SU](https://techcommunity.microsoft.com/blog/exchange/released-november-2024-exchange-server-security-updates/4293125) で発表された Exchange Server の AMSI 統合の改善も含まれています。

### 証明書管理 UI が EAC に復活

以前の CU で EAC から削除された証明書管理タスクが、CU15 で再導入されます。詳細については、[証明書の手順](https://learn.microsoft.com/exchange/architecture/client-access/certificate-procedures?view=exchserver-2019)を参照してください。

### Exchange Server 2013 との共存はブロックされます

[以前の発表](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/)の通り、Exchange Server 2019 CU15 は Exchange Server 2013 を実行しているサーバーが存在する組織にはインストールできません。CU15 をインストールする前に、すべての Exchange Server 2013 のサーバーを[廃止](https://techcommunity.microsoft.com/t5/exchange-team-blog/decommissioning-exchange-server-2013/ba-p/3613793)し、アンインストールする必要があります。Edge Transport サーバーの削除には追加の手順が必要であり、詳細は[こちら](https://learn.microsoft.com/exchange/architecture/edge-transport-servers/edge-subscription-procedures?view=exchserver-2019)をご参照ください。

### リマインダー: 拡張保護が既定で有効化されています

お客様が古い CU からアップグレードする際のリマインダーとして、Exchange 2019 CU14 以降、CU をインストールした後に拡張保護が既定で有効になります。詳細および拡張保護をオプト アウトする方法については、[このブログ記事](https://techcommunity.microsoft.com/blog/exchange/released-2024-h1-cumulative-update-for-exchange-server/4047506)をご覧ください。

### Exchange Server SE CU1 に延期された機能

[以前の発表](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/)で、Exchange Server 2019 CU15 が Exchange Server SE プロダクトキーのサポートを追加することをお知らせしました。この変更を Exchange Server SE CU1 まで延期し、Exchange Server 2019 から Exchange Server SE RTM へのインプレース アップグレードができるだけスムーズかつ簡単になるようにします。そのため、Exchange Server SE RTM は *Exchange 2019 プロダクト キーを受け入れ、適用し*、Exchange Server SE プロダクト キーを使用するためにサーバーを更新する必要は Exchange Server SE CU1 までありません。インプレース アップグレードをさらに簡素化するために、いくつかの前提条件およびセットアップ依存関係の変更 (VC++ 再頒布可能パッケージの新バージョンへの移行など) も延期しました。

## サポータビリティ

Microsoft には、サーバーの構成や製品のライフサイクル ステータスに基づいた Exchange Server のサポート基準が確立されています。例えば、すべての CU リリース発表の末尾に記載されているように、「*Exchange ハイブリッド展開を行っているお客様や、オンプレミスの Exchange と一緒に Exchange Online Archiving を使用しているお客様は、製品のサポートを受けるために最新の CU を展開する必要があります。*」

Exchange Server 製品がメインストリーム サポート中の場合、*N-1* ポリシーが適用されます。これは、サポート (例：SU の提供やお問い合わせを起票しての技術サポート) を受けるために最新の CU またはその 1 つ前の CU を実行する必要があることを意味します。Exchange Server 2019 は[製品ライフサイクル](https://learn.microsoft.com/lifecycle/products/exchange-server-2019)の延長サポート フェーズにあり、1 年以上経過しています。Exchange Server 製品が延長サポートに入ると、サポートを受けるために最新の CU を必要とするポリシーが適用されます (*N* のみ)。実際、Exchange Server 2016 ではこのポリシーが適用されており、すべてのサーバーはサポートを受けるために CU23 を実行する必要があります。

必要なセキュリティ作業のために CU15 のリリースを遅らせる必要があり、また CU14 を Windows Server 2025 で検証できたため、Exchange Server 2019 のサポート終了日である 2025 年 10 月 14 日まで、CU14 と CU15 の両方をサポートし続けます。ただし、サーバー構成に関するサポート ポリシーが優先されるため、ハイブリッド構成やオンプレミスのメールボックスにクラウド アーカイブを持つお客様は、サポートを受けるために CU15 を実行する必要があります。

CU15 のリリースに伴い、*CU13 のサポートは終了しました*。お客様には、できるだけ早くサーバーを更新することをお勧めします。

## Exchange Server SE RTM への移行パス

以前の[ロードマップ発表](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/)で述べたように、迅速な導入を可能にするために、Exchange Server SE の RTM リリースは Exchange Server 2019 CU15 と*コード同等* (つまり、*全く同じコード*) になりますが、以下の変更を*除きます*：

- ライセンス契約書 (GUI バージョンのセットアップでのみ表示される RTF ファイル) は、更新されます。
- 名前が Microsoft Exchange Server 2019 から Microsoft Exchange Server Subscription Edition に変更されます。
- ビルド番号が更新されます。

また、CU15 の*後に*リリースされる更新プログラムがある場合、Exchange Server SE の RTM リリースは Exchange Server 2019 CU15 と最新の更新プログラムを合わせたコードと同等になります。

いくつかの Exchange Server 2019 に関するお客様から報告された不具合が残っており、今後数か月以内に修正する予定です。これらの修正を提供するために、Exchange Server 2019 CU15 用のホットフィックス更新プログラム (HU) をリリースします。この HU はオプションですが、修正を適用し、Exchange Server SE の RTM リリースとコードの同等性を維持するために推奨されます。HU は Exchange Server 2019 CU14 および Exchange Server 2016 CU23 にも提供されます。

### アップグレード パス

推奨されるサポート対象のアップグレード パスは以下の通りです。また、以前のブログ投稿「[現行バージョンからExchange Server SEへのアップグレード](https://jpmessaging.github.io/blog/Upgrading%20your%20organization%20from%20current%20versions%20to%20Exchange%20Server%20SE/)」もご参照ください。

### Exchange Server 2016 CU23 からのアップグレード

Exchange Server 2016 をご利用のお客様には、Exchange Server 2019 へのアップグレードを推奨し、Exchange Server SE RTM が利用可能になった際にインプレース アップグレードを実行することをお勧めします。Exchange Server 2016 CU23 から Exchange Server SE RTM へのレガシー アップグレードもサポートされています。

![図 1 - Exchange Server 2016 の推奨およびサポートされているアップグレード パス](image01.jpg)

### Exchange Server 2019 CU14/CU15 からのアップグレード

Exchange Server SE RTM が利用可能になった際には、インプレース アップグレードを実行することをお勧めします。ただし、Exchange Server 2019 から Exchange Server SE へのレガシー アップグレードもサポートされています。

![図 2 - Exchange Server 2019 の推奨およびサポートされているアップグレード パス](image02.jpg)

## リリース詳細

このリリースの修正内容と製品のダウンロードについては、以下の KB 記事をご覧ください：

- Exchange Server 2019 Cumulative Update 15 (KB5042461), [VLSC](https://www.microsoft.com/Licensing/servicecenter/default.aspx), [Download](https://www.microsoft.com/download/details.aspx?familyID=8c3c7713-b480-4a5a-872f-e6c2987dd490)

<mark>Exchange Server 2019 CU15 のインストールを開始する前に、Exchange Server を再起動して、すべての Windows Server 更新プログラムが完全にインストールされていることを確認してください。</mark>

CU をインストールした後は、常に利用可能な [SU](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019) を確認してインストールしてください。[Exchange Server Health Checker](https://aka.ms/ExchangeHealthChecker) も、追加の手順が必要かどうかを教えてくれます。

## 追加情報

Microsoft は、すべてのお客様に対して、更新プログラムの展開を本番環境にインストールする前に、検証環境でテストすることを推奨しています。これにより、本番環境に適したインストール プロセスを確認することができます。

Active Directory の準備に関する情報は[こちら](https://learn.microsoft.com/exchange/plan-and-deploy/prepare-ad-and-domains?view=exchserver-2019)をご覧ください。Exchange Server によって行われたスキーマ変更はすべて[こちら](https://learn.microsoft.com/Exchange/plan-and-deploy/active-directory/ad-schema-changes?view=exchserver-2019)で追跡されています。

インストールのベスト プラクティスについては、[Exchange を最新の累積更新プログラムにアップグレードする](https://learn.microsoft.com/Exchange/plan-and-deploy/install-cumulative-updates?view=exchserver-2019)を参照してください。詳細なインストール手順については、[Exchange Update Wizard](https://aka.ms/exchangeupdatewizard) もご覧ください。

更新プログラムを PowerShell またはコマンド プロンプトから無人モードでインストールする場合は、Setup.exe へのフルパスを指定するか、CU を含むフォルダーから直接 Setup を実行する際にコマンドの前に "." を付けてください。これを行わないと、セットアップが正常に完了したと表示されても実際には完了していない可能性があります。詳細は[こちら](https://learn.microsoft.com/exchange/troubleshoot/setup/ex2019-setup-does-not-run-correctly-started-powershell)をご覧ください。

ハイブリッド展開を行っているお客様や、オンプレミスの Exchange と一緒に Exchange Online Archiving を使用しているお客様は、製品のサポートを受けるために最新の CU を展開する必要があります。

最新の Exchange Server に関する発表については、[Exchange Server の新機能](https://learn.microsoft.com/Exchange/new-features/new-features?view=exchserver-2019)および [Exchange Server リリース ノート](https://learn.microsoft.com/Exchange/release-notes?view=exchserver-2019)をご覧ください。

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#ff7518">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px"><path fill="#ff7518" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
注意
</div>
この記事が公開された時点では、ドキュメントが完全に利用可能でない場合があります。
</div>
