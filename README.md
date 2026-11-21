# TEDxFUTMinna 2026

Official website for **TEDxFUTMinna 2026 — “Reimagining Tomorrow, Shape It Today.”** The event takes place on **Saturday, 12 December 2026** at the FUTMinna campus.

Built with [TanStack Start](https://tanstack.com/start) (React 19, Vite, Tailwind CSS 4) and server-rendered by [Nitro](https://nitro.build/).

## Requirements

- Node.js 20+ (npm is the package manager used in this repository)

## Install

```sh
npm install
```

## Develop

```sh
npm run dev
```

The dev server runs on [http://localhost:8080](http://localhost:8080).

## Check

```sh
npm run lint      # ESLint
npx tsc --noEmit  # type-check
npm test          # Vitest unit tests
```

## Build and preview

```sh
npm run build     # production build (Nitro preset: vercel)
npm run preview   # http://127.0.0.1:4173
```

`npm run preview` serves the Nitro output in `.vercel/output`. Run `npm run build` first. `vite preview` looks for `dist/server/server.js`, which this preset does not emit, so the preview script in `tools/preview.mjs` serves the static files and then the server function.

## Deploy

The production build uses the Nitro `vercel` preset already configured in `vite.config.ts`. The public domain is not decided. Host is not confirmed; the preset stays `vercel`.

Vercel’s current TanStack Start and Nitro docs deploy this setup with zero configuration. Leave **Output Directory** at the framework default. Do not set it to `.vercel/output`. Nitro already writes the Build Output API there, and Vercel reads that itself when the framework is detected. The Output Directory field is for a static folder (the docs say a detected framework configures it automatically; “Other” serves `public` or the repo root as static files).

1. Import `Benedict258/tedxfutminna` and select the `cursor-cleanup` branch for a preview deployment.
2. Framework preset: **TanStack Start** (Nitro is also listed). Build command: `npm run build`. Leave Output Directory unset.
3. Set `VITE_SITE_URL` in the host's environment settings when a domain exists. The site builds when that value is missing; canonical URLs, the sitemap, `robots.txt` and event structured data gain the origin only after it is set.

## Environment variables

No environment variables are required to run the site. Optional values can be set in a local `.env` file (never commit it); see `.env.example` for the names.

| Name              | Purpose                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`   | Public site origin. Set `VITE_SITE_URL` in the host's environment settings before a public deploy.     |
| `VITE_TICKET_URL` | Overrides the ticket checkout URL (defaults to the confirmed Selar link baked into `src/lib/event.ts`). |

## Project layout

- `src/routes/` — TanStack file routes (one file per page) wrapped by a shared `SiteShell`.
- `src/lib/event.ts` — confirmed event constants (date boundaries, prices, navigation).
- `src/lib/event-photos.ts` — approved photo metadata and placement rules.
- `src/components/` — shared shell, motion primitives and gallery.
- `public/` — favicon, robots.txt, sitemap.xml, Open Graph image.
