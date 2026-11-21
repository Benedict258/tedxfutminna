## Website architecture

- Use TanStack file routes for each content page and a shared SiteShell around the root Outlet; this keeps navigation and branding consistent.
- Keep confirmed event constants and Nigeria date boundaries in src/lib/event.ts; this prevents inconsistent ticket prices and dates across pages.
- Keep all wordmark uses in Wordmark and all motion primitives in event-motion.tsx; official brand files and approved assets can then replace stand-ins centrally.
- Preserve uploaded branding pixels through alpha-bound cropping and local asset files in src/assets; render the shared logo on solid white and select theme artwork by background so source lettering stays legible without recoloring.
- Contact and newsletter forms remain explicitly demo-only until a connected submission service is requested; never imply an email was saved or sent.
- Keep approved photo metadata and placement filtering in event-photos.ts and render all photo views with EventGallery; shared filtering prevents restricted photos leaking into other pages.
