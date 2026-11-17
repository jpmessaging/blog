---
title: "Exchange Online で Reject Direct Send が一般提供開始"
date: 2026-11-17 21:44
tags:
- Exchange Online
---
※ この記事は、[Reject Direct Send now Generally Available in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/reject-direct-send-now-generally-available-in-exchange-online/4573787) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Reject Direct Send が Exchange Online で一般提供 (GA) されたことをお知らせします。

2025 年 4 月、Exchange Online の管理者が自組織のドメインを使用する未認証のダイレクト送信トラフィックをブロックできるようにするため、Reject Direct Send 設定のパブリック プレビューを開始しました。このたび、Reject Direct Send が全世界の Exchange Online テナントで一般提供 (GA) されました。

パブリック プレビュー中にこの設定を有効にし、ブログのコメント、フィードバック用メールボックス、サポート、MVP コミュニティを通じてフィードバックをお寄せくださった皆さま、ありがとうございました。いただいたフィードバックをもとに、一般提供に向けた改善を行いました。一般提供となった変更可視化レポート (Change Optics Report) もその 1 つです。

すでに多くの組織でこの設定が利用されています。70,000 を超える組織が、保護をさらに強化するために Reject Direct Send を有効にしています。

## Direct Send とは?

Direct Send は、オンプレミスのデバイス、アプリケーション、またはサードパーティのクラウド サービスから、組織独自の承認済みドメインを使って Exchange Online 組織のホストされたメールボックスに直接メールを送信する方法です。インターネットからの匿名受信メールと同様に、送信者のドメイン以外は認証を必要としません。Direct Send を必要としない組織も多く、そのような場合には自組織のドメインのなりすましにつながる不要な経路になります。詳細については、[Exchange Online テナントへの直接送信と Direct Send の違い](/blog/direct-send-vs-sending-directly-to-an-exchange-online-tenant/) をご覧ください。

## Reject Direct Send の機能

Reject Direct Send を有効にすると、承認済みドメインのアドレスを使って匿名で組織に送信されたメッセージがブロックされます。主なポイントは次のとおりです。

- 評価されるのは P1 MAIL FROM (エンベロープ送信者) アドレスのみです。P2 From ヘッダーは確認されません。
- 「匿名」とは、メール フロー コネクタに関連付けられていないメッセージを意味します。
- 承認済みドメインで「すべてのサブドメインのメールを受け入れる」 (MatchSubDomains = True) が有効になっている場合、サブドメインも対象になります。
- MX レコードの向き先に関係なく機能します。
- この設定は保護の 1 つです。所有していないドメインのなりすましは Direct Send ではなく、既存のなりすまし対策機能で引き続き処理されます。

拒否されたメッセージには、次の応答が返されます。

```text
550 5.7.68 TenantInboundAttribution; Direct Send not allowed for this organization from unauthorized sources
```

## パブリック プレビュー以降の変更点

- **Direct Send トラフィックの可視化:** Exchange 管理センターの「レポート > メール フロー > 変更可視化レポート」では、DRS (Direct Send traffic) シナリオにおいて、組織が受信した Direct Send メッセージの例を確認できます。設定を有効にする前に、正当な送信者を特定できます。このレポートも一般提供 (GA) になりました。詳細については、[Exchange Online で変更可視化レポート (Change Optics Report) が一般提供開始](/blog/the-change-optics-report-is-now-generally-available-in-exchange-online/) をご覧ください。
- **Azure Communication Services:** Azure Communication Services (ACS) Email に影響していた既知の問題は解決されました。
- **ドキュメントの明確化:** サブドメイン、必要なアクセス許可、コネクタへの帰属、サードパーティの MX シナリオに関する FAQ が追加されました。

## 新しいテナントでは既定でセキュリティを確保

パブリック プレビューの開始時にお知らせしたとおり、組織を既定で安全にする取り組みの一環として、新しい Exchange Online テナントでは Reject Direct Send を既定で有効にし、無効化できないようにする予定です。この記事の公開時点で展開中です。

## 既存のテナントで Reject Direct Send を有効にする前に

- 変更可視化レポートの DRS シナリオを確認し、組織に Direct Send トラフィックを送信しているデバイス、アプリケーション、サービスを特定します。ドメインの SPF レコードも、確認を始めるうえで役立ちます。
- 正当な送信者ごとに、その TLS 証明書 (推奨) または送信元 IP アドレスに一致するパートナー受信コネクタを作成します。詳細については、[Exchange Online でコネクタを使用してメール フローを構成する](https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow) をご覧ください。
- 次のコマンドを実行するなどして、各パートナーからのメッセージがコネクタに関連付けられていることを確認します。

```powershell
Get-MessageTraceV2 -MessageId "<message ID>" | Get-MessageTraceDetailV2 | Format-List
```

## 設定を有効にする方法

既存のテナントでは、この設定は引き続きオプトインであり、既定では無効です。Organization Configuration ロールを持つ管理者は、次のコマンドで有効にできます。

```powershell
Set-OrganizationConfig -RejectDirectSend $true
```

変更は 30 分以内にサービス全体へ反映されます。現在の値を確認するには、次のコマンドを実行します。

```powershell
Get-OrganizationConfig | Format-List RejectDirectSend
```

## 既知の問題: SRS を使用しないサードパーティ経由の転送

組織内のユーザーがサードパーティにメッセージを送信し、そのサードパーティが組織にメッセージを転送し直す場合があります。サードパーティのメール プロバイダーが Sender Rewriting Scheme (SRS) に対応していないと、元の送信者アドレスを保持したままメッセージが戻ってきます。このようなメッセージは現在も SPF に失敗します。Reject Direct Send を有効にしていて、パートナー コネクタも設定されていない場合は、メッセージが拒否されます。

## 提供状況

Reject Direct Send は、全世界の Exchange Online テナントで一般提供 (GA) されています。GCC High および DoD 環境では現在利用できません。

Microsoft 365 Messaging Team
