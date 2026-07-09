# ステップ 4: ラベルの準備

Issue 作成前に、必要なラベルを各リポジトリに作成する（`--force` で冪等に実行）。
Issue 作成対象のリポジトリごとに繰り返す。

```bash
REPO="<オーナー>/<リポジトリ名>"

# ---- タイプ系ラベル（type:bug は必須） ----
gh label create "type:bug"                --color "d73a4a" --description "バグ・不具合"                          --repo "$REPO" --force
gh label create "type:feature"            --color "0075ca" --description "新機能・機能追加"                      --repo "$REPO" --force
gh label create "type:improvement"        --color "e4e669" --description "既存機能の改善・リファクタ"             --repo "$REPO" --force
gh label create "type:common"             --color "5319e7" --description "共通部品・共通処理"                    --repo "$REPO" --force

# ---- 層・リポジトリ系ラベル ----
gh label create "layer:frontend"          --color "fbca04" --description "フロントエンド層"                     --repo "$REPO" --force
gh label create "layer:backend"           --color "0052cc" --description "バックエンド・API 層"                 --repo "$REPO" --force
gh label create "layer:batch"             --color "006b75" --description "バッチ処理層"                         --repo "$REPO" --force
gh label create "layer:db"                --color "bfd4f2" --description "データベース・マイグレーション"         --repo "$REPO" --force

# ---- 優先度系ラベル ----
gh label create "priority:high"           --color "b60205" --description "優先度: 高（ブロッカーあり）"          --repo "$REPO" --force
gh label create "priority:medium"         --color "e99695" --description "優先度: 中（通常対応）"               --repo "$REPO" --force
gh label create "priority:low"            --color "f9d0c4" --description "優先度: 低（時間があれば）"            --repo "$REPO" --force

# ---- ステータス系ラベル ----
gh label create "status:needs-discussion" --color "cccccc" --description "未確定事項あり・実装前に確認が必要"     --repo "$REPO" --force

# ---- 親子関係系ラベル（コンフリクト対策） ----
gh label create "relation:parent"         --color "ff7619" --description "親Issue（子Issueの実装順序を管理）"    --repo "$REPO" --force
gh label create "relation:child"          --color "ffd580" --description "子Issue（親Issueの順序に従って対応）"  --repo "$REPO" --force
```

> **補足:** `--force` は既存ラベルがあっても上書き作成する。
> 意図しない上書きを防ぎたい場合は `gh label list --repo "$REPO" --limit 100` で確認してから外すこと。

---

## 次のステップ

`.claude/skills/create-issues-from-docs/references/03-create-issues.md` を読み込んでステップ 5〜6-1 を実行する。
