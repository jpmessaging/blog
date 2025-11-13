---
title: Windows Server 2025 のスキーマ マスターを使用した場合の Active Directory スキーマ拡張の問題
date: 2025-10-10
lastupdate: 2025-11-13
tags:
  - Exchange
---

※ この記事は、[Active Directory schema extension issue if you use a Windows Server 2025 schema master role](https://techcommunity.microsoft.com/blog/exchange/active-directory-schema-extension-issue-if-you-use-a-windows-server-2025-schema-/4460459) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #99ffa7ff;"><strong>更新 2025/11/11: </strong> Windows チームは、2025 年 11 月に Windows Server 2025 向けの<a href =https://support.microsoft.com/en-us/topic/november-11-2025-kb5068861-os-build-26100-7171-24e553d1-2338-433e-9cc3-61733148530c>更新プログラム</a>を公開し、この問題の修正を含めています。この更新プログラムを Windows Server 2025 のスキーマ マスター サーバーにインストールすることで、重複エントリの発生を未然に防ぐことができます。ただし、この修正は既に存在するスキーマの競合を解決するものではありません（既存の競合については、引き続き Microsoft Active Directory サポート チームへのお問い合わせが必要です）。</p>

Windows チームの担当者と連携して調査したところ、Exchange Server の最近の累積更新プログラム (例：Exchange 2019 CU15 や Exchange SE RTM) をインストールした後に、お客様のオンプレミス Active Directory 環境のレプリケーションに影響を与える可能性がある特定の状況が判明しました。
この問題は、Windows Server 2025 をスキーマ マスターの [FSMO 役割](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-fsmo-roles)として使用している場合にのみ発生します。Windows Server 2025 をドメイン コントローラーとして他の役割で使用している環境は影響を受けません。

## 事象

Windows Server 2025 をスキーマ マスターの FSMO 役割として使用している環境では、Exchange Server の累積更新プログラムを適用した後に重複したスキーマ属性の値が作成される可能性があります。これにより、AD 複製が失敗し次のようなアプリケーション ログ イベントが記録されます:

> Error 8418: The replication operation failed because of a schema mismatch between the servers involved.
>
> Warning 1203 (NTDS Replication): The local domain controller could not replicate the following object from the source domain controller at the following network address because of an Active Directory schema mismatch.

さらに、repadmin /showrepl のようなツールでも AD 複製の問題が表示されます。

Windows チームはこの問題を既知の問題として [KB5065426](https://support.microsoft.com/topic/september-9-2025-kb5065426-os-build-26100-6584-6a59dc6a-1ff2-48f4-b375-81e93deee5dd) に掲載しています (「この更新プログラムの既知の問題」を参照してください)。

## この問題の回避方法

この問題を回避するには、Exchange Server の累積更新プログラム (Exchange SE RTM を含む) をインストールする前に、Windows Server 2025 をスキーマ マスターの FSMO 役割として使用していないことを確認してください。Windows Server 2025 をドメイン コントローラーとして配置することは可能ですが、スキーマ マスターの FSMO 役割を保持させないでください。

## 解決策

Windows Server チームはこの問題の恒久的な修正に取り組んでおり、数か月以内にリリースされる予定です。

既にこの問題が発生している場合、Windows サポート チームは AD レプリケーションを継続させるための手順を用意しており、手動による介入 (スキーマの編集) が必要になる可能性があります。影響を受けている場合は、Windows Active Directory チームにサポート チケットを起票してください。