import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  "block rounded px-2 py-1 " + (isActive ? "bg-neutral-700" : "hover:bg-neutral-800");

export function Layout() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full max-w-5xl p-4">
      <header
        className={
          "mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-700 pb-3 " +
          (theme === "light" ? "bg-neutral-200 text-black" : "bg-neutral-900 text-white")
        }
      >
        <div className="font-semibold">CreatorHub</div>
        <nav className="flex flex-wrap gap-2 text-sm">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/posts" className={linkClass}>
            Posts
          </NavLink>
          <NavLink to="/analytics" className={linkClass}>
            Analytics
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden sm:inline">{user?.name}</span>
          <button type="button" className="rounded border border-neutral-600 px-2 py-1" onClick={toggleTheme}>
            Theme: {theme}
          </button>
          <button type="button" className="rounded border border-neutral-600 px-2 py-1" onClick={logout}>
            Log out
          </button>
        </div>
      </header>
      <main className="text-sm">
        <Outlet />
      </main>
    </div>
  );
}
