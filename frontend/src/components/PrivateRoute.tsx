import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function PrivateRoute() {
  const { user } = useAuth();
  const { loading } = useAuth();

  if (loading) {
    return null;
  } else if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
