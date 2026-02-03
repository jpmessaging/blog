---
title: "すべての Outlook クライアントでモデレーション承認が効率化されました"
date: 2026/02/03
lastupdate: 2026/02/03
tags: Exchange
---

※ この記事は、[Streamlined Moderation Approvals, Now in All Outlook Clients](https://techcommunity.microsoft.com/blog/exchange/streamlined-moderation-approvals-now-in-all-outlook-clients/4491618) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。


#### はじめに

[Exchange Online のメール モデレーション](https://learn.microsoft.com/exchange/recipients-in-exchange-online/moderated-recipients-exo/moderated-recipients-exo) は、人による確認が必要なメッセージが見過ごされないようにする機能です。ただし、現在のワークフローには制約があり、わかりにくい点もあります。メッセージを承認または拒否するには、モデレーターは投票ボタンをサポートする Outlook クライアントを使用する必要がありますが、すべてのクライアントが対応しているわけではありません (例えば Outlook Mobile などは対応していません)。また、メッセージが分割またはフォークされると、複数の承認リクエストを受け取ることがあります。

これらの課題に対応するため、**すべての Outlook クライアントでのモデレーション承認**と**承認メッセージの統合**という 2 つのアップデートの展開を開始したことをお知らせします。これらのアップデートにより、モデレーターはより柔軟にモデレーション承認を行うことができ、ノイズを減らしながら迅速に対応できるようになります。

#### 新機能

###### **すべての Outlook クライアントから承認または拒否が可能に**

モデレーション承認メッセージについては、従来の Outlook の投票ボタン機能から、Actionable Messages のアダプティブ カードへ移行します。これにより、**承認 | 拒否** ボタンがメッセージ本文に直接表示されます。投票ボタンとは異なり、Actionable Messages のアダプティブ カードは Windows、Mac、Web、モバイルを含むすべての Outlook クライアントで動作するため、モデレーターは自分に最適なクライアントやデバイスから承認または拒否を行えるようになります。


###### **承認メッセージの統合**

モデレート対象のメッセージが非常に大きな配布リスト (DL) やグループに送信される場合、遅延を軽減するために Exchange Online はメッセージを複数のコピーに分割することがあります (いわゆる [分岐](https://learn.microsoft.com/exchange/reference/bifurcation))。この場合、各コピーがそれぞれ承認リクエストをトリガーする可能性があります。同様に、トランスポート ルールやポリシーによってメッセージがフォークされた場合も、同じ内容に対して重複した承認リクエストが発生することがあります。今回のアップデートでは、このフローを効率化し、メッセージがフォークされたり複数の経路で処理されたりしても、モデレーターには通常 1 つの承認リクエストのみが表示されるようになりました。ただし、メッセージが本当に複数の承認を必要とする場合は、すべての受信者にメッセージを配信するために各経路で承認が必要となります。

#### 今回のアップデートによる組織へのメリット

- **より迅速で柔軟な承認:** モデレーターは好みのデバイスから対応でき、クライアントを切り替える必要がありません。
- **一貫したエクスペリエンス:** Windows、Mac、Web、モバイルで同じ UI と操作が可能です。
- **ノイズの軽減:** ほとんどの場合、1 つのメッセージに対して 1 つの承認リクエストのみが届くため、すべての配信経路を正しく保ちながらモデレーション通知の煩雑さを軽減できます。

#### これらのアップデートが利用可能となる時期

モデレーション承認用の Actionable Messages アダプティブ カードは、2026 年 2 月下旬から展開を開始し、2026 年 4 月上旬までに完了する見込みです (Worldwide および GCC 環境向け)。GCC High および DoD 環境では Actionable Messages がまだサポートされていないため、これらの環境では当面の間、従来の投票ボタン方式によるモデレーション承認が継続されます。
承認メッセージの統合も同じく 2 月から 4 月にかけて、すべての環境 (Worldwide、GCC、GCC High、DoD) で展開されます。

#### 管理者向けの注意事項

- 新しいモデレーション承認エクスペリエンスをすべての Outlook クライアントで利用するには、テナントでメール用の Actionable Messages 機能が有効になっている必要があります。Actionable Messages が無効になっている場合 (既定では有効)、PowerShell で以下のコマンドを実行して有効化できます:

      Set-OrganizationConfig -SmtpActionableMessagesEnabled $true 
      Set-OrganizationConfig -ConnectorsActionableMessagesEnabled $true

- Actionable Messages 機能は Microsoft 365 でのみサポートされており、オンプレミスの Exchange 環境では利用できません。そのため、Exchange ハイブリッド構成の組織では、オンプレミスのモデレーターには承認ボタンが表示されません。Actionable Messages への移行を円滑に進めるため、2026 年 7 月 31 日まで従来の投票ボタンとアダプティブ カードの両方のエクスペリエンスをサポートします。それ以降は、新しい Actionable Messages アダプティブ カード方式のみがサポートされるため、モデレーターのメールボックスは Microsoft 365 でホストされている必要があります。

- 移行期間中 (7 月末まで)、モデレーターには承認メッセージがさまざまな形式で表示される場合があります。従来の投票ボタンのみ、アダプティブ カードによる承認ボタンのみ、またはその両方が表示されることがあります。7 月末まではすべての形式がサポートされ、正常に動作します。それ以降は、投票ボタンによる承認は廃止され、Actionable Messages のアダプティブ カードによる承認ボタンのみがサポートおよび表示されるようになります。

**関連情報**

- [Manage message approval in Exchange Online | Microsoft Learn](https://learn.microsoft.com/exchange/recipients-in-exchange-online/moderated-recipients-exo/moderated-recipients-exo)
- [Bifurcation and its technicalities with implications | Microsoft Learn](https://learn.microsoft.com/exchange/reference/bifurcation)
- [Set-OrganizationConfig (ExchangePowerShell) | Microsoft Learn](https://learn.microsoft.com/powershell/module/exchangepowershell/set-organizationconfig?view=exchange-ps)

#### よくあるご質問

**Q: 承認メッセージに投票ボタンと新しい承認ボタンの両方が表示されています。どちらを使用すればよいですか？**

A: どちらを使用しても問題ありません。

**Q: 組織でメッセージのフォークを引き起こすカスタム トランスポート ルールを使用している場合はどうなりますか？**

A: フォークが発生するシナリオでは、複数の承認リクエストが届く場合があります。すべての宛先にメッセージを配信するには、各経路で承認が必要です。これにより、すべての配信経路が正しく処理されます。








