---
title: 'Exchange Online コマンドレットの変更点と、管理シナリオでの REST API の可用性に関するフィードバックをお寄せください'
date: 2025-05-13
lastupdate:
tags: 'Exchange Online'
---
※ この記事は、[Give us feedback on Exchange Online Cmdlet changes and Rest API availability for Admin Scenarios](https://techcommunity.microsoft.com/blog/exchange/give-us-feedback-on-exchange-online-cmdlet-changes-and-rest-api-availability-for/4412953) の抄訳です。最新の情報はリンク先をご確認ください。
この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

新しいバージョンの Exchange Online PowerShell モジュールを計画するにあたり、パフォーマンスを簡素化および強化し、Exchange Online管理エクスペリエンスを最新化したいと考えています。私たちの目標には、メールボックス管理の合理化、コマンドレットのパフォーマンスの向上、最新の自動化ソリューションとAIエージェントの要求を満たすためのRESTful APIの導入が含まれます。

### Exchange Online コマンドレットの変更

現在の Exchange Online PowerShell コマンドレットに関連する問題点と、これらの問題を解決する計画に対処するために、いくつかの変更を提案したいと思います。これらの変更点については、以下のアンケートで詳しく説明していますので、ぜひご覧ください: [https://forms.office.com/r/hFXCMJPpgv](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fforms.office.com%2Fr%2FhFXCMJPpgv&amp;data=05%7C02%7CKumar.Mukesh%40microsoft.com%7C2fd05440468348d57db908dd6b9c552d%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C638785041384535915%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&amp;sdata=ViSl279ybEqD936qwF0mtHJlS9Nrzgbet2zuvhGEuOo%3D&amp;reserved=0)。

この調査は2つのセクションに分かれており、それぞれが特定の分野に焦点を当てています。これらの改善が管理シナリオでどのように役立つかについて、ぜひご意見をお聞かせください。また、さらなる改善のためのフィードバックや提案も歓迎します。

- **セクション 1: **メールボックスの CRUD (作成、読み取り、更新、削除) 操作を簡素化するために、**各メールボックスタイプに特化したコマンドレットを導入**するアプローチに焦点を当てています。
- **セクション 2: **Exchange Online コマンドレットの**パフォーマンス向上**を目的とした提案された変更に焦点を当てています。**5 つの変更点**を強調し、それぞれの変更について、皆様のご希望をより深く理解するための追加質問を用意しています。

### Exchange Online 管理シナリオ向け RESTful API

別のアンケートでは、Exchange Online 管理シナリオを管理するための REST API 提供に関するリクエストをより深く理解するための調査を行っています。
このアンケートへのリンク: [https://forms.office.com/r/ZQYTzSZJ72](https://forms.office.com/r/ZQYTzSZJ72)

これらの改善の効果を高めるため、また必要に応じて方向性を修正するために、ぜひ上記の 2 つのアンケートにご協力ください。アンケートをご確認いただき、変更点についてのご意見やフィードバックをお寄せください。以下に再度アンケートのリンクを記載しますので、ぜひご利用ください。


1. Exchange Online 管理者向け Cmdlet のモダナイゼーションに関するフィードバック: [https://forms.office.com/r/hFXCMJPpgv](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fforms.office.com%2Fr%2FhFXCMJPpgv&amp;data=05%7C02%7CKumar.Mukesh%40microsoft.com%7C2fd05440468348d57db908dd6b9c552d%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C638785041384535915%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&amp;sdata=ViSl279ybEqD936qwF0mtHJlS9Nrzgbet2zuvhGEuOo%3D&amp;reserved=0)
2. Exchange Online 管理シナリオ向け Graph/REST の提供に関するフィードバック: [https://forms.office.com/r/ZQYTzSZJ72](https://forms.office.com/r/ZQYTzSZJ72)

<div style="margin:1.25em;border-left:4px solid #ff7518;padding:.5em">
<div style="margin:0 0 16px 0;display:flex;align-items:center;line-height:1;color:#ff7518">
<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style="margin-right:8px"><path fill="#ff7518" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
注意
</div>
リンク先のアンケートには英語で記載いただく必要があります
</div>

Exchange Online Management Team

