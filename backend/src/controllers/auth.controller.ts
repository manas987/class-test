import type { Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWT_EXPIRES, JWT_SECRET } from "../config.js";
import { findUserByEmail, findUserById } from "../data/store.js";
import type { AuthedRequest } from "../middleware/auth.middleware.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function publicUser(user: { id: string; email: string; name: string; bio: string; themePreference: string }) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    bio: user.bio,
    themePreference: user.themePreference,
  };
}

export function login(req: AuthedRequest, res: Response): void {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    return;
  }

  const { email, password } = parsed.data;
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ token, user: publicUser(user) });
}

export function logout(_req: AuthedRequest, res: Response): void {
  res.json({ ok: true });
}

export function me(req: AuthedRequest, res: Response): void {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user = findUserById(userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({ user: publicUser(user) });
}
