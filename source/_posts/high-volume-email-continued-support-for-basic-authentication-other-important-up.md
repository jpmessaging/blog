---
title: High Volume Email (HVE) に関する基本認証の継続サポートとその他重要な更新情報
date: 2025-05-08 15:00:00
lastupdate: 
tags: Exchange Online
---

※ この記事は、[High Volume Email: Continued support for Basic Authentication & other important updates](https://techcommunity.microsoft.com/blog/exchange/high-volume-email-continued-support-for-basic-authentication--other-important-up/4411197) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft 365 の High Volume Email (HVE) は、内部受信者に対して大量のメールを送信する機能を提供し、受信者数の制限がありません。HVE のパブリック プレビューは [2024 年 4 月 1 日](https://techcommunity.microsoft.com/t5/exchange-team-blog/public-preview-high-volume-email-for-microsoft-365/ba-p/4102271) にリリースされ、2025 年 9 月の一般提供開始を目指しています。

この発表では、High Volume Email (HVE) に関する重要な更新情報をお届けします。具体的には、基本認証のサポートが 2028 年 9 月まで継続されること、HVE が内部受信者専用の機能に焦点を当てること、そして現在のパブリック プレビューの制限に変更が加えられることが含まれます。

### 基本認証のサポート継続について

本日、High Volume Email における基本認証のサポートを 2028 年 9 月まで継続することを発表いたします。この決定は、現在の認証ニーズをサポートしつつ、先進認証方式への円滑な移行を確実にするという、私たちの継続的な取り組みの一環です。

先進認証 (OAuth) を使用することでより安全なセキュリティ基盤を確保することを強く推奨していますが、一部の業務アプリケーションやデバイスでは、まだ先進認証をサポートしていない場合があることも認識しています。

移行期間中も引き続きサポートとガイダンスを提供してまいります。スムーズな移行プロセスを確保するため、定期的にリマインダーや更新情報を共有し、2028 年 9 月に予定されている HVE における基本認証の延長サポート終了に向けて準備を進めていただけるよう支援いたします。

#### なぜ先進認証が必要なのか？

10 月の [パブリック プレビューの更新](https://techcommunity.microsoft.com/blog/exchange/updates-to-high-volume-email-hve-public-preview/4266563)の一環として、HVE に対する OAuth サポートが追加されました。この機会に、OAuth の強化されたセキュリティ機能を活用するための移行計画を開始することをお勧めします。

先進認証方式 (OAuth など) は、基本認証と比較して、より安全で堅牢な認証メカニズムを提供します。これにより、さまざまなセキュリティ脅威からの保護が強化され、メール通信の安全性が向上します。主なセキュリティ上の利点は以下の通りです。

- 資格情報の盗難に対する強化されたセキュリティと保護 : 先進認証は、単純なユーザー名とパスワードの組み合わせを超えた複数の保護レイヤーを提供します。アプリケーションやリソースごとに固有に発行されるトークンを使用することで、資格情報の盗難や再利用のリスクを大幅に軽減します。

- 動的なトークン管理 : これらの短命なアクセス トークンは迅速に期限切れとなり、万が一侵害された場合でも即座に無効化することが可能です。

- [条件付きアクセス](https://learn.microsoft.com/entra/identity/conditional-access/overview) ポリシー : 先進認証は、誰がどのリソースにどこから、どのデバイスを使用してアクセスしようとしているかについて、インテリジェントな判断を可能にし、より正確で詳細なアクセス制御を提供します。

基本認証のセキュリティ リスクと、Exchange Online において段階的に廃止されている理由についての詳細は、[こちら](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online)をご覧ください。

### 内部受信者専用機能への特化

今後、HVE はテナント内の内部受信者向けのメッセージング機能に特化したサポートを提供します。その結果、外部受信者へのメール送信機能は削除されます。これにより、内部受信者に対しては受信者数の制限なく大量のメールを送信できるようになります。

この変更は、Microsoft 365 エコシステム内での HVE の目的を明確に定義し、メール機能を簡素化することを目的としています。外部受信者向けに大量のメールを送信する必要があるシナリオについては、[Azure Communication Services (ACS) for email](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview) の利用をお勧めします。

2025 年 6 月以降、HVE から外部送信機能が削除される予定です。

### パブリック プレビューの制限の撤廃

HVE のパブリック プレビューの制限の撤廃を発表いたします。この変更が適用されると、最大 100 の HVE アカウントを作成できるようになり、内部受信者に対する送信制限が撤廃されます。

これらの変更は、今後数週間以内に実施される予定です。これにより、HVE の機能を最大限に活用し、内部コミュニケーションのニーズに対応することが可能になります。

| **機能** | **以前の制限** | **新しい制限** |
| --- | --- | --- |
| HVE アカウント数 | 20 | 100 |
| 受信者レート制限 | 1 日あたり 100,000 件（テナントごと） | 制限なし |
| 外部受信者レート制限 | 1 日あたり 2,000 件（テナントごと） | <span style="color:red">0（サポート対象外）</span> <br><br>外部受信者向けに大量のメールを送信する必要がある場合は、[Azure Communication Services (ACS) for email](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview) の利用をご検討ください。 |

HVE にご関心をお寄せいただきありがとうございます！ぜひ皆さまのご意見やフィードバックをお聞かせください。
