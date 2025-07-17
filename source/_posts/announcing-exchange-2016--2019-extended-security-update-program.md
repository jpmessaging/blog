---
title: 'Exchange 2016 / 2019 向け拡張セキュリティ更新プログラムを発表'
date: 2025-7-17 11:00:00
lastupdate:
tags:
- Exchange
---

※ この記事は、[Announcing Exchange 2016 / 2019 Extended Security Update program](https://techcommunity.microsoft.com/blog/exchange/announcing-exchange-2016--2019-extended-security-update-program/4433495) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange 2016 および 2019 は [2025 年 10 月にサポートが終了します](/blog/t-6-months-exchange-server-2016-and-exchange-server-2019-end-of-support)。一部のお客様からは、Exchange Subscription Edition (SE) への移行を開始しているものの、移行完了までにもう数か月間、Exchange 2016 / 2019 サーバー向けのセキュリティ更新プログラム (SU) が必要になる場合がある、というご要望をいただいています。

このようなお客様向けに、解決策を用意しました。<b><span style="color:#169179">2025 年 8 月 1 日</span>より、Microsoft アカウント チームに確認することで、Exchange 2016 / 2019 サーバー向けの 6 か月間の追加の Extended Security Update (ESU) の案内を受け購入することができます。</b> 2025 年 8 月 1 日以降、アカウント チームより、1 サーバーあたりの費用や購入・受領方法などの詳細情報を提供します。

### これは何を意味するのか？

- この ESU は Exchange 2016 / 2019 の「サポート ライフサイクルの延長」([Microsoft Lifecycle Policy | Microsoft Learn](https://learn.microsoft.com/lifecycle/)) では*ありません*。これらのサーバーは 2025 年 10 月 14 日にサポートが終了し、ESU 期間中に ESU 対象の SU に関連する問題以外では技術サポートを受けることはできません。
- この ESU は、2025 年 10 月 14 日までに Exchange SE への移行を完了できないお客様が、Critical および Important ([Microsoft Security Response Center (MSRC) scoring](https://www.microsoft.com/msrc/security-update-severity-rating-system) で定義) に該当する更新プログラム (SU) を、2025 年 10 月以降にリリースが必要となった場合に限り、受け取ることができる仕組みです。これらの SU は ESU 契約者にのみ*個別に*提供され、2025 年 10 月以降は Exchange 2016 / 2019 用の SU が Download Center や Windows Update で公開されることはありません。
- ESU 期間中に必ずしも SU をリリースすることを約束するものではありません。Exchange Server では、[毎月必ず SU が提供されるわけではなく](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)、Critical または Important なセキュリティ修正が必要な場合のみリリースされます。そのため、ESU 期間中にリリースが必要な SU がなければ、更新プログラムの提供はありません。ただし、ESU 契約者には毎月の Patch Tuesday (第 2 火曜日) ごとに、SU の有無をお知らせします。
- この ESU は 6 か月間のみ有効 (2026 年 4 月 14 日まで) です。この期間が*2026 年 4 月以降に延長されることはありません* (延長を申請する必要はありません)。

### Exchange 2016 / 2019 ESU の対象となるお客様は？

このプログラムは、Exchange 2016 / 2019 のサポート ライフサイクル終了までに Exchange SE への移行を完了できず、すでに Exchange 2016 CU23 または Exchange 2019 CU14/CU15 を利用しており、引き続き稼働中の旧バージョン サーバーに対して Critical および Important のセキュリティ対応が必要なお客様のみを対象としています。

- お客様には、この ESU に依存せず、できるだけ早く [Exchange SE へのアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/) をご検討いただくことを強く推奨します。
- Exchange 2019 をご利用中のお客様は、[インプレース アップグレードによる Exchange SE への移行](/blog/why-in-place-upgrade-from-exchange-2019-to-exchange-se-is-low-risk/) を早期に実施し、Exchange SE のモダン ライフサイクル ポリシーへ移行してください。

できる限りこの ESU プログラムに頼らず、期限までに Exchange SE への移行を進めてください。やむを得ず ESU の利用が必要な場合は、2025 年 8 月 1 日以降に Microsoft のアカウント チームまで詳細をご相談ください。

同様のプログラムは、Skype for Business 2015 / 2019 をご利用のお客様向けにも提供されています。詳細は[こちら](https://techcommunity.microsoft.com/blog/skype_for_business_blog/announcing-skype-for-business-2015--2019-extended-security-update-program/4433493)をご覧ください。
