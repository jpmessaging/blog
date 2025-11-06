---
title: "Exchange Online の ActiveSync における証明書ベースの認証エンド ポイントの変更"
date: 2025/11/6
tags: Exchange
---

※ この記事は、[Exchange Online ActiveSync Certificate-based Authentication endpoint changes](https://techcommunity.microsoft.com/blog/exchange/exchange-online-activesync-certificate-based-authentication-endpoint-changes/4459760) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

#### 概要

継続的なセキュリティ強化の一環として、Exchange ActiveSync の証明書ベースの認証（CBA）の動作を最近変更しました。この変更により TLS 1.3 のサポートを追加し、セキュリティと信頼性を強化します。

#### 何が変わるのか？

今回の変更により、すべての Exchange ActiveSync の証明書ベースの認証（CBA）トラフィックは、テナントの場所に応じて新しい専用エンドポイントへルーティングされます。

- **Multi-tenant:** outlook-cba.office365.com
- **Dod:** outlook-dod-cba.office365.us
- **GCC-High:** outlook-cba.office365.us
- **Gallatin (China):** outlook-cba.partner.outlook.cn

この変更は、すでにグローバルのマルチテナント環境で展開が開始されており、他のクラウド環境でも 11 月から順次展開が開始される予定です。

#### 考えられる影響

ほとんどの Exchange ActiveSync クライアントでは、この変更による影響はありません。ユーザーによる操作は不要で、クライアントの通信は自動的に新しい証明書ベースの認証 (CBA) エンドポイントへリダイレクトされます。

ただし、組織で Secure Email Gateway（SEG）や ActiveSync トラフィックをフィルタリングまたは検査する類似のゲートウェイを使用している場合は、上記の新しい CBA エンドポイントへの通信を許可するよう、ファイアウォールやゲートウェイの設定を更新する必要があります。

#### サポートについて

この変更についてご不明点やご懸念がある場合は、ご利用の SEG ベンダーにお問い合わせください。安全な環境の維持にご協力いただきありがとうございます。

#### 付属情報

- [RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3](https://datatracker.ietf.org/doc/html/rfc8446)
- [MS-ASHTTP\]: Authorization | Microsoft Learn](https://learn.microsoft.com/openspecs/exchange_server_protocols/ms-ashttp/7b7fabb9-910c-4f1c-9396-57d7ca579a31): 認証ヘッダーが含まれていない EAS リクエストは、証明書ベースの認証（CBA）リクエストとして扱われます。

