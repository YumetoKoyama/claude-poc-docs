# 配送マッチング BtoB — UI Design Handoff Bundle

Claude Design（本プロジェクト）から出力した Handoff bundle。`prototype/` は共通コンポーネント・共通シェル・カテゴリ単位の画面 jsx（横断的共有資産）で構成され、`tokens/` にデザイントークン（CSS変数）と DS ガイドを収録している。

## 使い方

`prototype/index.html` をブラウザで直接開くとインタラクティブなプロトタイプが確認できる（サイドバーから全19画面 + モーダル2画面を切替表示）。ローカルサーバー不要（自己完結）。

## 画面 ID → prototype 関数のマッピング表（Source of Truth）

| 画面 ID | 画面名 | ロール | 関数 | ファイル |
|---|---|---|---|---|
| SCR-001 | ログイン | 未認証 | `LoginScreen` | `prototype/wf-screens-auth.jsx` |
| SCR-002 | 企業アカウント登録 | 未認証 | `SignUpScreen` | `prototype/wf-screens-auth.jsx` |
| SCR-003 | パスワードリセット申請 | 未認証 | `ResetRequestScreen` | `prototype/wf-screens-auth.jsx` |
| SCR-004 | パスワードリセット再設定 | 未認証 | `ResetConfirmScreen` | `prototype/wf-screens-auth.jsx` |
| SCR-005 | ユーザー追加 | 共通 | `UserAddScreen` | `prototype/wf-screens-shared.jsx` |
| SCR-006 | 配送依頼企業ダッシュボード | REQUESTER | `RequesterDashboardScreen` | `prototype/wf-screens-requester.jsx` |
| SCR-007 | 案件登録 | REQUESTER | `JobRegisterScreen` | `prototype/wf-screens-requester.jsx` |
| SCR-008 | 案件一覧（配送依頼企業） | REQUESTER | `JobListScreen` | `prototype/wf-screens-requester.jsx` |
| SCR-009 | 案件詳細（配送依頼企業） | REQUESTER | `RequesterJobDetailScreen` | `prototype/wf-screens-requester.jsx` |
| SCR-009-01 | セット応募連動確認モーダル | REQUESTER | `RequesterJobDetailScreen`（`initialModalOpen={true}`） | `prototype/wf-screens-requester.jsx` |
| SCR-010 | 評価登録（配送依頼企業） | REQUESTER | `RequesterRatingScreen` | `prototype/wf-screens-requester.jsx` |
| SCR-011 | 取引履歴一覧（配送依頼企業） | REQUESTER | `RequesterHistoryScreen` | `prototype/wf-screens-requester.jsx` |
| SCR-012 | 通知一覧 | 共通 | `NotificationsScreen` | `prototype/wf-screens-shared.jsx` |
| SCR-013 | 運送会社ダッシュボード | CARRIER | `CarrierDashboardScreen` | `prototype/wf-screens-carrier.jsx` |
| SCR-014 | 募集中案件一覧（運送会社） | CARRIER | `CarrierJobOpenListScreen` | `prototype/wf-screens-carrier.jsx` |
| SCR-015 | 案件詳細（運送会社） | CARRIER | `CarrierJobDetailScreen` | `prototype/wf-screens-carrier.jsx` |
| SCR-015-01 | セット応募選択モーダル | CARRIER | `CarrierJobDetailScreen`（`initialModalOpen={true}`） | `prototype/wf-screens-carrier.jsx` |
| SCR-016 | 交渉中・済一覧（運送会社） | CARRIER | `CarrierNegotiatingListScreen` | `prototype/wf-screens-carrier.jsx` |
| SCR-017 | 評価登録（運送会社） | CARRIER | `CarrierRatingScreen` | `prototype/wf-screens-carrier.jsx` |
| SCR-018 | 取引履歴一覧（運送会社） | CARRIER | `CarrierHistoryScreen` | `prototype/wf-screens-carrier.jsx` |
| SCR-019 | 工事中 | 共通 | `UnderConstructionScreen` | `prototype/wf-screens-shared.jsx` |

## ファイル構成

```
handoff/
├── README.md                    ← この索引（マッピング表 = Source of Truth）
├── prototype/
│   ├── index.html                ← インタラクティブ確認用（自己完結・サーバー不要）
│   ├── wf-primitives.jsx         ← 共通プリミティブ（AppHeader/GlobalNav/Button/Field/Modal/Table/StatusBadge/Tag/Card/Panel/Toast/Pagination）
│   ├── wf-shell.jsx              ← AppHeader + GlobalNav を束ねた共通シェル（Shell / PageHeading）
│   ├── wf-screens-auth.jsx       ← 認証系画面群（SCR-001〜004）
│   ├── wf-screens-shared.jsx     ← 両ロール共通画面群（SCR-005, 012, 019）※ 元 README には無いカテゴリの追加
│   ├── wf-screens-requester.jsx  ← 配送依頼企業系画面群（SCR-006〜011）
│   └── wf-screens-carrier.jsx    ← 運送会社系画面群（SCR-013〜018）
└── tokens/
    ├── colors_and_type.css       ← カラーパレット・タイポグラフィのCSS変数
    ├── spacing.css / radius.css / shadow.css / layout.css / base.css
    └── DESIGN_SYSTEM_GUIDE.md    ← デザインシステム方針（本文書の詳細版）
```

## 注記

- `wf-screens-shared.jsx` は元の索引（未認証／配送依頼企業系／運送会社系の3グループ）に無い区分だが、SCR-005・012・019 が両ロール共通のため独立カテゴリとして切り出した（意図的な追加）。
- モーダル画面（SCR-009-01, SCR-015-01）は独立コンポーネントではなく、対応する親画面コンポーネントに `initialModalOpen` prop を渡すことで表示する。
- カラーパレット・タイポグラフィ等の詳細トークンは初期提案であり、`DESIGN_SYSTEM_GUIDE.md`「未確定事項・要確認」の通り人手での最終確認が必要。
