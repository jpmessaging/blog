---
title: クラウド管理のリモート メールボックス向けの書き戻しがパブリック プレビューになりました
date: 2026/05/18
tags:
- Exchange
---

※ この記事は、[Writeback for Cloud-Managed Remote Mailboxes: Now in Public Preview](https://techcommunity.microsoft.com/blog/exchange/writeback-for-cloud-managed-remote-mailboxes-now-in-public-preview/4520138) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

前回の記事では、[クラウド管理のリモート メールボックスのパブリック プレビュー](/blog/introducing-cloud-managed-remote-mailboxes-a-step-to-last-exchange-server-retire/)と[クラウド管理のリモート メールボックスの一般提供](/blog/cloud-managed-remote-mailboxes-now-generally-available/)をご紹介しました。これは、組織内の "最後の Exchange Server" を廃止するための重要な一歩です。コミュニティからの反響は大きく、寄せられたフィードバックは今後のロードマップにも反映されています。

今回は、この取り組みに関する 2 つの新しいマイルストーンをお知らせします。

1. [**クラウド管理のリモート メールボックス向けの書き戻し**](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management#how-to-enable-exchange-attribute-writeback)が**パブリック プレビュー**になりました。
2. 最後の Exchange Server への依存がもう残っていない組織向けに、[**SOA をクラウドへ移した後に最後の Exchange Server を廃止する**](https://learn.microsoft.com/exchange/hybrid-deployment/decommission-last-exchange-server)ガイドを Microsoft Learn で公開しました。

### クラウド管理のリモート メールボックス向けの書き戻し: パブリック プレビュー

ディレクトリ同期されたメールボックスで IsExchangeCloudManaged を True に設定すると、Exchange 属性の Source of Authority (SOA) は Exchange Online に移ります。氏名や部署などの ID 属性の SOA は引き続きオンプレミスの Active Directory に残りますが、proxy addresses、アドレス帳への表示 / 非表示、カスタム属性などの Exchange 関連属性はクラウドで編集できるようになります。

これまでは、Exchange 属性の SOA をクラウドへ移しても、その属性はクラウド側で編集できるだけで、オンプレミス AD には戻りませんでした。これは、proxyAddresses やカスタム属性などをオンプレミス AD から直接参照する基幹業務アプリケーションを使っている組織にとって課題でした。SOA がクラウドに移ると、オンプレミス AD 側にあるこれらの属性は、クラウド側の値とずれていく可能性があったためです。

**そのギャップを埋めるのが Writeback (書き戻し) です。** 書き戻しを有効にすると、Exchange Online で対象の Exchange 属性に加えた変更が、Microsoft Entra Cloud Sync を通じてオンプレミスの Active Directory に自動的に書き戻されます。これにより、オンプレミス AD の情報を最新の状態に保ちつつ、Exchange 属性の SOA をクラウドへ移した後も基幹業務アプリケーションを継続して利用できます。

#### 動作の仕組み

書き戻しでは、Exchange Online からオンプレミス AD への転送に **Microsoft Entra Cloud Sync** を利用します。すでに Microsoft Entra Connect Sync を利用している場合でも、アンインストールや置き換えは**不要**です。Cloud Sync は Connect Sync と並行して動作し、Connect Sync はこれまで通りディレクトリ同期を担当し、Cloud Sync は Exchange 属性の書き戻しだけを担当します。既存のメールボックスやユーザー、同期構成に影響はありません。

Cloud Sync のプロビジョニング エージェントのインストール、書き戻し用の同期ジョブの構成、往復同期の確認手順は、次のドキュメントにまとまっています : [ハイブリッド環境でのリモート メールボックスの Exchange 属性のクラウド ベースの管理](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management)

#### パブリック プレビュー中の制限と GA の予定

パブリック プレビュー期間中、書き戻しは **200,000 未満のクラウド管理メールボックス**を持つテナントをサポートします。この上限は、現在 **2026 年 6 月末**を予定している一般提供 (GA) のタイミングで引き上げる予定です。

どの属性が AD に書き戻され、どの属性が書き戻されないかを含む完全な一覧は、[ID、Exchange 属性、および書き戻し](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management#identity-exchange-attributes-and-writeback)で確認できます。

### 新しいドキュメント: 最後の Exchange Server を廃止する

メールボックスがクラウド管理となり、必要であれば書き戻しも準備できたら、次に気になるのは "では、最後の Exchange Server をどうやって実際に廃止するのか" です。

この手順を最初から最後まで説明する新しいガイドとして、[SOA をクラウドへ移した後に最後の Exchange Server を廃止する](https://learn.microsoft.com/exchange/hybrid-deployment/decommission-last-exchange-server)を公開しました。

このガイドでは、次の内容を扱っています。

- **前提条件 :** すべてのメールボックスとパブリック フォルダーが Exchange Online に移行済みであること、すべてのディレクトリ同期メールボックスがクラウド管理になっていること、DNS とメール ルーティングが Exchange Online を向いていること、SMTP リレーの依存関係を移行済みであることを確認します。
- **削除前の確認 :** 環境が変わっている可能性もあるため、作業を始める直前に前提条件をあらためて確認します。
- **ハイブリッド構成のクリーンアップ (Exchange 稼働中) :** Hybrid Configuration オブジェクト、HCW が作成した IntraOrganizationConnector、ハイブリッド コネクタ、組織の関係、フェデレーション信頼と証明書、OAuth サービス プリンシパル資格情報、Hybrid Agent (モダン ハイブリッドのみ) を削除します。
- **最後の Exchange Server のアンインストール :** 最終的なアンインストール前チェックを行い、`Setup /m:Uninstall` を実行します。
- **Exchange Online 側のハイブリッド クリーンアップ (アンインストール後) :** オンプレミス側のアンインストールでは削除されない、クラウド側の孤立したハイブリッド オブジェクトを削除します。

これまで、最後の Exchange Server の削除手順が最初から最後まで明確に文書化されていないことを理由に作業を保留していた場合は、まさにそのためのドキュメントです。

### 始めるには

書き戻しのパブリック プレビュー開始を待っていたなら、今が着手のタイミングです。

- 書き戻しの設定手順と属性一覧について、[更新されたドキュメント](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management)を確認する。
- エンドツーエンドのアンインストール手順について、[新しい廃止ガイド](https://learn.microsoft.com/exchange/hybrid-deployment/decommission-last-exchange-server)を読む。
- 書き戻しの 200k 制限が導入の妨げになっている場合は、[こちらのフォーム](https://forms.cloud.microsoft/r/tAv0KeZ4RK)から連絡する。GA のタイミングで上限を引き上げる予定ですが、どの規模であれば導入できるのか把握したいとしています。
- コメント欄で経験や提案を共有する。これまでのリリースもフィードバックに支えられており、今回も同じようにお客様の声を求めています。

"AD を同期しているから" という理由だけで Exchange Server を維持する時代は、終わりに近づいています。
