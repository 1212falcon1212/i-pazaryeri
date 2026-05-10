/**
 * Build all icon variants from i-pazaryeri-favicon.png (200x200 master).
 * Run: npx tsx scripts/build-icons.ts
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const master = join(root, "i-pazaryeri-favicon.png");

if (!existsSync(master)) {
  console.error("✗ Master favicon not found at", master);
  process.exit(1);
}

const buf = readFileSync(master);

const targets = [
  // Next.js app router auto-detected files
  { path: "src/app/icon.png", size: 32, label: "Browser favicon (modern)" },
  { path: "src/app/apple-icon.png", size: 180, label: "iOS home screen icon" },
  // Public PWA / manifest sizes
  { path: "public/icon-192.png", size: 192, label: "PWA icon (small)" },
  { path: "public/icon-512.png", size: 512, label: "PWA icon (large)" },
  // Optional: larger favicon for retina
  { path: "public/favicon-32.png", size: 32, label: "Static 32px favicon" },
  { path: "public/favicon-16.png", size: 16, label: "Static 16px favicon" }
];

async function main() {
  for (const t of targets) {
    const out = await sharp(buf)
      .resize(t.size, t.size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 92 })
      .toBuffer();
    writeFileSync(join(root, t.path), out);
    console.log(`✓ ${t.path} (${t.size}×${t.size}, ${(out.length / 1024).toFixed(1)} KB) — ${t.label}`);
  }
  console.log("\n✅ All icons generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
