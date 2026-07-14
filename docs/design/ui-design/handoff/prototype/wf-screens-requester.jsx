// SCR-006 配送依頼企業ダッシュボード
const REQ_KPI = [
  { key: 'ST001', label: '募集中', count: 4, newCount: 2 },
  { key: 'ST002', label: '交渉中', count: 2, newCount: 1 },
  { key: 'ST003', label: '成約済', count: 1, newCount: 0 },
  { key: 'ST004', label: '運送中', count: 1, newCount: 0 },
  { key: 'ST005', label: '完了', count: 3, newCount: 0 },
  { key: 'ST006', label: '評価済', count: 8, newCount: 0 },
];

function RequesterDashboardScreen({ onNavigate }) {
  return (
    <Shell tenantType="REQUESTER" activeKey="dashboard" onNavigate={onNavigate}>
      <PageHeading
        title="ダッシュボード"
        description="自社案件のステータス別状況です。"
        actions={<Button variant="primary" onClick={() => onNavigate && onNavigate('requester-job-new')}>案件登録</Button>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {REQ_KPI.map((k) => (
          <div key={k.key} onClick={() => onNavigate && onNavigate('requester-job-list')} style={{ cursor: 'pointer' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <StatusBadge status={k.key} />
                {k.newCount > 0 && <Tag variant="new">new {k.newCount}</Tag>}
              </div>
              <div style={{ fontSize: 'var(--text-2xl-size)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>{k.count}</div>
              <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>件</div>
            </Card>
          </div>
        ))}
      </div>
      <Panel title="主要な導線">
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('requester-job-list')}>案件一覧</Button>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('users')}>ユーザー追加</Button>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('requester-history')}>取引履歴</Button>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('notifications')}>通知一覧</Button>
        </div>
      </Panel>
    </Shell>
  );
}

// SCR-007 案件登録
const ATTRIBUTE_OPTIONS = [
  { value: 'dangerous', label: '危険物' },
  { value: 'refrigerated', label: '要冷蔵' },
  { value: 'frozen', label: '要冷凍' },
  { value: 'fragile', label: '割れ物' },
];

function JobRegisterScreen({ onNavigate }) {
  const [attributes, setAttributes] = useState([]);
  const toggleAttribute = (value) => {
    setAttributes((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };
  return (
    <Shell tenantType="REQUESTER" activeKey="job-new" onNavigate={onNavigate}>
      <PageHeading title="案件登録" description="積荷情報を入力し、案件を「募集中」として登録します。" />
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 640 }}>
          <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-bold)' }}>場所・時刻</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Field label="積地（from）" required placeholder="東京都江東区…" />
            <Field label="積込希望日時（from）" required type="datetime-local" />
            <Field label="卸地（to）" required placeholder="大阪府大阪市…" />
            <Field label="卸下希望日時（to）" required type="datetime-local" />
          </div>

          <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-bold)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>積荷情報</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Field label="容積（m3）" required type="number" />
            <Field label="物品種別" as="select" required options={[{ value: 'GENERAL_CARGO', label: '一般貨物' }, { value: 'PRECISION', label: '精密機器' }, { value: 'FOOD', label: '食品（冷蔵・冷凍）' }, { value: 'HAZARDOUS', label: '危険物' }, { value: 'OTHER', label: 'その他' }]} />
            <Field label="希望トラック種別" as="select" required options={[{ value: 'light', label: '軽トラック' }, { value: '2t', label: '2tトラック' }, { value: '4t', label: '4tトラック' }, { value: '10t', label: '10tトラック' }, { value: 'trailer', label: 'トレーラー' }]} />
            <div>
              <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>属性（複数選択可）</div>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {ATTRIBUTE_OPTIONS.map((opt) => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={attributes.includes(opt.value)} onChange={() => toggleAttribute(opt.value)} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-bold)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>金額・備考</div>
          <Field label="希望金額（円・税別）" required type="number" placeholder="120000" />
          <Field label="備考" as="textarea" />

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="primary" onClick={() => onNavigate && onNavigate('requester-job-list')}>登録する</Button>
            <Button variant="secondary" onClick={() => onNavigate && onNavigate('dashboard')}>キャンセル</Button>
          </div>
        </div>
      </Card>
    </Shell>
  );
}

// SCR-008 案件一覧（配送依頼企業）
const REQ_OPEN_JOBS = [
  { id: 'JOB-00131', title: '東京→大阪 家具輸送', status: 'ST001', isNew: true, updated: '2026/07/14' },
  { id: 'JOB-00130', title: '横浜→仙台 雑貨輸送', status: 'ST001', isNew: false, updated: '2026/07/12' },
];
const REQ_NEGOTIATING_JOBS = [
  { id: 'JOB-00124', title: '名古屋→福岡 精密機器輸送', status: 'ST002', isNew: true, updated: '2026/07/14' },
  { id: 'JOB-00123', title: '東京→大阪 家具輸送', status: 'ST003', isNew: false, updated: '2026/07/10' },
  { id: 'JOB-00110', title: '仙台→札幌 食品輸送', status: 'ST006', isNew: false, updated: '2026/06/30' },
];

function JobListScreen({ onNavigate }) {
  const cols = [
    { key: 'id', label: '案件ID' },
    { key: 'title', label: '案件名', render: (r) => <span>{r.title} {r.isNew && <Tag variant="new" />}</span> },
    { key: 'status', label: 'ステータス', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'updated', label: '更新日' },
  ];
  return (
    <Shell tenantType="REQUESTER" activeKey="job-list" onNavigate={onNavigate}>
      <PageHeading title="案件一覧" actions={<Button variant="primary" onClick={() => onNavigate && onNavigate('requester-job-new')}>案件登録</Button>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-md-size)', margin: '0 0 var(--space-3)' }}>募集中（未受注）</h3>
          <Card padded={false}>
            <div onClick={() => onNavigate && onNavigate('requester-job-detail')} style={{ cursor: 'pointer' }}>
              <Table columns={cols} rows={REQ_OPEN_JOBS} />
            </div>
          </Card>
        </div>
        <div>
          <h3 style={{ fontSize: 'var(--text-md-size)', margin: '0 0 var(--space-3)' }}>交渉中・済</h3>
          <Card padded={false}>
            <div onClick={() => onNavigate && onNavigate('requester-job-detail')} style={{ cursor: 'pointer' }}>
              <Table columns={cols} rows={REQ_NEGOTIATING_JOBS} />
            </div>
          </Card>
        </div>
      </div>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={1} totalPages={4} />
      </div>
    </Shell>
  );
}

// SCR-009 案件詳細（配送依頼企業）+ SCR-009-01 モーダル
const BIDS = [
  { id: 1, company: '株式会社北陸運送', amount: '¥118,000', contact: '田中 一郎 / 090-xxxx-1234', email: 'tanaka@hokuriku-unso.example.jp', status: 'ST101', isSet: true },
  { id: 2, company: '関東トランスポート株式会社', amount: '¥125,000', contact: '佐藤 花子 / 090-xxxx-5678', email: 'sato@kanto-transport.example.jp', status: 'ST101', isSet: false },
];

function RequesterJobDetailScreen({ onNavigate, initialModalOpen = false }) {
  const [modalOpen, setModalOpen] = useState(initialModalOpen);
  const [toast, setToast] = useState(null);
  return (
    <Shell tenantType="REQUESTER" activeKey="job-list" onNavigate={onNavigate}>
      <PageHeading
        title="JOB-00124 名古屋→福岡 精密機器輸送"
        description={<span style={{ display: 'inline-flex', gap: 'var(--space-2)', alignItems: 'center' }}><StatusBadge status="ST002" /></span>}
        actions={
          <>
            <Button variant="secondary" onClick={() => setToast('現在のステータスでは更新・削除できません。')}>編集</Button>
            <Button variant="secondary" onClick={() => setToast('最終条件の入力に誤りがあります。内容を確認してください。')}>最終条件を提示</Button>
            <Button variant="secondary" disabled onClick={() => setToast('運送会社の完了報告が完了していないため、完了確認はできません。')}>完了確認</Button>
            <Button variant="secondary" onClick={() => onNavigate && onNavigate('requester-job-list')}>一覧へ戻る</Button>
            <Button variant="danger" onClick={() => setToast('現在のステータスでは更新・削除できません。')}>削除</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Card title="案件基本情報">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', fontSize: 'var(--text-sm-size)' }}>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>積地</span><div>名古屋市港区（2026/07/20 09:00）</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>卸地</span><div>福岡市博多区（2026/07/21 14:00）</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>容積</span><div>18 m3</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>物品種別 / トラック種別</span><div>精密機器 / 4tトラック</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>属性</span><div>割れ物</div></div>
              <div><span style={{ color: 'var(--color-text-tertiary)' }}>希望金額</span><div>¥120,000（税別）</div></div>
            </div>
          </Card>

          <Card title="応募一覧">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {BIDS.map((b) => (
                <div
                  key={b.id}
                  onClick={() => b.isSet && setModalOpen(true)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: b.isSet ? 'pointer' : 'default' }}
                >
                  <div>
                    <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-medium)' }}>{b.company} {b.isSet && <Tag variant="neutral">セット応募</Tag>}</div>
                    <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>{b.contact} / {b.email}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <StatusBadge status={b.status} />
                    <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-bold)' }}>{b.amount}</div>
                    <Button variant="primary" size="sm">合意する</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="連絡履歴">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm-size)' }}>
              <div><b>山田 太郎</b> <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>2026/07/13 10:00</span><div>積込時間の前後は可能でしょうか。</div></div>
              <div><b>田中 一郎（株式会社北陸運送）</b> <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>2026/07/13 11:20</span><div>1時間程度であれば対応可能です。</div></div>
            </div>
            <div style={{ marginTop: 'var(--space-4)' }}><Field as="textarea" placeholder="メッセージを入力" /></div>
            <Button variant="primary" size="sm">送信する</Button>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Panel title="最終条件提示状況">
            <div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>現在提示中の最終条件はありません。</div>
          </Panel>
          <Panel title="運送ステータス">
            <div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-tertiary)' }}>運送開始報告: 未実施</div>
          </Panel>
        </div>
      </div>

      {modalOpen && (
        <Modal
          title="セット応募の確認"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>キャンセル</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>一括承認する</Button>
            </>
          }
        >
          <p style={{ marginTop: 0, fontSize: 'var(--text-sm-size)' }}>このセット応募には以下の案件が含まれます。<b>案件ごとの個別合意はできません。</b>一括で承認するとセット内全案件が同時に成約します。</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {[{ id: 'JOB-00124', route: '名古屋→福岡', amount: '¥118,000' }, { id: 'JOB-00126', route: '福岡→熊本', amount: '¥42,000' }].map((j) => (
              <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-surface-sunken)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm-size)' }}>
                <span>{j.id}（{j.route}）</span><span>{j.amount}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {toast && <Toast tone="error" message={toast} onClose={() => setToast(null)} />}
    </Shell>
  );
}

// SCR-010 評価登録（配送依頼企業）
function RequesterRatingScreen({ onNavigate }) {
  return (
    <Shell tenantType="REQUESTER" onNavigate={onNavigate}>
      <PageHeading title="評価登録" description="完了した案件について、運送会社を評価します。" />
      <Card>
        <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
            JOB-00098「名古屋→福岡 精密機器輸送」／相手企業: 株式会社北陸運送
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>評価 <span style={{ color: 'var(--color-danger)' }}>必須</span></div>
            <div style={{ display: 'flex', gap: 'var(--space-1)', fontSize: 28, color: 'var(--warning-500)' }}>★★★★☆</div>
          </div>
          <Field label="コメント（任意）" as="textarea" />
          <Button variant="primary" onClick={() => onNavigate && onNavigate('requester-job-detail')}>登録する</Button>
        </div>
      </Card>
    </Shell>
  );
}

// SCR-011 取引履歴一覧（配送依頼企業）
const REQ_HISTORY = [
  { id: 'JOB-00098', title: '名古屋→福岡 精密機器輸送', status: 'ST006', date: '2026/06/28' },
  { id: 'JOB-00087', title: '東京→仙台 建材輸送', status: 'ST006', date: '2026/06/10' },
  { id: 'JOB-00123', title: '東京→大阪 家具輸送', status: 'ST004', date: '2026/07/10' },
];

function RequesterHistoryScreen({ onNavigate }) {
  return (
    <Shell tenantType="REQUESTER" activeKey="history" onNavigate={onNavigate}>
      <PageHeading title="取引履歴一覧" description="成約済〜評価済の過去案件を表示します。" />
      <Card padded={false}>
        <div onClick={() => onNavigate && onNavigate('requester-job-detail')} style={{ cursor: 'pointer' }}>
          <Table
            columns={[
              { key: 'id', label: '案件ID' },
              { key: 'title', label: '案件名' },
              { key: 'status', label: 'ステータス', render: (r) => <StatusBadge status={r.status} /> },
              { key: 'date', label: '成約日' },
            ]}
            rows={REQ_HISTORY}
            emptyMessage="取引履歴がありません"
          />
        </div>
      </Card>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={1} totalPages={2} />
      </div>
    </Shell>
  );
}


window.UIKit = window.UIKit || {};
Object.assign(window.UIKit, { RequesterDashboardScreen, JobRegisterScreen, JobListScreen, RequesterJobDetailScreen, RequesterRatingScreen, RequesterHistoryScreen });
