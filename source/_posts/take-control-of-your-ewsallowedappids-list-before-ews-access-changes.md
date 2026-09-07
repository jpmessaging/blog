---
title: "EWS アクセス変更に備えて、EWSAllowedAppIDs リストを適切に管理しましょう"
date: 2026-09-07 17:00
tags: Exchange Online
---
※ この記事は、[Take control of your EWSAllowedAppIDs list before EWS access changes](https://techcommunity.microsoft.com/blog/exchange/take-control-of-your-ewsallowedappids-list-before-ews-access-changes/4553534) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Web Services (EWS) の廃止に向けた最終段階の一環として、EWS の AppID 許可リストを作成するために利用できる [EWSAllowedAppIDs](https://techcommunity.microsoft.com/blog/exchange/introducing-ewsallowedappids-preparing-for-the-final-phase-of-ews-retirement/4529471) 設定の適用方法を見直しています。私たちの目標は、各テナントの管理者が許可リストを管理できる状態を維持しながら、予期しないサービス中断を防ぐことができるようにすることです。

<p style="background: #f5ff66ed;"><strong>すべてのお客様に対して、EWS の利用状況を確認し、EWSAllowedAppIDs をご自身で構成していただくことを強く推奨します。管理者がすでに EWSAllowedAppIDs を構成している場合、Microsoft がそのリストを上書きしたり変更したりすることはありません。お客様が管理するリストが引き続き有効な設定として優先されます。</strong></p>

### ロールアウト中に何が起こるのか

2026 年 10 月 1 日から、Microsoft は [以前のブログ記事](/blog/introducing-ewsallowedappids-preparing-for-the-final-phase-of-ews-retirement/) で説明した新しい動作を順次有効にします。今回の動作変更により、`EWSEnabled` が `True` に設定されている場合、EWS を利用するためには許可された AppID リストが必要になります。適用のタイミングは、各テナントの環境にロールアウトされるタイミングによって異なります。

組織の設定値に応じて、次の処理が行われます。

- **`EWSEnabled = True`**: すべてのテナントに EWSAllowedAppIDs リストが存在することを確保します。お客様がリストを作成していない場合は、クラウド環境のロジック変更 (EWSEnabled = True の場合に AppID の許可リストが必須となる変更) によるサービス中断のリスクを軽減するため、Microsoft がリストを作成します。リストは過去 60 日間の利用状況に基づいて作成されるため、利用頻度の低いアプリケーションが含まれない可能性があるほか、既にアクセスを許可したくないアプリケーションが含まれる可能性もあります。これは、ロジック変更が実施される直前に行われます。
- **`EWSEnabled = Null`**: お客様が EWSAllowedAppIDs をまだ設定していない場合に限り、Microsoft がリストを作成します。この処理は、テナントごとのロールアウトで `EWSEnabled` を `False` に変更する数日前に行われます。そのため、`EWSEnabled` プロパティを `Null` から変更していないテナントでは、10 月後半まで AppID 許可リストが定義されていない可能性があります。

引き続き EWS が必要な場合は、今すぐ対応してください。EWS の利用を継続する必要があるアプリケーションだけを EWSAllowedAppIDs に登録し、その後 `EWSEnabled` を `True` に設定します。また、EWS が廃止される前に、アプリケーションを EWS から Microsoft Graph へ移行する計画も進めてください。EWSAllowedAppIDs の値を自ら管理することで、10 月のロールアウト開始後も、EWS へのアクセスを許可したいアプリケーションだけが EWS を利用できるようになります。