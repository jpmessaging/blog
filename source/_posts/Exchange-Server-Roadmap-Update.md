---
title: Exchange Server ロードマップの更新
date: 2024-07-10
lastupdate: 
tags: Exchagne
categories: Exchange
---


※ この記事は、[Exchange Server Roadmap Update](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742) をもとに日本のお客様向けに抄訳、再編集したものです。最新の情報は元の Blog を参照してください。

こんにちは。日本マイクロソフト Exchange & Outlook サポート チームです。

2024 年 5 月 7 日に公開された [Blog](https://techcommunity.microsoft.com/t5/exchange-team-blog/exchange-server-roadmap-update/ba-p/4132742) 記事では今後のオンプレミス Exchange Server を運用する上での重要な情報が公開されており、主に以下の点についてアナウンスがありました。  

- Exchange Server 2019 に対して最後の CU となる CU15 をリリースします。公開時期は 2024 年後期を予定しています。  
- Exchange Server Subscription Edition (Exchange Server SE) を 2025 年 7-9 月頃に公開を予定しています。
- Exchange Server SE の RTM に続く、最初の CU1 を 2025 年の終わり頃に公開予定です。  

# サポート チームからのお願い

多くのお客様は Exchange Server 2016 や Exchange Server 2019 をご利用いただいておりますが、どちらのバージョンも 2025 年 10 月 14 日に [サポート終了](https://learn.microsoft.com/ja-jp/lifecycle/products/exchange-server-2019)となります。  
サポート終了時期間近に上記の次期バージョンである Exchange Server SE RTM がリリースされるため、Exchange Server 2016/2019 から Exchange Server SE への移行期間が非常に短く、計画的に移行を行う必要があります。  
また、その後にリリース予定である Exchange Server SE CU1 以降では下位バージョンとの共存環境をサポートしておらず、その時点ですべてのサーバーが Exchange Server SE RTM 以上である必要があります。

スムーズに Exchange Server SE RTM へアップグレードするために、まずはすべてのサーバーを Exchange Server 2019 CU14 (現時点で最新) へ移行し、準備いただくことを強く推奨いたします。  

- **Exchange Server 2016 をご利用の場合:** すぐに Exchange Server 2019 CU14 へ移行し、CU15 のリリース後に CU15 を適用し、Exchange Server SE へのインプレース アップグレードをします。

- **Exchange Server 2019 をご利用の場合:** 現時点で最新の CU14 を適用した上で、CU15 のリリース後に CU15 を適用し、Exchange Server SE へのインプレース アップグレードをします。

# Exchange Server 2019 CU15 について

Exchange Server 2019 CU15 では、Exchange Server SE の RTM リリースをサポートするための新機能と変更が導入されます。

## Exchange Server 2019 CU15 の新機能

Exchange Server 2019 CU15 にはいくつかの新しい機能が追加されています。  

- **TLS1.3 のサポート:** 従来の暗号化アルゴリズム方式よりもセキュリティの観点で強く、改善されたバージョンがサポートされるようになります。

- **Exchange 管理センター (EAC) の証明書の管理機能:** EAC 上で証明書の管理ができずコマンドで実行する必要がございましたが、GUI 上で管理することができます。例えば証明書要求の作成、証明書要求の完了、 PFX ファイルへのエクスポート、および PFX ファイルからのインポートが行えるようになります。

## Exchange Server SE への対応に向けた更新

上記の他にも Exchange Server 2019 CU15 では、今後リリースされる Exchange Server SE に対応するためいくつかの更新がされます。  

- **[Exchange Server 2013](https://learn.microsoft.com/ja-jp/lifecycle/products/exchange-server-2013) との共存がサポートされなくなります:** Exchange Server 2013 は昨年サポートが終了しており、Exchange Server SE と共存することができません。これに先駆けて Exchange Server 2019 CU15 では Exchange Server 2013 との共存がサポートされなくなります。万が一、Exchange Server 2013 が組織内に存在する場合は Exchange Server 2019 CU15 や Exchange Server SE をインストールする前の段階で Exchange Server 2013 をアンインストールして撤去いただく必要があります。

- **新しいプロダクトキーがサポートされます:** ハイブリッド構成ウィザードを介して無料のプロダクトキーを利用可能なハイブリッド展開用のサーバーを除き、Exchange Server SE を利用する上ではプロダクトキーが必要となるため、それに先駆けて Exchange Server 2019 CU15 でサポートできるよう更新されます。Exchange Server SE がリリースされたタイミングで新しいプロダクトキーが公開されます。なお、Hybrid 用の Exchange Server では今後もハイブリッド構成ウィザード経由で無償のライセンスが提供されます。  

- **Windows Server 2025 がサポートされます:** 現在、Exchange Server 2019 は Windows Server 2019/2022 にインストールすることが可能ですが、Exchange Server 2019 CU15 では Windows Server 2025 がサポートされるようになります。Windows Server 2025 は 2024 後半ごろに GA 予定です。  

その他、CU15 で予定されている変更は次の通りです。

- Visual Studio 2022 に付属するバージョンへ Visual C++ 再頒布可能パッケージが更新されます。

- UCMA 6.0 と Outlook on the web のインスタント メッセージング機能がサポートされなくなります。

- Windows MSMQ コンポーネントは、セットアップによってインストールされなくなります。

- [Exchange Server AMSI 統合](https://techcommunity.microsoft.com/t5/exchange-team-blog/more-about-amsi-integration-with-exchange-server/ba-p/2572371)の機能が強化されます。

- [Exchange Server CBC 暗号化](https://support.microsoft.com/ja-jp/topic/exchange-server-august-2023-su-%E3%81%A7-aes256-cbc-%E6%9A%97%E5%8F%B7%E5%8C%96%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E6%9C%89%E5%8A%B9%E5%8C%96%E3%81%99%E3%82%8B-add63652-ee17-4428-8928-ddc45339f99e) の対象として PDF ファイルの追加されます。

# Exchange Server Subscription Edition について

Exchange Server Subscription Edition の概要について要点をご紹介します。

- **ダウンロード方法について:** Exchange Server SE は Microsoft 365 管理センター (以前は [ボリューム ライセンス サービス センター](https://learn.microsoft.com/ja-jp/licensing/vlsc-faqs-home-page)) にて 2025 年 7-9 月頃よりダウンロードすることが可能となる見込みです。  

- **ライセンスについて:** ライセンシング モデルは [SharePoint Server Subscription Edition](https://www.microsoft.com/licensing/terms/productoffering/SharePointServer/EAEAS) と同様のモデルとなります。  サーバー ライセンスとユーザー ライセンスにはサブスクリプション ライセンスまたはアクティブなソフトウェア アシュアランス付きのライセンスが必要です。なお、Hybrid 用の Exchange Server では、今後も[ハイブリッド構成ウィザード](https://learn.microsoft.com/ja-jp/exchange/hybrid-configuration-wizard)経由で無償のライセンスが提供されます。  

- **ハードウェア要件について:** [ハードウェア要件](https://learn.microsoft.com/ja-jp/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#hardware-requirements-for-exchange-2019) や、サポート対象[オペレーティング システム](https://learn.microsoft.com/ja-jp/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#supported-operating-systems-for-exchange-2019)は Exchange Server 2019 CU15 と同じであり、今後 Windows Server 2025 もサポートされる予定です。  

- **Active Directory に対する変更について:** Exchange Server 2019 から Exchange Server SE の RTM へアップグレードする場合は、特に Active Directory へ変更はなく、Active Directory スキーマへの更新もありません。Windows Server 2012 R2 のフォレスト機能レベルもサポートします。  

- **Exchange Server SE のサポータビリティについて:** Exchange Server SE は [モダン ライフサイクル ポリシー](https://learn.microsoft.com/ja-jp/lifecycle/policies/modern)に従いサポートされます。  

## Exchange Server SE リリースの詳細情報:  

Exchange Server SE をより早く採用いただくため、Exchange Server SE では次の変更を除き Exchange Server 2019 と同じアーキテクチャとなっております。

- GUI で Setup を実行してインストールする際に表示される使用許諾契約書が更新されます。

- 名前が Microsoft Exchange Server 2019 から Microsoft Exchange Server Subscription Edition に変更されます。

- ビルドとバージョン番号が更新されます。

以下の点についてもご注意ください。

- Exchange Server 2019 CU15 がリリースされる前に Security Update (SU) がリリースされた場合は、CU15 にはそれらの SU も含まれた状態でリリースされます。

- Exchange Server 2019 CU15 以降に SU がリリースされた場合、Exchange Server SE には Exhange Server 2019 CU15 に加え、最新の SU が含まれた状態でリリースされます。  

## 下位バージョンから Exchange Server SE へのアップグレード方法について

以下 2 つのアップグレード方法がサポートされます。

- **インプレース アップグレード:** 最速で簡単に Exchange Server 2019 を Exchange Server SE にアップグレードする方法です。CU 適用作業と同様の操作でアップグレードが可能です。Exchange Server SE にアップグレード後、次期 CU のリリース (年 2 回) に合わせて更新されます。

- **従来のアップグレード :** 従来の方法と同じように、新規 Windows Server OS をインストールしたサーバーを用意し、Exchange Server SE をインストールすることも可能です。Exchange Server のハードウェアをリプレースする場合や、新しい Windows Server OS に更新したいなどのシナリオのために、こうしたアップグレード方法もサポートされます。  

既存環境で Exchange Server 2016 のみをご利用いただいている場合で今後もオンプレミス Exchange Server をご利用予定の場合は、Exchange Server 2016 がサポート終了間近となるため少なくとも 1 回は従来のアップグレードをする必要があります。  
最終的に Exchange Server SE へのアップグレードをするため、速やかに Exchange Server 2016 を Exchange Server 2019 へ移行することを推奨します。  
その後、Exchange Server SE へのインプレース アップグレードが簡単に行えます。  


## Exchange 2019 CU15 および Exchange Server SE の更新パス

多くのお客様は既存の組織に Exchange Server が存在していますが、既存組織との共存について以下にまとめました。  

Exchange Server 2019 CU15 や Exchange Server SE RTM との共存できるのは以下のバージョンとなります。  
なお、今後 Exchange Server SE CU1 以降がリリースされる際に、下位バージョンとの共存がサポートされなくなりますので、できる限り早めに Exchange Server SE へのアップグレードを実施いただくことをご検討ください。  

| 今後リリース予定の Exchange Server | 既存環境の Exchange Server                                      |
| -------------------------------- | -------------------------------------------------------------   |
| Exchange Server 2019 CU15        | Exchange Server 2016 CU23 と Exchange Server 2019 CU13/CU14 のみ |
| Exchange Server SE               | Exchange Server 2016 CU23 と Exchange Server 2019 CU14/CU15 のみ |

既存環境から Exchange Server 2019 CU15 や Exchange Server SE へアップグレードする場合は以下を参照ください。  

| 既存の Exchange Server          | Exchange Server 2019 CU15                                                                                                                                 | Exchange Server SE RTM                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exchange Server 2013         | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>新規または既存の Exchange Server 2019 に対して CU14 を適用した上で、Exchange Server 2013 を撤去します。<br>CU15 の公開後、適用します。    | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>新規または既存の Exchange Server 2019 に対して CU14  を適用した上で、Exchange Server 2013 を撤去します。<br>その後、Exchange Server 2019 CU15 を適用し、更に Exchange Server SE にインプレース アップグレードします。 |
| Exchange Server 2016 CU23    | 新規または既存の Exchange Server 2019 に対して CU14 を適用します。<br>CU15 の公開後、適用します。                                                                                       | 新規または既存の Exchange Server 2019 に対して CU14 を適用し、CU15 が公開されたら適用します。<br>Exchange Server SE にインプレース アップグレードします。                                                                                                           |
| Exchange Server 2016 CU22 以前 | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>Exchange 2016 に対して CU23 を適用した上で、新規または既存の Exchange Server 2019 に対して CU14 を適用します。<br>CU15 の公開後、適用します。 | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>Exchange 2016 に対して CU23 を適用した上で、新規または既存の Exchange Server 2019 に対して CU14 を適用します。<br>CU15 の公開後、適用します。<br>Exchange Server SE にインプレース アップグレードします。                 |
| Exchange Server 2019 CU14 以降 | CU15 の公開後、適用します。                                                                                                                                          | Exchange Server SE にインプレース アップグレードします。                                                                                                                                                          |
| Exchange Server 2019 CU13    | まずは CU14 を適用します。<br>CU15 の公開後、適用します。                                                                                                                      | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>まずは CU14/CU15 を適用します。<br>インプレース アップグレードで Exchange Server SE に更新します。                                                                                           |
| Exchange Server 2019 CU12 以前 | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>まずは CU14 を適用します。<br>CU15 の公開後、適用します。                                                                | 該当の旧バージョンの Exchange Server との共存やアップグレードはサポートされません。<br>まずは CU14/CU15 を適用します。<br>インプレース アップグレードで Exchange Server SE に更新します。                                                                                           |


# Exchange Server SE CU1 について

Exchange Server SE は年に 2 度 CU を公開し、2025 年 10 月には Exchange Server SE CU1 をリリース予定です。  
Exchange Server SE CU1 には以下の変更が含まれる予定ですが、詳細はリリースをお待ちください。

- **サーバー間のケルベロス認証:** Exchange Server 間の通信は NTLMv2 ではなく Kerberos を用いて行われるようになります。すべての仮想ディレクトリに対して Kerberos を有効化します。  

- **RPS の廃止と Admin API の追加:** Admin API は REST ベースの API であり、Exchange Server の管理に使用されます。これまで使用されていた Remote PowerShell (RPS) も CU1 でサポートされますが、それ以降の CU で廃止予定となります。これは PowerShell での管理を廃止するのではなく、PowerShell クライアントとサーバー間のプロトコルをモダン化する対応となります。  

- **Outlook Anywhere の削除:** Exchange Online や Microsoft 365 では数年前に Outlook Anywhere (RPC over HTTP) を用いた接続のサポートを終了しました。Exchange Server SE CU1 以降で、Outlook Anywhere は削除されます。Outlook Anywhere を使うサードパーティ アドインなどに影響がございます。 

- **下位バージョンとの共存の削除:** CU1 がリリースされた後は、Exchange Server SE が唯一サポートされるバージョンとなります。そのため、すべての下位バージョン (Exchange Server 2016 / Exchange Server 2019 を含みます) はサポート対象外となります。また、Exchange Server SE CU1 の Setup 実行時には下位バージョンが共存しているかどうかをチェックし、もし Exchange Server SE RTM 以外のバージョンを検知した場合は Setup によるインストールが失敗します。

## 今行っていただく準備について

以下のシナリオに合致する場合は、直ちに Exchange Server 2019 CU14 に移行してください。  

- 今後もオンプレミス Exchange Server を利用する場合、Exchange Server 2019 CU14 (OS としてWindows Server 2022 をご用意ください) へすぐに移行します。   

- Windows Server 2025 のリリースを待つ場合、Windows Server 2025 が利用可能になり次第、Exchange Server 2019 CU15 に移行します。

- もし Exchange Server 2019 を運用されている場合、必ず [最新の CU や SU](https://learn.microsoft.com/ja-jp/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019) 、最新の Windows Server OS の更新プログラムを適用し、常に最新の状態に保つよう管理・運用をしてください。  

なお Windows Server 2019 は 2029 年 1 月にサポート終了が予定されているため、Exchange Server 2019 CU15 と Exchange Server SE RTM を新規に導入する場合には Windows Server 2022  もしくは 将来リリースされる Windows Server 2025 にインストールすることを推奨します。

# FAQ  

**Q1: Exchange Server SE がリリースされた少し後、間もなく Exchange Server 2016/2019 のサポート終了となります。どのようにアップグレードすれば良いでしょうか。**

A1: Exchange Server 2019 に対してインプレース アップグレード で Exchange Server SE RTM に簡単にアップグレードすることが可能です。そのため新たなサーバーを用意する必要はありません。インプレース アップグレードはマイクロソフトが推奨する移行方法であり、最も簡単かつ最速のアップグレード方法となります。  

**Q2: マイクロソフトが Exchange Server 2016/2019 のサポート期間を延期する予定はありますか。もしくは、ESU (延長サポート) に対応する予定はありますか。**

A2: いいえ、サポート期間の延期はありません。また、ESU も提供いたしません。マイクロソフトとしてはスムーズな移行のため、Exchange Server SE のリリースやインプレース アップグレードの準備に注力しております。Exchange Server 2016 をご利用のお客様は直ちに Exchange Server 2019 へ移行することを強く推奨します。  

**Q3: マイクロソフトの推奨通り、Exchange Server 2016 から Exchange Server 2019 へ移行し、そこから Exchange Server SE へインプレース アップグレードをする予定です。CU15 がリリースされる前に CU14 を Windows Server 2022 に適用したほうが良いでしょうか。もしくは、CU15 を待って Windows Server 2025 RTM に適用したほうが良いでしょうか。**

A3: Windows Server 2022 と 今後リリース予定の Windows Server 2025 はどちらも Exchange Server 2019 CU15 や Exchange Server SE でサポートされる OS です。Exchange Server 観点で必要とする OS の機能の差異はありません。サポート ライフサイクルに違いがあり、Windows Server 2025 の方が数年サポート ライフサイクルが長いため、その点はご留意ください。Windows Server 2022 のサポートライフサイクルは[こちら](https://learn.microsoft.com/ja-jp/lifecycle/products/windows-server-2022)で公開しています。

**Q4: Exchange Server SE でサポートされる Outlook バージョンはどれですか。**

A4: [Exchange Server 2019 と同じクライアント](https://learn.microsoft.com/ja-jp/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#supported-clients-with-latest-updates-in-exchange-2019)をサポートします。
Outlook 2016/2019 も Exchange Server SE がリリースされた後すぐにサポート対象外となる予定です。なお、"新しい Outlook" は Exchange Server SE CU1 以降からサポートされる予定です。  

**Q5: DAG メンバー サーバーに対してインプレース アップグレードはどのようにできますか。**

A5: インプレース アップグレードは通常の CU 適用作業と同様に実施いただけます。このため、DAG メンバー サーバーは 1 台ずつインプレース アップグレードを試みてください。  

**Q6: 現行は Windows Server 2019 上に Exchange Server 2019 CU14 をインストールしています。Exchange Server SE では Windows Server 2019 はサポートされますか。**

A6: Exchange Server SE では Windows Server 2019 や Windows Server 2022 どちらもサポートします。ただし、Exchange Server 2019 CU15 からサポートされる TLS1.3 は Windows Server 2022 以降でサポートされるため、Windows Server 2019 では利用できません。また、サポート ライフサイクルの観点としても Windows Server 2022/2025 を利用する方がより長くサーバーを利用できます。  

**Q7. Exchange Server 2016 の組織に Exchange Server 2019 と Exchange Server SE RTM の両方を共存させ、Exchange 2016 から Exchange SE にメールボックスを移行する方法はサポートされますか。**

A7. 構成としてはサポートさますが、推奨しておりません。上記のとおり、Exchange Server 2016/2019 のサポート終了時期間近に Exchange Server SE RTM がリリースされるため、Exchange Server 2016/2019 から Exchange Server SE への移行期間が非常に短く、従来の移行をやりきるのは困難となる場合も想定されるためです。まずは Exchange Server 2019 への移行を行っていただいたうえで、Exchange Server SE RTM がリリースされましたら、インプレース アップグレードにより移行いただくことを推奨いたします。

**Q8. Exchange Server SE でもハイブリッド環境で受信者オブジェクトを管理するための管理ツールは提供されますか。**

A8. はい、提供される見込みです。なお、ハイブリッド環境での受信者管理を目的とした管理ツールは Exchange Server 2019 CU12 から提供を開始しておりますが、通常のアップグレードと同様に CU14 / CU15 からのインプレース アップグレードも可能となる見込みです。
