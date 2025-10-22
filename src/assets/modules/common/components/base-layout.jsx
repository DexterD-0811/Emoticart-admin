import { TopNav } from "./top-nav";
import { SideBar } from "./side-bar";
import { Outlet } from "react-router";

export function BaseLayout() {
  return (
    <>
      <TopNav />
      <SideBar />
      <main className="dashboard-container">
        <Outlet />
      </main>
    </>
  );
}