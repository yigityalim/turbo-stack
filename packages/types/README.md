# @repo/types

Shared TypeScript types and Zod schemas used across apps and packages.

- **`./utility`** — generic helper types (`Brand`, `Prettify`, `DeepPartial`,
  `RequireKeys`, …).
- **`./schemas`** — reusable Zod schemas (`emailSchema`, `uuidSchema`,
  `slugSchema`, `paginationSchema`).
- **`./database`** — Supabase-generated types. Regenerate with
  `bun run generate-types` (writes `src/database.ts`).

```ts
import { type Pagination, paginationSchema } from "@repo/types";
import type { Database } from "@repo/types/database";
```
