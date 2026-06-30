/**
 * `@repo/env` — typed, validated environment access via `@t3-oss/env`.
 *
 * Import the specific schema a module needs (e.g. `supabaseEnv`) rather than a
 * single global object, so each consumer only validates the vars it uses.
 */
export * from "./shared";
