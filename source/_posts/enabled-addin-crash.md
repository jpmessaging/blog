---
title: アドインを有効にする方法 <第 2 回> アドインがクラッシュした場合
date: 2021-4-22
tags:
- Outlook
---

Outlook のアドインが意図せず無効化される場合、主に以下の 2 つが原因として挙げられます。  

a. アドインの動作に時間がかかった  
b. アドインがクラッシュした  

a については、[こちら](https://jpmessaging.github.io/blog/enabled-addin-delay/)の記事を参照してください。  
この記事では、b の場合の対処方法について説明します。  


## 手動で有効化する方法  
無効になったアドインは、以下の 2 つに分類されます。  

・アクティブでないアプリケーション アドイン  
・無効なアプリケーション アドイン  

それぞれ、以下の手順にて有効にすることができます。  

<ins>アクティブでないアプリケーション アドインを有効にする</ins>  
1. Outlook を起動し、[ファイル] タブをクリックします。  
2. 左ペインのメニューから [オプション] をクリックします。  
3. カテゴリ ペインで [アドイン] をクリックします。  
4. 詳細ペインの [アクティブでないアプリケーション アドイン] ボックスの一覧にアドインが表示されていることを確認します。  
5. [管理] ボックスの [COM アドイン] をクリックし、[設定] をクリックします。  
6. [COM アドイン] ダイアログ ボックスで、無効にされたアドインの横のチェック ボックスをオンにします。  
7. [OK] をクリックします。  

<ins>無効なアプリケーション アドインを有効にする</ins>  
1. Outlook を起動し、[ファイル] タブをクリックします。  
2. 左ペインのメニューから [オプション] をクリックします。  
3. カテゴリ ペインで [アドイン] をクリックします。  
4. 詳細ペインの [無効なアプリケーション アドイン] ボックスの一覧にアドインが表示されていることを確認します。  
5. [管理] ボックスの [使用できないアイテム] をクリックし、[設定] をクリックします。  
6. アドインを選択し、[有効にする] をクリックします。  
7. [閉じる] をクリックします。  


## レジストリを変更して有効化する方法  
レジストリの値を変更してアドインを有効にすることができます。  
対象のレジストリの場所は複数あります。(1) と (2) をそれぞれ確認してください。  

**(1) LoadBehavior レジストリの値を 3 にする**  
アドインの有効/無効は、以下の LoadBehavior レジストリに紐づいています。  
LoadBehavior の値を 3 にすることで、アドインを Outlook のオプションからチェック オンにした際と同じ状態にすることができます。  

値の場所: HKEY_CURRENT_USER\SOFTWARE\Microsoft\Office\Outlook\Addins\<アドインの ProgID> (※1)  
値の名前: LoadBehavior  
値の種類: REG_DWORD  
値のデータ: 3 (有効)  

※1 LoadBehavior のレジストリの値の場所  
LoadBehavior のレジストリの値の場所は、アドインのインストール範囲と OS・Office の構成によって異なります。  

<ins>HKCU 配下に登録したアドイン (アドインのインストール時に「このユーザーのみ」を選択した場合)</ins>  
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Office\Outlook\Addins\<アドインの ProgID>  

<ins>HKLM 配下に登録したアドイン (アドインのインストール時に「すべてのユーザー」を選択した場合)</ins>  
**Windows 32 bit + Office 32 bit / Windows 64 bit + Office 64 bit (MSI インストール):**  
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\Outlook\Addins\<アドインの ProgID>  

**Windows 64 bit + Office 32 bit (MSI インストール):**  
HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Office\Outlook\<アドインの ProgID>  

**Windows 32 bit + Office 32 bit / Windows 64 bit + Office 64 bit (クイック実行):**  
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\Registry\Machine\Software\Microsoft\Office\Outlook\Addins\<アドインの ProgID>  

**Windows 64 bit + Office 32 bit (クイック実行):**  
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\REGISTRY\MACHINE\Software\Wow6432Node\Microsoft\Office\Outlook\Addins\<アドインの ProgID>  

HKLM 配下に登録したアドインの場合、HKLM 配下に加えて HKCU 配下にも LoadBehavior レジストリが作成される場合があります。  
HKCU と HKLM の両方に LoadBehavior が存在する場合、HKCU の情報で HKLM が上書きされる動作となります。  
そのため HKLM に LoadBehavior レジストリがある場合には、HKCU にも存在するかを確認してください。  

**(2) CrashingAddinList と DisabledItems レジストリを削除する**  
「無効なアプリケーション アドイン」となっている場合、以下の CrashingAddinList や DisabledItems レジストリが作成されている可能性があります。  

値の場所: HKEY_CURRENT_USER\Software\Microsoft\Office\\<バージョン>\Outlook\Resiliency\CrashingAddinList  
値の名前 : <ランダムな英数字>  
値の種類 : REG_BINARY  
値のデータ : <アドインの DLLのパスを表すバイナリ値>  

値の場所: HKEY_CURRENT_USER\Software\Microsoft\Office\\<バージョン>\Outlook\Resiliency\DisabledItems  
値の名前 : <ランダムな英数字>  
値の種類 : REG_BINARY  
値のデータ : <アドインの DLLのパスを表すバイナリ値>  

※ <バージョン> には以下の数字が入ります  
Outlook 2013 : 15.0  
Microsoft 365 Apps / Outlook 2019 / Outlook 2016 : 16.0  

CrashingAddinList や DisabledItems キー配下に値が作成されている場合には、CrashingAddinList や DisabledItems キーごと削除します。  
これらのレジストリの値の名前はランダムで、値のデータはバイナリ値であるため削除対象の絞り込みをユーザーが行うことが難しいため、すべて削除することをおすすめしています。  

上述の (1)(2) をグループ ポリシーでのレジストリ変更・スクリプト実行で行うことにより、できる限りアドインが無効化されることを防ぐことができます。  
しかしながらアドイン内部や Office の構成に問題がある場合には、このようなレジストリ操作を行ってもアドインは無効化されます。  


## 繰り返しアドインが無効になる場合  
Outlook 起動直後に LoadBehavior レジストリが 3 以外になり、3 に変更してもそれが繰り返される場合には、Office の構成に原因がある可能性があります。  
Office を修復して解消するか確認してください。  

- [Office アプリケーションを修復する](https://support.microsoft.com/ja-jp/office/office-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BF%AE%E5%BE%A9%E3%81%99%E3%82%8B-7821d4b6-7c1d-4205-aa0e-a6b40c5bb88b)  

修復実施後も解消しない場合には、アドイン開発元への確認をお願いします。  


**本情報の内容 (添付文書、リンク先などを含む) は作成日時点でのものであり、予告なく変更される場合があります。**  
