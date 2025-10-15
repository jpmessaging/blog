---
title: 'Exchange Online の "Contact" 受信者タイプ用の Get-Contact および Set-Contact コマンドレットの更新情報'
date: 2025-10-10
lastupdate: 2025-10-15 11:00
tags: 
- Exchange Online
---
※ この記事は、[Updates to Get-Contact and Set-Contact Cmdlets for “Contacts” Recipient Type in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/updates-to-get-contact-and-set-contact-cmdlets-for-%E2%80%9Ccontacts%E2%80%9D-recipient-type-in-/4459678) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

現在、Exchange Online の Get-Contact および Set-Contact コマンドレットは、***Contact*** (SMTP アドレスを持たないメール非対応の連絡先) と ***MailContact*** (メール連絡先) の 2 種類の受信者タイプの表示および管理に使用されています。最近の分析により、Exchange Online では ***Contact 受信者タイプ***のオブジェクトが機能していないことが判明したため、これらの管理を廃止されることが決定されました。**2025 年 12 月 15 日**以降、Exchange Online の Get-Contact および Set-Contact コマンドレットでは ***Contact 受信者タイプ***のオブジェクトが返されず、管理もできなくなります。

**注意**:

- この更新は、***Contact 受信者タイプ*** オブジェクトの管理に特化したものであり、***MailContact 受信者タイプ***には影響しません。
- この変更の影響を受けるのは、Exchange Online で \*-Contact コマンドレットを使用して管理される組織レベルの連絡先のみです。Outlook でユーザー個人が作成した連絡先には影響せず、個人のアドレス帳の連絡先は引き続き完全にサポートされます。

### 何が変わるのか？

- 2025 年 12 月 15 日以降、Exchange Online の Get-Contact および Set-Contact コマンドレットでは、SMTP アドレスを持たない Contact 受信者タイプのオブジェクトが返されず、管理もできなくなります。
- この変更は "MailContact" (MailContact 受信者タイプ) には影響しません。MailContact はこれまでどおり、同じコマンドレットで表示・管理できます。

### なぜ変わるのか？

- Contact 受信者タイプは SMTP アドレスを持たずメールの送受信ができないレガシーなオブジェクトです。これらは Exchange Online 上では直接作成できず、機能的な役割を持たないため、主にオンプレミス環境からの履歴同期によって存在しています。  
- 分析の結果、これらのオブジェクトを \*-Contact コマンドレットで管理しているテナントはごく少数であることが判明しました。大多数の組織にとって、この変更は日常業務に影響を与えません。    
- 本更新は、Exchange Online のディレクトリ インフラストラクチャを簡素化・最新化する取り組みの一環です。

### 管理者は何をする必要があるか？

ほとんどの組織では対応は不要です。本変更は軽微な変更であり、大多数の組織に影響を与えることは想定されていません。

ただし、Contact 受信者タイプのオブジェクトをご利用の場合、現在使用しているスクリプトや自動化プロセスを確認し、\*-Contact コマンドレットで Contact 受信者タイプ (メール非対応の連絡先) を明示的に検索・処理していないことを確認することをお勧めします。スクリプトが MailContact のみを参照している場合は、変更は不要です。

Contact オブジェクトに対して独自のユースケースで利用されている組織は、ぜひコメント欄でシナリオを共有ください。Exchange Online チームはすべてのシナリオを適切に考慮できるよう、フィードバックを積極的に受け付けています。

### よくある質問

**Q: MailContact に影響しますか？**  
A: いいえ。影響を受けるのは、SMTP アドレスを持たないメール非対応の Contact のみです。MailContact（メール連絡先）は、オンプレミスから同期されたかどうかに関係なく、引き続き完全にサポートされます。

**Q: どれくらいの組織が影響を受けますか？**  
A: ログによると、Exchange Online で Contact 受信者タイプのオブジェクトを \*-Contact コマンドレットで管理しているテナントはごく少数です。ほとんどの組織ではこの変更に気付かない可能性があります。影響を受けるテナントには、メッセージセンター (MC) を通じて通知が届きます。

**Q: Exchange Online にてどうメール非対応の Contact を識別すればいいですか？**  
A: Exchange Online PowerShell で次のコマンドを実行してください。 

Get-Contact | Where-Object { $_.RecipientType -eq "Contact" }  

このコマンドは RecipientType プロパティが "Contact" であるオブジェクトを返します。結果が空の場合、そのテナントにはメール非対応の Contact は存在しません。

**Q: Contact オブジェクトに関して懸念や特殊なシナリオがある場合はどうすればいいですか？**  
A: Exchange Online における Contact 受信者タイプに関して懸念や特有のユースケースがある組織は、ぜひコメント欄でシナリオを共有してください。Exchange Online チームでは、すべてのユースケースを考慮し、必要に応じて対応を検討します。現時点で、Exchange Online において Contact 受信者タイプが必要とされる具体的なシナリオは報告されていません。

