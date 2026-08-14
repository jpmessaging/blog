---
title: "Exchange SE CU1 の行方は？"
date: 2026-08-14 17:00
lastupdate: 
tags:
- Exchange
---
※ この記事は、[Where is Exchange SE CU1 anyway?](https://techcommunity.microsoft.com/blog/exchange/where-is-exchange-se-cu1-anyway/4546837) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange SE の累積更新プログラム 1 (CU1) がいつリリースされるのかについて、お客様からお問い合わせが寄せられています。以前は 2026 年上半期末までにリリースするとお伝えしていましたが、その後「2026 年後半」に[予定を変更](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)しました。いったいどうなっているのでしょうか。**CU1 はどこにいったのでしょうか。**

ここ数か月、Microsoft の複数の経営幹部が、さまざまな AI ツールを活用して製品の脆弱性を発見する取り組みについて説明しています。このような発表の例は、[こちら](https://blogs.windows.com/windowsexperience/2026/07/09/evolving-windows-vulnerability-management-to-meet-the-speed-of-ai-powered-discovery/)、[こちら](https://www.microsoft.com/en-us/security/blog/2026/04/22/ai-powered-defense-for-an-ai-accelerated-threat-landscape/)、[こちら](https://www.microsoft.com/msrc/blog/2026/04/strengthening-secure-software-global-scale-how-msrc-is-evolving-with-ai) の記事で確認できます。

これは Microsoft 全体で取り組んでいる施策であるため、特に驚くことではありません。Exchange Server を含む多くのチームが、報告された問題への対応に取り組んでいます。具体的には、実際にセキュリティ上の問題であるかどうかの検証、問題の再現、修正の実施、修正後の回帰テストや新たな問題の有無の確認、そして毎月の更新プログラムとしてのリリースが含まれます。

Exchange Server のセキュリティ更新プログラムは、これまでも継続的にリリースしてきました ([5 月分、6 月分、7 月分、8 月分](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates))。今後も、この頻度でセキュリティ更新プログラムをリリースする予定です。[セキュリティを何よりも優先](https://blogs.microsoft.com/blog/2024/05/03/prioritizing-security-above-all-else/)して取り組んでいます。

こうした対応と並行して、Exchange SE CU1 の開発も進めています。現在、毎月リリースしているセキュリティ更新プログラムの内容を内部の CU1 ビルドへ取り込みながら作業を進めています。また、十分な安定性が確保でき、緊急性の高いセキュリティ更新がない月を迎えた段階で、Exchange SE CU1 をできるだけ早くリリースする予定です。新しい CU1 をリリースした直後に、その CU をセキュリティ更新プログラムですぐに置き換えなければならない状況は避けたいと考えています。そのような状況になると、多くの組織の管理者にとって更新作業が二重に発生してしまうためです。また、セキュリティ更新プログラムと CU という 2 つの大きなリリースを適切にテストし、高い品質を確保しながら見落としも防ぐことは、社内にとっても非常に困難です。特に CU1 には RTM 以降にリリースしたすべての修正と改善が含まれる必要があるため、慎重な検証が求められます。

要点をまとめると、Exchange SE CU1 は今後リリースされますが、現時点でお伝えできるリリース日はありません。*CU1 のことを忘れているわけではありません。*

それまでの間、まだ Exchange Server SE へ移行されていない場合は、引き続き [現行バージョンから Exchange Server SE へのアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)を参照してください。すでに Exchange Server SE を利用している場合は、[最新の状態を維持](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)してください。