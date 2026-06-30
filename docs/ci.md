# CI

GitHub Actions workflows. All jobs install with `bun install --frozen-lockfile`
and share the Turbo cache via the composite action `.github/actions/setup`.

| Workflow | Trigger | Does |
| --- | --- | --- |
| `ci.yml` | push/PR to `main` | format check, type check, lint, **test**; `bun audit` (non-blocking) |
| `codeql.yml` | push/PR + weekly | CodeQL SAST (`security-extended`) |
| `dependency-review.yml` | PR | fail on high-severity dependency advisories |
| `secret-scan.yml` | push/PR | gitleaks over full history |
| `workflow-security.yml` | `.github/**` changes | actionlint + pinact pin-check + zizmor |
| `rust.yml` | `crates/**` changes | `cargo fmt`/`clippy`/`test` + wasm build (opt-in) |
| `release.yml` | push to `main` | changesets opens/updates a "version packages" PR |

## Conventions

- **`turbo run` everywhere** in CI (never the `turbo <task>` shorthand).
- Workflows are **SHA-pinned** and least-privilege — see [security.md](security.md).
- Use `--affected` to run only changed packages as the graph grows:
  `turbo run build --affected`.
- Local Git hooks ([lefthook](https://lefthook.dev)) mirror the workflow tools
  (actionlint/pinact/zizmor/gitleaks) best-effort; CI is authoritative.
