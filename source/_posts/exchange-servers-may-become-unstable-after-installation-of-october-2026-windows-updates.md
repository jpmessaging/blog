---
title: "2026 年 10 月の Windows 更新プログラム適用後、Exchange サーバーが不安定になる可能性があります"
date: 2026-10-19 08:59
lastupdate: 2026-10-21
tags:
- Exchange Server
---
※ この記事は、[Exchange servers may become unstable after installation of October 2026 Windows updates](https://techcommunity.microsoft.com/blog/exchange/exchange-servers-may-become-unstable-after-installation-of-october-2026-windows-/4565382) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #FFFF99; padding: .5em; margin: 1em 0 1em 0;"><strong>2026 年 10 月 20 日更新:</strong> この記事に FAQ を追加しました。</p>

2026 年 10 月 13 日 (Microsoft の「Patch Tuesday」のリリース サイクル) 以降、Windows の 10 月更新プログラムをインストールした後、一部のお客様から Exchange Server が不安定になる問題が発生したとの報告を受けています。

発生する症状はさまざまですが、次のようなものがあります。

- Exchange Server の OWA でエラー `MapiExceptionMdbOffline: Unable to make connection to the server. (hr=0x80004005, ec=1142)` が発生し、アプリケーション ログにイベント ID 1006 が記録されることがあります。
- Exchange のメール キューが日中に増加し、メールの処理が徐々に遅くなって停止することがあります。
- DAG メンバーがクォーラムに到達できない問題も報告されています。
- Exchange サーバーを再起動すると、一時的に問題が解決する場合があります。
- Exchange Server 2016、Exchange Server 2019、または Exchange Server Subscription Edition (Exchange SE) が影響を受ける可能性があります。

## 発生している問題と対処方法

報告されている問題は、[2026 年 10 月の Exchange Server セキュリティ更新プログラム](/blog/released-october-2026-exchange-server-security-updates/) のインストールに関連するものではありません。2026 年 10 月の Exchange 更新プログラムに関連する「既知の問題」でもありません。影響を受ける Windows のバージョンで実行されている Exchange は、どの Exchange バージョンでも影響を受ける可能性があります。

次の Windows Server 更新プログラムを適用すると、一定時間経過後に前述の Exchange Server の問題が発生することがあります。

- [KB5126646](https://support.microsoft.com/servicing/os/windows-server/2026/10/kb5126646-windows-server-2025-security-update) (Windows Server 2025)
- [KB5126655](https://support.microsoft.com/servicing/os/windows-server/2026/10/kb5126655-windows-server-2022-security-update) (Windows Server 2022)
- [KB5126651](https://support.microsoft.com/servicing/os/windows-10/2026/10/kb5126651-windows-10-1809-security-update) (Windows Server 2019)
- [KB5126868](https://support.microsoft.com/servicing/os/windows-10/2026/10/kb5126868-windows-10-1607-security-update) (Windows Server 2016)

<span style="background-color: #ffff99;">すべての Exchange サーバーで、これらの更新プログラムのインストールによる影響が同じように発生するわけではありません。影響の度合いや問題が発生するまでの時間は、Exchange サーバーの負荷によって異なります。問題が発生しないサーバーもあります。</span>

### 推奨事項

1. 2026 年 10 月の Windows Server 更新プログラムをアンインストールしないでください。
2. Exchange サーバーで、管理者特権のコマンド プロンプトから次のコマンドを実行します。

   ```cmd
   reg add "HKLM\SOFTWARE\Microsoft\Rpc" /v EpmapSavedContextCap /t REG_DWORD /d 65536 /f
   ```

3. サーバーを再起動します。
4. 再起動後、環境を監視し、問題が再発するかどうかを確認します。問題が再発する場合は、上限値を引き上げてください (これまでのところ、引き上げが必要になったケースは確認されていません)。これまでに支援したお客様からの報告では、この方法で問題が解決しています。

詳細については、[Exchange Server で OWA にサインインできない、またはメールを送信できない場合](https://learn.microsoft.com/windows/release-health/status-windows-server-2025#5047msgdesc) (Windows Server の既知の問題と通知) をご確認ください。

## FAQ

**更新された Windows 更新プログラム セットや、翌月の Windows 更新プログラムのリリースを待つべきですか。Windows Server 更新プログラムをアンインストールすべきですか。**<br>
いいえ。既にリリースされている Windows 更新プログラムは、できるだけ早くインストールしてください。Windows Server 向けの 2026 年 10 月の更新プログラムには重要なセキュリティ更新が含まれているため、Exchange Server の相互運用性に関する 1 つの問題を理由に、インストールを遅らせないでください。この記事の推奨事項に従ってください。

**Exchange サーバーに 2026 年 10 月の Windows Server 更新プログラムをインストールする前に、ここで説明されている Windows レジストリ設定を作成できますか。**<br>
はい。事前にレジストリ キーを作成しても Windows Server には影響しません。このレジストリ キーは、2026 年 10 月の Windows Server 更新プログラムをインストールした後にのみ読み取られ、使用されます。また、更新プログラムのインストール中もレジストリ キーは保持されます。

**別の修正プログラムは提供されますか。Exchange からですか、Windows からですか。いつ提供されますか。待つべきですか。**<br>
Windows または Exchange から、近いうちに追加のリリースが行われる予定はありません。両チームは長期的な対応について引き続き分析しています。今後、この領域で改善が行われる可能性はあります。新しいリリースを待たずに、2026 年 10 月の Windows Server 更新プログラムをインストールし、この記事の Exchange Server に関する推奨事項に従ってください。

## 主な更新内容

- 2026 年 10 月 20 日: FAQ セクションを追加しました。上限値を「65536」より引き上げる必要があるケースは、これまで確認されていない旨を追記しました。

The Exchange Team
