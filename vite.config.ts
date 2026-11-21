import { readFileSync, writeFileSync } from "node:fs";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { normalizeSiteUrl, robotsTxt, sitemapXml } from "./src/lib/site-url.ts";

function writeIfChanged(file: string, contents: string) {
  let current = "";
  try {
    current = readFileSync(file, "utf8");
  } catch {
    current = "";
  }
  if (current.replace(/\r\n/g, "\n") === contents) return;
  writeFileSync(file, contents);
}

function crawlFiles(origin: string): Plugin {
  const write = () => {
    writeIfChanged("public/sitemap.xml", sitemapXml(origin));
    writeIfChanged("public/robots.txt", robotsTxt(origin));
  };
  return {
    name: "crawl-files",
    buildStart: write,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path === "/sitemap.xml") {
          res.setHeader("content-type", "application/xml; charset=utf-8");
          res.end(sitemapXml(origin));
          return;
        }
        if (path === "/robots.txt") {
          res.setHeader("content-type", "text/plain; charset=utf-8");
          res.end(robotsTxt(origin));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  // Inline VITE_* env vars so they resolve in the server bundle too.
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  const origin = normalizeSiteUrl(loadedEnv["VITE_SITE_URL"]);
  const envDefine = Object.fromEntries(
    Object.entries(loadedEnv).map(([key, value]) => [
      `import.meta.env.${key}`,
      JSON.stringify(value),
    ]),
  );

  return {
    define: envDefine,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: { host: "::", port: 8080 },
    plugins: [
      crawlFiles(origin),
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Keep server-only modules out of the client bundle.
        importProtection: {
          behavior: "error",
          client: {
            files: ["**/server/**"],
            specifiers: ["server-only"],
          },
        },
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
      }),
      // Production builds target Vercel (SSR function + static assets).
      command === "build" && nitro({ preset: "vercel" }),
      react(),
    ],
  };
});
