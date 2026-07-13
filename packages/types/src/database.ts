/**
 * Supabase-generated database types.
 *
 * Regenerate with `bun run generate-types` (writes to this file, `public`
 * schema). Until a schema is linked this is a valid but empty placeholder,
 * shaped like a real generated `Database` so the typed Supabase clients in
 * `@repo/db` still compile.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
