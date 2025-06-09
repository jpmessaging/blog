---
title: ディレクトリ ベースのエッジ ブロックがパブリック フォルダーと動的配布グループで利用可能になりました
date: 2025-06-09 11:00:00
lastupdate: 
tags: Exchange Online
---

※ この記事は、[Directory Based Edge Blocking Now Available for Public Folders & Dynamic Distribution Groups](https://techcommunity.microsoft.com/blog/exchange/directory-based-edge-blocking-now-available-for-public-folders--dynamic-distribu/4421006) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

メールが有効なパブリック フォルダー (MEPF) および動的配布グループ (DDG) に対して、[ディレクトリ ベースのエッジ ブロック (DBEB)](https://learn.microsoft.com/Exchange/mail-flow-best-practices/use-directory-based-edge-blocking) 機能が利用可能になったことをお知らせします。これにより、DBEB を有効にすることで、組織内に存在しない MEPF や DDG 宛ての外部からのメールを Exchange Online Protection (EOP) レベルで拒否できるようになりました。

## 背景

[ディレクトリ ベースのエッジ ブロック (DBEB)](https://learn.microsoft.com/Exchange/mail-flow-best-practices/use-directory-based-edge-blocking#configure-dbeb) は、組織のディレクトリに存在しない受信者宛てのメールを拒否する Exchange Online Protection (EOP) の機能です。これまで、この機能はメールが有効なパブリック フォルダー (MEPF) や動的配布グループ (DDG) など、一部の受信者タイプでは動作しませんでした。

そのため、パブリック フォルダーや DDG を利用しているお客様には以下のような影響がありました。

- **Exchange Online のみ利用する環境の場合** : 外部送信者から MEPF や DDG 宛てのメールを受信したい場合、[DBEB 機能を無効化](https://learn.microsoft.com/Exchange/mail-flow-best-practices/use-directory-based-edge-blocking)する必要がありました。
- **Exchange オンプレミスも利用する環境の場合** : EOP 経由でメールを受信する場合、[Entra Connect を利用して MEPF を Entra ID に同期](https://techcommunity.microsoft.com/t5/exchange-team-blog/office-365-directory-based-edge-blocking-support-for-on-premises/ba-p/606740)することで、DBEB を有効のまま、外部送信者からオンプレミスの MEPF 宛てメールも受信できていました。

## 何が変わるのか

[ディレクトリ ベースのエッジ ブロック (DBEB)](https://learn.microsoft.com/Exchange/mail-flow-best-practices/use-directory-based-edge-blocking) 機能が MEPF にも対応しました。これにより、パブリック フォルダーや DDG を利用しているお客様のメール フローにどのような影響があるのでしょうか？

### シナリオ 1 : Exchange Online のみ利用する環境の場合

- 外部送信者から MEPF や DDG 宛てのメール配信を希望するお客様は、DBEB 機能を有効化できるようになりました。これまで MEPF や DDG のために DBEB を無効化していた場合も、[こちらの手順](https://learn.microsoft.com/Exchange/mail-flow-best-practices/use-directory-based-edge-blocking)または下記 FAQ の手順に従って再度有効化できます。なお、DBEB は*任意*の機能であり、必要に応じて有効化してください。

**この環境のお客様に対するアクション**

Exchange Online で[パブリック フォルダー](https://learn.microsoft.com/exchange/collaboration-exo/public-folders/public-folders)や[動的配布グループ](https://learn.microsoft.com/exchange/recipients-in-exchange-online/manage-dynamic-distribution-groups/create-manage-dynamic-distribution-groups)を利用しており、外部送信者からのメール受信のために DBEB を無効化していた場合でも、[こちらの手順](https://learn.microsoft.com/Exchange/mail-flow-best-practices/use-directory-based-edge-blocking) または下記 FAQ の手順に従って、DBEB を有効化できるようになりました。

<p style="background:#F0F0F0">DBEB を有効にするには、承認済みドメインの種類を "権限あり (Authoritative)" に設定する必要があります。特定の理由でドメインの種類を "権限あり" 以外に設定している場合は、他のメール フロー (例えば<a href="https://learn.microsoft.com/exchange/mail-flow-best-practices/manage-accepted-domains/enable-mail-flow-for-subdomains" target="_blank" rel="noopener noreferrer">サブドメインのメール フロー</a>など) へ影響がないことを確認した上で変更してください。</p>

### シナリオ 2 : Exchange オンプレミスも利用する環境の場合

- オンプレミスの Exchange 環境で、MEPF を Entra ID (Entra Connect を使用) および Exchange Online (Sync-ModernMailPublicFolder スクリプトを使用) の両方に同期している場合は、Entra Connect の構成を変更して Entra ID への MEPF 同期を停止できます (手順は後述)。
- オンプレミスの Exchange 環境で、MEPF を Entra ID (Entra Connect を使用) にのみ同期している場合は、まず Sync-ModernMailPublicFolder スクリプトを使用して MEPF を Exchange Online に同期する必要があります。その後、Entra Connect での MEPF 同期を停止できます。

**この環境のお客様に対するアクション**

オンプレミスのパブリック フォルダーを展開し、Exchange Online Protection または Exchange Online 経由でメールを受信しているお客様の場合、まだ MEPF を Exchange Online に同期していなければ、[Sync-ModernMailPublicFolder](https://www.microsoft.com/download/details.aspx?id=54855) スクリプトを使用して MEPF を Exchange Online に同期してください。その後、Entra Connect での MEPF 同期を無効化できます。

## FAQ
### Exchange Online でパブリック フォルダーや動的配布グループが展開されているか確認する方法

[Exchange Online PowerShell](https://learn.microsoft.com/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps) にテナント管理者として接続し、以下のコマンドを実行します。

- パブリック フォルダーの場合

    ``` PowerShell
    Get-OrganizationConfig | fl RootPublicFolderMailbox
    Get-Mailbox -PublicFolder
    Get-PublicFolder \ -Recurse
    ```

    パブリック フォルダーが展開されていない場合、次のメッセージが表示されます。

    <p style="background:#F0F0F0">No active public folder mailboxes were found for organization (organization name). This happens when no public folder mailboxes are provisioned or they are provisioned in 'HoldForMigration' mode. If you're not currently performing a migration, create a public folder mailbox.</p>

    パブリック フォルダーが展開されている場合、以下のような出力が表示されます。
    ![](dbeb01.jpg)

    次に、`Get-MailPublicFolder` コマンドを使用して、MEPF が存在するか確認します。
    ![](dbeb02.jpg)

- DDG の場合

    ``` PowerShell
    Get-DynamicDistributionGroup
    ```

    DDG が展開されていない場合、以下のような出力が表示されます。

    ![](dbeb03.jpg)

### DBEB が有効か無効かを確認する方法

DBEB の状態を確認するには、Exchange Online PowerShell に接続し、`Get-AcceptedDomain` コマンドを実行します。

`DomainType` が *Internal relay (内部の中継)* の場合は DBEB が無効、*Authoritative (権限あり)* の場合は DBEB が有効です。
![](dbeb04.jpg)

EAC から確認する場合は、[EAC](https://admin.exchange.microsoft.com/#/accepteddomains) にサインインし、[メール フロー] - [受信ドメイン] を選択します。
![](dbeb05.jpg)

特定のドメインで DBEB を有効にするには、ドメインの種類を*権限あり*に変更してください。

注意: 承認済みドメインを*内部の中継*に設定していた理由が "メールが有効なパブリック フォルダーで外部メールを受信するため" であれば、*権限あり*に変更して DBEB を有効化できます。それ以外の理由で*内部の中継*にしている場合は、*権限あり*へ変更しないでください。

``` PowerShell
Set-AcceptedDomain contoso.com -DomainType Authoritative
```

または、EAC からドメインの種類を変更することもできます。

![](dbeb06.jpg)

### Entra Connect ツールで MEPF の同期状態を確認する方法

オンプレミス組織が Exchange オンプレミスの MEPF を Entra ID (旧 Azure Active Directory) に同期しているか確認するには、以下の手順を実施します。

- "Microsoft Entra Connect Sync" (旧称 AAD sync または AAD connect) がインストールされているサーバーにサインインします。
- "Microsoft Entra Connect Sync" を開き、[構成] をクリックします。
- [現在の構成の表示またはエクスポート] を選択し、[次へ] をクリックします。
- 下にスクロールし、[EXCHANGE メールのパブリック フォルダー] オプションを確認します。
- このオプションが有効になっている場合、以下のように表示されます。

![](dbeb07.jpg)

### オンプレミスの MEPF を Exchange Online に同期する方法

[Sync-ModernMailPublicFolders.ps1](https://www.microsoft.com/download/details.aspx?id=54855) をダウンロードし、実行してください。

### Entra Connect を使用して MEPF の Entra ID (AAD) への同期を停止する方法

- "Microsoft Entra Connect Sync" (旧称 AAD sync または AAD connect) がインストールされているサーバーにサインインします。
- "Microsoft Entra Connect Sync" を開き、[構成] をクリックします。
- [同期オプションのカスタマイズ] を選択し、[次へ] をクリックします。
- 必要な情報を入力し、[次へ] を進めます。
- [オプション機能] 画面で [Exchange メールのパブリック フォルダー] のチェックを外し、[次へ] をクリックします。

![](dbeb08.jpg)

- 最後の画面で [構成] をクリックして設定を完了します。

### 注意: オンプレミスの DDG と DBEB について

**問題**  
DBEB は Exchange Online で作成された DDG には対応していますが、オンプレミスの Exchange で作成された DDG は Exchange Online に同期されません。そのため、これらのグループ宛てのメールは DBEB によってブロックされ、配信されなくなります。

**回避策**  
Exchange Online 経由でオンプレミスの DDG 宛てメールが DBEB によりブロックされる場合、以下の回避策を検討してください。

1. **Exchange Online にメール連絡先を作成する:**  
Exchange Online 上に、ブロックされている DDG と同じ外部メール アドレスを持つメール連絡先を追加します。これにより、Exchange Online が該当アドレスを認識し、適切にメッセージをルーティングできるようになります。詳細は [Exchange Online でメール連絡先を管理する | Microsoft Learn](https://learn.microsoft.com/exchange/recipients-in-exchange-online/manage-mail-contacts) をご参照ください。

2. **ドメインで DBEB を無効化する:**  
Exchange Online でドメインの種類を "権限あり" から "内部の中継" に変更します。これにより、そのドメインに対する DBEB が無効化され、メッセージがオンプレミス サーバーへリレーされるようになります。
