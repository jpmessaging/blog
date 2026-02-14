---
title: Multi-Geo In-Region Routing が一般提供 (GA) 開始
date: 2026-02-14 09:41:51
tags: Exchange Online
---

※ この記事は、[Multi-Geo In-Region Routing General Availability](https://techcommunity.microsoft.com/blog/exchange/multi-geo-in-region-routing-general-availability/4494860) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

[**Multi-Geo In-Region Routing**](https://learn.microsoft.com/microsoft-365/enterprise/configure-multi-geo-in-region-routing?view=o365-worldwide) の**一般提供 (GA)** が 2025 年 12 月に開始されたことをお知らせします。この新機能は [Microsoft 365 Multi-Geo Capabilities add-on ("Multi-Geo")](https://learn.microsoft.com/microsoft-365/enterprise/microsoft-365-multi-geo?view=o365-worldwide) の価値を拡張し、世界中に分散されたユーザーを持つ Multi-Geo 環境の管理者に対して、**受信方向の匿名メールとハイブリッド メールが Exchange Online テナントに入る場所**を制御できる機能を提供します。

#### なぜ In-Region Routing が必要なのか?

既定では、Multi-Geo を使用する Microsoft 365 テナントへの**すべての受信方向の匿名メールとハイブリッド メール**は、最初に**テナントのリージョン**で Exchange Online に入り、その後 Microsoft のセキュアな内部ネットワーク内でメール受信者にリレーされます。世界中に分散されたユーザーを持つお客様にとって、このモデルは業務要件を完全には満たさない場合があります。

Multi-Geo In-Region Routing は、この課題に対処するために構築されました。

#### Multi-Geo In-Region Routing で何ができるのか?

In-Region Routing を使用すると、以下の受信メールが Exchange Online に入る地理的な場所を制御できます:

- **匿名の受信メール**
- **オンプレミスからのハイブリッド受信メール**

Multi-Geo In-Region Routing は、テナントが適切に構成されている場合、匿名の受信メールとハイブリッド受信メールが受信者ユーザーと同じ地域の Exchange Online に入ることを確実にするのに役立ちます。

#### どのように機能するのか (概要)

In-Region Routing により、以下のことができます:

- **承認済みドメイン**を特定のリージョンに関連付ける
- これらのドメインを同じリージョンに位置するユーザーと関連させる
- これらのドメインの受信メールとハイブリッド メールが、受信者のリージョンの Exchange Online に入るようにする

#### Multi-Geo の自然な拡張

In-Region Routing は Multi-Geo に含まれる機能であり、既存の Multi-Geo 機能に基づいています。適切に構成されると、In-Region Routing ドメインの受信メールはテナントのプライマリ プロビジョニング リージョンに最初に入るのではなく、受信者のリージョンに直接入るようになります。これは、お客様に Microsoft 365 がグローバル環境でどのように動作するかについて、意味のある透過的なコントロールを提供するための 1 つのステップです。

#### 始め方

既に Multi-Geo を使用しているか、または使用を計画している場合は、ドメインとユーザーの関連を確認し、In-Region Routing が規制要件または組織要件を満たすのに役立つかどうかを検討する絶好の機会です。

詳細: [複数地域の In-Region ルーティングを構成する - Microsoft 365 Enterprise | Microsoft Learn](https://learn.microsoft.com/microsoft-365/enterprise/configure-multi-geo-in-region-routing?view=o365-worldwide)