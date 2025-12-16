---
title: 'キオスクおよびフロントライン ワーカー ライセンス ユーザー向けの EWS アクセスに関する更新'
date: 2025-12-03
lastupdate: 2025-12-16
tags: 'Exchange Online'
---

※ この記事は、[Update to EWS Access for Kiosk / Frontline Worker Licensed Users](https://techcommunity.microsoft.com/blog/exchange/update-to-ews-access-for-kiosk--frontline-worker-licensed-users/4474299) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #66FF99;"><strong>2025 年 12 月 15 日更新: </strong>お客様からのフィードバックを受け、この変更の開始日を <strong>2026 年 6 月末</strong>に延期しました。この期間を利用して、EWS に対する依存の解消を進めてください。</p>

[Exchange Online での Exchange Web サービス (EWS) の廃止](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online) に向けた継続的な取り組みの一環として、2026 年 6 月末より、EWS のライセンス権限を持たないすべてのメールボックスへのアクセスをブロックします。これは、EWS のセキュリティと制御メカニズムを強化するための継続的な取り組みの一環です。

影響を受けるライセンスは以下の通りです:

- **Exchange Online Kiosk**
- **Microsoft 365 および Office 365 F1**
- **Microsoft 365 および Office 365 F3**

[Exchange Online サービスの説明](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-service-description) に記載されているように、これらのライセンスでは EWS 経由でのメールボックスへのアクセスは提供されていませんが、これまでこの制限は実施されていませんでした。この変更により、これらのライセンス タイプのみを持つユーザーの EWS アクセスはブロックされます。

EWS の使用を許可したい場合で、かつユーザーに上記のいずれかのライセンスが割り当てられている場合は、EWS アクセス権を含む新しいライセンスを割り当てる必要があります。たとえば、Exchange Online Plan 1 または Plan 2 ライセンス、あるいは Microsoft 365 や Office 365 E3 / E5 などのライセンスが該当します。

2026 年 6 月末以降、適切なライセンスなしで EWS を使用しようとすると、HTTP 403 エラーが返されます。
