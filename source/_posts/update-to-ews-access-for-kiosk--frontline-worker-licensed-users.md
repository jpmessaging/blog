---
title: 'キオスクおよびフロントライン ワーカー ライセンス ユーザー向けの EWS アクセスに関する更新'
date: 2025-12-03
lastupdate: 2026-09-24
tags: 'Exchange Online'
---

※ この記事は、[Update to EWS Access for Kiosk / Frontline Worker Licensed Users](https://techcommunity.microsoft.com/blog/exchange/update-to-ews-access-for-kiosk--frontline-worker-licensed-users/4474299) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #66FF99;"><b>2026 年 9 月 22 日更新: </b>計画を見直し、キオスクおよびフロントライン ライセンスのユーザーに対する EWS の制限は実施しないことになりました。EWS アクセスは、<a href="/blog/exchange-online-ews-your-time-is-almost-up/">Exchange Online EWS: 廃止期限が迫っています</a>でお伝えしている、EWS 廃止の全体的なスケジュールの一部として制限されます。</p>

[Exchange Online での Exchange Web サービス (EWS) の廃止](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online) に向けた継続的な取り組みの一環として、2026 年 10 月 1 日より、EWS のライセンス権限を持たないすべてのメールボックスに対する EWS アクセスのブロックを開始する予定でした。これは、EWS のセキュリティと制御メカニズムを強化するための継続的な取り組みの一環です。

影響を受ける予定だったライセンスは以下の通りです:

- **Exchange Online Kiosk**
- **Microsoft 365 および Office 365 F1**
- **Microsoft 365 および Office 365 F3**

[Exchange Online サービスの説明](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-service-description) に記載されているように、これらのライセンスでは EWS 経由でのメールボックスへのアクセスは提供されていませんが、これまでこの制限は実施されていませんでした。この変更により、これらのライセンス タイプのみを持つユーザーの EWS アクセスはブロックされます。

EWS の使用を許可したい場合で、かつユーザーに上記のいずれかのライセンスが割り当てられている場合は、EWS アクセス権を含む新しいライセンスを割り当てる必要があります。たとえば、Exchange Online Plan 1 または Plan 2 ライセンス、あるいは Microsoft 365 や Office 365 E3 / E5 などのライセンスが該当します。

適切なライセンスなしで EWS を使用しようとした場合には、*HTTP 403* 応答が返される予定でした。

EWS のライセンス権限を持たないメールボックスに対する EWS アクセスのブロックは**中止**となりました。引き続き、組織内での EWS の利用停止を進めてください。
