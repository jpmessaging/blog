---
title: "Exchange Server の AD FS 先進認証: Outlook クライアントのサポートを拡大"
date: 2026-09-09
tags:
- Exchange
---
※ この記事は、[Exchange Server AD FS Modern Authentication: Expanded Outlook client support](https://techcommunity.microsoft.com/blog/exchange/exchange-server-ad-fs-modern-authentication-expanded-outlook-client-support/4554410) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

**Exchange Server の AD FS 先進認証において、Outlook クライアントのサポートが拡大しました。**

[以前のお知らせ](https://techcommunity.microsoft.com/blog/exchange/update-on-exchange-server-adfs-modern-authentication-support/4338563) では、Outlook for Windows と Outlook for Mac に加え、iOS および macOS の標準メール アプリのサポートについてご案内しました。今回、さらに Outlook for iOS と Outlook for Android もサポート対象となりました。

これにより、サポート対象となるオンプレミスのみの Exchange Server 環境では、Outlook for iOS と Outlook for Android から AD FS 先進認証を使用してメールボックスにアクセスできるようになります。

**対象となる環境:** AD FS 先進認証は、Microsoft Entra ID や Exchange ハイブリッド構成を使用していない、オンプレミスのみの Exchange 組織を対象としています。Exchange ハイブリッド組織では、引き続き Microsoft Entra ID を使用したハイブリッド先進認証 (HMA) を使用してください。

# サポート対象クライアントの一覧

| **クライアント** | **サポート対象のリリースまたは OS** | **管理者が行う作業** |
| --- | --- | --- |
| Outlook for Windows | サポート対象の Microsoft 365 Apps 各チャネルおよび永続ライセンス版<br>Windows 11 バージョン 22H2 以降 | 必要な Windows 更新プログラムをインストールし、AD FS サービスの URL を信頼済みサイトとして構成したうえで、Outlook でオンプレミス Exchange の先進認証を有効にします。 |
| Outlook for Mac | Microsoft 365 の Outlook for Mac ビルド 16.106 以降<br>macOS Sequoia 以降 | 2025 年 12 月以降のセキュリティ更新プログラムを適用した Exchange Server Subscription Edition を使用し、`ADFSAuthorizedURLs` を構成します。 |
| Outlook for iOS | サポート対象となる最新バージョンの Outlook for iOS および iOS | Exchange と AD FS の構成手順に従います。 |
| Outlook for Android | サポート対象となる最新バージョンの Outlook for Android および Android OS | 公開されている Exchange と AD FS の構成手順に従って構成します。 |
| iOS および macOS の標準のメール アプリ | iOS 17.6.1 以降<br>macOS Sequoia 以降 | 公開されている手順に従い、AD FS の Outlook アプリケーション グループでネイティブ クライアント アプリケーションとアクセス許可を構成します。 |

### ドキュメントの更新

サポート対象クライアントに関する要件をより確認しやすくするため、展開ドキュメントを更新しました。

- サポート対象クライアントおよび OS の要件を一覧で確認できる、新しいサマリーを追加しました。
- Outlook for Windows については、Outlook のビルド要件、Windows の更新プログラム要件、レジストリ設定、および AD FS の信頼済みドメイン要件を、Windows クライアント向けの項目としてまとめました。
- Outlook for Mac については、`ADFSAuthorizedURLs` の Terminal 構成手順、複数名前空間を使用する場合の構成例、および同等の Mobile Device Management (MDM) 設定を要件として追加しました。

### 関連情報

前提条件と構成手順の詳細は、[オンプレミスの Exchange Server でモダン認証を有効にする](https://aka.ms/ExchangeADFSModernAuth) を参照してください。

以前のクライアント サポート拡大に関する背景については、[Update on Exchange Server ADFS Modern Authentication support](https://techcommunity.microsoft.com/blog/exchange/update-on-exchange-server-adfs-modern-authentication-support/4338563) を参照してください。