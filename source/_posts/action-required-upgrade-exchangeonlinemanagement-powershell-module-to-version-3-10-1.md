---
title: ExchangeOnlineManagement PowerShell モジュールをバージョン 3.10.1 以降にアップグレードしてください
date: 2026-10-02 17:31
tags:
  - Exchange Online
  - PowerShell
---
※ この記事は、[Action Required: Upgrade ExchangeOnlineManagement PowerShell Module to Version 3.10.1 or Newer](https://techcommunity.microsoft.com/blog/exchange/action-required-upgrade-exchangeonlinemanagement-powershell-module-to-version-3-/4561418) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online PowerShell の認証を強化する機能が、ExchangeOnlineManagement モジュール バージョン 3.10.1 以降に導入されました。認証フローを強化し、新たな脅威から保護する機能です。3.10.1 より前のバージョンを使用している場合は、3.10.1 以降にアップグレードしてください。古いバージョンでは、今後必要となる認証要件に対応できない可能性があります。

すでに 3.10.1 以降を使用している場合、追加の対応は必要ありません。引き続きモジュールを最新の状態にしてください。

最新のセキュリティ、信頼性、パフォーマンスの向上を利用し、今後 PowerShell の接続に関する問題が発生するのを防ぐため、できるだけ早くアップグレードすることを推奨します。

#### 変更内容

Exchange Online PowerShell モジュールでは、より厳格なサインイン要件の適用を 2027 年 3 月 31 日に開始する予定です。

適用後は、次のようになります。

1. ExchangeOnlineManagement 3.10.1 より前のバージョンでは、一部の対話型認証シナリオで認証に失敗する可能性があります。
2. ExchangeOnlineManagement 3.10.1 以降は、引き続き通常どおり動作します。

ExchangeOnlineManagement モジュールを 3.10.1 以降にアップグレードしてください。ほかに必要な変更はありません。

#### 影響を受ける可能性がある利用者

次のいずれかに該当する場合、影響を受ける可能性があります。

1. ExchangeOnlineManagement 3.10.1 より前のバージョンを実行している。
2. PowerShell 7 を使用している。
3. Web Account Manager (WAM) を無効にして対話型認証を使用している。

次のいずれかを使用している場合、影響を受けない可能性があります。

1. ExchangeOnlineManagement 3.10.1 以降。
2. 証明書ベースの認証 (CBA)。
3. WAM ベースの認証。
4. Windows PowerShell 5.x。

現在の利用状況にかかわらず、現在および今後の Exchange Online の要件に対応できるよう、ExchangeOnlineManagement 3.10.1 以降へのアップグレードを推奨します。

現在インストールされているバージョンは、次のコマンドで確認できます。

```powershell
Get-Module ExchangeOnlineManagement -ListAvailable
```

ExchangeOnlineManagement モジュールの最新バージョンは、[PowerShell Gallery の ExchangeOnlineManagement PowerShell Module](https://www.powershellgallery.com/packages/ExchangeOnlineManagement/3.10.1) から入手できます。

#### よくある質問

**ExchangeOnlineManagement 3.10.1 以降をすでに使用しています。何か対応が必要ですか?**

この変更に関する追加の対応は必要ありません。最新のセキュリティ、信頼性、パフォーマンスの向上を利用できるよう、引き続きモジュールを最新の状態にしてください。

**証明書ベースの認証 (CBA) を使用する場合、既存のスクリプトに影響しますか?**

CBA を使用するスクリプトや自動化は対話型認証を使用しないため、この適用による影響は想定されていません。ただし、最新のセキュリティと信頼性の向上を利用できるよう、ExchangeOnlineManagement 3.10.1 以降へのアップグレードを推奨します。

**WAM を有効にする必要がありますか?**

いいえ。この変更のために WAM を有効にする必要はありません。

**現在の認証シナリオが影響を受けない場合も、新しいモジュールにアップグレードする必要がありますか?**

はい。現在の認証シナリオにかかわらず、すべての利用者に ExchangeOnlineManagement 3.10.1 以降へのアップグレードを推奨します。初回の適用で影響を受けないシナリオであっても、アップグレードすることで現在および今後の Exchange Online の認証要件との互換性を確保しやすくなります。

Exchange Online Manageability Team
