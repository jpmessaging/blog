---
title: Exchange サーバー 2016 を廃止する
date: 2024-09-11
lastupdate: 
tags: Exchange
categories: Exchange
---

※ この記事は、[Decommissioning Exchange Server 2016](https://techcommunity.microsoft.com/t5/exchange-team-blog/decommissioning-exchange-server-2016/ba-p/4214475) をもとに日本のお客様向けに抄訳、再編集したものです。最新の情報は元の Blog を参照してください。

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームです。

Exchange サーバー 2016 は延長サポートの終了が近づいており、2025 年 10 月 14 日に[サポートが終了](https://learn.microsoft.com/lifecycle/products/exchange-server-2016)します。Exchange サーバー 2019 を使用している場合は、次のバージョンである Exchange サーバー サブスクリプション エディション (SE) に[インプレース アップグレード](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742)することができるため、それまでに Exchange サーバー 2016 を廃止にする必要があります。

この記事では、Exchange サーバー 2019 が既にインストールされている環境から Exchange サーバー 2016 を削除する方法に焦点を当てます。Exchange サーバー 2019 へのアップグレードについて既に文書化されている手順については、この記事では説明しません。これらの詳細については、[Exchange 展開アシスタント](https://learn.microsoft.com/exchange/exchange-deployment-assistant?view=exchserver-2019)を参照し、環境に合わせたステップバイステップの展開チェックリストを作成してください。また、新しいバージョンの Exchange サーバーへのアップグレードの詳細については、[Exchange サーバーのドキュメント](https://learn.microsoft.com/exchange/exchange-server?view=exchserver-2019)も参照してください。

オンプレミスの Exchange サーバーを引き続きご利用になる予定の場合は、できる限り早く Exchange サーバー 2019 に移行することを推奨します。Exchange サーバーではじめてインプレース アップグレードを実行できるようになりますが、Exchange サーバー SE へのインプレース アップグレードをサポートするのは Exchange サーバー 2019 のみです。今すぐ Exchange サーバー 2019 に移行して、Exchange サーバー SE が利用可能になったときに簡単にインプレース アップグレードできるようにすることが推奨されます。

# シャットダウンの準備

Exchange サーバー 2016 から Exchange サーバー 2019 への移行が完了したら、Exchange サーバー 2016 を廃止するための準備を開始できます。

## サード パーティ アプリケーションの棚卸しとアップグレード

Exchange サーバー 2016 を使用するすべてのアプリケーションの一覧を作成し、新しい Exchange サーバー  2019 を使用するように各アプリケーションを構成します。これらのアプリケーションで共有の名前空間を使用している場合は、最小限の構成変更にとどめることができます。これらのアプリケーションの提供元に問い合わせて、最新バージョンの Exchange サーバーでサポートされていることを確認してください。

# クライアント アクセス サービス

## Exchange 仮想ディレクトリの名前空間を確認する

すべてのクライアント接続の名前空間を確認し、それらが Exchange 組織内の最新の Exchange サーバーにルーティングされていることを確認します。これには、Exchange 仮想ディレクトリに対して公開されているすべての名前が含まれます。新しい Exchange 環境で同じ名前空間を使用している場合は、既存の SSL 証明書を再利用できます。新しい Exchange 環境で、現在の SSL 証明書のサブジェクト別名 (SAN) として存在しない新しい名前空間を使用している場合は、必要な名前すべてを含むように新しい証明書を取得する必要があります。

>**ヒント:** ActiveSync、Outlook (MAPI/HTTP または RPC/HTTP)、EWS、OWA、OAB、POP3/IMAP、Autodiscover を含むすべてのクライアントが従来の Exchange サーバーに接続しなくなったことを確認します。Log Parser Studio (LPS) を使用して、各クライアント アクセス サーバーの IIS ログを確認します。LPS は Log Parser 2.2 用の GUI で、ログの解析の複雑さを大幅に軽減し、大量のログを同時に解析できます (合計ログ サイズ >60GB でテスト済み)。詳細については、この[ブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/introducing-log-parser-studio/ba-p/601131)を参照してください。

# Active Directory 内のサービス接続ポイント オブジェクトを確認する

次のコマンドを実行して、Autodiscover サービス接続ポイント (SCP) の値を取得します。Autodiscover SCP は、内部のクライアントが Active Directory から接続情報を検索するために使用されます。

``` PowerShell
Get-ExchangeServer | Where-Object {$_.AdminDisplayVersion -like “Version 15.1*”} | Get-ClientAccessService | Format-Table Name, FQDN, AutoDiscoverServiceInternalUri -AutoSize
```

Autodiscover SCP が存在する場合は、AutoDiscoverServiceInternalURI が新しい Exchange サーバーまたは負荷分散された VIP にルーティングされていることを確認します。

Exchange サーバー 2016 から既存の AutoDiscoverServiceInternalURI を取得して、安全に保管します。

``` PowerShell
$CurrentAutoDURI = (Get-ExchangeServer <Ex2016 ServerName> | Get-ClientAccessService).AutoDiscoverServiceInternalURI.AbsoluteURI
```

次に、Exchange サーバー 2016 の仮想ディレクトリで AutoDiscoverServiceInternalURI を $Null に設定します。

``` PowerShell
Set-ClientAccessService -Identity <Ex2016 ServerName> -AutoDiscoverServiceInternalUri $Null
```

AutoDiscoverServiceInternalUri を $null に設定して、この値を削除することもできます。

# メールフロー

次に、すべてのメール フローに利用されるすべてのコネクタを確認して、サーバーを廃止にする準備ができていることを確認します。

## 送信コネクタを確認する

送信コネクタを確認し、送信コネクタの SourceTransportServers から Exchange サーバー 2016 が削除され、新しい Exchange サーバーが追加されていることを確認します。ほとんどの組織では、ポート 25 でのアウトバウンドの通信は少数の IP アドレスに対してのみ許可されているため、アウトバウンド通信の構成を確認して更新する必要がある場合もあります。

``` PowerShell
Get-SendConnector | Format-Table Name, SourceTransportServers -AutoSize
Get-ForeignConnector | Format-Table Name, SourceTransportServers -Autosize
```

## 受信コネクタを確認する

Exchange サーバー 2016 上の受信コネクタを確認し、新しい Exchange サーバーで再作成されていることを確認します (例: SMTP リレー、匿名リレー、パートナーなど) 。受信メールのルーティングに使用されているすべての名前空間を確認し、新しい Exchange サーバーに接続するようにネットワークが構成されていることを確認します。Exchange 2016 サーバーにカスタム コネクタまたはサード パーティ製コネクタがある場合は、新しい Exchange サーバーで再作成できることを確認します。受信コネクタの構成は以下のコマンドで確認することができます。

``` PowerShell
Get-ReceiveConnector -Server <ServerToDecommission> | fl
```

>**ヒント:** SMTP ログをチェックして、ハードコードされた名前または IP アドレスを使用してサーバーに SMTP トラフィックを送信しているサービスがあるかどうかを確認します。ログを有効にするには、[プロトコル ログの構成](https://learn.microsoft.com/exchange/configure-protocol-logging-exchange-2013-help)を確認してください。給与計算処理や月末レポートなど、週次または月次のイベントを中継するアプリやプロセスを考慮するのに十分な期間のメッセージ ログをキャプチャしてください。これらは、SMTP プロトコル ログの小さなサンプル サイズではキャプチャされない可能性があるためです。

Exchange サーバー 2016 の廃止を進めることは、メール フローの構成を監査し、必要なすべてのコネクタが適切に構成され、セキュリティで保護されていることを確認する絶好の機会です。あなたの環境で使用されていない可能性のある[匿名リレー](https://learn.microsoft.com/exchange/mail-flow/connectors/allow-anonymous-relay?view=exchserver-2019) コネクタを取り除くのに最適な時期です。または、Exchange がハイブリッドで展開されている場合は、[Office 365 に対してリレー](https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365)が構成されている場合があります。

# エッジ サーバー

エッジ トランスポート サーバーを利用している場合は、エッジ トランスポート サーバーも Exchange サーバー 2019 に移行する必要があります。エッジ トランスポート サーバーが Active Directory サイトを購読している場合は、[こちらの公開情報](https://learn.microsoft.com/exchange/architecture/edge-transport-servers/edge-subscription-procedures?view=exchserver-2019)に記載されているように [エッジ サブスクリプション](https://learn.microsoft.com/exchange/architecture/edge-transport-servers/edge-subscriptions?view=exchserver-2019)を再作成する必要があります。

エッジ サーバーを交換せずに廃止にする予定の場合は、受信トラフィックをメールボックス サーバーにルーティングするようにファイアウォール ルールが更新されていることを確認します。また、メールボックス サーバーは、TCP ポート 25 番経由でアウトバウンド通信できる必要もあります。

# メールボックス

## すべての Exchange サーバー 2016 上のメールボックスを新しいバージョンの Exchange サーバーに移動する

Exchange サーバー 2016 は、すべてのメールボックスが新しい Exchange サーバーに移行されるまで廃止することはできません。移行は、最新バージョンの Exchange から開始してください。Exchange サーバー 2019 に移行するので、Exchange サーバー 2019 からすべての移行バッチと移動要求を作成します。最初にすべての調停メールボックスを最新の Exchange サーバーに移動する必要があります。

すべてのメールボックス移動が完了したら、すべての移行バッチと移動要求を削除します。移動要求やメールボックスが残っていると、Exchange サーバー 2016 のアンインストールがブロックされます。

Exchange 管理シェル (EMS) で次のコマンドを実行して、新しい Exchange サーバーに移動する必要があるメールボックスを特定します。

``` PowerShell
Set-ADServerSettings -ViewEntireForest $True
Get-Mailbox -Server <Ex2016 ServerName> -Arbitration
Get-Mailbox -Server <Ex2016 ServerName> -ResultSize Unlimited
Get-Mailbox -Server <Ex2016 ServerName> -Archive -ResultSize Unlimited
Get-SiteMailbox
Get-Mailbox –AuditLog
```

また、以前にサイト メールボックスが削除されていた場合は、**Get-SiteMailbox –DeletedSiteMailbox** を実行する必要がある場合もあります (これはデータベースを削除するためのブロッカーになる可能性があるため)。

Exchange サーバー 2016 上にメールボックスが見つかった場合は、先に進む前に、それらを新しいバージョンの Exchange サーバーに移動します。詳細については、「[Exchange Server でオンプレミスメールボックスの移動を管理する](https://learn.microsoft.com/exchange/architecture/mailbox-servers/manage-mailbox-moves?view=exchserver-2019)」を参照してください。

すべての調停メールボックスとユーザー メールボックスが移動されたことを確認したら、すべてのパブリック フォルダー メールボックスが移動されたことを確認します。

``` PowerShell
Get-Mailbox -Server <Ex2016 ServerName> -PublicFolder -ResultSize Unlimited
```

パブリック フォルダーの移動要求の詳細については、「[パブリック フォルダーを Exchange 2013 から Exchange 2016 または Exchange 2019 に移行する](https://learn.microsoft.com/exchange/collaboration/public-folders/migrate-from-exchange-2013?view=exchserver-2019)」を参照してください。

すべてのメールボックスが新しい Exchange サーバーに移動されたら、移動要求と移行バッチを確認した後、移動要求と移行バッチを削除できます。最初に **-WhatIf** パラメーターを指定してコマンドを実行し、リストされたすべての移動要求と移行バッチを削除できることを確認した後、**-WhatIf** パラメーターを指定せずに再度実行します。

完了したすべての移動要求は、次のコマンドを使用して削除できます。「[Remove-MoveRequest](https://learn.microsoft.com/powershell/module/exchange/remove-moverequest?view=exchange-ps)」を参照してください。

``` PowerShell
Get-MoveRequest -ResultSize Unlimited | Remove-MoveRequest -Confirm:$false -WhatIf
```

すべての移行バッチは、次のコマンドを使用して削除できます。[「Remove-MigrationBatch](https://learn.microsoft.com/powershell/module/exchange/remove-migrationbatch?view=exchange-ps)」を参照してください。

``` PowerShell
Get-MigrationBatch | Remove-MigrationBatch -Confirm:$false -WhatIf
```

# データベース可用性グループの廃止

## Exchange サーバー 2016 にメールボックスが存在しないことを確認する

次のコマンドを実行します。

``` PowerShell
Get-Mailbox –ResultSize unlimited | Where-Object {$_.AdminDisplayVersion -like "Version 15.1*"}
```

メールボックスが見つかった場合は、メールボックスを新しい Exchange サーバーに移行するか、メールボックスを削除します。

## メールボックス データベースのコピーを削除する

Exchange サーバー 2016 上のすべてのメールボックス データベース コピーを削除する必要があります。これは、Exchange 管理センター (EAC) または EMS を使用して行うことができます。これらのツールの使用方法の詳細については、「[メールボックス データベース コピーを削除する](https://learn.microsoft.com/exchange/remove-a-mailbox-database-copy-exchange-2013-help)」を参照してください。

なお、データベース コピーを削除しても、実際のデータベース ファイルやトランザクション ログはサーバから削除されません。

サーバーごとにパッシブ コピーを検索して削除するには、次のコマンドを実行します。

``` PowerShell
Get-MailboxDatabaseCopyStatus –Server <Ex2016 ServerName> | Where-Object {$_.Status -notlike "*mounted"} | Remove-MailboxDatabaseCopy
```

データベースごとにパッシブ コピーを検索して削除するには、次のコマンドを実行します。

``` PowerShell
Get-MailboxDatabaseCopyStatus <DatabaseName> | Where-Object {$_.Status -notlike "*mounted"} | Remove-MailboxDatabaseCopy
```

## メールボックス データベースを削除する

廃止する Exchange サーバー 2016 環境がベスト プラクティスに従っていれば、高可用性や災害対策のために DAG が設定されているはずです。ここまでの手順ですべてのメールボックスが Exchange サーバー 2016 上から削除され、DAG を破棄して Exchange サーバー 2016 の廃止を進める準備が整いました。すべてのメールボックスが Exchange サーバー 2016 から移行され、すべてのパッシブ データベース コピーが削除されたら、Exchange サーバー 2016 環境から残りのデータベースを削除できます。

次のコマンドを **-WhatIf** パラメーターと共に実行して、リストされているすべてのデータベースを削除できることを確認してから、**-WhatIf** パラメーターを指定せずにコマンドを実行して削除します。

``` PowerShell
Get-MailboxDatabase –Server <ServerToDecommission> | Remove-MailboxDatabase –Confirm:$false -WhatIf
```

データベースにメールボックスがまだ存在する場合は、データベースを削除することはできません。上記のコマンドは、次のエラーで失敗します。

>このメールボックス データベース内に 1 つ以上のメールボックス、メールボックス プラン、アーカイブ メールボックス、パブリック フォルダー メールボックスまたは調停メールボックス、監査メールボックスがあります。

---

データベースにメールボックスが存在しないことを確認したにもかかわらず、データベースを削除できない場合は、[この記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/this-mailbox-database-contains-one-or-more-mailboxes-8230/ba-p/587212)を参照してください。削除しようとしているデータベースには、別のデータベース内のプライマリ メールボックスのためのアーカイブ メールボックスが含まれている可能性があります。メールボックスに [InPlaceHold または LitigationHold がかかっている](https://learn.microsoft.com/exchange/policy-and-compliance/holds/holds?view=exchserver-2019)場合、削除がブロックされるため、削除の続行を可能にするために、各保留を安全に削除できることを確認する必要があります。

>**注意:** アクティブなメールボックスをホストしていないメールボックス データベースを削除しようとして問題が発生した場合、このデータベースを指しているオブジェクトを特定する方法の 1 つは、次のコマンドです。

``` PowerShell
Set-ADServerSettings -ViewEntireForest $True
$DN =(Get-MailboxDatabase "DBNAME").DistinguishedName
Get-AdObject -Filter '(homemdb -eq $DN -or msExchArchiveDatabaseLink -eq $DN) -and (Name -notlike "HealthMailbox*" -and Name -notlike "SystemMailbox*")'
```

## データベース可用性グループからすべてのメンバーを削除する

DAG を削除する前に、各 DAG メンバーを DAG から削除する必要があります。これは、EAC または EMS を使用して行うことができます。これらのツールの使用の詳細については、[データベース可用性グループのメンバーシップの管理](https://learn.microsoft.com/exchange/manage-database-availability-group-membership-exchange-2013-help) を参照してください。

## DAG の削除

すべてのデータベース コピーが削除され、すべてのメンバーが DAG から削除されたら、EAC または EMS を使用して DAG を削除できます。これらのツールの使用の詳細については、[データベース可用性グループの削除](https://learn.microsoft.com/exchange/remove-a-database-availability-group-exchange-2013-help) を参照してください。

>**ヒント:** ファイル共有監視を持つ DAG がある場合は、Exchange サーバー 2016 DAG に使用されているファイル共有監視の使用を停止することを忘れないでください。

# ユニファイド メッセージングの役割に関する注意事項

この投稿では、ユニファイド メッセージングの機能は [Exchange サーバー 2019](https://learn.microsoft.com/exchange/new-features/discontinued-features?view=exchserver-2019#architecture) から削除されているため、その機能については説明しません。ユニファイド メッセージングを別のソリューションに移行する詳細な手順については、「[Skype for Business Server と Exchange Server の移行の計画](https://learn.microsoft.com/skypeforbusiness/hybrid/plan-um-migration)」を参照してください。ただし、Exchange サーバー 2016 ユーザーが UM が有効なメールボックスを持っている場合は、Skype for Business サーバー 2019 に移動する前に Exchange サーバー 2019 に移動しないでください。そうしないと、ボイス メッセージングが停止します。

# Exchange サーバー 2016 をメンテナンス モードにする

ここまでの説明で記載のすべての項目が Exchange サーバー 2016 から新しいバージョンの Exchange サーバーに移行されたら、Exchange サーバー 2016 を 1 週間メンテナンス モードにして、予期しない問題が発生しないことを確認します。問題が発生した場合は、Exchange サーバー 2016 を削除する前に解決する必要があります。問題が発生しない場合は、Exchange サーバー 2016 をアンインストールできます。**Exchange サーバー 2016 をシャットダウンすると、リソースが完全に移行されていない場合に問題が発生する可能性があるためお勧めしません。**

目的は、これらの Exchange サーバー 2016 に接続しようとしているものがないことを確認することです。何かが見つかった場合は、新しい Exchange サーバーを使用するように更新するか、更新が行われるまで Exchange 2016 サーバーが利用できるように戻します。

メッセージ追跡ログと各種の接続ログから Exchange サーバー 2016 に接続しているクライアントが存在しなくなったことを確認した後でも、組織が従来の Exchange サーバーを (メンテナンス モードで) 長期間オンラインにしておくことは珍しことではありません。これにより把握していなかった業務プロセスを見つけたり、不要な復旧作業を防いだりすることができます。

Exchange サーバーを保守モードにするには、[Exchange Serverでデータベース可用性グループを管理する](https://learn.microsoft.com/exchange/high-availability/manage-ha/manage-dags?view=exchserver-2019)の [DAG メンバーに対するメンテナンスの実行](https://learn.microsoft.com/exchange/high-availability/manage-ha/manage-dags?view=exchserver-2019#performing-maintenance-on-dag-members)セクションを参照してください。

Exchange サーバーのコンポーネントの状態の詳細については、[このブログ記事](https://techcommunity.microsoft.com/t5/exchange-team-blog/server-component-states-in-exchange-2013/ba-p/591342)を参照してください。

# Exchange サーバー 2016 をアンインストールする

## ベスト プラクティスを確認する

まず、[Exchange を最新の累積的な更新プログラムにアップグレードする](https://learn.microsoft.com/exchange/plan-and-deploy/install-cumulative-updates?view=exchserver-2019)の[ベスト プラクティス](https://learn.microsoft.com/exchange/plan-and-deploy/install-cumulative-updates?view=exchserver-2019#best-practices)セクションを確認します。これらのセクションは、Exchange サーバーのアンインストール時にも適用されます (たとえば、セットアップの実行前後にサーバーを再起動する、ウイルス対策を無効にするなど)。

## 監視メールボックスを削除する

Exchange サーバー 2016 をアンインストールする前に、次のコマンドを使用して、すべての Exchange サーバー 2016 の監視メールボックスを削除します。

``` PowerShell
Get-Mailbox -Monitoring | Where-Object {$_.AdminDisplayVersion -like "Version 15.1*"} | Remove-Mailbox -Confirm:$false
```

## Exchange サーバー 2016 をアンインストールする

アンインストール プロセスを開始する前に、EMS と、アンインストール プロセスを遅らせる可能性のあるその他のプログラム (.NET Framework を使用するプログラム、ウイルス対策製品、バックアップ製品など) をすべて終了します。次に、以下のいずれかの推奨される方法を使用して Exchange サーバー 2016 をアンインストールします (コントロール パネルの使用は推奨しません)。

- 無人セットアップ モードの使用: Setup.exe /mode:Uninstall
- セットアップ ファイルの場所から Setup.exe を実行

## アンインストール後のタスクの実行

Exchange サーバーをアンインストールした後も、いくつかのタスクがあります。これらは組織の運用要件によって異なる場合があります。

たとえば、次のような場合です。

- Active Directory から Exchange サーバー 2016 のコンピューター アカウントを削除 (DAG のクラスター名オブジェクトと Kerberos ASA オブジェクトを含む)。
- Exchange サーバー 2016 を他のサービス (バックアップ ソフトウェア、ウイルス対策/セキュリティ エージェント、ネットワーク監視など) のターゲットから削除。
- DNS から Exchange サーバー 2016 のレコードの削除。
- DAG のファイル共有監視 (FSW) サーバー上のフォルダーが正常に削除されたことの確認。
- Exchange Trusted Subsystem の FSW サーバーのローカル管理者グループからの削除。ただし、これらのサーバーが他の DAG のミラーリング監視サーバーである場合を除く。
- Exchange サーバー 2016 環境へのポートを開く古いファイアウォール ルールの削除。
- Exchange サーバー 2016 環境の物理機器の取り外しと廃棄。
- Exchange サーバー 2016 仮想マシンの削除。

要約すると、Exchange サーバー 2016 を廃止する場合、最も重要な考慮事項は次のとおりです。

- 削除の計画 (Exchange サーバーに依存しているものをすべて更新して、新しい Exchange サーバーを使用する)
- 適切な監視を行い、削除されるサーバーへの接続が試行されないことを確認する

ご質問がある場合、または特定のシナリオについて話し合いたい場合は、[Exchange Tech Community フォーラム](https://techcommunity.microsoft.com/t5/exchange/bd-p/Exchange_General)でお気軽に質問してください。
