// SCR-013 運送会社ダッシュボード
const CAR_KPI = [
  { key: 'ST001', label: '募集中案件（全体公開）', count: 42, newCount: 6 },
  { key: 'ST101', label: '応募中', count: 5, newCount: 1 },
  { key: 'ST102', label: '成約', count: 2, newCount: 0 },
  { key: 'ST103', label: 'クローズ', count: 9, newCount: 0 },
];

function CarrierDashboardScreen({ onNavigate }) {
  return (
    <Shell tenantType="CARRIER" activeKey="dashboard" onNavigate={onNavigate}>
      <PageHeading title="ダッシュボード" description="募集中案件と自社の応募状況です。" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {CAR_KPI.map((k) => (
          <div key={k.key} onClick={() => onNavigate && onNavigate(k.key === 'ST001' ? 'carrier-job-open' : 'carrier-job-negotiating')} style={{ cursor: 'pointer' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <StatusBadge status={k.key} />
                {k.newCount > 0 && <Tag variant="new">new {k.newCount}</Tag>}
              </div>
              <div style={{ fontSize: 'var(--text-2xl-size)', fontWeight: 'var(--font-weight-bold)' }}>{k.count}</div>
              <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>件</div>
            </Card>
          </div>
        ))}
      </div>
      <Panel title="主要な導線">
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('carrier-job-open')}>募集中案件一覧</Button>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('carrier-job-negotiating')}>交渉中・済一覧</Button>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('users')}>ユーザー追加</Button>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('carrier-history')}>取引履歴</Button>
        </div>
      </Panel>
    </Shell>
  );
}

// SCR-014 募集中案件一覧（運送会社）
const CAR_OPEN_JOBS = [
  { id: 'JOB-00131', title: '東京→大阪 家具輸送', requester: '株式会社サンプル物流', bids: 3, deadline: '2026/07/19 23:00', isNew: true, closed: false },
  { id: 'JOB-00132', title: '大阪→広島 医薬品輸送', requester: '関西物流株式会社', bids: 1, deadline: '2026/07/15 10:00', isNew: false, closed: false },
  { id: 'JOB-00120', title: '福岡→熊本 建材輸送', requester: '株式会社サンプル物流', bids: 20, deadline: '2026/07/16 08:00', isNew: false, closed: true },
];

function CarrierJobOpenListScreen({ onNavigate }) {
  const [selected, setSelected] = useState(new Set());
  return (
    <Shell tenantType="CARRIER" activeKey="job-open" onNavigate={onNavigate}>
      <PageHeading title="募集中案件一覧" description="全テナントに公開された募集中案件です。" />
      <Panel title="絞り込み条件">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', alignItems: 'end' }}>
          <Field label="積地" placeholder="例: 東京" />
          <Field label="卸地" placeholder="例: 大阪" />
          <Field label="時間帯（下限〜上限）" placeholder="2026/07/15 〜 2026/07/20" />
          <Field label="並び替え" as="select" options={[{ value: 'new', label: '新着順' }, { value: 'deadline', label: '締切が近い順' }]} />
        </div>
      </Panel>
      <div style={{ height: 'var(--space-5)' }} />
      <Card padded={false}>
        <Table
          columns={[
            { key: 'id', label: '案件ID', render: (r) => <span onClick={() => onNavigate && onNavigate('carrier-job-detail')} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>{r.id}</span> },
            { key: 'title', label: '案件名', render: (r) => <span>{r.title} {r.isNew && <Tag variant="new" />}</span> },
            { key: 'requester', label: '配送依頼企業' },
            { key: 'bids', label: '応募数', align: 'right' },
            { key: 'deadline', label: '応募締切' },
            {
              key: 'action',
              label: '',
              render: (r) => (
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button size="sm" variant="secondary" disabled={r.closed}>{r.closed ? '締切済' : '応募する'}</Button>
                </div>
              ),
            },
          ]}
          rows={CAR_OPEN_JOBS}
        />
      </Card>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Button variant="primary" size="sm">セット応募</Button>
      </div>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={1} totalPages={6} />
      </div>
    </Shell>
  );
}

// SCR-015 案件詳細（運送会社）+ SCR-015-01 モーダル
function CarrierJobDetailScreen({ onNavigate, initialModalOpen = false }) {
  const [modalOpen, setModalOpen] = useState(initialModalOpen);
  return (
    <Shell tenantType="CARRIER" activeKey="job-open" onNavigate={onNavigate}>
      <PageHeading
        title="JOB-00131 東京→大阪 家具輸送"
        description={<StatusBadge status="ST001" />}
        actions={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>セット応募</Button>
            <Button variant="secondary" onClick={() => onNavigate && onNavigate('carrier-job-open')}>一覧へ戻る</Button>
          </>
        }
      />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Card title="案件基本情報">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', fontSize: 'var(--text-sm-size)' }}>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>積地</span><div>東京都江東区（2026/07/20 09:00）</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>卸地</span><div>大阪府大阪市（2026/07/21 12:00）</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>容積 / トラック種別</span><div>12 m3 / 2tトラック</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>希望金額</span><div>¥95,000（税別）</div></div>
            </div>
          </Card>

          <Card title="配送依頼企業情報">
            <div style={{ fontSize: 'var(--text-sm-size)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <div>株式会社サンプル物流</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>会社電話番号: 03-xxxx-0001</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>会社メーリスアドレス: contact@sample-logistics.example.jp</div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)', marginTop: 'var(--space-1)' }}>個人担当者の連絡先は成約後に表示されます。</div>
            </div>
          </Card>

          <Card title="競合状況">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm-size)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>応募A</span><span style={{ color: 'var(--color-text-tertiary)' }}>金額非公開</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>応募B</span><span style={{ color: 'var(--color-text-tertiary)' }}>金額非公開</span></div>
            </div>
          </Card>

          <Card title="自社応募">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 320 }}>
              <Field label="応募金額（円・税別）" type="number" placeholder="95000" />
              <Button variant="primary">応募する</Button>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Panel title="最終条件提示状況"><div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>現在提示中の最終条件はありません。</div></Panel>
          <Panel title="運送ステータス"><div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-tertiary)' }}>運送開始報告: 未実施</div></Panel>
        </div>
      </div>

      {modalOpen && (
        <Modal
          title="セット応募の選択"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>キャンセル</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>セット応募として登録</Button>
            </>
          }
        >
          <p style={{ marginTop: 0, fontSize: 'var(--text-sm-size)' }}>起動元案件と同じ配送依頼企業（株式会社サンプル物流）の募集中・交渉中案件のみ選択できます。</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {[{ id: 'JOB-00131', route: '東京→大阪', current: true }, { id: 'JOB-00133', route: '大阪→神戸' }].map((j) => (
              <label key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm-size)' }}>
                <input type="checkbox" defaultChecked={j.current} disabled={j.current} />
                <span style={{ flex: 1 }}>{j.id}（{j.route}）</span>
                <Field placeholder="応募金額" type="number" />
              </label>
            ))}
          </div>
        </Modal>
      )}
    </Shell>
  );
}

// SCR-016 交渉中・済一覧（運送会社）
const MY_BIDS = [
  { id: 'BID-501', job: 'JOB-00124 名古屋→福岡 精密機器輸送', status: 'ST101' },
  { id: 'BID-498', job: 'JOB-00098 名古屋→福岡 精密機器輸送', status: 'ST102' },
  { id: 'BID-480', job: 'JOB-00088 大阪→広島 医薬品輸送', status: 'ST103' },
  { id: 'BID-479', job: 'JOB-00087 福岡→熊本 建材輸送', status: 'ST104' },
];

function CarrierNegotiatingListScreen({ onNavigate }) {
  return (
    <Shell tenantType="CARRIER" activeKey="job-negotiating" onNavigate={onNavigate}>
      <PageHeading title="交渉中・済一覧" description="自社が応募した案件の状況です。" />
      <Card padded={false}>
        <div onClick={() => onNavigate && onNavigate('carrier-job-detail')} style={{ cursor: 'pointer' }}>
          <Table
            columns={[
              { key: 'id', label: '応募ID' },
              { key: 'job', label: '案件' },
              { key: 'status', label: '応募ステータス', render: (r) => <StatusBadge status={r.status} /> },
            ]}
            rows={MY_BIDS}
          />
        </div>
      </Card>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={1} totalPages={3} />
      </div>
    </Shell>
  );
}

// SCR-017 評価登録（運送会社）
function CarrierRatingScreen({ onNavigate }) {
  return (
    <Shell tenantType="CARRIER" onNavigate={onNavigate}>
      <PageHeading title="評価登録" description="完了した案件について、配送依頼企業を評価します。" />
      <Card>
        <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
            JOB-00098「名古屋→福岡 精密機器輸送」／相手企業: 株式会社サンプル物流
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>評価 <span style={{ color: 'var(--color-danger)' }}>必須</span></div>
            <div style={{ display: 'flex', gap: 'var(--space-1)', fontSize: 28, color: 'var(--warning-500)' }}>★★★★★</div>
          </div>
          <Field label="コメント（任意）" as="textarea" />
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="primary" onClick={() => onNavigate && onNavigate('carrier-job-detail')}>登録する</Button>
            <Button variant="ghost" onClick={() => onNavigate && onNavigate('carrier-history')}>取引履歴へ</Button>
          </div>
        </div>
      </Card>
    </Shell>
  );
}

// SCR-018 取引履歴一覧（運送会社）
const CAR_HISTORY = [
  { id: 'JOB-00098', title: '名古屋→福岡 精密機器輸送', status: 'ST006', date: '2026/06/28' },
  { id: 'JOB-00088', title: '大阪→広島 医薬品輸送', status: 'ST006', date: '2026/06/05' },
];

function CarrierHistoryScreen({ onNavigate }) {
  return (
    <Shell tenantType="CARRIER" activeKey="history" onNavigate={onNavigate}>
      <PageHeading title="取引履歴一覧" description="自社が成約した案件（成約済〜評価済）を表示します。" />
      <Card padded={false}>
        <div onClick={() => onNavigate && onNavigate('carrier-job-detail')} style={{ cursor: 'pointer' }}>
          <Table
            columns={[
              { key: 'id', label: '案件ID' },
              { key: 'title', label: '案件名' },
              { key: 'status', label: 'ステータス', render: (r) => <StatusBadge status={r.status} /> },
              { key: 'date', label: '成約日' },
            ]}
            rows={CAR_HISTORY}
            emptyMessage="取引履歴がありません"
          />
        </div>
      </Card>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={1} totalPages={1} />
      </div>
    </Shell>
  );
}


window.UIKit = window.UIKit || {};
Object.assign(window.UIKit, { CarrierDashboardScreen, CarrierJobOpenListScreen, CarrierJobDetailScreen, CarrierNegotiatingListScreen, CarrierRatingScreen, CarrierHistoryScreen });
