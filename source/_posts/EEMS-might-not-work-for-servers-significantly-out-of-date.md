---
title: 'Exchange Emergency Mitigation サービスは大幅に更新が遅れているサーバーでは機能しない可能性があります'
date: 2025-1-28
lastupdate:
tags: 'Exchange'
---

※ この記事は、[Exchange Emergency Mitigation Service might not work for servers significantly out of date](https://techcommunity.microsoft.com/blog/exchange/exchange-emergency-mitigation-service-might-not-work-for-servers-significantly-o/4370312) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

2021 年 9 月に、[Exchange Emergency Mitigation サービス (EEMS)](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-emergency-mitigation-service?view=exchserver-2019) を含む Exchange Server の更新プログラムをリリースしました。この EEMS サービスは、Exchange Server 上で動作し、Office Configuration Service (OCS) に接続して現在の緩和状態を読み取ります。詳細は [2021 年 9 月のリリース](https://techcommunity.microsoft.com/blog/exchange/released-september-2021-quarterly-exchange-updates/2779883)をご覧ください。

最近は新たな緩和策をリリースする必要はありませんでしたが、今後の変更についてお知らせしたいと思います。

OCS で使用されている古い証明書の一部が廃止される予定です。新しい証明書はすでに OCS に展開されており、[**2023 年 3 月以降**](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019) の Exchange Server 累積更新プログラム (CU) またはセキュリティ更新プログラム (SU) に更新されたサーバーは、引き続き新しい EEMS 緩和策を確認することができます。

## 影響

[2023 年 3 月](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019)より前のバージョンの Exchange を実行している EEMS は、OCS に接続して新しい緩和策の定義を確認およびダウンロードすることができません。サーバーのアプリケーション ログに次のようなイベントが記録されることがあります :

``` text
Error, MSExchange Mitigation Service 
Event ID: 1008
An unexpected exception occurred. 
Diagnostic information: Exception encountered while fetching mitigations.
```

併せて以下のような事象も発生します :

- EEMS のログに以下のような内容が記録されます :  
FetchMitigation,S:LogLevel=Warning;S:Message=Connection attempted against untrusted endpoint
- $exscripts\Get-Mitigations.ps1 を実行すると以下の内容で失敗します :  
WARNING: Connection with Mitigation Endpoint was not successful. To enable connectivity please refer: https://aka.ms/HelpConnectivityEEMS

## 対応が必要なアクション

古いバージョンの Exchange Server をご利用の場合は、お客様のメール環境を保護するために**できるだけ早く**サーバーを更新し、 Exchange サーバーが EEMS ルールを再度確認できるようにしてください。サーバーを常に最新の状態に保つことが重要です。詳細は [Exchange Server の更新に関する FAQ](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-server-update-faq?view=exchserver-2019) をご覧ください。[Exchange Server Health Checker](https://aka.ms/ExchangeHealthChecker) を実行すると、必要な対応がわかります。
