---
title: "Exchange SE ハイブリッドのオンプレミス リッチ共存を Graph API に移行する方法"
date: 2026-05-08 10:00
lastupdate: 2026-09-03
tags:
- Exchange
---

※ この記事は、[Update Your Exchange SE Hybrid On-premises Rich Coexistence to Graph](https://techcommunity.microsoft.com/blog/exchange/update-your-exchange-se-hybrid-on-premises-rich-coexistence-to-graph/4517520) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

約 1 年前に、[ハイブリッド展開における Exchange Server のセキュリティ変更](/blog/exchange-server-security-changes-for-hybrid-deployments/) を案内しました。この変更は、一部のメールボックスをオンプレミスでホストしていて、オンプレミス ユーザーが Exchange Online ユーザーとのリッチ共存機能 (空き時間情報の参照、メール ヒント、プロフィール写真の共有) を必要とする Exchange ハイブリッド環境に影響するものです。

この変更は、次の 2 段階で計画されていました。

- ステージ 1: Exchange ハイブリッド専用アプリへの移行。これは 2025 年 10 月に完了しました。オンプレミスでメールボックスをホストしている Exchange ハイブリッド環境では、オンプレミス ユーザーのリッチ共存機能を維持するために、Exchange ハイブリッド専用アプリの作成が必要になっています。
- ステージ 2: Exchange ハイブリッドにおける EWS 呼び出しの廃止と、REST ベースの Microsoft Graph API 呼び出しへの切り替え。現在はこの段階にあります。なお、リッチ共存のすべてのシナリオがまだ完全にサポートされているわけではなく、すべてのクラウド環境で Graph API を使ったハイブリッド呼び出しを利用できるわけでもありません。詳細は、[ドキュメント](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#configure-graph-api-permissions) をご確認ください。

Exchange Online における Exchange Web Services (EWS) の廃止は最終段階に近づいています。詳細は、[Exchange Online EWS: 廃止期限が迫っています](/blog/exchange-online-ews-your-time-is-almost-up/) をご確認ください。このため、リッチ共存機能を必要とするすべての組織は、[ステージ 1 をすでに完了している場合](/blog/exchange-server-security-changes-for-hybrid-deployments/) も含めて、オンプレミス環境に Exchange Server Subscription Edition (Exchange SE) の更新プログラムをインストールし、Exchange ハイブリッド専用アプリの権限を、より細かい Graph API の権限モデルへ切り替える必要があります。この対応は、EWS が既定で無効化される 2026 年 10 月より前に完了する必要があります。遅くとも、Exchange Online で EWS が恒久的に無効化される 2027 年 4 月までには完了が必要です。

次の図は、ハイブリッド セキュリティ強化のタイムラインにおけるステージ 2 を示しています。

![](stage2-timeline.jpg)

#### Graph API をハイブリッド ワークフローで使い始める Exchange ハイブリッド利用組織が実施すべきこと

ステップ 1: オンプレミスの Exchange SE サーバーに、2026 年 5 月の Hotfix Update (またはそれ以降) をインストールします。

- 関連リンク: [2026 年 5 月の Exchange Server の Hotfix 更新プログラムが公開されました](/blog/released-may-2026-exchange-server-hotfix-update/)

ステップ 2: すべてのオンプレミス Exchange SE サーバーに更新プログラムのインストールが完了したら、サポートされているシナリオで Graph API ベースのハイブリッド ワークフローを有効化するため、[ドキュメント](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app) に記載された手順を実施します。過去にスクリプトを実行済みの場合でも、新しい機能を有効化するには、更新プログラムのインストール後にスクリプトを再度実行する必要があります。

**注:** [Exchange 2016 と Exchange 2019 はサポートが終了しています](https://learn.microsoft.com/troubleshoot/exchange/administration/exchange-2019-2016-end-of-support)。これらのバージョン向けに、Graph API を利用するハイブリッド呼び出しのための更新プログラムは提供されません ([Exchange 2016/2019 の ESU](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/) として提供される更新プログラムにも、Graph API を利用するハイブリッド呼び出し機能は含まれません)。引き続き Exchange 2016 または Exchange 2019 サーバーでオンプレミスのメールボックスをホストしている場合、[2026 年 10 月以降もテナントで EWS の利用を許可し続ける](/blog/exchange-online-ews-your-time-is-almost-up/) 必要があり、2027 年 4 月までにすべてのサーバーを Exchange SE にアップグレードする必要があります (この時点で Exchange Online の EWS は無効化されます)。サポート対象外のバージョンでは、リッチ共存機能は 2027 年 4 月に恒久的に動作しなくなります。できるだけ早く、サポート対象外のオンプレミス環境をアップグレードしてください。サポート対象外のバージョンを運用し続けることは、環境を危険にさらす可能性があります。

Exchange ハイブリッド専用アプリの作成と利用に関する FAQ は、[機能ドキュメント](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#frequently-asked-questions) をご確認ください。

#### 既知の問題

- オンプレミスで Outlook クライアントを使用している Exchange SE ユーザーが、Graph 経由で Exchange Online メールボックスの空き時間情報を参照すると、誤ったタイム ゾーンの情報が表示される問題を確認しています。この問題には、今後の Exchange SE の更新プログラムで対応する予定です。回避策として、空き時間情報の参照における Graph の使用を無効にするか、Outlook on the web (Ootw) を使用する方法があります。

この記事の更新内容:

- 2026 年 8 月 31 日: Outlook クライアントでタイム ゾーンがずれる既知の問題を追加しました。
- 2026 年 5 月 8 日: 過去にスクリプトを実行済みの場合でも、新しい機能を有効化するには再度実行する必要があることを明確にしました (上記のステップ 2)。
