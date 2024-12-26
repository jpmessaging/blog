---
title: >
  Exchange Online のメール アプリケーションにサインインできない、またはパスワードを繰り返し要求されますか? ここから対策を始めましょう。
date: 2022-10-11
tags: Exchange Online
---
※ この記事は、[Exchange Online email applications stopped signing in, or keep asking for passwords? Start here.](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-online-email-applications-stopped-signing-in-or-keep/ba-p/3641943) の抄訳です。最新の情報はリンク先をご確認ください。

2022 年 10 月 1 日より、Microsoft は、"基本認証" と呼ばれる Exchange Online への古いログイン方法を無効化します。この古い方法は、様々な形式のパスワード攻撃に対して脆弱です。最新の認証規格は OAuth という規格に基づいており、弊社が実装するこの規格は、“先進認証” と呼ばれます。
組織において古いログイン方法が無効化されると、メール システムにサインインできないなどの問題が、一部のお客様に発生する可能性があります。
組織の基本認証が無効化されたものの、様々なメール クライアントで引き続き基本認証を使用する場合は、以下の 2 つの点を確認しておく必要があります。
- 組織の基本認証を一時的に再有効化する方法 (サインインできない問題が直ちに解消されます)-
- 基本認証の使用を完全に停止する方法 (一時的な再有効化機能が 2022 年 12 月 31 日に停止するため)。**本件に対処しない場合、基本認証が完全に無効化される 2023 年 1 月以降、ユーザーは Exchange Online にサインインできなくなります。**

両者について以下に記載しています。


## 組織の基本認証を一時的に再有効化する

弊社のセルフサービス診断を使用することにより、テナントの基本認証を再有効化することができます。全体管理者である場合は、以下のボタンをクリックすると、Microsoft 365 管理センター内の診断機能に誘導され、セルフサービス診断を開始することができます。

<a class="fancybox" href="https://aka.ms/PillarEXOBasicAuth" target="_blank">
{% asset_img image1.png "Diag" %}
</a>


または、[Microsoft 365 管理センター](https://admin.microsoft.com/)へ移動し、画面の右下にある緑色の [ヘルプとサポート] ボタンをクリックします。

![](image2.png)  


[ヘルプとサポート] ボタンをクリックすると、セルフヘルプ システムに入ります。ここで、「**Diag: Enable Basic Auth in EXO**」 (診断: Exchange Online の基本認証を有効化する) というフレーズを入力し、テストを実行します。テストの結果は以下のように表示されます (結果は、組織で無効化された内容に応じて異なります)。

![](image3.png)  

必要なプロトコルごとに基本認証を (1 度に 1 つずつ) 有効化することができます。プロトコルの基本認証の再有効化を弊社に依頼していただくと、1 時間以内に (通常はそれより早く) 機能が再開されます。
プロトコルについて基本認証を再有効化することにより、ユーザーおよびデータがセキュリティ リスクに対してより脆弱になることに注意してください。

## 基本認証の使用を完全に停止する

クライアント固有のヒントを以下に挙げました。詳細については、リンク先を参照してください。

- **Outlook for Windows**: 最初に、Outlook が最新であること、および組織全体で先進認証の有効化に切り替えるという設定が True (真) であることを確認します。このように設定されていない場合、Outlook for Windows で先進認証を使用できません。[このため、必ず有効化してください](https://techcommunity.microsoft.com/t5/exchange-team-blog/enabling-modern-auth-for-outlook-how-hard-can-it-be/ba-p/2278411) (英語)。Messaging Application Programming Interface (メッセージング アプリケーション プログラミング インタフェース) (MAPI) またはリモート プロシージャ コール (RPC) プロトコルの基本認証を無効化する際に、お客様の組織の設定も切り替えられるため、既に有効化されているはずですが、念のため設定を確認してください。まだ機能していない場合は、Outlook に[適切なレジストリ キーがある](https://learn.microsoft.com/ja-jp/microsoft-365/admin/security-and-compliance/enable-modern-authentication?view=o365-worldwide)か確認してください。

> 注: POP または IMAP で Outlook for Windows を使用している場合、2022 年末に基本認証が無効化されると、機能は完全に停止します。Outlook for Windows は、POP または IMAP を使用する先進認証に対応しておらず、これらのレガシ プロトコルを引き続き使用する必要がある場合、別のメール クライアント (Thunderbird など) を使用する必要があります。


- **Outlook for Mac**: Outlook for Mac クライアントが引き続き基本認証の使用を求める場合、[当該内容に関する最近のブログ投稿](https://techcommunity.microsoft.com/t5/exchange-team-blog/notes-from-the-field-does-outlook-for-mac-insist-on-using-basic/ba-p/3629510) (英語) を参照してください。
- **Exchange ActiveSync**: iOS のメール アプリなど、電子メールとカレンダーの様々なネイティブ アプリで使用されるプロトコルを指します。最新モバイル クライアントのすべての主流アプリは、先進認証に対応しているものの、多くのユーザー デバイスでは依然として基本認証が使用されている可能性があります。デバイスからアカウントを削除して再度追加すると、自動的に先進認証へ切り替わります。

ただし、いずれかの種類のモバイル デバイス管理 (MDM または MAM) ソリューションを使用している場合、当該ソリューションを使用して新しいプロファイルを展開する必要があります。例えば、Intune を使用して iPhone または iPad 向けの認証メカニズムを設定する方法については、[こちら](https://learn.microsoft.com/ja-jp/mem/intune/configuration/email-settings-ios)を参照してください。Basic Mobility and Security (基本的なモビリティとセキュリティ) を使用している場合、これらのデバイスを修正する方法の詳細については、[こちら](https://learn.microsoft.com/ja-jp/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online#exchange-activesync-eas)のドキュメントを参照してください。

また、あまり一般的ではない種類のクライアントの場合、基本認証が無効化されると機能が停止する可能性があります。これらを使用する場合は、以下を参照してください。

- **POP または IMAP アプリケーション**: 一部のお客様は、これらのプロトコルを使用してアプリケーションにアクセスしています。対話型アプリおよび対話型以外のアプリの両方に対処する方法については、[こちらのブログ投稿](https://techcommunity.microsoft.com/t5/exchange-team-blog/notes-from-the-field-using-oauth-for-activesync-and-pop-imap-in/ba-p/3606118) (英語) を参照してください。
- **Exchange Web Service (EWS) アプリケーション**: EWS は、アプリ専用アクセスに対応しており、[アプリケーション アクセス ポリシー](https://learn.microsoft.com/ja-jp/graph/auth-limit-mailbox-access)を使用してアプリのアクセス対象を管理できます。基本認証で EWS を使用するアプリを所有している場合、コードを修正するか、またはアプリ開発者にコードを修正してもらう必要があります。多くのパートナー アプリは先進認証に対応しており、構成を修正するか最新バージョンにアップデートするだけで使用できます。
- **PowerShell スクリプト**: スクリプトを所有している場合、[こちら](https://learn.microsoft.com/ja-jp/powershell/exchange/app-only-auth-powershell-v2?view=exchange-ps)のガイドに従ってスクリプト内で先進認証を使用します。

2022 年 10 月 1 日以降、**問題が生じない**と想定されているクライアントは以下のとおりです。

- **iOS 版 Outlook および Android 版 Outlook** – 直接 Exchange Online メールボックスに接続している場合、これらのクライアントにおいて基本認証は使用されません。
- **Outlook on the web** – メールボックスが Exchange Online 内にある場合、Web ブラウザーを通して Outlook on the web で認証する際は、常に先進認証が使用されます。

### アプリケーション パスワードとその機能について

アプリケーション パスワードが多要素認証 (MFA) に使用されており、別の認証メカニズムとして基本認証が使用されている場合、基本認証が無効化されると、MFA に使用されているアプリケーション パスワードの機能も停止します。

### 詳細情報

詳細情報については、以下の資料を参照してください。

- [Exchange Online の基本認証の廃止](https://jpmessaging.github.io/blog/basic-authentication-deprecation-in-exchange-online-september/) – 2022 年 9 月の更新 – 包括的な内容の投稿であり、本件に関する詳細情報が含まれています。
- [Exchange Online での基本認証の廃止](https://learn.microsoft.com/ja-jp/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online) – 本件に関する弊社の公式ドキュメントであり、詳細情報やガイダンスへのリンクが含まれています。


The Exchange Team