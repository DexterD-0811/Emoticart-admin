import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulate async login operation
    setTimeout(() => {
      setLoading(false);
      // Handle login success/failure here
      console.log(`Logged in with email: ${email}`);
    }, 1500);
      navigate("/admin/dashboard");
  };

  return (
    <form id="loginForm" className="auth-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="loginEmail">Email Address</label>
        <input
          type="email"
          id="loginEmail"
          required
          placeholder="admin@dashboard.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="input-icon">📧</span>
      </div>

      <div className="form-group">
        <label htmlFor="loginPassword">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="loginPassword"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="input-icon password-toggle"
          onClick={togglePassword}
          role="button"
          style={{ cursor: "pointer" }}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") togglePassword();
          }}
        >
          👁️
        </span>
      </div>

      <div className="form-options">
        <label className="checkbox-container">
          <input type="checkbox" id="rememberMe" />
          <span className="checkmark"></span>
          Remember me for 30 days
        </label>
        <Link to="/forgotpassword" className="forgot-link">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="auth-btn primary"
        id="loginBtn"
        disabled={loading}
      >
        <span className="btn-text">Sign In</span>
        {loading && <span className="btn-loading">🔄 Signing in...</span>}
      </button>

      <div className="auth-divider">
        <span>Demo Credentials</span>
      </div>

      <div className="demo-credentials">
        <div className="demo-item">
          <strong>Email:</strong> admin@dashboard.com
        </div>
        <div className="demo-item">
          <strong>Password:</strong> admin123
        </div>
      </div>
    </form>
  );
};
