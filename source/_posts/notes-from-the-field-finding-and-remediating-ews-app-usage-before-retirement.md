---
title: 現場レポート：EWS 廃止前に行う EWS アプリ利用状況の確認と対策
date: 2026-2-25
lastupdate:
tags: Exchange Online
---
※ この記事は、[Notes From the Field: Finding and Remediating EWS App Usage Before Retirement](https://techcommunity.microsoft.com/blog/exchange/notes-from-the-field-finding-and-remediating-ews-app-usage-before-retirement/4496469) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

本記事では、現在も Exchange Web Services（EWS）を利用している Azure AD アプリの特定方法を実例ベースで解説します。また、Microsoft Graph への移行を進めるうえで考慮が必要となる、Kiosk/Frontline ライセンス変更の影響についてもご紹介します。

Microsoft は 2026 年 10 月 1 日より Exchange Online において EWS のブロックを開始することを発表しています。EWS に依存している基幹業務アプリケーション、サードパーティ製ツール、または自動化処理が残っている場合、まずは「現在何が EWS を使用しているのか」を把握し、そのうえで Microsoft Graph などのサポートされている代替手段への移行計画を立てます。

### 変更内容と、今対応が必要な理由

- [**Exchange Online における EWS の廃止**](https://techcommunity.microsoft.com/blog/exchange/retirement-of-exchange-web-services-in-exchange-online/3924440)：Microsoft は **2026 年 10 月 1 日**より Exchange Online において EWS リクエストをブロックする予定です。そのため、EWS を使用した各種連携については、Microsoft Graph への移行が推奨されています。
- [**Kiosk/Frontline ライセンス ユーザー向けの EWS アクセス制限**](https://jpmessaging.github.io/blog/update-to-ews-access-for-kiosk--frontline-worker-licensed-users/)：**2026 年 6 月末**より、Microsoft は **EWS へのアクセス権を持たないライセンス** (一部の Kiosk ライセンスや Frontline Worker 向けライセンス) が割り当てられているユーザーに対して EWS へのアクセスをブロックします。この変更により、該当するライセンスを使用しているユーザーでは、10 月の全体的な廃止日より前に EWS ベースの連携が動作しなくなる可能性があります。

Microsoft Graph への移行を 2026 年 10 月よりも大幅に前倒しで完了する予定であっても、2026 年 6 月末に実施されるライセンス関連のブロックを踏まえ、該当ライセンスが割り当てられたユーザーが EWS を使用しているかどうかを確認する必要があります。そのような確認において有用なのが、[Exchange-App-Usage-Reporting](https://github.com/jmartinmsft/Exchange-App-Usage-Reporting) スクリプトです。このスクリプトを活用することで、EWS の権限を持つアプリを洗い出し、直近のサインイン アクティビティとあわせて把握できるため、優先的に対応すべき対象を効率的に見極めることができます。

### Exchange‑App‑Usage‑Reporting スクリプトでできること

このスクリプトは、次のような実際の運用上の疑問に答えるために設計されています。*テナント内で EWS の権限を持つ Azure AD のアプリはどれか、そしてそれらは現在も使用されているのか？* 大まかには、次の処理を行います。

1. Exchange/EWS 関連のアクセス権限を持つアプリケーションを検出します。
2. 各アプリケーションのサインイン アクティビティを確認し、現在使用されているアプリケーションを特定します。
3. テナント内の EWS アクティビティについて監査ログを照会します。
4. ソートやアプリ所有者との共有が可能なレポート ファイルを出力します。
5. Kiosk または Frontline Worker の特定に役立つユーザー ライセンス レポートを出力します。

#### このスクリプトが Microsoft 365 管理センターの EWS 使用状況レポートをどのように補完するか

WW (Worldwide) サービスをご使用の場合、[Microsoft 365 管理センターの EWS 使用状況レポート](https://learn.microsoft.com/microsoft-365/admin/activity-reports/ews-usage?view=o365-worldwide)は良いスタート ポイントとなります。このレポートでは、テナント全体の EWS アクティビティを集約されており、どの EWS SOAP アクションが呼び出されているかや、時系列でのボリュームを確認できます。これにより、全体的な EWS 依存関係を定量化し、最も負荷の高い EWS ワークロードを特定するのに役立ちます。

多くのチームが直面する課題は、そのような使用状況をもとに実行可能な対策計画に落とし込むことです（例えば、正確な Entra ID アプリ/サービス プリンシパルの特定、それが現在もアクティブに使用されているかどうかの判断、影響を受けるユーザーとメールボックスの特定）。Exchange-App-Usage-Reporting スクリプトは、EWS の使用状況に ID や運用の観点を加えることで、こうしたギャップを解消するために用意されています。

- **アプリと所有権の把握**：EWS 関連のアクセス権限を持つ Entra ID アプリ/サービス プリンシパルを特定することで、「あるアプリが EWS を呼び出している」から「これが対応すべきアプリ オブジェクトである」という判断へ即座に切り替えることができます。さらに、適切な所有者や担当チームへに引き継ぐことができます。
- **最新性と「現在も使用されているか」の判断材料**：アプリをサインイン アクティビティに関連付けるため、現在も実際に認証が行われているアプリと、古くなって廃止を検討してもいいアプリを判別することができます。これにより、対応の優先順位付けが可能になります。
- **認証方式と権限モデルの可視化**：使用状況がアプリケーション権限に基づくものか、委任された権限に基づくものかを判別できるようになります。これは、 Microsoft Graph への移行方法を適切に選択するうえで重要であると同時に、最小権限アクセスの設計に役立ちます。
- **メールボックス構成に伴うリスク（Kiosk/Frontline）**：ユーザー ライセンス レポートより、EWS 依存のワークフローが、早期に EWS アクセス制限の影響 (2026 年 6 月末) を受ける可能性のあるメールボックスに該当するかどうかを特定できます。
- **エクスポート可能なアプリ中心の作業リスト**：最後のサインイン日時などでソート/共有できる CSV を生成し、エンジニアリング バックログを効果的に推進します。具体的には、所有者の確認、シナリオの確認、EWS 操作と Microsoft Graph エンドポイントへのマッピング、完全移行まで進捗を追跡します。

実際には、まず管理センターのレポートを使用して*何の* EWS 操作が、どの規模で発生しているかを把握してから、スクリプトを使用して*どの*アプリがそれらの操作を行っているのか、*誰が*そのアプリを所有しているか、*そのアプリが現在もアクティブか*、そして*どの*メールボックス/ライセンスのユーザーが最初に影響を受ける可能性が高いかを特定します。

WW (Worldwide) 以外のクラウドを使用しているテナントの場合、管理センターのレポートは使用できないため、スクリプトに大きく依存することになります。

### 手順: スクリプトの実行とレポートの生成

#### 1) コードのダウンロード

このソリューションのリポジトリは[こちら](https://github.com/jmartinmsft/Exchange-App-Usage-Reporting/archive/refs/heads/main.zip)から取得できます。

注: このアプリケーションには、以下のアクセス権限が必要です:

- **AuditLogsQuery.ReadAll** - EWS アクティビティの監査ログを照会するため
- **Application.Read.All** - アプリを特定するため
- **AuditLogs.Read.All** - サインイン アクティビティを照会するため
- **Directory.Read.All** - ユーザー ライセンス情報を照会するため

#### 2) アクティブなアプリケーションの取得

PowerShell セッションを開き、スクリプトをダウンロードしたフォルダーに移動します。実行前に、必要に応じて (例えば、*Unblock-File* を使用して) ファイルのブロックを解除してください。その後、次のサンプル構文でスクリプトを実行します。

```PowerShell
.\Find-EwsUsage.ps1 -OutputPath C:\Temp\Output -OAuthCertificate 8865BEC624B02FA0DE9586D13186ABC8BE265917 -CertificateStore CurrentUser -OAuthClientId 7a305061-1343-49c3-a469-378de4dbd90d -OAuthTenantId 9101fc97-5be5-4438-a1d7-83e051e52057 -PermissionType Application -Operation GetEwsActivity
 ```

出力結果には、EWS 権限を持つアプリケーションと、関連するサービス プリンシパルの最後のサインイン情報が一覧で表示されます。指定した出力パスに App-SignInActivity-yyyyMMddhhmm という名前の CSV ファイルが作成されます。

#### 3) アプリケーションのサインイン アクティビティの取得

前の手順での出力結果をもとに、アプリケーションのサインイン アクティビティを取得します（この手順はアプリケーションごとに実行する必要があります）。テナントの規模によっては、StartDate と EndDate を調整し、Interval を 1 時間に設定する必要がある場合もあります。

```PowerShell
.\Find-EwsUsage.ps1 -OutputPath C:\Temp\Output -OAuthCertificate 8865BEC624B02FA0DE9586D13186ABC8BE265917 -CertificateStore CurrentUser -OAuthClientId 7a305061-1343-49c3-a469-378de4dbd90d -OAuthTenantId 9101fc97-5be5-4438-a1d7-83e051e52057 -PermissionType Application -Operation GetAppUsage -QueryType SignInLogs -Name TJM-EWS-SoftDelete-Script -AppId 86277a5c-d649-46fc-8bf6-48e2a684624b -StartDate (Get-Date).AddDays(-30) -EndDate (Get-Date).AddDays(-14) -Interval 8
 ```

出力結果には、指定した出力パスで &lt;AppId&gt;-SignInEvents-yyyyMMddhhmm という名前の CSV ファイルが作成されます。

#### 4) ユーザー ライセンス情報の取得（Kiosk/Frontline の識別）

6 月に予定されている EWS アクセス制限によって影響を受ける可能性のあるユーザーを特定するため、ユーザー ライセンス レポートを生成することで、影響範囲を把握しやすくなります。このライセンス レポートの生成には、前の手順で得られた出力結果を使用できます。また、各アプリケーションごとの結果を含む複数の CSV ファイルを、1 つのユーザー ライセンス レポートにマージすることも可能です。

```PowerShell
.\Find-EwsUsage.ps1 -OutputPath C:\Temp\Output -OAuthCertificate 8865BEC624B02FA0DE9586D13186ABC8BE265917 -CertificateStore CurrentUser -OAuthClientId 7a305061-1343-49c3-a469-378de4dbd90d -OAuthTenantId 9101fc97-5be5-4438-a1d7-83e051e52057 -PermissionType Application -Operation GetUserLicenses -AppUsageSignInCsv C:\Temp\Output\86277a5c-d649-46fc-8bf6-48e2a684624b-SignInEvents-20260203122538.csv
 ```

#### 出力結果の見方と対応の優先順位付け

出力ファイルを取得したら、「last sign-in」でソートしてください。最近のアクティビティがあるアプリは、EWS がブロックされた際に本番環境のワークロードへ影響を及ぼす可能性が高いため、最優先で対応すべきです。一方で、サインイン データが存在しないアプリは、休止状態、構成ミス、または既にリタイアされた可能性があります。ただし、これらは「無視してよい」と判断するのではなく「要検証」として扱ってください。

1. **各アプリの所有者を特定**します（または、そのアプリと紐づく業務システムを特定します）。
2. **ワークロードを確認**します。メールボックスへのアクセス パターン (読み取り、送信、予定表、連絡先など) と、アプリケーション権限を使用しているか委任された権限を使用しているかを確認します。
3. **アプリがアクセスするメールボックスの構成を確認**します。特に、2026 年 6 月末に EWS アクセスができなくなる可能性のある Kiosk/Frontline ライセンスが割り当てられているメールボックスでないかを確認します。
4. **移行先を選定します**。Microsoft Graph API の同等機能や、サポートされている Exchange Online 機能、または EWS 依存を解消するためのベンダー側のアップグレードを検討します。

### Kiosk/Frontline Worker の EWS ブロックに注意（2026 年 6 月末）

推奨される検証プレイブック：

- スクリプト出力結果を利用して、現在も使用されている EWS アプリのショートリストを作成します。
- 各アプリについて、どのメールボックスにアクセスしているかを特定します（アプリケーション アクセス ポリシー、RBAC、サービス アカウント、共有メールボックス、またはユーザー層）。
- メールボックスに割り当てられているライセンスを突き合わせ、EWS 権限を含まない可能性のある Kiosk/Frontline SKU が含まれていないかを確認します。
- 管理されたテスト（可能であれば非本番環境）を実施し、その連携が当該メールボックスに対して EWS に依存しているか、またベンダーから Graph ベースの更新が提供されているかを確認します。
- 必要に応じて、特定のユーザーに対して別のライセンスを追加する必要があるかを評価します（例えば、2026 年 10 月の廃止まで EWS を引き続き使用できる Exchange Online Plan 1 または 2 を追加するなど）。

#### 対策オプション (EWS 依存が見つかった場合の対応策)

- **製品のアップグレードまたは再構成**: 多くのベンダーは既に Microsoft Graph に移行しています。ベンダーと連携し、Graph 移行に関するガイダンスとタイムラインを確認してください。
- **カスタム コードの改修**: EWS 操作 (メール、予定表、連絡先) を Microsoft Graph エンドポイントにマッピングし、認証フロー、スロットリング、権限を再テストします。マッピングの詳細については、[こちら](https://learn.microsoft.com/graph/migrate-exchange-web-services-api-mapping)をご覧ください。
- **影響範囲の最小化**: どうしても一時的にアプリを継続利用する必要がある場合は、最小権限の原則に基づいて権限を厳密に制限し、必要に応じて RBAC を用いてアクセス可能なメールボックスを限定してください。そのうえで、有効期限を設定した短期的な例外として扱います。

#### クイック チェックリスト
- Exchange-App-Usage-Reporting を実行し、直近 EWS のサインイン アクティビティがあるアプリを特定します。
- アプリの所有者を特定し、各アプリがアクセスしているメールボックス/ワークロードをドキュメント化します。
- 2026 年 6 月末に予定されているライセンス関連の EWS ブロックへの影響範囲を評価します (Kiosk/Frontline)。
- Microsoft Graph への移行を優先し、エンドツーエンドで機能することを検証します。
- 定期的にレポートを再実行し、EWS の使用状況がゼロに向かって減少していることを確認します。