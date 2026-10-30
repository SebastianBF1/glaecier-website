// Fails if the static export references a local file that isn't in out/ – e.g. a photo that was
// left out of git. Run after `npm run build`; the Pages workflow runs it before deploying.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const base = process.env.PAGES_BASE_PATH ?? "";
const pages = ["index.html", "da/index.html", "en/index.html"];
const ref = new RegExp(`${base}/((?:media|brand|_next)/[^"'\\s,)?\\\\]+)`, "g");

const missing = new Set();
let count = 0;
for (const page of pages) {
  const file = path.join(out, page);
  if (!fs.existsSync(file)) missing.add(page);
  else
    for (const [, rel] of fs.readFileSync(file, "utf8").matchAll(ref)) {
      count++;
      if (!fs.existsSync(path.join(out, rel))) missing.add(rel);
    }
}

if (missing.size || count === 0) {
  console.error(count === 0 ? "No asset references found – is PAGES_BASE_PATH right?" : `Missing from export:\n  ${[...missing].join("\n  ")}`);
  process.exit(1);
}
console.log(`Export OK: ${pages.length} pages, ${count} asset references, all present.`);
