import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import handler from "../.vercel/output/functions/__server.func/index.mjs";

const root = join(".vercel", "output", "static");
const port = Number(process.env.PORT || 4173);
const types = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
  ".html": "text/html",
};
const app = typeof handler.fetch === "function" ? handler : handler.default;

if (!app?.fetch) {
  console.error("Build the site first: npm run build");
  process.exit(1);
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
    const file = join(root, decodeURIComponent(url.pathname));
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
      res.end(body);
      return;
    } catch {
      // Not a static file. The Nitro function renders the route.
    }
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(",") : value);
    }
    const response = await app.fetch(new Request(url, { method: req.method, headers }), {
      waitUntil() {},
    });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end(error instanceof Error ? (error.stack ?? error.message) : String(error));
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`http://127.0.0.1:${port}/`);
});
