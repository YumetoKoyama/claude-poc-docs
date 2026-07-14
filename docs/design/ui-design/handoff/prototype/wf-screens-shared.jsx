// SCR-005 ユーザー追加（両ロール共通）
function UserAddScreen({ tenantType = 'REQUESTER', onNavigate }) {
  return (
    <Shell tenantType={tenantType} activeKey="users" onNavigate={onNavigate}>
      <PageHeading title="ユーザー追加" description="同一テナント内に新しいユーザーを追加します（権限は既存ユーザーと同一です）。" />
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 420 }}>
          <Field label="ユーザー名（識別名）" required />
          <Field label="ログイン ID" required hint="テナント内で一意である必要があります" />
          <Field label="登録メールアドレス" required type="email" hint="システム全体で一意である必要があります" />
          <Field label="ログイン用パスワード" type="password" required />
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Button variant="primary" onClick={() => onNavigate && onNavigate('dashboard')}>追加する</Button>
            <Button variant="secondary" onClick={() => onNavigate && onNavigate('dashboard')}>キャンセル</Button>
          </div>
        </div>
      </Card>
    </Shell>
  );
}

// SCR-012 通知一覧（両ロール共通）
const NOTIFICATIONS = [
  { id: 1, kind: '成約', body: 'JOB-00123「東京→大阪 家具輸送」が成約しました。', read: false, date: '2026/07/14 09:12' },
  { id: 2, kind: 'message', body: '新着メッセージがあります。', read: false, date: '2026/07/14 08:40' },
  { id: 3, kind: 'message', body: '新着メッセージがあります。', read: true, date: '2026/07/13 17:05' },
  { id: 4, kind: '成約', body: 'JOB-00098「名古屋→福岡 精密機器輸送」が成約しました。', read: true, date: '2026/07/12 11:30' },
];

function NotificationsScreen({ tenantType = 'REQUESTER', onNavigate }) {
  return (
    <Shell tenantType={tenantType} activeKey="dashboard" onNavigate={onNavigate}>
      <PageHeading title="通知一覧" />
      <Card padded={false}>
        <div>
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              onClick={() => onNavigate && onNavigate(tenantType === 'REQUESTER' ? 'requester-job-detail' : 'carrier-job-detail')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                padding: 'var(--space-4) var(--space-5)',
                borderBottom: '1px solid var(--color-border)',
                background: n.read ? 'transparent' : 'var(--color-primary-subtle)',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontSize: 'var(--text-xs-size)',
                  fontWeight: 'var(--font-weight-bold)',
                  padding: '2px var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                  background: n.kind === '成約' ? 'var(--color-success-subtle)' : 'var(--color-surface-sunken)',
                  color: n.kind === '成約' ? 'var(--success-700)' : 'var(--color-text-secondary)',
                }}
              >
                {n.kind === '成約' ? '成約' : 'メッセージ'}
              </span>
              <span style={{ flex: 1, fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)', fontWeight: n.read ? 'var(--font-weight-regular)' : 'var(--font-weight-medium)' }}>{n.body}</span>
              <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>{n.date}</span>
              {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />}
            </div>
          ))}
        </div>
      </Card>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={1} totalPages={3} />
      </div>
    </Shell>
  );
}

// SCR-019 工事中
function UnderConstructionScreen({ tenantType = 'REQUESTER', onNavigate }) {
  return (
    <Shell tenantType={tenantType} onNavigate={onNavigate}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-5)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>
        <h2 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-lg-size)' }}>このページは準備中です</h2>
        <p style={{ margin: '0 0 var(--space-6)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)', maxWidth: 420 }}>
          お問い合わせフォームは現在準備中です。不具合等のご報告は、担当営業までご連絡ください。
        </p>
        <Button variant="secondary" onClick={() => onNavigate && onNavigate('dashboard')}>戻る</Button>
      </div>
    </Shell>
  );
}


window.UIKit = window.UIKit || {};
Object.assign(window.UIKit, { UserAddScreen, NotificationsScreen, UnderConstructionScreen });
