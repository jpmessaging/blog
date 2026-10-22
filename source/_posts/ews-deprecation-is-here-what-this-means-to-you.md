---
title: "Exchange Online の EWS 廃止が始まりました: 今後の変更と対応"
date: 2026-10-02 12:00
lastupdate: 2026-10-22
tags:
- Exchange
- Exchange Online
---

※ この記事は、[EWS Deprecation Is Here – What This Means To You](https://techcommunity.microsoft.com/blog/exchange/ews-deprecation-is-here-%E2%80%93-what-this-means-to-you/4561431) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online の EWS 廃止は今日から始まります。これは数年前から準備されてきた複数段階のプロセスです。この記事には重要な情報が多く含まれており、新しい情報があればこの記事を更新します。

[事前に発表したとおり](/blog/exchange-online-ews-your-time-is-almost-up/)、2026 年 10 月上旬から、`EWSEnabled` を `True` にするだけではテナントで EWS を引き続き使えなくなります。EWS へのアクセスを許可するアプリを指定する `EWSAllowedAppIDs` (App ID 許可リスト) も必要になります。

### 今後の変更

#### マルチテナント (WW) クラウドのテナント

| EWSEnabled の状態 | EWSAllowedAppIDs の状態 | 時期 |
|---|---|---|
| True | Null | 該当するすべてのテナントに対し、10 月 10 日から 11 日にかけて `EWSAllowedAppIDs` を登録しました。<br><br><span style="color:red">10 月 11 日以降に `EWSEnabled = True` に設定するテナント管理者は、自身で `EWSAllowedAppIDs` を設定する必要があります。 </span>|
| Null | Null | テナントには変更の 7 日前に Message Center で通知されます。その後、過去 60 日間の利用状況に基づいて `EWSAllowedAppIDs` が設定され、`EWSEnabled` が `False` に設定されます。<br><br><span style="color:red">このプロセスはすでに開始されています。</span>EWS が無効になった場合、テナント管理者は [Exchange Online で EWS アプリケーションが動作しなくなった場合の対処方法](/blog/exchange-online-ews-application-stopped-working-do-this/) の手順に従って、一時的に EWS を再度有効にできます。 |
| False | (Any) | テナント管理者がすでに EWS を無効にしているため、Microsoft は変更を加えません。 |

<p style="background: #ffff99">マルチテナント WW クラウドでは、<code>EWSEnabled = True</code> の場合に <code>EWSAllowedAppIDs</code> の設定が<strong>必須</strong>になりました。</p>

#### ソブリン クラウド環境のテナント

詳細なスケジュールは後日お知らせします。

### その他の重要な情報

#### EWS 関連設定の変更

- <span style="color:red">`EWSAllowedAppIDs` の変更が反映されるまで、**24 時間**かかります。</span>
- <span style="color:red">`EWSEnabled` の変更が反映されるまで、通常は **1 時間未満** (最長 4 時間) かかります。</span>
- `EWSAllowList` プロパティは EWS 廃止とは関係ありません。設定や変更は不要です。詳細は[こちらの記事](/blog/notes-from-the-field-testing-ewsallowedappids-safely/)をご確認ください。

<p style="background: #ffff99;color:red">Microsoft が EWS を無効にした場合、再度有効にできるのはテナント管理者だけです (Microsoft 側では再度有効にできません)。手順は <a href="https://jpmessaging.github.io/blog/exchange-online-ews-application-stopped-working-do-this/">Exchange Online で EWS アプリケーションが動作しなくなった場合の対処方法</a> で説明されています。</p>

#### Microsoft アプリケーションによる EWS の使用

一部の Microsoft アプリケーションから引き続き通信がある場合があります。EWS 使用状況レポートに表示されるアプリケーションは、引き続き利用するために `EWSAllowedAppIDs` への登録が必要です。

各アプリケーションに関する最新情報は次のとおりです。

- 従来の Outlook for Windows: 最新ビルド (2026 年 8 月のビルド `16.0.20430.20092` 以降) を使用してください。EWS を無効にしたときに問題が発生する場合は、管理者が強制した構成が原因の可能性があります ([例](https://support.microsoft.com/support/known-issues/how-to-revert-the-outlook-desktop-webview-based-room-finder-to-the-legacy-room-finder))。影響がないことを確認するため、テナントで Office クライアントの App ID による EWS のブロックをテストすることをお勧めします。Microsoft 社内では 1 年以上前に EWS を無効にしています。
- Outlook for Mac: 最新ビルドに更新し、新しい Outlook for Mac に切り替えてください。すでに新しい Outlook for Mac を使っている場合、この変更の影響はありません。従来の Outlook for Mac を引き続き使う場合は、`Microsoft Office` App ID が `EWSAllowedAppIDs` に含まれていることを確認してください。
- Excel Power Query: [こちら](https://aka.ms/xlewsretirement)をご確認ください。
- Power BI: 近日中に最新情報が案内される予定です。
- Exchange Server / Exchange ハイブリッド: [Exchange Online の EWS 廃止がハイブリッドのリッチ共存と組織間の共有に与える影響](/blog/impact-of-exchange-online-ews-deprecation-on-hybrid-rich-coexistence-and-cross-o/)をご確認ください。

**この記事の更新履歴:**

- 2026 年 10 月 21 日: EWS の無効化が開始されたことを反映し、再度有効にする方法の参照先へのリンクを追加しました。
- 2026 年 10 月 15 日: WW テナント向けの次のステップを表に追加し、読みやすさを高めるため情報を再構成しました。
- 2026 年 10 月 2 日: これまでに数件の事例が確認されたことを踏まえ、`EWSEnabled` の設定が反映されるまでの時間にばらつきがあることを追記しました。

The Exchange Team
