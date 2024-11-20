---
title: '意図しないライセンス解除から保護するための Exchange Online ライセンス解除レジリエンシーの導入'
date: 2024-11-21
tags: 
- Exchange Online
---

※ この記事は、[Introducing Exchange Online Delicensing Resiliency to protect against unintended delicensing actions](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-delicensing-resiliency-to-protect-against-unintended/4082759) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

最近、Exchange Online に新機能が導入され、ライセンス解除の際に 30 日間の猶予期間を提供することで、Exchange Online メールボックスの誤ったまたは意図しないライセンス解除から保護できるようになりました。この機能は、管理者およびユーザーへの通知オプションも提供し、意図しないライセンス解除の影響を事前に回避することができます。この機能は、10,000 以上の評価版ではない Exchange Online ライセンスを持つテナントでオプト インすることで利用ができます。

## ライセンス解除レジリエンシーの仕組み

Exchange Online ユーザーのメールボックス アクセスはライセンスの有無に依存しています。ライセンスが削除されると、メールボックスはユーザーに利用できなくなり、メール フローに影響を与え、配信不能レポート（NDR）やメールの誤送信が発生します。

過去には、[グループ ベースのライセンス](https://learn.microsoft.com/entra/fundamentals/concept-group-based-licensing)を使用している顧客が誤って多数のユーザーのライセンスを解除し、広範なサービスの中断やメール フローの中断を引き起こした事例がありました。

この新機能は、ライセンス解除のエラーによる即時の影響を防ぐために、ライセンス解除から30日間の猶予期間を提供し、管理者が誤りを修正するための時間を確保します。この猶予期間中、メールボックスはライセンス解除前の機能を維持し、管理者がライセンス解除の誤りに対処するための必要な時間を提供します。この猶予期間中に、管理者はユーザーのライセンス解除を迅速化したり、ユーザーに再ライセンスを付与したり、猶予期間が終了するまでライセンスを付与しないままにすることができます。

Exchange Online ライセンス解除レジリエンシー機能の30日間の猶予期間が終了し、ライセンスが削除されると、ユーザーメールボックスは独自の[デフォルトの30日間の猶予期間](https://learn.microsoft.com/exchange/recipients-in-exchange-online/delete-or-restore-mailboxes?source=recommendations#license-removal)に従います。この期間中、ユーザーはメールボックスにアクセスできませんが、ライセンスが再度付与されるとアクセスが復元され、メールボックスが再びアクティブになります。30日間の猶予期間が終了すると、データは削除され、復元できなくなります。

以下の図は、動作の変更をまとめたものです：

**Exchange Online ライセンス解除レジリエンシー機能が有効でない場合（デフォルトの動作）**:
![](Delic01.jpg)

**Exchange Online ライセンス解除レジリエンシー機能が有効になった場合（新しい動作）**:
![](Delic02.jpg)

この機能が有効になると、Get-PendingDelicenseUser を実行することで、30日間の猶予期間がいつ終了するかを確認できます。
![](Delic03.jpg)

Microsoft 365 管理センターを使用して、猶予期間がいつ終了するかを確認し、ライセンス解除の迅速化などの他のアクションを実行することもできます。
![](Delic04.jpg)

この機能を実行可能にするために、管理者向けの[サービス正常性ダッシュボード](https://learn.microsoft.com/microsoft-365/enterprise/view-service-health?view=o365-worldwide&amp;WT.mc_id=365AdminCSH_inproduct)のアドバイザリ通知とユーザー向けのメール通知を追加しました。これにより、管理者は 30 日間の猶予期間が終了する前に、Exchange Online ユーザーの意図しないライセンス解除を事前に対処することができます。この機能が有効になると、管理者向けのサービス正常性ダッシュボードのアドバイザリ通知とユーザー向けのメール通知も有効になります。

サービス正常性ダッシュボードのアドバイザリ通知は、テナント内でライセンス解除の活動がある場合に、管理者がアドバイザリのダイジェスト通知を受け取るように設計されています。サービス正常性ダッシュボードへ投稿には、30 日間の猶予期間内にあるライセンス解除されたユーザーの数が 8 日間の期間にわたって含まれます。

以下は、サービス正常性ダッシュボードのアドバイザリ通知のサンプルです：
![](Delic05.jpg)

管理者は、ユーザーのライセンス解除を迅速化したり、ユーザーに再ライセンスを付与したりするなど、適切なアクションを実行できます。

サービス正常性ダッシュボードのアドバイザリ通知に気付かない、または対応しない管理者がいる可能性があるため、ユーザー通知はデフォルトで有効になっています。ライセンスが解除されたユーザーには、ライセンス解除の約 18 日後から数回のメールが送信されます。これらのメール リマインダーは、ライセンス解除後 24 時間以内にメールを送信したり、メールボックスにアクセスしたりするなどのアクティビティがあるユーザーにのみ送信されます。

以下は、ユーザーへのメール通知の例です：
![](Delic06.jpg)

## 詳細情報

現在、この機能は WW クラウドでのみ利用可能です。この機能を government および sovereign クラウドに展開することについてのフィードバックをお聞かせください（[元のブログ](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-delicensing-resiliency-to-protect-against-unintended/4082759)のコメント欄に英語でコメントください）。

この新機能の詳細については、[Exchange Online ライセンス解除レジリエンシーの開始](https://learn.microsoft.com/Exchange/recipients-in-exchange-online/manage-user-mailboxes/exchange-online-delicensing-resiliency)をご覧ください。この機能についてのご意見も[元のブログ](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-delicensing-resiliency-to-protect-against-unintended/4082759)のコメント欄にてコメントしてください。
