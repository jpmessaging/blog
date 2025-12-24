---
title: 'TERRL と MERRL について'
date: 2025-12-25
lastupdate:
tags: 
- Exchange
--- 

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームの山﨑です。   
2025年4月より、Exchange Online における送信制限の仕組みが大きくアップデートしました。   
これまで主に「1 メールボックスあたりの送信制限RRL（Recipient Rate Limit）」が中心でしたが、新たに以下の 2 つの制限が導入されました。    
下記のリンクでは、それぞれの制限についてより詳細をまとめているので、ぜひ下記のリンクのブログもご参照ください。

- [TERRL  (Tenant External Recipient Rate Limit)](https://jpmessaging.github.io/blog/introducing-exchange-online-tenant-outbound-email-limits/): テナント単位の組織外宛てメッセージの受信者数の制限
- [MERRL (Mailbox External Recipient Rate Limit)](https://jpmessaging.github.io/blog/exchange-online-to-introduce-external-recipient-rate-limit/): メールボックス単位の組織外宛てメッセージの受信者数の制限

本記事では、上記の TERRL と MERRL の違いと背景、既存の制限について解説します。

## 目次
[1. そもそもなぜ新しい制限が必要なのか？](#1-そもそもなぜ新しい制限が必要なのか)    
[2. TERRL と MERRL の違い](#2-terrl-と-merrl-の違い)    
[3. Exchange Online の既存の制限に変化はある？](#3-exchange-online-の既存の制限に変化はある)    
[4. まとめ](#4-まとめ)  

## 1. そもそもなぜ新しい制限が必要なのか？
Exchange Online はクラウドサービスである以上、すべてのテナントが公平にリソースを利用できるよう、スパムや誤送信、悪意ある利用を防ぐための制限が設けられています。    
従来は RRL が主な制限でしたが、これではテナント全体での送信量をコントロールするには不十分でした。   
そこで導入されたのが、テナント単位での送信制限「TERRL」です。一方でメールボックス単位での送信制限は「MERRL」と呼ばれます。
 
## 2. TERRL と MERRL の違い
それぞれの違いについて以下の表に簡単にまとめます。

| 項目 | TERRL | MERRL |
|------|------|------| 
| 名称 | Tenant External Recipient Rate Limit | 	Mailbox External Recipient Rate Limit |
| 単位 | テナント単位 | メールボックス単位 |
| 対象 | 組織外宛てメッセージの受信者数 | 組織外宛てメッセージの受信者数 |
| 制限方式 | ライセンス数に応じたテナント全体の上限 | 1 メールボックスあたり最大 2,000 件/日 |
| 目的 | テナント全体の送信量制御とリソース保護 | 個別ユーザーの濫用防止 |


それぞれの展開スケジュールや詳細については、冒頭のブログにまとめていますので、ぜひご確認ください。

## 3. Exchange Online の既存の制限に変化はある？
Exchange Online において元々適用されていた送信制限 RRL は、そのまま適用されます。   
こちらに関して動作に変わりはありませんが、1 メールボックスから送信されるメッセージの受信者数が 24 時間あたりに 10,000 を上回ってしまうとメッセージの送信が制限されます。    
また TERRL や MERRL とは異なり、組織内の受信者も組織外の受信者もどちらもカウントされますのでご注意ください。    
[公開情報](https://learn.microsoft.com/ja-jp/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#sending-limits-1)では例も含めてご案内しておりますため、気になる点があればご確認ください。

## 4. まとめ
このブログでは、MERRL と TERRL の違いについてまとめました。     
名前は似ていますが、MERRL と TERRL で注意すべきメッセージ数が異なる (テナント全体での制限なのか、メールボックス単位での制限なのか) ため、ご注意ください。   
また TERRL に関しては展開が一時停止している状況でもあるため、今後のアップデートをお待ちいただければと思います。
今後のアップデートも含め、より各制限の詳細を知りたい方はぜひ冒頭のブログもご参照ください。      

本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
