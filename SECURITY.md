# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately. **Do not
open a public issue.**

Email: <contact@mehmetyigityalim.com>

Include:

- A description of the vulnerability and its impact.
- Steps to reproduce (proof of concept if possible).
- Affected app/package and version/commit.

You will receive an acknowledgement within a reasonable time, and we will keep
you informed as the issue is addressed.

## Scope

- Secrets live in per-app `.env.local` files and Vercel project settings —
  never committed. Each app ships a committed `.env.example`; there is no root
  env file (see [docs/environment.md](docs/environment.md)).
- Do not include real credentials, tokens, or customer data in issues, PRs,
  commits, or logs.

## Supported Versions

This is an actively developed private project; only the latest `main` is
supported.
