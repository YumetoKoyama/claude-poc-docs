# ステップ 7〜8: GitHub Project 紐づけ・完了報告

---

## ステップ 7: GitHub Project への紐づけ

作成したすべての Issue を GitHub Project に追加する。
Issue が多い場合は API レート制限を避けるため `sleep 1` で間隔を空けること。

```bash
PROJECT_NUMBER="<プロンプトから取得した PROJECT_NUMBER>"
PROJECT_OWNER="<プロンプトから取得した PROJECT_OWNER>"

# 作成した各 Issue の URL を引数に渡す（Issue ごとに繰り返す）
gh project item-add "$PROJECT_NUMBER" \
  --owner "$PROJECT_OWNER" \
  --url "<ISSUE_URL>"

sleep 1
```

> **注意:** `gh project item-add` には `project` スコープを持つ PAT が必要。
> `GITHUB_TOKEN`（デフォルト）ではプロジェクト操作ができない場合がある。
> ワークフローで設定している `CLAUDE_GITHUB_PAT` に `project` スコープが付与されていること。

---

## ステップ 8: 完了報告

作成したすべての Issue を以下の形式で報告する。

```markdown
## Issue 作成完了

### 作成した Issue 一覧

| リポジトリ | Issue URL | タイトル | ラベル |
|-----------|----------|---------|-------|
| claude-poc-frontend | <URL> | [frontend] ... | type:feature, layer:frontend |
| claude-poc-backend  | <URL> | [backend] ...  | type:feature, layer:backend  |
| claude-poc-batch    | <URL> | [batch] ...    | type:feature, layer:batch    |

### GitHub Project への紐づけ
上記すべての Issue を Project #<番号> に紐づけました。

### 注意が必要な Issue
- `relation:parent` ラベルがついた Issue は実装順序の管理 Issue です。
  子 Issue は親 Issue で指定された順序でマージしてください。
- `status:needs-discussion` ラベルがついた Issue は未確定事項があります。
  実装前に内容を確認してください。
```
