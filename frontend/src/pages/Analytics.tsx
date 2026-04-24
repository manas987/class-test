import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import { useTheme } from "@/context/ThemeContext";

interface Summary {
  totalPosts: number;
  publishedCount: number;
  draftCount: number;
  totalViews: number;
  averageViewsPerPost: number;
  tagCounts: Record<string, number>;
}

export function Analytics() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    void (async () => {
      const res = await apiFetch("/analytics/summary");
      if (!res.ok) {
        setError("Could not load analytics");
        return;
      }
      const data = (await res.json()) as { summary: Summary };
      setSummary(data.summary);
    })();
  }, []);

  return (
    <div className="space-y-4 ">
      <h1 className="text-lg font-semibold">Analytics</h1>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {summary ? (
        <ul className="space-y-1 text-sm">
          <li>Total posts: {summary.totalPosts}</li>
          <li>Published: {summary.publishedCount}</li>
          <li>Drafts: {summary.draftCount}</li>
          <li>Total views: {summary.totalViews}</li>
          <li>Average views / post: {summary.averageViewsPerPost}</li>
          <li>Tags: {JSON.stringify(summary.tagCounts)}</li>
        </ul>
      ) : (
        <p className="text-sm text-neutral-400">Loading…</p>
      )}
    </div>
  );
}
