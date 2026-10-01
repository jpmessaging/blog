---
title: "Exchange Online の EWS 廃止がハイブリッドのリッチ共存と組織間の共有に与える影響"
date: 2026-10-01 13:43
tags:
- Exchange
- Exchange Online
---

※ この記事は、[Impact of Exchange Online EWS Deprecation on Hybrid Rich Coexistence and Cross-org Sharing](https://techcommunity.microsoft.com/blog/exchange/impact-of-exchange-online-ews-deprecation-on-hybrid-rich-coexistence-and-cross-o/4561161) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

間もなく実施される Exchange Online の EWS 廃止が、ハイブリッド環境のお客様や異なる組織間の共有シナリオにどのような影響を与えるかについて説明します。

[Exchange Online EWS: 廃止期限が迫っています](/blog/exchange-online-ews-your-time-is-almost-up/) で述べた通り、Exchange Online の Exchange Web Services (EWS) に対する変更は間近に迫っています。EWS はオンプレミスでは廃止されませんが、オンプレミスの Exchange を利用している組織に影響する 2 つの特定のシナリオを取り上げ、2026 年 10 月から 2027 年 4 月にかけて Exchange Online の EWS 変更が始まった際にビジネスへの影響が出ないようにする方法を説明します。

### シナリオ 1: オンプレミスと Exchange Online の両方でメールボックスをホストしているハイブリッド環境のお客様

[ハイブリッド展開における Exchange Server のセキュリティ変更](/blog/exchange-server-security-changes-for-hybrid-deployments/) で案内した通り、オンプレミスの Exchange を利用しているお客様は、リッチ共存シナリオ (オンプレミスの Exchange ユーザーが Exchange Online ユーザーとやり取りする際の空き時間情報やメール ヒントなどの参照) で Graph の呼び出しを利用できるようにするため、少なくとも 2026 年 5 月 (またはそれ以降) の Exchange Server Subscription Edition (Exchange SE) 向け更新プログラムへのアップグレードが必要です。この機能で Graph を使用できるのは Exchange SE のみです。必要な更新プログラムの案内は、[Exchange SE ハイブリッドのオンプレミス リッチ共存を Graph API に移行する方法](/blog/update-your-exchange-se-hybrid-on-premises-rich-coexistence-to-graph/) をご確認ください。

**問題点:** [ドキュメント](https://learn.microsoft.com/Exchange/hybrid-deployment/deploy-dedicated-hybrid-app#configure-graph-api-permissions) に記載の通り、オンプレミスのメールボックスが Exchange Online にアーカイブ メールボックスを持つシナリオは、*まだ完全にはサポートされていません*。この機能は今後数か月のうちに有効化される見込みです。

**対応方法:** オンプレミスのメールボックスに Exchange Online のオンライン アーカイブを使用している場合、現時点では引き続き Exchange Online テナントで EWS 機能を使用してください。具体的には、以下の対応が必要です。

- オンプレミスの Exchange SE サーバーから EWS の権限を削除して Graph に完全に切り替えることは、*まだ* 行わない。
- テナントの [EWSEnabled 設定が TRUE に設定されている](/blog/exchange-online-ews-your-time-is-almost-up/) ことを確認する。
- Exchange ハイブリッド専用アプリを、[テナントの EWSAllowedAppIDs (App ID 許可リスト)](/blog/introducing-ewsallowedappids-preparing-for-the-final-phase-of-ews-retirement/) に追加する。

影響を受けない組織:

- ハイブリッド環境ではあるものの、オンプレミスでメールボックスをホストしていない組織。
- オンプレミスにメールボックスはあるものの、それらのメールボックスでオンライン アーカイブを使用していない組織。

### シナリオ 2: 別の Exchange Online 組織とリッチ共存を行っているオンプレミスの Exchange 組織

これは、純粋にオンプレミスの組織 (ここでは Contoso とします) が、空き時間情報、メール ヒント、ユーザーの写真、予定表の共有情報をやり取りするために、別の Exchange Online 組織 (Fabrikam) と組織間関係を結んでいる状況です。

**問題点:** このような組織間関係は、オンプレミスの Contoso のサーバーが Fabrikam の Exchange Online テナントに対して EWS で通信することに依存しています。そのため、オンプレミスから EWS を使用しない解決策が提供されるまでは、Fabrikam のテナントで EWS を有効 (EWSEnabled = True) にしておく必要があります。

**対応方法:** Exchange Online 組織側 (この例では Fabrikam) は、[テナントの EWSEnabled 設定が TRUE に設定されている](/blog/exchange-online-ews-your-time-is-almost-up/) ことを確認する必要があります。

その他のパターン:

- 2 つの Exchange Online 組織が組織間関係を使用して空き時間情報などを共有している場合 (オンプレミスは関与しません) は、[クロステナントの空き時間情報、メール ヒント、予定表共有の管理がクロステナント アクセス ポリシーへ移行](/blog/cross-tenant-freebusy-mailtips-and-calendar-sharing-are-moving-to-cross-tenant-a/) をご確認ください。
- 2 つのオンプレミスの Exchange 組織が互いに組織間関係を使用している場合 (Exchange Online は関与しません)。現時点で対応は不要です。

The Exchange Team
