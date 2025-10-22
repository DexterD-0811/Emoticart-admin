import { Link } from "react-router";

export function ForgotPassword({ handleForgotPassword, showLogin }) {
  return (
    <div id="forgotPasswordPage">
      <div className="auth-header">
        <div className="auth-logo">
          <span className="logo-icon">🔐</span>
          <h1>Reset Password</h1>
        </div>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
      </div>

      <form id="forgotPasswordForm" className="auth-form" onSubmit={handleForgotPassword}>
        <div className="form-group">
          <label htmlFor="forgotEmail">Email Address</label>
          <input
            type="email"
            id="forgotEmail"
            required
            placeholder="Enter your email address"
          />
          <span className="input-icon">📧</span>
        </div>

        <button type="submit" className="auth-btn primary" id="forgotBtn">
          <span className="btn-text">Send Reset Link</span>
          <span className="btn-loading" style={{ display: 'none' }}>📤 Sending...</span>
        </button>

        <div className="auth-links">
          <Link to={"/"} className="back-link">
            ← Back to Sign In
          </Link>
        </div>
      </form>

      <div className="auth-footer">
        <p>© 2024 Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
}
