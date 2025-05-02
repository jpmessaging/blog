---
title: 新しい Outlook for Windows の始め方：従来版との違いを学ぶ
date: 2025-05-02
lastupdate:
tags: New Outlook
---

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームの杉山です。  
本記事では 2024 年 8 月 1 日に一般提供 (General Availability, GA) された新しい Outlook for Windows (以下、新しい Outlook) の概要や始め方、お問い合わせいただくことも増えている従来の Outlook for Windows (以下、従来の Outlook) との違いについてご紹介します。  
まだ新しい Outlook をご利用いただいていない方はこの記事をきっかけにお試しください！  

## 目次

[1. 新しい Outlook の概要を知ろう！](#1-新しい-Outlook-の概要を知ろう！)    
[2. 従来の Outlook との機能を比較しよう！](#2-従来の-Outlook-との機能を比較しよう！)  
[3. 新しい Outlook と従来の Outlook を並行稼働しよう！](#3-新しい-Outlook-と従来の-Outlook-を並行稼働しよう！)  
[4. フィードバックを活用しよう！](#4-フィードバックを活用しよう！)  
[5. Appendix: リリース ノート/ロードマップ](#5-Appendix-リリース-ノート-ロードマップ)

## 1. 新しい Outlook の概要を知ろう！

新しい Outlook はアジャイル性を高め、より迅速な機能の展開と可用性を提供するよう再考されているため、多くの新機能を素早く利用できます。  
たとえば [Copilot と連携](/blog/what’s-new-and-coming-to-microsoft-outlook-–-ignite-2024/)し AI を使用することにより、インテリジェントなスペル/文法チェック機能を用いてより優れたメールを作成できます。  
また、新機能の配信については従来の Outlook と異なり新しいビルド更新プログラムが毎週配布され、自動的に更新されます。  
これにより従来の Outlook では数日または数週間かかった機能更新が素早く提供されます。

新しい Outlook のアーキテクチャとしては、基本的に Outlook on the web をベースに構築されており [Microsoft Edge WebView2](https://learn.microsoft.com/microsoft-365-apps/deploy/webview2-install) (以下、WebView2) を利用した最新のサービス アーキテクチャに基づいております。  
そのため、UI は Outlook on the web に似ており、従来の Outlook とは異なります。  
WebView2 を利用することにより、デバイス プラットフォーム間で統一した機能を提供することが可能となります。

新しい Outlook の概要については[新しい Outlook for Windows の概要](https://learn.microsoft.com/microsoft-365-apps/outlook/overview-new-outlook)の公開情報も参照ください。

なお、従来の Outlook から新しい Outlook への移行は[段階的なアプローチ](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/guide-product-availability)を用いて 3 つのフェーズ (オプトイン、オプトアウト、カットオーバー) に分けて展開が進められております。  
従来の Outlook は少なくとも 2029 年までサポートが継続する予定ですが、将来的にはサポートが終了するため、段階的に新しい Outlook への移行を検討いただくことをお勧めします。

新しい Outlook の提供に関するガイドラインについては[新しい Outlook for Windows 一般提供に向けたガイド](/blog/new-outlook-for-windows-a-guide-to-product-availability/)のブログも参照ください。

## 2. 従来の Outlook との機能を比較しよう！

新しい Outlook と従来の Outlook との機能比較については以下の公開情報に比較表としてまとめられています。  
なお、現時点で新しい Outlook で利用できない機能については今後の機能開発にて使用可能となる場合もありますので、公開情報および後述のロードマップをご確認ください。　　

比較表は[新しい Outlook と従来の Outlook の機能の比較](https://support.microsoft.com/office/de453583-1e76-48bf-975a-2e9cd2ee16dd)の公開情報を参照ください。

例として 2 つの機能の違いをご紹介します。
 
#### COM アドイン
特に多くのお問い合わせをいただく機能としては COM アドインが挙げられます。  
新しい Outlook では [COM アドイン](https://learn.microsoft.com/microsoft-365-apps/outlook/overview-new-outlook#com-add-ins)はサポートされておりません。  
COM アドインはさまざまな方法で Outlook を操作でき、多くの場合は Outlook で不安定さとクラッシュを引き起こしました。  
そのため、新しい Outlook では COM アドインをサポートしておらず、代わりに Web アドインがサポートされております。  
Web アドインは従来の Outlook でも利用いただけるため、既に Web アドインをご利用の場合には新しい Outlook へ移行するために追加の作業は不要となります。  
現時点で COM アドインをご利用の場合には [Web アドインへの移行](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/migrate-com-to-web-addins)も検討ください。

#### 更新プログラムの管理
新しい Outlook のビルド更新プログラムは毎週配布され、ネイティブ コンポーネントにより自動的に更新されます。  
そして、従来の Outlook のような更新チャネルというものはありません。  
そのため、従来の Outlook と異なり MCM (Microsoft Configuration Manager) などを使用した更新プログラムの管理は不要となります。  
また、更新プログラムは Microsoft 365 Content Delivery Network (CDN) より直接ダウンロードされるため、*.office.net ドメインへの通信が可能である必要があります。  

## 3. 新しい Outlook と従来の Outlook を並行稼働しよう！
新しい Outlook と従来の Outlook は[並行稼働](https://support.microsoft.com/office/a624c36d-c50f-43bc-9c8b-dd17b5690ffb)することが可能です。  
たとえば、新しい Outlook ではまだ使用できない機能がある場合には従来の Outlook に戻すことも可能ですが、両方を並行して実行することにより、新しい Outlook で使用できない機能のみ従来の Outlook で操作することもできます。  
また、並行稼働により両方の製品でシームレスに作業をしながら機能を比較することも可能です。  
ぜひ、新しい Outlook と従来の Outlook を並行稼働いただき、機能を比較ください。  
そして、新しい Outlook で実装されていない機能や機能改善のご要望がありましたらフィードバックにてご意見をいただき、今後の製品開発にご協力ください。  

新しい Outlook のインストール方法については[新しい Outlook for Windows のインストール方法まとめ](/blog/Summary-of-installation-methods-for-new-outlook-for-windows/)のブログ記事も参照ください。　　

## 4. フィードバックを活用しよう！

新しい Outlook はリリースされたばかりであり、機能開発はまだ進行中です。  
加えて新しい Outlook の機能開発は活発におこなわれているため、皆様からのフィードバックをお待ちしております。  
サポートやフィードバックの詳細については、[新しい Outlook for Windows でサポートに問い合わせ、フィードバックを提供する](https://support.microsoft.com/office/4a4bcc80-c71e-4e44-97c1-d0e62452ef4a)の記事を参照ください。  
また、[フィードバック ポータル](https://feedbackportal.microsoft.com/feedback/forum/14c10fe9-fe8b-ef11-ac20-7c1e520b2631)もご用意がございますので投稿および同じ意見の投稿がある場合には Vote ボタンをクリックください。  
※ フィードバック ポータルについては英語での投稿にご協力ください。  

## 5. Appendix: リリース ノート/ロードマップ

新しい Outlook の新機能などの更新については[リリース ノート](https://learn.microsoft.com/officeupdates/release-notes-outlook-new)を参照ください。  
また、新しい Outlook の既知の問題や回避策については[こちら](https://support.microsoft.com/office/3b3dbdaa-b20b-4c79-a352-49bee8dc8bb5)の公開情報を参照ください。
 
新しい Outlook の最新機能について情報を入手するには、[ロードマップ](https://www.microsoft.com/microsoft-365/roadmap?filters=Outlook%2CDesktop%2CWeb&searchterms=newoutlookforwindows)をフォローいただくと、素早く情報をチェックできますのでご活用ください。
 
**本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。**