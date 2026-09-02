---
title: "Exchange Online での ObjectGuid、SamAccountName、DistinguishedName の利用方法をお聞かせください"
date: 2026-08-31
lastupdate: 2026-09-02
tags:
- Exchange Online
---
※ この記事は、[Tell us how you use ObjectGuid, SamAccountName, and DistinguishedName in Exchange Online](https://techcommunity.microsoft.com/blog/exchange/tell-us-how-you-use-objectguid-samaccountname-and-distinguishedname-in-exchange-/4550939) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Exchange Online では、複数年にわたってディレクトリの最新化を進めています。その一環として、以前から使用されている識別子プロパティである ObjectGuid (多くの方には Guid というプロパティ名で知られています)、SamAccountName、DistinguishedName の今後について検討しています。

現在、Exchange Online では複数のプロパティを使用して同じオブジェクトを識別できます。この仕組みによって柔軟性と互換性が確保されてきた一方で、一部の識別子は以前の設計方針に基づいており、自動化、統合、管理ワークフローを構築および保守するお客様にとって複雑さが増す要因となる場合があります。

最新化の一環として、より少なく一貫性のある識別子のセットが、今後のサービスをより適切に支えられるかどうかを検討しています。現時点では、何も決定していません。今後の方針を決定する前に、これらのプロパティが現在どのように使用されているか、変更した場合にどのような影響が生じる可能性があるか、また、どのような代替手段、告知期間、移行支援が必要になるかを把握したいと考えています。

特に、スクリプト、自動化、レポート、アプリケーション、プロビジョニング システム、運用プロセスでこれらのプロパティを使用しているお客様、パートナー、ソリューション プロバイダーからのご意見をお待ちしています。

このアンケートで取り上げている変更の可能性は Exchange Online ディレクトリのみに関するものであり、オンプレミスの Active Directory や Exchange Server の変更を示すものではありません。

数分で回答できるアンケートにぜひご協力ください。寄せられたフィードバックは、今後の検討や、この領域に関する将来の意思決定に役立てられます。

[アンケートに回答する: Exchange Online ディレクトリの識別子プロパティに関するアンケート](https://forms.cloud.microsoft/r/iuAzV3940x)

ご協力ありがとうございます。
