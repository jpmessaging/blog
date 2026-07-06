---
title: "Outlook アドイン API 要件セット 1.16 が利用可能になりました"
date: 2026/07/7
tags: Microsoft 365 Developer 
---

※ この記事は、[Mailbox requirement set 1.16 now available for Outlook add-ins](https://devblogs.microsoft.com/microsoft365dev/mailbox-requirement-set-1-16-now-available-for-outlook-add-ins/) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Outlook アドイン向け [Outlook アドイン API 要件セット 1.16](https://learn.microsoft.com/javascript/api/requirement-sets/outlook/outlook-requirement-set-1-16) が一般提供になりました。今回のリリースは、メッセージと情報のセキュリティ強化に注力するとともに、COM/VSTO アドインと Web アドインの機能ギャップを埋めるための継続的な取り組みを反映しています。

Mailbox 1.16 では、以下の API とプラットフォームの更新が導入されています。

- イベント ベースのワークフローで、保護されたメッセージや添付ファイルを復号できる。
- 組織内で Exchange Web Services (EWS) トークンがサポートされているかどうかを確認できる。
- メール アイテム内のインライン添付ファイルを簡単に識別できる。
- メール アイテムから、従来より多くの受信者情報を取得できる。
- SessionData の保存容量が拡張され、セッション中により多くのデータを保持できる。

## メッセージの復号を簡単に実装

Outlook アドイン API 要件セット 1.16 では、新たに [OnMessageDecrypt](https://learn.microsoft.com/office/dev/add-ins/outlook/encryption-decryption) イベントが追加されました。これにより、ユーザーが保護されたメッセージを開いたときに、Outlook アドインは自動的に復号できます。イベント ベースのワークフローは、暗号化されたメッセージの識別、メッセージの復号、復号後コンテンツの表示、必要に応じたエラー通知の表示までを処理します。このワークフローが処理に必要な一連の操作を担うため、開発者はアドイン内では組織のセキュリティ要件を満たす暗号化および復号化プロトコルの定義と実装に集中できます。

アドインでの復号機能を実装する方法について詳しくは、[暗号化 Outlook アドインを作成する](https://learn.microsoft.com/office/dev/add-ins/outlook/encryption-decryption) を参照してください。また、復号アドインのサンプルを実際に試す場合は、[Outlook でメッセージを暗号化および復号するサンプル](https://github.com/OfficeDev/Office-Add-in-samples/tree/main/Samples/outlook-encrypt-decrypt-messages) をご利用ください。

## 組織内での EWS トークン対応状況を確認

Exchange Online 環境では EWS トークンは既に無効化されていますが、一部の組織では引き続きオンプレミス環境を運用しています。[Office.context.mailbox.diagnostics.ews.getTokenStatusAsync](https://learn.microsoft.com/javascript/api/outlook/office.diagnostics#outlook-office-diagnostics-ews-member) API の導入により、アドインは組織内で EWS コールバック トークンがサポートされているかどうかを判定できるようになりました。これにより、利用可能な環境では推奨される認証方式を使用しながら、必要に応じて従来環境との互換性も維持することができます。

## データ損失防止とコンテンツ処理ワークフローを強化

Mailbox 1.16 では、データ損失防止とコンテンツ処理のシナリオをサポートするために、既存 API も強化されています。

- [contentId](https://learn.microsoft.com/javascript/api/requirement-sets/outlook/outlook-requirement-set-1-16#api-list) プロパティによって添付ファイル API が拡張され、コンテンツ検査やレンダリングのワークフローで、メール アイテム内のインライン添付ファイルを簡単に識別できるようになります。
- Recipients API の [getAsync](https://learn.microsoft.com/javascript/api/outlook/office.recipients#outlook-office-recipients-getasync-member%281%29) メソッドは、メール アイテム内の任意の受信者フィールドから最大 1,000 件の受信者を返せるようになりました。この上限の拡張により、データ損失防止ソリューションは、より多くの受信者を 1 回の処理で評価できるようになります。
- [SessionData](https://learn.microsoft.com/javascript/api/outlook/office.sessiondata) オブジェクトは、アドインごとに最大 2,621,440 文字までサポートするようになりました。これにより、アドインは一つのセッション内で、より多くのデータをシームレスに保存および取得できるようになります。

ぜひ Outlook アドインで新しい Mailbox 1.16 の新機能をご活用ください。Happy coding!