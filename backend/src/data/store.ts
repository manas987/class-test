import { randomUUID } from "node:crypto";

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  themePreference: "light" | "dark";
}

export interface PostRecord {
  id: string;
  userId: string;
  title: string;
  body: string;
  status: "draft" | "published";
  tags: string[];
  createdAt: string;
  views: number;
}

export const users: UserRecord[] = [];
export const posts: PostRecord[] = [];

let seeded = false;

export function seedStore(): void {
  if (seeded) return;
  seeded = true;

  const userId = randomUUID();
  users.push({
    id: userId,
    email: "creator@creatorhub.test",
    password: "password123",
    name: "Alex Creator",
    bio: "Building things on the internet.",
    themePreference: "dark",
  });

  const now = Date.now();
  const samplePosts: Omit<PostRecord, "id">[] = [
    {
      userId,
      title: "How I plan my content week",
      body: "Sunday batching, Tuesday filming, Friday edits.",
      status: "published",
      tags: ["workflow", "tips"],
      createdAt: new Date(now - 86400000 * 5).toISOString(),
      views: 420,
    },
    {
      userId,
      title: "Draft: Q2 sponsorship ideas",
      body: "Still researching brands that fit the channel.",
      status: "draft",
      tags: ["sponsors", "draft"],
      createdAt: new Date(now - 86400000 * 3).toISOString(),
      views: 12,
    },
    {
      userId,
      title: "Gear I actually use",
      body: "Camera, mic, lights — nothing fancy.",
      status: "published",
      tags: ["gear", "studio"],
      createdAt: new Date(now - 86400000 * 2).toISOString(),
      views: 980,
    },
    {
      userId,
      title: "Community highlights",
      body: "Shout-outs from last month.",
      status: "published",
      tags: ["community"],
      createdAt: new Date(now - 86400000).toISOString(),
      views: 210,
    },
    {
      userId,
      title: "Untitled stream notes",
      body: "Bullet points from the live Q&A.",
      status: "draft",
      tags: ["stream"],
      createdAt: new Date(now - 3600000).toISOString(),
      views: 3,
    },
  ];

  for (const p of samplePosts) {
    posts.push({ ...p, id: randomUUID() });
  }
}

export function findUserByEmail(email: string): UserRecord | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): UserRecord | undefined {
  return users.find(u => u.id === id);
}
