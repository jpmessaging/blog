---
title: 'クラウド管理のリモート メールボックス: 一般提供が開始されました!'
date: 2025-10-16
lastupdate: 2025-11-07
tags: 
- Exchange
---
※ この記事は、[Cloud-Managed Remote Mailboxes: Now Generally Available!](https://techcommunity.microsoft.com/blog/exchange/cloud-managed-remote-mailboxes-now-generally-available/4461705) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

<p style="background: #ffff99ff;"><font color="red"><strong>更新 2025/11/5:</strong></font><br>
Microsfot Entra Connect のバージョン 2.5.79.0 を使用し、ユーザーの Exchange 属性のクラウド管理を有効にしている場合、「ExchangeManagedAttributesUpdateNotAllowed」というエラーが継続的に発生する可能性があります。このエラーにより、対象ユーザーの属性は同期できなくなります。
現在、この問題を注意深く監視し、今後の対応策を検討しています。当面の間、この機能をユーザーに対して有効化しないでください。現在影響を受けているお客様には、問題の解決方法をご案内します。
</p>

2025 年 8 月 2 日、組織の「最後の Exchange Server」廃止に向けた重要なステップとして、[クラウド管理のリモート メールボックスのパブリック プレビュー](/blog/introducing-cloud-managed-remote-mailboxes-a-step-to-last-exchange-server-retire/)を発表しました。コミュニティからの反響は非常に大きく、皆様からいただいたフィードバックをもとに、さらなる改善を行うことができました。

本日、**クラウド管理のリモート メールボックスが一般提供 (GA) となったことを発表します**！

この機能を有効にする手順については、こちらをご参照ください: [ハイブリッド環境でのリモート メールボックスの Exchange 属性のクラウド ベースの管理](https://learn.microsoft.com/exchange/hybrid-deployment/enable-exchange-attributes-cloud-management)。

#### 改善点

パブリック プレビュー期間中は、メールボックスの isExchangeCloudManaged プロパティを変更するには、ハイブリッド ID 管理者またはグローバル管理者権限が必要でした。Exchange 管理者権限でこのプロパティを変更した場合、Exchange Online PowerShell で明示的なエラーは表示されないものの、SOA は変更されませんでした。この問題は修正されており、今後は Exchange 管理者権限のみで isExchangeCloudManaged プロパティの変更が可能となります。

#### 今後の機能

お客様が「最後の Exchange Server」への依存を解消できるよう、引き続き新機能の開発に取り組んでいます。

1. **テナント レベルの LES フラグ**
この組織単位の設定を使用することで、すべての新しいディレクトリ同期済みのメールボックスがクラウド ユーザー (Exchange 属性なし) として同期され、既定でクラウド管理されるようになります。これにより、メールボックスごとの設定が不要となり、導入の加速が期待されます。この機能は今月末にプライベート プレビューとして提供され、来月に一般提供 (GA) が予定されています。

2. **Exchange 属性の書き戻し**  
Microsoft Entra Cloud Sync を通じてクラウドからオンプレミスの Active Directory へ重要な Exchange 属性 (ドキュメントで言及されている属性) を書き戻すことができるようになります。この機能は、オンプレミス AD でこれらの重要な属性に依存する LOB アプリを運用している組織でも、クラウド管理に移行した後もシームレスに動作できることを目的としています。この機能は 11 月にプライベート プレビューが提供され、来年初めに一般提供が予定されています。

上記のいずれかの機能について、プライベート プレビューや早期アクセスへの参加をご希望の場合は、以下のフォームからご連絡ください。
 [https://forms.office.com/r/6wJJexJAZm](https://forms.office.com/r/6wJJexJAZm)

#### Exchange 属性 SOA 移行とオブジェクト レベル SOA 移行機能

前述の通り、本記事で紹介している Exchange 属性のクラウド管理機能は、AD を引き続き利用しつつ、最後のオンプレ Exchange Server を廃止したい組織向けのものです。一方、オンプレ AD への依存を完全に解消したい組織向けには、Microsoft では「オブジェクト レベルの SOA (Source of Authority) 移行」機能を提供しています。これは、ユーザー、グループ、連絡先などのオブジェクト全体を Entra ID でのクラウド管理へ移行できる機能です。

- **グループ SOA** (クラウド管理の配布グループ) は[パブリック プレビュー中](https://learn.microsoft.com/entra/identity/hybrid/concept-source-of-authority-overview)です。
- **ユーザー SOA** (クラウド管理のユーザー オブジェクト) も[パブリック プレビュー中](https://learn.microsoft.com/entra/identity/hybrid/user-source-of-authority-overview)です。
- **連絡先 SOA**もプレビュー提供中です。 (プレビュー参加希望の場合は上記フォームよりご連絡ください。) 

これらの機能は、将来的にクラウドで ID 管理を行う予定がある場合にも適用できます。これは、ハイブリッド環境でオンプレ Exchange Server を完全に廃止し、管理機能を損なうことなく移行するための重要な要素となります。

#### 次のステップ

GA (一般提供) の開始を待っていた方は、今こそ移行を始める最適なタイミングです。

この機能が、皆様の最後の Exchange Server の廃止にどのように役立つか、私たちはとても楽しみにしています。ご意見やご感想がありましたら、ぜひ [Cloud-Managed Remote Mailboxes: Now Generally Available!](https://techcommunity.microsoft.com/blog/exchange/cloud-managed-remote-mailboxes-now-generally-available/4461705) のコメント欄でお知らせください。