---
title: 'レガシー Exchange Online トークンおよびそれを利用するアドインのステータス確認について'
date: 2025-5-23
lastupdate:
tags: 'Exchange Online'
---

※ この記事は、[Get the status of legacy Exchange Online tokens and add-ins that use them](https://techcommunity.microsoft.com/blog/exchange/get-the-status-of-legacy-exchange-online-tokens-and-add-ins-that-use-them/4416267) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

### 組織内でのレガシー トークン利用状況の確認方法

[以前のブログ記事](https://techcommunity.microsoft.com/blog/exchange/update-on-nested-app-authentication-and-deprecation-of-exchange-online-legacy-to/4351951)でもお伝えした通り、Exchange Online ではまもなく Outlook アドインがサービス認証に利用していた Exchange レガシー トークンを廃止します。今後、Exchange Online で利用する Outlook アドインは Nested App Authentication (NAA) を使用する必要があります。この変更は Exchange Online のみが対象です。詳細は [FAQ](https://learn.microsoft.com/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens) をご参照ください。

数日前、ドキュメントを更新し、テナント管理者が Exchange Online PowerShell で以下のコマンドを実行することで、現在も Exchange レガシー トークンを要求 (および受信) しているアプリの App ID 一覧を取得できるように出力を追加しました。

``` PowerShell
Get-AuthenticationPolicy -AllowLegacyExchangeTokens
```

結果の解釈方法など詳細については、ドキュメントをご参照ください。[レガシー Exchange Online トークンのオンとオフを切り替える](https://learn.microsoft.com/office/dev/add-ins/outlook/turn-exchange-tokens-on-off#get-the-status-of-legacy-exchange-online-tokens-and-add-ins-that-use-them)

### レガシー トークンを 2025 年 10 月まで引き続き利用するための例外申請方法

[廃止に関する FAQ](https://learn.microsoft.com/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens) でも案内されている通り、Exchange Online のレガシー トークンを 2025 年 10 月まで引き続き利用したい場合は、例外申請を行うことができます。

例外申請は、以下のリンクから行うことができます (テナントへのサインインが必要です)。[http://aka.ms/LegacyTokensByOctober](http://aka.ms/LegacyTokensByOctober)

<p style="background:yellow"><b>重要:</b> <i><a class="lia-external-url" href="https://learn.microsoft.com/office/dev/add-ins/outlook/turn-exchange-tokens-on-off#get-the-status-of-legacy-exchange-online-tokens-and-add-ins-that-use-them" target="_blank" rel="noopener noreferrer">レガシー トークンの利用状況</a>を必ず確認した上で</i>例外申請を行ってください。2025 年 10 月にレガシー トークンが無効化されると、<i>元に戻すことはできません</i>。</p>