---
title: クラウド上のオブジェクトをオンプレミスで管理する
date: 2021-11-05
lastupdate: 2024-12-10 16:00:00
tags: 
- Exchange
---

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームです。昨今、大変ありがたいことに Microsoft 365 をご利用頂くお客様も大変多くなってまいりました！

本日は少々今更に思われるかもしれませんが、Microsoft Entra Connect (AADC) で同期している環境において、Microsoft 365 上、つまり Exchange Online 上のオブジェクトを、オンプレミス Exchange サーバーの管理ツールを使用して管理できるようにするための手順について、ご案内致します。

## 事前準備

まず Exchange Server または Exchange 管理ツールのインストール対象のサーバーにおいて下記のシステム要件の確認、および前提条件となる準備を実施します。

- [Exchange Server 2019 システム要件](https://learn.microsoft.com/exchange/plan-and-deploy/system-requirements?view=exchserver-2019)
- [Exchange Server の前提条件](https://learn.microsoft.com/exchange/plan-and-deploy/prerequisites?view=exchserver-2019)


続いて、下記手順で Exchange Server または Exchange 管理ツールのインストールの準備を行い、メール ユーザーまたはリモート メールボックスの有効化を実施します。

## 1. スキーマ拡張の実施

Exchange Server のインストールの前に、Exchange 属性の追加のためスキーマ拡張を実施します。詳細な手順については下記公開情報をご参照ください。

- [Exchange Server に対応したドメインと Active Directory の準備](https://learn.microsoft.com/exchange/plan-and-deploy/prepare-ad-and-domains?view=exchserver-2019)

## 2. Exchange Server のインストール

下記公開情報内の手順に沿って、セットアップウィザードを用いて Exchange Server のメールボックス サーバーまたは Exchange 管理ツールのインストールを実施します。

- [セットアップ ウィザードを使用した Exchange メールボックス サーバーのインストール](https://learn.microsoft.com/exchange/plan-and-deploy/deploy-new-installations/install-mailbox-role?view=exchserver-2019)
- [Exchange 管理ツールをインストールする](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/install-management-tools?view=exchserver-2019)

## 3. リモート メールボックスまたはメール ユーザーの有効化

下記の通り、`Enable-RemoteMailbox` コマンドまたは `Enable-MailUser` コマンドを実施します。これにより、そのユーザー アカウントはリモート (Exchange Online もしくは外部のメール サーバー) にメールボックスを保持していながら、オンプレミス Exchange サーバー上でメールが有効なオブジェクトとして管理できるようになります。

### Exchange Online 側にメールボックスを作成する場合

```PowerShell
Enable-RemoteMailbox -Identity <対象ユーザー名> -RemoteRoutingAddress <Exchange Online でプライマリ アドレスとして使用する SMTP アドレス>
```

実行例:

```PowerShell
Enable-RemoteMailbox -Identity User001 -RemoteRoutingAddress User001@contoso.com
```

### Exchange Online 側にメールボックスを作成しない場合

```PowerShell
Enable-MailUser -Identity <対象ユーザー名> -ExternalEmailAddress <Exchange Online でプライマリ アドレスとして使用する SMTP アドレス>
```

実行例:

```PowerShell
Enable-MailUser -Identity User001 -ExternalEmailAddress User001@contoso.com
```

## 4. リモート メールボックスまたはメール ユーザーの編集

念のため、上記コマンドを実行した後は、不足しているパラメータがないかを以下のコマンドで確認し、不足分があれば手動で (Set-RemoteMailbox / Set-MailUser コマンドにて) 追加するようにしましょう。

```PowerShell
Get-RemoteMailbox -Identity <対象ユーザー名>
Get-MailUser -Identity <対象ユーザー>
```

例えばセカンダリ アドレスを追加したい場合は、以下のような形です。

### リモート メールボックスにセカンダリ SMTP アドレスを追加する場合

```PowerShell
Set-RemoteMailbox -Identity <対象ユーザー名> -EmailAddresses @{add="追加する SMTP アドレス"}
```

実行例:

```PowerShell
Set-RemoteMailbox -Identity user001 -EmailAddresses @{add="User001_Modified@contoso.com"}
```

### メール ユーザーにセカンダリ SMTP アドレスを追加する場合

```PowerShell
Set-MailUser -Identity <対象ユーザー名> -EmailAddresses @{add="追加する SMTP アドレス"}
```

実行例:

```PowerShell
Set-MailUser -Identity User001 -EmailAddresses @{add="User001_Modified@contoso.com"}
```

### 参考リンク

- [Enable-MailUser (ExchangePowerShell) | Microsoft Learn](https://learn.microsoft.com/powershell/module/exchange/enable-mailuser?view=exchange-ps)
- [Enable-RemoteMailbox (ExchangePowerShell) | Microsoft Learn](https://learn.microsoft.com/powershell/module/exchange/enable-remotemailbox?view=exchange-ps)
