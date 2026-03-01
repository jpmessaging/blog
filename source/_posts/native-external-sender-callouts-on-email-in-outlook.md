---
title: "Outlook におけるメールのネイティブな外部送信者表示機能"
date: 2026-03-2
lastupdate: 
tags:
- Outlook
---
※ この記事は、[Native external sender callouts on email in Outlook](https://techcommunity.microsoft.com/blog/exchange/native-external-sender-callouts-on-email-in-outlook/2250098) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

**翻訳者注：** 英語の原文では一部の Outlook クライアントで展開中とされていますが、現在は対象 Outlook クライアントに展開済みのため、翻訳文では最新の状況を反映した表現としています。

# 概要

一部のお客様では、外部送信者からのメールであることをエンドユーザーに分かりやすく伝えるため、Exchange のトランスポート ルールを使用して、件名の先頭に文言を追加したり、メッセージ本文に注意書きを挿入したりしています。このアプローチにはいくつかの制限があります。例えば、以下のような点です。

- 外部ユーザーがスレッドに返信し続けると、件名に重複した [External] タグが表示される可能性があります (一部のお客様は重複を削除するためにカスタマイズされたソリューションを使用しています)。
- 件名が変更されると、Outlook の [スレッドとして表示] の機能が機能しなくなり、メッセージが同じスレッドに含まれなくなります。
- 変更された件名 (またはメッセージ本文) は、返信または転送時にメッセージの一部として残されるため、スレッドが内部メールになった場合に混乱が生じます。
- トランスポート ルールはエンドユーザーが使用しているクライアント言語を認識できないため、ローカライズに問題が生じる可能性があります。
- 件名に追加した文言が多くのスペースを占有してしまい、特に画面の小さいデバイスでは件名をプレビューしづらくなる場合があります。

上記のフィードバックは認識しており、組織外の送信者からのメールを識別するための、よりネイティブなエクスペリエンスの提供に取り組みました (これは、スパムやフィッシング詐欺といった脅威への対策にも役立ちます。) この機能は、メールに [External] というタグ (クライアント言語設定に基づいてローカライズされます) を表示し、メッセージ閲覧ビューの上部に関連するユーザー インターフェースが表示され、実際の送信者のメール アドレスを確認できるようになります。

# セットアップ方法

1. Exchange Online のテナント管理者は、テナント全体の新しいユーザー インターフェースを有効にするため、[Set-ExternalInOutlook](https://docs.microsoft.com/powershell/module/exchange/set-externalinoutlook) コマンドレットを実行する必要があります (この機能はすでに提供されています)。また、このコマンドレットを使用して特定のメールアドレスやドメインを許可リストに追加することもできます。
2. Outlook on the web は既にこの機能に対応しています。Outlook for Mobile (iOS & Android) および Outlook for Mac でもこの機能を展開しました。具体的なバージョンは以下になります。
    - Outlook on the web: 現在利用可能
    - Outlook for Windows: **2023 年 10 月 6 日更新**: [半期エンタープライズ チャネル (プレビュー)](https://learn.microsoft.com/officeupdates/semi-annual-enterprise-channel-preview#version-2308-september-12) でも利用可能になりました。Outlook for Windows における [External] タグ表示 (他のクライアントと同様の表示) は、最新チャネルおよび月次エンタープライズ チャネルのバージョン 2211 以降 (ビルド 15831.20190 以上) 、半期エンタープライズ チャネル (プレビュー) や 半期エンタープライズ チャネルのバージョン 2308 以降にリリースされています。
    各バージョンのリリース状況については、[Microsoft 365 Apps の更新履歴（日付別）](https://learn.microsoft.com/officeupdates/update-history-microsoft365-apps-by-date) をご確認ください。
    - Outlook for Mobile (iOS & Android): バージョン 4.2111.0 以降
    - 新しい Outlook for Mac: バージョン 16.47 以降

現在、外部送信者からのメールに件名の先頭に [External] タグを追加するトランスポート ルールを使用している場合、Outlook の新しいネイティブ機能では、メール アイテムに *IsExternalSender* という新しい MAPI プロパティが追加されます。現在すべてのクライアント バージョン (上記に記載されているもの) がこの機能に対応しているため、メールが [External] と二重に表示されること (新しいネイティブ機能による表示と、トランスポート ルールによる表示) を避けるため、Outlook のネイティブ外部送信者識別機能をオンにする前に、既存の対象トランスポート ルールをオフにしてください。

この機能は Microsoft 365 ロードマップ ID 70595 として展開状況を公開していましたが、現在はすでに展開が完了しており、テナント レベルで有効化することが可能です。

Outlook on the web、Outlook for Mac、および Outlook for Mobile では、メッセージ一覧に *External タグ*を表示されます。Outlook for Windows と OWA は、閲覧ウィンドウのインフォ バーに送信者のメール アドレスが表示されます。Outlook for Mobile と Outlook for Mac では、メッセージの閲覧ウィンドウに外部タグのみが表示され、実際の送信者のメール アドレスを確認するにはタグをクリックする必要があります。

Outlook for Windows の閲覧ウィンドウでの外部送信者の表示 (他のクライアントとは若干表示が異なります) :

![](ExternalCalloutsOutlook2.jpg)

**更新 2022 年 11 月 3 日:** Outlook for Windows のメッセージ一覧での新しい External タグ表示 (他のクライアントと同様) :

![](OLupdatedexternal.png)

Outlook on the web での外部送信者の表示 :

![](NativeOLExternal01.jpg)

Outlook for iOS での外部送信者のユーザー インターフェース (メッセージ一覧での表示、メール閲覧時の External タグ表示、および External タグをタップした後の送信者メール アドレスの表示) :

![](NativeOLExternal02.jpg)

PowerShell でこの機能を有効にすると、組織外から受信したメールに External タグが表示されるようになるまで 24 ～ 48 時間かかる場合があります (Outlook クライアントのバージョンが本機能をサポートしている場合)。

この機能を有効化する際、ユーザーに対して本機能を周知するとともに、必要に応じてトレーニングやドキュメントを更新することをお勧めします。

ご不明な点やフィードバックがあればお知らせください。