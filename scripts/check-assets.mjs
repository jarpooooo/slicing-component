// Checks that every asset in src/lib/assets.ts exists in /public with the same
// letter case (Vercel's filesystem is case-sensitive) and that its width/height
// match the file. Also warns about files that aren't registered yet.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";

const root = process.cwd();
const source = readFileSync(join(root, "src/lib/assets.ts"), "utf8");
const entries = [
  ...source.matchAll(/(\w+):\s*\{\s*src:\s*"([^"]+)",\s*width:\s*(\d+),\s*height:\s*(\d+)\s*\}/g),
].map(([, name, src, width, height]) => ({ name, src, width: +width, height: +height }));

/**
 * Size of an asset in CSS pixels: the SVG root width/height, or half the pixel
 * size of a 2x WebP. Returns null if it can't be read.
 */
function readSize(file) {
  if (file.endsWith(".svg")) {
    const root = readFileSync(file, "utf8").match(/<svg[^>]*>/)?.[0] ?? "";
    const w = Number(root.match(/\swidth="([\d.]+)"/)?.[1]);
    const h = Number(root.match(/\sheight="([\d.]+)"/)?.[1]);
    return w && h ? { w, h } : null;
  }
  if (file.endsWith(".webp")) {
    const buf = readFileSync(file);
    const chunk = buf.toString("ascii", 12, 16);
    let w, h;
    if (chunk === "VP8X") {
      w = 1 + buf.readUIntLE(24, 3);
      h = 1 + buf.readUIntLE(27, 3);
    } else if (chunk === "VP8 ") {
      w = buf.readUInt16LE(26) & 0x3fff;
      h = buf.readUInt16LE(28) & 0x3fff;
    } else if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      w = (bits & 0x3fff) + 1;
      h = ((bits >> 14) & 0x3fff) + 1;
    }
    return w && h ? { w: w / 2, h: h / 2 } : null;
  }
  return null;
}

let errors = 0;
const fail = (msg) => {
  errors++;
  console.error(`✗ ${msg}`);
};

for (const { name, src, width, height } of entries) {
  const file = join(root, "public", src);
  const dir = dirname(file);
  let siblings = [];
  try {
    siblings = readdirSync(dir);
  } catch {
    fail(`${name}: folder ${dirname(src)} does not exist`);
    continue;
  }
  const wanted = basename(file);
  if (!siblings.includes(wanted)) {
    const caseMatch = siblings.find((f) => f.toLowerCase() === wanted.toLowerCase());
    fail(
      caseMatch
        ? `${name}: "${src}" differs in letter case from "${caseMatch}" (breaks on Vercel)`
        : `${name}: "${src}" not found`,
    );
    continue;
  }
  const size = readSize(file);
  if (size && (Math.round(size.w) !== width || Math.round(size.h) !== height)) {
    fail(`${name}: size in assets.ts is ${width}x${height}, file says ${size.w}x${size.h}`);
    continue;
  }
  console.log(`✓ ${name.padEnd(18)} ${src}`);
}

const registered = new Set(entries.map((e) => e.src));
for (const folder of ["icons", "images"]) {
  for (const f of readdirSync(join(root, "public", folder))) {
    if (f.startsWith(".")) continue;
    if (!registered.has(`/${folder}/${f}`))
      console.warn(`! /${folder}/${f} is not registered in src/lib/assets.ts`);
  }
}

if (errors) {
  console.error(`\n${errors} asset problem(s) found.`);
  process.exit(1);
}
console.log(`\nAll ${entries.length} assets OK.`);
