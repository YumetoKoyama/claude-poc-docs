# UI 設計ブリーフ索引

`docs/design/screens/` の各画面について、Claude Design（claude.ai/design）投入用のブリーフをここに置く。設計書本体（`docs/design/screens/` 等）は書き換えていない。

> **採択ゲートに関する注記**: 本ブリーフの入力である `docs/design/`（設計書一式）は `.skills-state/design/state.json` により design-loop が `passed=true`（BLOCK=0・SUGGEST=0、2026-07-14 時点、iteration 3）であることを確認済みだが、**ループの `passed=true` は採択ではない**（CLAUDE.md）。採択は本リポジトリ（`claude-poc-docs`）の `main` への PR マージによってのみ成立する。本ブリーフ作成時点で、対象ブランチ `feat/design-matching-demo`（PR #3, base: `main`）が `main` にマージ済みかどうかは、本セッションの実行環境ではネットワーク／Git 到達性の制約により機械的に確認できなかった。**Claude Design への投入前に、PR #3 が `main` にマージ済みであることを人手で確認すること。**

## ファイル構成

```
docs/design/ui-design/brief/
├── README.md                              ← この索引
├── _共通.md                               ← 共通ブリーフ（Claude Design に最初に投入）
├── SCR-001-ログイン.md
├── SCR-002-企業アカウント登録.md
├── SCR-003-パスワードリセット申請.md
├── SCR-004-パスワードリセット再設定.md
├── SCR-005-ユーザー追加.md
├── SCR-006-配送依頼企業ダッシュボード.md
├── SCR-007-案件登録.md
├── SCR-008-案件一覧-配送依頼企業.md
├── SCR-009-案件詳細-配送依頼企業.md
├── SCR-009-01-セット応募連動確認モーダル.md
├── SCR-010-評価登録-配送依頼企業.md
├── SCR-011-取引履歴一覧-配送依頼企業.md
├── SCR-012-通知一覧.md
├── SCR-013-運送会社ダッシュボード.md
├── SCR-014-募集中案件一覧-運送会社.md
├── SCR-015-案件詳細-運送会社.md
├── SCR-015-01-セット応募選択モーダル.md
├── SCR-016-交渉中済一覧-運送会社.md
├── SCR-017-評価登録-運送会社.md
├── SCR-018-取引履歴一覧-運送会社.md
└── SCR-019-工事中.md                       ← 画面ごとに1ファイル（共通ブリーフからの差分のみ）
```

## 画面 ID とブリーフの対応

| 画面 ID | 画面名 | ロール | ブリーフ | 状態 |
|--------|------|------|---------|------|
| SCR-001 | ログイン | 未認証 | [SCR-001-ログイン.md](SCR-001-ログイン.md) | draft |
| SCR-002 | 企業アカウント登録 | 未認証 | [SCR-002-企業アカウント登録.md](SCR-002-企業アカウント登録.md) | draft |
| SCR-003 | パスワードリセット申請 | 未認証 | [SCR-003-パスワードリセット申請.md](SCR-003-パスワードリセット申請.md) | draft |
| SCR-004 | パスワードリセット再設定 | 未認証 | [SCR-004-パスワードリセット再設定.md](SCR-004-パスワードリセット再設定.md) | draft |
| SCR-005 | ユーザー追加 | 共通 | [SCR-005-ユーザー追加.md](SCR-005-ユーザー追加.md) | draft |
| SCR-006 | 配送依頼企業ダッシュボード | REQUESTER | [SCR-006-配送依頼企業ダッシュボード.md](SCR-006-配送依頼企業ダッシュボード.md) | draft |
| SCR-007 | 案件登録 | REQUESTER | [SCR-007-案件登録.md](SCR-007-案件登録.md) | draft |
| SCR-008 | 案件一覧（配送依頼企業） | REQUESTER | [SCR-008-案件一覧-配送依頼企業.md](SCR-008-案件一覧-配送依頼企業.md) | draft |
| SCR-009 | 案件詳細（配送依頼企業） | REQUESTER | [SCR-009-案件詳細-配送依頼企業.md](SCR-009-案件詳細-配送依頼企業.md) | draft |
| SCR-009-01 | セット応募連動確認モーダル | REQUESTER | [SCR-009-01-セット応募連動確認モーダル.md](SCR-009-01-セット応募連動確認モーダル.md) | draft |
| SCR-010 | 評価登録（配送依頼企業） | REQUESTER | [SCR-010-評価登録-配送依頼企業.md](SCR-010-評価登録-配送依頼企業.md) | draft |
| SCR-011 | 取引履歴一覧（配送依頼企業） | REQUESTER | [SCR-011-取引履歴一覧-配送依頼企業.md](SCR-011-取引履歴一覧-配送依頼企業.md) | draft |
| SCR-012 | 通知一覧 | 共通 | [SCR-012-通知一覧.md](SCR-012-通知一覧.md) | draft |
| SCR-013 | 運送会社ダッシュボード | CARRIER | [SCR-013-運送会社ダッシュボード.md](SCR-013-運送会社ダッシュボード.md) | draft |
| SCR-014 | 募集中案件一覧（運送会社） | CARRIER | [SCR-014-募集中案件一覧-運送会社.md](SCR-014-募集中案件一覧-運送会社.md) | draft |
| SCR-015 | 案件詳細（運送会社） | CARRIER | [SCR-015-案件詳細-運送会社.md](SCR-015-案件詳細-運送会社.md) | draft |
| SCR-015-01 | セット応募選択モーダル | CARRIER | [SCR-015-01-セット応募選択モーダル.md](SCR-015-01-セット応募選択モーダル.md) | draft |
| SCR-016 | 交渉中・済一覧（運送会社） | CARRIER | [SCR-016-交渉中済一覧-運送会社.md](SCR-016-交渉中済一覧-運送会社.md) | draft |
| SCR-017 | 評価登録（運送会社） | CARRIER | [SCR-017-評価登録-運送会社.md](SCR-017-評価登録-運送会社.md) | draft |
| SCR-018 | 取引履歴一覧（運送会社） | CARRIER | [SCR-018-取引履歴一覧-運送会社.md](SCR-018-取引履歴一覧-運送会社.md) | draft |
| SCR-019 | 工事中（問い合わせ案内） | 共通 | [SCR-019-工事中.md](SCR-019-工事中.md) | draft |

## Claude Design 投入手順（順序固定）

1. claude.ai/design でプロジェクトを新規作成する。
2. **最初に `_共通.md` を添付** し、その末尾の「Claude Design 投入用プロンプト（共通投入時）」をチャットに貼る。Claude Design がデザインシステム方針（カラーパレット・タイポグラフィ等、`_共通.md` で未指定の項目を含む）を提案するまで待つ。
3. **画面別ブリーフ（`SCR-*.md`）を一括で（または役割/カテゴリ単位で）添付** し、「これらの画面を上記 DS で生成してください」と依頼する。ロール単位でまとめる場合は「未認証系（SCR-001〜004）」「配送依頼企業系（SCR-005〜012, 019）」「運送会社系（SCR-005, 012〜019）」の3グループが目安（SCR-005/012/019 は両ロール共通のため両グループに含める）。
4. 生成結果を確認し、必要に応じて対話で調整する。
5. Export → **Handoff bundle** を取得し、**Export 構造そのまま** `docs/design/ui-design/handoff/` 配下に格納する（このディレクトリ作成と格納は人手で実施）。
6. handoff bundle の `README.md` にある画面 ID → prototype 関数のマッピング表が、後続の `/reconcile-handoff-with-design` → `/create-issues-from-design` の入力となる。

## ui-design/handoff の格納ルール（重要）

Claude Design の Export 物は **Export 構造そのまま** で格納すること。画面単位 (`[scr-id]/`) で切り分けない。

```
docs/design/ui-design/handoff/
├── README.md              ← Export の README（scr-id → prototype 関数のマッピング表を含む）
├── prototype/
│   ├── index.html
│   ├── wf-primitives.jsx       ← 共通プリミティブ（横断的共有資産）
│   ├── wf-shell.jsx            ← AppHeader / GlobalNav（横断的共有資産）
│   ├── wf-screens-auth.jsx     ← 認証系画面群（複数 SCR が同居）
│   ├── wf-screens-requester.jsx
│   ├── wf-screens-carrier.jsx
│   └── ...                     ← カテゴリ単位の jsx
└── tokens/
    ├── colors_and_type.css
    └── DESIGN_SYSTEM_GUIDE.md
```

`prototype/` 配下を人手で画面単位に分割してはいけない。共通プリミティブ・シェル・トークンは横断的共有資産であり、画面 ID 単位に分割すると同期地獄になる。画面 ID と prototype 関数の対応は `ui-design/handoff/README.md` のマッピング表が Source of Truth。

## デザインシステムの優先順位

- Claude Design 側に組織デザインシステムが構築されている場合 → そちらを優先。
- 構築されていない、または上書きが必要な場合 → `_共通.md` の値（トーン・コンポーネント振る舞い・状態規約・レスポンシブ方針）を共通ブリーフ投入時に明示し、Claude Design にも貼り込む。カラーパレット・タイポグラフィ等の詳細トークンは `_共通.md` 未確定事項のとおり未指定のため、Claude Design の提案を起点に対話的に決定する。

## 要件定義側へのフィードバック（`ブランドガイドライン.md` の未整備項目）

`docs/requirements/ブランドガイドライン.md` は Q-BR1 のクローズを受けた人手確認前提のドラフトであり、以下の項目が「未指定」のまま残っている（`_共通.md` 10節「未確定事項（全体）」と同一）。Claude Design での UI 生成・採択後、`/reflect-handoff-to-brand` で採択されたデザインシステム決定を `ブランドガイドライン.md` へ逆反映することを推奨する:

- カラーパレット（HEX 値等の詳細トーン）
- タイポグラフィ（フォントファミリ・スケール）
- スペーシング・角丸・シャドウ・フォーカスリングのスケール
- アイコンライブラリ
- 絵文字使用可否・アニメーション/モーション規約
- Loading 状態・権限不足時の既定コピー文言
- ボタン命名規則・コンポーネント命名規約の明文化

## このブリーフ作成時点での既知の制約

- `docs/requirements/ブランドガイドライン.md` は第1版がデスクトップ PC ブラウザ専用（1280px以上）でレスポンシブ非対応と明記している。画面別ブリーフでは個別にレスポンシブ方針を記述していない（共通ブリーフ7節に統一）。
- 全19画面（うちモーダル2画面 SCR-009-01, SCR-015-01）の設計書を入力としている。設計書に記載のない UI 仕様（Loading 表示・ホバー挙動等）は各画面ブリーフの「9. 強調したい点」または `_共通.md` の「未確定事項」に切り出し、新たに決定していない。
