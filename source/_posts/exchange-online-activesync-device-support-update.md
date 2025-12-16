---
title: "Exchange Online における ActiveSync デバイスのサポートの更新"
date: 2025/12/16
lastupdate: 2025/12/16
tags: Exchange
---

※ この記事は、[Exchange Online ActiveSync Device Support Update](https://techcommunity.microsoft.com/blog/exchange/exchange-online-activesync-device-support-update/4477997) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。


[Exchange ActiveSync](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/exchange-activesync/exchange-activesync) (EAS) デバイスの Exchange Online への接続に関する重要な変更についてお知らせします。**2026 年 3 月 1 日**以降、ActiveSync のバージョンが *16.1 未満*のデバイスは、弊社のサービスに接続できなくなります。EAS 16.1 は、2016 年 6 月に Exchange Server および Exchange Online の一部としてリリースされました。

この決定は、できるだけ多くのユーザーがスムーズに移行できるよう、複数のライセンスを持つデバイス ベンダーおよびアプリケーション ベンダーとの広範な協力のもとで検討された結果です。ユーザーおよび組織がデバイスとアプリケーションを最新のサポート対象バージョンに更新していれば、サービスへの影響は最小限に抑えられる見込みです。変更が適用される前に、デバイスおよびアプリケーションが最新の状態であることをご確認ください。

管理者は、PowerShell を使用して、ActiveSync のバージョン 16.1 未満を使用しているデバイスとアプリのレポートを素早く取得できます。以下は実行例です:

    Get-MobileDevice | Where-Object {($_.ClientType -eq 'EAS' -or $_.ClientType -match 'ActiveSync') -and $_.ClientVersion -and ([version]$_.ClientVersion -lt [version]'16.1')} | Sort-Object UserDisplayName | Select-Object UserDisplayName, UserPrincipalName, DeviceId, DeviceModel

デバイスの更新に関してご質問がある場合やサポートが必要な場合は、お使いのデバイスまたはアプリケーションのベンダーにお問い合わせください。

なお、このアナウンスは Exchange Online のみが対象であり (Exchange Server は対象外)、なおかつネイティブ メール アプリを使用しているモバイル デバイスのみが対象となります。例えば Exchange Online のメールボックスにアクセスする際の iOS メール アプリ (iOS 10 で EAS 16.1 を採用)、Gmail アプリ、Samsung メール アプリ (これらは現在アプリの更新作業中のため、最新の状態に保つことで間もなく 16.1 の使用が開始されます) などが該当します。[Outlook Mobile](https://www.microsoft.com/microsoft-365/outlook-mobile-for-android-and-ios) を使用して Exchange Online に接続しているデバイスは、EAS プロトコルを使用していないため、この変更の影響を受けません。

すべてのユーザーに安全で信頼性の高い環境を維持するためのご協力に感謝いたします。


