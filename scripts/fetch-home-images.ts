/**
 * Download + optimize 8 hero/section images for the homepage.
 * Source: Unsplash (free CDN), output: public/uploads/home/*.webp
 *
 * Run: npx tsx scripts/fetch-home-images.ts
 *
 * Skips images that already exist — safe to re-run. Delete a file to
 * regenerate it.
 */

import "dotenv/config";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

type Spec = {
  name: string;
  photoId: string;
  width: number;
  height: number;
  description: string;
};

const SPECS: Spec[] = [
  // Business model card covers (16:9, ~ 800x450)
  {
    name: "model-b2b",
    photoId: "photo-1454165804606-c3d57bc86b40", // analytics chart / business
    width: 800,
    height: 450,
    description: "B2B — bayi sipariş portalı / kurumsal alıcı"
  },
  {
    name: "model-b2c",
    photoId: "photo-1607082348824-0a96f2a4b9da", // mobile shopping
    width: 800,
    height: 450,
    description: "B2C — doğrudan tüketiciye satış / online mağaza"
  },
  {
    name: "model-c2c",
    photoId: "photo-1556742502-ec7c0e9f34b1", // marketplace / multi-vendor
    width: 800,
    height: 450,
    description: "C2C — çoklu satıcı pazaryeri"
  },

  // Platform preview screenshots-style (16:9, ~ 1200x675)
  {
    name: "platform-admin",
    photoId: "photo-1551288049-bebda4e38f71", // dashboard analytics on laptop
    width: 1200,
    height: 675,
    description: "Admin panel — sipariş, stok, müşteri yönetimi"
  },
  {
    name: "platform-storefront",
    photoId: "photo-1481437156560-3205f6a55735", // online storefront
    width: 1200,
    height: 675,
    description: "Mağaza vitrini — müşteri deneyimi"
  },
  {
    name: "platform-mobile",
    photoId: "photo-1512941937669-90a1b58e7e9c", // mobile shopping app
    width: 1200,
    height: 675,
    description: "Mobil uygulama — iOS & Android"
  },

  // Side images for sections (4:3 / 3:2)
  {
    name: "metrics-team",
    photoId: "photo-1556761175-b413da4baf72", // team collaboration / office
    width: 900,
    height: 600,
    description: "Operasyon ekibi — dijital sipariş akışı"
  },
  {
    name: "integrations-network",
    photoId: "photo-1518770660439-4636190af475", // tech / circuit / network
    width: 900,
    height: 600,
    description: "Entegrasyon ağı — ERP / kargo / ödeme bağlantıları"
  }
];

async function downloadImage(photoId: string): Promise<Buffer> {
  const url = `https://images.unsplash.com/${photoId}?w=2000&q=85&fm=jpg&fit=crop&crop=entropy`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ipazaryeri-bot/1.0)" }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${photoId}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outDir = join(process.cwd(), "public", "uploads", "home");
  mkdirSync(outDir, { recursive: true });

  console.log(`→ Writing to ${outDir}`);
  console.log(`→ ${SPECS.length} images to process\n`);

  let fetched = 0;
  let skipped = 0;
  let failed = 0;

  for (const spec of SPECS) {
    const filename = `${spec.name}.webp`;
    const filepath = join(outDir, filename);

    if (existsSync(filepath)) {
      console.log(`· ${spec.name} already exists — skip`);
      skipped++;
      continue;
    }

    try {
      console.log(`↓ ${spec.name} (${spec.description})`);
      const buf = await downloadImage(spec.photoId);
      const out = await sharp(buf)
        .resize(spec.width, spec.height, { fit: "cover", position: "attention" })
        .webp({ quality: 80, effort: 5 })
        .toBuffer();
      writeFileSync(filepath, out);
      console.log(`  ✓ ${filename} (${(out.length / 1024).toFixed(0)} KB, ${spec.width}x${spec.height})`);
      fetched++;
    } catch (err) {
      console.error(`  ✗ ${spec.name}:`, err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log(`\n✅ Done. ${fetched} fetched, ${skipped} skipped, ${failed} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
