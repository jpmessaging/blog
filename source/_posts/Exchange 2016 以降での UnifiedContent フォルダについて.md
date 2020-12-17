---
title: >
    Exchange 2016 以降での UnifiedContent フォルダについて
date: 2020-12-12
tags: Exchange
---

## 概要
Exchange 2016 以降において、EdgeTransport.exe.config の `TemporaryStoragePath` を変更する場合には、Antimalware.xml も同時に変更する必要があります。これを実施しない場合、UnifiedContent フォルダにデータが残留してストレージを逼迫する要因になり得るのでご注意ください。

## 詳細
Exchange 2016 以降では既定で `C:\Program Files\Microsoft\Exchange Server\V15\TransportRoles\data\Temp\UnifiedContent` に、約 1 MB を超えるサイズのメッセージについてアンチ マルウェアに関する処理するための一時ファイルが作成されます (ファイル名は特に意味のない GUID 名となります)。
このデータは、CleanupFolderResponder という Active Monitoring のレスポンダーによって、1 日経過後に定期的に削除されるため基本的に対処は不要です。

しかし、EdgeTransport.exe.config の `TemporaryStoragePath` を変更した場合、新しいパスに作成されるデータについては自動的にこのレスポンダーで処理されません。
既定のインストールにおいては `TemporaryStoragePath` では以下のようになっています。

  EdgeTransport.exe.config の既定値:
  ```xml
	<add key="TemporaryStoragePath" value="C:\Program Files\Microsoft\Exchange Server\V15\TransportRoles\data\Temp" />
  ```

## 対処策
以下の手順で CleanupFolderResponder が処理する対象に、変更した TemporaryStoragePath の値を設定します。

1. EdgeTransport.exe.config の `TemporaryStoragePath` のパスを確認します。
2. 下記のファイルをテキスト エディターで開きます。

    %ExchangeInstallPath%Bin\Monitoring\Config\Antimalware.xml

3. ファイルの先頭付近にある以下のエントリを確認します。
    
    ※ "<!-- To override the default value ..." から始まるコメント内の ExtensionAttributes 要素ではないのでご注意ください。
    
    ```xml
    <ExtensionAttributes
      CleanupFolderResponderFolderPaths = "D:\ExchangeTemp\TransportCts\UnifiedContent;C:\Windows\Temp\UnifiedContent;C:\Program Files\Microsoft\Exchange Server\V15\TransportRoles\data\Temp\UnifiedContent"
      CleanupFolderResponderFileRetentionPeriod = "1.00:00:00"
      CleanupFolderResponderRecurrenceIntervalSeconds = "04:00:00"
    />
    ```

4. 上記エントリの `CleanupFolderResponderFolderPaths` に手順 1 で確認した TemporaryStoragePath のパス + "UnifiedContent" の値を設定します。

    例: TemporaryStoragePath が `D:\TransportRoles\data\Temp` の場合、`D:\TransportRoles\data\Temp\UnifiedContent` を設定します。
    ```xml
    CleanupFolderResponderFolderPaths = "D:\ExchangeTemp\TransportCts\UnifiedContent;C:\Windows\Temp\UnifiedContent;D:\TransportRoles\data\Temp\UnifiedContent"
    ```

    ※ 既定で設定されている `D:\ExchangeTemp\TransportCts\UnifiedContent;C:\Windows\Temp\UnifiedContent` についても削除しても支障ありませんが、上記例では最後の `C:\Windows\Temp\UnifiedContent;C:\Program Files\Microsoft\Exchange Server\V15\TransportRoles\data\Temp\UnifiedContent` のみ置き換えています。

5. MSExchangeHM サービスを再起動します。

## 補足
もし、既に残留しているファイルがあり直ぐに削除する必要がある場合には、ファイルの作成日を確認いただき、1 日経過しているようなものは手動で削除いただいて問題ありません。  

なお、UnifiedContent フォルダは Exchange 2013 にも存在しますが、実装の違いのため今回の注意点は Exchange 2013 には該当しません。