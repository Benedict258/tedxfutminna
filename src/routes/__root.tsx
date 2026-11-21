import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoAsset from "../assets/event-logo.png";
import { SiteShell, Wordmark } from "../components/site-shell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Wordmark />
        </div>
        <span className="eyebrow justify-center">
          <span className="red-dash" />
          PAGE NOT FOUND
        </span>
        <h1 className="mt-4 text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    // Root fallback only: every content route sets its own title, description,
    // canonical and og:image through pageHead() in src/lib/event.ts. Do not add
    // og:image/twitter:image here: pages without their own would inherit it.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TEDxFUTMinna 2026 | Reimagining Tomorrow" },
      {
        name: "description",
        content:
          "Reimagining Tomorrow, Shape It Today. Saturday, 12 December 2026 at FUTMinna campus.",
      },
      { property: "og:title", content: "TEDxFUTMinna 2026 | Reimagining Tomorrow" },
      { property: "og:description", content: "Reimagining Tomorrow, Shape It Today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@TEDxFUTMinna" },
    ],
    links: [
      // Fonts are self-hosted; preload the two subsets the first paint needs.
      {
        rel: "preload",
        href: "/fonts/inter-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/inter-latin-ext.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // The header wordmark is the first image painted on every page.
      { rel: "preload", href: logoAsset, as: "image", fetchPriority: "high" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Runs before first paint: repeat visits skip the CSS-timed intro
            overlay (no flash of the wordmark screen), fresh visits play it. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('event-intro')||window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('skip-intro');sessionStorage.setItem('event-intro','seen')}catch(e){}",
          }}
        />
        <noscript>
          {/* Scroll reveals (.reveal) start hidden for the JS animation; without
              JS nothing would ever reveal them, so show all content instead. */}
          <style>{`.reveal{opacity:1!important;translate:none!important}`}</style>
        </noscript>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SiteShell>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </SiteShell>
  );
}
