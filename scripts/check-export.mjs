// Fails if the static export references a local file that isn't in out/ – e.g. a photo that was
// left out of git – or links to one of its own pages that wasn't exported. Run after `npm run build`; the Pages workflow runs it before deploying.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const base = process.env.PAGES_BASE_PATH ?? "";
const pages = ["index.html", ...["da", "en"].flatMap((l) => ["", "book/", "signup/"].map((p) => `${l}/${p}index.html`))];
// Links to the site's own pages must resolve to an exported index.html.
const pageLink = new RegExp(`href="${base}/((?:da|en)/[^"#?]*)`, "g");
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
  if (fs.existsSync(file))
    for (const [, rel] of fs.readFileSync(file, "utf8").matchAll(pageLink))
      if (!fs.existsSync(path.join(out, rel, "index.html"))) missing.add(`${rel} (page link)`);
}

if (missing.size || count === 0) {
  console.error(count === 0 ? "No asset references found – is PAGES_BASE_PATH right?" : `Missing from export:\n  ${[...missing].join("\n  ")}`);
  process.exit(1);
}
console.log(`Export OK: ${pages.length} pages, ${count} asset references, all present.`);
