---
title: Microsoft 365 Copilot Chat のピン留めの制御方法
date: 2025-12-23
lastupdate:
tags: Copilot
---

こんにちは。日本マイクロソフト Exchange ＆ Outlook サポート チームの山本です。
[「Microsoft 365 Copilot Chat のピン留めの Outlook での表示イメージ」](https://jpmessaging.github.io/blog/Outlook-microsoft365-copilot-chat-pin/) で Microsoft 365 Copilot Chat (以下、Copilot Chat) のピン留めの対象として Outlook on the web を含む各 Outlook クライアントの画面左に表示されている Copilot アイコンを指していること、またモバイル版の Outlook アプリではオーバーレイ表示される Copilot アイコンを指していることに触れました。
本記事では **Outlook で Copilot Chat のピン留めを管理者が制御する方法**について説明します。

## 本記事で分かること
・Microsoft 365 Copilot ライセンス (以下、Copilot ライセンス) を未割り当てのユーザーの Copilot Chat のピン留めを制御したい場合は、[「1. Microsoft 365 管理センターの Copilot 設定」](#1-microsoft-365-管理センターの-copilot-設定) を使用すること
 
・Copilot ライセンスの有無に関わらず、ユーザーの Copilot Chat のピン留めを制御したい場合は、[「2. Microsoft 365 管理センターの統合アプリ」](#2-microsoft-365-管理センターの統合アプリ) を使用すること

## 1. Microsoft 365 管理センターの Copilot 設定
[Microsoft 365 Copilot Chat をピン留めする] の設定を使用することで、**Copilot ライセンスを未割り当てのユーザー**に対して Copilot Chat のピン留めを制御することができます。

### 1-1. 設定
Microsoft 365 管理センター内の [Copilot] - [設定] - [ユーザー アクセス] - [Microsoft 365 Copilot Chat をピン留めする] にて、以下いずれかを設定します。
 
・Microsoft 365 アプリに Copilot Chat をピン留めします (推奨) ※既定値
・Microsoft 365 アプリに Copilot Chat をピン留めしないでください

![](image1.jpg)

### 1-2. 設定時の動作
Copilot ライセンスを割り当てられたユーザーでは、どちらの設定を選択したとしても、既定で Copilot Chat はピン留めされます。
[Microsoft 365 Copilot Chat をピン留めする] から Copilot Chat のピン留めに関する各設定を選択した際の Copilot ライセンスを未割り当てのユーザーの動作について説明します。
 
・「Microsoft 365 アプリに Copilot Chat をピン留めします (推奨)」 を設定
Copilot ライセンスを未割り当てのユーザーでは、「Microsoft 365 Copilot Chat のピン留めの Outlook での表示イメージ」 で説明した  Entra アカウント ユーザーを対象に Copilot Chat がピン留めされます。

・「Microsoft 365 アプリに Copilot Chat をピン留めしないでください」 を設定
既定値から設定変更することで、クラウド ポリシーに "Policies for all users" が自動で作成されます。
クラウド ポリシーが作成された後は、Microsoft 365 管理センターの [Microsoft 365 Copilot Chat をピン留めする] の設定を変更するたびに、"Policies for all users" 内の [Microsoft 365 Copilot Chat のピン留め] の設定が "有効にする" または "無効" に変更され、テナント全体に設定が展開されます。
 
また 「Microsoft 365 アプリに Copilot Chat をピン留めしないでください」 に設定を変更後、Copilot ライセンスを未割り当てのユーザーのすべての Outlook から Copilot Chat のピン留めが解除されます。
※以下は従来の Outlook for Windows の画面イメージ

![](image2.jpg)

**<補足 1 - ユーザー操作による Copilot Chat の追加>**
[Microsoft 365 アプリに Copilot Chat をピン留めしないでください] に設定を変更後、Copilot ライセンスを未割り当てのユーザーのすべての Outlook から Copilot Chat のピン留めが解除されたとしても、従来の Outlook for Windows などの [アプリの追加] 画面からユーザー操作により "Copilot" を検索して追加することで、 Copilot Chat をインストールすることが可能です。

![](image3.jpg)

また、ユーザーがインストールした Copilot Chat をユーザー操作によりピン留めすることも可能です。
Copilot Chat のピン留めをユーザー操作により実施している場合は、Microsoft 365 管理センターの [Microsoft 365 Copilot Chat をピン留めする] の設定よりも優先され、すべての Outlook で Copilot Chat がピン留めされます。
そのため、もし Copilot ライセンスを未割り当てのユーザーが使用するすべての Outlook で Copilot Chat の使用をブロックしたい要件がある場合には、「2. Microsoft 365 管理センターの統合アプリ」 の方法で制御する必要があります。

**<補足 2 - クラウド ポリシーを利用したピン留めの制御>**
「1-2. 設定時の動作」 に記載の通り、Microsoft 365 管理センターの [Microsoft 365 Copilot Chat をピン留めする] の設定は "Policies for all users" というクラウド ポリシーが連動して動作していることを説明しました。
これに加えて、新規に作成したクラウド ポリシーから [Microsoft 365 Copilot Chat のピン留め] を設定したポリシーを作成する方法でも、上記と同様のピン留めの制御を実現できます。
テナント全体のユーザーを対象にして Copilot Chat のピン留めを制御したい場合には Microsoft 365 管理センターの [Microsoft 365 Copilot Chat をピン留めする] の設定を使用し、特定のユーザーまたはグループを対象に設定したい場合は個別に作成したクラウド ポリシーを使用するといったように使い分けするのが良いと思います。
 
Title: Microsoft 365 アプリに Microsoft 365 Copilot Chat をピン留めする
URL: https://learn.microsoft.com/copilot/microsoft-365/pin-copilot-chat-navbar
※ 「グループまたはユーザー レベルでピン留めする」 に記載

![](image4.jpg)

## 2. Microsoft 365 管理センターの統合アプリ
Microsoft 365 管理センターにある統合アプリを使用することで、**Copilot ライセンスの有無に関わらず**、Copilot アプリをブロックすることで Copilot Chat のピン留めを含め、ユーザーが Copilot Chat 機能を利用できないようになります。

### 1-1. 設定
Microsoft 365 管理センターの [設定] - [統合アプリ] - [利用可能なアプリ] にて、Copilot アプリの展開、またはブロックのいずれかを設定します。

![](image5.jpg)

### 1-2. 設定時の動作
Copilot アプリは既定で組織内のすべてのユーザーがインストールできるように設定されています。
Copilot アプリの展開とブロックの各設定を選択した際の動作について説明します。
統合アプリの設定が同じでも、Copilot ライセンスの有無により動作が異なるため、比較のために下表にそれぞれ整理しました。
 
**・「アプリの展開」 を設定**
Copilot アプリに対して [アプリの展開] を設定した際の動作です。

<table>
  <tbody><tr>
    <th></th>
    <th><small>Copilot アプリの設定</small></th>
    <th><small>ピン留め表示</small></th>
    <th><small>Copilot Chat の利用可否</small></th>
    <th><small>アプリ一覧からの<br>Copilot アプリ追加可否</small></th>
  </tr>
  <tr>
    <td><small>Copilot ライセンスを割り当てられたユーザー</small></td>
    <td><small>展開対象</small></td>
    <td><small>ピン留めされる</small></td>
    <td><small>利用可能</small></td>
    <td><small>ー ※1</small></td>
  </tr>
  <tr>
    <td></td>
    <td><small>展開対象外</small></td>
    <td><small>ピン留めされる</small></td>
    <td><small>利用可能</small></td>
    <td><small>ー ※1</small></td>
  </tr>
  <tr>
    <td><small>Copilot ライセンスを未割り当てのユーザー</small></td>
    <td><small>展開対象</small></td>
    <td><small>ピン留めされる</small></td>
    <td><small>利用可能</small></td>
    <td><small>ー ※1</small></td>
  </tr>
  <tr>
    <td></td>
    <td><small>展開対象外</small></td>
    <td><small>ピン留めされない</small></td>
    <td><small>利用不可</small></td>
    <td><small>追加不可</small></td>
  </tr>
</tbody></table>
<small>※1 アプリ一覧から Copilot アプリを検索すると既にインストール済みのため [開く] ボタンが表示される</small><br>

上表の通り、Copilot ライセンスを割り当てられたユーザーでは、展開対象か否かに関わらず、Copilot Chat がピン留めされます。
 
Copilot ライセンスが未割り当てのユーザーでは、展開対象のユーザーの場合、Copilot Chat がピン留めされます。
また Copilot アプリの展開対象外のユーザーでは、Copilot Chat はピン留めされず、ユーザー操作により [アプリの追加] 画面から Copilot アプリを検索して追加することもできません。
 
**・[ユーザー] タブで [組織のユーザーはインストールできません] を設定**
統合アプリの [Copilot] の [ユーザー] タブより [組織のユーザーはインストールできません] を設定した際の動作です。
なお、[ユーザー] タブでは他にも [組織のすべてのユーザーがインストールできます] や [特定のユーザー/グループがインストールできる] を選択することができますが、いずれも Copilot アプリを展開する対象を指定する設定となります。
そのため、Copilot アプリの展開対象であるか否かにより動作が変わり、それぞれ前述の表と同じ動作となります。

<table>
  <tbody><tr>
    <th></th>
    <th><small>Copilot アプリの設定</small></th>
    <th><small>ピン留め表示</small></th>
    <th><small>Copilot Chat の利用可否</small></th>
    <th><small>アプリ一覧からの<br>Copilot アプリ追加可否</small></th>
  </tr>
  <tr>
    <td><small>Copilot ライセンスを割り当てられたユーザー</small></td>
    <td><small>組織内のユーザーは<br>インストールできません</small></td>
    <td><small>ピン留めされる</small></td>
    <td><small>利用可能</small></td>
    <td><small>ー ※2</small></td>
  </tr>
  <tr>
    <td><small>Copilot ライセンスを未割り当てのユーザー</small></td>
    <td><small>組織内のユーザーは<br>インストールできません</small></td>
    <td><small>ピン留めされない</small></td>
    <td><small>利用不可</small></td>
    <td><small>追加不可</small></td>
  </tr>
</tbody></table>
<small>※2 アプリ一覧から Copilot アプリを検索すると既にインストール済みのため [開く] ボタンが表示される</small><br>

上表の通り、Copilot ライセンスを割り当てられたユーザーでは、Copilot Chat はピン留めされており、また Copilot Chat が利用可能です。         

Copilot ライセンスが未割り当てのユーザーの場合、Copilot Chat はピン留めされず、ユーザー操作により [アプリの追加] 画面から Copilot アプリを検索して追加することもできません。
 
**・[アプリをブロックする] を設定**
Copilot アプリに対して [アプリをブロックする] を設定した際の動作です。

<table>
  <tbody><tr>
    <th></th>
    <th><small>Copilot アプリの設定</small></th>
    <th><small>ピン留め表示</small></th>
    <th><small>Copilot Chat の利用可否</small></th>
    <th><small>アプリ一覧からの<br>Copilot アプリ追加可否</small></th>
  </tr>
  <tr>
    <td><small>Copilot ライセンスを割り当てられたユーザー</small></td>
    <td><small>ブロックする</small></td>
    <td><small>ピン留めされない</small></td>
    <td><small>利用不可</small></td>
    <td><small>追加不可 ※3</small></td>
  </tr>
  <tr>
    <td><small>Copilot ライセンスを未割り当てのユーザー</small></td>
    <td><small>ブロックする</small></td>
    <td><small>ピン留めされない</small></td>
    <td><small>利用不可</small></td>
    <td><small>追加不可</small></td>
  </tr>
</tbody></table>
<small>※3 アプリ一覧から Copilot アプリを検索すると Copilot アプリが検索結果に表示されない</small><br>

上表のとおり、Copilot ライセンスを割り当てられたユーザーと Copilot ライセンスを未割り当てのユーザーのいずれにおいても、Copilot Chat の利用がブロックされ、ユーザー操作によるインストールなどもできません。

**<補足 3 - 各 Outlook における Copilot アイコンの表示差異>**
Copilot アプリに対して [アプリをブロックする] を設定した際、Copilot ライセンスを割り当てられたユーザーでは、新しい Outlook for Windows と Outlook on the web の画面左から Copilot アイコンが非表示となります。
また画面右の Copilot アイコンは表示されたままとなり、かつ "チャット" の表示が消え、Copilot Chat の利用ができなくなります。
※以下は新しい Outlook for Windows の画面イメージ

![](image6.jpg)

一方で、同じユーザーの従来の Outlook for Windows ではメール画面において画面左と画面右の両方とも Copilot アイコンが表示されない動作となります。

![](image7.jpg)

上記のように各 Outlook では、Copilot アイコンの表示動作が必ずしも統一されているわけではありません。
これは各 Outlook がそれぞれ独立したアプリケーションとなっていることや、Copilot ライセンスの有無、Copilot のピン留めに影響を及ぼす設定項目が複数存在するなど、多岐の要因により Copilot アイコンの表示に差異が生じる場合がありますので、その点をご理解いただけると幸いです。

### 最後に

Microsoft 365 管理センターの設定で Copilot Chat をピン留めして利用している環境に対しては、今後も引き続き新しい Copilot 機能が展開される予定です。
Copilot ライセンスを保持していないテナントにおいても、ぜひ Microsoft 365 管理センターの [Microsoft 365 Copilot Chat をピン留めする] からピン留めを有効化した状態で Copilot Chat をご活用いただければ幸いです。

**本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。**