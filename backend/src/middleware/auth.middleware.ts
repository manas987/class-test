import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export interface AuthedRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = header.slice("Bearer ".length).trim();
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
    if (!decoded.sub) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    req.userId = decoded.sub;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
