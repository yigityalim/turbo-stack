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
  high-severity advisory; **`bun audit`** runs in CI; **Renovate**
  (`.github/renovate.json`) opens grouped weekly update PRs across bun (catalog),
  Cargo, and GitHub Actions (kept SHA-pinned), plus a dependency dashboard.
- Commit the lockfile in your project — it is the pinned, vetted supply-chain
  record, and CI installs with `--frozen-lockfile`.
- **SBOM.** `sbom.yml` publishes an SPDX bill of materials (syft, no install
  needed) as a workflow artifact on every push to main.

## Code & secrets

- **SAST.** CodeQL (`codeql.yml`) runs `security-extended` queries on push, PR,
  and weekly.
- **Secret scanning.** gitleaks runs as a pre-commit hook and in CI
  (`secret-scan.yml`, full history). Real secrets live in per-app `.env.local`
  (never committed); there is no root env file. See
  [environment.md](environment.md).
- **Rust supply chain.** `cargo audit` scans `Cargo.lock` against the RustSec
  advisory database in `rust.yml`.
- **Security posture.** OpenSSF Scorecard (`scorecard.yml`) scores the repo's
  practices and reports to the Security tab — opt-in via the `SCORECARD_ENABLED`
  repo variable (recommended on the public repo; off for private forks).

## GitHub Actions hardening

- **All actions are SHA-pinned** (managed by `pinact`); use
  `actions-rust-lang/setup-rust-toolchain` (pinnable), not the moving
  `dtolnay/rust-toolchain@stable`.
- **Least privilege** — workflows default to `permissions: contents: read`; only
  release (contents / PR write) and Scorecard (security-events / id-token write)
  escalate, and only on the job that needs it.
- **`persist-credentials: false`** on checkouts that don't push.
- **zizmor** audits workflows (`workflow-security.yml`); `artipacked` is the one
  exception, allowed only for the release job that needs the token to push.

## Ownership

Secrets and deploys belong to the maintainer. Don't read `.env.local`, apply
migrations, or run deploys from automation — deliver files; the maintainer runs
them.
