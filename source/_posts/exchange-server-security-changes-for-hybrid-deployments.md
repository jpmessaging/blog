---
title: 'ハイブリッド展開における Exchange Server のセキュリティ変更'
date: 2025-04-22 10:00:00
lastupdate: 2025-08-06
tags: Exchange
--- 

※ この記事は、[Exchange Server Security Changes for Hybrid Deployments](https://techcommunity.microsoft.com/blog/exchange/exchange-server-security-changes-for-hybrid-deployments/4396833) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft の [Secure Future Initiative (SFI)](https://www.microsoft.com/trust-center/security/secure-future-initiative) の一環として、セキュリティは常に最優先事項です。SFI に沿って、Exchange Server ハイブリッド展開のセキュリティを強化するために、いくつかの変更が実施されます。本ブログ記事では、Exchange Server ハイブリッド展開に特化した現在および今後の変更について説明します。なお、組織で Exchange ハイブリッド構成を使用していない場合、本記事の内容は該当しません。

## 変更点 1: Exchange ハイブリッド専用アプリケーションへの移行

Exchange ハイブリッド展開機能 (予定表の空き時間情報の共有、メール ヒント、ユーザーのプロフィール写真の共有など、これを "リッチ共存" と呼びます) を実現にするために、Exchange Server は現在、Exchange Online と共有のアプリケーションのサービス プリンシパルを利用しています。このアプリケーションの名前は *Office 365 Exchange Online* で、アプリケーション ID は *00000002-0000-0ff1-ce00-000000000000* です。この構成は、ハイブリッド構成ウィザード (HCW) を初めて実行した際に設定され、Exchange Server と Exchange Online 間の通信を認証し、安全に保つために使用されます。

2025 年 4 月の更新プログラム ([2025 年 4 月の HU リリース](/blog/released-april-2025-exchange-server-hotfix-updates/)) 以降、Exchange Server はテナントの Entra ID 内に用意した Exchange ハイブリッド専用アプリケーションを使用するよう移行を開始します。2025 年 10 月までに、リッチ共存機能を必要とするすべての既存および新規の Exchange Server ハイブリッド展開は、Exchange ハイブリッド専用アプリケーションを<u>**使用する必要があります**</u>。この期限を過ぎると、Exchange Online サービスは共有サービス プリンシパルの使用を許可しなくなります。

Exchange ハイブリッド専用アプリケーションを有効化および使用するためには、管理者がいくつかの変更を行う必要があります。詳細については、[ドキュメント](https://aka.ms/ConfigureExchangeHybridApplication-Docs) をご参照ください。

## 変更点 2: Exchange ハイブリッドにおける EWS 呼び出しの廃止と REST ベースの Microsoft Graph API 呼び出しへの移行

[Exchange Web Services (EWS) の Exchange Online での廃止](https://techcommunity.microsoft.com/blog/exchange/retirement-of-exchange-web-services-in-exchange-online/3924440) が予定されています。Exchange ハイブリッド機能を維持するために、Exchange Server は今年後半に、Exchange Server から Exchange Online への EWS 呼び出しの代替として Microsoft Graph API のサポートを開始ます。この機能は、2025 年第 3 四半期にリリースされる Exchange Server 2019 および Exchange Server 2016 の更新プログラムを通じて提供されます。Microsoft Graph への移行に伴い、Exchange ハイブリッド専用アプリケーションが使用する API 権限が見直され、より細かい Graph API 権限を利用するようになります。このリリースに関する追加情報を含むブログ記事およびドキュメントは、リリース時に公開される予定です。

**重要:** Exchange Server ハイブリッド環境で Microsoft Graph を利用するには、**Exchange ハイブリッド専用アプリ** (上記の "変更点 1" を参照) が必要です。現在の共有サービス プリンシパルのアプローチは使用されなくなります。この変更は、<u>**Exchange Server (オンプレミス) での EWS API の利用可能性には影響しません**</u>。Exchange Server から Exchange Online への EWS 呼び出しが REST ベースの Microsoft Graph API 呼び出しに置き換えられます。

## 誰がいつ対応が必要なのか

| **組織で以下の Exchange ハイブリッド機能を使用している場合…** | **実施すべきアクションは…** |
| --- | --- |
| オンプレミスのメールボックスを持つユーザーと Exchange Online のメールボックスを持つユーザー間でリッチ共存機能 (特定の機能 : 空き時間情報の参照、メール ヒント、プロフィール写真の共有) が必要な場合 | [ドキュメント](https://aka.ms/ConfigureExchangeHybridApplication-Docs)に記載されている*手順を必ず実施し*、(**2025 年 10 月までに**) Exchange ハイブリッド専用アプリを使用するように切り替えてください。その後、(**利用可能になり次第、2026 年 10 月までに**) ハイブリッド構成を Graph API に切り替えてください。これらの手順を実施しない場合、リッチ共存機能が動作しなくなります。<br><br>すべてのサーバーが更新され、Exchange ハイブリッド専用アプリを使用するようになった後、"[サービス プリンシパル クリーンアップ モード](https://aka.ms/ConfigureExchangeHybridApplication-Docs)" を実行してください。 |
| その他のハイブリッド機能 (移行、SMTP リレー、受信者管理など) のみを使用しており、*リッチ共存は不要*な場合 | ハイブリッド構成を強化するために、[提供されているスクリプト](https://aka.ms/ConfigureExchangeHybridApplication)を使用して、共有の「Office 365 Exchange Online」アプリケーションから組織証明書を削除することを*推奨*します。"サービス プリンシパル クリーンアップ モード" の詳細は[ドキュメント](https://aka.ms/ConfigureExchangeHybridApplication-Docs)を参照してください。<br><br>リッチ共存機能が不要な場合、Exchange ハイブリッド専用アプリを作成する必要はありません。 |

## リッチ共存機能が必要な Exchange ハイブリッド利用者は対応が*必須です*

**ステップ 1** – Exchange ハイブリッドを共有サービス プリンシパルから Exchange ハイブリッド専用アプリに切り替える作業を、**2025 年 10 月までに**実施してください。この変更は、以下の 2 つの方法で行うことができます。

- **オプション 1 (推奨)**: 2025 年 4 月の更新プログラム (またはそれ以降) をインストールし、*[ConfigureExchangeHybridApplication.ps1](https://aka.ms/ConfigureExchangeHybridApplication)* スクリプトを実行して、Exchange ハイブリッドを現在の "共有プリンシパル" 構成から Exchange ハイブリッド専用アプリを使用する構成に切り替えます。詳細は[ドキュメント](https://aka.ms/ConfigureExchangeHybridApplication-Docs)をご参照ください。
- **オプション 2**: [更新版のハイブリッド構成ウィザード (HCW)](/blog/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible-hybrid-function/) がリリースされました。HCW を再実行して、Exchange ハイブリッド専用アプリを構成してください。ただし、スクリプト (オプション 1) の方が新しい Exchange ハイブリッド専用アプリに対応したより堅牢な方法である点にご留意ください。


**ステップ 2** – Exchange ハイブリッドを Graph API 呼び出しに切り替え、Exchange ハイブリッド専用アプリの権限をより細かい Graph 権限モデルに更新する作業を、**2026 年 10 月までに**実施してください。

- 2025 年第 3 四半期に、Exchange Server の Graph API 更新プログラムが利用可能になり次第、リッチ共存を必要とするすべてのお客様 (すでに上記のステップ 1 を実施済みの方も含む) は、Exchange 2016/2019 の更新プログラムをインストールし、Exchange ハイブリッド専用アプリの権限をより細かい Graph API 権限モデルに切り替える必要があります。この作業は、**2026 年 10 月までに**完了する必要があります。詳細な手順については、リリース時に提供されるドキュメントをご参照ください。

以下の図は、ハイブリッド環境でリッチ共存を利用する組織が、上記の変更 1 および変更 2 に関連して、いつ何が必要になるかを示しています。

![](DedicatedHybirdApp.jpg)

<p style="background: #ffff99"><i>Exchange ハイブリッド環境でリッチ共存機能を必要とするお客様</i>は、2025 年 4 月の更新プログラム (HU) リリースから 2025 年 10 月までの間に対応が必要です。2025 年 10 月までに Exchange ハイブリッド専用アプリに更新し、その後 2026 年 10 月までに Graph 権限モデルに更新しない場合、オンプレミスと Exchange Online ユーザー間の空き時間情報の共有、メール ヒント、プロフィール写真の共有といった一部の Exchange ハイブリッド機能が動作しなくなります。</p>

## その他の Exchange ハイブリッド利用者への推奨事項
リッチ共存機能を利用していない場合でも、組織で過去に Exchange ハイブリッド構成ウィザード (HCW) を実行・完了している、または [Exchange と Exchange Online 組織間の OAuth 認証を構成する](https://learn.microsoft.com/exchange/configure-oauth-authentication-between-exchange-and-exchange-online-organizations-exchange-2013-help)ドキュメントに記載された手順を実施している場合、HCW の実行過程で組織証明書が共有サービス プリンシパルにアップロードされています。

ハイブリッド構成のセキュリティ強化のため、[提供されているスクリプト](https://aka.ms/ConfigureExchangeHybridApplication)を使用して、共有の「Office 365 Exchange Online」アプリケーションから組織証明書を削除することを強く推奨します。詳細は[ドキュメント](https://aka.ms/ConfigureExchangeHybridApplication-Docs)の「サービス プリンシパル Clean-Up モード」をご参照ください。

リッチ共存機能が不要な場合、Exchange ハイブリッド専用アプリを作成する必要はありません。また、このスクリプトの実行は、オンプレミスの Exchange Server のバージョンに依存しません (Exchange Server の更新プログラムをインストールしていなくても、スクリプトを実行できます)。

## よくあるご質問

このトピックに関するよくあるご質問 (FAQ) は、[公開情報](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#frequently-asked-questions)に移動しました。

**主な変更点:**

- 2025/8/7 : ブログ本文内に ConfigureExchangeHybridApplication.ps1 スクリプトへの直接リンクを追加しました。
- 2025/8/6 : ハイブリッド構成ウィザード (HCW) が Exchange ハイブリッド専用アプリの作成に対応しました。関連する内容を更新しました。
- 2025/8/4 : 本トピックに関するよくあるご質問 (FAQ) を[公開情報](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#frequently-asked-questions)に移動しました。
- 2025/7/31 : 「リッチ共存」機能を利用していないお客様向けの推奨事項を明確化しました。
- 2025/5/16 : 複数のオンプレミス フォレスト構成に関する FAQ を追加しました。
- 2025/4/24 : Exchange ハイブリッド専用アプリの名前変更に関する FAQ を追加しました。
- 2025/4/22 : スクリプトを使用してセキュリティ プリンシパルのクリーンアップのみを行う場合、4月の更新プログラム (HU) をインストールする必要がないことに関する FAQ を追加しました。
