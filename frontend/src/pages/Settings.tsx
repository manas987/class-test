import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import { useTheme } from "@/context/ThemeContext";

export function Settings() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [themePreference, setThemePreference] = useState<"light" | "dark">(
    "dark",
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await apiFetch("/profile/settings");
      if (!res.ok) return;
      const data = (await res.json()) as {
        settings: {
          name: string;
          bio: string;
          themePreference: "light" | "dark";
        };
      };
      setName(data.settings.name);
      setBio(data.settings.bio);
      setThemePreference(data.settings.themePreference);
    })();
  }, [user?.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setTheme(themePreference);
    const res = await apiFetch("/profile/settings", {
      method: "PUT",
      body: JSON.stringify({
        name,
        bio,
      }),
    });
    if (!res.ok) {
      setMessage("Save failed");
      return;
    }
    setMessage("Saved");
    await refreshUser();
  }
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Settings</h1>
      <form onSubmit={handleSave} className="max-w-md space-y-3">
        <label className="flex flex-col gap-1">
          Display name
          <input
            className={`rounded border border-neutral-600 ${theme === "light" ? "bg-neutral-200" : "bg-neutral-900"}  px-2 py-1`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          Bio
          <textarea
            className={`rounded border border-neutral-600 ${theme === "light" ? "bg-neutral-200" : "bg-neutral-900"}  px-2 py-1`}
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          Theme preference (profile)
          <select
            className={`rounded border border-neutral-600 ${theme === "light" ? "bg-neutral-200" : "bg-neutral-900"} px-2 py-1`}
            value={themePreference}
            onChange={(e) =>
              setThemePreference(e.target.value as "light" | "dark")
            }>
            <option value="dark">dark</option>
            <option value="light">light</option>
          </select>
        </label>
        {message ? <p className="text-sm text-neutral-400">{message}</p> : null}
        <button
          type="submit"
          className="rounded border border-neutral-600 px-3 py-1">
          Save changes
        </button>
      </form>
    </div>
  );
}
