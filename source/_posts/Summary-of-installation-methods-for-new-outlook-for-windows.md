---
title: 新しい Outlook for Windows のインストール方法まとめ
date: 2025-02-27
lastupdate:
tags: New Outlook
---

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームの杉山です。\
本記事では、お問い合わせいただくことも増えている新しい Outlook for Windows (以下、新しい Outlook) のインストール方法について説明します。\
新しい Outlook は様々なインストール方法が提供されているため、代表的なインストール方法をご紹介します。

## インストール方法の代表例

新しい Outlook のインストール方法としては大きく分けて 3 つのタイプがあり、さらに様々なインストール方法があります。

### 1) 自動的なインストール

[a. Windows 11 23H2 以降の新規インストールまたはアップグレード](#a-Windows-11-23H2-以降の新規インストールまたはアップグレード)\
[b. Windows 10 の更新プログラムによるインストール](#b-Windows-10-の更新プログラムによるインストール)\
[c. Microsoft 365 Apps に含まれる新しい Outlook のインストール](#c-Microsoft-365-Apps-に含まれる新しい-Outlook-のインストール)
    
### 2) ユーザー操作による一般的なインストール

[d. Microsoft 365 Apps 版の Outlook の右上に表示される [新しい Outlook を試す] のトグルをオンにする](#d-Microsoft-365-Apps-版の-Outlook-の右上に表示される-新しい-Outlook-を試す-のトグルをオンにする)\
[e. ユーザーが Microsoft Store からインストールする](#e-ユーザーが-Microsoft-Store-からインストールする)
    
### 3) その他の展開オプション

[f. Setup.exe を使用したインストール](#f-Setup-exe-を使用したインストール)\
[g. オフライン インストーラーを使用したインストール](#g-オフライン-インストーラーを使用したインストール)\
[h. Windows パッケージ マネージャー (winget) を使用したインストール](#h-Windows-パッケージ-マネージャー-winget-を使用したインストール)\
[i. Microsoft Intune を使用したインストール](#i-Microsoft-Intune-を使用したインストール)

---

## 1) 自動的なインストール

#### a. Windows 11 23H2 以降の新規インストールまたはアップグレード
    
新しい Outlook は Windows 11 23H2 以降のバージョンを実行している Windows 端末に[プレインストール](https://support.microsoft.com/office/4395454d-cb2f-4c16-bb24-fa4bb36650ae#bkmk_option3_updatewin)されます。\
現時点では Windows 11 23H2 以降のバージョンで新しい Outlook のインストールを防ぐことはできません。\
しかしながら、インストールされた新しい Outlook を削除することは可能です。\
新しい Outlook を表示したくない場合には[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/control-install#block-new-outlook-preinstall-on-windows)を参照ください。

#### b. Windows 10 の更新プログラムによるインストール

Windows 10 をご利用の場合、2025 年 1 月 28 日にリリースされたオプションの [KB5050081](https://support.microsoft.com/topic/a8c14cfd-0f24-43ad-aea2-641d86cb648f) に新しい Outlook が含まれるようになりました。\
また、2025 年 2 月 11 日にリリースされた月次セキュリティ更新プログラム [KB5051974](https://support.microsoft.com/topic/19045-5487-687841b4-97c9-493a-8cb8-ba3b8c077c7e) を適用することにより新しい Outlook がインストールされます。\
これらのインストールにおけるブロック方法などについては[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/control-install#block-new-outlook-preinstall-on-windows)を参照ください。
    
#### c. Microsoft 365 Apps に含まれる新しい Outlook のインストール
Microsoft 365 Apps バージョン 2502 以降、クライアント アプリの展開に既定では新しい Outlook が含まれます。\
既定では従来の Outlook と新しい Outlook の両方が有効となっておりますが、新しい Outlook をインストールしないよう構成することも可能です。\
なお、従来の Outlook と新しい Outlook は平行して実行が可能であるため、両方のアプリをインストールすることで新しい Outlook を評価いただくことをお勧めします。
    
新しい Outlook を除外したい場合は [Office カスタマイズ ツール](https://config.office.com/deploymentsettings)を使用しインストールの除外を構成します。\
また Office 展開ツール (ODT) で XML を変更することも可能です。\
※ ExludeApps の ID="OutlookForWindows" が新しい Outlook アプリを指します。

![](image1.jpg)

こちらの項目で記載した内容については[公開情報](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/deployment-new-outlook#install-new-outlook-with-a-new-microsoft-365-deployment)の内容も参照ください。

---

## 2) ユーザー操作による一般的なインストール

#### d. Microsoft 365 Apps 版の Outlook の右上に表示される [新しい Outlook を試す] のトグルをオンにする

既定では、従来の Outlook for Windows (以下、従来の Outlook) アプリの右上に [新しいOutlookを試す] というトグルが表示されます。\
このトグルをオンにして、新しい Outlook のエクスペリエンスをお試しいただけます。\
従来の Outlook にはいつでも切り替えることができます。\
新しい Outlook の使用を開始する詳細な方法は[こちら](https://support.microsoft.com/office/656bb8d9-5a60-49b2-a98b-ba7822bc7627)を参照してください。\
なお、[新しい Outlook を試す] トグルは管理者より[非表示](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/outlook-on-the-web/enable-disable-employee-access-new-outlook#use-the-registry-to-enable-or-disable-the-new-outlook-toggle-in-outlook-desktop)とすることもできます。
    
![](image2.jpg)

#### e. ユーザーが Microsoft Store からインストールする

新しい Outlook は Microsoft Store アプリとしても提供されているため、[Microsoft Store](ms-windows-store://pdp/?ProductId=9NRX63209R7B) よりインストールいただけます。

![](image3.jpg)

---

## 3) その他の展開オプション

#### f. Setup.exe を使用したインストール
Microsoft Store へのアクセスを無効化している組織の場合には Office CDN から直接インストーラー (Setup.exe) をダウンロードし、インストールいただけます。\
インストール方法は以下の 2 種類あります。
    
**コンピューター単位のインストール**\
多数のユーザーが使用する端末に新しい Outlook をインストールするには以下の手順を実行します。
    
1. [Setup.exe](https://go.microsoft.com/fwlink/?linkid=2207851) をダウンロードします。
2. PowerShell を右クリックし [管理者として実行する] を選択します。
3. Setup.exe ファイルがあるディレクトリに cd コマンドにて移動します。\
※ c:\temp フォルダーに Setup.exe を保存している場合の例を記載します。

``` PowerShell
cd C:\temp
```

4. 次のコマンドを実行します。

``` PowerShell
.\Setup.exe --provision true --quiet --start-
```

Setup.exe を使用したコンピューター単位のインストールは[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/deployment-new-outlook#download-and-install-new-outlook-for-a-single-computer)の公開情報も参照ください。
    
**ユーザー単位のインストール**\
管理者権限にて PowerShell を実行できない場合などはユーザーごとにインストールいただけます。
    
1. [Setup.exe](https://go.microsoft.com/fwlink/?linkid=2207851) をダウンロードします。
2. PowerShell を開きます。
3. Setup.exe ファイルがあるディレクトリに cd コマンドにて移動します。\
※ c:\temp フォルダーに Setup.exe を保存している場合の例を記載します。

``` PowerShell
cd C:\temp
```

4. 次のコマンドを実行します。

``` PowerShell    
.\Setup.exe --quiet --start-
```

Setup.exe を使用したユーザー単位のインストールは[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/deployment-new-outlook#setupexe-bootstrapper-for-per-user-install)の公開情報も参照ください。

#### g. オフライン インストーラーを使用したインストール
管理者はローカルの MSIX を使用して新しい Outlook のプロビジョニングが可能です。\
これにより、初期インストールに使用される帯域幅の量を最小限に抑えることができます。
    
端末に応じて以下の MSIX パッケージをダウンロードします。
    
[X64 Windows](https://go.microsoft.com/fwlink/?linkid=2195164)\
[X86 Windows](https://go.microsoft.com/fwlink/?linkid=2195278)\
[Arm64 Windows](https://go.microsoft.com/fwlink/?linkid=2195438)
    
パッケージ情報:\
パッケージ ID/名前: Microsoft.OutlookForWindows\
パッケージ ファミリ名: Microsoft.OutlookForWindows_8wekyb3d8bbwe
    
1. PowerShell を開きます。
2. MSIX ファイルがあるディレクトリに cd コマンドにて移動します。\
※ c:\temp フォルダーに MSIX を保存している場合の例を記載します。

``` PowerShell
cd C:\temp
```
    
3. 次のコマンドを実行します。\
※ 下記の手順では x64 インストーラーを実行する例を記載するため、ご利用のインストーラーに合わせて適宜変更ください。
    
**端末上のすべてのユーザーのユーザーに対しプロビジョニングする手順 (Add-AppxProvisionedPackage)**
``` PowerShell
Add-AppxProvisionedPackage -PackagePath '.\Microsoft.OutlookForWindows_x64.msix' -Online -SkipLicense
```

**端末上の 1 人のユーザーに対してプロビジョニングする手順 (Add-AppxPackage)**
``` PowerShell
Add-AppxPackage -Path '.\Microsoft.OutlookForWindows_x64.msix'
```

オフライン インストーラーを使用したインストールについては[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/deployment-new-outlook#download-and-install-new-outlook-using-an-offline-installer)の公開情報も参照ください。

#### h. Windows パッケージ マネージャー (winget) を使用したインストール
管理者権限を持たないユーザーによるインストール方法として、上記 Setup.exe のほかに Windows パッケージ マネージャー (winget) を使用した方法があります。

1. Windows + X キーを押して PowerShell (ターミナル) を選択します。
2. 次のコマンドを実行します。

``` PowerShell
winget install -i -e --id=9NRX63209R7B --source=msstore --accept-package-agreements
```

3.  [Y] を入力しEnter キーをクリックします。

![](image4.jpg)

winget を使用したインストールは[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/deployment-new-outlook#windows-package-manager-winget)の公開情報も参照ください。
    
#### i. Microsoft Intune を使用したインストール
Microsoft Intune を使用することにより、登録されたデバイスに Store アプリとして新しい Outlook を展開できます。\
この方法ではデバイスの管理者権限は必要ありません。\
詳細については [organizationで使用するアプリをデプロイする](https://learn.microsoft.com/mem/intune/fundamentals/manage-apps#deploy-apps-your-organization-uses)を参照ください。

---

その他、VDI 環境に新しい Outlook をインストールしたい場合には[こちら](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/virtualized-desktop-infrastructure)を参照ください。

---

新しい Outlook の展開の概要や前提条件については下記の公開情報も参照ください。

[新しい Outlook for Windows の展開の概要](https://learn.microsoft.com/microsoft-365-apps/outlook/get-started/deployment-new-outlook)

<div style="margin:1.25em;border-left:4px solid #1a7f37;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#1a7f37">
<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" style="margin-right:8px">
<path fill="#1a7f37" d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path>
</svg>
Tips
</div>
<div>
新しい Outlook の展開に関するトラブルシューティングについては下記の公開情報に記載されておりますので参照ください。

[新しい Outlook での展開に関する問題のトラブルシューティング](https://learn.microsoft.com/microsoft-365-apps/outlook/troubleshoot/troubleshoot-deployment-new-outlook?tabs=windows11)
</div>
</div>

**本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。**
