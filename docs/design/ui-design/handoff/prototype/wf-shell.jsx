function Shell({ tenantType = 'REQUESTER', tenantName = '株式会社サンプル物流', userName = '山田 太郎', unreadCount = 3, activeKey, onNavigate, children }) {
  return (
    <div style={{ minWidth: 1280, minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-canvas)' }}>
      <AppHeader tenantName={tenantName} userName={userName} unreadCount={unreadCount} onBellClick={() => onNavigate && onNavigate('notifications')} onLogoClick={() => onNavigate && onNavigate('dashboard')} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <GlobalNav tenantType={tenantType} activeKey={activeKey} onNavigate={onNavigate} />
        <main style={{ flex: 1, padding: 'var(--page-padding-y) var(--page-padding-x)', overflow: 'auto', position: 'relative' }}>
          <div style={{ maxWidth: 'var(--content-max-width)' }}>{children}</div>
        </main>
      </div>
    </div>
  );
}

function PageHeading({ title, description, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 'var(--text-xl-size)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>{title}</h1>
        {description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{description}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 'var(--space-3)' }}>{actions}</div>}
    </div>
  );
}


window.UIKit = window.UIKit || {};
Object.assign(window.UIKit, { Shell, PageHeading });
