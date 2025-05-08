---
title: 退職者が開催者となっている予定のキャンセル方法の紹介
date: 2025-1-22
lastupdate:
tags: Exchange Online
alias: How_to_delete_the_schedule_of_a_retired_employee/index.html
---
こんにちは。日本マイクロソフト Exchange & Outlook サポート チームの山内です。\
本記事では退職したユーザーが在職中に Exchange Online で開催者として作成していた会議の削除方法について説明します。

## 退職したユーザーが開催者となっている会議が残っている場合に起こる問題

Exchange Online の予定表上の会議アイテムは開催者のメールボックスからでないと全体のキャンセルや予定の変更ができません。\
そのため、複数の参加者を含めた会議が残ってしまっている場合には、参加者がそれぞれ自分の予定表上で個別に削除 (辞退) する必要があります。\
また、リソース メールボックス等のユーザーに紐づかないメールボックスも参加者となっている場合では、権限を持つユーザーが代理で削除する必要がありますが、どの予定が該当するのかを個別に確認するには大きな手間がかかります。

このような問題が起きないように、本来であればユーザーは退職する前に自分が開催者である会議をキャンセルしておくことが望ましいです。\
本記事では、このような問題が発生した際にどのように代理で退職者のメールボックスからキャンセルを行うことができるかをご紹介いたします。

## 退職者のメールボックスからキャンセル通知を送るための前提条件

開催者のユーザー アカウントおよびメールボックスが残っている、もしくは削除済みであってもユーザー アカウントおよびメールボックスの復元が可能であることが必要になります。\
これは開催者のメールボックスからでないとキャンセルの通知を行うことができないためです。

既に削除してから時間が経過しており、復元することができなくなっている場合には、残念ながら開催者からのキャンセルを行うことができません。この場合は参加者側で個別に手動で削除する必要があります。

## 退職者のメールボックスからキャンセルを行うの 2 つの方法

退職者が設定した会議をすべて削除したい場合には基本的には方法 1 で実施することが簡単で一括削除もできますが、特定の会議を残す必要があるなど特殊な事情がある場合は方法 2 を検討してください。

- 方法 1. 退職者 (開催者) ユーザーを一時的に復元し、管理者コマンドで退職ユーザーが開催する一定期間の会議アイテムを一括でキャンセルする
- 方法 2. 退職者 (開催者) ユーザーを一時的に復元し、復元した開催者のメールボックスに対するアクセス権を別ユーザーに付与し、別ユーザーで該当の会議アイテムをキャンセルする

※ 方法 2 では会議内容の変更も可能ですが、基本的には会議をキャンセルして、別のアクティブなユーザーが開催者となって新規に会議を開催してください。

いずれの方法でも、ユーザーが削除されていた場合は一時的に退職者 (開催者) [ユーザーの復元](https://learn.microsoft.com/microsoft-365/admin/add-users/restore-user?view=o365-worldwide)を行い、退職者 (開催者) のメールボックスが Exchange Online 上に存在すること (キャンセル通知を送信できる状態にあること) が前提条件です。\
ユーザーの復元ができる場合でもある程度手間がかかり、ユーザーの復元ができない場合には参加者にて自身の予定表から手動で削除を行う必要が出てきます。\
そのため、退職するユーザーが在職中のうちにできる限り自身が開催者となっている会議のキャンセルを実施するように注意してください。

&nbsp;

それぞれの方法について、以下に手順を記載します。

### 方法 1. 退職者 (開催者) ユーザーを一時的に復元し、管理者コマンドで退職ユーザーが開催する一定期間の会議アイテムを一括でキャンセルする

退職者 (開催者) が開催する一定期間の会議をすべて一括でキャンセルしたい場合は、以下の手順を実施してください。\
この手順では [Remove-CalendarEvents](https://learn.microsoft.com/powershell/module/exchange/remove-calendarevents?view=exchange-ps) コマンドを利用します。[Exchange Online に PowerShell で接続する](https://learn.microsoft.com/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps)環境を用意してください。

1. 退職者 (開催者) のアカウントおよびメールボックスが削除されている場合は、[ユーザーの復元](https://learn.microsoft.com/microsoft-365/admin/add-users/restore-user?view=o365-worldwide)の手順で退職者 (開催者) ユーザーを復元します。

2. Exchange Online に PowerShell で接続し、Remove-CalendarEvents コマンドを利用し、退職者 (開催者) ユーザーが開催する一定期間の会議をすべて一括でキャンセルします。

``` PowerShell
Remove-CalendarEvents -Identity <定期的な会議を開催した退職ユーザーの UPN> -CancelOrganizedMeetings -QueryStartDate YYYY-MM-DD+09:00 -QueryWindowInDays 1825
```

実行例 : user01 が開催する 2025/1/1 から 5 年間の会議を一括でキャンセルする場合

``` PowerShell
Remove-CalendarEvents -Identity user01@contoso.com -CancelOrganizedMeetings -QueryStartDate 2025-01-01+09:00 -QueryWindowInDays 1825
```

<div style="margin:1.25em;border-left:.25em solid #8957e5;padding:.5em;">
<div style="margin-bottom:16px;display:flex;align-items:center;line-height:1;color:#8957e5">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px">
<path fill=#8957e5 d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg>
Note
</div>
<div>
本コマンドでは特定のアイテムを指定しキャンセルを実施することはできません。
-QueryWindowInDays に指定可能な最大数が 1825 であることから、最大で 5 年先までの会議アイテムが一括でキャンセルが可能です。<br>
-QueryStartDate パラメータは日本時間に併せて +9:00 のタイムゾーンの指定を行っています。<br>
コマンドを実行すると、指定したユーザーが主催する会議の予定表アイテムが削除され、会議の出席者に対してキャンセル通知が送信されます。
</div>
</div>

3. 予定表から会議を削除する前に警告が表示されますので、[Yes] を選択して続行します。

4. 会議のキャンセル後、該当のユーザーを改めて削除します。

&nbsp;

### 方法 2. 退職者 (開催者) ユーザーを一時的に復元し、復元した開催者のメールボックスに対するアクセス権を別ユーザーに付与し、別ユーザーで該当の会議アイテムをキャンセルする

退職者 (開催者) が開催する会議を別ユーザーが選択してキャンセルする場合は、以下の手順を実施してください。\
[Add-MailboxFolderPermission](https://learn.microsoft.com/powershell/module/exchange/add-mailboxfolderpermission?view=exchange-ps) コマンドを利用しますので、[Exchange Online に PowerShell で接続する](https://learn.microsoft.com/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps)環境を用意してください。

1. 退職者 (開催者) のアカウントおよびメールボックスが削除されている場合は、[ユーザーの復元](https://learn.microsoft.com/microsoft-365/admin/add-users/restore-user?view=o365-worldwide)の手順で退職者 (開催者) ユーザーを復元します。

2. Exchange Online に PowerShell で接続し、Add-MailboxFolderPermission コマンドを利用し、復元した開催者メールボックスへの編集権限を別ユーザーに付与します。

``` PowerShell
Add-MailboxFolderPermission -Identity "<退職者 (開催者) ユーザー>:\<退職者 (開催者) ユーザーの予定表フォルダーの名前>" -User <削除を実施する別ユーザー> -AccessRights Editor
```

実行例 : user01 の予定表フォルダーに対して admin01 のアカウントへ編集権限を与える場合

``` PowerShell
Add-MailboxFolderPermission -Identity "user01@contoso.com:\予定表" -User admin01@contoso.com -AccessRights Editor
```

<div style="margin:1.25em;border-left:.25em solid #8957e5;padding:.5em;">
<div style="margin-bottom:16px;display:flex;align-items:center;line-height:1;color:#8957e5">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px">
<path fill=#8957e5 d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg>
Note
</div>
<div>
予定表フォルダーの名前は、日本語であれば "予定表"、英語は "Calendar" 等、言語設定を既定のフォルダーに反映させる事でフォルダー名が異なる文字列になるのでご注意ください。
</div>
</div>

3. 削除を実施する別ユーザーの Outlook / Outlook on the web の予定表より、[予定表を開く] にて退職者 (開催者) ユーザーの予定表を追加し、該当の会議アイテムをキャンセルします。

4. 会議のキャンセル後、該当のユーザーを改めて削除します。

&nbsp;

---
**本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。**
