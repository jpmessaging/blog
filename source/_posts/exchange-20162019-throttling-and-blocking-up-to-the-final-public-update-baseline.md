---
title: "Exchange Server 2016/2019: 最終公開更新プログラムを基準としたスロットリングとブロック"
date: 2026-09-04
lastupdate:
tags:
- Exchange
- Exchange Online
---

※ この記事は、[Exchange 2016/2019: Throttling and Blocking up to the Final Public Update Baseline](https://techcommunity.microsoft.com/blog/exchange/exchange-20162019-throttling-and-blocking-up-to-the-final-public-update-baseline/4552717) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

数年前、[継続的に脆弱な状態にある Exchange Server から Exchange Online へのメールに対するスロットリングとブロック](https://techcommunity.microsoft.com/blog/exchange/throttling-and-blocking-email-from-persistently-vulnerable-exchange-servers-to-e/3815328)についてお知らせしました。それ以来、Exchange Server のセキュリティ更新プログラムのリリースに合わせて、「許容される最も古いバージョン」を定期的に更新してきました。

これまで、この変更は告知せずに実施してきました。しかし、2026 年 9 月の第 2 週から、[OnPremises タイプの受信コネクタ](https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/inbound-connector-faq)を介して Exchange Online に接続する Exchange Server 2016 または Exchange Server 2019 に対し、許容される最も古いバージョンを、*少なくとも* [2025 年 10 月にリリースされた最後の公開更新プログラムのバージョン](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)まで引き上げます。この更新レベルは約 1 年前にリリースされているため、すべての組織で適用が完了している必要があります。

この変更には、非常に重要な意味があります。

- 変更の適用後、OnPremises タイプの受信コネクタを介して Exchange Online にメールを送信できる Exchange Server の最も古いバージョンは、2025 年 10 月の更新プログラムを適用したバージョンになります。
- **Exchange Online へのメール送信に対して許容される Exchange Server の最も古いバージョンを次回更新すると、<u>Exchange Server 2016 または Exchange Server 2019 に必要なバージョンは、一般公開されているどの更新プログラムよりも新しいバージョンになります</u>**。

次回の調整は数か月後を見込んでいます。*その時点では、[ESU プログラム](/blog/announcing-period-2-exchange-20162019-extended-security-update-esu-program/)に加入している組織と Exchange Server Subscription Edition (Exchange SE) に移行した組織だけが、Exchange Online へのメール送信時にスロットリングやブロックを受けないために必要な更新バージョンを利用できます。*

継続的に脆弱な状態にある Exchange Server から Exchange Online へのメールに対するスロットリングとブロックについて、改めて次の点をご確認ください。

- [OnPremises タイプの受信コネクタ](https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/inbound-connector-faq)を介して Exchange Online に接続するサーバーが対象です。
- その他の方法 (異なる種類のコネクタなど) で Exchange Online にメールを送信するサーバーは対象外です。
- 現時点では「組織内のすべてのサーバー」が対象になるわけではなく、OnPremises タイプの受信コネクタを介して Exchange Online に接続するサーバーだけが対象です。この点は将来変更される可能性があります。

最後に、「Exchange Online でのスロットリングとブロックを回避できる最も古いバージョン」が常に[提供されている最新バージョン](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)よりも古いからといって、最新のセキュリティ更新プログラムより前のバージョンを「安全に使用できる」と見なしているわけではありません。最新バージョンより古いバージョンには、そのバージョン以降に修正、リリース、発表されたすべての脆弱性が残っています。特に今年は Exchange Server のセキュリティ更新プログラムを多数リリースしており、[今後もしばらくはこの状況が続く可能性があります](/blog/where-is-exchange-se-cu1-anyway/)。

セキュリティを取り巻く状況が急速に変化する中、*古いバージョンの Exchange Server で組織の業務メールを運用することが安全だと考えるべきではありません*。[Exchange Server 更新プログラムに関する FAQ](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-server-update-faq) も参照してください。

追加情報: [古いオンプレミス Exchange Server に対するスロットリングとブロックを一時停止する方法](https://techcommunity.microsoft.com/blog/exchange/how-to-pause-throttling-and-blocking-of-out-of-date-on-premises-exchange-servers/4007169)