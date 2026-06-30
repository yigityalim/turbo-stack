# apps

Deployable applications. Each app is its own workspace.

- **Flat** — top-level apps: `apps/<app>` (e.g. `apps/web`).
- **Grouped** — group apps by surface/domain: `apps/<group>/<app>`
  (e.g. `apps/marketing/web`, `apps/marketing/auth`). The group folder is a
  namespace, not a package — register it in the root `package.json`
  `workspaces` (e.g. `apps/marketing/*`).

Apps depend on packages, never the reverse. Scaffold with `bun run gen`.
