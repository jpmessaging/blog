---
title: >
  Exchange サーバーのセキュリティ更新プログラムについて
date: 2021-03-08
tags: Exchange
---
Exchange サーバーに脆弱性が発見された場合、対応するセキュリティ更新プログラム (以下、SU) がリリースされます。最近では 2021 年 3 月 2 日に SU がリリースされ、ご存知の方も多いはずです。この記事では SU についてよくある質問をまとめています。なお、2021 年 3 月 2 日にリリースされた SU については、以下のブログ記事とそのリンク先に最新情報がまとめられていますので、そちらをご参照ください。

[Released: March 2021 Exchange Server Security Updates](https://techcommunity.microsoft.com/t5/exchange-team-blog/released-march-2021-exchange-server-security-updates/ba-p/2175901)

## 対応する脆弱性の情報はどこで入手できますか

SU がリリースされると KB も公開されます。KB に Microsoft Security Response Center の脆弱性情報へのリンクが含まれているため、そちらをご参照ください。また、SU がリリースされると多くの場合 Exchange Team Blog にも記事が投稿されます。ブログ記事に KB へのリンクが含まれるためそちらからたどることができます。

## セキュリティ更新プログラムと累積更新プログラムは異なるものですか

異なります。

Exchange サーバーの累積更新プログラム (CU) は、基本的にメインストリーム サポート フェーズの製品に対して四半期に一度リリースされます。これまでにリリースされた機能の追加、不具合の修正、脆弱性の修正がすべて含まれます。

セキュリティ更新プログラム (SU) は、基本的にサポートされるバージョンの Exchange サーバーに対して必要に応じてリリースされます。特定の脆弱性の修正のみが含まれます。

## SU はどこで入手できますか

基本的に Windows Update、Microsoft Update Catalog、Microsoft Download Center から入手できます。詳しくは SU の KB をご参照ください。

## SU をインストールするための前提条件はありますか

SU は特定の CU 向けのみにリリースされます。具体的には、メインストリーム サポート フェーズの製品に対しては最新もしくは最新の 1 つ前の CU 向けにリリースされます。延長サポート フェーズの製品に対しては最新の CU 向けにリリースされます。ただし脆弱性の内容や市場の動向によってはリリース対象を拡大することもあります。

ご利用の CU が SU のリリース対象になっていない場合は、まずは SU の対象となっている CU をインストールし、その上で SU をインストールする必要があります。CU ごとにサポートする .NET Framework、OS、ドメイン コントローラー、フォレスト機能レベルが異なる場合があるので、CU の前提条件を満たしたうえで CU のインストールを行う必要があります。サポートされる組み合わせは以下の技術情報で公開しています。

英語 : [Exchange Server supportability matrix](https://docs.microsoft.com/en-us/exchange/plan-and-deploy/supportability-matrix)  
日本語 : [Exchange Server のサポート一 マトリックス](https://docs.microsoft.com/ja-jp/exchange/plan-and-deploy/supportability-matrix)

通常、SU にこれ以外の前提条件が課せられることは稀ですが、詳細は SU の KB を参照してください。

## 現在利用している CU 用の SU がリリースされていないのは、脆弱性の影響を受けないということでしょうか

SU の KB や Exchange Team Blog に特筆されていない限り、SU がリリースされていない CU も影響を受けます。CU が古いために SU がリリースされていない状況です。SU がリリースされている CU をインストールして、SU をインストールしてください。SU のリリース有無に限らず、常に最新の CU を適用することを強く推奨します。

## 現在利用している CU 用の SU がリリースされていないので、提供してもらえますか

できません。SU がリリースされている CU をインストールして、SU をインストールしてください。SU のリリース有無に限らず、常に最新の CU を適用することを強く推奨します。

## SU のインストール手順を教えてください。

コマンド プロンプトを管理者権限で起動して、SU のファイル (msp ファイル) のフル パスを実行することで SU のインストールを開始してください。あとはウィザードに従って進めてください。終了時にウィザードで再起動を求められたら OS 再起動を行ってください。ウィザードで再起動を求められなくても、再起動を行うことを推奨します。

## SU をインストールする際に注意が必要なことはありますか

以下の技術情報にまとめられていますのでご一読ください。まだ正確な翻訳が行われていないため英語版をご確認いただくことを推奨しますが、[機械翻訳版はこちらです](https://docs.microsoft.com/ja-jp/exchange/troubleshoot/client-connectivity/exchange-security-update-issues)。

[Issues due to Exchange Server security updates](https://docs.microsoft.com/en-us/exchange/troubleshoot/client-connectivity/exchange-security-update-issues)

CU のインストールも同様ですが、SU のインストール中は Exchange 関連のサービスが停止します。

SU のインストールを管理者権限で実行しないと、インストール後に OWA や Exchange 管理センターにアクセスできなくなる場合があります。またインストール後に Exchange のサービスが自動起動しない場合があります。これらの動作を防ぐためには、コマンド プロンプトを管理者権限で起動して、SU のファイル (msp ファイル) のフル パスを実行することで SU のインストールを開始してください。この注意点は SU の KB にも記載されています。

SU のインストール後に Exchange のサービスが自動起動しない場合は、手動にてサービスのスタートアップの種類を [自動] に変更してサービスを起動してください。

OWA や Exchange 管理センターにアクセスできなくなった場合は以下の手順を実行してください。

### SU のインストール後に OWA や Exchange 管理センターにアクセスできなくなった場合の対処

ローカル コンピューターの管理者、および Exchange サーバーの管理者権限のあるユーザーでサーバーにログオンして実行します。

1. Exchange 管理シェルを開き、下記のパスに移動します。  
    C:\Program Files\Microsoft\Exchange Server\V15\bin  

    ※C:\Program Files\Microsoft\Exchange Server\V15\ のパスは、実際に Exchange サーバーをインストールしているパスに置き換えてください。

2.  下記のコマンドを実行します。  
    
    ```
    .\UpdateCas.ps1
    ```

3.  以下のコマンドを実行します。

    ```
    .\UpdateConfigFiles.ps1
    ```

4. 以降のステップ 12 までの手順では念のため構成が正しい状態になっているか確認します。IIS マネージャーを起動します。
5. 左ペインで [サイト] - [Exchange Back End] - [ecp] をクリックします。
6. 中央の作業ペインで [アプリケーションの設定] をダブル クリックし開きます。
7. "名前" が "BinSearchFolders" であるエントリをダブルクリックします。
8. [値] の文字列を確認し、%ExchangeInstallDir% というような文言が設定されている場合は、それらを Exchange サーバーの実際のインストール パスに変更し、[OK] にて保存します。

   変更前例)  
   `%ExchangeInstallDir%bin;%ExchangeInstallDir%bin\CmdletExtensionAgents;%ExchangeInstallDir%ClientAccess\Owa\bin`  

   変更後例)  
   `C:\Program Files\Microsoft\Exchange Server\V15\bin;C:\Program Files\Microsoft\Exchange Server\V15\bin\CmdletExtensionAgents;C:\Program Files\Microsoft\Exchange Server\V15\ClientAccess\Owa\bin`

9.  [管理ツール] - [サービス] を開き、IIS Admin サービスおよび World Wide Web Publishing サービスを停止します。
10. Windows のエクスプローラーで下記のフォルダーを開き、フォルダー内の web.config ファイルをテキスト エディターで開きます。  
   C:\Program Files\Microsoft\Exchange Server\V15\ClientAccess\ecp  

    ※ C:\Program Files\Microsoft\Exchange Server\V15\ のパスは、実際に Exchange サーバーをインストールしているパスに置き換えてください。

11. ファイル内で `%ExchangeInstallDir%` となっている箇所がないかどうか、テキスト エディターの検索機能などを用いて確認します。`%ExchangeInstallDir%` の記述が存在する場合は、実際のインストール パスを指すように変更します。
12. 変更後を行った場合はファイルを保存して閉じます。
13. 最後に、サーバーの再起動を行います。

## SU のインストール後に OS の再起動は必要ですか

SU のインストール後は基本的に OS の再起動が必要です。ウィザードで再起動を求められなくても、再起動を行うことを推奨します。

## SU の内容は将来の CU に含まれますか

はい、メインストリーム サポート フェーズの製品の場合は、SU の次にリリースされる CU に SU の内容が含まれます。ただし CU を待たずにすぐに SU をインストールすることを強く推奨します。延長サポート フェーズの製品は通常は CU がリリースされることはありません。

## SU のインストールにはどのくらい時間がかかりますか

一概に案内することはできませんが、1 時間程度あれば完了することが多いです。検証環境をご用意いただきご確認いただくことを推奨します。

## SU をインストールすることで機能の追加は行われますか

行われません。

## SU をインストールすることで Exchange Hybrid 構成への影響はありますか

通常はありません。何らかの影響が生じる場合は KB や Exchange Team Blog に記載されますので、詳しくは KB をご参照ください。

## web.config をカスタマイズしていますが SU のインストール後に再設定は必要ですか

通常は必要ありませんが、念のため SU のインストール後に web.confing の内容を確認し、必要に応じて設定を行ってください。

## 脆弱性に回避策があれば SU をインストールしなくてもいいですか

一時対応として回避策を適用しても、なるべく早く SU をインストールすることを強く推奨します。

## Exchange サーバーを外部公開していないので SU をインストールしなくてもいいですか

社内の端末を踏み台にして攻撃される可能性があるため、SU をインストールすることを強く推奨します。

## Exchange 2013 の CAS サーバーなど、クライアントからの通信を受け付ける Exchange サーバーにのみ SU をインストールすればよいですか

クライアントからの通信を受け付ける Exchange サーバーへの SU のインストールを優先していただいた上で、まだ顕在化していない今後の問題に備えるという観点から最終的にはエッジ トランスポートの役割のサーバーも含めすべての役割の Exchange サーバーに SU をインストールすることを強く推奨します。