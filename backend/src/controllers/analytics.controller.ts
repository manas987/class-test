import type { Response } from "express";
import { posts } from "../data/store.js";
import type { AuthedRequest } from "../middleware/auth.middleware.js";

export function getAnalyticsSummary(req: AuthedRequest, res: Response): void {
  const userId = req.userId!;
  const mine = posts.filter(p => p.userId === userId);
  const published = mine.filter(p => p.status === "published");
  const drafts = mine.filter(p => p.status === "draft");
  const totalViews = mine.reduce((sum, p) => sum + p.views, 0);
  const tagCounts: Record<string, number> = {};
  for (const p of mine) {
    for (const t of p.tags) {
      tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    }
  }

  res.json({
    summary: {
      totalPosts: mine.length,
      publishedCount: published.length,
      draftCount: drafts.length,
      totalViews,
      averageViewsPerPost: mine.length ? Math.round(totalViews / mine.length) : 0,
      tagCounts,
    },
  });
}
