---
title: "Exchange Online の EWS 廃止が始まりました: 今後の変更と対応"
date: 2026-10-02 12:00
tags:
- Exchange
- Exchange Online
---

※ この記事は、[EWS Deprecation Is Here – What This Means To You](https://techcommunity.microsoft.com/blog/exchange/ews-deprecation-is-here-%E2%80%93-what-this-means-to-you/4561431) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online の EWS 廃止は 2026 年 10 月 1 日から始まりました。これは数年前から準備されてきた複数段階のプロセスです。重要な情報が多く含まれており、新しい情報があればこの記事を更新します。

[事前に発表したとおり](/blog/exchange-online-ews-your-time-is-almost-up/)、2026 年 10 月上旬から、`EWSEnabled` を `True` にするだけではテナントで EWS を引き続き使えなくなります。EWS へのアクセスを許可するアプリを指定する `EWSAllowedAppIDs` (App ID 許可リスト) も必要になります。

### 今後の変更

`EWSEnabled = True` に設定済みで、`EWSAllowedAppIDs` をまだ作成していないマルチテナント (WW) クラウドのテナントでは、次の変更が行われます。

| 日付 | 変更内容 | 影響 |
|---|---|---|
| 10 月 2 日の終日 (太平洋時間) | Microsoft が `EWSEnabled = True` で `EWSAllowedAppIDs` がないテナントの一覧を記録します。 | この日以降に `EWSEnabled = True` にするテナント管理者は、自身で `EWSAllowedAppIDs` を設定する必要があります。 |
| 10 月 8 ～ 9 日の終日 (太平洋時間) | 10 月 2 日に一覧へ記録されたテナントについて、過去 60 日間に使われた EWS の App ID を `EWSAllowedAppIDs` に登録します。 | Microsoft が対象テナントの許可リストを作成します。 |
| 10 月 10 日以降 | WW クラウドのすべてのテナントで、`EWSEnabled = True` の場合に `EWSAllowedAppIDs` を必須にするクラウド設定を有効にします。 | この日以降、WW クラウドでテナントの EWS が有効 (`EWSEnabled = True`) であれば、App ID 許可リストが必要です。 |

この変更は、まず WW クラウドで行われます。他のクラウドのテナントには、後日 Message Center を通じて個別の案内とスケジュールが通知されます。

この変更後、第 2 段階として、`EWSEnabled` が未設定 (`Null`) のままで、`EWSAllowedAppIDs` も作成していない WW クラウドのテナントでは EWS が無効になります。

- 対象に選ばれたテナントには、Message Center で 7 日前に通知されます。
- Microsoft が `EWSEnabled` を `False` にした後に EWS が必要になった場合は、`EWSEnabled` を `True` に戻す必要があります。Microsoft は、設定を `False` にする直前に過去 60 日間の利用状況に基づいて `EWSAllowedAppIDs` を登録します。

### その他の重要な情報

#### EWS 関連設定の変更

- `EWSAllowedAppIDs` の変更が反映されるまで、24 時間かかります。
- `EWSEnabled` の変更が反映されるまで、約 1 時間かかります。
- `EWSAllowList` プロパティは EWS 廃止とは関係ありません。設定や変更は不要です。詳細は[こちらの記事](/blog/notes-from-the-field-testing-ewsallowedappids-safely/)をご確認ください。

#### Microsoft アプリケーションによる EWS の使用

一部の Microsoft アプリケーションから引き続き通信がある場合があります。EWS 使用状況レポートに表示されるアプリケーションは、引き続き利用するために `EWSAllowedAppIDs` への登録が必要です。

各アプリケーションに関する最新情報は次のとおりです。

- 従来の Outlook for Windows: 最新ビルド (2026 年 8 月のビルド `16.0.20430.20092` 以降) を使用してください。EWS を無効にしたときに問題が発生する場合は、管理者が強制した構成が原因の可能性があります ([例](https://support.microsoft.com/support/known-issues/how-to-revert-the-outlook-desktop-webview-based-room-finder-to-the-legacy-room-finder))。影響がないことを確認するため、テナントで Office クライアントの App ID による EWS のブロックをテストすることをお勧めします。Microsoft 社内では 1 年以上前に EWS を無効にしています。
- Outlook for Mac: 最新ビルドに更新し、新しい Outlook for Mac に切り替えてください。すでに新しい Outlook for Mac を使っている場合、この変更の影響はありません。従来の Outlook for Mac を引き続き使う場合は、`Microsoft Office` App ID が `EWSAllowedAppIDs` に含まれていることを確認してください。
- Excel Power Query: [こちら](https://aka.ms/xlewsretirement)をご確認ください。
- Power BI: 近日中に最新情報が案内される予定です。
- Exchange Server / Exchange ハイブリッド: [Exchange Online の EWS 廃止がハイブリッドのリッチ共存と組織間の共有に与える影響](/blog/impact-of-exchange-online-ews-deprecation-on-hybrid-rich-coexistence-and-cross-o/)をご確認ください。

The Exchange Team

更新日: 2026 年 10 月 1 日  
バージョン: 7.0
