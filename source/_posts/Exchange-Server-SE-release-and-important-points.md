---
title: 'Exchange Server SE のリリースと押さえておきたいポイントについて'
date: 2025-07-04
lastupdate: 
tags: 'Exchange'
--- 

こんにちは。Exchange / Outlook サポート チームです。さて、[こちら](/blog/exchange-server-subscription-edition-se-is-now-available/)でアナウンスしているとおり 2025/7/1 (日本時間では 7/2) にいよいよ Exchange Server Subscription Edition (Exchange Server SE) がリリースされました。

Exchange Online の受信者管理用として Exchange の管理ツールを利用されている場合も含め、Exchange Server をご利用のお客様は、サポート ライフサイクルの観点から Exchange Server 2016 CU23 または Exchange Server 2019 CU14 / CU15 をご利用になっていることと思います。
しかしながら、これらの製品は[こちら](/blog/t-6-months-exchange-server-2016-and-exchange-server-2019-end-of-support/)にてご案内のとおり、2025 年 10 月 14 日をもって、延長サポートが終了となる見込みです。

そのため、Exchange Online の受信者管理用として Exchange の管理ツールをご利用になる場合も含め、Exchange Server を引き続きご利用いただくためには、サポータビリティやセキュリティの観点からも Exchange Server SE へ移行していただく必要があります。

Exchange Server 2016 / Exchange Server 2019 のサポート終了に先立ち、昨年から Exchange Server SE に関する情報は主に以下のブログにて発信しており、随時更新が行われてきました。

(原文) [Exchange Server Roadmap Update | Microsoft Community Hub](https://techcommunity.microsoft.com/blog/exchange/exchange-server-roadmap-update/4132742)
(日本語訳) [Exchange Server ロードマップの更新 | Japan Exchange & Outlook Support Blog](https://jpmessaging.github.io/blog/Exchange-Server-Roadmap-Update/)

(原文) [Upgrading your organization from current versions to Exchange Server SE | Microsoft Community Hub](https://techcommunity.microsoft.com/blog/exchange/upgrading-your-organization-from-current-versions-to-exchange-server-se/4241305)
(日本語訳) [現行バージョンからExchange Server SEへのアップグレード | Japan Exchange & Outlook Support Blog](https://jpmessaging.github.io/blog/Upgrading-your-organization-from-current-versions-to-Exchange-Server-SE/)

本稿では Exchange Server SE のリリースに際し、改めて確認していただきたいことを整理しました。
こちらをご確認いただき、Exchange Server SE への移行プランをご検討いただければ幸いです。
___

## Exchange Server SE への移行方針は明確となっているか

Exchange Server SE の移行パスとしては、Exchange Server 2019 から Exchange Server SE へのインプレース アップグレード、またはインプレース アップグレードがサポートされない Exchange Server 2016 からでも Exchange Server SE へ移行可能な従来のアップグレードの 2 つの方法がサポートされます。

- インプレース アップグレード: 最速で簡単に Exchange Server 2019 (CU14 または CU15) を Exchange Server SE にアップグレードする方法です。CU 適用作業と同様の操作でアップグレードが可能です。
- 従来の移行 : これまでと同様に、新規 Windows Server OS をインストールしたサーバーを用意して Exchange Server SE をインストールし、名前空間とメールボックスをその新しいインフラストラクチャに移動する従来のアップグレード方法です。この方法は Exchange Server のハードウェアをリプレースする場合や、新しい Windows Server OS に更新したい場合などのシナリオで利用されます。

Exchange Server SE への移行パスとしてのお薦めは以下の通りです。

- Exchange Server 2016 をご利用の場合: 以下の 2 つのパターンが想定されます。
  - Exchange Server 2019 CU15 を別のサーバーとして構築し従来の移行を実施後、Exchange Server SE へインプレース アップグレードを行います。
  - Exchange Server SE を別のサーバーとして構築し従来の移行を行います。
- Exchange Server 2019 をご利用の場合: Exchange Server 2019 CU15 を適用し、Exchange Server SE へのインプレース アップグレードを行います。

Exchange Server SE は Exchange Server 2019 CU15 とコードが同等であり機能の追加や削除が行われることはなく、違いは以下の通りです。

- ライセンス契約書 (GUI バージョンのセットアップでのみ表示される RTF ファイル) が更新されます。
- 名前が Microsoft Exchange Server 2019 から Microsoft Exchange Server Subscription Edition に変更されます。
- ビルド番号が更新されます。

実質的には Exchange Server 2019 の CU16 をインストールするのと同じと考えることができ、この CU の名前を Exchange Server SE RTM に変更したイメージとなります。
そのため、Exchange Server SE へのインプレース アップグレードをお薦めしております。

(原文) [Why “in-place upgrade” from Exchange 2019 to Exchange SE is low risk | Microsoft Community Hub](https://techcommunity.microsoft.com/blog/exchange/why-%E2%80%9Cin-place-upgrade%E2%80%9D-from-exchange-2019-to-exchange-se-is-low-risk/4410173)
(日本語訳) [Exchange 2019 から Exchange SE への "インプレース アップグレード" が低リスクである理由 | Japan Exchange & Outlook Support Blog](https://jpmessaging.github.io/blog/why-in-place-upgrade-from-exchange-2019-to-exchange-se-is-low-risk/)
___

## Exchange Server SE へ移行後に検討すべきこと

Exchange Server SE RTM や Exchange Server SE CU1 では、Exchange Server 2016、Exchange Server 2019 との共存は引き続き可能です。
一方、Exchange Server SE CU1 のリリース時点では、すでに Exchange Server 2016、Exchange Server 2019 のサポートが終了しているため、これらの製品に対する技術サポートの提供はありません (サポート契約をお持ちのお客様がお問い合わせを起票いただいても、ご支援を提供することができません)。
Exchange Server 2016、Exchange Server 2019 から Exchange Server SE への移行に関する内容についてはベストエフォートにて技術サポートを提供しますが、Exchange Server SE CU1 と Exchange Server 2016、Exchange Server 2019 の共存をお薦めするものではありません。
可能な限り、Exchange Server 2016、Exchange Server 2019 のサポート期間内に Exchange Server SE へ移行いただくことをお薦めいたします。

なお、Exchange Server SE CU2 のセットアップでは、すべてのサポートされていないバージョン (例：Exchange Server 2013、Exchange Server 2016、Exchange Server 2019) との共存がブロックされ、Exchange Server SE との共存のみが許可されます。
Exchange Server SE CU2 (またはそれ以降) をインストールするには、組織内のすべての古いバージョンの Exchange Server を廃止して削除する必要があります。

<div style="margin:1.25em;border-left:.25em solid #4493f8;padding:.5em;">
<div style="margin-bottom:16px;display:flex;align-items:center;line-height:1;color:#4493f8">
<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" style="margin-right:8px">
<path fill="#4493f8" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
</svg>
情報
</div>
<div>
以前は Exchange Server CU1 の時点で Exchange Server 2016、Exchange Server 2019 との共存がブロックされるとアナウンスしておりましたが、直近の更新で変更となりました。
</div>
</div>

Exchange Server SE へ移行後は、古いバージョンの Exchange Server の撤去を行い Exchange Server SE CU2 へ備えていくことが重要です。

他にも Exchange Server SE についての情報は下記にまとめています。
気になる方はぜひチェックしてみてください。

(原文) [Release notes for Exchange Server Subscription Edition (SE) | Microsoft Learn](https://learn.microsoft.com/en-us/exchange/release-notes)
(日本語機械翻訳) [Exchange Server サブスクリプション エディション (SE) のリリース ノート | Microsoft Learn](https://learn.microsoft.com/ja-jp/exchange/release-notes)

(原文) [What's new in Exchange Server Subscription Edition (SE) | Microsoft Learn](https://learn.microsoft.com/en-us/exchange/new-features/new-features)
(日本語機械翻訳) [Exchange Server サブスクリプション エディション (SE) の新機能 | Microsoft Learn](https://learn.microsoft.com/ja-jp/exchange/new-features/new-features)

(原文) [What's discontinued in Exchange Server SE | Microsoft Learn](https://learn.microsoft.com/en-us/exchange/new-features/discontinued-features)
(日本語機械翻訳) [Exchange Server SE で廃止された内容 | Microsoft Learn](https://learn.microsoft.com/ja-jp/exchange/new-features/discontinued-features)
___ 

本稿の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。

