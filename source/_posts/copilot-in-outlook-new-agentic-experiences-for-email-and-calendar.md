---
title: "Copilot in Outlook：メールと予定表の新しいエージェント体験"
date: 2026/03/12 10:00:00
tags: 
- New Outlook
- Copilot
---

※ この記事は、[Copilot in Outlook: New agentic experiences for email and calendar](https://techcommunity.microsoft.com/blog/outlook/copilot-in-outlook-new-agentic-experiences-for-email-and-calendar/4499798) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。

Microsoft 365 Copilot は、単発の指示に応答するタスク実行型のエクスペリエンスから、業務用アプリに組み込まれたエージェント型エクスペリエンスへシフトしています。Outlook では、Copilot がメールや予定表において、コンテキストを失ったり余計な操作を増やしたりすることなく、ユーザーの要件をそのまま実行へとつなぐことをサポートします。

Copilot in Outlook は Work IQ に基盤に、関連するメール、会議、予定表の利用傾向、ならびにそれらの関係性を活用することで、仕事を効率的に進められるよう支援します。また、変更は Outlook 内で直接行われるため、内容を確認・見直ししながら、簡単に改善を重ねることができます。[**今すぐ Copilot in Outlook を試す**](https://demos.microsoft.com/Microsoft/play/5875/march-moment-agent-apps#/0/1)。

# Copilot と協働して、送信案を送信可能なメールに仕上げる 

Copilot in Outlook はメールの下書き作成から推敲までをユーザーと協働して担うことができるようになりました。ユーザーの送信案を起点に、送信可能なメールへと仕上げるまでを支援します。送信したい内容を伝えるだけで、Copilot はメールの構成や表現を整えていきます。 

### Outlook : Copilot がメールを直接作成と更新

<iframe width="100%" height="480" src="https://medius.microsoft.com/Embed/video-nc/c4a3c785-cee9-47bf-a778-f5772f714351?r=213267444131" title="Edit with Copilot in Outlook" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>

<div style="text-align: center;">
<i>デモ用のため、一部を省略しています。</i>
</div>

Copilot in Outlook は、メール本文に最初の下書きを直接作成し、その後もユーザーと対話しながら内容を仕上げていきます。1 回限りの下書き生成ではなく、Copilot はその場で下書きを作成し、目的、対象者、トーンといった確認事項をユーザーと確認しながら、その回答に応じて下書きのメールを随時更新します。これにより、数回の簡単なやり取りで内容を調整し、送信できる状態まで仕上げることができます。すべての変更は Outlook で確認でき、コピー&ペーストや書式崩れの心配もありません。

**プロンプト例:**
- **最初の下書きを作成:** */meeting で決定した内容を /name に確認し、合意されたスケジュールの詳細を含めたうえで、/name に最終承認を依頼するメールの下書きを作成してください。*

- **トーンと分かりやすさを調整:** *文書をより簡潔でプロフェッショナルな表現にし、/name が普段と同じトーンで合わせます。また、冒頭に最新のリーダーシップの決定をまとめた短い背景説明の段落を追加してください。*

- **仕上げと書式調整:** *承認依頼の箇所を太字にし、タイムラインをリストから表形式に変更し、件名行に「承認が必要」を追加してください。*

**提供開始時期:** 3 月 9 日より、Windows、Web、モバイル向けの新しい Outlook エクスペリエンスを順次展開します。

### Copilot Chat：メールを下書きから編集・送信まで一括で処理

<iframe width="100%" height="480" src="https://medius.microsoft.com/Embed/video-nc/958d9627-c6dd-4d3c-bb64-9bf34d6c9282?r=795274938405" title="Email From Chat" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>

<div style="text-align: center;">
<i>デモ用のため、一部を省略しています。</i>
</div>

Copilot Chat では、リクエストからメール送信まで一括で対応できます。Copilot に送信したい内容を伝え、その場で下書きを修正しながら、送信まで行えます。その際、Work IQ が適切なコンテキスト（宛先、スレッド履歴、会議の決定事項）を取り込み、内容に根拠がある、最終確認に適したメッセージへ整えます。

**プロンプト例:**

- **最初の下書きを作成:** */meeting から決定した内容をフォローアップし、/name と /name 宛に次のステップをまとめたメールの下書きを作成してください。*

- **トーンと分かりやすさを調整:** *このメールをより簡潔でエグゼクティブ向けに書き直してください。最初の 2 行に依頼事項を記載してください。*

**提供開始時期:** 3 月 9 日より 先行リリース対象のユーザー向けに順次展開します。

# Copilot にスケジュール管理や予定表のタスクを任せる

Copilot in Outlook は、予定表の変化に応じてユーザーの要件を引き継ぎ、継続的な作業を代行できるようになりました。出欠 (RSVP) の管理や会議の登録など、必要な作業をチャットで Copilot に伝えるだけで、これらを管理する作業を代行します。

### Outlook: Copilot がユーザーの利用傾向に基づいて予定表を管理

<iframe width="100%" height="480" src="https://medius.microsoft.com/Embed/video-nc/fdf3ec84-dd92-44a7-b288-2b863741c613?r=953520227637" title="Custom Instructions" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>

<div style="text-align: center;">
<i>デモ用のため、一部を省略しています。</i>
</div>

会議出席依頼が次々と届き、出欠 (RSVP) の判断も繰り返されます。カスタム指示を使用すれば、Copilot が出欠対応を代行できます。開催者、会議タイトルのキーワード、勤務時間といった利用傾向に基づいて、承諾、辞退、フォローを自動で判断しつつ、状況の変化はユーザーに通知します。その結果、予定表を整理する手間が減り、スケジュールが常に優先事項に沿った状態に保たれます。

### Copilot Chat：チャットから予定表を離れずに会議をスケジュール

会議をカレンダーに追加する必要がある場合、調整が課題になります。Copilot Chat では、会議のリクエストを伝えるだけで、Copilot が日程調整（参加者の空き時間、時間帯オプション、招待状の詳細）を処理し、各オプションが Outlook カレンダー上にどのように配置されるかを表示します。これにより、最適な時間帯を確認して決定できます。

**プロンプト例：**

- **優先事項に沿って時間を調整:** *マネージャーからの会議は、自分が空いていれば常に承諾してください。*

- **不要な予定を削減:** *件名に「office hours」を含む会議は常に辞退し、キャンセルされた会議を削除してください。*

- **個人の時間を守る:** *午後 5 時以降にスケジュールされた会議をフォローしてください。*

**提供開始時期:** Windows、Mac、Web、モバイル向けの新しい Outlook エクスペリエンスを現在利用可能です。

### Copilot Chat：チャット内で会議の調整から送付まで簡潔 

<iframe width="100%" height="480" src="https://medius.microsoft.com/Embed/video-nc/96c4e2af-027d-414e-bdd0-4b8c8f7c2b04?r=1004538541110" title="Schedule From Chat" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>

<div style="text-align: center;">
<i>デモ用のため、一部を省略しています。</i>
</div>

会議を開催する場合、実は一番の負担になるのが調整作業です。Copilot Chat では、会議のリクエストを伝えるだけで、Copilot が日程調整（参加者の空き時間、時間帯、出席依頼の詳細内容）を処理し、それぞれの候補が Outlook 予定表上にどのように配置されるかを示してくれるため、最も都合の良い選択肢を判断します。

**プロンプト例:**

- **空き時間を確認:** *[名前1]、[名前2]、[名前3] と会議できる次の利用可能な時間帯を探してください。*

- **会議をスケジュール:** *来週、/name1、/name2、/name3 と Project X の展開計画を決定するために 30 分間の会議を設定してください。会議室を予約し、アジェンダを含めてください。*

**提供開始時期:** 現在、すべての Microsoft 365 Copilot および Outlook エンドポイントにおいて、英語環境で利用可能です。