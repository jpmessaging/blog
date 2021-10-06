---
title: Outlook のバージョンを確認する方法
date: 2021-10-06
tags: Outlook
---


こんにちは。Exchange & Outlook サポートの紺野です。  
Outlook には以下の 2 種類の製品があり、種類によってバージョンの確認方法が異なります。

- **クイック実行版** (Click-to-Run/C2R)： 新しいインストール方式の製品。Microsoft 365 Apps for enterprise (旧称 Office 365 ProPlus)、Office Professional Plus 2019 など。
- **MSI 版** : Office 2016 以前のボリュームライセンス版などで提供される従来のインストール方式の製品。Office Professional Plus 2016 など。

Outlook の [ファイル] タブ-[Office アカウント] で [Outlook のバージョン情報] の上に [更新オプション] ボタンが表示されている場合はクイック実行版、表示されていない場合は MSI 版です。
 
![](updateoption.jpg)

Outlook のバージョンを確認するには、クイック実行版か MSI 版かによって以下の方法で確認してください。 

## クイック実行版の場合
上記の [Outlook のバージョン情報] の右側に表示される **「バージョン XXXX (ビルド YYYYY.YYYY)」** から確認します。

## MSI 版の場合や、MSI 版かクイック実行版かわからない場合

1. Outlook が起動していない場合は起動します。
2. タスク バーを右クリックして [タスク マネージャー] をクリックします。
3. [Microsoft Outlook] のプロセスを右クリックして [プロパティ] をクリックします (OUTLOOK.EXE のプロパティが表示されます)。
4. [詳細] タブの [製品バージョン] を確認します。
5. 必要に応じて、以下の一覧から対象のバージョンがクイック実行版か MSI 版かなどを確認します。
   - MSI 版のバージョン一覧: [Outlook and Outlook for Mac: Update File Versions](https://social.technet.microsoft.com/wiki/contents/articles/31133.outlook-and-outlook-for-mac-update-file-versions.aspx)  
   - クイック実行版のバージョン一覧: [Update history for Microsoft 365 Apps (listed by date)](https://docs.microsoft.com/en-us/officeupdates/update-history-microsoft365-apps-by-date) 日本語版は[こちら](https://docs.microsoft.com/ja-jp/officeupdates/update-history-microsoft365-apps-by-date)
 
注意： [Outlook のバージョン情報] をクリックして表示される画面には以下のように Office の共有コンポーネントのバージョンしか表示されない場合があるため、必ず上記の方法で確認してください。

![](version.jpg)
   
本情報の内容 (添付文書、リンク先などを含む) は、作成日時点でのものであり、予告なく変更される場合があります。