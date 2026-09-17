---
title: "Microsoft Graph PowerShell をより安心して利用するために: PowerShell 7.x 以降に注力します"
date: 2026-09-17 10:06
lastupdate: 2026-09-17
tags:
- Microsoft Graph
---

※ この記事は、[Investing in a more reliable Microsoft Graph PowerShell experience](https://devblogs.microsoft.com/microsoft365dev/investing-in-a-more-reliable-microsoft-graph-powershell-experience/) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft Graph PowerShell は、最も信頼性が高く、機能豊富で、しっかりとメンテナンスされた体験を提供できるプラットフォームである PowerShell 7.x 以降に注力していきます。最新の .NET 上に構築された PowerShell 7.x では、現在 Windows PowerShell 5.x に影響を与えているアセンブリの読み込みや依存関係に関する多くの問題が解消されています。エンジニアリングをここに集中させることで、より速い修正、新機能のより迅速な提供、そしてプラットフォーム固有の障害の減少につながります。

この注力を実現するため、本日、Microsoft Graph PowerShell モジュールにおいて Windows PowerShell 5.x が 12 か月の retirement (廃止) 期間に入ることを発表します。この期間中、5.x に対するメンテナンスは徐々に縮小し、新たな投資、開発、検証は PowerShell 7.x 以降に振り向けられます。v2.x モジュールはこの間も引き続き Windows PowerShell 5.1 上で動作します。これは計画された移行であり、今すぐ利用環境が変更されるものではありません。

ここでいう retirement (廃止) とは、互換性ではなくメンテナンスに関するものです。廃止期間中も v2.x モジュールは引き続き Windows PowerShell 5.1 との互換性を宣言し、ほとんどの場合、既存の環境で現在と同様に機能し続けます。変わるのはエンジニアリングの投入先です。新機能、バグ修正、検証は PowerShell 7.x を対象とし、Windows PowerShell 5.x 固有の問題は今後積極的な調査や修正の対象にはなりません。

## タイムライン

- **現在からおよそ今後 12 か月間 (廃止期間)**。v2.x モジュールは Windows PowerShell 5.1 との互換性を維持し、必要に応じてセキュリティ修正を受け取ります。PowerShell 5.x 互換性のためのメンテナンスは縮小していき、積極的な開発、検証、投資は PowerShell 7.x 以降へと移行します。これにより、移行を計画し、支障なく完了させるための時間が確保されます。
- **2026 暦年の第 4 四半期**に、Microsoft Graph PowerShell の新しいメジャー バージョンがリリースされます。v3.0.0 のリリース後は、セキュリティ修正が必要な場合を除き、v2 の新しいバージョンは公開されません。v3.x モジュールは Windows PowerShell 5.x を明示的にはサポートせず、PowerShell 7.x のみをサポートします。

## PowerShell 7.x への移行

まだ Windows PowerShell 5.1 を使用している場合は、PowerShell 7.x への移行を今から計画してください。これは今後推奨される唯一のメンテナンス対象プラットフォームであり、上記で説明したより信頼性の高い体験を提供します。

この移行を進めるにあたり、お客様のご協力とご理解に感謝するとともに、Microsoft Graph PowerShell の将来への投資を継続していきます。
