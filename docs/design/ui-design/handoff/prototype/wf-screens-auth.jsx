function AuthShell({ children, width = 400 }) {
  return (
    <div
      style={{
        minWidth: 1280,
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg-canvas)',
        padding: 'var(--space-16) 0',
      }}
    >
      <div style={{ width, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>配</div>
          <span style={{ fontSize: 'var(--text-md-size)', fontWeight: 'var(--font-weight-bold)' }}>配送マッチング</span>
        </div>
        {children}
      </div>
    </div>
  );
}

// SCR-001 ログイン
function LoginScreen({ onNavigate }) {
  return (
    <AuthShell>
      <h2 style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--text-lg-size)', textAlign: 'center' }}>ログイン</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Field label="ログイン ID" required placeholder="login-id" />
        <Field label="パスワード" type="password" required />
        <Button variant="primary" size="lg" onClick={() => onNavigate && onNavigate('requester-dashboard')}>ログイン</Button>
      </div>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center', fontSize: 'var(--text-sm-size)' }}>
        <a href="#signup" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('signup'); }}>新規登録</a>
        <a href="#reset" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('reset-request'); }}>パスワードをお忘れですか</a>
      </div>
    </AuthShell>
  );
}

// SCR-002 企業アカウント登録
function SignUpScreen({ onNavigate }) {
  return (
    <AuthShell width={480}>
      <h2 style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--text-lg-size)', textAlign: 'center' }}>企業アカウント登録</h2>

      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>企業種別</div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="primary" size="sm">配送依頼企業</Button>
          <Button variant="secondary" size="sm">運送会社</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>企業共通項目</div>
        <Field label="法人名" required />
        <Field label="住所" required />
        <Field label="会社電話番号" required />
        <Field label="会社メールアドレス" required type="email" />
        <Field label="支払方法" as="select" required options={[{ value: 'INVOICE', label: '請求書払い（月末締め翌月末払い）' }, { value: 'BANK_TRANSFER', label: '銀行振込' }]} />

        <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>初回ユーザー項目</div>
        <Field label="ユーザー名（識別名）" required />
        <Field label="ログイン ID" required />
        <Field label="登録メールアドレス" required type="email" />
        <Field label="ログイン用パスワード" type="password" required hint="最小8文字・英字+数字各1文字以上" />

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
          <input type="checkbox" style={{ marginTop: 3 }} />
          利用規約・プライバシーポリシーに同意します
        </label>

        <Button variant="primary" size="lg" onClick={() => onNavigate && onNavigate('login')}>登録する</Button>
        <Button variant="ghost" onClick={() => onNavigate && onNavigate('login')}>キャンセル / 戻る</Button>
      </div>
    </AuthShell>
  );
}

// SCR-003 パスワードリセット申請
function ResetRequestScreen({ onNavigate }) {
  return (
    <AuthShell>
      <h2 style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--text-lg-size)', textAlign: 'center' }}>パスワードリセット申請</h2>
      <p style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: 'var(--space-5)' }}>
        登録済みのメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Field label="登録メールアドレス" required type="email" />
        <Button variant="primary" size="lg">送信する</Button>
      </div>
      <div style={{ marginTop: 'var(--space-5)', textAlign: 'center', fontSize: 'var(--text-sm-size)' }}>
        <a href="#login" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('login'); }}>ログイン画面へ戻る</a>
      </div>
    </AuthShell>
  );
}

// SCR-004 パスワードリセット再設定
function ResetConfirmScreen({ onNavigate }) {
  return (
    <AuthShell>
      <h2 style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--text-lg-size)', textAlign: 'center' }}>新しいパスワードの設定</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Field label="新パスワード" type="password" required hint="最小8文字・英字+数字各1文字以上" />
        <Button variant="primary" size="lg" onClick={() => onNavigate && onNavigate('login')}>設定する</Button>
      </div>
      <p style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
        リンクの有効期限が切れている場合は<a href="#reset" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('reset-request'); }}>再度申請</a>してください。
      </p>
    </AuthShell>
  );
}


window.UIKit = window.UIKit || {};
Object.assign(window.UIKit, { LoginScreen, SignUpScreen, ResetRequestScreen, ResetConfirmScreen });
