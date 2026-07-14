# RTM（トレーサビリティマトリクス）

生成: 2026-07-14 / generate-rtm-skeleton.sh（設計採択時の骨格前倒し生成・P-15）

運用ルール:

- **AC-XXX は機能ごとのスコープで採番されている**（グローバル一意でない）ため、本表の主キーは「機能/AC」。他文書から参照する際も必ず機能名で修飾する。
- 本表の UC は機能ファイルの関連ユースケース、BR は AC 定義行と同一行の引用のみ（機械抽出）。誤りは手で修正してよい。
- SCR / API 列は、画面 md の「関連機能要件」（functional/〜.md 参照）がある画面については**自動転記済み**。参照が無い画面の分は「画面別 AC 対応表」（下部）を根拠に製造工程が転記する（参照の追加を推奨。check-wiring-fields.sh が欠落を指摘する）。
- **TC / IT / E2E / Issue# 列は各工程が埋める**: TC・Issue#=製造（/test-design-from-issue）、IT=結合テスト工程、E2E=E2E 工程（凍結中）。
- 未カバー集計は `generate-rtm-skeleton.sh --report <本ファイル>` で機械確認できる。
- 意図的にテストしない AC は `-` のままにせず「対象外（Decision Log の D-ID）」を記入する。

## RTM 本表（主キー: 機能/AC）

| 機能/AC | UC | BR | SCR | API operationId | Issue# | TC-XXX | IT-XXX | E2E-XXX | 備考 |
|---|---|---|---|---|---|---|---|---|---|
| アカウント登録/AC-201 | UC-001, UC-002, UC-003, UC-006 | - | SCR-002 | registerTenant | - | - | - | - | |
| アカウント登録/AC-001 | UC-001, UC-002, UC-003, UC-006 | - | SCR-002 | registerTenant | - | - | - | - | |
| アカウント登録/AC-002 | UC-001, UC-002, UC-003, UC-006 | - | SCR-005 | createUser | - | - | - | - | |
| アカウント登録/AC-101 | UC-001, UC-002, UC-003, UC-006 | - | SCR-002 | registerTenant | - | - | - | - | |
| アカウント登録/AC-102 | UC-001, UC-002, UC-003, UC-006 | - | SCR-002, SCR-005 | createUser, registerTenant | - | - | - | - | |
| アカウント登録/AC-401 | UC-001, UC-002, UC-003, UC-006 | - | SCR-002 | registerTenant | - | - | - | - | |
| 交渉合意成約/AC-001 | UC-014, UC-015, UC-016 | BR-012, BR-013, BR-014 | - | - | - | - | - | - | |
| 交渉合意成約/AC-002 | UC-014, UC-015, UC-016 | BR-008 | - | - | - | - | - | - | |
| 交渉合意成約/AC-101 | UC-014, UC-015, UC-016 | BR-016, BR-019 | - | - | - | - | - | - | |
| 交渉合意成約/AC-201 | UC-014, UC-015, UC-016 | BR-006, BR-015 | - | - | - | - | - | - | |
| 交渉合意成約/AC-301 | UC-014, UC-015, UC-016 | - | - | - | - | - | - | - | |
| 交渉合意成約/AC-401 | UC-014, UC-015, UC-016 | BR-012, BR-014 | - | - | - | - | - | - | |
| 取引履歴/AC-001 | UC-022 | - | SCR-011, SCR-018 | listJobs, listMyBids | - | - | - | - | |
| 取引履歴/AC-101 | UC-022 | - | SCR-011, SCR-018 | listJobs, listMyBids | - | - | - | - | |
| 取引履歴/AC-301 | UC-022 | - | SCR-011, SCR-018 | listJobs, listMyBids | - | - | - | - | |
| 取引履歴/AC-401 | UC-022 | - | SCR-011 | listJobs | - | - | - | - | |
| 応募/AC-001 | UC-010, UC-011, UC-012, UC-013 | - | SCR-014 | createBid | - | - | - | - | |
| 応募/AC-101 | UC-010, UC-011, UC-012, UC-013 | - | SCR-014 | createBid | - | - | - | - | |
| 応募/AC-102 | UC-010, UC-011, UC-012, UC-013 | BR-004 | SCR-014 | createBid | - | - | - | - | |
| 応募/AC-201 | UC-010, UC-011, UC-012, UC-013 | BR-005, BR-006, BR-007, BR-009 | SCR-015-01 | createSetBid | - | - | - | - | |
| 応募/AC-202 | UC-010, UC-011, UC-012, UC-013 | BR-005 | SCR-014, SCR-015-01 | createSetBid | - | - | - | - | |
| 応募/AC-301 | UC-010, UC-011, UC-012, UC-013 | - | - | - | - | - | - | - | |
| 応募/AC-401 | UC-010, UC-011, UC-012, UC-013 | BR-006, BR-015 | SCR-016 | listMyBids | - | - | - | - | |
| 案件削除/AC-001 | UC-009 | BR-022 | - | - | - | - | - | - | |
| 案件削除/AC-101 | UC-009 | BR-019 | - | - | - | - | - | - | |
| 案件削除/AC-201 | UC-009 | - | - | - | - | - | - | - | |
| 案件削除/AC-301 | UC-009 | - | - | - | - | - | - | - | |
| 案件削除/AC-401 | UC-009 | - | - | - | - | - | - | - | |
| 案件登録/AC-001 | UC-007, UC-008 | - | SCR-007 | createJob | - | - | - | - | |
| 案件登録/AC-002 | UC-007, UC-008 | - | SCR-008 | listJobs | - | - | - | - | |
| 案件登録/AC-101 | UC-007, UC-008 | - | SCR-007 | createJob | - | - | - | - | |
| 案件登録/AC-201 | UC-007, UC-008 | - | SCR-008 | listJobs | - | - | - | - | |
| 案件登録/AC-301 | UC-007, UC-008 | - | SCR-008 | listJobs | - | - | - | - | |
| 案件登録/AC-401 | UC-007, UC-008 | BR-019 | - | - | - | - | - | - | |
| 評価/AC-001 | UC-020 | BR-017, BR-018 | SCR-010, SCR-017 | createRating | - | - | - | - | |
| 評価/AC-101 | UC-020 | BR-018 | SCR-010, SCR-017 | listRatingsForJob | - | - | - | - | |
| 評価/AC-201 | UC-020 | - | SCR-010 | listRatingsForJob | - | - | - | - | |
| 評価/AC-301 | UC-020 | - | SCR-010, SCR-017 | createRating | - | - | - | - | |
| 評価/AC-401 | UC-020 | - | - | - | - | - | - | - | |
| 認証/AC-001 | UC-004, UC-005, UC-006 | - | SCR-001 | login | - | - | - | - | |
| 認証/AC-002 | UC-004, UC-005, UC-006 | - | SCR-001 | logout | - | - | - | - | |
| 認証/AC-101 | UC-004, UC-005, UC-006 | - | SCR-001 | login | - | - | - | - | |
| 認証/AC-102 | UC-004, UC-005, UC-006 | - | SCR-003 | requestPasswordReset | - | - | - | - | |
| 認証/AC-201 | UC-004, UC-005, UC-006 | - | SCR-001 | login | - | - | - | - | |
| 認証/AC-401 | UC-004, UC-005, UC-006 | - | SCR-004 | resetPassword | - | - | - | - | |
| 通知/AC-001 | UC-021 | BR-024 | SCR-012 | getUnreadNotificationCount | - | - | - | - | |
| 通知/AC-002 | UC-021 | - | SCR-012 | markNotificationRead | - | - | - | - | |
| 通知/AC-101 | UC-021 | - | SCR-012 | getJobById | - | - | - | - | |
| 通知/AC-201 | UC-021 | BR-024 | SCR-012 | getUnreadNotificationCount | - | - | - | - | |
| 通知/AC-301 | UC-021 | - | SCR-012 | listNotifications | - | - | - | - | |
| 通知/AC-401 | UC-021 | BR-025 | SCR-012 | listNotifications | - | - | - | - | |
| 運送ステータス報告/AC-001 | UC-017, UC-018, UC-019 | BR-017 | - | - | - | - | - | - | |
| 運送ステータス報告/AC-002 | UC-017, UC-018, UC-019 | BR-017 | - | - | - | - | - | - | |
| 運送ステータス報告/AC-101 | UC-017, UC-018, UC-019 | - | - | - | - | - | - | - | |
| 運送ステータス報告/AC-102 | UC-017, UC-018, UC-019 | - | - | - | - | - | - | - | |
| 運送ステータス報告/AC-301 | UC-017, UC-018, UC-019 | - | - | - | - | - | - | - | |
| 運送ステータス報告/AC-401 | UC-017, UC-018, UC-019 | - | - | - | - | - | - | - | |

AC 総数: 57（生成時点で TC/IT/E2E は全件未対応 = これが「見える化された未カバー」）

## 画面別 AC 対応表（画面 md の受け入れ条件表から機械抽出・転記用の根拠）

> AC は**画面ローカルの引用**（画面が属する機能のスコープ）。本表の行を根拠に、上の RTM 本表の SCR / API 列を製造工程で埋める。

| SCR | AC（画面内引用） | BR（同一行） | operationId（同一行） | 機能（関連機能要件） |
|---|---|---|---|---|
| SCR-001 | AC-001 | - | login | 認証 |
| SCR-001 | AC-002 | - | logout | 認証 |
| SCR-001 | AC-101 | - | login | 認証 |
| SCR-001 | AC-201 | - | login | 認証 |
| SCR-002 | AC-001 | BR-001, BR-002 | registerTenant | アカウント登録 |
| SCR-002 | AC-101 | BR-001 | registerTenant | アカウント登録 |
| SCR-002 | AC-102 | BR-002 | registerTenant | アカウント登録 |
| SCR-002 | AC-201 | - | registerTenant | アカウント登録 |
| SCR-002 | AC-401 | - | registerTenant | アカウント登録 |
| SCR-003 | AC-102 | - | requestPasswordReset | 認証 |
| SCR-004 | AC-401 | - | resetPassword | 認証 |
| SCR-005 | AC-002 | BR-002, BR-003 | createUser | アカウント登録 |
| SCR-005 | AC-102 | BR-002 | createUser | アカウント登録 |
| SCR-007 | AC-001 | BR-011 | createJob | 案件登録 |
| SCR-007 | AC-101 | - | createJob | 案件登録 |
| SCR-008 | AC-002 | - | listJobs | 案件登録 |
| SCR-008 | AC-201 | - | listJobs | 案件登録 |
| SCR-008 | AC-301 | - | listJobs | 案件登録 |
| SCR-010 | AC-001 | BR-017, BR-018 | createRating | 評価 |
| SCR-010 | AC-101 | BR-018 | listRatingsForJob | 評価 |
| SCR-010 | AC-201 | - | listRatingsForJob | 評価 |
| SCR-010 | AC-301 | - | createRating | 評価 |
| SCR-011 | AC-001 | BR-023 | listJobs | 取引履歴 |
| SCR-011 | AC-101 | - | listJobs | 取引履歴 |
| SCR-011 | AC-301 | - | listJobs | 取引履歴 |
| SCR-011 | AC-401 | - | listJobs | 取引履歴 |
| SCR-012 | AC-001 | BR-024 | getUnreadNotificationCount | 通知 |
| SCR-012 | AC-002 | - | markNotificationRead | 通知 |
| SCR-012 | AC-101 | - | getJobById | 通知 |
| SCR-012 | AC-201 | BR-024 | getUnreadNotificationCount | 通知 |
| SCR-012 | AC-301 | - | listNotifications | 通知 |
| SCR-012 | AC-401 | BR-025 | listNotifications | 通知 |
| SCR-014 | AC-001 | BR-011 | createBid | 応募 |
| SCR-014 | AC-101 | BR-009, BR-010 | createBid | 応募 |
| SCR-014 | AC-102 | BR-004 | createBid | 応募 |
| SCR-014 | AC-202 | BR-005 | createSetBid | 応募 |
| SCR-015-01 | AC-201 | BR-005, BR-006, BR-007, BR-009 | createSetBid | 応募 |
| SCR-015-01 | AC-202 | BR-005 | createSetBid | 応募 |
| SCR-016 | AC-401 | BR-006, BR-015 | listMyBids | 応募 |
| SCR-017 | AC-001 | BR-017, BR-018 | createRating | 評価 |
| SCR-017 | AC-101 | BR-018 | listRatingsForJob | 評価 |
| SCR-017 | AC-301 | - | createRating | 評価 |
| SCR-018 | AC-001 | BR-023 | listMyBids | 取引履歴 |
| SCR-018 | AC-101 | - | listMyBids | 取引履歴 |
| SCR-018 | AC-301 | - | listMyBids | 取引履歴 |
