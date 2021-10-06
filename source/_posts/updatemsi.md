---
title: MSI 版の Outlook 2016 を最新に更新する方法
date: 2021-10-07
tags: 
- Outlook
---

こんにちは。Exchange & Outlook サポートの紺野です。

MSI 版の Outlook を最新に更新するには、Office 製品のすべての更新プログラムの適用を行います。  
Office 製品の更新プログラムは多数あるため、弊社では **Microsoft Update**、**WSUS** (Windows Server Update Services)、**MECM** (Endpoint Configuration Manager、旧称 System Center Configuration Manager (SCCM)) などを使用して最新のすべての Office 更新プログラムを配信し、各クライアントで自動適用されるように構成することを推奨しています。  
特に Exchange Online を含む Microsoft 365 サービスに接続して利用する場合は最新に更新して利用することを強く推奨しています。  

更新プログラムを個別にダウンロードして適用する必要がある場合は、以下の弊社マイクロソフト Web ページに一覧で公開しているすべての Office 更新プログラムを適用します。「 **Non-security release date** (セキュリティ以外のリリース日)」 と 「 **Security release date** (セキュリティのリリース日）」を比較して、新しい方の KB を適用ください。  
Office 2016 の更新プログラムは 60 個以上あるため、個別のインストールではなく、前述の Microsoft Update などを使用して必要な更新プログラムを自動検出して適用することをご検討ください。

List of the most current .msp files for Office 2016 products  
https://docs.microsoft.com/en-us/officeupdates/msp-files-office-2016 (英語)
https://docs.microsoft.com/ja-jp/officeupdates/msp-files-office-2016 (日本語機械翻訳)

![](msplist.jpg)
 

- 既にすべての Office 製品の Security を適用済みである場合は、Security よりも Non-security のリリース日が新しい KB だけを追加で適用してください。
- Office の更新プログラムは累積更新であるため、新しい方の KB には古い方の KB のすべての更新が含まれます。
- 既に適用済みの更新プログラムや、インストールされていないコンポーネントの更新プログラムは適用する必要がなく、手動で適用するとエラーが発生して失敗します。

---

補足

### 2021 年 11 月 1 日以降 Exchange Online へ接続する Outlook の最低要件が変更 (最新のすべての Office 更新プログラムの適用をお願いします)

以下の弊社マイクロソフトの Web ページや MC229143 で説明しているように、2021 年 11 月 1 日以降は Exchange Online に接続する Outlook の最低要件が変更されます。

Office versions and connectivity to Office 365 services  
https://docs.microsoft.com/en-us/deployoffice/endofsupport/office-365-services-connectivity

MSI 版 Office 2016 は、Office を 16.0.4600.1000 以降 (2017 年 11 月の [KB4051890](https://support.microsoft.com/en-us/kb/4051890) の Office 製品の更新一覧を含む) に更新しておく必要があります。
KB4051890 の更新一覧は約 3 年前で非常に古く、Outlook が使用する重要な Office 共有コンポーネントの更新も含まれないため、[KB4051890](https://support.microsoft.com/en-us/kb/4051890) に記載されている KB がすべて適用されていたとしても、それ以降にリリースされた更新プログラムを適用して最新に更新していない場合はパフォーマンスが悪く別の理由によって接続の問題が発生する可能性もあります。今回の記事で紹介している [List of the most current .msp files for Office 2016 products](https://docs.microsoft.com/en-us/officeupdates/msp-files-office-2016) の最新の更新プログラムをすべて適用ください。  
なお、Outlook は Office の共有コンポーネントを使用しており、Outlook の更新だけを適用しても最低要件を満たせません。すべての Office 製品の更新プログラムの適用をお願いいたします。

### [Outlook のバージョン情報] の画面だけでは、2021 年 11 月 1 日以降の要件を満たしているかを確認することができない
Outlook の [ファイル] タブ-[Office アカウント] で [Outlook のバージョン情報] をクリックした画面では、Office 共有コンポーネントが古いと以下のように表示されます。表示されている番号は Mso20win32client.dll のバージョンです。OUTLOOK.EXEのバージョンは表示されません。

![](version1.jpg)

Office 共有コンポーネントが新しい場合は、以下のように表示されます。Microsoft Outlook の後の番号は OUTLOOK.EXE のバージョン、MSO の後の番号は MSO.DLL のバージョンです。他の Office の更新プログラムの適用状況は確認できません。

![](version2.jpg)
 

