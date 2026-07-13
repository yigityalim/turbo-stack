# turbo-stack

A production-ready **bun + Turborepo** monorepo template — batteries included,
security-hardened, ready to clone and build on.

## What's inside

- **bun** workspaces + **Turborepo** pipeline, organized by domain group
- **Biome** (lint + format) · **knip** · **lefthook** · **commitlint** · **changesets**
- **Security:** Socket scanner, CodeQL, dependency-review, gitleaks, SHA-pinned
  Actions (pinact), zizmor, Renovate, cargo-audit, OpenSSF Scorecard, SBOM — see
  [docs/security.md](docs/security.md)
- **Packages:** `@repo/{types,env,errors,logger,flags,security,email,ui}` +
  `tooling/{typescript-config,tsup-config}`
- **Apps** (blank, CLI-scaffolded): Next.js (web + admin), Hono API, Expo mobile
- **Rust** (WASM-first) in `crates/`, opt-in

## Quickstart

```sh
# bunfig.toml enforces a supply-chain scanner — add it first:
bun add -d @socketsecurity/bun-security-scanner
bun install
bunx lefthook install
bun run dev
```

Scaffold a package with `bun run gen`. See [ARCHITECTURE.md](ARCHITECTURE.md),
[CONTRIBUTING.md](CONTRIBUTING.md), the docs in [docs/](docs/), and the decision
records in [docs/adr/](docs/adr/).

## License

MIT — see [LICENSE](LICENSE).
