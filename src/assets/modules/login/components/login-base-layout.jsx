import { Outlet } from "react-router";

export function LoginBaseLayout() {

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
