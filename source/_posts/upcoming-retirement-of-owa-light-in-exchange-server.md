---
title: "Exchange Server における OWA Light 廃止のお知らせ"
date: 2026-07-09
tags:
- Exchange
---

※ この記事は、[Upcoming retirement of OWA Light in Exchange Server](https://techcommunity.microsoft.com/blog/exchange/upcoming-retirement-of-owa-light-in-exchange-server/4534943) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Server の今後のアップデートで、OWA Light を廃止・無効化する計画をお知らせします。OWA Light は、ブラウザーのサポート状況、ネットワーク帯域、アクセシビリティ技術が現在とは大きく異なっていた Web の黎明期に作られました。今後は、ブラウザー間の互換性、アクセシビリティ、セキュリティを重視した最新の Outlook on the web の機能向上に投資していきます。

現在も OWA Light を利用している組織は、標準の Outlook on the web へ移行するとともに、OWA Light について記載されている社内ガイド、ブックマーク、トレーニング資料、ヘルプデスクのスクリプト、アクセシビリティのワークフローを見直す必要があります。

OWA Light の画面は以下のとおりです。
![](OWALight.jpg)

### 変更内容

今後提供予定の Exchange Server の更新プログラム（2026 年 8 月頃を予定）において、OWA Light を無効化し、廃止する予定です。この変更が適用されると、ユーザーは OWA Light を選択したり OWA Light にリダイレクトされたりすることはできなくなり、代わりに最新の Outlook on the web を使用することになります。

本お知らせは、Exchange Server (オンプレミス環境) を対象としています。OWA Light の廃止については、[2024 年 8 月にも発表](https://support.microsoft.com/outlook/learn-more-about-the-light-version-of-outlook)しています。

### 変更の理由

OWA Light は長年にわたり多くの利用者に活用されてきました。古いブラウザーや低速な回線環境、フル機能の Outlook Web App を利用できない環境でメールにアクセスするために、シンプルな Web インターフェイスとして設計されました。

従来の OWA Light を別途維持することは、システムの複雑さを増す要因となります。最新の Web の脅威に対する防御を強化する際、コンテンツのレンダリング パス、操作画面、互換性レイヤーなど、各要素について評価と保守が必要です。

Exchange Server の管理者は、この機会に OWA Light に依存しているユーザー、運用プロセス、ドキュメントを特定し、移行に向けた準備を進めることをお勧めします。

OWA Light を今すぐブロックするには、既存の OWA メールボックスポリシーを作成または更新します。

```PowerShell
Set-OwaMailboxPolicy -OwaLightEnabled $false
```
OwaMailboxPolicy がすべてのメールボックスに割り当てられていることを確認してください。OwaMailboxPolicy の割り当てには **Set-CasMailbox -OwaMailboxPolicy &lt;Name&gt;** コマンドレットを使用します。

さらに、OWA ログオン ページの OWA Light 選択メニューを無効にします。以下のコマンドを実行してください。
```PowerShell
Set-OwaVirtualDirectory -LogonPageLightSelectionEnabled $false
```

詳細は、[Set-OwaMailboxPolicy](https://learn.microsoft.com/powershell/module/exchangepowershell/set-owamailboxpolicy?view=exchange-ps) および [Set-OwaVirtualDirectory](https://learn.microsoft.com/powershell/module/exchangepowershell/set-owavirtualdirectory) のドキュメントを参照してください。

### まとめ

OWA Light は、Web がそれを必要としていた時代に重要な役割を果たしてきました。現在では、標準の Outlook on the web エクスペリエンスこそが注力すべきプラットフォームです。OWA Light を廃止することで、レガシー機能の維持に伴う負担を軽減し、継続的なエンジニアリング作業を簡素化するとともに、ユーザー体験のさらなる向上を実現していきます。