# ステップ 6-2: 親子 Issue の作成（コンフリクトリスクあり）

コンフリクトリスクがある Issue グループごとに、親 Issue を先に作成してから子 Issue を作成する。

---

## 親 Issue の作成

```bash
PARENT_URL=$(gh issue create \
  --repo "<オーナー>/<リポジトリ>" \
  --title "[親] <機能グループ名>（コンフリクト注意・実装順序あり）" \
  --body "$(cat <<'EOF'
## 概要
このIssueは実装順序を管理するために作成しています。個別の実装内容は各子Issueを参照してください。

<機能グループ全体の概要>

## コンフリクトが発生しやすい理由
<なぜコンフリクトが起きやすいかの説明>
例: 以下の子Issueがすべて `src/router/index.ts` を変更するため順序が重要

## 対応順序（必ず守ること）

> ⚠️ この順序でPRをマージしないとコンフリクトが発生します

| 順序 | Issue | 理由 |
|------|-------|------|
| 1 | （子Issue作成後に追記） | <先に対応すべき理由> |
| 2 | （子Issue作成後に追記） | <順序の理由> |
| 3 | （子Issue作成後に追記） | <順序の理由> |

## マージ手順
1. 順序 1 の PR をレビュー・マージする
2. 順序 2 の作業ブランチで `git pull --rebase origin main` を実行する
3. 順序 2 の PR をレビュー・マージする
4. 以降、同様に繰り返す

## 注意事項
- 上記の順序でPRをマージすること
- 各PRをマージ後、次の作業ブランチは必ず `main` から最新を取り込んでから作業を開始すること
- コンフリクトが発生した場合はこのIssueにコメントで報告すること
EOF
)" \
  --label "type:feature,layer:<layer>,priority:high,relation:parent")
  # --assignee "<GitHubユーザー名>"   # 担当者を設定する場合はコメントを外す
  # --milestone "<マイルストーン名>"  # マイルストーンを設定する場合はコメントを外す
PARENT_NUMBER=$(echo "$PARENT_URL" | grep -oP '\d+$')
echo "親 Issue 作成: $PARENT_URL"
```

---

## 子 Issue の作成（機能ごとに繰り返す）

```bash
CHILD_URL=$(gh issue create \
  --repo "<オーナー>/<リポジトリ>" \
  --title "[子] <個別機能名>の実装" \
  --body "$(cat <<'EOF'
## 概要
<この Issue で実装する個別機能・コンポーネントの概要>

## 親 Issue（実装順序を確認すること）
<$PARENT_URL>

> ⚠️ **作業開始前に親Issueで指定された実装順序を必ず確認してください**

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

## 注意事項・未確定事項
<!-- ドキュメントで明示されていない点、実装時の注意事項があれば記載 -->
<記載がなければ「なし」と書く>
EOF
)" \
  --label "type:feature,layer:<layer>,priority:medium,relation:child")
  # --assignee "<GitHubユーザー名>"   # 担当者を設定する場合はコメントを外す
  # --milestone "<マイルストーン名>"  # マイルストーンを設定する場合はコメントを外す
echo "子 Issue 作成: $CHILD_URL"
```

子 Issue をすべて作成後、親 Issue の「対応順序」テーブルを子 Issue の URL で更新する。

```bash
# 親 Issue 本文の「（子Issue作成後に追記）」を実際の子 Issue URL に置き換える
gh issue edit "$PARENT_NUMBER" \
  --repo "<オーナー>/<リポジトリ>" \
  --body "$(gh issue view "$PARENT_NUMBER" \
    --repo "<オーナー>/<リポジトリ>" \
    --json body --jq '.body' \
    | sed 's|（子Issue作成後に追記）|<子IssueのURL>|')"
```

---

## 次のステップ

`.claude/skills/create-issues-from-docs/references/05-finalize.md` を読み込んでステップ 7〜8 を実行する。
