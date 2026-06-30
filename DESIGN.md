---
version: alpha
name: Turbo Stack
description: Quiet, modern, mobile-first UI — restrained neutrals, one confident accent, floating contained chrome.
colors:
  primary: "#15171A"
  on-primary: "#FFFFFF"
  secondary: "#5B616E"
  tertiary: "#0B5E4E"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#0E7C66"
  neutral: "#F4F5F3"
  surface: "#FFFFFF"
typography:
  h1:
    fontFamily: Geist
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Geist
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: Geist Mono
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.08em
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 12px
  button-accent:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 12px
  button-accent-hover:
    backgroundColor: "{colors.tertiary-container}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  caption:
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
---

## Overview

Quiet Precision. Turbo Stack's interface stays calm and confident: a near-white
canvas, deep-ink type, and a single jade accent that owns every interaction.
The product is mobile-first — the phone view is the primary surface — and the
chrome floats rather than spanning edge to edge. Nothing decorative competes
with content.

## Colors

A high-contrast neutral foundation with one accent.

- **Primary (#15171A):** Deep ink for headlines, body text, and the primary
  (solid) button.
- **On-primary (#FFFFFF):** Text/icons placed on the ink primary.
- **Secondary (#5B616E):** Slate for borders, captions, and metadata — never
  for primary actions.
- **Tertiary (#0B5E4E):** Jade — the sole driver of interaction (accent
  buttons, focus, links). White text on it clears WCAG AAA (~7.7:1).
- **On-tertiary (#FFFFFF):** Text/icons on the jade accent.
- **Tertiary-container (#0E7C66):** Lighter jade for accent hover/active.
- **Neutral (#F4F5F3):** Barely-warm off-white — the page and card foundation,
  softer than pure white.
- **Surface (#FFFFFF):** Pure white for raised inputs and fields.

## Typography

One sans family carries the UI; a mono family marks small labels.

- **Geist** for everything readable — headings (`h1`, `h2`) and body
  (`body-md`, `body-sm`). Tight tracking on large sizes, generous line-height
  on body.
- **Geist Mono** for `label-caps` — uppercase, wide-tracked micro labels on
  buttons, tabs, and metadata.

## Layout & Spacing

- **4px base unit.** Spacing scales `xs`→`xl` (4 / 8 / 16 / 24 / 40) keep
  rhythm consistent.
- **Floating, contained chrome.** Bottom nav is a centered rounded pill (auto
  width), not a full-width bar. The header is a contained glass bar with
  margin, not edge-to-edge.
- **Mobile-first.** Design the phone layout first; cut clutter, hide secondary
  metadata behind a clean menu before scaling up.

## Elevation & Depth

Depth is restrained and reserved for floating elements.

- Floating chrome (nav pill, header, popovers) uses a **soft shadow + backdrop
  blur** to lift off the canvas.
- Cards and inputs stay nearly flat — a hairline `secondary` border conveys
  structure instead of heavy shadow.

## Shapes

- `rounded.sm` (6px) — small controls, tags.
- `rounded.md` (10px) — inputs, fields.
- `rounded.lg` (16px) — cards and surfaces.
- `rounded.full` (9999px) — pills: primary/accent buttons and the floating nav.

## Components

- **button-primary:** Solid ink pill, white label — the default action.
- **button-accent:** Jade pill, white label — the single emphasized action per
  view; hover shifts to `tertiary-container`.
- **card:** Neutral surface, ink text, `lg` radius, generous padding.
- **input:** White surface, ink text, `md` radius, slate border.
- **caption:** Slate text in `body-sm` for metadata and helper copy.

## Do's and Don'ts

- **Do** drive every interaction with the jade accent; keep one emphasized
  action per view.
- **Do** compose every className with `cn()` and read values from these tokens
  (semantic, not hardcoded).
- **Do** keep chrome floating and contained, especially on mobile.
- **Don't** use edge-to-edge or cramped bars, heavy shadows, or purple.
- **Don't** hardcode colors/spacing or introduce a second accent.
