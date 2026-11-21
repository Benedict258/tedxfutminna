export const indexablePaths = [
  "/",
  "/about",
  "/speakers",
  "/schedule",
  "/tickets",
  "/sponsors",
  "/team",
  "/past-events",
  "/gallery",
  "/faq",
  "/contact",
  "/code-of-conduct",
] as const;

/** Accepts an absolute http(s) origin. Empty, missing, and invalid values stay empty. */
export function normalizeSiteUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    const path = url.pathname.replace(/\/+$/, "");
    return `${url.origin}${path === "/" ? "" : path}`;
  } catch {
    return "";
  }
}

function xmlEscape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sitemapXml(origin: string) {
  const entries = origin
    ? indexablePaths
        .map((path) => {
          const loc = `${origin}${path === "/" ? "/" : path}`;
          return `  <url><loc>${xmlEscape(loc)}</loc></url>`;
        })
        .join("\n")
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}${entries ? "\n" : ""}</urlset>\n`;
}

export function robotsTxt(origin: string) {
  const lines = ["User-agent: *", "Allow: /", ""];
  if (origin) lines.push(`Sitemap: ${origin}/sitemap.xml`, "");
  return lines.join("\n");
}

export function pageMetadata(origin: string, title: string, description: string, path: string) {
  const fullTitle = `TEDxFUTMinna 2026 | ${title}`;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "TEDxFUTMinna 2026" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@TEDxFUTMinna" },
  ];
  const links: Array<{ rel: string; href: string }> = [];
  if (origin) {
    const canonical = `${origin}${path === "/" ? "/" : path}`;
    const image = `${origin}/og-image.png`;
    meta.push(
      { property: "og:url", content: canonical },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: image },
    );
    links.push({ rel: "canonical", href: canonical });
  }
  return { meta, links };
}
