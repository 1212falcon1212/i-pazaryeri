/**
 * Bulk-import 30 blog posts from scripts/blog-content/*.json
 * Generates cover images via Unsplash CDN, optimizes via sharp, writes to DB.
 *
 * Run from project root:
 *   npx tsx scripts/import-blog-bulk.ts
 */

import "dotenv/config";
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { prisma } from "../src/lib/db";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
};

// Unsplash photo IDs by tag — one cover image per tag, reused across posts of that tag.
// Picked from generic stock photos that broadly match the topic.
const COVER_PHOTOS: Record<string, string[]> = {
  B2B: [
    "photo-1556761175-b413da4baf72",      // team meeting
    "photo-1497366216548-37526070297c",   // office
    "photo-1521737711867-e3b97375f902",   // people
    "photo-1556761175-4b46a572b786",      // business handshake
    "photo-1542744173-8e7e53415bb0"       // dashboard
  ],
  B2C: [
    "photo-1607082348824-0a96f2a4b9da",   // shopping bags
    "photo-1556742049-0cfed4f6a45d",      // mobile shopping
    "photo-1607082352121-fa243f3dde32",   // ecommerce phone
    "photo-1607083206869-4c7672e72a8a",   // shopping cart
    "photo-1607082352127-9d18a1b1bba8",   // mobile phone shop
    "photo-1607082350899-7e105aa886ae"    // online shop
  ],
  C2C: [
    "photo-1556740758-90de374c12ad",      // marketplace
    "photo-1573164713714-d95e436ab8d6",   // multi-vendor
    "photo-1556740772-1a741367b93e",      // sellers
    "photo-1556745753-b2904692b3cd",      // online marketplace
    "photo-1556745757-8d76bdb6984b",      // shop
    "photo-1556740758-90de374c12ad"
  ],
  Entegrasyon: [
    "photo-1518770660439-4636190af475",   // circuit
    "photo-1551288049-bebda4e38f71",      // analytics dashboard
    "photo-1485827404703-89b55fcc595e",   // robot/integration
    "photo-1581094794329-c8112a89af12",   // network
    "photo-1559136555-9303baea8ebd",      // api code
    "photo-1488229297570-58520851e868"    // tech
  ],
  Mobil: [
    "photo-1605108222700-0d605d9ebafe",   // phone
    "photo-1512941937669-90a1b58e7e9c",   // mobile app
    "photo-1574944985070-8f3ebc6b79d2"    // mobile dev
  ],
  Strateji: [
    "photo-1542621334-a254cf47733d",      // blueprint
    "photo-1454165804606-c3d57bc86b40",   // chart
    "photo-1551288049-bebda4e38f71"       // dashboard analytics
  ],
  Pazarlama: [
    "photo-1551434678-e076c223a692"      // marketing chart
  ]
};

// Hash-based selection so each slug consistently picks the same image
function pickPhoto(tag: string, slug: string): string {
  const list = COVER_PHOTOS[tag] || COVER_PHOTOS["B2B"];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return list[hash % list.length];
}

async function downloadImage(photoId: string): Promise<Buffer> {
  const url = `https://images.unsplash.com/${photoId}?w=1800&q=85&fm=jpg&fit=crop&crop=entropy`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ipazaryeri-bot/1.0)" }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${photoId}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const contentDir = join(process.cwd(), "scripts", "blog-content");
  const blogDir = join(process.cwd(), "public", "uploads", "blog");
  mkdirSync(blogDir, { recursive: true });

  // Collect all posts
  const allPosts: Post[] = [];
  const files = readdirSync(contentDir).filter((f) => f.endsWith(".json")).sort();
  for (const f of files) {
    const data = JSON.parse(readFileSync(join(contentDir, f), "utf8"));
    if (Array.isArray(data)) allPosts.push(...data);
  }
  console.log(`Loaded ${allPosts.length} posts from ${files.length} files`);

  let i = 0;
  for (const p of allPosts) {
    try {
      // Skip if exists with same content
      const existing = await prisma.post.findUnique({ where: { slug: p.slug } });

      // Cover image
      const filename = `${p.slug}.webp`;
      const filepath = join(blogDir, filename);
      let coverUrl: string | null = `/uploads/blog/${filename}`;

      if (!existsSync(filepath)) {
        try {
          const photoId = pickPhoto(p.tag, p.slug);
          console.log(`  ↓ ${p.slug} cover from ${photoId}`);
          const buf = await downloadImage(photoId);
          const out = await sharp(buf)
            .resize(1600, 900, { fit: "cover", position: "attention" })
            .webp({ quality: 78, effort: 5 })
            .toBuffer();
          writeFileSync(filepath, out);
        } catch (err) {
          console.error(`  cover failed for ${p.slug}:`, err instanceof Error ? err.message : err);
          coverUrl = existing?.coverImage ?? null;
        }
      } else {
        console.log(`  · ${p.slug} cover already exists`);
      }

      // Upsert post
      const data = {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        tag: p.tag,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        coverImage: coverUrl
      };

      await prisma.post.upsert({
        where: { slug: p.slug },
        update: data,
        create: { slug: p.slug, ...data, sortOrder: 100 + i }
      });
      console.log(`✓ ${i + 1}/${allPosts.length} ${p.slug}`);
      i++;
    } catch (err) {
      console.error(`✗ ${p.slug}:`, err instanceof Error ? err.message : err);
    }
  }

  await prisma.$disconnect();
  console.log("\n✅ Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
