---
title: "専用ハイブリッド アプリ: 一時的な強制措置、新しい HCW、およびハイブリッド機能の中断の可能性"
date: 2025/08/07
lastupdate: 
tags: Exchange
---

※ この記事は、[Dedicated Hybrid App: temporary enforcements, new HCW and possible hybrid functionality disruptions](https://techcommunity.microsoft.com/blog/exchange/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible-hybrid-function/4440682) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2025 年 4 月、Exchange ハイブリッド環境に関するいくつかの変更について、[ハイブリッド展開における Exchange Server のセキュリティ変更](/blog/exchange-server-security-changes-for-hybrid-deployments/)で発表しました。

2025 年 8 月より、Exchange Online の共有サービス プリンシパルを使用した Exchange Web Services (EWS) トラフィックを一時的にブロックする措置を開始します (この共有サービス プリンシパルは、ハイブリッド環境で一部の共存機能にデフォルトで使用されています)。これは、専用の Exchange ハイブリッド アプリの導入を促進し、お客様の環境のセキュリティを強化するための段階的な施策の一環です。

お客様の作業をより簡単にするため、更新された Hybrid Configuration Wizard (HCW) もリリースされています。

## なぜこの変更が重要なのか

専用の Exchange ハイブリッド アプリは、Exchange Server と Exchange Online 間でのカレンダーの空き時間情報 (Free / Busy)、MailTips、プロフィール写真の共有など、ハイブリッド機能 (リッチ共存機能) を実現します。これらの機能は現在、Exchange Web Services (EWS) と Exchange Online の共有サービス プリンシパルに依存しています。しかし、[こちらの記事](/blog/exchange-server-security-changes-for-hybrid-deployments/)でご案内のとおり、2025 年 10 月以降、共有サービス プリンシパルへの EWS アクセスは恒久的にブロックされる予定です。

専用ハイブリッド アプリに対応したサーバー バージョンの導入は進んでいるものの、実際に専用アプリを作成したお客様はまだ少数にとどまっています。このため、導入を促進する目的で、2025 年 8 月、9 月、10 月にかけて、共有サービス プリンシパルを利用した EWS トラフィックを短期間ブロックする措置を実施します。これらの一時的なブロックは、お客様に必要な構成作業を完了していただくためのきっかけとなるよう設計されています。*一時的なブロック期間がなければ、10 月末までに対応が行われず、必要な構成変更を行うための猶予がなくなってしまう可能性があります。*

さらに、共有サービス プリンシパルの利用をやめることで、ハイブリッド環境のセキュリティ体制が強化されます（詳細は [CVE-2025-53786](https://portal.msrc.microsoft.com/security-guidance/advisory/CVE-2025-53786) ― *エクスプロイト後の*脆弱性をご参照ください）。できるだけ早く専用の Exchange ハイブリッド アプリへ移行し、[ハイブリッド展開における Exchange Server のセキュリティ変更](/blog/exchange-server-security-changes-for-hybrid-deployments/)のブログ記事のガイダンスに従うことを強く推奨します。

## 一時的なブロックの影響を受けるユーザー

*すべての* Exchange ハイブリッド環境のお客様のテナントには共有サービス プリンシパルが存在しますが、今回の一時的なブロックの影響を受けるのは、以下の条件に該当するハイブリッド環境のお客様のみです。

- ユーザー メールボックスが **Exchange オンプレミス** と **Exchange Online** の両方に存在していること
- オンプレミスと Exchange Online 間で "リッチ共存" 機能 (空き時間情報の参照、MailTips、プロフィール写真の共有) を利用していること
- オンプレミスの Exchange サーバーが、専用 Exchange ハイブリッド アプリをサポートするバージョンに更新されていないこと
- テナント内で専用 Exchange ハイブリッド アプリが作成されていない、または Exchange で利用できるように有効化されていないこと (スクリプト実行や設定のオーバーライドが未実施)

この変更の影響を受けると考えられるテナントには、メッセージ センターの投稿 (MC1085578) を通じてご案内をお送りしています。

## ブロック期間中に*具体的に*利用できなくなる機能は何か

すべてのクラウド環境における計画的なブロック スケジュールは以下の通りです。今後の対応準備にご活用ください。

|  | **ブロック開始日** | **ブロック期間** |
| --- | --- | --- |
| 第 1 回ブロック | 2025 年 8 月 19 日 | 2 日間 |
| 第 2 回ブロック | 2025 年 9 月 16 日 | 3 日間 |
| 第 3 回ブロック | 2025 年 10 月 7 日 | 3 日間 |
| 最終ブロック | 2025 年 10 月 31 日以降 | (恒久的なブロック) |

ブロック期間中、影響を受けるお客様 (上記参照) では、オンプレミスのメールボックスから Exchange Online のメールボックスに対して以下の機能が利用できなくなります。

- 空き時間情報の参照（Free / Busy ルックアップ）
- MailTips の表示
- プロフィール写真の共有

影響を受けるのは、上記 3 つの機能*のみ*であり、かつ "オンプレミスのメールボックスから Exchange Online のメールボックスへの参照" に限定されます。*その他すべての Exchange ハイブリッド機能には影響はありません*。 詳細は [ドキュメント](https://learn.microsoft.com/exchange/hybrid-deployment/deploy-dedicated-hybrid-app)の FAQ をご参照ください。

**ご注意ください:** 今回の一時的なブロックについては例外は認められません。サポート チームでも例外対応はできませんのでご了承ください。専用アプリの構成方法については、[ドキュメント](https://learn.microsoft.com/exchange/hybrid-deployment/deploy-dedicated-hybrid-app)をご参照いただくか、Microsoft サポートまでお問い合わせください。

## 取るべき対応策
#### リッチ共存機能を利用している場合

オンプレミスと Exchange Online のメールボックス間でリッチ共存機能 (空き時間情報の参照、MailTips、プロフィール写真の共有) を引き続き利用するには、以下の対応が必要です。

- 専用 Exchange ハイブリッド アプリをサポートするバージョンに Exchange サーバーを更新してください。
- スクリプトを実行して Entra ID に専用 Exchange ハイブリッド アプリを構成し、オンプレミス サーバーで利用できるようにするか、[更新された Hybrid Configuration Wizard (HCW)](https://learn.microsoft.com/exchange/hybrid-configuration-wizard-choose-configuration-feature#deploy-dedicated-exchange-hybrid-app) を使用してから、設定のオーバーライドで機能を有効化してください。

専用 Exchange ハイブリッド アプリを利用するために必要な [Exchange Server の最低バージョン](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)は以下の通りです。

| **Exchange のバージョン** | **必要な更新プログラム** | **バージョン番号** |
| --- | --- | --- |
| Exchange Server 2016 CU23 | April 2025 HU (またはそれ以降) | 15.1.2507.55 以上 |
| Exchange Server 2019 CU14 | April 2025 HU (またはそれ以降) | 15.2.1544.25 以上 |
| Exchange Server 2019 CU15 | April 2025 HU (またはそれ以降) | 15.2.1748.24 以上 |
| Exchange Subscription Edition (SE) RTM | RTM (またはそれ以降) | 15.2.2562.17 以上 |

現在ご利用中の Exchange Server のバージョンを確認するには、[こちらのドキュメント](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates#view-the-build-number-of-an-exchange-based-server)のオプション 1 またはオプション 2 をご参照ください。

#### HCW を使用した専用 Exchange ハイブリッド アプリの構成方法

[更新された Hybrid Configuration Wizard (HCW)](https://learn.microsoft.com/exchange/hybrid-configuration-wizard-choose-configuration-feature#deploy-dedicated-exchange-hybrid-app) を使用して、専用の Exchange ハイブリッド アプリを作成できるようになりました。

このオプションは、Classic Full、Modern Full、および Choose Exchange Hybrid Configuration 機能の一部として利用できます。HCW でこのオプションを選択すると、Microsoft Entra ID に専用の Exchange ハイブリッド アプリケーションが作成されます。これにより、従来ハイブリッド機能 (カレンダーの空き時間情報 (Free/Busy)、MailTips、プロフィール写真の共有など) を有効化するために使用されていたレガシーの共有サービス プリンシパルが置き換えられます。特に、オンプレミスの Exchange Server のメールボックスが Exchange Online のメールボックスから情報を取得する必要があるシナリオで有効です。

既定では、HCW は Microsoft Graph API を使用して専用 Exchange ハイブリッド アプリの作成と構成を行い、以下の処理を実施します。

- Entra ID に **ExchangeServerApp-{組織の GUID}** という新しいアプリケーションを登録します
- **full_access_as_app** の EWS API アプリケーション権限を追加します (今後の更新で Graph API 権限に置き換え予定)
- テナント全体の管理者同意を付与します (HCW 実行時に明示的な確認が必要です)
- 現在の認証証明書 (Auth Certificate) をアプリケーションにアップロードします
- 次回の認証証明書 (利用可能な場合) もアップロードします
- 期限切れの証明書をアプリケーションから削除します  

この構成により、ハイブリッド機能のための OAuth ベースの信頼関係が有効化されます。

<p style="background:#F0F0F0">HCW による構成が完了しても、オンプレミスの Exchange Server 組織で機能が自動的に有効化されるわけではありません。HCW は Entra ID にアプリケーションを作成し、Exchange Server の構成を準備するのみです。機能を有効化するには、設定の上書きを作成する必要があります。手順については、次のドキュメントをご参照ください: <a href=https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#how-to-enable-the-dedicated-exchange-hybrid-application-feature-via-setting-override>専用の Exchange ハイブリッド アプリを展開する | Microsoft Learn.</a></p>

詳細については、更新されたハイブリッド構成ウィザードのドキュメントをご参照ください。

- [ハイブリッド構成ウィザード](https://learn.microsoft.com/Exchange/hybrid-configuration-wizard)
- [Exchange ハイブリッド構成を選択する](https://learn.microsoft.com/Exchange/hybrid-configuration-wizard-choose-configuration-feature#deploy-dedicated-exchange-hybrid-app)

#### リッチ共存機能を利用していない場合

組織で過去に Exchange ハイブリッド構成ウィザード (HCW) を実行して完了した場合や、[Exchange と Exchange Online 組織間の OAuth 認証を構成する](https://learn.microsoft.com/exchange/configure-oauth-authentication-between-exchange-and-exchange-online-organizations-exchange-2013-help)ドキュメントに記載された手順を実施した場合、組織の証明書が共有サービス プリンシパルにアップロードされています。

ハイブリッド構成のセキュリティ強化のため、提供されているスクリプトを使用して、共有の "Office 365 Exchange Online" アプリケーションからカスタム証明書を削除することを*強く推奨*します。手順については、[ドキュメント](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#service-principal-clean-up-mode)の「サービス プリンシパル Clean-Up モード」をご参照ください。クリーンアップが必要かどうか分からない場合でも、サービス プリンシパル Clean-Up モードでスクリプトを実行することで、不要な証明書が残っていれば自動的に削除されます。証明書が存在しない場合は、何も変更されません。

リッチ共存機能が不要な場合は、専用ハイブリッド アプリを作成する必要はありません。また、Clean-Up モードでスクリプトを実行する場合は、オンプレミスの Exchange Server のバージョンに依存せず、Exchange Server 以外のコンピューターからでも実行できます。

## 最終的な強制措置

2025 年 10 月 31 日以降、共有サービス プリンシパルの利用は恒久的にブロックされます。専用ハイブリッド アプリの構成が行われていない場合、上記のハイブリッド機能は利用できなくなりますのでご注意ください。

## よくある質問: リッチ共存機能の一時的な停止と HCW による専用 Exchange ハイブリッド アプリの作成について

(専用 Exchange ハイブリッド アプリに関する FAQ については、[ドキュメント](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#frequently-asked-questions)をご参照ください。)

**リッチ共存機能の一時的なスケジュール停止について、例外対応は可能ですか？**  
今回の一時的な停止はセキュリティ強化のための措置であり、例外対応は認められていません。推奨される対応は、サーバーを最新の状態に更新し、専用の Exchange ハイブリッド アプリを構成していただくことです。

**リッチ共存機能が不要な場合でも、専用ハイブリッド アプリの作成は必要ですか？**  
いいえ、リッチ共存機能 (空き時間情報の参照、MailTips、プロフィール写真の共有など) が不要な場合は、専用ハイブリッド アプリを作成する必要はありません。ただし、共有サービス プリンシパルにカスタム証明書が登録されている場合は、提供されているスクリプト (Clean-Up モード) を使用して証明書を削除することを*強く推奨*します。

**過去にハイブリッド構成ウィザード (HCW) を実行したり、OAuth 認証を構成した組織にも影響がありますか？**  
はい。2025 年 10 月末以降、共有サービス プリンシパルの利用は恒久的にブロックされます。これまで共有サービス プリンシパルに依存していた組織は、ハイブリッド機能を継続して利用するために専用ハイブリッド アプリの構成が必要です。

**Exchange Server を更新して "クリーンアップ スクリプト" を実行する必要がありますか、それともスクリプトを実行してハイブリッド アプリを作成する必要がありますか?**  
専用 Exchange ハイブリッド アプリの構成および有効化を行うスクリプトを実行する場合は、オンプレミスの Exchange Server が所定のバージョンに更新されている必要があります (詳細は本記事内の表やドキュメントをご参照ください)。一方で、共有サービス プリンシパルの keyCredentials をクリーンアップするスクリプトについては、Exchange Server のバージョンや更新状況に関係なく、Exchange 以外のコンピューターからでも実行可能です。

**専用 Exchange ハイブリッド アプリの構成において、HCW (ハイブリッド構成ウィザード) と従来の PowerShell スクリプトは何が違うのですか？**  
どちらも専用 Exchange ハイブリッド アプリの構成を行いますが、主な違いは以下の通りです。

| **機能** | **PowerShell スクリプト** | **HCW** |
| --- | --- | --- |
| Entra ID にアプリを作成し、管理者同意を付与 | 可能 | 可能 |
| 認証証明書のアップロード | 可能 | 可能 |
| 共有サービス プリンシパルの keyCredentials をクリーンアップ | 可能（オプション） | 不可 |
| 設定のオーバーライドで機能を有効化 | 可能 | 不可 |

HCW では、レガシーの共有サービス プリンシパルのクリーンアップや、オンプレミス環境での機能の自動有効化は行われません。これらの作業は、手動で New-SettingOverride コマンドレットを実行する必要があります。  
詳細な手順については、[ドキュメント](https://learn.microsoft.com/exchange/hybrid-configuration-wizard-choose-configuration-feature#deploy-dedicated-exchange-hybrid-app)をご参照ください。

**なぜ HCW のセットアップ時にテナント全体の管理者同意が必要なのですか？**  
管理者同意は、専用ハイブリッド アプリが必要な API へのアクセス権を取得するために必要です。この同意がない場合、専用アプリによるハイブリッド機能は正しく動作しません。

**管理者同意を付与しなかった場合はどうなりますか？**  
HCW の実行は以下の警告付きで完了します。


    HCW8126 - Admin consent was not granted during the configuration of the dedicated application for Exchange Server.

アプリケーションは作成されますが、管理者同意が付与されるまで機能しません。ご利用を開始する前に、HCW を再実行するか、Microsoft Entra ID ポータルから管理者同意を付与してください。

![](HCW01.jpg)

空き時間、メールヒント、プロフィール写真の共有などのハイブリッド機能は、すべての手順 (同意の付与など) がすべて完了するまで、専用のハイブリッド アプリを使用しては機能しません。

**専用 Exchange ハイブリッド アプリの管理者同意を後から取り消した場合はどうなりますか？**  
管理者同意を取り消すと、専用ハイブリッド アプリが Exchange Online リソースへアクセスできなくなります。その結果、オンプレミスのメールボックスから Exchange Online のメールボックスへのハイブリッド機能が利用できなくなります。

**管理者同意を Microsoft Entra ID ポータルから手動で付与できますか？**  
はい、Microsoft Entra ID ポータルから手動で管理者同意を付与することが可能です。ただし、HCW (ハイブリッド構成ウィザード) を使用する場合は、セットアップ中に同意の付与を案内・促進する仕組みになっています。

**なぜ HCW では共有サービス プリンシパルのクリーンアップができないのですか？**  
HCW (ハイブリッド構成ウィザード) は新しい専用アプリの作成と構成に特化しており、レガシーの共有サービス プリンシパル (keyCredentials) のクリーンアップは行いません。古い認証情報や権限を確実に削除するためには、提供されているスクリプトを使用してクリーンアップ作業を実施する必要があります。手順については[ドキュメント](https://learn.microsoft.com/exchange/hybrid-configuration-wizard-choose-configuration-feature)をご参照ください。

**すでに専用ハイブリッド アプリが構成されている場合はどうなりますか？**  
HCW (ハイブリッド構成ウィザード) は既存のアプリケーションを検出し、重複して作成することはありません。詳細については、[ドキュメント](https://learn.microsoft.com/Exchange/hybrid-configuration-wizard)をご参照ください。

**HCW で専用 Exchange ハイブリッド アプリからのロールバックはサポートされていますか？**  
HCW ではロールバックはサポートされていません。Microsoft は 2025 年 10 月 31 日以降、共有サービス プリンシパルを利用したトラフィックを恒久的にブロックするため、ロールバックは推奨されません。どうしてもロールバックが必要な場合は、[スクリプト](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app)を使用してください。

**Microsoft Entra Connect（旧称 Azure AD Connect）を使用してディレクトリ同期を行っており、すべてのメールボックスがオンプレミスに存在しています。この場合、専用 Exchange ハイブリッド アプリの作成は必要ですか？**  
これまでにハイブリッド構成ウィザード (HCW) を実行したことがなく、また「[Exchange と Exchange Online 組織間の OAuth 認証を構成する](https://learn.microsoft.com/exchange/configure-oauth-authentication-between-exchange-and-exchange-online-organizations-exchange-2013-help)」ドキュメントに記載された手順も実施していない場合は、専用 Exchange ハイブリッド アプリの構成は不要です。ただし、HCW を実行したことがあり、空き時間情報、MailTips、プロフィール写真の共有などのリッチ共存機能を利用する場合は、専用 Exchange ハイブリッド アプリの作成が必要です。
