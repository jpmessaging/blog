---
title: 'Exchange 2019 CU15 のリリース時期と最新情報'
date: 2025-02-03
lastupdate:
tags: Exchange
--- 

※ この記事は、[When is Exchange 2019 CU15 coming (and more news)](https://techcommunity.microsoft.com/blog/exchange/when-is-exchange-2019-cu15-coming-and-more-news/4372765) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

昨年 12 月、Exchange Server 2019 CU15 のリリースを 2025 年 1 月に延期することを[発表](https://techcommunity.microsoft.com/blog/exchange/updates-on-servicing-exchange-server-2019/4355545)しました（併せて、CU は H1 2025 CU にリネームされました）。

本日は、CU15がまだリリースされていない理由と関連するニュースをお伝えします。

### Exchange 2019 CU15のリリース状況

CU15 の公開リリースの準備がまだ整っていません。これは予期しない遅延です。リリースを遅らせ続けるいくつかの正当な理由があります ：

- Exchange 2019 CU15 は Exchange 2019 の最後の CU です。CU15 は Exchange Subscription Edition (SE) RTM リリースと "同等のコード" であることを[約束](https://techcommunity.microsoft.com/blog/exchange/exchange-server-roadmap-update/4132742)しました (中間にリリースされた更新やブランド変更、EULA の変更を除く)。したがって、CU15 は Exchange SE CU1 前に新しい Exchange 機能をリリースする最後のチャンスです。*CU15 には新機能が含まれているため*、このリリースの複雑さが増加しました。
- 新しい CU リリースの検証の一環として、[TAP プログラム](https://techcommunity.microsoft.com/blog/exchange/open-enrollment-for-exchange-server-2019-tap/3421627)に登録している顧客に送信しています。これは "実運用の" 環境での次期 CU の追加検証として実施されています。このプログラムを通じて、CU15 のリリースが遅れる原因となる不具合の情報を受け取り、それらを解決する新しい CU15 ビルドを作成する決定を下しました。新しいビルドを作成すると、テスト プロセスがリセットされるため、公開リリースまでの時間が追加されます。

リリースの準備はほぼ整っています。

### Exchange 2019 CU14 は Windows Server 2025 でサポートされるようになりました

CU15 リリースの検証の一環として、Exchange CU15 が Windows Server 2025 にインストールできるようにすることを確認しました。これにより、将来の Exchange SE へのインプレース アップグレードに向けて、新しいハードウェアと OS で新しいサーバーを構築できます。

Windows Server 2025 の Active Directory の組織で、Windows Server 2025 上で動く Exchange Server 2019 の CU14 と CU15 の両方がサポートされることをお知らせします。これにより、Windows Server 2025 を搭載した新しいハードウェアに CU14 または CU15 のいずれかをインストールし、その後[Exchange Server Subscription Edition (SE) にインプレース アップグレード](https://techcommunity.microsoft.com/t5/exchange-team-blog/upgrading-your-organization-from-current-versions-to-exchange/ba-p/4241305)して、サーバーの[最大のサポート ライフサイクル](https://learn.microsoft.com/lifecycle/products/windows-server-2025)を得ることができます。このサポートは CU15 に提供されると以前に述べましたが、最新バージョンの Windows Server への移行を容易にするために CU14 もこのシナリオで検証しました。

### 今後の道筋

CU15 の遅延が苛立たしいことを認識しています。私たちはリリースの準備を進めています。もうすぐです！  
[Exchange SE の準備を進める](https://techcommunity.microsoft.com/blog/exchange/upgrading-your-organization-from-current-versions-to-exchange-server-se/4241305)ために、Exchange 2019 に移行する作業を続けてください。Exchange Server 2019 に移行することで*時間を確保*でき、組織への参加やメールボックスを移動するために Exchange SE RTM を待つ必要は<u>*ありません*</u>、。

- 既に発表されているライフサイクルの日付は変更しません。
- CU15 の遅延は、Exchange Server SE の RTM リリースのタイミングに影響を与えません。RTM リリースは暦年 2025 年の H2 初頭に予定されています。
- すべての顧客に対するガイダンスは変わりません：Exchange Server 2019 に移行し、最新の更新をインストールし、利用可能になったら Exchange Server SE にインプレースアップ グレードしてください。
