import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { Analytics } from "./pages/Analytics";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { Settings } from "./pages/Settings";
import { useTheme } from "./context/ThemeContext";

export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={
        theme === "light"
          ? "h-screen bg-white text-black"
          : "h-screen bg-black text-white"
      }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
