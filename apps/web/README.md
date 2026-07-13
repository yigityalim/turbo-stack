# @repo/web

The primary web interface — a Next.js 16 app wired end to end with Supabase auth
and the shared UI kit. Serves as the reference for how apps consume the packages.

## What it shows

- **`@repo/ui`** — design tokens + components (`Button`, `Card`, `Input`,
  `Label`, `ThemeProvider`), scanned by Tailwind via the `@source` in
  `app/globals.css`.
- **`@repo/auth`** — session refresh in `proxy.ts`, `getClaims()` /
  `requireClaims()` guards, and email/password sign-in / sign-up / sign-out
  through server actions.
- **`@repo/db`** — the typed Supabase client under the auth helpers.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home — shows signed-in state |
| `/login` | Email/password sign-in + sign-up (redirects in if already authed) |
| `/dashboard` | Protected — `requireClaims()` redirects to `/login` when signed out |

## Run

```sh
cp .env.example .env.local   # fill in your Supabase URL + publishable key
bun run dev --filter=@repo/web
```

Auth needs the `profiles` migration under `supabase/` applied (the
`handle_new_user` trigger provisions a profile row on sign-up).
