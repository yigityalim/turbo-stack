# @repo/flags

Tiny, typed feature flags — **zero runtime dependencies**. Typed defaults with a
pluggable async source (DB, env, remote).

```ts
import { createFlags, envSource } from "@repo/flags";

const flags = createFlags({
  defaults: { newDashboard: false, uploadLimit: 10 },
  source: envSource(), // FLAG_NEWDASHBOARD=true overrides the default
});

if (await flags.isEnabled("newDashboard")) {
  /* … */
}
```

The source returns a value to override the default, or `undefined` to fall
through. Swap `envSource` for a DB/remote source as the product grows.
