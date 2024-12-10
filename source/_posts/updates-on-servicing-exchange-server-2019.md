---
title: 'Exchange Server 2019 に関する更新'
date: 2024-12-10
tags: 
- Exchange
---

※ この記事は、[Updates on Servicing Exchange Server 2019](https://techcommunity.microsoft.com/blog/exchange/updates-on-servicing-exchange-server-2019/4355545) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2022 年初頭に、Exchange Server のサービス モデルの変更を[発表](https://techcommunity.microsoft.com/t5/exchange-team-blog/released-2022-h1-cumulative-updates-for-exchange-server/ba-p/3285026)し、各暦年の上半期 (H1) と下半期 (H2) に合計 2 回の累積更新 (CU) をリリースするサービス サイクルに移行しました。一般的なリリース目標日は 3 月と 9 月です。リリース日はペイロードと品質、およびセキュリティ更新 (SU) のリリースなど、優先される他の作業によって決まります。

前回の[ロードマップ更新](https://techcommunity.microsoft.com/blog/exchange/exchange-server-roadmap-update/4132742)では、Exchange Server 2019 の最終 CU（H2 2024 CU、別名 CU15）が今年後半にリリースされると述べました。

本日、Exchange Server 2019 の最後の CU が H1 2025 CU（ただし、CU15 のまま）であり、2025 年 1 月上旬にリリースされることを発表します。[昨年](https://techcommunity.microsoft.com/blog/exchange/servicing-exchange-server-2019/3989195)と同様のアプローチを取り、[一昨年](https://techcommunity.microsoft.com/t5/exchange-team-blog/servicing-exchange-server/ba-p/3676996)も同様でした。

その間、すべての顧客に対して、[2024 年 11 月 SU の v2 バージョン](https://techcommunity.microsoft.com/blog/exchange/re-release-of-november-2024-exchange-server-security-update-packages/4341892)に更新し、[既知のタイムゾーン問題](https://support.microsoft.com/topic/time-zone-exception-occurs-after-installing-exchange-server-november-2024-su-version-1-or-version-2-851b3005-6d39-49a9-a6b5-5b4bb42a606f)の手動回避策を実行することをお勧めします。その後、最新リリースの[Exchange Server HealthChecker](https://aka.ms/HealthChecker)をダウンロードして実行し、問題がないことを確認してください。

最後に、いくつかの注意点があります：

- ライフサイクルの日付は変更されません。
- Exchange Server SE の RTM リリースのタイミングには影響しません。これは引き続き暦年 2025 年の H2 初頭に予定されています。
- すべての顧客に対するガイダンスは変わりません：Exchange Server 2019 に移行し、最新の更新プログラムをインストールし、利用可能になったら Exchange Server SE にインプレースアップグレードしてください。
