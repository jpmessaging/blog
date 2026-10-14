---
title: "Exchange Server 2016/2019 向け ESU プログラム 第 2 期 提供開始のお知らせ"
date: 2026/04/16 00:00
lastupdate: 2026-10-14
tags:
- Exchange
---

※ この記事は、[Announcing Period 2 Exchange 2016/2019 Extended Security Update (ESU) program](https://techcommunity.microsoft.com/blog/exchange/announcing-period-2-exchange-20162019-extended-security-update-esu-program/4511603) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #99ffa7ff;"><strong>更新 (2026 年 10 月 13 日):</strong> <a href="https://jpmessaging.github.io/blog/released-october-2026-exchange-server-security-updates/">Exchange Server の 2026 年 10 月のセキュリティ更新プログラム</a>をリリースしました。<em>Exchange 2016/2019 向け ESU プログラムでの更新プログラム提供は今回が最後です。</em>Exchange 2016/2019 向けの更新プログラムは今後リリースされません。<br>今後:<br>&nbsp;&nbsp;- 更新プログラムは Exchange Subscription Edition (SE) のみを対象にリリースされます。<br>&nbsp;&nbsp;- Microsoft の更新プログラムのお知らせや MSRC が公開する CVE で、Exchange 2016 と 2019 への言及はなくなります。<em>ただし、これらのバージョンが今後のセキュリティ問題の影響を受けなくなるわけではありません。</em>Exchange 2016 と 2019 の脆弱性テストも終了します。<br>&nbsp;&nbsp;- 第 2 期 ESU は限られた期間、引き続き購入できますが、2026 年 10 月のリリースまでのセキュリティ更新プログラムのみが対象です。</p>

Exchange Server 2016 と Exchange Server 2019 は、[2025 年 10 月にサポートが終了](https://techcommunity.microsoft.com/blog/exchange/t-6-months-exchange-server-2016-and-exchange-server-2019-end-of-support/4403017)しました。
一方で、Exchange Subscription Edition (SE) への移行完了に向けて、追加の時間を必要とする組織が存在するため、2025 年 10 月 ～ 2026 年 4 月 (第 1 期) の期間において [Extended Security Update (ESU) プログラム](/blog/announcing-exchange-2016--2019-extended-security-update-program/) に加入されている組織があります。

2026 年 4 月末が近づく中で、Exchange 2016/2019 から Exchange SE への移行完了には、さらに時間が必要であるという要望が一部の組織から寄せられました。

それに伴い、今回、**Exchange Server ESU プログラムの 第 2 期 が発表されました。第 2 期の期間は 2026 年 5 月から 2026 年 10 月末までの 6 か月です。** <i>これ以降の延長予定はありません。</i>

## 第 2 期 Exchange ESU プログラムの条件

- 第 2 期に参加希望の場合、**第 1 期の ESU "[ESU program (October 2025 - April 2026)](/blog/announcing-exchange-2016--2019-extended-security-update-program/)" を購入済みでも、Exchange ESU 契約の再購入が必要です。** 第 2 期は 2026 年 4 月末で終了する第 1 期の延長ではなく、別契約です。また、第 2 期へ自動的に延長されることもありません。2026 年 10 月までの追加 6 か月の保護を受けるには、第 1 期の ESU と同じ方法で再購入する必要があります。
- 第 2 期では、**Exchange Server 2016 CU23 と Exchange Server 2019 CU14/CU15** 向けのセキュリティ更新プログラム提供が計画されています。
- 2026 年 4 月 15 日以降に購入した Exchange Server ESU は、第 2 期扱いとなり、2026 年 5 月から 10 月まで有効です。第 2 期で公開される更新プログラムの入手方法は、購入後に案内されます。第 1 期の ESU プログラム入手手順は 2026 年 4 月以降の第 2 期リリースには利用できません。

**本日以降、Exchange 2016 CU23 または Exchange 2019 CU14/CU15 を利用している組織は、Microsoft アカウント チームに連絡して、第 2 期 ESU の詳細確認および購入が可能です。本日以降の日付にて、同一の製品をご購入いただくだけで結構です。** サーバー単価などの購入情報も、アカウント チームから案内されます。

## これが意味すること

- ESU は、Exchange Server 2016/2019 における<i>[サポート ライフサイクル](https://learn.microsoft.com/lifecycle/) の延長ではありません</i>。これらのサーバーは引き続きサポート対象外となるため、サポート ケースを起票することはできません。(ESU 期間中に、ESU 契約組織向けに提供された更新プログラムに起因する事象のみがサポート対象です。)
- 第 2 期 ESU は、2026 年 10 月末までに Exchange SE への移行完了が難しい組織向けに、Critical および Important のセキュリティ更新 ([Microsoft Security Response Center (MSRC) の重大度定義](https://www.microsoft.com/msrc/security-update-severity-rating-system) に基づく) を提供しうる仕組みです。リリース必要なセキュリティ更新プログラム（SU）がある場合のみ、ESU 契約組織に<i>限定して</i>提供されます。
- 第 2 期期間中に、必ずしもセキュリティ更新プログラム（SU）がリリースされるとは限りません。Exchange Server SU は [毎月必ず公開されるものではなく](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)、Critical/Important な変更がある場合に公開されます。提供の有無は、毎月の Patch Tuesday に ESU 参加組織へ通知されます。
- 第 2 期 Exchange ESU の有効期限は 2026 年 10 月末です。

## 第 2 期 Exchange ESU の対象

このプログラムは、[Microsoft Enterprise Agreement (EA)](https://www.microsoft.com/licensing/licensing-programs/enterprise) 契約の組織で、2026 年 4 月末までに Exchange 2016/2019 から Exchange SE への移行完了が難しく、現在稼働中のサーバーに対して、Critical および Important のセキュリティ保護が必要な組織を対象としています。

## FAQ

### Q. 第 1 期 ESU を購入済みなのに、なぜ第 2 期で追加契約が必要ですか?

第 2 期は 2026 年 10 月末まで有効な別契約です。元の ESU 契約組織の多くは 2026 年 4 月末までに移行を完了する見込みですので、追加の時間が必要な一部の組織には、新しい ESU 契約という選択肢の提供となります。Microsoft としては、本来 ESU の追加利用ではなく、Exchange SE への移行完了を優先していただきたいと考えています。

### Q. 第 1 期を購入していなくても、第 2 期だけ購入できますか?

はい。第 2 期 ESU は第 1 期 ESU と独立して購入できます。
ただし、第 2 期で取得できるのは第 2 期開始後に公開される更新のみです。第 1 期期間中の更新パッケージ自体にはアクセスできません。
一方で、更新は[累積型](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-server-update-faq)であるため、第 2 期で更新が公開された場合には第 1 期期間の修正も含まれます。

### Q. ESU のライセンスと更新配布はどうなりますか?

第 2 期の更新配布プロセスは第 1 期と同様です。第 2 期プログラム契約後、該当する更新プログラムの入手方法が案内されます。Microsoft 365 管理センターやボリューム ライセンスに、専用キーや特別なライセンスが追加される方式ではありません。第 2 期 SKU の購入後、新しい ESU User Guide が提供されます。

### Q. Exchange サーバーは、Exchange Online へのメール送信時にスロットリングまたはブロックの影響を受けています。この問題に対処できるよう、すべての組織に ESU 更新プログラムを提供しない理由は何でしょうか。

脆弱性対応が遅れている Exchange Server に対する [スロットリング/ブロック](https://techcommunity.microsoft.com/blog/exchange/throttling-and-blocking-email-from-persistently-vulnerable-exchange-servers-to-e/3815328) が発生している場合、[稼働中のバージョン](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates) がかなり古い可能性があります。まずは、公開済みである 2025 年 10 月版 (Exchange 2016/2019 向け最終公開版) の更新を適用することで、直近の対処が可能です。<i>この対処に ESU は必須ではありません。</i>ただし、その状態でもサポート対象外であることは変わらないため、サポート対象バージョンへの移行を早期に進める必要があります。

### Q. ボリューム ライセンス契約があれば ESU は自動付与されますか? Exchange ESU はどこで購入できますか?

Exchange ESU は各組織が Microsoft のアカウント チーム経由で明示的に購入する別契約です ([Microsoft Enterprise Agreement](https://www.microsoft.com/licensing/licensing-programs/enterprise) が必要)。ボリューム ライセンスや Software Assurance へ自動付与されるものではありません。

### Q. ESU を購入したのに更新の取得方法が分かりません。

<i>ESU 購入済み</i>で最新のセキュリティ更新プログラム（SU）の入手手順が不明な場合は、ExchangeandSfBServerESUInquiry@service.microsoft.com へ連絡してください。必要に応じてアカウント チームを CC に含めて良いです。

引き続き、第 2 期 ESU の利用よりも Exchange SE への移行を優先することが推奨されています。やむを得ず第 2 期 ESU が必要な場合は、Microsoft のアカウント チームへお問い合わせください。

また、Skype for Business Server 2015/2019 向けにも同様の第 2 期プログラムが案内されています。詳細について [こちら](https://techcommunity.microsoft.com/blog/skype_for_business_blog/announcing-%e2%80%9cperiod-2%e2%80%9d-for-skype-for-business-server-20152019-extended-security-u/4511619) を参照してください。
