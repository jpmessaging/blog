---
title: 'Exchange Server サブスクリプション エディション (SE) が利用可能になりました'
date: 2025-07-02 10:00:00
lastupdate: 2025-07-22
tags: Exchange
--- 

※ この記事は、[Exchange Server Subscription Edition (SE) is now available](https://techcommunity.microsoft.com/blog/exchange/exchange-server-subscription-edition-se-is-now-available/4424924) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Server サブスクリプション エディション (SE) の一般提供開始を発表します。このリリースにより、Microsoft はクラウド、オンプレミス、ハイブリッドなど、お客様の組織に最適な形でエンタープライズ メール サービスを提供し続けます。Exchange Online や Microsoft 365 では、Microsoft 365 Copilot の統合を含む最新かつ革新的なソリューションを引き続きご利用いただけますが、Exchange SE はオンプレミス ソリューションが依然として重要なシナリオにおいて、継続的なサポートを提供するという Microsoft のコミットメントを示すものです。

Exchange Server を将来に向けて進化させるため、サブスクリプション エディションではサービス提供やライセンスの方法にいくつかの変更が加えられています。従来の Exchange と異なり、サブスクリプション エディションは[モダン ライフサイクル ポリシー](https://learn.microsoft.com/lifecycle/policies/modern)に準拠しています。これにより、構成を最新の状態に保つ限り、サポートの終了日は設定されません。Exchange SE のコードベースは今後、リリース年を冠したメジャー バージョンアップは行われず、常に最新の状態に保たれた製品として継続的にサービス提供されます。

## リリースの詳細

以前ご案内したとおり、Exchange Server SE Release to Manufacturing (RTM) は、Exchange Server 2019 CU14 または CU15 に対する累積更新プログラム (CU) としてインストールでき、Exchange 2016/2019 の組織に参加させることが可能です (Exchange 2016 からの場合は "従来の" メールボックス移行が必要です)。アップグレード手順や関連するよくある質問 (FAQ) については、[現行バージョンから Exchange Server SE へのアップグレード](/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)をご参照ください。

既に Exchange 2019 をご利用中のお客様には、CU14 または CU15 サーバーを Exchange SE へインプレース アップグレードすることを推奨します。これにより[モダン サポート ライフサイクル](https://learn.microsoft.com/lifecycle/policies/modern)に移行することができます。Exchange SE RTM は従来の Exchange RTM リリースとは異なり、メジャーなコード変更を含まず、Exchange 2019 CU15 との大きな違いもありません。詳細については、[Exchange 2019 から Exchange SE へのインプレース アップグレードが低リスクである理由](/blog/why-in-place-upgrade-from-exchange-2019-to-exchange-se-is-low-risk/)をご参照ください。

Exchange 2019 から Exchange SE RTM へのインプレース アップグレードを容易にするため、Exchange SE RTM と Exchange 2019 CU15 を比較すると、次のような特徴があります。

- 機能の追加や削除はありません。
- Active Directory スキーマの変更はありません (CU14 からアップグレードする場合は /PrepareAD が必要な場合があります)。
- インストール前提条件の変更はありません。
- 新しいライセンス キーは不要です。

Exchange 2019 CU15 との*違い*は以下のとおりです。

- セットアップの GUI 版でのみ表示されるライセンス契約書 (RTF ファイル) が更新されています。
- 製品名が "Microsoft Exchange Server 2019" から "Microsoft Exchange Server Subscription Edition" に変更されています。
- [ビルド番号およびバージョン番号が更新](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates)されています。
- Exchange 2019 CU15 以降にリリースされた更新プログラムが Exchange SE RTM に統合されています (これはすべての CU 更新で行われます)。

Exchange SE のインストール前提条件については、[Exchange Server サポート マトリックス](https://learn.microsoft.com/exchange/plan-and-deploy/supportability-matrix)をご確認ください。

- Exchange Server SE RTM の入手先: [VLSC (ボリューム ライセンス契約をお持ちのお客様専用)](https://learn.microsoft.com/microsoft-365/commerce/licenses/vl-sign-in)、[Download Center (公開ダウンロード サイト)](https://www.microsoft.com/download/details.aspx?id=108244)

## 今後の展望

Exchange SE の RTM リリースは現時点では Exchange 2019 CU15 と同一ですが、今後は違いが生まれていきます。2025 年 10 月に [Exchange 2016 および 2019 のサポートが終了](/blog/t-6-months-exchange-server-2016-and-exchange-server-2019-end-of-support/)した後は、Exchange SE が*唯一*サポートされるオンプレミス版 Exchange となります。これにより、今後数年にわたり製品のシンプル化や合理化、モダナイズが進められる予定です。Exchange SE の累積更新プログラム (CU) は、これまで通り年 2 回のペースでリリースされ、必要に応じてセキュリティ更新やホットフィックスも提供されます。

サポート終了が間近に迫っているため、できるだけ早く Exchange SE へのアップグレードを進め、[Exchange 2016 または 2019 のサーバーを廃止](/blog/Decommissioning-Exchange-Server-2016/)してください。[Exchange 2019 CU15](/blog/released-2025-h1-cumulative-update-for-exchange-server/) で Exchange 2013 との共存がブロックされているのと同様に、Exchange SE CU2 では組織内に Exchange 2016 または 2019 サーバーが存在しないことが必須となります。今後の Exchange SE の累積更新プログラム (CU) では、インストール前提条件のモダナイズや Exchange SE サーバー キーの必須化、新機能の追加なども予定されています。

オンプレミス サーバーが必要なお客様向けに、Skype for Business Server サブスクリプション エディションも本日より一般提供が開始されたことをお知らせします。詳細は [Skype for Business ブログ](https://techcommunity.microsoft.com/blog/skype_for_business_blog/skype-for-business-server-subscription-edition-se-is-now-available/4424925)をご覧ください。

皆様からのフィードバックをお待ちしております。今後とも Exchange へのご支援とご愛顧賜りますよう、よろしくお願いいたします。
