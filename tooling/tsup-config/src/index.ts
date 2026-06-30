import { defineConfig, type Options } from "tsup";

/**
 * Shared tsup base for CLI and public packages. Internal packages do NOT use
 * tsup — they export `./src/index.ts` directly (JIT). Reach for this only when
 * a package ships compiled output (a published library or a CLI binary).
 */
export function createTsupConfig(options: Options = {}) {
  return defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    minify: false,
    ...options,
  });
}
