# Q-BR クローズ案（2026-07-14）

> 本プロジェクトのオープン課題には `Q-BR1` のみ存在（`docs/requirements/オープン課題.md` #27）。Q-BR2/Q-BR3 は本プロジェクトでは起票されていない。
> Q-BR1 は既に「人手確認前提のドラフト」として closed 済み（2026-07-10）。本ドラフトは、Claude Design 採択（handoff、`/reconcile-handoff-with-design` BLOCK 0 確認済み）を受けて **ドラフトから確定へ格上げできるか** の判断材料を提供するもの。クローズ状態自体の変更・記入は要件採択者が行う。

## Q-BR1

- **課題内容**: ブランド方針・トーン・ペルソナ・想定デバイス等の UI ガイドラインが要件素材から得られない
- **現状**: `ブランドガイドライン.md` に人手確認前提のドラフトとして記載済み（2026-07-10 クローズ）。カラー・タイポグラフィ・角丸・余白・シャドウ等の詳細トークンは「未指定・UI実装時に確定」のまま残っていた
- **今回の決定内容（handoff 出典）**:
  - カラーパレット: ニュートラルグレー基調 + アクセント1色（トラストブルー、oklch hue 250）。詳細HEX/oklch値は `handoff/tokens/colors_and_type.css`
  - タイポグラフィ: Noto Sans JP + Inter、本文14px基準の8段階スケール。出典 `colors_and_type.css`
  - スペーシング: 4pxグリッド（4〜80px、10段階）。出典 `spacing.css`
  - 角丸: 4px〜12px + pill（バッジ専用）。出典 `radius.css`
  - シャドウ: 3段階の淡色エレベーション。出典 `shadow.css`
  - StatusBadge配色マッピング（ST-001〜007, ST-101〜104 → トーン対応）。出典 `prototype/wf-primitives.jsx`
  - アイコン: Feather Icons相当・線画・絵文字不使用。出典 `DESIGN_SYSTEM_GUIDE.md`
  - アニメーション: 約120msの短いトランジションのみ、スケール変化なし。出典 `DESIGN_SYSTEM_GUIDE.md`
- **根拠**: `docs/design/ui-design/handoff/`（2026-07-14 15:14 再Export分）。`/reconcile-handoff-with-design` にて BLOCK 0 / SUGGEST 0 / NIT 0（2026-07-14 15:22 実行分）を確認済み
- **クローズ可否（提案）**: 上記6項目については「ドラフト→確定」への格上げが可能と判断できる。ただし以下3点は handoff からは決定できず、**Q-BR1 の完全クローズにはこれらの別途確認が必要**（新規 Q-ID 起票 or Q-BR1 残課題としての継続のいずれかを人間が判断）:
  1. Loading状態の表示仕様（未定義のまま）
  2. 権限不足時の正確なコピー文言（`メッセージ一覧.md` Q-MSG1側の課題として別管理が妥当）
  3. ロール別（SHIPPER/CARRIER）のテーマ差の有無（handoff上は差なし。意図か未検討か要確認）

## 推奨アクション

1. 本ドラフトと `ブランドガイドライン_追記案.md` をレビューし、`docs/requirements/ブランドガイドライン.md` へ反映する docs PR を作成
2. 反映後、`オープン課題.md` の Q-BR1 該当行を「ドラフト」から「確定」に更新（クローズ状態は維持のまま、備考欄に確定日を追記）
3. 上記クローズ可否の残課題3点は、必要に応じて新規 Q-ID（例: `Q-BR2`）として起票するか、次フェーズ（実装）への申し送り事項として `create-issues-from-design` の Issue 本文に含めるかを判断
