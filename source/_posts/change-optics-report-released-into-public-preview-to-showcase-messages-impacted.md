---
title: "将来の変更影響を事前に把握できる「変更可視化レポート」がパブリック プレビューで登場"
date: 2026/04/21 17:00
lastupdate: 2026-10-20
tags:
- Exchange Online
---
※ この記事は、[Change Optics Report released into Public Preview to showcase messages impacted by future changes](https://techcommunity.microsoft.com/blog/exchange/change-optics-report-released-into-public-preview-to-showcase-messages-impacted-/4513047) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #66FF99; padding: .5em; margin: 1em 0 1em 0;"><strong>2026 年 10 月 19 日更新:</strong> 変更可視化レポートが Exchange Online で一般提供 (GA) になりました。詳細は、<a href="/blog/the-change-optics-report-is-now-generally-available-in-exchange-online/">Exchange Online で変更可視化レポート (Change Optics Report) が一般提供開始</a>をご覧ください。</p>

変更管理は、サービスの改善を進めるうえで非常に重要な要素です。これらの改善は、ときに利用者に影響を及ぼす可能性があります。そのため、サービス変更をアナウンスされた際に、「どのメッセージが影響を受ける可能性があるのか」を事前に把握できるようにすることが重要です。このような背景から、変更可視化レポート (Change Optics Report) のパブリック プレビューを公開しました。このレポートは、今後のサービス変更により影響を受ける可能性のあるメッセージを確認するための中核的なレポートとなります。

Exchange Online では、機能改善や問題対応を進める過程において、特定のメッセージの送信や配信に影響を与える可能性のある変更が行われることがあります。今回公開されたこのレポート機能は、そのような変更が発生した際、影響の有無を確認するための参照先として利用できます。このレポートでは、変更への対応準備を行う管理者にとって重要な複数のシナリオが提示されており、将来的に影響を受ける可能性のある特徴を持つ **サンプル** メッセージを確認することができます。

これらのサンプル メッセージにより、管理者は今後の変更によってどの部分に対応が必要となるかを特定し、サービス変更による業務への影響 (障害) を未然に防ぐための調査をすることができます。このレポートを活用することで、関連する変更が適用される前に、対象となるメッセージを削減し、リスクが解消されるまでの進捗を把握することができます。

#### 初期シナリオ

このレポートには、公開時点で 2 つの代表的なシナリオがあらかじめ含まれています。

- **OMC** は、onmicrosoft.com ドメインを使って外部に送信されているメール通信を指します。これは、現在も onmicrosoft.com の利用が残っている大規模組織を対象としており、今後この通信に対して送信制限 (throttling) が適用される前に、利用状況を見直して対応する必要があります。詳細は [onmicrosoft ドメインのメール送信利用制限について](/blog/limiting-onmicrosoft-domain-usage-for-sending-emails/) をご覧ください。

- **DRS** は、組織テナントで受信されている Direct Send 通信を指します。Reject Direct Send 設定の利用を検討している場合、事前に正当な通信をすべて特定し、適切に対応しておくために有用です。詳細は [Exchange Online におけるダイレクト送信の制御機能強化の導入](/blog/introducing-more-control-over-direct-send-in-exchange-online/) をご覧ください。

#### レポートの利用方法

このレポートは、Exchange 管理センター ([https://admin.cloud.microsoft/exchange](https://admin.cloud.microsoft/exchange)) の **レポート > メール フロー > 変更可視化レポート** から確認できます。

変更可視化レポート： Exchange Online 構成の変更を時系列で確認できます。日付範囲やシナリオ種類でフィルターして、特定の変更を絞り込んで確認することができます。

レポートは、要約ページと詳細ページで構成されています。

##### 要約ページ

要約ページでは、シナリオごとに検出されたメッセージ数の推移をまとめた概要チャートが表示されます。
![](COR01.jpg)

##### 詳細ページ

詳細ページでは、シナリオごとのサンプル メッセージを確認できます。調査に必要な主要なメッセージのプロパティを参照でき、csv ファイルとしてエクスポートすることが可能です。さらに、メッセージに関する追加情報が必要な場合は、Message Trace を使用して取得することができます。

確認したいシナリオは、ドロップダウン メニューから選択できます。
![](COR02.jpg)

英語原文のコメント欄にて、ご意見・ご感想をお寄せください。本レポート機能が一般提供（GA）となりましたら、本ブログを更新のうえお知らせいたします。