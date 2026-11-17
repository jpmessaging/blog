---
title: "Exchange Online でダイレクト送信の拒否機能が一般提供開始"
date: 2026-11-17 21:44
tags:
- Exchange Online
---
※ この記事は、[Reject Direct Send now Generally Available in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/reject-direct-send-now-generally-available-in-exchange-online/4573787) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

ダイレクト送信の拒否機能が Exchange Online で一般提供 (GA) されたことをお知らせします。

2025 年 4 月、Exchange Online の管理者が自組織のドメインを使用する未認証のダイレクト送信トラフィックをブロックできるようにするため、ダイレクト送信を拒否する設定のパブリック プレビューを開始しました。このたび、ダイレクト送信の拒否機能が全世界の Exchange Online テナントで一般提供 (GA) されました。

パブリック プレビュー中にこの設定を有効にし、ブログのコメント、フィードバック用メールボックス、サポート、MVP コミュニティを通じてフィードバックをお寄せくださった皆さま、ありがとうございました。いただいたフィードバックをもとに、一般提供に向けた改善を行いました。一般提供となった変更可視化レポート (Change Optics Report) もその 1 つです。

すでに多くの組織でこの設定が利用されています。70,000 を超える組織が、保護をさらに強化するために RejectDirectSend を有効にしています。

## ダイレクト送信とは?

ダイレクト送信は、オンプレミスのデバイス、アプリケーション、またはサードパーティのクラウド サービスから、Exchange Online でホストされている組織内のメールボックスに対して、組織の承認済みドメインを使用してメールを直接送信する方法です。認証は一切必要ありません。送信者のドメインが組織の承認済みドメインであることを除けば、インターネットからの匿名受信メールと同様です。多くの組織ではダイレクト送信を使用する必要がないため、この機能が自組織ドメインのなりすましにつながる不要な攻撃経路となる可能性があります。詳細については、[ダイレクト送信と Exchange Online テナントへ直接メールを送ることの違い](/blog/direct-send-vs-sending-directly-to-an-exchange-online-tenant/) をご覧ください。

## ダイレクト送信の拒否機能

RejectDirectSend を有効にすると、承認済みドメインのアドレスを使って匿名で組織に送信されたメッセージがブロックされます。主なポイントは次のとおりです。

- P1 MAIL FROM (エンベロープ送信者) アドレスのみが評価対象となります。P2 From ヘッダーはチェックされません。
- 「Anonymous (匿名)」とは、メッセージがいずれのメール フロー コネクタにも関連付けられていないことを意味します。
- 承認済みドメインで「すべてのサブドメイン宛てのメールを受け入れる」 (MatchSubDomains = True) が有効になっている場合、サブドメインも対象に含まれます。
- MX レコードの向き先に関係なく機能します。
- この機能はセキュリティ対策の一つとして機能します。自組織が所有していないドメインのなりすましはダイレクト送信には該当せず、引き続き既存のなりすまし対策機能によって処理されます。

拒否されたメッセージには、次の応答が返されます。

```text
550 5.7.68 TenantInboundAttribution; Direct Send not allowed for this organization from unauthorized sources
```

## パブリック プレビュー以降の変更点

- **ダイレクト送信トラフィックの可視化:** Exchange 管理センターの「レポート > メール フロー > 変更可視化レポート」では、DRS (Direct Send traffic) シナリオにおいて、組織が受信したダイレクト送信メッセージのサンプルを確認できます。設定を有効にする前に、正当な送信者を特定できます。このレポートも現在一般提供 (GA) されています。詳細については、[Exchange Online で変更可視化レポート (Change Optics Report) が一般提供開始](/blog/the-change-optics-report-is-now-generally-available-in-exchange-online/) をご覧ください。
- **Azure Communication Services:** Azure Communication Services (ACS) Email に影響していた既知の問題は解決されました。
- **ドキュメントの明確化:** サブドメイン、必要なアクセス許可、コネクタへの関連付け、サードパーティの MX レコードを使用するシナリオに関する FAQ が追加されました。

## 新しいテナントでは既定でセキュリティを強化

パブリック プレビューの期間中にお知らせしたとおり、組織を既定で安全にする取り組みの一環として、新しい Exchange Online テナントでは RejectDirectSend を既定で有効にし、無効化できないようにする予定です。本記事の公開時点で段階的に展開されています。

## 既存のテナントで RejectDirectSend を有効にする前に

- 変更可視化レポートの DRS シナリオを確認し、組織にダイレクト送信トラフィックを送信しているデバイス、アプリケーション、サービスを特定します。また、各ドメインの SPF レコードも確認の手がかりとなります。
- 正当な送信者ごとに、その TLS 証明書 (推奨) または送信元 IP アドレスに一致するパートナー受信コネクタを作成します。詳細については、[Exchange Online でコネクタを使用してメール フローを構成する](https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow) をご覧ください。
- 次のコマンドを実行するなどして、各パートナーから送信されたメッセージが対応するコネクタに正しく関連付けられていることを確認します。

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

組織内のユーザーがサードパーティにメッセージを送信し、そのサードパーティが組織にメッセージを転送し直す場合があります。サードパーティのメール プロバイダーが Sender Rewriting Scheme (SRS) に対応していないと、元の送信者アドレスを保持したままメッセージが戻ってきます。このようなメッセージは現在も SPF 認証に失敗しますが、RejectDirectSend が有効で、パートナー コネクタも構成されていない場合、メッセージが拒否されます。

## 提供状況

ダイレクト送信の拒否機能は、全世界の Exchange Online テナントで一般提供 (GA) されています。GCC High および DoD 環境では現在利用できません。
