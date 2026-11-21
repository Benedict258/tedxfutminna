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
- Read the public origin from `VITE_SITE_URL` for the sitemap, robots.txt, canonical tags and JSON-LD — no domain is chosen yet, and an empty value still builds.
- Removed the domain line from `public/og-image.png` — the image stays valid whichever origin is chosen later.
- Turned route code-splitting back on — this checkout path no longer contains an apostrophe, so the splitter no longer emits a broken import path.
- Removed the Wrangler and Cloudflare entries from `.gitignore` — this site is not deployed with Wrangler.
- Restored `routeTree.gen.ts` in `.prettierignore` — that file is generated and should not be reformatted by hand.
- Upgraded `vite` from 8.1.5 to 8.3.8 — 8.1.5 was inside the Windows launch-editor advisory range, and the newer release reports no advisories.
- Added the `.ts` extension on the Vite config import of `site-url` — Vite 8.3 warns that the native config loader will reject an extensionless import.
- Set `fetchpriority="high"` on the wordmark and its preload — on Tickets and Gallery that image is the largest paint, and it was requested at low priority. It is already a 7 KB PNG with width and height, and it is not lazy-loaded.
- Removed `tailwind-merge` and `clsx`, and stopped merging button classes a second time — `cva` already joins them, and the merger was inside the first JavaScript file.
- Load the dialog animation stylesheet with the lightbox — those keyframes run only after a photo is opened, so they no longer block the first paint.
- Load the home photo grid in its own chunk — the grid sits below the first screen, and the lightbox was already separate.
- Removed the 4 second reveal failsafe — that delayed animation forced a late restyle. Visitors without JavaScript still see the content through the `noscript` rule.
- Skip layout for home sections below the first screen until they near the viewport, and pause the ribbon animation once it scrolls away — the ribbon already moves with transform only.
- Update a countdown digit only when its value changes — the other three digits no longer re-render every second.
- Serve the production build with `npm run preview` — `vite preview` expects `dist/server/server.js`, and the Nitro `vercel` preset does not emit that file.
- Document that Vercel’s Output Directory stays at the framework default — current Vercel docs configure it automatically for TanStack Start and Nitro, and `.vercel/output` is the Build Output API, not a static folder to type into that field.
- Answer `GET /health` with plain text before the page renderer — a keep-awake ping should not build the homepage.
- Listen on `0.0.0.0` in the preview server — Render only routes public traffic to that address, and `127.0.0.1` is unreachable from its proxy.
- Ping `PING_URL` every 5 minutes from GitHub Actions — a free Render web service sleeps after a stretch with no requests.
