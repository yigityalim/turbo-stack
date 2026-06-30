# @repo/api

The backend API — a [Hono](https://hono.dev) app on Bun, scaffolded with
`create-hono` and wired into the monorepo. A single API surface; promote it to a
group (`apps/api/<service>`) if it ever splits into multiple services.

```sh
bun run dev --filter=@repo/api   # hot-reload dev server
```

Intentionally minimal — add routes, middleware, and your transport/auth choice
as the API grows.
