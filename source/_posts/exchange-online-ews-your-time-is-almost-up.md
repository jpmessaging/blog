---
title: Exchange Online EWS：廃止期限が迫っています
date: 2026-2-6 12:00
lastupdate: 2026-2-9
tags: Exchange Online
---
※ この記事は、[Exchange Online EWS, Your Time is Almost Up](https://techcommunity.microsoft.com/blog/exchange/exchange-online-ews-your-time-is-almost-up/4492361) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

**Exchange Web Services (EWS) は Exchange Online でのサービス終了が近づいています。** この変更については、2018 年に [Exchange Web Services (EWS) の機能更新を終了する](https://techcommunity.microsoft.com/blog/exchange/upcoming-changes-to-exchange-web-services-ews-api-for-office-365/608055) と初めて発表しました。その後 2023 年には、[EWS が 2026 年 10 月に Exchange Online で無効化される](https://devblogs.microsoft.com/microsoft365dev/retirement-of-exchange-web-services-in-exchange-online/)ことを発表しました。

本日、2026 年 10 月に開始し、2027 年に EWS を完全に停止するまで段階的に実施される、管理者が制御可能な無効化計画について発表します。本記事では、何が起こるのか、いつ起こるのか、そして管理者が *今* から何をすべきかについて説明します。

本日の発表および EWS の廃止は **Microsoft 365 および Exchange Online（すべての環境）にのみ適用されます**。**Exchange Server の EWS に変更はありません。**

### EWS が廃止される理由

EWS は約 20 年前に構築されたもので、これまでエコシステムに大きく貢献してきましたが、現在求められているセキュリティ、スケール、信頼性の要件にはもはや適合しなくなっています。過去数年で、以下のような状況が進んでいます。

- Microsoft Graph は、EWS の利用シナリオの大部分において[ほぼ完全な機能互換](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online#roadmap-for-parity-gaps)を達成しています。
- Microsoft 自身のアプリケーションは、既に EWS から移行済みか、または移行をほぼ完了しています。
- 多くのサード パーティ ベンダーも既に移行を完了しているか、積極的に移行を進めています。

EWS を廃止することで、レガシーな機能の範囲を縮小し、プラットフォームの動作を簡素化するとともに、すべてのユーザーにより一貫したモダンなエクスペリエンスを提供できるようになります。

### EWS はどのように無効化されますか？

EWS は [*EWSEnabled* プロパティ](https://learn.microsoft.com/exchange/client-developer/exchange-web-services/how-to-control-access-to-ews-in-exchange) を使用して **テナント単位** で無効化されます。このプロパティは **True、False、Null** (現在の既定値) の 3 つの値があります。また、2026 年初頭に提供予定の新機能として、管理者は **AppID 許可リスト** を定義できるようになります。この機能を有効にすると、そのリストに登録されたアプリのみが EWS にアクセスできるようになります。

テナント内の *EWSEnabled* プロパティは、2026 年 10 月 1 日（またはその直後）に以下のように変更されます。

| **EWSEnabled の値** | **2026 年 10 月以前** | **2026 年 10 月以降** |
| --- | --- | --- |
| **True** | すべての EWS が許可 | 許可リスト内のアプリのみ許可 |
| **False** | すべての EWS がブロック | すべての EWS がブロック |
| **Null** | すべての EWS が許可 | すべての EWS が許可 (許可リストは無視) |

2026 年 10 月 1 日時点で *EWSEnabled* が引き続き **Null** に設定されているテナントでは、展開の進行に伴い、値が **False** に変更されます。展開完了後、当該テナント内のすべてのアプリケーションに対して EWS がブロックされます。

EWS をブロックしたままにしておきたい場合は、特に何もせず、そのままにしておくだけです。

一方、引き続き EWS を利用する必要がある場合は、次の 2 つの選択肢があります。

1. *EWSEnabled* を **True** に設定し、[ベースライン セキュリティ モード](https://learn.microsoft.com/microsoft-365/baseline-security-mode/baseline-security-mode-settings?view=o365-worldwide)または Exchange Online PowerShell 経由で許可リストを管理する。
2. *EWSEnabled* を **Null** に戻すことで、最終的な廃止が行われるまでの間、EWS が制限なしで再度有効化になります。この操作は Exchange Online PowerShell を使用して行う必要があります。

さらに、**2026 年 8 月末までに**許可リストを事前に設定し、*EWSEnabled* を **True** に設定したテナントは、10 月 1 日の自動変更（EWSEnabled=False）から除外されます。

この移行期間を支援するため、2026 年 9 月までに許可リストを作成していないお客様に対して、各テナントの実際の利用状況に基づいて、許可リストを事前に自動作成します。なお、2026 年 10 月に EWS がブロックされた後、引き続き EWS が必要であることに気付いた場合でも、管理者は EWSEnabled を **True** に設定することで EWS を再度有効化できます。ただし、この場合はサービスの一時的な中断が生じることに注意してください。

### 主要な日程

**準備期間（現在）**

この段階では、EWS は引き続き利用可能ですが、管理者は以下の準備を行うことが推奨されます。

- Microsoft 365 管理センターで [EWS の使用状況レポート](https://learn.microsoft.com/microsoft-365/admin/activity-reports/ews-usage?view=o365-worldwide) を確認し、必要に応じて公開されているスクリプトの使用を検討してください。
- オプション：2026 年 8 月末までに、許可リストを設定し、*EWSEnabled* を **True** に設定してください。
- Microsoft Graph へのアプリケーション移行を開始してください。

**EWS を引き続き使用しているテナントに対する初回ブロック – 2026 年 10 月 1 日から開始**

2026 年 8 月までに許可リストや、EWSEnabled=True を明示的に設定していない Exchange Online テナントでは、EWS は **既定でブロック** （EWSEnabled=False）される予定です。この時点で、以下の状態になります。

- 管理者が事前に対応を行われていない場合、EWS のリクエストはブロックされます。
- 重要な業務フローに影響が出る場合、管理者は EWSEnabled=True に設定することで、一時的に EWS を有効化できます。

**EWS の最終的な停止 – 2027 年 4 月 1 日**  
**2027 年 4 月 1 日** から、EWS は **完全かつ恒久的に無効化** されます。
- テナント管理者による *EWSEnabled* を制御する機能は削除されます。

以下は、タイムラインの図です。  
![](EWS01.jpg)

### 継続的な情報提供と監視

予期しない問題を回避するため、管理者にテナント固有の EWS 使用状況のサマリーとリマインダーを含む **monthly Message Center posts** を配信します。

また、**一時的な「スクリームテスト」** （短い期間に EWS を一時的にオフにしてからオンに戻すテスト）を実施する場合があります。これにより、最終的なカットオフ前に潜在的な依存関係を明らかにするのに役立ちます。詳細については、今後数週間でお知らせします。今のうちに EWSEnabled を True に設定すれば、実施される可能性のある「スクリームテスト」の影響を受けることはありません。

### まとめ

今こそ、利用環境を評価し、アプリケーションの開発元と連携しながら、Microsoft Graph への移行計画を立てる適切な時期です。早期の対応により、予期しない問題を回避でき、よりスムーズな移行が実現できます。

### よくあるご質問

**既に EWSApplicationAccessPolicy 設定を使用して EWS ブロックを構成しています。新しい許可リストと既存のリストはどのように連携しますか？**  
新しい AppID 許可リストが優先されます。アプリが EWS にアクセスするためには、両方のチェックにクリアする必要があります。

**EWS を使用しているアプリケーションがたくさんあります。移行にどのくらいの作業が必要か全くわかりません。どうすればよいですか！**  
まず、公開されている使用状況ツールをご利用ください (ワールドワイド テナントは[こちら](https://learn.microsoft.com/microsoft-365/admin/activity-reports/ews-usage?view=o365-worldwide))。ほとんどのアプリはごく限られた EWS の機能しか使用していません。最新のツール（AI 活用した移行を含む）を利用することで、想像しているよりも簡単に移行できるケースが多くあります。

**Microsoft Graph API とは機能差分がありますが、EWS から Graph へ本当に移行できるのでしょうか?**  
Microsoft では残っている機能差分を積極的に追跡し、その状況を公開しています。ほとんどの EWS ベースのワークロードは現在移行可能です。最新の機能差分の状況については、このページ [Exchange Online での Exchange Web Services の廃止 | Microsoft Learn](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online#roadmap-for-parity-gaps) を確認してください。このドキュメントは常に最新の内容に更新されており、新しい情報が利用可能になり次第、関連する追加情報へのリンクも随時掲載します。

**オンプレミス Exchange やハイブリッド構成の場合はにどうなりますか？**  
EWS はオンプレミスでは廃止されません。ハイブリッド構成については、アプリケーションがどのようにデータへアクセスしているかによって対応が異なります。オンプレミスのメールボックスへのアクセスは EWS を引き続き使用でき、クラウド メールボックスへのアクセスは Microsoft Graph に移行する必要があります。
アプリケーションは Autodiscover を利用して、メールボックスの場所 (オンプレミスかクラウドか) を自動的に判別できます。  

ただし、Exchange Online への Microsoft Graph 経由のアクセスをサポートするのは Exchange SE のみであるため、ハイブリッド環境におけるオンプレミス メールボックスは Exchange SE を*使用することが前提となります*。詳細は[こちら](https://jpmessaging.github.io/blog/exchange-server-security-changes-for-hybrid-deployments/)をご覧ください。

**2027 年 4 月までに準備が間に合いません。延長を受けることはできますか？**  
2027 年 4 月以降の例外措置はありません。

**2026 年 8 月に許可リストを作成せずに EWSEnabled=True を設定できますか？**  
はい、設定できますが、管理者が自分のニーズに合わせて許可リストを作成することをお勧めします。2026 年 9 月には、各テナントの使用状況に基づいて、許可リストが自動作成されます。8 月に EWSEnabled=True だけを設定し、9 月に許可リストを自動作成される場合、管理者が把握していないアプリケーション（使用状況が確認されている場合）も含まれる可能性があります。2026 年 10 月以降に許可する EWS アプリケーションを正確に制御するためにも、管理者が自ら許可リストを作成することを推奨します。

**2026 年 8 月までに独自の許可リストを作成した場合、2026 年 9 月にすべてのテナントの自動許可リスト作成処理で、その内容は変更されますか？**  
いいえ。独自の許可リストを作成した場合、自動許可リスト作成処理によって既に作成された許可リストが変更されることはありません。作成済みの許可リストは、そのまま維持されます。

変更履歴:

- 2026/2/9: 今のうちに EWSEnabled を True に設定することで、将来の「スクリームテスト」から除外されることを示すメモを追加しました