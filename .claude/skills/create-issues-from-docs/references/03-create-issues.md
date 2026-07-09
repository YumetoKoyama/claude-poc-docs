# ステップ 5-0 / 4-A: Issue 作成の準備

> **メンション抑止**: Issue 本文に `@` で始まるトークン（npm スコープパッケージ・Java アノテーション等）を書くときは、メンション化と誤通知を防ぐため必ずバッククォートで囲む（例: `@playwright/test`）。コードブロック / YAML 内の `@` は対象外。

---

## ステップ 5-0: 設計書作成 Issue の起票（要件定義書変更時のみ）

`docs/requirements/` に変更があった場合にのみ実行する。
変更された要件定義書をもとに、設計書作成作業を依頼する Issue を 1 件起票する。
起票後はステップ 7〜8（Project 紐づけ・完了報告）へ進み、ステップ 5 以降はスキップする。

```bash
gh issue create \
  --repo "<オーナー>/claude-poc-docs" \
  --title "[設計書] <要件定義書の主要変更内容>の設計書作成" \
  --body "$(cat <<'EOF'
## 概要
要件定義書の変更を受けて、設計書を作成・更新する。
`/design-loop <この Issue の番号>` スキル（produce → review → fix の自動ループ。produce 段は `/design-from-issue` が本 Issue から対象要件定義書を解決する）で実施すること。

## 変更された要件定義書
- `<変更ファイルパス1>`
- `<変更ファイルパス2>`

## 実施手順
1. `claude-poc-docs` リポジトリで feature ブランチ（例: `feature/design-<内容>`）を作成する
2. `/design-loop <この Issue の番号>` を実行する（produce 段の `/design-from-issue` が本 Issue の「変更された要件定義書」を入力として `docs/design/` 配下に設計書を生成し、review → fix が自動で回る）
3. 生成物をコミット・push し、PR を作成する（CI で実施する場合はここまで Claude が行う）
4. 人手レビュー後、`claude-poc-docs` の main ブランチへマージする（**マージ＝採択**。マージ後に実装 Issue が自動起票される）

## 受け入れ条件
- [ ] `docs/design/` 配下に設計書が出力されている
- [ ] 人手レビューで採択済みである
- [ ] main ブランチへマージ済みである

## 参照元ドキュメント
- `<変更ファイルパス1>`
- `<変更ファイルパス2>`

## 依存する Issue
なし
EOF
)" \
  --label "type:feature,priority:high"
```

> **補足:** Issue 作成先は設計書を管理している `claude-poc-docs` リポジトリとする。
> 重複検出（ステップ 3-0）でタイトル完全一致が見つかった場合は `gh issue comment` で変更点を追記すること。

---

## ステップ 4-A: 画面 Issue への ui-design/handoff 参照の準備（設計書変更時のみ）

ステップ 2-1-A で handoff ありと記録した場合、画面 Issue（`[SCR-XXX]` タイトル）の本文に以下の「UI 参照」セクションを追加する。  
handoff なしの場合はこのセクションを省略し、画面 Issue 本文の冒頭に「UI 設計は Claude Design 未使用。設計 md の Layout / Content を直接実装する」と明記する。

**handoff ありの場合に埋め込む UI 参照セクション:**

```markdown
## UI 参照（Claude Design Handoff）

- Handoff README: `docs/design/ui-design/handoff/README.md`
- 採用案: <A案 / B案 / 単一案>（README のマッピング表より）
- Prototype 参照: `docs/design/ui-design/handoff/prototype/<file>.jsx :: <FuncName>`
- DS トークン: `docs/design/ui-design/handoff/tokens/colors_and_type.css`（CSS 変数を直接参照、hex 直書き禁止）
- 共通プリミティブ: `docs/design/ui-design/handoff/prototype/wf-primitives.jsx`（既に再実装済みなら再利用）
- 共通シェル: `docs/design/ui-design/handoff/prototype/wf-shell.jsx`

実装時の注意:
- prototype/*.jsx は **デザイン参照用のモック** であり、そのまま本番にコピーしない。
  対象コードベース（React + TypeScript 等）の規約・ライブラリに合わせて **再実装** する。
- カラー・タイポ・スペーシングは `tokens/colors_and_type.css` の CSS 変数を介して参照し、
  hex 値の直書きは禁止する。
- 共通プリミティブとシェルは画面横断資産。最初に着手する画面 Issue で実装し、
  以後の画面 Issue では再利用する。
```

`<file>` と `<FuncName>` は、ステップ 2-1-A で作成した `scr_id -> { file, func }` 対応表から該当 SCR-XXX のエントリを引用して埋める。

---

## 次のステップ

`.claude/skills/create-issues-from-docs/references/06-create-issues-feature.md` を読み込んでステップ 5〜6-1 を実行する。
