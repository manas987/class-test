import type { Response } from "express";
import { z } from "zod";
import { findUserById } from "../data/store.js";
import type { AuthedRequest } from "../middleware/auth.middleware.js";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().optional(),
  themePreference: z.enum(["light", "dark"]).optional(),
});

export function getProfileSettings(req: AuthedRequest, res: Response): void {
  const user = findUserById(req.userId!);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({
    settings: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      themePreference: user.themePreference,
    },
  });
}

export function updateProfileSettings(req: AuthedRequest, res: Response): void {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    return;
  }
  const user = findUserById(req.userId!);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const { name, bio, themePreference } = parsed.data;
  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (themePreference !== undefined) user.themePreference = themePreference;

  res.json({
    settings: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      themePreference: user.themePreference,
    },
  });
}
