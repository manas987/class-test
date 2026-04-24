import type { Response } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { posts } from "../data/store.js";
import type { AuthedRequest } from "../middleware/auth.middleware.js";

const createSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(["draft", "published"]).optional(),
  tags: z.array(z.string()).optional(),
});

const updateSchema = createSchema.partial();

export function listPosts(req: AuthedRequest, res: Response): void {
  const userId = req.userId!;
  const status = typeof req.query.status === "string" ? req.query.status : undefined;
  const q = typeof req.query.q === "string" ? req.query.q.toLowerCase() : "";

  let list = posts.filter(p => p.userId === userId);
  if (status === "draft" || status === "published") {
    list = list.filter(p => p.status === status);
  }
  if (q) {
    list = list.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)),
    );
  }
  list = [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json({ posts: list });
}

export function getPost(req: AuthedRequest, res: Response): void {
  const userId = req.userId!;
  const post = posts.find(p => p.id === req.params.id);
  if (!post || post.userId !== userId) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json({ post });
}

export function createPost(req: AuthedRequest, res: Response): void {
  const userId = req.userId!;
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    return;
  }
  const { title, body, status, tags } = parsed.data;
  const post = {
    id: randomUUID(),
    userId,
    title,
    body,
    status: status ?? "draft",
    tags: tags ?? [],
    createdAt: new Date().toISOString(),
    views: 0,
  };
  posts.push(post);
  res.status(201).json({ post });
}

export function updatePost(req: AuthedRequest, res: Response): void {
  const userId = req.userId!;
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    return;
  }
  const idx = posts.findIndex(p => p.id === req.params.id && p.userId === userId);
  if (idx === -1) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  const current = posts[idx]!;
  const next = { ...current, ...parsed.data };
  posts[idx] = next;
  res.json({ post: next });
}

export function deletePost(req: AuthedRequest, res: Response): void {
  const userId = req.userId!;
  const idx = posts.findIndex(p => p.id === req.params.id && p.userId === userId);
  if (idx === -1) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  posts.splice(idx, 1);
  res.status(204).send();
}
