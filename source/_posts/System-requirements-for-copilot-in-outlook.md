---
title: Copilot in Outlook の機能について
date: 2025-04-23
lastupdate:
tags: Copilot
---

こんにちは。日本マイクロソフト Exchange ＆ Outlook サポート チームの山本です。

本記事では、お問い合わせいただくことも増えている Copilot in Outlook (Microsoft 365 Copilot のうち Outlook で利用できる機能) の利用可能なクライアント環境について説明します。

## Copilot in Outlook の機能とご利用いただける環境

Copilot in Outlook でご利用いただける機能は以下の公開情報にまとめられており、Copilot in Outlook の新機能がリリースされるたびに情報が更新されます。

Title: Outlook の Copilot についてよく寄せられる質問
URL: http://support.microsoft.com/office/outlook-07420c70-099e-4552-8522-7d426712917b
※上記の公開情報には、Copilot in Outlook の機能一覧の情報だけではなく、Copilot in Outlook はユーザーのプライマリ メールボックスでのみ使用できるなどの制約事項に関する情報もまとめられています。

本記事執筆時点では、以下の Copilot in Outlook の各機能をご利用いただけます。

1. 要約
2. Copilot による下書き
3. Copilot によるコーチング
4. Copilot とのチャット
5. Copilot のテーマ
6. チャットを使用して会議またはイベントをスケジュールする
7. 会議の準備
8. オフィスに入る時間を推奨する

各機能の動作や利用方法については前述の公開情報内にリンク先の情報が記載されていますので、そちらを参照ください。
下の表には、各機能を利用可能なクライアント環境の情報をまとめました。

<table>
  <tbody><tr>
    <th>機能/クライアント環境</th>
    <th>従来の Outlook for Windows</th>
    <th>新しい Outlook for Windows</th>
    <th>Outlook on the web</th>
    <th>Outlook for Mac <small>※1</small></th>
    <th>Outlook for Mobile (iOS/Android)</th>
  </tr>
  <tr>
    <td>要約</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
  </tr>
  <tr>
    <td>Copilot による下書き</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
  </tr>
  <tr>
    <td>Copilot によるコーチング</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
  </tr>
  <tr>
    <td>Copilot とのチャット <small>※2</small></td>
    <td>×</td>
    <td>〇</td>
    <td>〇</td>
    <td>×</td>
    <td>×</td>
  </tr>
  <tr>
    <td>Copilot のテーマ</td>
    <td>×</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
    <td>〇</td>
  </tr>
  <tr>
    <td>チャットを使用して会議またはイベントをスケジュールする</td>
    <td>×</td>
    <td>〇</td>
    <td>〇</td>
    <td>×</td>
    <td>×</td>
  </tr>
  <tr>
    <td>会議の準備 <small>※3</small></td>
    <td>×</td>
    <td>〇</td>
    <td>〇</td>
    <td>△</td>
    <td>△</td>
  </tr>
  <tr>
    <td>オフィスに入る時間を推奨する</td>
    <td>ー <small>※4</small></td>
    <td>ー <small>※4</small></td>
    <td>ー <small>※4</small></td>
    <td>ー <small>※4</small></td>
    <td>ー <small>※4</small></td>
  </tr>
</tbody></table>
<small>※1 Copilot in Outlook の各機能は、Outlook for Mac の最新バージョンでのみ利用が可能です。レガシーの Outlook for Mac ではサポートされていません。</small><br>
<small>※2 「Copilot とのチャット」 機能とは、リボンの Copilot ボタンをクリックした際に画面右側に表示されるチャット画面です。画面左の Copilot アイコンから表示される Microsoft 365 Copilot Chat とは異なります。(詳細について、後述します)</small><br>
<small>※3 「会議の準備」 機能は、最初に新しい Outlook for Windows と Outlook on the web でリリースされました。今後、Outlook for Mac と Outlook for Mobile にもリリースされる予定です。</small><br>
<small>※4 「オフィスに入る時間を推奨する」 機能については、厳密には Microsoft Places の機能となりますので、当記事では省略します。</small><br>

なお、従来の Outlook for Windows で要約、Copilot による下書きとコーチングの各機能が利用可能になったバージョンは以下の通りです。

<div style="border: 1px solid #000; padding: 10px;">
- 要約<br>
  最新チャネル: バージョン 2311 (Build 17029.20068) 以降<br>
  月次エンタープライズ チャネル: バージョン 2311 (Build 17029.20140) 以降<br><br>
- Copilot による下書き<br>
  最新チャネル: バージョン 2403 (ビルド 17425.20176) 以降<br>
  月次エンタープライズ チャネル: バージョン 2403 (ビルド 17425.20236) 以降<br><br>
- Copilot によるコーチング<br>
  最新チャネル: バージョン 2401 (ビルド 17231.20182) 以降<br>
  月次エンタープライズ チャネル: バージョン 2401 (ビルド 17231.20290) 以降
</div>

上記の通り、従来の Outlook for Windows で Copilot 機能を利用するためには、半期エンタープライズ チャネルではなく、最新チャネルまたは月次エンタープライズ チャネルのどちらかでご利用いただく必要があります。
従来の Outlook for Windows をご利用されており、もし対象のバージョンにアップデートされていない場合には、更新後に各機能をご利用ください。

## Outlook で Copilot in Outlook が利用できない (表示されない) 時に最初に確認すること

これまでのお問合せより、Outlook で Copilot in Outlook の Copilot ボタンが表示されない事象が発生する場合、以下の公開情報にある 1. ~ 5. の対処策を実施することで解消した事例が多くあります。
そのため同様の事象が発生した場合には、まずはこちらの公開情報より、各対処策のいずれかで事象が回避できるかご確認ください。

Title: Microsoft 365 アプリで欠落している Copilot ボタンを見つけて有効にする方法
URL: https://support.microsoft.com/office/microsoft-365-c8482b93-4b96-4bb8-8ec9-5148f4d42441

## 「Copilot とのチャット」 機能について

上表の 「Copilot とのチャット」 機能とは、具体的には Copilot in Outlook とのチャット機能を指しています。
Copilot in Outlook とのチャット機能は、新しい Outlook for Windows と Outlook on the web の 2 つのクライアントで画面右に表示される Copilot アイコンから利用可能です。
画面右に表示される Copilot アイコンからは、表示しているメールに関連した質問や、表示しているメールに関する会議、イベントをスケジュールすることなどができます。

![](Image1.png)

一方で、Outlook の画面左に表示される Microsoft 365 Copilot Chat の Copilot アプリ (以下、Copilot アプリ) は、ほとんどの Outlook クライアントや Teamなどで利用可能です。
Copilot アプリでのチャット機能では、ユーザー自身のメールボックス内のメールなどのアイテムや Teams のチャット、社内の Web サイトなどを参照することはできますが、特定のメールに関する会議やイベントをスケジュールするといった、Outlook 固有の処理はできません。

![](Image2.png)

Outlook で表示している特定のメールボックスに対する 「Copilot とのチャット」 機能を利用したい場合には画面右の Copilot アイコンを使用し、ユーザー自身のメールボックス内のメール全体を含む社内の様々なリソースに対する 「Copilot とのチャット」 機能を利用したい場合には Copilot アプリを使用するといったように、利用用途によって使い分けてご利用いただくことをお勧めします。

### Copilot アプリに関する補足

従来の Outlook for Windows で Copilot を利用するためには、最新チャネルまたは月次エンタープライズ チャネルのいずれかを使用する必要があります。
半期エンタープライズ チャネルの Outlook では Copilot 機能が提供されません。
半期エンタープライズ チャネルのバージョン 2402 以前では、ユーザーへの Microsoft 365 Copilot ライセンスの付与状況によらず、Copilot アプリをご利用いただけますが、これは一時的なものです。
Microsoft 365 Apps のバージョン 2408 以降では、Copilot アプリをインストールしても Outlook 上には表示されず、ご利用いただけません。

**本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。**