---
title: "Exchange Online メールボックス クォータの詳細解説"
date: 2026/01/28 9:00:00
tags: Exchange Online
---

※ この記事は、[Demystifying Exchange Online Mailbox Quotas](https://techcommunity.microsoft.com/blog/exchange/demystifying-exchange-online-mailbox-quotas/4486474) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。


Exchange Online におけるメールボックスのサイズ制限については聞いたことがあるかと思います。まだよくご存じでない方は、以下の「Exchange Online の制限」の記事内にある 2 つのセクションをご確認ください。

1. [格納域の制限](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#storage-limits) (プライマリ メールボックスおよびアーカイブ メールボックスにおけるサイズ制限)
2. [メールボックス フォルダーの制限](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#mailbox-folder-limits-1) (回復可能なアイテム フォルダーにおけるサイズ制限)

## メールボックスのサイズ制限と使用容量の確認方法

既定では、[プライマリ メールボックスとアーカイブ メールボックスのクォータ](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#storage-limits) (プライマリ メールボックスとアーカイブ メールボックスにおけるサイズ制限) の上限値は 100 GB に設定されています。一方、[回復可能なアイテムのクォータ](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#mailbox-folder-limits-1) (回復可能なアイテム フォルダーにおけるサイズ制限) は、保持が設定されていないユーザー (訴訟ホールド、インプレース ホールド、組織のホールド、またはコンプライアンス ポリシーのホールドなどが設定されていないユーザー) の場合は 30 GB、保持が設定されたユーザーの場合は 100 GB に設定されています。
自動拡張アーカイブを有効にすると、最大 1.5 TB のアーカイブ メールボックスを利用できるようになりますが、この 1.5 TB の[格納域](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#storage-limits)は複数のアーカイブ メールボックスに分割して割り当てられます。つまり、各アーカイブ メールボックスごとに最大 100 GB のサイズ制限が適用されるため、ArchiveQuota の値は各アーカイブ メールボックスごとに 100 GB のままとなります。このため複数のアーカイブ メールボックスを合わせて、全体として最大 1.5 TB の格納域が提供されます。したがって、自動拡張アーカイブを有効にしても ArchiveQuota が *単一の* 1.5 TB として表示されることはありません。

メールボックスのサイズ制限には、主に以下の 3 種類があります。

1. **ProhibitSendReceiveQuota** – プライマリ メールボックスのサイズ制限値です。ユーザーのプライマリ メールボックスがこの値に達すると、メールの送受信ができなくなります。
2. **ArchiveQuota** – アーカイブ メールボックスのサイズ制限値です。ユーザーのアーカイブ メールボックス (またはメールボックス シャード) がこの値に達すると、その特定のアーカイブ メールボックス (またはシャード) にコンテンツを追加できなくなります。自動拡張アーカイブを使用すると、複数のアーカイブ メールボックス シャードを持つことができます (メールボックスの各インスタンスはシャードと呼ばれます)。
3. **RecoverableItemsQuota** – 回復可能なアイテム フォルダーのサイズ制限値です。プライマリ メールボックスまたはアーカイブ メールボックス シャード (メイン アーカイブまたは自動拡張アーカイブ) の回復可能なアイテム フォルダーがこの値に達すると、削除済みアイテム フォルダーからの削除や、回復可能なアイテム フォルダーへのコンテンツの移動ができなくなります。

これらの各サイズ制限値には、関連する警告のしきい値があります。この警告のしきい値は、ユーザー (または Exchange コンポーネントやクライアント) に対して、警告のしきい値に達していることを通知し、実際のサイズ制限値に近づいていることを知らせるためのものです。

警告のしきい値は、対応する実際のサイズ制限値よりも*低い*値に設定されています。

たとえば、`Get-Mailbox <User> | FL alias, *Quota` を実行すると、これらすべてのクォータとその値を確認できます。

![](q01.jpg)

以下は、[Set-Mailbox (ExchangePowerShell) | Microsoft Learn](https://learn.microsoft.com/powershell/module/exchangepowershell/set-mailbox?view=exchange-ps) から引用した、各クォータの定義です。

- **ArchiveQuota** - ユーザーのアーカイブ メールボックスの最大サイズを指定します。アーカイブ メールボックスがこのサイズに達するか超過すると、メッセージを受け付けなくなります。ArchiveQuota の値は ArchiveWarningQuota の値以上である必要があります。
- **ArchiveWarningQuota** - ユーザーのアーカイブ メールボックスのサイズに対する警告のしきい値を指定します。アーカイブ メールボックスがこのサイズに達するか超過すると、ユーザーに警告メッセージが表示されます。
- **RecoverableItemsQuota** - メールボックスの回復可能なアイテム フォルダーの最大サイズを指定します。回復可能なアイテム フォルダーがこのサイズに達するか超過すると、メッセージを受け付けなくなります。RecoverableItemsQuota の値は RecoverableItemsWarningQuota の値以上である必要があります。
- **RecoverableItemsWarningQuota** - メールボックスの回復可能なアイテム フォルダーのサイズに対する警告のしきい値を指定します。
- **ProhibitSendReceiveQuota** - メールボックスに対するサイズの制限値を指定します。メールボックスがこのサイズに達するか超過すると、新しいメッセージの送受信ができなくなります。このメールボックスに送信されたメッセージは、エラー メッセージとともに送信者に返送されます。この値は実質的にメールボックスの最大サイズを決定します。この値は ProhibitSendQuota または IssueWarningQuota の値以上である必要があります。
- **ProhibitSendQuota** - メールボックスに対するサイズの制限値を指定します。メールボックスがこのサイズに達するか超過すると、新しいメッセージを送信できなくなり、ユーザーに警告メッセージが表示されます。ProhibitSendQuota の値は ProhibitSendReceiveQuota の値以下である必要があります。
- **IssueWarningQuota** - メールボックスのサイズに対する警告のしきい値を指定します。メールボックスがこのサイズに達するか超過すると、ユーザーに警告メッセージが表示されます。IssueWarningQuota の値は ProhibitSendReceiveQuota の値以下である必要があります。

メールボックスには他にも 2 つのクォータが適用されていますが、この記事では取り上げません。

- **RulesQuota** (対応する警告のしきい値なし) - メールボックスの受信トレイ ルールのサイズの上限を指定します。
- **CalendarLoggingQuota** (対応する警告のしきい値なし) - メールボックスの回復可能なアイテム フォルダー内にある、予定表アイテムの変更を記録するログの最大サイズを指定します。ログがこのサイズを超えると、メッセージング レコード管理 (MRM) が古い予定表ログを削除して空き容量を確保するまで、予定表のログ記録が無効になります。

Exchange Online では、ProhibitSendQuota、ProhibitSendReceiveQuota、IssueWarningQuota および RulesQuota のみ設定できます。クォータの値は引き下げることも引き上げることもできますが、サブスクリプションまたはライセンスで許可されている最大値を超えることはできません。

## クォータの確認方法と使用容量の確認方法

#### プライマリ メールボックスのクォータ

プライマリ メールボックスにおけるサイズ制限の最大値は、ユーザーに割り当てられているメールボックス プランまたはライセンスによって異なります。たとえば、デスクレス ワーカー向けライセンスでは 2 GB、Exchange Online プラン 1 では 50 GB、Exchange Online プラン 2 では 100 GB が上限となります。

この値は `Get-Mailbox <user> | FL ProhibitSendReceiveQuota` を実行して確認できます。

![](q02.jpg)

プライマリ メールボックスの使用容量を確認するには、`Get-MailboxStatistics` コマンドをプライマリ メールボックスに対して実行し、TotalItemSize の値を確認します。

![](q03.jpg)

ProhibitSendReceiveQuota の値から TotalItemSize を差し引くことで、メールボックスの残り容量を確認できます。この例では、以下の計算により約 57.5 GB の空き容量があることがわかります。

**100 - 42.49 = 57.51**

プライマリ メールボックスの統計情報は、ユーザーの識別子 (UPN、メール アドレス、エイリアス) を指定して Get-MailboxStatistics コマンドを実行することで取得できますが、メールボックスの MailboxGuid を指定しても同様の結果を得ることができます。以下の例では、mailbox1 にプライマリ メールボックス (545e88f1-5bbe-45d5-bc99-599928eabbd7) とアーカイブ メールボックス (1c2d9561-0b6a-4f6a-9479-902f98b17546) の両方が存在することを示します。

![](q04.jpg)

TotalItemSize の値に含まれるデータ (フォルダー) の種類を確認したい場合は、Get-MailboxFolderStatistics を実行し、TargetQuota が User に設定されているすべてのフォルダーを確認します。
以下のようなコマンドから確認ができます。


    Get-MailboxFolderStatistics <user> |FT Name, FolderSize, ItemsInFolder, TargetQuota
    Get-MailboxFolderStatistics mailbox1 | group TargetQuota | FT Name, Count

例として、mailbox1 には TargetQuota が User に設定されたフォルダーが 900 個あり、これらのフォルダーのサイズはすべて TotalItemSize にカウントされます。

![](q05.jpg)

#### アーカイブ メールボックスのクォータ

アーカイブ メールボックスにおけるサイズ制限値は、メールボックス プランやライセンスに応じて 50 GB または 100 GB となります。この値は `Get-Mailbox <user> | FL ArchiveQuota` を実行して確認できます。

![](q06.jpg)

アーカイブ メールボックスの使用容量を確認するには、`Get-MailboxStatistics -Archive <user>` を実行するか、メイン アーカイブの ArchiveGuid または MailboxGuid を指定して実行し、TotalItemSize の値を確認します。

同様にアーカイブ メールボックス内のどのフォルダーが TotalItemSize に加算されているか確認したい場合は、Get-MailboxFolderStatistics に -Archive スイッチを指定して実行するか、ArchiveGuid を指定して実行し、TargetQuota が User に設定されているフォルダーを確認します。
(複数のアーカイブ メールボックス、つまり自動拡張アーカイブが存在する場合には、ArchiveGuid を指定して実行する方法を推奨します。)

![](q07.jpg)

#### 回復可能なアイテム フォルダーのクォータ

前述のとおり、回復可能なアイテム フォルダーにおけるサイズ制限値は、保持が設定されていないユーザーの場合は 30 GB、保持が設定されているユーザーの場合は 100 GB となります。保持が設定されているユーザーはデータを完全に削除することができないため、回復可能なアイテム用により多くの格納域が必要となります。そのため、ユーザーに訴訟ホールドなどの保持が設定されると、サービスによって自動的に 70 GB 増加されます。

RecoverableItemsQuota の設定値を確認するには、`Get-Mailbox <user> | FL RecoverableItemsQuota` を実行します。

![](q08.jpg)

回復可能なアイテム フォルダーのサイズ制限値は、プライマリ メールボックスとアーカイブ メールボックスの両方に適用されます。プライマリ メールボックスにおける回復可能なアイテム フォルダーの使用容量を確認するには、以下のコマンドを実行します。

    Get-MailboxStatistics <user> | FL TotalDeletedItemSize

または

    Get-MailboxStatistics <Primary MailboxGuid> | FL TotalDeletedItemSize

アーカイブ メールボックスにおける回復可能なアイテム フォルダーの使用容量を確認するには、以下のコマンドを実行します。

    Get-MailboxStatistics <user> -Archive | FL TotalDeletedItemSize

または

    Get-MailboxStatistics <メイン アーカイブの MailboxGuid または ArchiveGuid> | FL TotalDeletedItemSize

Get-MailboxStatistics -Archive に関する補足事項:

- 複数のアーカイブ メールボックス (メイン アーカイブと自動拡張アーカイブ) が存在する場合、タイムアウトが発生したり、実行に時間がかかる場合があります。これを回避するには、-Archive スイッチではなく、アーカイブ メールボックス シャードの GUID を指定して Get-MailboxStatistics を実行してください。
- 複数のアーカイブ メールボックスが存在する場合、統計情報は合算された値で表示されます。個々のサイズを確認したい場合は、アーカイブ メールボックス シャードの GUID を指定してください。

以下の例では、shared1 というメールボックスのプライマリ メールボックス内の回復可能なアイテム フォルダーには 307 MB、アーカイブ メールボックス内の回復可能なアイテム フォルダーには 1 GB のデータが格納されています。

![](q09.jpg)

回復可能なアイテム フォルダーとそのサイズを確認したい場合、以下のコマンドを実行します。(回復可能なアイテム フォルダー内のサイズの合計が TotalDeletedItemSize になります。)

プライマリ メールボックスの回復可能なアイテム フォルダーを確認する場合:

    Get-MailboxFolderStatistics <user> -FolderScope RecoverableItems | FT Name, FolderSize, TargetQuota

アーカイブ メールボックスの回復可能なアイテム フォルダーを確認する場合:

    Get-MailboxFolderStatistics <user> -Archive -FolderScope RecoverableItems | FT Name, FolderSize, TargetQuota

上記の Get-MailboxStatistics の出力結果に続いて、Get-MailboxFolderStatistics の出力結果も以下に示します。プライマリ メールボックスとアーカイブ メールボックスの両方とも、回復可能なアイテム フォルダーのサイズは 30 GB の制限値を十分に下回っています。

![](q10.jpg)

次に、よくある問題が発生するシナリオとその対処方法について確認しましょう。

### クロステナント メールボックス移行 (CTMM) における MRS の使用

既定では、メール ユーザーの回復可能なアイテム フォルダーのサイズ制限値は 30 GB に設定されていますが、移行元メールボックスの回復可能なアイテム フォルダーのサイズ制限値がこのサイズを超えている場合があります (通常は何らかの保持が設定されていることに起因します)。この場合以下のコマンドを実行して、移行先テナントのメール ユーザー オブジェクトに対する訴訟ホールドを有効にすることで、回復可能なアイテム フォルダーのサイズ制限値を 100 GB まで引き上げることができます。これにより、QuotaExceeded の例外による移行時のエラーを回避できます。

    Set-MailUser <id> -EnableLitigationHoldForMigration

以下の例では、このスイッチを使用してメール ユーザー オブジェクトの RecoverableItemsQuota を 30 GB から 100 GB に引き上げています。

![](q11.jpg)

補足事項:

- このコマンドは、クラウドのみのメール ユーザーだけでなく、ディレクトリ同期された (IsDirSynced = True の) メール ユーザーにも適用されます。
- 移行元メールボックスがオンプレミス Exchange でホストされており、クラウド上に対応するメール ユーザーが存在する場合のハイブリッド移行のシナリオでは、この手順を使用*しないでください*。たとえば、オンプレミス上のメールボックスに 70 GB の回復可能なアイテムがあり、そのメールボックスに保持の設定がされていない場合、オンプレミス側で対象のメールボックスに対して訴訟ホールドを有効にすることを推奨します。ディレクトリ同期後、クラウド上の対応するメール ユーザーの回復可能なアイテム フォルダーのサイズ制限値は 100 GB に増加しますが、さらに重要なのは当該メール ユーザーで訴訟ホールドが有効になり、その状態が維持されることです。これにより、ハイブリッド移行を使用してオンプレミスのメールボックスをクラウドに移行する際、メール ユーザーはオンプレミスから同期された LitigationHold フラグを引き継ぎ、Exchange Online 移行後に RetainDeletedItemsFor の設定によって回復可能なアイテムが削除されることを防ぐことができます。
- ハイブリッド移行を行うユーザーに対して Exchange Online から Set-MailUser -EnableLitigationHoldForMigration を実行した場合、次回のディレクトリ同期時にオンプレミス AD から訴訟ホールド フラグが上書きされることにご注意ください。つまり、コマンドを実行することで訴訟ホールドが有効になったと思われるかもしれませんが、オンプレミスのメールボックスで訴訟ホールドが設定されていない場合、その情報が同期されます。したがって、コマンドから訴訟ホールドを有効にしても設定は維持されません。なお、この状況で RecoverableItemsQuota が 30 GB に戻ることはありませんが、メールボックスを Exchange Online に移行した後に回復可能なアイテムが削除される可能性についてご留意ください。

訴訟ホールドが一時的に有効化された状態:

![](q12.jpg)

ディレクトリ同期後に訴訟ホールドが自動的に無効になった状態:

![](q13.jpg)

なお、移行先テナントのメール ユーザーがディレクトリ同期されており、オンプレミス AD にもメール ユーザーとして存在する場合、訴訟ホールド フラグは次回のディレクトリ同期サイクルで上書きされることはありません。

![](q14.jpg)

また、クロステナント移行の目的でメール ユーザーの訴訟ホールドを有効にした後、Exchange Online でそれを無効にするためのスイッチは用意されていません。移行完了後、ユーザーがメールボックスとして有効になった状態であれば、`Set-Mailbox <user> -LitigationHoldEnabled $false` を実行して無効にすることができます。ただし、訴訟ホールドを無効にすると回復可能なアイテム フォルダーからデータが削除される可能性がありますのでご注意ください。

### Gmail および IMAP からの大容量メールボックスの Exchange Online への移行

移行元メールボックスのサイズが 100 GB を超えており、Google または IMAP でホストされている場合、組み込みの大容量メールボックス移行オプションを利用できます。詳細は [Migrate large mailboxes from Google or other IMAP sources to Microsoft 365 Exchange | Microsoft Learn](https://learn.microsoft.com/exchange/mailbox-migration/automated-large-mailbox-migration-from-imap-sources) をご参照ください。

この移行方法を使用すると、Exchange Online における 100 GB のメールボックス制限や ProhibitSendReceiveQuota (プライマリ メールボックスのサイズ制限値) を引き上げる方法について心配する必要はありません。サービスによって自動的に超過分のコンテンツがアーカイブ メールボックスに移行されます。

なお、現時点では Migration チームがハイブリッド移行向けのソリューションを開発中です。このソリューションは、現在 Gmail や IMAP からの大容量メールボックス移行で提供されているものと同様の機能を提供する予定です。本ブログの執筆時点では、オンプレミス Exchange 上にある大容量のプライマリ メールボックス (100 GB ～ 2 TB) 向けのソリューションは 2026 年 3 月頃に提供が*見込まれて*います。この開発の第 1 フェーズでは、オンプレミス Exchange 上にある大容量のプライマリ メールボックスのみが対象となります (オンプレミス Exchange 上にある大容量のアーカイブ メールボックスへの対応は後日予定されています)。

### Exchange Online でホストされているメールボックス (移行シナリオ以外の場合)

管理者として、プライマリ メールボックス、アーカイブ メールボックス、または回復可能なアイテム フォルダーがサイズ制限値に抵触するシナリオへの対応をされたことがあるかと思います。このような状況がユーザーに与える影響は以下のとおりです。

- **ProhibitSendReceiveQuota に達した場合** – ユーザーはプライマリ メールボックスでメールの送受信ができなくなります。
- **ArchiveQuota に達した場合** – ユーザーはアーカイブ メールボックスにデータを移動できなくなります。
- **RecoverableItemsQuota に達した場合** – プライマリ メールボックスまたはアーカイブ メールボックスの回復可能なアイテム フォルダーがいっぱいになるため、ユーザーはアイテムを完全に削除できなくなります。また、会議の招待に関する問題が発生する場合もあります。詳細は [Recoverable Items folder not emptied for mailbox on litigation or retention hold - Exchange | Microsoft Learn](https://learn.microsoft.com/troubleshoot/exchange/antispam-and-protection/recoverable-items-folder-full#symptoms) をご参照ください。

管理者は定期的にメールボックスの使用状況を確認することをお勧めします。制限値に近づいているメールボックスを確認するには、Microsoft 365 管理センターの以下のレポートをご利用ください: [Microsoft 365 Reports in the admin center - Mailbox usage](https://learn.microsoft.com/microsoft-365/admin/activity-reports/mailbox-usage?view=o365-worldwide#interpret-the-mailbox-usage-report)

**ProhibitSendReceiveQuota の制限値に達した場合**、以下のような対処方法があります。

- ユーザーは可能であればメールボックスの空き容量を確保する (不要なメール、迷惑メール、削除済みアイテムを削除する)。
- 管理者はアーカイブ メールボックスを有効にし、プライマリ メールボックスからアーカイブ メールボックスへデータを移動するためのアイテム保持ポリシーおよび保持タグを作成する。
- 現在ユーザーに割り当てられているライセンスが提供する格納域が少ない場合 (例: Exchange Online P1 の 50 GB)、より多くの格納域を提供するライセンス (Exchange Online P2 の 100 GB) を割り当てることを検討する。

メイン アーカイブが制限値に到達し (**ArchiveQuota の制限値に到達し**)、かつデータを保持する必要がある場合は、自動拡張アーカイブを有効にする方法があります。これにより、拡張アーカイブ (AuxArchive) が割り当てられ、コンテンツはメイン アーカイブと拡張アーカイブの間で自動的に分割させることができます。また、訴訟ホールドなどの保持が有効化され、かつメールボックス レベルで自動拡張アーカイブが有効な場合、ArchiveQuota は 110 GB まで拡張されます (詳細は後述)。

**RecoverableItemsQuota の制限値に達した場合**、回復可能なアイテム フォルダー内のアイテムを完全に削除する、RecoverableItemsQuota を設定可能な最大値まで引き上げる、または自動拡張アーカイブを有効にしてデータをアーカイブ メールボックスに分割・移動するといった対処方法があります。なお、回復可能なアイテム フォルダー内のアイテムに関する処理として、Exchange Online サービスには Dumpster Expiration Enforcer と呼ばれるコンポーネントが存在します。このコンポーネントでは、回復可能なアイテム フォルダーの警告のしきい値 (RecoverableItemsWarningQuota) を超えると、アイテムの更新日時に基づいて FIFO (先入れ先出し) 方式でアイテムを削除します。この仕組みにより、RetainDeletedItemsFor の期間に到達する前であっても、ユーザーが追加のデータを削除するための空き容量が確保されます。この動作は単一アイテムの回復の設定に関係なく行われます。詳細は [Recoverable Items folder in Exchange Online | Microsoft Learn](https://learn.microsoft.com/exchange/security-and-compliance/recoverable-items-folder/recoverable-items-folder#single-item-recovery) をご参照ください。

ここで、回復可能なアイテム フォルダーのサイズ制限値 (RecoverableItemsQuota) が 30 GB、アーカイブ メールボックスのサイズ制限値 (ArchiveQuota) が 100 GB に設定されており、アーカイブ メールボックスも訴訟ホールドも有効になっていないユーザー メールボックスのシナリオを見ていきましょう。なお、以下の例では説明を簡単にするために LitigationHold パラメーターを使用していますが、RecoverableItemsQuota は他の種類の保持でも同様に増加します。

    Get-Mailbox <user> | FL Alias, ProhibitSendReceiveQuota, ArchiveQuota, RecoverableItemsQuota, LitigationHoldEnabled, ArchiveGuid, AutoExpandingArchiveEnabled

![](q15.jpg)

ユーザーに訴訟ホールドを設定すると、RecoverableItemsQuota が 30 GB から 100 GB に増加します。

![](q16.jpg)

さらにアーカイブ メールボックスを有効にすると、RecoverableItemsQuota は 105 GB まで増加します。

![](q17.jpg)

さらにメールボックス レベルで自動拡張アーカイブを有効にすると、RecoverableItemsQuota と ArchiveQuota はそれぞれ 110 GB まで増加します。

![](q18.jpg)

**重要**: 自動拡張アーカイブを有効にすると、メールボックスをオンプレミス Exchange に戻すこと、メールボックスの復元要求 (New-MailboxRestoreRequest) を実行すること、および非アクティブなメールボックスを回復することができなくなります。

#### 参考資料

- [Increase the Recoverable Items quota for mailboxes on hold | Microsoft Learn](https://learn.microsoft.com/purview/ediscovery-increase-the-recoverable-quota-for-mailboxes-on-hold)
- [Learn about auto-expanding archiving | Microsoft Learn](https://learn.microsoft.com/purview/autoexpanding-archiving)
- [Enable auto-expanding archiving | Microsoft Learn](https://learn.microsoft.com/purview/enable-autoexpanding-archiving)
- [Advancing Microsoft 365: New capabilities and pricing update | Microsoft 365 Blog](https://www.microsoft.com/microsoft-365/blog/2025/12/04/advancing-microsoft-365-new-capabilities-and-pricing-update/)

この記事がお役に立てば幸いです。最後までお読みいただきありがとうございました。

この記事の執筆にあたり、Nino Bilic 氏をはじめ、ご協力いただいたすべての皆様に感謝いたします。




