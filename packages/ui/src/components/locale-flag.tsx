import { cn } from "@repo/ui/lib/utils";
import { DE, ES, type FlagComponent, FR, GB, IT, SA, TR } from "country-flag-icons/react/1x1";

/**
 * App locale → representative country flag. English uses the UK flag and
 * Arabic the Saudi flag by convention; extend the map when a new locale lands.
 */
const FLAGS: Record<string, FlagComponent> = {
  tr: TR,
  de: DE,
  en: GB,
  it: IT,
  fr: FR,
  es: ES,
  ar: SA,
};

/**
 * Circular flag for a UI locale code, sized via `className` (e.g. `size-5`).
 * Unknown locales render a neutral muted circle so callers never branch.
 */
export function LocaleFlag({ locale, className }: { locale: string; className?: string }) {
  const Flag = FLAGS[locale];
  return (
    <span
      className={cn("inline-flex flex-none overflow-hidden rounded-full bg-muted", className)}
      aria-hidden
    >
      {Flag ? <Flag className="size-full" /> : null}
    </span>
  );
}
