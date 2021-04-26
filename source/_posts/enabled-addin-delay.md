---
title: アドインを有効にする方法 <第 1 回> アドインの動作に時間がかかる場合
date: 2021-4-21
tags:
- Outlook
---

Outlook のアドインが意図せず無効化される場合、主に以下の 2 つが原因として挙げられます。
<br><br>
a. アドインの動作に時間がかかった<br>
b. アドインがクラッシュした
<br><br>
この記事では、a の場合の対処方法について説明します。
b については[こちら](https://jpmessaging.github.io/blog/enabled-addin-crash/)の記事を参照してください。
<br><br>

## 概要
Outlook には、アドインのパフォーマンスを監視し、起動や終了、その他動作で時間のかかるアドインを自動的に無効化する機能があります。<br>
アドインのパフォーマンス低下によって、Outlook の他の機能の利用において遅延が生じるのを防ぐことがこの機能の目的です。<br>
<br>
アドインを無効にするかどうかはいくつかの基準があり、それぞれの基準で読み込みの時間を記録し、連続した 5 回の読み込み時間の中央値が算出されます。(起動の頻度は除く)<br>
その中央値より 1000 ミリ秒 (1 秒) を超えると、Outlook はそのアドインを無効にします。<br>
基準やしきい値については、以下の公開情報を参照してください。<br>
<br>
https://docs.microsoft.com/ja-jp/previous-versions/office/jj228679(v=office.15)#%E3%82%A2%E3%83%89%E3%82%A4%E3%83%B3%E3%82%92%E6%9C%89%E5%8A%B9%E3%81%AB%E4%BF%9D%E3%81%A4%E3%81%9F%E3%82%81%E3%81%AE%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E5%9F%BA%E6%BA%96
<br><br>

## アドイン無効化機能の対象から除外する方法 (1) 手動設定
アドインが無効にされた場合には、通知バーに「アドインが自動的に無効化された」という通知が表示されます。

![](Alert_Dialog.png) <br>
<br>
通知バーにある [無効になったアドインの表示] をクリックすると、[無効になったアドイン] ダイアログが表示されます。
このダイアログは、[ファイル] タブの [COM アドインの管理] からも確認することができます。(無効になったアドインがない場合には表示されません。)<br>
<br>
![](Addin_Dialog.png) <br>
<br>
このダイアログで、以下のいずれかを選択することで、一時的にアドイン無効化機能の対象から除外することができます。<br>
<br>
・次の 7 日間このアドインの監視を行わない<br>
・次の 30 日間このアドインの監視を行わない
<br><br>

## アドイン無効化機能の対象から除外する方法 (2) レジストリ/グループ ポリシー
上記手動での設定は最大 30 日間と限定されますが、以下のレジストリを作成することで、特定のアドインを常に監視対象から除外とすることができます。
<br><br>

値の場所: HKEY_CURRENT_USER\Software\Policies\Microsoft\Office\<バージョン>\Outlook\Resiliency\AddinList<br>
値の名前: <アドインのProgID><br>
値の種類: REG_SZ<br>
値のデータ: 1 (常に有効)<br>
<br>
※1 <バージョン> には以下の数字が入ります。<br>
Outlook 2013 : 15.0<br>
Microsoft 365 Apps / Outlook 2019 / Outlook 2016 : 16.0<br>
<br>
※2 アドインの ProgID とは、アドインの識別名称です。以下のレジストリに登録されているものと同一です。<br>
<br>
<ins>HKCU 配下に登録したアドイン (アドインのインストール時に「このユーザーのみ」を選択した場合)</ins><br>
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Office\Outlook\Addins<br>
<br>
<ins>HKLM 配下に登録したアドイン (アドインのインストール時に「すべてのユーザー」を選択した場合)</ins><br>
**Windows 32 bit + Office 32 bit / Windows 64 bit + Office 64 bit (MSI インストール):**<br>
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\Outlook\Addins
 <br>
**Windows 64 bit + Office 32 bit (MSI インストール):**<br>
HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Office\Outlook
 <br>
**Windows 32 bit + Office 32 bit / Windows 64 bit + Office 64 bit (クイック実行):**
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\Registry\Machine\Software\Microsoft\Office\Outlook\Addins
 <br>
**Windows 64 bit + Office 32 bit (クイック実行):**
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\REGISTRY\MACHINE\Software\Wow6432Node\Microsoft\Office\Outlook\Addins<br>
<br>

この AddinList レジストリはグループ ポリシーでも設定することが可能です。
Office 管理用テンプレートの [Microsoft Outlook 2016 (または Microsoft Outlook 2013)]-[その他]-[管理対象アドインの一覧] を有効にし、以下の値を設定します。<br>
<br>
値の名前: <アドインの ProgID><br>
値: 1

Office の管理用テンプレートについては、以下の記事もご参照ください。

https://social.msdn.microsoft.com/Forums/ja-JP/9cfe7f7a-ca37-4a9b-98d6-e0b3d4362598/office-gpo-outlook-?forum=exchangeteamjp
<br><br>
<br>
**本情報の内容 (添付文書、リンク先などを含む) は作成日時点でのものであり、予告なく変更される場合があります。**
