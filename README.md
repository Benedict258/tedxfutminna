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
npm run preview   # serve the production build locally
```

## Deploy (Vercel)

1. Push the repository to a Git provider and import it in Vercel (framework preset: **Other**).
2. Build command: `npm run build` — Output: `.vercel/output` (produced automatically by the Nitro `vercel` preset).
3. Deploy. Nitro emits the Vercel Build Output API structure (SSR function + static assets), so deep links such as `/tickets` are server-rendered and never 404 on refresh.

## Environment variables

No environment variables are required to run the site. Optional overrides can be set in a local `.env` file (never commit it); see `.env.example` for the names.

| Name              | Purpose                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `VITE_TICKET_URL` | Overrides the ticket checkout URL (defaults to the confirmed Selar link baked into `src/lib/event.ts`). |

## Project layout

- `src/routes/` — TanStack file routes (one file per page) wrapped by a shared `SiteShell`.
- `src/lib/event.ts` — confirmed event constants (date boundaries, prices, navigation).
- `src/lib/event-photos.ts` — approved photo metadata and placement rules.
- `src/components/` — shared shell, motion primitives and gallery.
- `public/` — favicon, robots.txt, sitemap.xml, Open Graph image.
