import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import { StatCard } from "../components/StatCard";

export function Dashboard() {
  const { user } = useAuth();
  const [postCount, setPostCount] = useState<number | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await apiFetch("/posts");
      if (!res.ok) return;
      const data = (await res.json()) as { posts: unknown[] };
      setPostCount(data.posts.length);
    })();
  }, [user?.id]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <section className="rounded border border-neutral-600 p-4">
        <h2 className="mb-2 font-medium">Creator profile</h2>
        <div className="flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-lg">
            {user?.name?.charAt(0) ?? "?"}
          </div>
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-neutral-400">{user?.email}</div>
            <p className="mt-1 text-sm text-neutral-300">{user?.bio}</p>
          </div>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Your posts" value={postCount ?? "—"} style={{ marginBottom: 8 }} />
        <StatCard label="Workspace" value="CreatorHub" style={{ marginBottom: 8 }} />
      </section>
    </div>
  );
}
