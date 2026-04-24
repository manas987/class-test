# CreatorHub — 2-hour React assessment

Full-stack practice app: **complete Node/Express + JWT API** (in-memory data) and an **intentionally imperfect React UI**. Students work **only on the frontend**; the backend is the reference implementation.

## Run the project

**Terminal 1 — API**

```bash
cd backend
bun install
bun run dev
```

API: `http://localhost:4000`  
Health check: `GET /health`

**Terminal 2 — UI**

```bash
cd frontend
bun install
bun run dev
```

Open the URL printed in the terminal (Bun dev server).

**Seeded login**

- Email: `creator@creatorhub.test`
- Password: `password123`

---

## Frontend assignment checklist (what students should complete)

Work in `frontend/` only. Use the running API as the source of truth. You may use **React, React Router DOM, Context API, functional components**, and hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, plus `React.memo` where it helps.

1. **Auth & session**  
   **Question:** Why might the app still send a token or behave as loggedin after log out, or keep a bad token after refresh? Why might navigation after signin go to the wrong route, or leave an already loggedin user stuck on `/login`?

2. **Protected routes**  
   **Question:** Why does refreshing the page sometimes send someone with a valid session to `/login` before the session has finished loading?

3. **Posts (list & mutations)**  
   **Question:** Why doesn’t the posts list update when you change the status filter, after a successful delete, or after creating a draft — and why might the “new draft” form not reset correctly?

4. **Search & filters**  
   **Question:** Why does search miss obvious matches or feel unnecessarily slow when filtering posts on the client?

5. **Analytics**  
   **Question:** Why doesn’t the analytics summary load reliably for a logged-in creator?

6. **Settings**  
   **Question:** Why don’t all editable profile fields persist after save, and why might the rest of the app not reflect what was saved?

7. **Theme**  
   **Question:** Why does theme only seem to apply to part of the UI, and why doesn’t the profile theme preference stay aligned with what you see after load or save?

8. **Performance & architecture (memo & hooks)**  
   **Question:** Why do memoized components such as `PostCard` or `StatCard` still re-render when the parent updates, and where are `useEffect` / other hook dependency arrays incorrect?

9. **UX edge cases**  
   **Question:** How should loading and failures (empty lists, failed requests) be handled in a simple, clear way without redesigning the whole UI?

10. **Code quality**  
    **Question:** How do you keep your fixes readable and appropriate for an intro React course (without unnecessary TypeScript complexity)?

---

## Backend reference (students: do not modify)

- `POST /api/auth/login` — body: `{ email, password }` → `{ token, user }`
- `POST /api/auth/logout` — requires `Authorization: Bearer <token>`
- `GET /api/auth/me` — current user
- `GET/POST /api/posts`, `GET/PUT/DELETE /api/posts/:id` — CRUD (scoped to the logged-in user)
- `GET /api/analytics/summary` — aggregates for the logged-in user’s posts
- `GET/PUT /api/profile/settings` — read/update profile fields

Data lives in memory and is re-seeded on each server start.

---

## Tech notes

- Frontend is a Bun + React app; backend is Express on port **4000** by default.
- The UI calls `http://localhost:4000/api` (see `frontend/src/lib/api.ts`). Change the base URL there if your API runs elsewhere.
