# ステップ 2〜3: ドキュメント解析・コンフリクトリスク評価

---

## ステップ 2-0: 変更ドキュメントの種別判定

変更されたファイルパスを確認し、どのディレクトリに属するかを判定する。

| 変更先 | 判定結果 | 次のステップ |
|-------|---------|------------|
| `docs/requirements/` 配下のみ | **要件定義書変更** | ステップ 5-0（設計書作成 Issue の起票）へ進み、ステップ 2〜4 はスキップする |
| `docs/design/` 配下のみ | **設計書変更** | ステップ 2-1 へ進む |
| 両方に変更あり | **両方変更** | ステップ 2-1 から順に進め、要件定義書分の設計書作成 Issue もあわせて起票する |
| どちらでもない | **対象外** | ステップ 2-2 の「Issue 作成スキップ」と同様の書式で理由を報告して終了する |

---

## ステップ 2: 変更ドキュメントの読み込みと解析

### 2-1. ファイルの読み込み

**要件定義書を先に読む。** `docs/requirements/` 配下の全 `.md` を Read で読み込み、機能要件・業務ルールを把握する。後の Issue 本文「参照元ドキュメント」に引用するための補助情報として内部メモに保持する。

次に、`docs/design/` 配下の変更されたすべての設計書ファイルを読み込む。API は `.yaml`、画面・テーブル・IF は `.md` で書かれていることに注意する。

```bash
# 新規追加ファイルはそのまま全体を読む
cat <ファイルパス>

# 変更ファイルは差分を確認してから全体も読む（追加・削除箇所を把握する）
git diff HEAD~1 HEAD -- <ファイルパス>
cat <ファイルパス>
```

### 2-1-A. ui-design/handoff の確認（設計書変更時のみ）

`docs/design/ui-design/handoff/README.md` が存在するか Read で確認する。

- **存在する場合**: README 内の Markdown テーブル（`| SCR-XXX | ... | wf-screens-*.jsx :: ScrXXXName | ... |` 形式）を解析し、`scr_id -> { file, func, 採用案 }` の対応表を内部メモとして保持する。画面 Issue 生成時に参照する。
- **存在しない場合**: handoff なしと記録し、画面 Issue 本文の冒頭に「UI 設計は Claude Design 未使用。設計 md の Layout / Content を直接実装する」と明記することをメモする。

### 2-1-B. handoff マッピング表の整合チェック（handoff ありの場合のみ）

ステップ 2-1-A で読んだマッピング表の SCR-XXX 集合と、`docs/design/screens/` 配下の `SCR-XXX-*.md` の SCR-XXX 集合を突き合わせる。

以下のいずれかを検出した場合は **Issue 起票を中断しワークフローを失敗で終了する**。誤った prototype 参照のまま Issue 化しないためである。

| 不整合の種類 | ログに出力する内容 |
|------------|----------------|
| マッピング表にあるが `screens/` に対応ファイルがない SCR-XXX | `handoff README` に記載の画面が設計 md に存在しない（対象 SCR-XXX を列挙） |
| `screens/` にあるがマッピング表に記載のない SCR-XXX | 設計 md の画面が handoff README に登録されていない（対象 SCR-XXX を列挙） |
| マッピング表が参照する `wf-screens-*.jsx` が `handoff/prototype/` に存在しない | prototype ファイルが見つからない（対象ファイル名を列挙） |

不整合を検出した場合は以下の形式でログを出力して終了する。

```bash
echo "::error::ui-design/handoff の整合チェックに失敗しました。Issue 起票をスキップします。"
echo "::error::不整合内容: <上記テーブルの該当内容と対象 SCR-XXX / ファイル名>"
echo "::error::対処: handoff/README.md と docs/design/screens/ の SCR-XXX を一致させてから再度マージしてください。"
exit 1
```

---

### 2-2. Issue 作成要否の判定

ファイルを読んだ後、**実装作業が発生するかどうか**を判定する。

以下のいずれかに**のみ**該当する変更は Issue を作成せず、理由を報告して終了する。

| 変更の種類 | 例 |
|-----------|-----|
| `.github/` 配下の変更 | ワークフロー・Issue テンプレートの修正 |
| `.claude/` 配下の変更 | スキル・設定ファイルの修正 |
| ファイル名・フォルダ名のリネーム | `設計書.md` → `design.md` |
| 誤字・脱字・言い回しの修正 | 「ユーサー」→「ユーザー」 |
| フォーマット・インデント・空行の整形 | 表の幅揃え、改行コード統一 |
| メタデータのみの更新 | 日付・バージョン番号・著者名の変更 |
| 既存記述の移動・並べ替え（内容変化なし） | セクション順序の入れ替え |

上記に該当する場合は、以下の形式で報告してスキルを終了する。

```markdown
## Issue 作成スキップ

変更内容が実装を伴わないため、Issue の作成をスキップしました。

| ファイル | 変更の種類 | 判断理由 |
|---------|-----------|---------|
| <ファイルパス> | <変更の種類> | <具体的な理由> |
```

上記に**該当しない**（実装作業が発生する）場合は、次の 2-3 に進む。

---

### 2-3. 形式に応じた解釈

ドキュメントの形式を問わず、以下の方針で内容を解釈する。

| 形式 | 解釈方針 |
|------|---------|
| Markdown (.md) | 見出し（#）階層で機能・コンポーネントを把握。テーブルは項目の列挙として扱う |
| YAML / JSON | スキーマ定義・API 定義・設定値として解釈 |
| テキスト | 段落・箇条書きで機能単位を把握 |
| その他 | 内容のセマンティクスを優先して解釈 |

### 2-4. Issue 粒度・ラベル・Issue 化要否の判断

> **Issue 作成先リポジトリ（設計書変更時のみ適用）**
>
> ステップ 2-0 で「設計書変更」と判定された場合、Issue の作成先は以下の 3 リポジトリに限定する。
>
> | リポジトリ名 | 対象レイヤー |
> |------------|------------|
> | `claude-poc-frontend` | 画面（フロントエンド）実装 |
> | `claude-poc-backend` | API・DB・テーブル実装（バックエンド）|
> | `claude-poc-batch` | バッチ・外部 IF 実装 |
>
> これら以外のリポジトリへの Issue 作成は行わない。

設計書ファイルの種類に応じて Issue 粒度・ラベル・Issue 作成先を判断し、内部メモに整理する。

| 設計書ファイル | Issue 粒度 | ラベル | Issue 作成先 | 備考 |
|-------------|-----------|-------|------------|------|
| `docs/design/screens/SCR-XXX-*.md` | 画面ごとに 1 Issue（タイトル先頭に `[SCR-XXX]` を含める） | `type:feature,layer:frontend` | `claude-poc-frontend` | `画面遷移.md` は背景情報として参照するが単独 Issue 化しない |
| `docs/design/api/[リソース名].yaml` | リソース（YAML ファイル）ごとに 1 Issue。1 ファイル内に複数 HTTP メソッドが含まれるため 1 Issue で全メソッドの実装を扱う | `type:feature,layer:backend` | `claude-poc-backend` | `_common.yaml` は背景情報として参照するが単独 Issue 化しない。粒度が大きすぎる場合のみ分割可 |
| `docs/design/IF定義.md` | 外部 IF がある場合のみ 1 Issue | `type:feature,layer:batch` | `claude-poc-batch` | 外部連携なしなら Issue 化しない |
| `docs/design/tables/[テーブル名].md` | テーブルごとに 1 Issue | `type:feature,layer:db` | `claude-poc-backend` | スキーマ変更がない場合は Issue 化しない |
| `docs/design/DB定義.md` | 全体方針のみ変更の場合に 1 Issue | `type:feature,layer:db` | `claude-poc-backend` | 個別テーブル変更がある場合は `tables/` の Issue に任せる |
| `docs/design/バッチ設計.md` | バッチ処理ごとに 1 Issue | `type:feature,layer:batch` | `claude-poc-batch` | |
| `docs/design/共通部品設計.md` | 共通部品ごとに 1 Issue（先行作成） | `type:common,priority:high` | `claude-poc-frontend` / `claude-poc-backend` / `claude-poc-batch`（共通部品の利用先に応じて選択） | 他 Issue から参照されるため最初に作成する |
| `docs/design/概要.md` / `方式設計.md` / `セキュリティ設計.md` 等 | 単独 Issue 化しない | — | — | 背景情報として各 Issue の本文に引用する |
| `docs/design/テスト戦略.md` / `シナリオ戦略.md` | 単独 Issue 化しない | — | — | 各 Issue の受け入れ条件に反映する |
| `docs/design/ui-design/brief/` / `docs/design/ui-design/handoff/` | 単独 Issue 化しない | — | — | 画面 Issue の本文に参照を埋め込む（ステップ 4-A 参照） |

1 Issue = 1 PR で対応できる規模を目安とする。推定作業量が 3 日を超える場合はさらに分割する。

---

## ステップ 3: コンフリクトリスクの評価

以下のいずれかに該当する場合は「コンフリクトリスクあり」と判定し、
後続のステップ 6-2 で親子 Issue 構造として作成する。

- 同一ファイルを複数の Issue が変更する（例: `routes/index.ts`、`schema.prisma`）
- マイグレーションファイルが複数の Issue にまたがる
- 共通モジュールを複数の Issue が同時に変更する
- フロント・バックが同一 API インターフェースを同時に変更する

コンフリクトリスクがある Issue グループを内部メモにリストアップしておく。

---

## ステップ 3-0: 重複検出（起票前に必ず実行）

Issue を起票する前に、各リポジトリの既存 Issue タイトルを取得し、生成予定のタイトルと照合する。

```bash
# 各リポジトリごとに実行する
gh issue list \
  --repo "<オーナー>/<リポジトリ名>" \
  --state all \
  --json number,title \
  --limit 500 \
  --jq '.[] | "\(.number)\t\(.title)"'
```

取得したタイトル一覧と、ステップ 2-4 で洗い出した生成予定の Issue タイトルを照合する。

| 照合結果 | 対応 |
|---------|------|
| タイトル完全一致 | 新規起票せず、既存 Issue に `gh issue comment <番号> --repo <REPO> --body "<差分内容>"` で変更点を追記する |
| 一致なし | 通常通り新規起票する |

> **補足:** 近似一致（表記揺れ・部分一致）の判断に迷う場合はユーザーに確認を取ること。

---

## 次のステップ

`.claude/skills/create-issues-from-docs/references/02-labels.md` を読み込んでステップ 4 を実行する。
