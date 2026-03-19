---
title: Outlook アドインでインライン画像を追加する際の添付ファイル ID の動作変更
date: 2026/03/19 09:00
tags:
  - Outlook
---

※ この記事は、[Changes to attachment IDs for inline images in Outlook add-ins](https://devblogs.microsoft.com/microsoft365dev/changes-to-attachment-ids-for-inline-images-in-outlook-add-ins/) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Outlook on the web および新しい Outlook for Windows (新しい Outlook) において、メール アイテムの署名や本文にプログラムでインライン画像の添付ファイルを追加する際の動作が更新されます。この変更は、インライン画像を追加したときに返される Exchange Web Services (EWS) ID に依存しているアドインに影響する可能性があります。

## 変更内容

以前は、`isInline` を true に設定して `addFileAttachmentFromBase64Async`/`addFileAttachmentAsync` メソッド ([Message Compose](https://learn.microsoft.com/javascript/api/outlook/office.messagecompose#outlook-office-messagecompose-addfileattachmentfrombase64async-member(1))) を使用してメール アイテムの署名や本文にインライン画像を追加すると、呼び出しが完了する前に画像がサーバーにアップロードされていました。その後、各画像に対してコールバック関数で EWS ID が返されていました (例 : `AAkALgAAAAAAHYQDEapmEc2byACqAC/EWg0AW4xUByFbp0CroCNphMYEEAAGhqU3LwAAARIAEACS5VsVp3akQa7/BahqVbve`)。

今後は、`addFileAttachmentFromBase64Async`/`addFileAttachmentAsync` の呼び出しが完了し、画像が署名や本文に追加された後に、インライン画像がサーバーにアップロードされるようになります。`addFileAttachmentFromBase64Async`/`addFileAttachmentAsync` の呼び出しはネットワーク呼び出しなしですぐに完了するため、EWS ID の代わりにローカルで一時的な添付ファイル ID が生成されます。この添付ファイル ID には "addinId" というプレフィックスが付きます (例 : `addinId:31c91015-920a-6fed-f663-970a0f9bc5cd`)。ローカルで生成された添付ファイル ID は一時的なもので、添付ファイルがサーバーにアップロードされると最終的に EWS ID が生成されます。

一時的な添付ファイル ID は、現在の作成セッション中 (作成中のメール アイテムが開いている間) は、`getAttachmentsAsync` や `getAttachmentContentAsync` などの他の添付ファイル API で完全にサポートされています。この動作は、添付ファイルがアップロードされて EWS ID が割り当てられた後も有効です。作成セッションが終了すると、一時的な ID は使用できなくなります。

以前の動作と同様に、すべてのインライン添付ファイルがサーバーにアップロードされるまで、メール アイテムは送信できません。添付ファイルのアップロード中にメッセージを送信しようとすると、アップロードがまだ進行中であることを通知するダイアログが表示されます。

## getAttachmentsAsync 呼び出しへの影響

インライン添付ファイルをプログラムで挿入した後に [Message Compose](https://learn.microsoft.com/javascript/api/outlook/office.messagecompose#outlook-office-messagecompose-getattachmentsasync-member(1)) モードで `getAttachmentsAsync` メソッドを呼び出すと、添付ファイルがサーバーにアップロード済みかどうかによって、コールバック関数で返される添付ファイル ID が異なります。

- 添付ファイルがまだサーバーにアップロード中の場合、`getAttachmentsAsync` メソッドは [id](https://learn.microsoft.com/javascript/api/outlook/office.attachmentdetailscompose#outlook-office-attachmentdetailscompose-id-member) プロパティに一時的な添付ファイル ID を返します。また、新しいプロパティ [isServiceAccessible](https://learn.microsoft.com/javascript/api/outlook/office.attachmentdetailscompose#outlook-office-attachmentdetailscompose-isserviceaccessible-member) が false に設定されます。`isServiceAccessible` プロパティは、添付ファイル ID が Microsoft Graph などの他のサービスで使用できるかどうかを示します。添付ファイルがまだアップロード中の場合に返される [AttachmentDetailsCompose](https://learn.microsoft.com/javascript/api/outlook/office.attachmentdetailscompose) オブジェクトの例は以下の通りです。

```json
{"id":"addinId:31c91015-920a-6fed-f663-970a0f9bc5cd","name":"taskpane.jpg","contentType":"image/png","size":1318,"attachmentType":"file","isInline":true,"isServiceAccessible":false}
```

- 添付ファイルがサーバーにアップロード済みの場合、`getAttachmentsAsync` メソッドは `id` プロパティに EWS ID を返し、`isServiceAccessible` は true に設定されます。添付ファイルがアップロード済みの場合に返される `AttachmentDetailsCompose` オブジェクトの例は以下の通りです。

```json
{"id":"AAkALgAAAAAAHYQDEapmEc2byACqAC/EWg0AW4xUByFbp0CroCNphMYEEAAGhqU3LwAAARIAEACS5VsVp3akQa7/BahqVbve","name":"taskpane.jpg","contentType":"image/png","size":1318,"attachmentType":"file","isInline":true,"isServiceAccessible":true}
```

## 変更による改善点

今回の変更は、署名のシナリオを改善するためのものです。インライン添付ファイルの追加を高速かつ安定的にし、署名を適用する前にネットワーク アップロードを待つ必要をなくしています。また、一時的なアップロードの問題が署名の表示を妨げることもなくなります。

- **署名の適用が高速化 (体感遅延の低減)**: 各インライン画像のアップロードを順番に待つことなく、すぐに署名を設定できるため、署名がすばやく表示されます。
- **信頼性の向上**: インライン画像のアップロードに失敗しても、署名の適用操作全体が失敗することがなくなり、署名は引き続き表示され、作成と送信を続けることができます。

## 必要な対応

Outlook アドインが添付ファイルの EWS ID を使用して Microsoft Graph の呼び出しを行っている場合、Graph の呼び出しを行う前に `isServiceAccessible` プロパティが true を返すことを確認するようにコードを調整する必要があります。

Outlook の署名アドインが `addFileAttachmentFromBase64Async`/`addFileAttachmentAsync` と [setSignatureAsync](https://learn.microsoft.com/javascript/api/outlook/office.body#outlook-office-body-setsignatureasync-member(1)) を一緒に呼び出している場合、変更は不要です。

## タイムライン

2026 年 3 月 30 日から、インライン添付ファイルの処理方法の変更が本番ユーザーへの展開を開始します。必要に応じて、それまでにアドインへの変更を行ってください。
