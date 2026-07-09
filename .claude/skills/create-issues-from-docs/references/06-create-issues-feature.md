# ステップ 5〜6-1: Issue の作成（共通部品・通常機能）

> **メンション抑止**: Issue 本文に `@` で始まるトークン（npm スコープパッケージ・Java アノテーション等）を書くときは、メンション化と誤通知を防ぐため必ずバッククォートで囲む（例: `@playwright/test`）。コードブロック / YAML 内の `@` は対象外。

---

## ステップ 5: 共通部品 Issue の作成（最初に作成する）

共通部品は他の Issue から参照されるため、必ず最初に作成する。
作成後に返却される Issue URL を変数に保存し、後続 Issue の「依存する Issue」で参照する。

```bash
COMMON_URL=$(gh issue create \
  --repo "<オーナー>/<リポジトリ>" \
  --title "[共通] <共通部品の名称>" \
  --body "$(cat <<'EOF'
## 概要
<この共通部品の目的・用途・利用シーン>

## 対象ファイル（想定）
- `<ファイルパス>` - <役割・内容>

## 実装内容
- <実装項目1>
- <実装項目2>

## 参照元ドキュメント
- `<ドキュメントへの相対パス>`

## 依存する Issue
なし（他 Issue から参照されるため最初に実装する）

## 注意事項・未確定事項
<!-- ドキュメントで明示されていない点、設計上の不明点があれば記載 -->
<未確定事項がある場合はここに記載し status:needs-discussion ラベルも付与する>
EOF
)" \
  --label "type:common,priority:high")
  # --assignee "<GitHubユーザー名>"    # 担当者を設定する場合はコメントを外す
  # --milestone "<マイルストーン名>"   # マイルストーンを設定する場合はコメントを外す
echo "共通 Issue 作成: $COMMON_URL"
```

---

## ステップ 6-1: 通常 Issue の作成（コンフリクトリスクなし）

ステップ 3 で「コンフリクトリスクなし」と評価した機能・層ごとに繰り返す。  
ファイル種別に応じてタイトルと内容を変える（ステップ 2-4 の対応表を参照）。

**画面 Issue（`[SCR-XXX]` タイトル）の場合:**

```bash
gh issue create \
  --repo "<オーナー>/claude-poc-frontend" \
  --title "[SCR-XXX] <画面名>の実装" \
  --body "$(cat <<'EOF'
<!-- handoff なしの場合はこの行を記載: UI 設計は Claude Design 未使用。設計 md の Layout / Content を直接実装する -->

## UI 参照（Claude Design Handoff）
<!-- handoff ありの場合のみ記載。ステップ 4-A の内容をそのまま貼る -->
- Handoff README: `docs/design/ui-design/handoff/README.md`
- 採用案: <A案 / B案 / 単一案>
- Prototype 参照: `docs/design/ui-design/handoff/prototype/<file>.jsx :: <FuncName>`
- DS トークン: `docs/design/ui-design/handoff/tokens/colors_and_type.css`
- 共通プリミティブ: `docs/design/ui-design/handoff/prototype/wf-primitives.jsx`
- 共通シェル: `docs/design/ui-design/handoff/prototype/wf-shell.jsx`

## 概要
<設計 md の「画面概要」を引用>

## 受け入れ条件
- [ ] 設計 md の「画面概要」「入力」「出力・表示内容」「バリデーションメッセージ」が実装に反映されている
- [ ] 共通の状態（empty / loading / error / 権限不足）が `_共通.md` の規約通りに表現されている（handoff ありの場合は prototype の状態切替と一致）
- [ ] 画面遷移が `docs/design/screens/画面遷移.md` と一致する
- [ ] 関連する受け入れ条件（AC-XXX）に対応するユニットテスト or E2E テストが存在する

## 実装内容
- <実装項目1>
- <実装項目2>

## 対象ファイル（想定）
- `<ファイルパス>` - <変更内容>

## 参照元ドキュメント
- `docs/design/screens/SCR-XXX-<画面名>.md`

## 依存する Issue
- <ステップ5で保存した共通 Issue の URL> を先に対応すること

## 注意事項・未確定事項
<記載がなければ「なし」と書く>
EOF
)" \
  --label "type:feature,layer:frontend,priority:medium"
```

**画面以外の通常 Issue（API・テーブル・IF・バッチ等）の場合:**

```bash
gh issue create \
  --repo "<オーナー>/<リポジトリ>" \
  --title "[<layer>] <機能名>の実装" \
  --body "$(cat <<'EOF'
## 概要
<この Issue で実装する機能・コンポーネントの概要>

## 受け入れ条件
- [ ] <条件1>
- [ ] <条件2>

## 実装内容
- <実装項目1>
- <実装項目2>

## 対象ファイル（想定）
- `<ファイルパス>` - <変更内容>

## 参照元ドキュメント
- `<ドキュメントへの相対パス>`

## 依存する Issue
- <ステップ5で保存した共通 Issue の URL> を先に対応すること

## 注意事項・未確定事項
<記載がなければ「なし」と書く>
EOF
)" \
  --label "type:feature,layer:<layer>,priority:medium"
  # --assignee "<GitHubユーザー名>"   # 担当者を設定する場合はコメントを外す
  # --milestone "<マイルストーン名>"  # マイルストーンを設定する場合はコメントを外す
```

---

## 次のステップ

- ステップ 3 で「コンフリクトリスクあり」の Issue グループがある場合:
  `.claude/skills/create-issues-from-docs/references/04-parent-child.md` を読み込んでステップ 6-2 を実行する。
- コンフリクトリスクがない場合:
  `.claude/skills/create-issues-from-docs/references/05-finalize.md` を読み込んでステップ 7〜8 を実行する。
