# @repo/marketing-web

The public marketing site — a Next.js 16 (App Router) app, scaffolded with
`create-next-app` and wired into the monorepo (shared `typescript-config`,
catalog versions, root Biome + Turbo).

```sh
bun run dev --filter=@repo/marketing-web
```

Intentionally blank: no transport/auth is imposed — wire your own (server
actions, route handlers, or tRPC) as the app grows. Import shared packages as
`@repo/<name>` and add them to `transpilePackages` in `next.config.ts`.

> Next 16 has breaking changes vs. earlier versions — check the bundled guides
> under `node_modules/next/dist/docs/` before writing Next code.
