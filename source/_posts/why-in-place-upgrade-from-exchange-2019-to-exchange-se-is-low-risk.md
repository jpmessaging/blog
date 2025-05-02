---
title: Exchange 2019 から Exchange SE への "インプレース アップグレード" が低リスクである理由
date: 2025-05-02 9:00:00
lastupdate: 
tags: Exchange
---

※ この記事は、[Why “in-place upgrade” from Exchange 2019 to Exchange SE is low risk](https://techcommunity.microsoft.com/blog/exchange/why-%E2%80%9Cin-place-upgrade%E2%80%9D-from-exchange-2019-to-exchange-se-is-low-risk/4410173) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Server 2019 から Exchange Server Subscription Edition (SE) への移行に関して、非常に多くのお客様から寄せられる質問について解説する記事を作成しました。

[現行バージョンから Exchange Server SE へのアップグレード](/blog/Upgrading%20your%20organization%20from%20current%20versions%20to%20Exchange%20Server%20SE) で述べたように、Exchange SE への移行方法は次の 2 つがあります。

- **従来型 (レガシー) 移行 :** 新しい Exchange サーバーを組織に追加し、メールボックスを移行する方法です。この方法は、Exchange 2016 から Exchange SE への移行では<u>必須</u>ですが、Exchange 2019 から Exchange SE への移行では<u>任意</u>です。
- **インプレース アップグレード :** Exchange 2019 CU14/CU15 上に Exchange SE リリース (RTM) をインストールし、Exchange 2019 サーバーを Exchange SE サーバーにアップグレードする方法です。この方法は新しいもので、一部のお客様には「信じられないほど簡単でリスクがあるのでは」と見られることがあります。

この第二のアプローチを "低リスク" と見なす理由を説明します。

### 新しい Exchange バージョンの RTM が*以前は*どのように作成されていたか

過去に新しいバージョンの Exchange をリリースする際には、コード ベースで大幅な変更を加えていました。以下は簡略化した説明ですが、一般的な流れを示しています。通常、次のような手順を踏んでいました。

1. 新バージョンのリリース約 *2 年*前に、現在市場に出ている製品のバージョンを新製品の "ベース コード" として選定します。
2. 多数の機能を追加および削除します。
3. インストール要件を変更します。
4. 最低ハードウェア要件を設定します。
5. 新しいプロダクト キーを作成し、必須とします。
6. ビルド システムで "コードのメジャー バージョン" を変更します。(例 : Exchange 2013 の "15.00" から Exchange 2016 の "15.1"、Exchange 2019 の "15.2" への変更。この詳細は[こちらのページ](https://learn.microsoft.com/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019)をご覧ください)
7. リリース日が近づいた段階で、過去 2 年間に現在市場に出ている製品向けにリリースされた重要な機能やセキュリティ更新、ホットフィックスを移植します。(ステップ 1 がかなり前に行われているため)
8. 製品名を変更し、EULA (エンド ユーザー ライセンス契約) を更新します。(Exchange イメージ内のファイルです)

これらの変更の多くが重要であったため、実質的にお客様は次のような対応を求められていました。

- 従来型 (サイドバイサイド) 移行を実施する。
- 追加または削除された機能が業務プロセスやサード パーティ アプリケーションに影響を与えないことを確認するため、組織内で大規模なテストを行う。
- 製品の大幅な変更に伴い、エンド ユーザー向けのトレーニングを開発する。
- RTM ビルドが "高リスク" と見なされるため、CU1 のリリースを待つ。(注 : CU1 を待つことが必須であったわけではありませんが、多くのお客様が少なくとも CU1 がリリースされるまで移行を待つ傾向がありました)

### Exchange SE RTM をどのように作成するか

従来の新しいバージョンの Exchange RTM 作成時の長いリストとは異なり、Exchange SE RTM は次のように作成されています。

1. Exchange 2019 CU15 (最新の CU) を "ベース コード" として使用します。
2. CU15 以降に公開されたセキュリティ更新やホットフィックスを追加します。
3. 製品名を変更し、EULA (エンド ユーザー ライセンス契約) を更新します (Exchange イメージ内のファイル)。

上記の最初の 2 点は、*すべての Exchange CU のリリース時*に行われる通常のプロセスです。Exchange CU は常に "累積的" であり、"前回の CU" 以降にリリースされたすべての修正を含んでいます (詳細は[こちら](https://learn.microsoft.com/exchange/plan-and-deploy/post-installation-tasks/security-best-practices/exchange-server-update-faq?view=exchserver-2019)をご覧ください)。したがって、Exchange SE RTM における唯一の*新しい*変更点は「3. 製品名の変更と EULA の更新」です。

Exchange 2019 CU15 と比較して、Exchange SE RTM では以下の変更は**行われません**。

- コードのメジャー バージョンの変更
- 機能の追加や削除
- CU15 で既にリリースされている更新以外のバグ修正
- 新しいプロダクト キーの追加や必須化
- インストール要件やハードウェア要件の変更

これらの理由から、Exchange 2019 CU14/CU15 サーバーに Exchange SE RTM をインストールすることは、実質的には Exchange 2019 の "CU16" をインストールするのと同じですが、この CU の名前を "Exchange SE RTM" に変更しただけです。

### なぜアップグレードする必要があるのか？その目的とは？

このアプローチには、組織の時間的なプレッシャーを軽減するいくつかの方法があると考えています。

- Exchange 2019 CU15 以降に大きな変更がないため、広範なテストや検証を行う必要がありません。
- Exchange ~~2019 CU16~~ SE RTM ビルドにアップグレードすることで、Exchange 2019 の固定ライフサイクル ポリシー ([2025 年 10 月 14 日にサポート終了](https://learn.microsoft.com/lifecycle/products/exchange-server-2019)) から Exchange SE のモダン ライフサイクル ポリシーに切り替わり、2025 年 10 月 14 日以降も製品がサポートされます。
- Exchange SE 用にハードウェアをアップグレードしたい場合でも、まず旧ハードウェア上で Exchange SE にインプレース アップグレードを行い、新しいサポート ライフサイクル パスに移行した後で、サーバー ハードウェアをアップグレードする時間を確保できます。
- Exchange SE の機能追加は CU1 から開始されますが、組織は「低リスク」でサポートされた RTM リリースを利用できるため、CU1 のテストに十分な時間を確保できます。

### 終わりに

このアプローチにより、Exchange SE RTM は従来とは異なる方法で提供されることを認識していますが、その違いについて十分に説明できていなかったかもしれません。エンジニアリング作業の観点から見ると、Exchange SE RTM は機能追加のない "Exchange 2019 CU16" のリブランド版と言えます。すでに Exchange 2019 向けに 15 回の CU をリリースしており、この移行が非常に低リスクであると高い確信を持っています。

まとめ :
![](SERTM.jpg)
