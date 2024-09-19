---
title: Exchange Online プロビジョニングの解明：アーキテクチャ、Exchange オブジェクトの種類、および属性
date: 2024-09-17
tags: Exchange
---
※ この記事は、[Demystifying Exchange Online Provisioning: Architecture, Exchange Object Types, and Attributes](https://techcommunity.microsoft.com/t5/exchange-team-blog/demystifying-exchange-online-provisioning-architecture-exchange/ba-p/4204206) の抄訳です。最新の情報はリンク先をご確認ください。

Exchange Online のさまざまな受信者オブジェクトの同期とプロビジョニングのプロセスを解明したいと考えました。このコンテンツの一部はすでにご存知かもしれませんが、新しい情報を含め、Exchange オブジェクトのプロビジョニングに関するほとんどの問題を理解し、トラブルシューティングするのに役立つことを願っています。このトピックの範囲が広いため、1 つのブログ投稿ではなく、今後シリーズのブログとして投稿する予定です。また、経験に関係なく、すべての人がコンテンツを理解できるように、基本から始めます。

## アーキテクチャの基本
オンプレミスの Exchange において最も単純なアーキテクチャは、「シングル フォレスト」トポロジです。この場合、ローカルの Active Directory (AD) と Microsoft Exchange 組織が同じフォレストにあります。したがって、Exchange が有効化された場合でもユーザー オブジェクトは単一となります。
Exchange Online では、シングル フォレスト トポロジとは異なり、リソース フォレスト トポロジの概念のように別の Active Directory のインスタンス (Exchange Online Directory Services と呼びます) が存在します。すべてのユーザー アカウントの認証は Microsoft Entra ID (旧称 Azure Active Directory) で行われます。これにより、2 つの Active Directory が存在し、1 つのユーザーあたり 2 つのオブジェクトが存在します。
ユーザー アカウント (およびその他のメールが有効なオブジェクト) は、ForwardSync および Dual Write として知られるプロセスを使用して Microsoft Entra ID と Exchange Online の間で同期されます。Exchange Online のオブジェクトは、ExternalDirectoryObjectID プロパティを介して Microsoft Entra ID 内の対応するユーザー アカウントとリンクされています。ExternalDirectoryObjectID プロパティは、Microsoft Entra ID の対応するユーザー アカウントの ObjectID の値を保持しています。

![](Prov01_01.jpg)

SharePoint Online、Teams などの他のワークロードにも同様の設計が利用されています。

![](Prov01_02.jpg)

次に、新しい要素として Microsoft Exchange ハイブリッド環境を紹介します。Microsoft Exchange ハイブリッド環境を簡潔に言い表すと、オンプレミスの Active Directory と Microsoft Entra ID という 2 つの Microsoft Exchange 組織が同期されている環境と言えます。ハイブリッド構成ウィザード (HCW) のおかげで、これは 1 つの組織として動作します。

HCW はハイブリッド環境を機能させる唯一の要素ではありません。実際には、HCW は双方の Exchange 組織が多くの面で互いを信頼して様々な機能が動作するよう構成変更を行うだけですが、受信者オブジェクトを 2 つのディレクトリ間で同期させる必要もあります。

そして、上記の同期を行うためにトポロジ内に必要なもう 1 つの要素が Microsoft Entra Connect です (このコンポーネントは何度か名前が変更されており、DirSync、AAD Sync、AAD Connect として知られているかもしれません)。Microsoft Entra Connect は、オンプレミスの Active Directory と Microsoft Entra ID 間でオブジェクトが同期されることを保証します。[「Exchange Hybrid オプション機能」](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-install-custom#optional-features)が有効になっている (Microsoft Entra Connect の構成時にチェックされている場合) と、オブジェクトが持つ可能性のあるすべての Exchange プロパティも同期に含まれます。そこから、それらは自動的に Exchange Online Directory Service に同期されるのは、すでに述べた ForwardSync および二重書き込みプロセスのおかげです。

したがって、ForwardSync と Dual Write は、Microsoft Entra Connect と同様に、Microsoft Entra ID と Exchange Online Directory Services オブジェクトの同期を維持するために、サービスにある同期エンジンを形成します。ただし、異なるところは: Microsoft Entra Connect は変更があると Microsoft Entra ID にプッシュしますが、ForwardSync は技術的には Microsoft Entra ID から Exchange Online Directory Services に変更をプッシュしません。代わりに、Exchange Online Directory Services は定期的に Microsoft Entra ID にクエリを実行し、同期が必要な変更があるかどうかを確認し、ある場合はそれらを同期します。

すべての要素がどのように連携しているかについて、以下の図にまとめました。

![](Prov01_03.jpg)

## オブジェクトの種類

Microsoft Exchange はメールボックスだけでなく、メールが有効になっていないプレーン ユーザー、メールが有効なユーザー、グループ、連絡先などの他のオブジェクトも扱います。

ただし、Exchange Online とオンプレミスの Exchange ではオブジェクトの種類が異なり、一部のオブジェクトの種類はこれらの環境のいずれかでしか使用できない場合があります。下図は、左側にオンプレミスの Exchange のオブジェクトの種類を示し、右側に Exchange Online のオブジェクトの種類を示しています：

![](Prov01_04.jpg)

両方の環境でプレーン ユーザーというオブジェクトの種類を持つことはできますが、Exchange Online ではリモート メールボックスのオブジェクトの種類がなく (少なくともテナント管理者には公開されません)、オンプレミスの Exchange にはあります。同じことが、Exchange Online で Microsoft 365 グループ (Unified Group) にも当てはまりますが、オンプレミスの Exchange では Microsoft 365 グループがありません。

もう一つ考慮すべき点は、動的配布グループが両方の環境で扱われているにもかかわらず、Microsoft Entra Connect によって同期されないことです。Exchange Online の動的配布グループは純粋なクラウドオブジェクトです。その理由は非常に簡単です。動的配布グループのメンバーシップは特定のフィルターに基づいており、同じフィルターで同期する場合、両方の環境でメンバーシップが異なります。

いずれの Exchange 組織においても、オブジェクトの種類を定義するものは何でしょうか? 答えは属性です。オンプレミスの Exchange サーバーのバージョンによっては、あるオブジェクトが他のオブジェクトよりも多くの属性を持つ場合があります。

オブジェクトの健全を保つための多くの属性の中で、オブジェクトの種類を定義する特定の 3 つの属性があります。それらは、***msExchRecipientDisplayType***、***msExchRecipientTypeDetails***、および ***msExchRemoteRecipientType*** であり、それぞれ ***RecipientType***、***RecipientTypeDetails***、および ***RemoteRecipientType*** プロパティにマッピングされます。これらは、Get-Recipient、Get-MailUser、または Get-RemoteMailbox などのコマンドレットを実行するときに確認できます:

![](Prov01_05.jpg)

>さて、属性について話しているところですが、Exchange オブジェクトを作成または変更するためにサポートされている唯一の方法は、Exchange Management Shell (EMS) と Exchange Admin Center (EAC) を使用することであることをご存知ですか? Set-ADUser が EMS から実行されている場合でも、サポートしていません (明示的に Microsoft サポートの監督下にある場合を除きます)。その理由は、Set-ADUser、属性エディター、ADSIEdit、またはサード パーティのツールは、検証なしで特定の属性に必要な値をスタンプするだけですが、EMS と EAC は、プロパティにスタンプしようとしている値が有効であるか、別のオブジェクトによって使用されているかどうかを確認します(電子メールアドレスは完璧な例です)。また、他の必要な属性も変更されていることを確認します（例えば、ArchiveGuid をスタンプするだけでアーカイブを有効にすることは、アーカイブが機能させるために十分ではありません）。

ここですべてのマッピングを説明することはしませんが、以下に最も関連性の高いものを示します：

![](Prov01_06.jpg)

- オンプレミスの Exchange の MailUser は、Exchange Online では MailUser または UserMailbox のいずれかになります（Exchange Online のライセンスが割り当てられているかどうかによります）。

- オンプレミスの Exchange の RemoteMailbox オブジェクトは MailUser のサブタイプですが、Get-MailUser を実行して一覧表示することはできません。代わりに Get-RemoteMailbox を使用してください。理想的には、Exchange Online のメールボックスとして表示されることになります。ちなみに、すべてのメールボックスがライセンスを必要とするわけではありません（共有またはリソース メールボックス）が、通常のメールボックスはライセンスが必要であり、ライセンスが割り当てられていない場合、それらをメールボックスとしてではなく、MailUser として表示することになるかもしれません。これについては後で説明します。

- 動的配布グループは、オンプレミスの Exchange から Exchange Online に同期されないため、どちらかの環境に動的配布グループが表示されている場合は、そのオブジェクトは同期されず、その環境でのみ作成されているため、対象オブジェクトに適用された変更が他方に同期されることを期待しないでください。

- Microsoft 365 グループについて：オンプレミスの Exchange はそれらを全く認識しませんが、Microsoft Entra Connect Group Writeback 機能が有効になっている場合、グループごとに対してオンプレミスの Exchange にメールが有効なユニバーサル配布グループが作成されます。これは [Microsoft Entra Connect で手動で有効にする](https://learn.microsoft.com/exchange/hybrid-deployment/set-up-microsoft-365-groups#enable-group-writeback-in-microsoft-entra-connect)必要があるオプション機能です。

## プロビジョニング
次に、Exchange Online のさまざまなオブジェクトの種類に対するプロビジョニングのしくみについて説明します。
 
これを説明する最も簡単な方法は、配布グループまたはセキュリティグループで例をあげることです。例えば、オンプレミスで 3 人のメンバーを持つグループを作成し、Microsoft Entra Connect が同期すると、Microsoft Entra ID にプッシュされ、そこから Forwardsync/DualWrite を介して Exchange Online Directory Services に送信されます。簡単に聞こえますでしょうか。3 人のメンバーを持つグループを同期するには、Microsoft Entra ID でいくつかのサブステップを経る必要があります。そのうちの 1 つは「正規化」と呼ばれ、このステップでは 1 つのタスクをより簡単なタスクに分割します。

先ほど述べたグループを例にとると、1 つの操作はグループの作成とメンバーの追加という 2 つの異なるタスクに分かれます。メンバーの追加も 3 つのアクションに分かれており、1 つは追加されるユーザーごとにグループのメンバーとして追加されます。

![](Prov01_07.jpg)



## *メールボックスのプロビジョニング – 注意点*
### 権限のソース
Microsoft Exchange のハイブリッド環境でのメールボックスのプロビジョニングについて説明する前に、この環境の主な利点は、すべてのアイデンティティをオンプレミスで作成および管理できることを理解する必要があります。同じオブジェクトが異なるディレクトリで更新される状況を避けるために、常に一方が他方に優先される側に存在する必要があります。これはを権限のソース（**Source of Authority**、SOA）と呼ばれ、この環境タイプ（ハイブリッドで、Microsoft Entra Connect が Exchange 属性を同期している）では、オンプレミスのディレクトリが SOA となります（ごく少数の例外を除く）。これを念頭に置いておくことが、特定の動作を理解するための鍵となります。


### 30日間の猶予期間
オンプレミスで新しいリモート メールボックスをプロビジョニングする場合でも、Exchange Online ライセンスを持ていないメールボックスを Exchange Online に移行する場合でも、サービスは管理者がユーザーに Exchange Online ライセンスを割り当てるために 30 日間の猶予期間を許可します。これは 30 日間の無料サービスを提供するためのものではなく、お客様が独自のプロビジョニング プロセスを定義し、通常のメールボックスに Exchange Online ライセンスを割り当てるための時間を与えるためのものです。
Exchange Online でメールボックスがプロビジョニングされたことを確認した後、または移行シナリオでは移行が完了する前にライセンスを割り当てることをお勧めします。

### リモート ルーティング アドレスとその他のプロパティ
次に知っておくべきことは、オンプレミスの Exchange 受信者の**リモート ルーティング アドレス**を誰がスタンプするかです（これが @YourDomain.mail.onmicrosoft.com です）。オンプレミスの Exchange は、次のシナリオに応じてスタンプします：

- オンプレミスの Exchange を使用しているすべてのユーザー向け:
既定の電子メール アドレス ポリシーは、ハイブリッド構成ウィザード（HCW）によって変更され、すべてのオンプレミスの受信者のセカンダリアドレスに YourDomain.mail.onmicrosoft.com アドレスが追加されます。このメール アドレス ポリシーが有効になっている場合、オブジェクトに一致する優先度の高い他のポリシーがなく、受信者の EmailAddressPolicyEnabled プロパティが「True」に設定されている場合、このアドレスはユーザーの「EmailAddresses」プロパティに表示されます。（「proxyaddresses」AD 属性にマッピングされます）

- メールボックスが Exchange Online に移行される場合:
オンプレミスのユーザーの「ExternalEmailAddress」プロパティ（「TargetAddress」AD 属性にマッピングされます）は、オンプレミスのメールボックスのハイブリッド移行が完了すると、メールボックス レプリケーション サービス（MRS）によってリモート ルーティング アドレス値（該当ユーザーの EmailAddresses に既に存在する必要があります）でスタンプされます。

- リモート メールボックスがオンプレミスからプロビジョニングされる場合:
リモート メールボックスをプロビジョニングする方法に関係なく（Enable-RemoteMailbox、New-RemoteMailbox、または EAC を使用）、YourDomain.mail.onmicrosoft.com アドレスを持つ「RemoteRoutingAddress」が必須パラメータとして指定する必要があります。これは、Exchange オンプレミスから Get-RemoteMailbox コマンドレットを実行すると、ExternalEmailAddress プロパティと EmailAddresses のセカンダリ アドレスとして表示されます。

リモート ルーティング アドレスは、Autodiscover、ハイブリッドメールフロー（トランスポート）、または空き時間情報のリクエストなどの他の Exchange 関連サービスを Exchange Online にリダイレクトするために重要です。

リモート ルーティング アドレス（YourDomain.mail.onmicrosoft.com）と **Microsoft Online Email Routing Address** (MOERA)(YourDomain.onmicrosoft.com）を混同しないでください。リモート ルーティング アドレスはオンプレミスの Exchange によってスタンプされますが、MOERA は Microsoft Entra ID によってスタンプされます（ただし、ユーザーを Microsoft Entra ID で直接作成し、その時点で Exchange Online ラセンスが割り当てられていない場合を除きます。その場合、オブジェクトには MOERA がスタンプされません）。

もう 1 つ重要なプロパティは **LegacyExchangeDN** です。これは、オンプレミスから同期された Exchange Online のメールボックスがある場合、X500 アドレスとしてオンプレミスのリモートメールボックスオブジェクトに書き戻されます。

**ExchangeGuid** は、最初にメールボックスを作成した Microsoft Exchange 組織によって生成されます：

- Exchange Online :オンプレミスの Exchange Management Shell から New-RemoteMailbox、Enable-RemoteMailbox を実行するか、Exchange Admin Center から Exchange Online メールボックスを作成することにより、メールボックスがオンプレミスからプロビジョニングされた場合
- オンプレミスの Exchange:ローカルでメールボックスを作成し、その後 Exchange Online に移行することを決定した場合

**ArchiveGuid プロパティ**は、ホストする Exchange 組織（オンプレミスまたはオンライン）に関係なく、常に Exchange オンプレミスによって生成され、これが Exchange Online に同期されます。

>Exchange Online でのプロビジョニングまたは変更は、最大 24 時間かかる場合があります。ほとんどの場合、ほぼ即時に処理されますが、リソースが通常よりも多く消費されると、遅延が発生する場合があります。詳細については、[この記事](https://learn.microsoft.com/exchange/troubleshoot/user-and-shared-mailboxes/delays-provision-mailbox-sync-changes)と自己診断ツールへのリンクをご覧ください。


これで、プロビジョニング シリーズ記事の Part1 が終わります。Part2 をお楽しみに！

Alberto Pascual Montoya と Ben Winzenz
