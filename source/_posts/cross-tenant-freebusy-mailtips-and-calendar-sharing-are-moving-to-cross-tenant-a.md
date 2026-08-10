---
title: クロステナントの空き時間情報、メール ヒント、予定表共有の管理がクロステナント アクセス ポリシーへ移行
date: 2026-08-10 15:00:00 
tags:
- Exchange Online
---
※ この記事は、[Cross-tenant Free/Busy, MailTips, and Calendar Sharing are moving to Cross-Tenant Access Policy](https://techcommunity.microsoft.com/blog/exchange/cross-tenant-freebusy-mailtips-and-calendar-sharing-are-moving-to-cross-tenant-a/4545169) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

他の Microsoft 365 組織との間で空き時間情報、メール ヒント、予定表を共有している場合は、今後予定されている変更について確認し、事前に対応を計画する必要があります。一方、このような組織間共有をご利用でない場合は、最初の 2 つのセクションをご確認いただくだけで十分です。この記事では、[Exchange Online EWS: 廃止期限が迫っています](https://jpmessaging.github.io/blog/exchange-online-ews-your-time-is-almost-up/) に伴って何が変わるのか、従来の仕組みが新しい Microsoft 365 クロステナント アクセス ポリシーのモデルにどのように置き換わるのか、利用中のテナントが影響を受けるかを確認する方法、そして必要な対応について説明します。正式なお知らせはメッセージ センターの [**MC1446796**](https://admin.cloud.microsoft/?ref=MessageCenter/:/messages/MC1446796) に掲載されていますが、本記事ではその内容をより分かりやすく補足し、MC1446796 の投稿だけでは伝えきれなかった背景も含めて説明します。

### この変更の影響を受ける組織

**他の Microsoft 365 組織との間で、空き時間情報、予定表、メール ヒントを共有している場合にのみ影響を受けます。**

この変更は、クロステナントまたは組織間の共同作業に影響します。具体的には、自組織 (組織 A) のユーザーと、提携先の Microsoft 365 テナント (組織 B) のユーザーが、お互いの空き時間情報、共有予定表、メール ヒント (不在通知など) を参照できる機能が対象です。子会社、パートナー企業、取引先、最近買収した会社との間でこれらの共有関係を構成している場合は、この変更内容を確認し、期限までに必要な対応を実施する必要があります。対応しないと、これらの機能を利用できなくなります。

なお、組織間共有は既定では設定されていません。テナント管理者が明示的に設定している場合にのみ利用されています。

**影響を受けないシナリオ:**

- 同一組織内で空き時間情報、予定表、メール ヒントを共有している場合。
- Exchange ハイブリッド構成で、オンプレミス環境のユーザーと Exchange Online のユーザーの間で空き時間情報、予定表、メール ヒントを共有している場合。
  このシナリオでは、[Exchange SE ハイブリッドのオンプレミス リッチ共存を Graph API に移行する方法](https://jpmessaging.github.io/blog/update-your-exchange-se-hybrid-on-premises-rich-coexistence-to-graph/) に従い、ハイブリッド専用アプリへの対応を進めてください。
- オンプレミスの Exchange Server を利用する別の組織との間で空き時間情報、予定表、メール ヒントを共有している場合。
  このシナリオについては現時点で直ちに影響はありませんが、今後変更が予定されているため、詳細は今後のメッセージ センターのお知らせをご確認ください。なお、共有先のパートナー組織が Exchange Online とオンプレミス Exchange の両方を利用している場合は、Exchange Online 側との共有は影響を受けます。

詳細については、後述の「共有設定を確認する方法」セクションを参照してください。

### 変更内容とその背景

Exchange Web Services (EWS) の廃止は、2026 年 10 月 1 日より開始されます。現在、テナント間での空き時間情報、メール ヒント、予定表共有などの組織間共有機能が内部で EWS を利用して動作しています。Exchange Online で EWS が廃止されるため、これらのクロステナント間のリクエストを処理する仕組みも別の方式へ移行する必要があります。

移行先となるのが、Microsoft 365 クロステナント アクセス ポリシーです。この新しい仕組みは 2026 年 9 月から利用可能となる予定で、従来の EWS ベースの方式に代わるものです。ユーザーにとって利用体験は変わりません。例えば、他テナントのユーザーの予定表の空き時間情報を確認するといった機能は、これまでと同様に利用できます。ただし、その通信経路は従来の EWS ではなく、Microsoft Entra ID によって管理される最新の仕組みに変更されます。この変更は、従来のプロトコルを廃止し、高い権限を必要とするアクセス方式の削減を進める Microsoft の取り組みの一環です。

### 新しいモデルの仕組み

現在、テナント間の共有は Exchange Online の次の 3 つの構成によって実現されています。

- 組織の関係: 他の Microsoft 365 テナントとの間で、空き時間情報やメール ヒントを共有するために使用されます。
- 可用性アドレス空間: 他の Microsoft 365 テナントとの間で空き時間情報を共有するために使用されます。具体的には、`AccessMethod` が `OrgWideFBToken` に設定されているものが対象です。
- 共有ポリシー: 他の Microsoft 365 組織の受信者へ招待を送信して予定表を共有する場合や、インターネット URL を使用して予定表を匿名で公開する場合に使用されます。

これらの構成では、これまで EWS を使用して共有先テナントから空き時間情報やメール ヒントを取得していました。今後は、この信頼関係およびデータ共有の仕組みが、Microsoft 365 クロステナント アクセス ポリシーに置き換わります。ただし、どの組織と連携するか、またどの情報を共有するかについては、これまでと変わらず管理者が決定できます。変更されるのは、共有データをやり取りする仕組みのみです。そのため、移行にあたっては、現在の構成を把握し、それに対応するクロステナント アクセス ポリシーを構成して、共有が引き続き機能することを確認したうえで、不要になった従来の構成を削除します。

### 現在の共有設定を確認する方法

MC1446796 はすべてのテナント管理者を対象に配信されていますが、実際には多くの環境で対応は不要です。そのため、移行を計画する前に、まず自社テナントが今回の変更の対象となるかを確認してください。確認するには、Exchange Online PowerShell に接続し、以下の 3 つのコマンドを実行します。
```powershell
Get-OrganizationRelationship | Format-List Name, DomainNames, Enabled, FreeBusyAccessEnabled, FreeBusyAccessLevel, FreeBusyAccessScope, MailTipsAccessEnabled, MailTipsAccessLevel, MailTipsAccessScope
```
コマンドの実行結果で `Enabled: True` と表示され、かつ `FreeBusyAccessEnabled: True` または `MailTipsAccessEnabled: True` のいずれかが表示されており、共有先の外部組織が Microsoft 365 を利用している場合は影響を受けます。それ以外の場合、対応は必要ありません。
```powershell
Get-AvailabilityAddressSpace | Format-List ForestName, AccessMethod
```
コマンドの実行結果で `AccessMethod: OrgWideFBToken` と表示され、かつ共有先の外部組織が Microsoft 365 を利用している場合は影響を受けます。それ以外の場合、対応は必要ありません。
```powershell
Get-SharingPolicy | Format-List Name, Domains, Enabled, Default
```
コマンドの実行結果で `Enabled: True` と表示され、かつ `Domains` プロパティに `CalendarSharingFreeBusy` アクセス レベル (`Simple`、`Detail`、`Reviewer` のいずれか) のルールが 1 つ以上含まれている場合、さらに共有先の外部組織が Microsoft 365 を利用しており、そのポリシーが 1 つ以上のメールボックスに割り当てられている場合は影響を受けます。それ以外の場合、対応は必要ありません。

最後の確認には注意点があります。`Anonymous:` で始まるルールは、インターネット上に公開した URL を利用して予定表を匿名ユーザーへ共有するための設定を表します。この `Anonymous:` で始まるルールに対しても `CalendarSharingFreeBusy` アクセス レベルが `Simple`、`Detail`、`Reviewer` のいずれかに設定されている場合は、この変更の影響を受けます。

### クロステナント アクセス ポリシーの展開スケジュール

この機能は 2026 年 9 月から順次利用可能になります。そのため、利用中の環境への展開が完了すると、移行作業を開始できます。展開スケジュールは次のとおりです。

| **環境** | **展開開始** | **完了予定** |
| --- | --- | --- |
| **Worldwide** | 2026 年 8 月 | 2026 年 9 月 1 日 |
| **GCC** | 2026 年 8 月中旬 | 2026 年 9 月中旬 |
| **GCC High** | 2026 年 9 月上旬 | 2026 年 9 月末 |
| **DoD** | 2026 年 9 月上旬 | 2026 年 9 月末 |

### 何も対応しなかった場合の影響

2026 年 10 月 1 日以降、これまでご案内しているとおり、Exchange Online では EWS の無効化が段階的に開始されます。利用中のテナントが無効化の対象になると、EWS に依存しているクロステナントの空き時間情報、メール ヒント、予定表共有は機能しなくなります。提携先組織のユーザーは、利用中のテナントから共有された空き時間情報、メール ヒント、予定表を確認できなくなる可能性があります。また、利用中のテナントのユーザーも、提携先組織の空き時間情報、メール ヒント、共有された予定表を確認できなくなる可能性があります。対象となる環境で何も対応しなかった場合、このような影響が発生します。

### 10 月までに準備できない場合の猶予期間

今回のお知らせから展開開始までの期間が短く、多数の提携先テナントとの複雑な組織間共有を構成している組織にとって、数週間で現状分析、検証、移行を完了することは簡単ではありません。

そのため、移行までの猶予期間が用意されています。以前の記事「[Exchange Online EWS: 廃止期限が迫っています](https://jpmessaging.github.io/blog/exchange-online-ews-your-time-is-almost-up/)」で案内したとおり **EWSEnabled** を **True** に設定すると、既存の組織間共有を引き続き利用できます。この設定を有効にすることで、新しい仕組みへの移行準備や検証を進めている間も、従来の EWS ベースの共有機能を継続して利用できます。この延長措置は、EWS が完全に廃止される 2027 年 4 月 1 日まで利用できます。この日付が新しい仕組みへの移行完了の最終期限です。

また、従来の共有方式は AppID に依存しておらず、OAuth も使用していないため、従来の共有方式を継続する目的で[テナントの許可リスト](https://techcommunity.microsoft.com/blog/exchange/introducing-ewsallowedappids-preparing-for-the-final-phase-of-ews-retirement/4529471) に AppID を指定する必要はありません。*`EWSEnabled` を `True` に設定すると、テナントの許可リストの設定状況にかかわらず、本記事で説明しているクロステナント間の空き時間情報、メール ヒント、予定表の共有を 2027 年 4 月まで引き続き利用できます。*

### 必要な対応

1. 影響の対象かどうかを確認します。前述の確認を実行し、該当する設定がなければ特に対応は不要です。
2. 利用中のテナントに Microsoft 365 クロステナント アクセス ポリシーの機能が展開された後、EWS の廃止による影響を受ける前に移行を完了できるよう計画します。詳しい手順は移行ガイドを確認してください。
3. 現在の共有設定を把握し、新しい Microsoft 365 クロステナント アクセス ポリシーを設定します。共有が機能することを確認した後、不要になった従来の共有設定を削除します。
4. 2026 年 10 月 1 日までに移行を完了できない場合は、`EWSEnabled` を `True` に設定して従来の共有を維持し、遅くとも 2027 年 4 月 1 日までに移行を完了します。

### 関連情報

- [メッセージ センターの MC1446796 - EWS 廃止前の Free/Busy、MailTips、カレンダー共有の移行](https://admin.cloud.microsoft/?ref=MessageCenter/:/messages/MC1446796): 利用中のテナントに送信された正式なお知らせです。
- [空き時間情報、予定表、およびメール ヒントを共有するための Microsoft 365 クロステナント アクセス ポリシーに移行する](https://learn.microsoft.com/exchange/sharing/migrate-to-m365-xtap): 移行ガイドです。
- [Exchange Online EWS: 廃止期限が迫っています](https://jpmessaging.github.io/blog/exchange-online-ews-your-time-is-almost-up/): 移行中に `EWSEnabled` を使用して EWS を継続する方法を説明しています。
- [Exchange Online での Exchange Web サービスの廃止](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online)

## よく寄せられる質問

**10 月の期限までに移行を完了できません。テナントの `EWSEnabled` を `True` に設定するほかに、[テナントの EWS 許可リスト](https://jpmessaging.github.io/blog/introducing-ewsallowedappids-preparing-for-the-final-phase-of-ews-retirement/)へ AppID を追加する必要はありますか。**  
他の組織との共有に使用している現在の設定を維持するには、`EWSEnabled` を `True` に設定するだけで十分です。テナントの `EWSAllowedAppIDs` に AppID を追加する必要はありません。ただし、組織間で双方向の情報共有を継続するためには、利用中の Microsoft 365 組織と共有先の Microsoft 365 組織の両方で、`EWSEnabled` を `True` に設定する必要があります。

**自組織だけが新しいモデルへ移行したが、共有先の組織が設定しなかった場合はどうなりますか。**  
双方向に共有する場合は、両方の組織で Microsoft 365 クロステナント アクセス ポリシーを設定し、従来の共有設定を無効にする必要があります。これらの対応が完了すると、双方向の共有が機能します。  
一方で、一方向の共有の場合は、リソース テナント (空き時間情報、予定表、メール ヒントの情報を持つメールボックスが存在するテナント) だけが Microsoft 365 クロステナント アクセス ポリシーを設定する必要があります。設定後、ホーム テナント (共有情報を参照するユーザーが存在するテナント) のユーザーは共有情報にアクセスできるようになります。なお、新しい方式で共有を利用するためには、双方の組織で従来の共有設定を無効化する必要があります。従来の共有設定が有効なままだと、共有要求が新しいクロステナント アクセス ポリシーを経由して処理されません。

**自組織では EWS の延長を設定していても、共有先組織では延長を設定しておらず、EWS の廃止開始までに移行を完了できなかった場合はどうなりますか。**  
共有先組織で EWS が無効化されると、自組織のユーザーは共有先組織から共有された情報にアクセスできなくなります。一方、共有先組織のユーザーは、引き続き自組織から共有された情報にアクセスできます。

**共有ポリシーのドメインにワイルドカードを指定しています。移行は必要ですか。**  
はい。`CalendarSharingFreeBusy` アクセス レベルが `Simple`、`Detail`、`Reviewer` のいずれかであれば、移行が必要です。

**同じ提携先テナントに複数のドメインが存在する場合、それぞれに対して設定が必要ですか。**  
提携先の複数のドメインが同一の Microsoft 365 テナント ID に属している場合は、そのテナント ID に対して 1 つの Microsoft 365 クロステナント アクセス ポリシーを設定するだけで対応できます。
そのテナント ID に関連付けられているすべてのドメインが、そのポリシーの対象となります。

**Google Workspace との Google/Exchange カレンダー連携のために可用性アドレス空間を設定している場合はどうなりますか。**  
この変更の影響は受けません。Exchange Online のユーザーは、これまでどおり可用性アドレス空間の構成を利用して、引き続き Google Workspace ユーザーの予定表情報を参照できます。Google Workspace のユーザーも、これまでどおり Microsoft Graph API を利用して Exchange Online ユーザーの予定表情報を参照できます。ただし、Google Workspace から Exchange Online への接続には、従来の EWS 接続方式ではなく Microsoft Graph API を使用するよう設定してください。詳しくは「[Allow Google Calendar users to see Exchange availability](https://knowledge.workspace.google.com/admin/sync/allow-calendar-users-to-see-exchange-availability)」を参照してください。

**商用クラウド (一般的な Microsoft 365 テナント) と 21Vianet クラウドの間で空き時間情報を共有するために可用性アドレス空間を設定している場合はどうなりますか。**  
この変更の影響を受けるため、Microsoft 365 クロステナント アクセス ポリシーへ設定を移行してください。