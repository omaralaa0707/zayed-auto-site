# Zayed Auto — site 16 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Zayed Auto, and not an official site.**

- **Live:** https://zayed-auto-site.vercel.app
- **Repo:** [zayed-auto-site](https://github.com/omaralaa0707/zayed-auto-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: A neutral graphite inspection bay #17181A with no warmth of its own, so **the only colour on the page is his three cars** — a red C180 #B4223F, a blue Countryman #0C3E63 and a yellow Creta #C3A253, each sampled from his own photograph and lifted for AA. One flag colour marks a redone panel

**Type pairing**
: Archivo + Inter / Rakkas + IBM Plex Sans Arabic (AR)

**3D / signature technique**
: **The panel map**: the body as eleven extruded panels in plan view, tilted back, each marked with what he actually wrote — factory panels flush in the car's own paint, redone panels lifted clear and outlined, unstated panels left low and dim so the page never fills in a claim he did not make

**Motion language**
: The check: content is confirmed rather than performed — a 1.2% scale-up with no travel and no overshoot, like a box being ticked

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/zayed_autoo/

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
