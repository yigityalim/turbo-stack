# Security

How this repo defends itself. To report a vulnerability, see
[SECURITY.md](../SECURITY.md) — do not open a public issue.

## Supply chain

- **Exact pins + age gate.** `bunfig.toml` installs exact versions
  (`exact = true`) and ignores releases younger than 7 days
  (`minimumReleaseAge`), closing the 0-day window for malicious publishes.
- **Install-time scanner.** The Socket scanner
  (`@socketsecurity/bun-security-scanner`) blocks malicious/CVE packages before
  they install. `bun install --frozen-lockfile` in CI.
- **Dependency review** (`dependency-review.yml`) fails a PR introducing a
  high-severity advisory; **`bun audit`** runs in CI; **Dependabot** opens
  weekly update PRs.
- The lockfile is committed — it is the pinned, vetted supply-chain record.

## Code & secrets

- **SAST.** CodeQL (`codeql.yml`) runs `security-extended` queries on push, PR,
  and weekly.
- **Secret scanning.** gitleaks runs as a pre-commit hook and in CI
  (`secret-scan.yml`, full history). Real secrets live in per-app `.env.local`
  (never committed); there is no root env file. See
  [environment.md](environment.md).

## GitHub Actions hardening

- **All actions are SHA-pinned** (managed by `pinact`); use
  `actions-rust-lang/setup-rust-toolchain` (pinnable), not the moving
  `dtolnay/rust-toolchain@stable`.
- **Least privilege** — every workflow sets `permissions: contents: read` (the
  release workflow is the only one with write scope).
- **`persist-credentials: false`** on checkouts that don't push.
- **zizmor** audits workflows (`workflow-security.yml`); `artipacked` is the one
  exception, allowed only for the release job that needs the token to push.

## Ownership

Secrets and deploys belong to the maintainer. Don't read `.env.local`, apply
migrations, or run deploys from automation — deliver files; the maintainer runs
them.
