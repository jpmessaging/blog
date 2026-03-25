---
title: "Graph API でメールの機密プロパティを変更するアプリに上位のアクセス許可が必要になります"
date: 2026/03/25
lastupdate:
tags:
- Exchange Online
---

※ この記事は、[Upcoming Breaking Changes to Modifying Sensitive Email Properties via Graph API](https://techcommunity.microsoft.com/blog/exchange/upcoming-breaking-changes-to-modifying-sensitive-email-properties-via-graph-api/4505227) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

下書き以外のメール メッセージの機密プロパティ (sensitive properties) を変更するアプリケーションに影響する重要な更新が実装されます。機密プロパティには、件名、本文、受信者のほか、[Graph API のメッセージ更新メソッド](https://learn.microsoft.com/graph/api/message-update?view=graph-rest-1.0&tabs=http)で変更できる多くのプロパティが含まれます。

#### 受信済みメール メッセージの不変性

メール メッセージは受信された後、既読状態やフラグなどの管理関連プロパティを除き、変更されるべきではないという基本的な前提があります。アドレス一覧、件名、本文などの重要な要素は、新しい下書きメッセージを作成しない限り変更されるべきではありません。このルールの例外は、疑わしいメールの特定やその他の特権操作など、特にセキュリティ分野における特殊なユース ケースです。

#### 機密プロパティの変更に必要なアクセス許可

標準的な管理操作におけるメール メッセージの不変性を維持するため、上位のアクセス許可を持たないアプリケーションが下書き以外のメッセージの機密プロパティを変更することを制限します。具体的には、シナリオに応じて [Mail-Advanced.ReadWrite](https://learn.microsoft.com/graph/permissions-reference#mail-advancedreadwrite)、[Mail-Advanced.ReadWrite.All](https://learn.microsoft.com/graph/permissions-reference#mail-advancedreadwriteall)、または [Mail-Advanced.ReadWrite.Shared](https://learn.microsoft.com/graph/permissions-reference#mail-advancedreadwriteshared) のいずれかのアクセス許可が必要になります。これらのアクセス許可にはすべてテナント管理者の同意が必要です。

[ドキュメント ページ](https://learn.microsoft.com/graph/api/message-update?view=graph-rest-1.0&tabs=http)では、isDraft = true の場合にのみ更新可能なプロパティを機密プロパティとして定義しています。制限が適用された後は、下書き以外のメッセージでこれらのプロパティを更新するには Mail-Advanced.ReadWrite アクセス許可が必要になります。下書きメッセージは引き続き現在の Mail.ReadWrite アクセス許可で更新できます。

#### タイムラインと推奨事項

必要なアクセス許可はすでに利用可能です。サービスでの新しい制限の適用 (Graph API によるメールの機密プロパティの更新のブロック) は 2026 年 12 月 31 日に開始されます。これらのプロパティを変更する Graph API アプリケーションを開発している場合は、できるだけ早くアプリケーションを更新して必要な上位のアクセス許可を要求することを強くお勧めします。これにより、スムーズな移行が実現し、利用者への潜在的な中断を最小限に抑えることができます。
