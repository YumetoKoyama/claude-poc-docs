---
name: create-issues-from-docs
description: mainブランチにマージされた設計書（形式・内容を問わない）を解析し、適切なリポジトリへ機能・層単位のIssueを自動作成する。ラベル付与・GitHub Projectへの紐づけ・コンフリクト回避のための親子Issue構造化も行う。
---

# 設計書から Issue を作成する

> **パス解決（マルチリポジトリ対応）**: 本スキル内の `docs/requirements/`・`docs/design/`・`docs/test/` は **docs リポジトリ（claude-poc-docs）ルート相対**のパスを指す。
> - docs リポジトリをカレントとして実行している場合: そのまま使う。
> - 親アンブレラ（claude-poc-rules）から実行している場合（カレント直下に `claude-poc-docs/` が存在する場合）: これらすべてのパスに `claude-poc-docs/` を前置して読み書きする。
> - CI（子リポジトリ単体のチェックアウト）で docs リポジトリが存在しない場合: workflow が追加チェックアウトした docs のパスを使う。それも無い場合は Issue 本文に埋め込まれた設計情報を入力とし、原本の参照が必要なら中断して人間に確認する。

このスキルは `create-issues-from-docs.yml` ワークフローから呼び出される。
どんな形式・内容の設計書が来ても対応できるように、AI が内容を解析して Issue を起票する。

## 前提条件

- `gh` CLI が認証済みであること（`GH_TOKEN` 環境変数に PAT が設定済み）
- PAT のスコープ: `repo`（Issue 作成）・`project`（Project 操作）・`read:org`（org 情報取得）
- Issue 作成先の各リポジトリが存在していること
- 連携先の GitHub Project が存在していること

---

## Issue 本文の @ メンション抑止（必須）

GitHub は Issue 本文中の `@名前` を自動的にユーザー / チームへのメンションへ変換し、無関係なアカウントへ通知が飛ぶ。Issue 本文・コメントに `@` で始まるトークンを書くときは、**必ずインラインコード（バッククォート）で囲んでメンション化を防ぐ**。

- 対象例: npm スコープパッケージ（`@playwright/test`・`@reduxjs/toolkit`・`@types/node` 等）、Java アノテーション（`@PreAuthorize`・`@Service` 等）、その他 `@` で始まる識別子。
- NG: 「@playwright/test を使う」のように地の文に裸で書く（メンション化される）。
- OK: 「`@playwright/test` を使う」のようにバッククォートで囲む。
- すでにフェンス付きコードブロックや YAML / コード片の中にある `@` は変換されないため、追加対応は不要。
- 例外: 実装開始トリガーとして人間が投稿する `@claude` コメントは対象外（Issue 本文には書かない）。

## 実行手順（概要）

以下の順序で各参照ファイルを読み込みながら実行する。

**変更されたドキュメントの種別によってフローが分岐する。**

```
docs/requirements/ が変更された場合
  → 設計書作成 Issue を起票（ステップ 2-0 → ステップ 5-0）

docs/design/ が変更された場合
  → バックエンド・フロントエンド・バッチ Issue を起票（ステップ 2-0 → ステップ 2〜8）
```

| ステップ | 内容 | 参照ファイル |
|---------|------|------------|
| 1 | 実行コンテキストの確認 | 本ファイル参照 |
| 2-0 | 変更ドキュメントの種別判定・フロー分岐 | `references/01-analyze.md` |
| 2〜3 | ドキュメント解析・コンフリクトリスク評価（設計書変更時のみ） | `references/01-analyze.md` |
| 4 | ラベルの準備（設計書変更時のみ） | `references/02-labels.md` |
| 5-0 | 設計書作成 Issue の作成（要件定義書変更時のみ） | `references/03-create-issues.md` |
| 4-A | 画面 Issue への ui-design/handoff 参照の準備（設計書変更時のみ） | `references/03-create-issues.md` |
| 5〜6-1 | Issue の作成（共通部品・通常機能）（設計書変更時のみ） | `references/06-create-issues-feature.md` |
| 6-2 | 親子 Issue の作成（コンフリクトリスクあり）（設計書変更時のみ） | `references/04-parent-child.md` |
| 7〜8 | Project 紐づけ・完了報告 | `references/05-finalize.md` |

---

## ステップ 1: 実行コンテキストの確認

プロンプトから以下の情報を読み取り、内部メモに整理する。

- 変更されたドキュメントのパス一覧
- Issue 作成先オーナー（org 名またはユーザー名）
- GitHub Project 番号・オーナー

確認後、`.claude/skills/create-issues-from-docs/references/01-analyze.md` を読み込んで
ステップ 2〜3 を実行する。

---

## 完了条件

- 変更されたすべてのドキュメントが解析されている
- 各ドキュメントの機能・コンポーネントが機能単位または層単位で Issue 化されている
- 共通部品が独立した Issue として切り出され、最初に作成されている
- コンフリクトリスクがある項目が親子 Issue 構造で表現されている
- すべての Issue に適切なラベルが設定されている
- すべての Issue が GitHub Project に紐づけられている
- 未確定事項がある Issue に `status:needs-discussion` ラベルと説明が記載されている

## 注意事項

- **重複検出あり（タイトル完全一致のみ）:** ステップ 3-0 でタイトル完全一致の既存 Issue を検出した場合は新規起票せずコメント追記に切り替える。ただし近似一致（表記揺れ等）は検出対象外のため、同一機能のタイトル表記が揺れると重複が生じる。再実行前に Issue タイトルの表記を統一しておくこと。
- **GitHub API レート制限:** Issue を大量作成する場合は `sleep 1` 等で間隔を空けること。
- **`--force` フラグ:** ラベル作成時に `--force` を使うと既存ラベルの色・説明が上書きされる。
  意図しない上書きを防ぎたい場合は `gh label list` で事前確認してから外すこと。
- **PAT のスコープ:** `GITHUB_TOKEN` はデフォルトで Project 操作ができない場合がある。
  `CLAUDE_GITHUB_PAT` に `project` スコープを付与すること。
