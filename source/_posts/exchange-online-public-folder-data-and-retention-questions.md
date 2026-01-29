---
title: Exchange Online のパブリック フォルダーのデータおよび保持に関する質問
date: 2026-1-29
tags: Exchange Online
---
※ この記事は、[Exchange Online Public Folder Data and Retention Questions](https://techcommunity.microsoft.com/blog/exchange/exchange-online-public-folder-data-and-retention-questions/4488872) の抄訳です。最新の情報はリンク先をご確認ください。

Exchange Online においてパブリック フォルダーを管理する管理者は、さまざまな要因によるデータ損失が発生するケースに遭遇することがあります。例えば、ユーザーがパブリック フォルダーからメールを削除した後、保持期間の経過後にそのメールを復元する必要が生じる場合や、コンプライアンスや法的要件により、削除済みのデータが必要となる場合があります。このようなリスクを軽減する目的で、Exchange Online ではパブリック フォルダーを対象とした保持ポリシーが用意されています。これらのポリシーを使用すると、削除されたデータを指定した期間または無期限に<u>保持</u>したり、一定の期間が経過したコンテンツを自動的に<u>削除</u>したりすることができます。

以下のセクションでは、次の内容について説明します。

- パブリック フォルダーの保持ポリシーを構成する
- パブリック フォルダーにおける保持の仕組み
- 削除済みデータを復元する方法
- 既知の問題とトラブルシューティング

#### パブリック フォルダーの保持ポリシーを構成する

削除されたデータがパブリック フォルダーの[回復可能なアイテム フォルダー](https://learn.microsoft.com/exchange/security-and-compliance/recoverable-items-folder/recoverable-items-folder) (「ダンプスター」とも呼ばれます) に指定した期間保持されるようにするには、以下の手順に従ってテナントのパブリック フォルダーに対する[新しい保持ポリシーを作成](https://learn.microsoft.com/purview/create-retention-policies?tabs=other-retention#create-and-configure-a-retention-policy)します。

- [Microsoft Purview ポータル](https://purview.microsoft.com/)にサインインし、**ソリューション** > **データ ライフサイクル管理** > **ポリシー** > **アイテム保持ポリシー** の順に移動します。
- 処理を続行する前に、[**Exchange パブリック フォルダー メールボックス**](https://learn.microsoft.com/purview/retention-settings#configuration-information-for-exchange-mailboxes-and-exchange-public-folders)に少なくとも 10 MB のデータが含まれていることを確認してください。Get-MailboxStatistics コマンドを使用して、パブリック フォルダー メールボックス全体のデータ サイズを確認します。
![](pfh01.jpg)
- **新しいアイテム保持ポリシー** を選択して、**アイテム保持ポリシーの作成** の構成を開始し、新しいポリシーに名前を付けます。
- **ポリシー スコープ** ページで、管理単位を既定の **完全なディレクトリ** のままにします。現在、このポリシーでは管理単位はサポートされていません。
- [**Exchange パブリック フォルダー** はアダプティブ スコープをサポートしていないため、静的スコープを指定する必要があります](https://learn.microsoft.com/purview/retention?tabs=table-overriden#:~:text=Exchange%20public%20folders%20locations%20don%27t%20support%20adaptive%20scopes)。[場所の**除外はサポートされていません**](https://learn.microsoft.com/purview/retention-settings#configuration-information-for-exchange-mailboxes-and-exchange-public-folders:~:text=The%20Exchange%20public%20folders%20location%20applies%20retention%20settings%20to%20all%20public%20folders%20and%20can%27t%20be%20applied%20at%20the%20folder%20or%20mailbox%20level.)。
- **コンテンツを保持するか、削除するか、またはその両方を行うかを決定します** ページで、コンテンツの保持と削除に関する設定を指定します。

保持ポリシーは、コンテンツを保持するのみ、指定した期間保持した後に削除する、または指定した期間後に削除するように構成できます。保持ポリシーの期間は、以下に基づいて設定できます。

- アイテムの作成日時 (例: CreationTime)
- アイテムの最終変更日時 (例: LastModificationTime)
![](pfh02.jpg)

詳細については、「[コンテンツを保持および削除するための設定](https://learn.microsoft.com/purview/retention-settings#settings-for-retaining-and-deleting-content)」を参照してください。

- 構成を完了し、設定を保存します。

通常、ポリシーの更新がすぐに適用されますが、反映されるまでに[数日](https://learn.microsoft.com/purview/retention-settings?view=o365-worldwide#updating-policies-for-retention)かかる場合もあります。レプリケーションが完了すると、Microsoft Purview ポータルまたはコンプライアンス ポータルにて保持ポリシーの状態が「有効 (保留中)」から「有効 (成功)」に変わります。状態が保留のままの場合は、Microsoft サポートにお問い合わせください。
![](pfh03.jpg)  
<u>注意</u>: [*Exchange パブリック フォルダーのメッセージは保持ラベルをサポートしていません*](https://learn.microsoft.com/purview/retention?view=o365-worldwide&amp;tabs=table-overriden#preservation)

#### パブリック フォルダーにおける保持の仕組み
パブリック フォルダーが保持ポリシーによって保持されている場合、以下のようになります。

- ルートまたはプライマリ パブリック フォルダー メールボックスの InPlaceholds パラメーターにポリシー ID が含まれます。詳細については、こちらの[記事](https://learn.microsoft.com/purview/ediscovery-identify-a-hold-on-an-exchange-online-mailbox)を参照してください。
![](pfh04.jpg) 
- **DiscoveryHolds** フォルダーは、各コンテンツ パブリック フォルダー メールボックスの Non_IPM_Subtree 配下に作成されます。その機能は以下のとおりです。
    - 同じコンテンツ メールボックス上の DiscoveryHolds フォルダー内に削除されたアイテムを保持します。
    - 毎日、PublicFolderDiscoveryHoldsProcessor が実行され、各コンテンツ パブリック フォルダー メールボックスの DiscoveryHolds フォルダーとサブフォルダーを処理します。この処理により、インプレース保持期間を満たしていないアイテムやフォルダーは期限切れとして処理されます。

このようなシナリオを考えてみましょう: 保持ホールドが設定されているテナントのパブリック フォルダー (例: "\pf4") において、"2ndMBX" というコンテンツ メールボックスに、件名が "Test Mail" のメールが含まれているとします。削除を行う前に Get-PublicFolderItemStatistics コマンドを使用することで、当該メールが存在していることを確認できます。

件名が "Test Mail" のメールが削除されると、当該メールはフォルダーのダンプスター (回復可能なアイテム フォルダー)(例: "\pf4" のダンプスター) に移動され、1 日間保持された後、完全に削除されます。

保持期間が満了すると、当該アイテムは、所有元フォルダー (例: "\pf4") のコンテンツ メールボックス内にある DiscoveryHolds フォルダーに移動されます。
![](pfh05.jpg) 

保持期間経過後、当該アイテムは、所有元フォルダー (例: "\pf4") のコンテンツ メールボックス内にある DiscoveryHolds フォルダーに移動されます。
![](pfh06.jpg)   

次に、別のシナリオについて考えてみましょう: データが含まれているパブリック フォルダーを削除する場合の例です。例えば、子パブリック フォルダー "\pf5\pf6" に件名が "Test Mail" のメールが含まれているとします。削除を行う前に Get-PublicFolderItemStatistics コマンドを使用することで、当該メールが存在していることを確認できます。

フォルダー "\pf5\pf6" が削除されると、フォルダーとそのコンテンツは親フォルダーのダンプスター (回復可能なアイテム フォルダー)(例: "\pf5" のダンプスター) に移動されます。

親フォルダーの保持削除期間が満了すると、フォルダー "\pf6" は、その中に含まれている件名 "Test Mail" のメールとともに、親フォルダー (例: "\pf5") に対応するコンテンツ メールボックス内の DiscoveryHolds フォルダーに、新しい名前 (FolderName\_GUID) で移動されます。

完全に削除されたフォルダーおよびアイテムは、適用された保持ポリシーで指定された期間に基づいて保持されます。

管理者として、各コンテンツ メールボックスの TotalDeletedItemSize および TotalItemSize パラメーターを監視し、配置されているパブリック フォルダーにおいて、削除、保持、ならびに作成に関する問題が発生しないようにする必要があります。次のような場合に、問題が発生する可能性があります。

親フォルダーの保持削除期間が経過した後、フォルダー "\pf6" が、件名 "Test Mail" のメールを含んだ状態で、親フォルダー (例: "\pf5") のコンテンツ メールボックス内の DiscoveryHolds フォルダー配下へに、新しい名前 (FolderName\_GUID) で移動されたことを確認できます。
![](pfh07.jpg) 

完全に削除されたフォルダーおよびアイテムは、適用された保持ポリシーで定められた期間に基づいて保持されるものとします。

管理者として、各コンテンツ メールボックスの TotalDeletedItemSize および TotalItemSize パラメーターを監視し、そのコンテンツ メールボックス上に配置されているパブリック フォルダーにおいて、削除、保持、ならびに作成に関する問題が発生しないようにする必要があります。次のような場合に、問題が発生する可能性があります。

- TotalDeletedItemSize が RecoverableItemsQuota を超過した場合
- TotalItemSize と TotalDeletedItemSize の合計が ProhibitSendReceiveQuota を超過した場合

これらの値の確認方法と、正常なクォータの維持に関するガイダンスにつきましては、こちらの[記事](https://techcommunity.microsoft.com/blog/exchange/troubleshooting-public-folder-deletion-issues-in-exchange-online/3819379)を参照してください。

注意: クォータの問題が検出された場合は、以下のスクリプトを使用して対処できます: [Scripts/Public Folders/CheckEXOMePf/CheckEXOMePf.md at main · hazemembaby/Scripts](https://github.com/hazemembaby/Scripts/blob/main/Public%20Folders/ValidateEXOMePf/ValidateEXOMePf.md)

#### 保持ポリシーの対象となっている削除済みパブリック フォルダー アイテムを復元する方法

次に、保持ホールドが適用されている完全に削除されたアイテムを復元する方法について説明します。
[コンテンツの検索](https://learn.microsoft.com/purview/ediscovery-content-search)は、完全に削除されたアイテムを検索および復元するための重要なツールです。以下の例で詳しく説明します。

例えば、パブリック フォルダー内で件名が "Test Mail" の完全に削除されたメール アイテムを検索する場合:

管理者は、[新しいコンテンツ検索](https://learn.microsoft.com/purview/ediscovery-content-search#create-and-run-a-search)から名前を "Look for mails on PF" とした検索を作成し、検索場所に「Exchange パブリック フォルダー」を指定したうえで、件名が "Test Mail" であることを条件として、これらのアイテムを検索できます。

以下のスクリーンショットは、Purview コンテンツの検索結果と results.csv ファイルを示しています。コンテンツ パブリック フォルダー メールボックス 2ndmbx および 3rdmbx の DiscoveryHolds フォルダー配下に 2 つのアイテムが検出されたことを確認できます。

Original Path または Location Name フィールドを使用することで、これらのアイテムの場所を確認することができます。
![](pfh08.jpg) 
結果をダウンロードすると、以下のような内容が表示されます。

    Original Path: 2ndMBX_fcb8821f@(domain).onmicrosoft.com, Primary, 68fc5185-4bd5-4777-9d3d-f85fd216def5\2ndMBX_fcb8821f@(domain).onmicrosoft.com (Primary)\NON_IPM_SUBTREE\DiscoveryHolds
    Location Name: 2ndMBX_fcb8821f@(domain).onmicrosoft.com

これらのアイテムを復元するには:

- Purview コンテンツの検索を使用して、検出されたアイテムを PST ファイルに[エクスポート](https://learn.microsoft.com/purview/ediscovery-export-search-results)します。
- 対象のパブリック フォルダーに対する必要なアクセス許可を持つ状態で、Outlook で [PST ファイルを追加または開きます](https://support.microsoft.com/office/open-and-close-outlook-data-files-pst-381b776d-7511-45a0-953a-0935c79d24f2#id0ebbf=classic_outlook)。
- Outlook を使用して、必要なパブリック フォルダーにアイテムを[コピー](https://support.microsoft.com/office/move-or-copy-an-item-to-another-folder-in-outlook-19768dfe-86c4-40bf-b82c-1c084b624492#picktab=classic_outlook)します。

また、完全に削除されたフォルダーは PowerShell を使用して復元することもできます。パブリック フォルダーを[復元](https://learn.microsoft.com/exchange/collaboration-exo/public-folders/restore-deleted-public-folder)すると、その配下に含まれるすべてのサブフォルダーとアイテムも復元されます。

#### 既知の問題とトラブルシューティング

最後に、以下のセクションでは既知の問題とトラブルシューティングのポイントについて説明します。
- まれに、DiscoveryHolds フォルダーがプライマリ パブリック フォルダー メールボックスから現在のメールボックスへ同期されない場合があります。この問題を解消するには、以下のコマンドを使用して手動で同期を実行してください。
```powershell
Update-publicFolderMailbox "affected mailbox" -InvokeSynchronizer -ForceOnlineSync -FullSync
```
DiscoveryHolds フォルダーがメールボックス (例: 2ndmbx) に同期されていない場合、ダンプスター (回復可能なアイテム フォルダー) 内のアイテムは処理されません。メールボックスで強制同期を実行すると、DiscoveryHolds フォルダーが同期され、ダンプスター (回復可能なアイテム フォルダー) 内のアイテムが正常に処理されるようになります。
![](pfh09.jpg)  
<small style="color: gray;">2ndmbx に対して強制同期を実行すると、DiscoveryHolds フォルダーが同期され、ダンプスター (回復可能なアイテム フォルダー) 内のアイテムが正常に処理されるようになります。</small>

- Outlook on the Web (OWA) において、以前ユーザーのお気に入りに追加されていた完全に削除されたフォルダは、保持期間が満了するまで、新しい保持名 ("Name\_GUID") のままで表示されることがあります。この場合の回避策として、Outlook on the Web のお気に入りから[これらのフォルダーをお気に入りから削除する](https://learn.microsoft.com/exchange/collaboration-exo/public-folders/use-favorite-public-folders)よう、ユーザーへ案内してください。

![](pfh10.jpg) 

今回の記事がお役に立てれば幸いです。
本記事のレビューおよび内容へのご協力をいただいた Bhalchandra Atre に、心より感謝します。