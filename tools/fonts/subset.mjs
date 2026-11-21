// One-time/dev tool: subsets the full Inter latin-ext woff2 down to the only
// glyph this site renders from that range (the naira sign, U+20A6). Originals
// in this folder are the untouched sources; output goes to public/fonts/.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "inter-latin-ext.woff2"));
const subset = await subsetFont(source, "₦", { targetFormat: "woff2" });
const target = join(here, "..", "..", "public", "fonts", "inter-latin-ext.woff2");
writeFileSync(target, subset);
console.log(`inter-latin-ext: ${source.length} -> ${subset.length} bytes`);
