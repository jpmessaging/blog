---
title: Exchange Online における SMTP DANE および MTA-STS コネクタ モードの発表
date: 2026-3-11
lastupdate:
tags: Exchange Online
---
※ この記事は、[Announcing SMTP DANE & MTA STS Connector Modes in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/announcing-smtp-dane--mta-sts-connector-modes-in-exchange-online/4501005) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online における **SMTP DANE および MTA-STS のコネクタ モード** のリリースをお知らせいたします。この更新により、管理者はアウトバウンド コネクタを介してメールを送信する際に、**Exchange Online が最新のメール フロー セキュリティ標準をどの程度厳格に適用するかを明示的に制御できる**ようになります。

この機能は、[SMTP DANE with DNSSEC](https://learn.microsoft.com/purview/how-smtp-dane-works) および [MTA-STS](https://learn.microsoft.com/purview/enhancing-mail-flow-with-mta-sts) の既存の機能を基盤として構築されており、重要なメール パスにおける**セキュリティ体制、信頼性、およびパートナーとの相互運用性**のバランスに関するお客様からのフィードバックに対応するものです。

### 新機能

Exchange Online のアウトバウンド コネクタで、**SMTP DANE および MTA-STS モード**の構成がサポートされるようになりました。これにより、各メール フロー シナリオに最適な検証動作を選択できます。

管理者は以下の設定を構成できます。

- **Opportunistic (既定):** Exchange Online は SMTP DANE および MTA-STS の検証を利用可能な場合に試行しますが、宛先がこれらをサポートしていない場合は配信を続行します。
- **Mandatory (SMTP DANE のみ):** SMTP DANE with DNSSEC の完全な検証を強制します。検証に失敗した場合、または宛先が SMTP DANE をサポートしていない場合、メールはキューに格納されます。
- **None:** コネクタに対する SMTP DANE および/または MTA-STS の検証を無効にします。特定のパートナー シナリオでの互換性を優先し、セキュリティを低減します。

これらの設定は**コネクタごと**に適用されるため、テナント全体の送信メール フロー動作に影響を与えることなく、きめ細かい制御が可能です。

### この機能が重要な理由

SMTP DANE with DNSSEC および MTA-STS は、ダウングレード攻撃や悪意のある MX リダイレクトからの保護により、トランスポート レベルのメール セキュリティの水準を大幅に引き上げます。しかし、一貫性のない構成や誤った構成のパートナーにメールを送信する場合、**画一的な強制適用は運用上の課題となり得る**というフィードバックをお客様からいただいていました。

コネクタ レベルのモードにより、以下のことが可能になります。

- パートナーが完全に準拠している場合は**厳格なセキュリティを適用**する
- まだ最新化の途上にあるビジネス クリティカルなパートナーに対して**信頼性の高い配信を維持**する
- 運用上の中断なく、**時間をかけて段階的にセキュリティ体制を強化**する

#### 詳細情報

- ドキュメントの更新と管理者向けガイダンスは Microsoft Learn で公開されています: [Set-OutboundConnector (ExchangePowerShell) | Microsoft Learn](https://learn.microsoft.com/powershell/module/exchangepowershell/set-outboundconnector?view=exchange-ps)

お客様がこれらのコントロールを、メール セキュリティ強化の取り組みの一環として活用されることを期待しています。
