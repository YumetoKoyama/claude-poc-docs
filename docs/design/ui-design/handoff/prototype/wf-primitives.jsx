// Auto-derived standalone copy of the design-system primitives for the UI kit preview.
// Source of truth remains components/**/*.jsx — keep in sync when those change.
const { useState } = React;

function AppHeader({
  tenantName = 'テナント名',
  userName = 'ユーザー名',
  unreadCount = 0,
  onLogoClick,
  onBellClick,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const badge = unreadCount > 9 ? '9+' : String(unreadCount);

  return (
    <header
      style={{
        height: 'var(--header-height)',
        minWidth: 'var(--layout-min-width)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--page-padding-x)',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        onClick={onLogoClick}
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--text-sm-size)',
          }}
        >
          配
        </div>
        <span style={{ fontSize: 'var(--text-md-size)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
          配送マッチング
        </span>
        <span
          style={{
            fontSize: 'var(--text-xs-size)',
            color: 'var(--color-text-tertiary)',
            borderLeft: '1px solid var(--color-border)',
            paddingLeft: 'var(--space-3)',
            marginLeft: 'var(--space-1)',
          }}
        >
          {tenantName}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <button
          onClick={onBellClick}
          aria-label="通知"
          style={{
            position: 'relative',
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            border: '1px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                minWidth: 16,
                height: 16,
                padding: '0 3px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-danger)',
                color: 'var(--color-text-inverse)',
                fontSize: 10,
                fontWeight: 'var(--font-weight-bold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              {badge}
            </span>
          )}
        </button>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-surface-sunken)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-xs-size)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {userName.slice(0, 1)}
            </div>
            <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)' }}>{userName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 0,
                minWidth: 140,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                zIndex: 20,
              }}
            >
              <button
                onClick={onLogout}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm-size)',
                  color: 'var(--color-text-primary)',
                }}
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const NAV_ITEMS = {
  REQUESTER: [
    { key: 'dashboard', label: 'ダッシュボード', icon: 'grid' },
    { key: 'job-new', label: '案件登録', icon: 'plus' },
    { key: 'job-list', label: '案件一覧', icon: 'list' },
    { key: 'history', label: '取引履歴', icon: 'clock' },
    { key: 'users', label: 'ユーザー追加', icon: 'user-plus' },
  ],
  CARRIER: [
    { key: 'dashboard', label: 'ダッシュボード', icon: 'grid' },
    { key: 'job-open', label: '募集中案件一覧', icon: 'list' },
    { key: 'job-negotiating', label: '交渉中・済一覧', icon: 'chat' },
    { key: 'history', label: '取引履歴', icon: 'clock' },
    { key: 'users', label: 'ユーザー追加', icon: 'user-plus' },
  ],
};

const ICONS = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  plus: 'M12 5v14M5 12h14',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  chat: 'M21 11.5a8.38 8.38 0 0 1-8.5 8.5A8.5 8.5 0 1 1 21 11.5z',
  clock: 'M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  'user-plus': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6',
};

function GlobalNav({ tenantType = 'REQUESTER', activeKey = 'dashboard', onNavigate }) {
  const items = NAV_ITEMS[tenantType] || NAV_ITEMS.REQUESTER;
  return (
    <nav
      style={{
        width: 'var(--nav-width)',
        flexShrink: 0,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        padding: 'var(--space-4) var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
      }}
    >
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate && onNavigate(item.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-3)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              textAlign: 'left',
              background: active ? 'var(--color-primary-subtle)' : 'transparent',
              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm-size)',
              fontWeight: active ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d={ICONS[item.icon]} />
            </svg>
            {item.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <a
        href="#contact"
        style={{
          fontSize: 'var(--text-xs-size)',
          color: 'var(--color-text-tertiary)',
          padding: 'var(--space-3)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        お問い合わせ
      </a>
    </nav>
  );
}

function Card({ title, actions, children, padded = true }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {(title || actions) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 'var(--text-md-size)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </h3>
          {actions && <div style={{ display: 'flex', gap: 'var(--space-2)' }}>{actions}</div>}
        </div>
      )}
      <div style={{ padding: padded ? 'var(--space-5)' : 0 }}>{children}</div>
    </div>
  );
}

function Panel({ title, description, children }) {
  return (
    <section
      style={{
        background: 'var(--color-surface-sunken)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
      }}
    >
      {title && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h4
            style={{
              margin: 0,
              fontSize: 'var(--text-base-size)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </h4>
          {description && (
            <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

const BUTTON_VARIANT_STYLES = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
    border: '1px solid var(--color-primary)',
  },
  secondary: {
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-strong)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'var(--color-surface)',
    color: 'var(--color-danger)',
    border: '1px solid var(--danger-100)',
  },
};

const VARIANT_HOVER = {
  primary: { background: 'var(--color-primary-hover)', borderColor: 'var(--color-primary-hover)' },
  secondary: { background: 'var(--color-surface-sunken)' },
  ghost: { background: 'var(--color-surface-sunken)' },
  danger: { background: 'var(--color-danger-subtle)' },
};

const SIZE_STYLES = {
  sm: { padding: '0 var(--space-3)', height: 30, fontSize: 'var(--text-xs-size)' },
  md: { padding: '0 var(--space-4)', height: 36, fontSize: 'var(--text-sm-size)' },
  lg: { padding: '0 var(--space-5)', height: 44, fontSize: 'var(--text-md-size)' },
};

function Button({ variant = 'primary', size = 'md', disabled = false, loading = false, children, onClick, type = 'button' }) {
  const [hover, setHover] = React.useState(false);
  const base = BUTTON_VARIANT_STYLES[variant] || BUTTON_VARIANT_STYLES.primary;
  const hoverStyle = !disabled && hover ? VARIANT_HOVER[variant] : {};

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...SIZE_STYLES[size],
        ...hoverStyle,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        borderRadius: 'var(--radius-md)',
        fontWeight: 'var(--font-weight-medium)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background 0.12s ease, border-color 0.12s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {loading && (
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'ds-spin 0.7s linear infinite',
          }}
        />
      )}
      {children}
      <style>{'@keyframes ds-spin { to { transform: rotate(360deg); } }'}</style>
    </button>
  );
}

function Field({ label, required = false, hint, error, type = 'text', placeholder, value, onChange, options, as = 'input' }) {
  const inputStyle = {
    width: '100%',
    height: 36,
    padding: '0 var(--space-3)',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border-strong)'}`,
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--text-sm-size)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      {label && (
        <label style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
          {label}
          {required && <span style={{ color: 'var(--color-danger)', marginLeft: 4 }}>必須</span>}
        </label>
      )}

      {as === 'select' ? (
        <select value={value} onChange={onChange} style={inputStyle}>
          {(options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          style={{ ...inputStyle, height: 'auto', padding: 'var(--space-2) var(--space-3)', resize: 'vertical' }}
        />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle} />
      )}

      {error ? (
        <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-danger)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>{hint}</span>
      ) : null}
    </div>
  );
}

function Modal({ open = true, title, children, footer, onClose }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(19, 22, 28, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          maxWidth: '90%',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 'var(--text-md-size)', fontWeight: 'var(--font-weight-bold)' }}>{title}</h3>
          <button
            onClick={onClose}
            aria-label="閉じる"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ padding: 'var(--space-5)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)' }}>{children}</div>
        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--space-3)',
              padding: 'var(--space-4) var(--space-5)',
              borderTop: '1px solid var(--color-border)',
              background: 'var(--color-surface-sunken)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

const TONE = {
  success: { bg: 'var(--color-success-subtle)', fg: 'var(--success-700)', icon: 'M20 6L9 17l-5-5' },
  error: { bg: 'var(--color-danger-subtle)', fg: 'var(--danger-700)', icon: 'M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' },
  info: { bg: 'var(--color-info-subtle)', fg: 'var(--info-700)', icon: 'M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z' },
};

function Toast({ tone = 'error', message, onClose }) {
  const t = TONE[tone] || TONE.error;
  return (
    <div
      style={{
        position: 'absolute',
        top: 'var(--space-6)',
        right: 'var(--space-6)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        minWidth: 320,
        maxWidth: 420,
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderLeft: `3px solid ${t.fg}`,
        boxShadow: 'var(--shadow-lg)',
        zIndex: 200,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.fg} strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
        <path d={t.icon} />
      </svg>
      <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)', flex: 1 }}>{message}</span>
      <button onClick={onClose} aria-label="閉じる" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// 案件ステータス / 応募ステータスの表示ラベルと配色マッピング
const STATUS_MAP = {
  // 案件ステータス
  ST001: { label: '募集中', tone: 'info' },
  ST002: { label: '交渉中', tone: 'warning' },
  ST003: { label: '成約済', tone: 'success' },
  ST004: { label: '運送中', tone: 'violet' },
  ST005: { label: '完了', tone: 'success-strong' },
  ST006: { label: '評価済', tone: 'neutral' },
  ST007: { label: 'キャンセル', tone: 'neutral' },
  // 応募ステータス
  ST101: { label: '応募中', tone: 'info' },
  ST102: { label: '成約', tone: 'success' },
  ST103: { label: 'クローズ（他社成約）', tone: 'neutral' },
  ST104: { label: 'クローズ（セット連動不成立）', tone: 'neutral' },
};

const TONE_STYLES = {
  info: { bg: 'var(--color-info-subtle)', fg: 'var(--info-700)' },
  warning: { bg: 'var(--color-warning-subtle)', fg: 'var(--warning-700)' },
  success: { bg: 'var(--color-success-subtle)', fg: 'var(--success-700)' },
  'success-strong': { bg: 'var(--success-500)', fg: 'var(--color-text-inverse)' },
  violet: { bg: 'var(--violet-100)', fg: 'var(--violet-700)' },
  neutral: { bg: 'var(--color-surface-sunken)', fg: 'var(--color-text-secondary)' },
};

function StatusBadge({ status, label }) {
  const entry = STATUS_MAP[status] || { label: label || status, tone: 'neutral' };
  const s = TONE_STYLES[entry.tone] || TONE_STYLES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0 var(--space-3)',
        height: 22,
        borderRadius: 'var(--radius-full)',
        background: s.bg,
        color: s.fg,
        fontSize: 'var(--text-xs-size)',
        fontWeight: 'var(--font-weight-medium)',
        whiteSpace: 'nowrap',
      }}
    >
      {label || entry.label}
    </span>
  );
}

const TAG_VARIANT_STYLES = {
  new: { bg: 'var(--color-danger-subtle)', fg: 'var(--danger-700)', label: 'new' },
  deleted: { bg: 'var(--color-surface-sunken)', fg: 'var(--color-text-tertiary)', label: '削除済み' },
  neutral: { bg: 'var(--color-surface-sunken)', fg: 'var(--color-text-secondary)' },
};

function Tag({ variant = 'neutral', children }) {
  const v = TAG_VARIANT_STYLES[variant] || TAG_VARIANT_STYLES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0 var(--space-2)',
        height: 18,
        borderRadius: 'var(--radius-sm)',
        background: v.bg,
        color: v.fg,
        fontSize: 10,
        fontWeight: 'var(--font-weight-bold)',
        letterSpacing: '0.02em',
        textTransform: variant === 'new' ? 'uppercase' : 'none',
      }}
    >
      {children || v.label}
    </span>
  );
}

function Table({ columns = [], rows = [], emptyMessage = '該当データなし' }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm-size)' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                textAlign: col.align || 'left',
                padding: 'var(--space-3) var(--space-4)',
                borderBottom: '1px solid var(--color-border-strong)',
                color: 'var(--color-text-secondary)',
                fontWeight: 'var(--font-weight-medium)',
                whiteSpace: 'nowrap',
                background: 'var(--color-surface-sunken)',
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          rows.map((row, i) => (
            <tr key={row.id ?? i} style={{ borderBottom: '1px solid var(--color-border)' }}>
              {columns.map((col) => (
                <td key={col.key} style={{ padding: 'var(--space-3) var(--space-4)', textAlign: col.align || 'left', color: 'var(--color-text-primary)' }}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

function Pagination({ page = 1, totalPages = 1, onChange }) {
  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange && onChange(p);
  };

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let p = start; p <= end; p++) pages.push(p);

  const btnStyle = (active) => ({
    minWidth: 30,
    height: 30,
    padding: '0 var(--space-2)',
    borderRadius: 'var(--radius-md)',
    border: active ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
    background: active ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
    color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    fontSize: 'var(--text-sm-size)',
    fontWeight: active ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
    cursor: 'pointer',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <button onClick={() => go(page - 1)} disabled={page === 1} style={{ ...btnStyle(false), opacity: page === 1 ? 0.4 : 1 }} aria-label="前へ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => go(p)} style={btnStyle(p === page)}>
          {p}
        </button>
      ))}
      <button onClick={() => go(page + 1)} disabled={page === totalPages} style={{ ...btnStyle(false), opacity: page === totalPages ? 0.4 : 1 }} aria-label="次へ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

window.DS = window.DS || {};
Object.assign(window.DS, { AppHeader, GlobalNav, Card, Panel, Button, Field, Modal, Toast, StatusBadge, Tag, Table, Pagination });
