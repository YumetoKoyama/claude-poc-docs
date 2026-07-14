# API 仕様サマリー

> **詳細な入出力スキーマは元 YAML を参照**: `docs/design/api/*.yaml`（OpenAPI 3.1 準拠）
> 認可条件の正典: `docs/design/セキュリティ設計.md` 5.3 節

全 36 operationId を収録（`api/*.yaml` の `operationId:` 合計と一致）。

## エンドポイント一覧

### 認証・アカウント（auth.yaml / tenants.yaml / users.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| login | POST | /api/auth/login | public | ログイン ID・パスワードで認証しトークンを発行 | AC-001, AC-101, AC-201 |
| refreshAccessToken | POST | /api/auth/refresh | public（リフレッシュトークンが認証情報） | アクセストークンを再発行 | — |
| logout | POST | /api/auth/logout | 認証必須（ロール不問） | リフレッシュトークンを失効させる | AC-002 |
| requestPasswordReset | POST | /api/auth/password-reset-requests | public | リセットメール送信を申請（202固定応答） | AC-102 |
| resetPassword | POST | /api/auth/password-reset | public（トークンが認可情報） | 新パスワードを設定 | AC-401 |
| registerTenant | POST | /api/tenants | public | 企業アカウント＋初回ユーザーを登録 | AC-001, AC-101, AC-102, AC-201, AC-401 |
| getMyTenant | GET | /api/tenants/me | 認証必須（ロール不問） | 自社テナント情報を取得 | — |
| createUser | POST | /api/users | 認証必須（ロール不問） | 自テナント配下へユーザーを追加 | AC-002, AC-102 |
| getCurrentUser | GET | /api/users/me | 認証必須（ロール不問） | ログイン中ユーザー情報を取得（共通ヘッダー用） | — |

### 案件（jobs.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| listJobs | GET | /api/jobs | 認証必須（ロール不問） | 案件一覧取得（自社登録分 or 募集中の公開案件） | 案件登録/AC-002, AC-201, AC-301 |
| createJob | POST | /api/jobs | REQUESTER | 案件を登録 | AC-001, AC-101 |
| getJobStatusSummary | GET | /api/jobs/status-summary | REQUESTER | ステータス別件数サマリ取得（ダッシュボード用） | 案件登録/AC-201, AC-301 |
| getJobById | GET | /api/jobs/{jobId} | 認証必須（ロール不問） | 案件詳細取得 | — |
| updateJob | PATCH | /api/jobs/{jobId} | REQUESTER | 案件内容を編集（募集中・交渉中のみ） | 案件削除/AC-101 |
| deleteJob | DELETE | /api/jobs/{jobId} | REQUESTER | 案件を論理削除（募集中・交渉中のみ） | 案件削除/AC-001, AC-101 |
| reportDeparture | POST | /api/jobs/{jobId}/departure-report | CARRIER | 運送開始を報告 | 運送ステータス報告/AC-001, AC-101, AC-301 |
| reportCompletion | POST | /api/jobs/{jobId}/completion-report | CARRIER | 運送完了を報告 | 運送ステータス報告/AC-401 |
| confirmCompletion | POST | /api/jobs/{jobId}/completion-confirmation | REQUESTER | 完了報告内容を確認し完了を確定 | 運送ステータス報告/AC-002, AC-102 |

### 応募（bids.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| listBidsForJob | GET | /api/jobs/{jobId}/bids | 認証必須（ロール不問） | 案件に対する応募一覧を取得 | — |
| createBid | POST | /api/jobs/{jobId}/bids | CARRIER | 案件に応募する | AC-001, AC-101, AC-102 |
| listMyBids | GET | /api/bids | CARRIER | 自社の応募一覧を取得 | 応募/AC-301, AC-401 |
| getBidById | GET | /api/bids/{bidId} | 認証必須（ロール不問） | 応募詳細（現在の最終条件提示状況含む）を取得 | — |
| updateBid | PATCH | /api/bids/{bidId} | CARRIER | 応募内容を編集（成約前のみ） | 応募/AC-301 |

### セット応募（set-bids.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| createSetBid | POST | /api/set-bids | CARRIER | 複数案件をまとめてセット応募 | AC-201, AC-202 |
| getSetBidById | GET | /api/set-bids/{setBidId} | 認証必須（ロール不問） | セット応募の詳細（対象案件・各応募の状態）を取得 | 交渉合意成約/AC-201 |
| agreeSetBid | POST | /api/set-bids/{setBidId}/agree | REQUESTER | セット応募に一括合意し全案件を成約させる | 交渉合意成約/AC-002, AC-201 |

### 連絡・交渉（negotiations.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| listMessages | GET | /api/bids/{bidId}/messages | 認証必須（当事者のみ） | 応募（案件）単位の連絡履歴を取得 | — |
| createMessage | POST | /api/bids/{bidId}/messages | 認証必須（当事者のみ） | 連絡メッセージを送信 | 交渉合意成約/AC-101 |
| proposeFinalOffer | POST | /api/bids/{bidId}/final-offer | 認証必須（当事者のみ） | 最終条件を提示 | 交渉合意成約/AC-001 |
| agreeFinalOffer | POST | /api/bids/{bidId}/final-offer/agree | 認証必須（当事者のみ） | 提示された最終条件に合意し成約（セット応募以外） | 交渉合意成約/AC-001, AC-401 |
| discardFinalOffer | POST | /api/bids/{bidId}/final-offer/discard | 認証必須（当事者のみ） | 提示中の最終条件を破棄（Q-J2） | — |

### 評価（ratings.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| listRatingsForJob | GET | /api/jobs/{jobId}/ratings | 認証必須（当事者のみ） | 案件に対する評価登録状況を取得 | AC-101, AC-201 |
| createRating | POST | /api/jobs/{jobId}/ratings | 認証必須（当事者のみ） | 相手への評価を登録 | AC-001, AC-301 |

### 通知（notifications.yaml）

| operationId | メソッド | パス | 認可 | 概要 | 関連 AC |
|-------------|---------|------|------|------|--------|
| listNotifications | GET | /api/notifications | 認証必須（自テナント宛てのみ） | 自テナント宛ての通知一覧を取得 | AC-301, AC-401 |
| getUnreadNotificationCount | GET | /api/notifications/unread-count | 認証必須（自テナント宛てのみ） | 未読件数を取得（通知ベル表示用） | AC-001, AC-201 |
| markNotificationRead | POST | /api/notifications/{notificationId}/read | 認証必須（自テナント宛てのみ） | 通知を既読にする | AC-002 |

---

## 共通スキーマ（`_common.yaml`）

| スキーマ名 | 用途 | 主要フィールド |
|----------|------|--------------|
| ErrorResponse | 全 API 共通のエラーレスポンス | code, message, details[].field, details[].reason |
| ErrorCode | エラーコード enum | VALIDATION_ERROR, UNAUTHENTICATED, LOGIN_FAILED, ACCOUNT_LOCKED, FORBIDDEN, NOT_FOUND, DUPLICATE, CONFLICT, BID_LIMIT_EXCEEDED, BID_DEADLINE_PASSED, SET_BID_TENANT_MISMATCH, RESET_TOKEN_EXPIRED, RATE_LIMITED, INTERNAL_ERROR |
| PageMeta | ページネーション | page, size, totalElements, totalPages |
| TenantType / PaymentMethod / CargoType / TruckType / JobAttribute | コード値 enum（要件 `コード値定義.md` と一致） | enum + x-display-names |
| JobStatus | 案件ステータス（ST-001〜ST-007） | RECRUITING, NEGOTIATING, CONTRACTED, IN_TRANSIT, COMPLETED, RATED, CANCELLED（第1版未使用） |
| BidStatus | 応募ステータス（ST-101〜ST-104） | OPEN, CONTRACTED, CLOSED_LOST, CLOSED_SET_FAILED |
| SetBidStatus | セット応募の表示用集約ステータス | PENDING, CONTRACTED, FAILED |
| FinalOfferStatus | 最終条件提示ステータス（設計新設） | PROPOSED, AGREED, INVALIDATED, DISCARDED |
| NotificationType | 通知種別 | CONTRACT, GENERAL |

---

## エラーレスポンス対応表

| HTTP ステータス | ErrorCode 例 | 意味 | 発生条件例 |
|--------------|------------|------|----------|
| 400 | VALIDATION_ERROR | バリデーションエラー | 必須項目未入力、from/to 日時不整合等（MSG-001, MSG-002, MSG-008, MSG-014, MSG-018） |
| 400 | SET_BID_TENANT_MISMATCH | セット応募対象の企業不一致 | 異なる配送依頼企業の案件を同一セットに含めた（MSG-003, BR-005） |
| 400 | RESET_TOKEN_EXPIRED | リセットトークン期限切れ | 発行から1時間経過（MSG-019） |
| 401 | UNAUTHENTICATED / LOGIN_FAILED / ACCOUNT_LOCKED | 認証エラー | JWT 期限切れ、ID/パスワード誤り（MSG-015）、ロック中（MSG-016） |
| 403 | FORBIDDEN | 自テナント内の権限不足 | ロール制約違反（MSG-023） |
| 404 | NOT_FOUND | リソース未存在／テナント越境 | 指定 ID が存在しない、他テナントのリソース参照（越境は隠蔽のため404に統一） |
| 409 | DUPLICATE | 重複 | 法人重複（AC-201/MSG-024）、応募重複（MSG-017） |
| 409 | CONFLICT / BID_LIMIT_EXCEEDED / BID_DEADLINE_PASSED | 状態競合 | 相手の状態変化（MSG-009）、応募上限超過（MSG-004, BR-009）、締切超過（MSG-005, BR-010） |
| 429 | RATE_LIMITED | レート制限超過 | パスワードリセット申請の1時間5回超過（MSG-026） |
| 500 | INTERNAL_ERROR | サーバー内部エラー | — |
