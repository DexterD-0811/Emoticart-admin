import { LoginForm } from '../components/login-form.jsx';

export function LoginPage() {

  return (
    <div id='loginPage'>
      <div className="auth-header">
        <div className="auth-logo">
          <span className="logo-icon">🏢</span>
          <h1>Admin Dashboard</h1>
        </div>
        <p className="auth-subtitle">Sign in to your account</p>
      </div>
          <LoginForm />
      <div className="auth-footer">
        <p>© 2024 Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
}
