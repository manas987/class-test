export const API_BASE = "http://localhost:4000/api";

export function getToken(): string | null {
  return localStorage.getItem("creatorhub_token");
}

export function setToken(token: string): void {
  localStorage.setItem("creatorhub_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("creatorhub_token");
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}
