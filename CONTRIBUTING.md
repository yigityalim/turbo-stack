# Contributing

turbo-stack is an open-source monorepo template, released under the MIT
license. Issues and pull requests are welcome.

## Prerequisites

- **Node** `>=20`
- **Bun** `>=1.2` — the only supported package manager. Never use npm/npx/pnpm/yarn.

```sh
bun install
bunx lefthook install   # wire git hooks (also runs via `bun run prepare`)
```

## Workflow toolchain (optional locally, enforced in CI)

The Git hooks lint, pin, audit, and secret-scan with a few extra CLIs. They are
**optional locally** — the hooks skip a tool that isn't on PATH instead of
failing your commit — but CI enforces them (`workflow-security.yml` for the
Actions tools, `secret-scan.yml` for gitleaks).

- [`actionlint`](https://github.com/rhysd/actionlint) — workflow linter
- [`pinact`](https://github.com/suzuki-shunsuke/pinact) — pins Actions to commit SHAs
- [`zizmor`](https://docs.zizmor.sh) — Actions security auditor
- [`gitleaks`](https://github.com/gitleaks/gitleaks) — secret scanner (pre-commit + CI)

```sh
go install github.com/rhysd/actionlint/cmd/actionlint@latest
go install github.com/suzuki-shunsuke/pinact/v3/cmd/pinact@latest
go install github.com/gitleaks/gitleaks/v8@latest
# zizmor: download the prebuilt binary — `cargo install zizmor` currently fails
#   to build. https://github.com/zizmorcore/zizmor/releases
```

### Supply-chain scanner

`bunfig.toml` pins exact versions, enforces a release-age gate, and runs the
Socket security scanner on install. The scanner
(`@socketsecurity/bun-security-scanner`) is a committed dev dependency, so a
normal `bun install` from the lockfile works. To opt out, remove the
`[install.security]` block from `bunfig.toml`.

## Workflow

1. Branch from `main`.
2. Make your change. Keep code self-documenting; see conventions below.
3. `bun run check` (Biome lint + format), `bun run type-check`.
4. Commit using Conventional Commits (English). Hooks run Biome on staged
   files and commitlint on the message.
5. Open a PR. CI runs format check, type check, and lint.

## Conventions

- **Package manager:** bun only. Add deps with `bun add <pkg>` (`-d` for dev),
  run CLIs with `bunx`.
- **Formatter/linter:** Biome. `bun run format` to write, `bun run check` to verify.
- **Identifiers in English.** Turkish appears only in user-visible UI strings.
- **Comments:** English TSDoc on declarations where it adds value. No `//` or
  `/* */` inline comments, no decorative separator banners.
- **Commits:** Conventional Commits, English, no AI attribution trailers.
- **classNames:** compose with `cn()`; no template-literal/concat classNames.

## Project layout

```
apps/        # applications (web interfaces)
packages/    # shared packages (ui, config, types, …)
```

Both are bun/turbo workspaces. See ARCHITECTURE.md.
