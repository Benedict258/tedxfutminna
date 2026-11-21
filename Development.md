# Development record

Facts below come from git history and from the files in this working tree. Superseded notes are not kept as current status.

## Published history

- `4dd2bc6` (2026-11-16): TanStack Start template `tanstack_start_ts`.
- `7fe7ed7` through `36ebeca` (2026-11-17): eight commits titled "Changes" built the event site before any photos were placed.
- `774f274` (2026-11-17): proceeded without photos. Added the event constants, the content pages, and the ticket-date tests.
- `6efb947` (2026-11-17): recorded the first photo batch as processed and still awaiting placement.
- `4a67bc2` (2026-11-17): recorded a second photo batch and pending branding uploads.
- `ebee110` (2026-11-17): added the logo and both theme artworks as platform asset pointers, and replaced `favicon.ico` with `favicon.png`.
- `1d39d16` (2026-11-17): the message repeats the logo note; the diff only adds `.lovable/north-star/north-star.md`.
- `189741d` (2026-11-17): placed 13 approved photos (39 width variants) through asset pointers, with Gallery-only flags for `speakers-group`, `community-group`, and `group-with-red-x`, plus the photo viewer.
- `4912c73` (2026-11-17): README update. This commit is `origin/main`.

## Current facts

- The event is Saturday, 12 December 2026. Early Bird is ₦5,000 through 2 December 2026 in Africa/Lagos (boundary `2026-12-03T00:00:00+01:00`). Regular is ₦7,500 after that. Capacity is 100. No start time is published. Checkout defaults to `https://selar.com/z992991r2q`.
- The logo file is 241×48 pixels and 7,006 bytes. An earlier note said 217×24; that size is not this file.
- Home shows four unrestricted photos. Past Events shows the ten photos that are not Gallery-only. Gallery shows all thirteen. The TED Talk screening photo is not in the repository.
- Team profiles, sponsors, the exact venue, the start time, the code of conduct, and verified About TED wording are still unpublished. `roadmap.md` still lists team, sponsors, and that wording as open.
- Contact and newsletter forms stay demo-only and do not send or save a message.

## Snapshot `725fd6e` (2026-11-21)

Uncommitted work was saved on `pre-cursor-snapshot` before this cleanup. That commit did the following, which the previous log stopped short of recording:

- Removed `.lovable/`, `src/lib/lovable-error-reporting.ts`, `@lovable.dev/vite-tanstack-config`, `bun.lock`, and `bunfig.toml`.
- Replaced the 42 `.asset.json` pointers with local image files and pointed the imports at those files.
- Rewrote `vite.config.ts` onto plain Vite plugins with the Nitro `vercel` preset, and turned route code-splitting off because this checkout path contains an apostrophe.
- Removed unused interface components and the packages only those files imported, including `framer-motion` and `@tanstack/react-query`. Motion moved into `src/styles.css`, which grew from 166 lines to 2,032.
- Added self-hosted Inter files, `public/sitemap.xml`, `public/robots.txt`, `public/og-image.png`, `package-lock.json`, and `src/components/event-lightbox.tsx`.
- Set `siteUrl` to `https://tedxfutminna.com` for canonical and social tags. Page titles use `TEDxFUTMinna 2026 | {title}`.
- Homepage JSON-LD listed one offer at 5,000 NGN.

## Changes on `cursor-cleanup`

- Rewrote this file from git history — the previous text still said the logo was 217×24, still described CDN pointers as current, and stopped before most of snapshot `725fd6e`.
- Homepage JSON-LD now lists Early Bird (5,000 NGN through 2026-12-02) and Regular (7,500 NGN from 2026-12-03) — the previous single 5,000 offer stayed wrong after Early Bird closed.
- Restricted the latin-ext `@font-face` to U+20A6 and corrected `tools/fonts/subset.mjs` so its comment names `public/fonts/` — that file only contains the naira sign, and the comment named `src/assets/fonts/`.
