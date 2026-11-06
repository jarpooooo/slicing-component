// Verifies every asset in src/lib/assets.ts exists in /public with the exact same
// letter casing (Vercel is case-sensitive) and that width/height match the SVG root.
// Also lists files in public/icons and public/images that are not registered yet.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";

const root = process.cwd();
const source = readFileSync(join(root, "src/lib/assets.ts"), "utf8");
const entries = [
  ...source.matchAll(/(\w+):\s*\{\s*src:\s*"([^"]+)",\s*width:\s*(\d+),\s*height:\s*(\d+)\s*\}/g),
].map(([, name, src, width, height]) => ({ name, src, width: +width, height: +height }));

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
  const svgRoot = readFileSync(file, "utf8").match(/<svg[^>]*>/)?.[0] ?? "";
  const w = Number(svgRoot.match(/\swidth="([\d.]+)"/)?.[1]);
  const h = Number(svgRoot.match(/\sheight="([\d.]+)"/)?.[1]);
  if (w && h && (Math.round(w) !== width || Math.round(h) !== height)) {
    fail(`${name}: size in assets.ts is ${width}x${height}, SVG root says ${w}x${h}`);
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
