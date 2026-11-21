# Asset development

- Official logo: uploaded PNG now replaces the shared text stand-in in header, footer and intro; transparent margins cropped without altering lettering. Kept on solid white in both display modes because the supplied place-name lettering is black. Original visible artwork is only 217×24px; larger placements need a higher-resolution or vector original. Favicon derived from the same supplied pixels.
- Ribbon variant 01: folded red SVG ribbon, created in code to remain editable and animate smoothly; awaiting review in the prototype.
- Flip calendar and countdown: date-only visual objects, created in code with reduced-motion support.
- Speaker silhouettes: neutral announcement states; no invented portraits or names.
- Event photographs, batch 01: nine organizer uploads reviewed; eight prepared as 480/960/1920px WebP versions with wide and portrait variants, awaiting contact-sheet approval before website placement. Original pixels are not retouched; group portrait layouts preserve all people with black margins. Speaker-group and community-group photos contain sponsor logos and are Gallery only. The TED Talk screening photo is excluded. Review sheets and the processed package are in Files under event-photos; no photos have been added to the website yet.
- Official About TED and About TEDx wording: current organizer guide could not be retrieved; exact wording verification remains pending before launch.
- Event photographs, batch 02: five additional organizer uploads processed into 25 WebP variants and three inspected review sheets, awaiting approval before website placement. Group-with-red-X is Gallery only because of sponsor logos; wide-stage-and-audience has softer stage detail and is intended for an overview rather than a close-up. Original images remain untouched. Review sheets and package are in Files under event-photos.
- Official theme artwork: both supplied PNGs have transparent backgrounds; variant 01 has white lettering and variant 02 has black lettering. Cropped transparent margins, preserved artwork pixels and stored CDN pointers. Homepage theme section uses black lettering on light and white lettering on dark, separate from the event logo.
- Photo batches 01 and 02 approved by organizer: 13 photos now served through CDN pointers in three responsive widths. Homepage shows four unrestricted photos; Past Events shows ten; Gallery shows all thirteen with an accessible lightbox, arrow navigation and touch swipe. The three sponsor-bearing group photos appear only in Gallery. TED Talk screening remains excluded. Approval supersedes the pending status recorded above.

# Deployment preparation log

## Part 1 — remove platform traces

- Deleted the `.lovable/` editor metadata folder — editor-only state, not part of the site.
- Deleted `src/lib/lovable-error-reporting.ts` and its import/use in `src/routes/__root.tsx` — it forwarded errors to platform telemetry hooks that no longer exist here.
- Removed the Lovable Cloud middleware comment in `src/start.ts` — it documented an integration this project never had.
- Removed the platform instruction block from `AGENTS.md` — project rules no longer live in that file; kept and updated the architecture rules below it.
- Updated the `AGENTS.md` asset rule from "CDN pointers" to "local asset files in src/assets" — assets now ship with the repo instead of a hosting-specific proxy.
- `package.json`: renamed `tanstack_start_ts` → `tedxfutminna-2026`, set version `1.0.0` and a real description — identify the project.
- `package.json`: removed the `@lovable.dev/vite-tanstack-config` devDependency — platform build wrapper.
- `package.json`: removed the `build:dev` script — it only existed for platform sandbox previews.
- Rewrote `vite.config.ts` on plain Vite plugins (`@tailwindcss/vite`, `vite-tsconfig-paths`, `tanstackStart`, `nitro`, `@vitejs/plugin-react`) — same build behaviour without the platform wrapper; Nitro preset changed from `cloudflare-module` to `vercel` because Vercel is the chosen host.
- Downloaded all 42 referenced images from the platform preview host into `src/assets/` — the old `/__l5e/...` paths only resolve on platform hosting and would 404 on Vercel.
- Switched `event-photos.ts`, `site-shell.tsx` and `index.tsx` from `.asset.json` pointer imports to direct local image imports — images are bundled and content-hashed by Vite.
- Deleted the 42 `.asset.json` pointer files — platform asset metadata, no longer meaningful.
- Rewrote `README.md` — removed template/platform text and documented install, run, build, deploy and environment variables.
- Deleted `bunfig.toml` (only held platform package exclusions; bun is not used here) and `bun.lock` — moving to a single npm lockfile.
- Started a fresh `npm install` to generate `package-lock.json` — one lockfile type matching the available toolchain.
