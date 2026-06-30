# Documentation

Project documentation for the Turbo Stack monorepo. Start with the root docs:

- [Architecture](../ARCHITECTURE.md) — layout, workspaces, task pipeline
- [Contributing](../CONTRIBUTING.md) — setup and conventions
- [Design](../DESIGN.md) — UI principles and the visual bar
- [Maintenance](../MAINTENANCE.md) — routine ops and releases
- [Roadmap](../ROADMAP.md) — direction

In this folder:

- [Packages](packages.md) — package conventions (structure, JIT vs tsup, versioning)
- [Environment](environment.md) — env strategy (no root `.env`, per-app, turbo)
- [Testing](testing.md) — `bun test` conventions
- [CI](ci.md) — the GitHub Actions pipeline
- [Security](security.md) — supply chain, SAST, secrets, Actions hardening
- [Decisions (ADR)](adr/README.md) — architecture decision records

Add per-topic docs here (e.g. `auth.md`, `deployment.md`) as the product grows.
