# claude-poc-docs 向け指示（要件定義・設計書リポジトリ）

本リポジトリは配送マッチング Web アプリ（荷主×運送会社）の要件定義書・設計書を管理する。6 リポジトリ構成のドキュメントリポジトリであり、親（横断ルール）は claude-poc-rules。

## 正典の所在

- 開発フロー・ID/命名規約の正典は親リポジトリ（claude-poc-rules の CLAUDE.md / rules/cross-cutting.md）。CI からは参照できないため、必要最小限を本ファイルに転記している。矛盾時は親が正。
- 技術スタックの正典は実装リポジトリ（claude-poc-frontend / claude-poc-backend の `.claude/rules/`）。設計書にフレームワーク名・ライブラリ名・バージョンを再掲しない。

## 採択ゲート（最重要）

- **要件定義書・設計書の採択 = 本リポジトリ `main` への PR マージ**（人間のレビュー・マージのみが採択行為）。Claude・skill が自らマージしてはならない。
- `main` へのマージを契機に `create-issues-from-docs` workflow が後続 Issue（要件変更→設計書作成 Issue / 設計変更→実装 Issue）を自動起票する。
- 設計書作成の開始 = 人間が設計書作成 Issue に `@claude` とコメントすること。

## フェーズ分離

- 要件定義フェーズでは要件成果物のみ、設計フェーズでは設計成果物のみを作成する。設計時に要件の意思決定（業務ルール追加・画面新設・用語定義）を行わない。
- 成果物の配置: 要件 = `docs/requirements/`、設計 = `docs/design/`、テストマトリクス = `docs/test/`（製造フェーズ成果物）。
- 採用技術スタックの未確定項目がある場合は設計を中断し、人間に確認する（既定値による補完の禁止）。

## ID・凡例（親からの転記・最小限）

- ID は「英字プレフィックス + 3 桁ゼロ埋め連番」（SCR / UC / ACT / AC / BR / ENT / ST / EXT / MIG / MSG / SEQ / TC / IT / E2E）。
- ID・略号を導入する文書は冒頭付近に凡例（略号一覧表）を必ず置き、新規略号追加時に凡例も更新する。
- 図は Mermaid を用いる（画面遷移 `flowchart` / ER `erDiagram` / 状態遷移 `stateDiagram-v2` / シーケンス `sequenceDiagram`）。

## 共通ルール

- 応答・成果物・作業ログは日本語で記述する。
- 本 CLAUDE.md と `.claude/rules/` は編集禁止（protect-canon フック。変更は人手で行う）。
- E2E は凍結中（AWS 環境構築後に claude-poc-e2e で実施）。
