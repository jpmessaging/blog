---
title: "Exchange Online Admin API パブリック プレビューのご案内"
date: 2025/11/18
lastupdate: 2025/11/18
tags: "Exchange Online"
---

※ この記事は、[Announcing Public Preview: Exchange Online Admin API](https://techcommunity.microsoft.com/blog/exchange/announcing-public-preview-exchange-online-admin-api/4470562) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。



本日 (2025 年 11 月 17 日現在) 、**Exchange Online Admin API** の **パブリック プレビュー** を開始しました。この API は、REST ベースかつコマンドレット形式の管理インターフェースであり、特定の Exchange 管理シナリオを EWS から移行する場合や、HTTP 経由での自動化ワークフローのモダナイズを支援するために設計されています。

## 背景

[Exchange Web Services (EWS) は **2026 年 10 月** に廃止予定](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online) ですが、多くの組織ではこれまで代替 API が提供されていなかったため、特定の Exchange 管理タスクには依然として EWS を利用し続けてきました。Admin API は、これらのシナリオに対して **REST ベース** かつ **コマンドレット形式** の新しい選択肢を提供し、Exchange 管理者にとって馴染みのあるセマンティクス (操作概念) を維持しつつ、最新の自動化を実現します。

**注意:** Admin API は Exchange Online の管理機能をすべて REST で代替するものではありません。EWS で提供されていた一部の管理シナリオに対する代替手段として設計されています。Exchange Online の全体的な管理には、**Exchange Online PowerShell** の利用を推奨します。

## パブリック プレビューで利用可能な機能

Admin API のパブリック プレビューでは、6 つのエンドポイントが提供されています。各エンドポイントと対応する機能は以下のとおりです。

- **OrganizationConfig** — テナント全体の MailTips に関連するテナント全体の設定の参照
- **AcceptedDomain** — テナントの承認済みドメインと主要なドメイン設定の一覧を取得
- **Mailbox** — メールボックスのプロパティの参照および**代理送信権限**の管理（表示・更新）
- **MailboxFolderPermission** — フォルダー単位（受信トレイ、予定表、サブフォルダー）の権限の参照、付与、変更、削除
- **DistributionGroupMember** — 配布グループのメンバー一覧の取得
- **DynamicDistributionGroupMember** — 動的配布グループのメンバー一覧の取得

リクエスト パターンや各エンドポイントの詳細については、以下のドキュメントをご参照ください。

- [概要 | Microsoft Learn](https://learn.microsoft.com/exchange/reference/admin-api-overview)
- [はじめに | Microsoft Learn](https://learn.microsoft.com/exchange/reference/admin-api-get-started)
- [エンドポイント リファレンス | Microsoft Learn](https://learn.microsoft.com/exchange/reference/admin-api-endpoints-reference)

EWS からの移行に関する最新情報は [https://aka.ms/ews1Page](https://aka.ms/ews1Page) をご確認ください。


## 提供状況と今後の予定

- **パブリック プレビュー (全世界):** 2025 年 11 月 17 日より利用可能です。この期間中に機能の評価や移行計画、EWS 管理シナリオと Admin API のギャップに関するフィードバックをお寄せください。
- **一般提供 (全世界):** 提供開始日は未定です。
- **政府機関向け環境 (GCC、GCC High、DoD):** 提供開始日は未定です。

現在、API のレスポンスには追加のプロパティが含まれていますが、一般提供 (GA) では各エンドポイントのドキュメントに記載されているプロパティのみが利用可能となります。一般提供時に利用可能なプロパティの一覧は、各エンドポイントのドキュメントをご参照ください。出力プロパティの変更がある場合は、一般提供のリリース時にお知らせします。

## フィードバックの共有
パブリック プレビュー期間中のご意見・ご要望は重要な役割を果たします。不具合や不足している機能、ご提案などがありましたら、[フィードバック フォーム](https://forms.office.com/r/Zt4fdv7s86) からお知らせください。皆さまからのフィードバックをもとに、一般提供に向けて API やドキュメントの改善を進めてまいります。


