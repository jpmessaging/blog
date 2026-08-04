---
title: クラウド管理のリモート メールボックス向けの書き戻しが一般提供になりました
date: 2026-08-04
tags:
- Exchange
---

※ この記事は、[Writeback for Cloud-Managed Remote Mailboxes: Now Generally Available](https://techcommunity.microsoft.com/blog/exchange/writeback-for-cloud-managed-remote-mailboxes-now-generally-available/4543507) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

5 月に、[クラウド管理のリモート メールボックス向けの書き戻しのパブリック プレビュー](/blog/writeback-for-cloud-managed-remote-mailboxes-now-in-public-preview/)を発表しました。それ以来、多くのお客様がこの機能を有効にし、フィードバックを寄せてくださいました。このたび、クラウド管理のリモート メールボックス向けの書き戻しが一般提供 (GA) になりました。

書き戻しは、WW、GCCH、DoD、21Vianet の各環境で利用でき、テナントあたり最大 600,000 個のクラウド管理メールボックスをサポートします。

### 簡単なおさらい

クラウド管理のリモート メールボックスでは、ディレクトリ同期されたメールボックスの `IsExchangeCloudManaged` を `true` に設定することで、Exchange 属性の Source of Authority (SOA) を Exchange Online に移行できます。

ユーザー ID は引き続きオンプレミスの Active Directory から同期されますが、Exchange 属性は Exchange Online で編集できるようになります。管理者は、Exchange Online PowerShell、Exchange 管理センター、Microsoft 365 管理センターからこれらのプロパティを更新できます。

書き戻しはこの機能を拡張し、Exchange 属性に対する重要な一連の変更を、Microsoft Entra Cloud Sync を通じて Exchange Online からオンプレミスの Active Directory に同期します。これは、オンプレミスの基幹業務アプリケーションが Active Directory から Exchange 属性を引き続き読み取る組織に役立ちます。

Microsoft Entra Connect Sync をすでに使用している場合でも、アンインストールや置き換えは必要ありません。Cloud Sync は Connect Sync と並行して動作します。

- Connect Sync は、これまでどおりディレクトリ ID と属性を同期します。
- Cloud Sync は、Exchange 属性の書き戻しを処理します。

### 一般提供での変更点

#### 最大 600,000 個のクラウド管理メールボックスをサポート

パブリック プレビュー期間中、書き戻しはクラウド管理メールボックスが 200,000 個未満のテナントをサポートしていました。一般提供では、テナントあたり 600,000 個のクラウド管理メールボックスまでサポートします。

この上限の引き上げにより、大規模な組織でも、オンプレミスの Active Directory で必要な Exchange 属性の値を最新の状態に保ちながら、Exchange 属性をクラウドで管理できるようになります。

#### `mail` 属性の書き戻し

パブリック プレビュー期間中に最も多く寄せられた要望の 1 つが、オンプレミスの Active Directory への `mail` 属性の書き戻しでした。

このフィードバックを受け、一般提供では、サポートされる書き戻し対象に `mail` 属性を追加しました。Exchange Online で `WindowsEmailAddress` に加えた変更を、Active Directory の対応する `mail` 属性へ書き戻せるようになりました。

書き戻しでは、次の属性を含む 24 個の属性がサポートされるようになりました。

- `extensionAttribute1` から `extensionAttribute15`
- `msExchExtensionCustomAttribute1` から `msExchExtensionCustomAttribute5`
- `msExchRecipientDisplayType`
- `msExchRecipientTypeDetails`
- `proxyAddresses`
- `mail`

属性の完全な一覧は、[ID、Exchange 属性、および書き戻し](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management#identity-exchange-attributes-and-writeback)をご確認ください。

### 既存のパブリック プレビュー構成では 1 つの更新が必要

2026 年 8 月 3 日以降に作成された Exchange 属性の書き戻し構成では、`mail` 属性の書き戻しが既定で有効になります。新たに作成された構成では、追加の操作は必要ありません。

2026 年 8 月 3 日より前に作成された構成は、`mail` 属性を書き戻すように自動更新されません。パブリック プレビュー期間中に書き戻しを有効にした場合は、次の手順を実行してください。

1. Microsoft Entra 管理センターで、Exchange Online 属性の書き戻し構成を開きます。
2. **[属性マッピング]** を選択し、**[既定のマッピングに戻す]** を選択します。
3. 同期ジョブが再起動すると、`mail` 属性の書き戻しが有効になります。

詳しい手順は、ドキュメントの[よく寄せられる質問](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management#frequently-asked-questions)をご確認ください。

### テナント全体の SOA に関する重要な注意事項

テナント全体の Exchange 属性 SOA は、Exchange Online へのメールボックス移行が完了し、オンプレミスで Exchange メールボックス、メールが有効なユーザー、リモート メールボックスを作成しなくなった組織を対象としています。

オンプレミスのメールボックス移行や受信者の作成を続けている間は、テナント全体の SOA を有効にしないでください。有効にすると、新しく同期された Exchange 受信者が、Exchange Online で必要な `MailUser` を持たない ID のみのユーザーとして Microsoft Entra ID に表示される場合があります。その結果、メールボックスのオンボーディングと移行がブロックされます。

テナント全体の SOA を有効にする前に、[ハイブリッド環境でのリモート メールボックスの Exchange 属性のクラウド ベースの管理](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management)に記載されている前提条件とガイダンスをご確認ください。

### 最後の Exchange Server の廃止に向けて

Exchange 属性のクラウド管理と書き戻しを利用すると、ID の管理に Active Directory を引き続き使用しながら、受信者管理におけるオンプレミスの Exchange Server への依存を解消できます。

サーバーを廃止する準備ができたら、[SOA をクラウドへ移した後に最後の Exchange Server を廃止する](https://learn.microsoft.com/exchange/hybrid-deployment/decommission-last-exchange-server)の手順に従ってください。このガイドでは、前提条件、ハイブリッド構成のクリーンアップ、Exchange Server のアンインストール、アンインストール後の Exchange Online のクリーンアップについて説明しています。

Exchange 属性の SOA は、Exchange Online メールボックスを持つユーザー オブジェクトに適用されます。メールが有効なグループやメール連絡先をクラウドから管理する場合は、グループ SOA または連絡先 SOA の移行を使用してください。

### 始めるには

- [ハイブリッド環境でのリモート メールボックスの Exchange 属性のクラウド ベースの管理](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management)を確認する。
- [Exchange 属性の書き戻しを有効にする方法](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management#how-to-enable-exchange-attribute-writeback)に従って構成する。
- [書き戻し属性の完全な一覧](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management#identity-exchange-attributes-and-writeback)を確認する。
- [最後の Exchange Server の廃止ガイド](https://learn.microsoft.com/exchange/hybrid-deployment/decommission-last-exchange-server)を読む。

パブリック プレビューに参加し、フィードバックをお寄せくださった皆さまに感謝します。皆さまのご意見を受けて、一般提供では `mail` 属性の書き戻しを追加しました。

一般提供版を利用した感想を伺えることを楽しみにしています。
