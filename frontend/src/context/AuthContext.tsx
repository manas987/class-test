import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiFetch, clearToken, getToken, setToken } from "../lib/api";

export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  themePreference: "light" | "dark";
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const res = await apiFetch("/auth/me");
    if (!res.ok) return;
    const data = (await res.json()) as { user: User };
    setUser(data.user);
  }, []);

  useEffect(() => {
    const stored = getToken();
    if (!stored) {
      setLoading(false);
      return;
    }
    setTokenState(stored);
    void (async () => {
      const res = await apiFetch("/auth/me");
      if (res.ok) {
        const data = (await res.json()) as { user: User };
        setUser(data.user);
      }
      setLoading(false);
    })();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? "Login failed");
      }
      const data = (await res.json()) as { token: string; user: User };
      setToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
    },
    [token, user],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("creatorhub_token");
    setUser(null);
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      refreshUser,
    }),
    [user, token, loading, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
