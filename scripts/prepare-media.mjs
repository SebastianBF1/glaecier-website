// Turns the raw files in /assets into web-sized copies in /public and writes an inventory
// (dimensions, orientation, near-duplicate groups) used by src/content/media.ts and docs/asset-manifest.md.
// Run: npm run media   (idempotent; skips outputs that already exist)
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "assets/images");
const outDir = path.join(root, "public/media");
const inventoryFile = path.join(root, "src/content/media-inventory.json");
const MAX_EDGE = 2560;
const VARIANT_WIDTHS = [320, 640, 1080, 1600];

export const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// 64-bit difference hash; Hamming distance <= 10 is treated as "same shot / variation".
async function dHash(file) {
  const px = await sharp(file).rotate().greyscale().resize(9, 8, { fit: "fill" }).raw().toBuffer();
  let bits = "";
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += px[y * 9 + x] > px[y * 9 + x + 1] ? "1" : "0";
  return bits;
}
const hamming = (a, b) => [...a].reduce((n, c, i) => n + (c !== b[i]), 0);

console.assert(slugify("Saunaens gyldne vandøjeblik.png") === "saunaens-gyldne-vandoejeblik", "slugify");
console.assert(hamming("1010", "1001") === 2, "hamming");

await fs.mkdir(outDir, { recursive: true });
const files = (await fs.readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f)).sort();
const items = [];

for (const file of files) {
  const src = path.join(srcDir, file);
  // Read via fs: libvips fails on some Unicode filenames on Windows (e.g. macOS narrow no-break spaces).
  const buf = await fs.readFile(src);
  const meta = await sharp(buf).metadata();
  // EXIF orientation 5-8 means width/height are swapped once rotated.
  const [w, h] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
  const slug = slugify(file);
  const out = path.join(outDir, `${slug}.jpg`);
  const exists = await fs.stat(out).then(() => true, () => false);
  if (!exists) {
    await sharp(buf)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
      .then((b) => fs.writeFile(out, b)); // via fs: libvips can't write paths > 260 chars on Windows
  }
  const webBuf = await fs.readFile(out);
  const outMeta = await sharp(webBuf).metadata();
  // Smaller WebP sizes for responsive srcsets. The static export has no image optimizer;
  // src/lib/image-loader.ts picks from these. Keep VARIANT_WIDTHS in sync with that file.
  for (const vw of VARIANT_WIDTHS) {
    const variant = path.join(outDir, `${slug}-${vw}.webp`);
    if (await fs.stat(variant).then(() => true, () => false)) continue;
    await sharp(webBuf).resize({ width: vw, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer().then((b) => fs.writeFile(variant, b));
  }
  items.push({
    file,
    slug,
    src: `/media/${slug}.jpg`,
    width: outMeta.width,
    height: outMeta.height,
    originalWidth: w,
    originalHeight: h,
    orientation: w > h * 1.05 ? "landscape" : h > w * 1.05 ? "portrait" : "square",
    bytes: (await fs.stat(src)).size,
    hasExif: Boolean(meta.exif),
    hash: await dHash(buf),
  });
  console.log(`${file} → ${slug}.jpg (${w}×${h})`);
}

// Group near-duplicates (same shot, edits, or exact copies).
let group = 0;
for (const a of items) {
  if (a.duplicateGroup) continue;
  const twins = items.filter((b) => b !== a && !b.duplicateGroup && hamming(a.hash, b.hash) <= 10);
  if (twins.length) {
    group++;
    for (const t of [a, ...twins]) t.duplicateGroup = group;
  }
}

await fs.writeFile(inventoryFile, JSON.stringify(Object.fromEntries(items.map((i) => [i.slug, i])), null, 2));

// Wordmark: keep the transparent PNG, sized for the web; rendered as a CSS mask so it can take any colour.
await fs.mkdir(path.join(root, "public/brand"), { recursive: true });
await sharp(await fs.readFile(path.join(root, "assets/branding/glaecier-wordmark-source.png")))
  .resize({ width: 1600 })
  .png()
  .toBuffer()
  .then((b) => fs.writeFile(path.join(root, "public/brand/glaecier-wordmark.png"), b));

console.log(`\n${items.length} images, ${group} near-duplicate groups → ${path.relative(root, inventoryFile)}`);
