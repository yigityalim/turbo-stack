import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Compose class names with Tailwind-aware merging. Always use this for dynamic classNames. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
