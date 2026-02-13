---
title: Exchange Online PowerShell における -Credential パラメーターの廃止
date: 2026-2-16
lastupdate: 
tags: Exchange Online
---
※ この記事は、[Deprecation of the -Credential Parameter in Exchange Online PowerShell](https://techcommunity.microsoft.com/blog/exchange/deprecation-of-the--credential-parameter-in-exchange-online-powershell/4494584) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online のセキュリティ強化に向けた継続的な取り組みの一環として、Exchange Online PowerShell モジュールに対する重要な変更についてお知らせします。

#### 変更内容と理由
Microsoft は、すべてのサービスにおいて、より安全で最新の認証方式へ段階的に移行しています。この取り組みの一環として、多要素認証 (MFA) は Microsoft クラウド サービス全体における必須のセキュリティ要件となりつつあります。従来の Resource Owner Password Credentials (ROPC) 認証フローは MFA をサポートしていないため、Microsoft によるセキュリティ基準強化の一環として、廃止に向けた段階に入っています。さらに、Microsoft の各種サービスで使用されている認証ライブラリである Microsoft Authentication Library (MSAL) においても、バージョン 4.74.0 以降、 ROPC を非推奨となっています。

Exchange Online PowerShell の -Credential パラメーターは ROPC に依存しているため、MFA や条件付きアクセスの要件を満たしていません。MFA の強制適用、最新の認証原則、ならびに Microsoft の包括的なセキュリティ基準に対応するため、**2026 年 6 月以降** にリリースされる新しい Exchange Online PowerShell バージョンでは、-Credential パラメーターのサポートが廃止される予定です。

公開されたタイムラインは 2026 年 6 月までですが、期限まで待たずに可能な限り早期に -Credential パラメーターの使用から移行することを強く推奨します。

#### -Credential パラメーターの代替方法

以下はシナリオ別に利用可能な -Credential パラメーターの代替方法を示します。

| **シナリオ / ユース ケース** | **推奨される認証方法** | **説明** | **公開情報** |
| --- | --- | --- | --- |
| **管理者による対話型接続** | *対話型サインイン (モダン認証 + MFA)* | 管理者向けのセキュアなサインイン。MFA と条件付きアクセスをサポートします。 | [Exchange Online PowerShell に接続する \| Microsoft Learn](https://learn.microsoft.com/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps) |
| **Azure の外部でのオートメーション実行** | *アプリ専用認証* | 非対話型オートメーション用の証明書ベースまたはシークレットベースのアプリ登録。 | [Exchange Online PowerShell とセキュリティ & コンプライアンス PowerShell での無人スクリプトのアプリ専用認証 \| Microsoft Learn](https://learn.microsoft.com/powershell/exchange/app-only-auth-powershell-v2?view=exchange-ps) |
| **Azure サービス内でのオートメーション実行** | *マネージド ID 認証* | Functions、Automation Accounts、クラウドネイティブなタスクに最適。シークレットを完全に不要にします。 | [Azure マネージド ID を使用して Exchange Online PowerShell に接続する \| Microsoft Learn](https://learn.microsoft.com/powershell/exchange/connect-exo-powershell-managed-identity?view=exchange-ps) |

#### タイムライン
- **現在の状態:** *-Credential* パラメーターは現時点でもサポートされており、2026 年 6 月末までにリリースされるすべてのモジュールで引き続き利用可能です。
- **推奨される対応 (即座に実施):** *Connect-ExchangeOnline コマンドレットを使用して Exchange Online に接続する際に、-Credential パラメーターを使わない方法へ切り替え始めてください。*
- **2026 年 6 月以降:** 2026 年以降にリリースされる Exchange Online PowerShell モジュールの新しいバージョンでは、-Credential パラメーターはサポートされなくなります。

代替認証フローにおいて不足している点やサポートされていないシナリオがありましたら、今後のアップデートで優先的に対応するため、コメント欄でお知らせください。
