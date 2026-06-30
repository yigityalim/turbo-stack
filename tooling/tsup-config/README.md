# @repo/tsup-config

Shared [tsup](https://tsup.egoist.dev) base for the packages that actually ship
compiled output: **CLIs and public/published packages**. Internal packages do
**not** use tsup — they export `./src/index.ts` directly (JIT).

This is a code package: JIT-exported TypeScript, no build of its own.

## Usage

```ts
// packages/<group>/<pkg>/tsup.config.ts
import { createTsupConfig } from "@repo/tsup-config";

export default createTsupConfig();
```

Then in that package's `package.json`:

```jsonc
{
  "exports": { ".": "./dist/index.js" },
  "types": "./dist/index.d.ts",
  "scripts": { "build": "tsup" },
  "devDependencies": { "@repo/tsup-config": "workspace:*" }
}
```

Pass overrides (e.g. multiple entries, CJS, banner) to `createTsupConfig(...)`.
