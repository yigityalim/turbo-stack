# packages

Shared internal packages, referenced as `@repo/<name>` with `workspace:*`.

- **Flat** — cross-cutting shared libraries: `packages/<name>` (e.g. `ui`,
  `utils`, `types`).
- **Grouped by domain** — `packages/<domain>/<name>`:
  - `packages/core/*` — framework-agnostic domain/business logic
  - `packages/infra/*` — infrastructure adapters (db, cache, email, queue)

Group folders are namespaces, not packages. Add a new group by registering its
glob in the root `package.json` `workspaces` (e.g. `packages/payments/*`).
Scaffold with `bun run gen`.
