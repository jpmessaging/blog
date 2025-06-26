---
title: 'Exchange Online への外部受信者数の制限の導入'
date: 2024-12-20
lastupdate: 2025-06-26
tags: 'Exchange Online'
--- 

※ この記事は、[Exchange Online to introduce External Recipient Rate Limit](https://techcommunity.microsoft.com/blog/exchange/exchange-online-to-introduce-external-recipient-rate-limit/4114733) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<div style="margin:1.25em; border-left:4px solid rgb(160, 160, 160); padding:.5em">
<strong>2025 年 6 月 25 日 重要なお知らせ: クラウドホスト型メールボックスの外部受信者数制限 (MERRL) の導入時期が再度延期されました。</strong> お客様への影響を最小限に抑えるため、Microsoft はクラウド上のメールボックスの外部受信者数制限 (MERRL) の展開を約 6 ヶ月延期することを決定しました。MERRL は、2026 年 4 月以降にプロビジョニングされた試用テナントおよび新規テナントに対して、2026 年 4 月から適用されます。また、2026 年 4 月には Exchange 管理センターのレポート機能が利用可能となり、テナント管理者は送信者メールボックスごとの外部受信者数を確認できるようになります。2026 年 10 月には、既存テナントを含むワールド ワイドのすべてのクラウド上のメールボックスに対して MERRL の適用が開始されます。
</div>

Exchange Online は **24 時間で 2,000 人の外部受信者**というレート制限を 2026 年 4 月より適用し始めます。

Exchange Online は、大量のメール送信をサポートしていません。これまで大量のメール送信に対する制限を強制していませんでしたが、Exchange Online リソースの不公平な使用や乱用を減らすために、外部受信者の数に対する制限の導入を計画しています。外部受信者数の制限はユーザー / メールボックスごとに適用されます。

この新しい制限は、次の機能には当面適用されません。

- [顧客エンゲージメント アプリとメール サーバー間のサーバー側同期 - Power Platform | Microsoft Learn](https://learn.microsoft.com/power-platform/admin/server-side-synchronization)
- [Outlook.com - Connectors | Microsoft Learn](https://learn.microsoft.com/connectors/outlook/)

## 受信者数の制限についてはどうなりますか？

Exchange Online は[受信者数の制限](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#sending-limits-1)として 10,000 受信者の制限を設けています。2,000 人の外部受信者数の制限は、この 10,000 人の受信者数の制限のサブ制限となります。受信者数の制限に変更はなく、これらはどちらも過去 24 時間に対する制限となります。24 時間以内に最大 2,000 人の外部受信者に送信でき、外部受信者数の制限を超えた場合でも、同じ期間内に最大 8,000 人の内部受信者に送信できます。24 時間以内に外部受信者に送信しない場合、最大 10,000 人の内部受信者に送信できます。

### シナリオ例

- Day 1 の午前 6 時に Exchange Online のメールボックスを使用して 1,000 人の外部受信者と 2,000 人の内部受信者に送信し、合計 3,000 人の受信者に送信します。その後、Day 1 の午前 8 時にさらに 1,000 人の外部受信者に送信します。2,000 人の外部受信者に送信したため、Day 2 の午前 6 時まで外部受信者への送信がブロックされます。この期間中、最大 6,000 人の内部受信者に送信できますが、この例では送信しなかったとして話を進めます。
- Day 2 の午前 6 時に、Day 1 の午前 6 時に送信した 1,000 人の外部受信者と 2,000 人の内部受信者は今後の 24 時間の制限計算に含まれなくなります。したがって、Day 2 の午前 6 時から午前 8 時までの間に、最大 9,000 人の受信者（例：9,000 人の内部受信者、または 8,000 人の内部受信者と 1,000 人の外部受信者）に送信できます。
- この期間中に内部受信者または外部受信者に送信しない場合、Day 2 の午前 8 時には再び合計 10,000 人の受信者に送信でき、そのうち最大 2,000 人が外部受信者となります。

## この変更はどのように行われますか？

新しい外部受信者数の制限は 2 段階で導入されます。

- **フェーズ 1** - 2026 年 4 月、試用テナントおよびその日以降に作成されたテナントのすべてに制限が適用されます。このフェーズには、テナント内のメールボックスから送信した外部受信者数を確認するための Exchange 管理センターのメール フロー レポートが導入される予定です。
- **フェーズ 2** - 2026 年 10 月、既存のテナントに制限を適用し始めます。

この取り組みに関連して、[Azure Communication Services のメール通信リソースのドキュメント](https://learn.microsoft.com/azure/communication-services/concepts/email/prepare-email-communication-resource)も参照してください。また、Microsoft の担当営業ともご相談ください。

## Q&A

### 業務上の理由により外部受信者数の制限を超えるメールを送信する必要がある場合の回避策はありますか？

外部受信者数の制限を超える必要がある場合は、テナント外の受信者に大量のメールを送信するために特別に設計された [Azure Communication Services](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview) のメールに移行することができます。

### この制限は受信者ごとにカウントされますか、それともユニークな受信者ごとにカウントされますか？

受信者ごとにカウントされます。したがって、同じ 5 人の外部受信者に 100 通のメールを送信した場合、500 人の外部受信者としてカウントされます。