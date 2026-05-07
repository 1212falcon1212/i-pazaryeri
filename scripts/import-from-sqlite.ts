/**
 * Import data from a SQLite dump (dev.db) into the live MySQL database.
 *
 * Usage on VPS:
 *   1. Ensure prod schema applied: `npx prisma db push --schema=prisma/schema.prod.prisma`
 *   2. Place the source SQLite file at ./scripts/dev.db (scp from local)
 *   3. Run: `DATABASE_URL=... npx tsx scripts/import-from-sqlite.ts`
 *
 * The script:
 *   - opens the local sqlite file via better-sqlite3
 *   - reads every row from each table in dependency order
 *   - inserts via Prisma client (which is generated for MySQL on the VPS)
 *   - uses upsert so re-runs are idempotent
 */

import "dotenv/config";
import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const SRC = process.env.SOURCE_SQLITE ?? "./scripts/dev.db";
const sqlite = new Database(SRC, { readonly: true });

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "";
  if (url.startsWith("mysql://") || url.startsWith("mariadb://")) {
    return new PrismaClient({ adapter: new PrismaMariaDb(url) });
  }
  const filePath = url.startsWith("file:") ? url.slice("file:".length) : url || "./dev.db";
  return new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: filePath }) });
}

const prisma = makeClient();

function rows<T = Record<string, unknown>>(table: string): T[] {
  return sqlite.prepare(`SELECT * FROM "${table}"`).all() as T[];
}

function asBool(v: unknown): boolean {
  return v === 1 || v === true || v === "1";
}

function asDate(v: unknown): Date {
  if (v instanceof Date) return v;
  if (typeof v === "string" || typeof v === "number") return new Date(v);
  return new Date();
}

async function main() {
  console.log(`Reading from ${SRC}`);

  // 1. SiteSetting (singleton)
  const settings = rows("SiteSetting");
  for (const s of settings) {
    const r = s as any;
    await prisma.siteSetting.upsert({
      where: { id: r.id },
      update: r,
      create: { ...r, createdAt: asDate(r.createdAt), updatedAt: asDate(r.updatedAt) }
    });
  }
  console.log(`✓ SiteSetting: ${settings.length}`);

  // 2. Project
  const projects = rows("Project");
  for (const p of projects) {
    const r = p as any;
    const data = {
      ...r,
      isFeatured: asBool(r.isFeatured),
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.project.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ Project: ${projects.length}`);

  // 3. Feature
  const features = rows("Feature");
  for (const f of features) {
    const r = f as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.feature.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ Feature: ${features.length}`);

  // 4. SolutionCard
  const solutionCards = rows("SolutionCard");
  for (const sc of solutionCards) {
    const r = sc as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.solutionCard.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ SolutionCard: ${solutionCards.length}`);

  // 5. Sector
  const sectors = rows("Sector");
  for (const s of sectors) {
    const r = s as any;
    const data = {
      ...r,
      isFeatured: asBool(r.isFeatured),
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.sector.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ Sector: ${sectors.length}`);

  // 6. Post
  const posts = rows("Post");
  for (const p of posts) {
    const r = p as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.post.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ Post: ${posts.length}`);

  // 7. Testimonial
  const testimonials = rows("Testimonial");
  for (const t of testimonials) {
    const r = t as any;
    const data = {
      ...r,
      isFeatured: asBool(r.isFeatured),
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.testimonial.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ Testimonial: ${testimonials.length}`);

  // 8. OfferRequest
  const offers = rows("OfferRequest");
  for (const o of offers) {
    const r = o as any;
    const data = {
      ...r,
      isRead: asBool(r.isRead),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.offerRequest.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ OfferRequest: ${offers.length}`);

  // 9. HomeSectionItem
  const homeItems = rows("HomeSectionItem");
  for (const h of homeItems) {
    const r = h as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.homeSectionItem.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ HomeSectionItem: ${homeItems.length}`);

  // 10. SeoArticleSection
  const seoSections = rows("SeoArticleSection");
  for (const s of seoSections) {
    const r = s as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.seoArticleSection.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ SeoArticleSection: ${seoSections.length}`);

  // 11. Package (parent)
  const packages = rows("Package");
  for (const p of packages) {
    const r = p as any;
    const data = {
      ...r,
      isFeatured: asBool(r.isFeatured),
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.package.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ Package: ${packages.length}`);

  // 12. PackageFeature (child of Package)
  const packageFeatures = rows("PackageFeature");
  for (const pf of packageFeatures) {
    const r = pf as any;
    const data = {
      ...r,
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.packageFeature.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ PackageFeature: ${packageFeatures.length}`);

  // 13. FaqCategory (parent)
  const faqCategories = rows("FaqCategory");
  for (const fc of faqCategories) {
    const r = fc as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.faqCategory.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ FaqCategory: ${faqCategories.length}`);

  // 14. FaqItem (child of FaqCategory)
  const faqItems = rows("FaqItem");
  for (const fi of faqItems) {
    const r = fi as any;
    const data = {
      ...r,
      isFeatured: asBool(r.isFeatured),
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.faqItem.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ FaqItem: ${faqItems.length}`);

  // 15. OfferServiceOption
  const serviceOptions = rows("OfferServiceOption");
  for (const so of serviceOptions) {
    const r = so as any;
    const data = {
      ...r,
      isPublished: asBool(r.isPublished),
      createdAt: asDate(r.createdAt),
      updatedAt: asDate(r.updatedAt)
    };
    await prisma.offerServiceOption.upsert({ where: { id: r.id }, update: data, create: data });
  }
  console.log(`✓ OfferServiceOption: ${serviceOptions.length}`);

  console.log("\n✅ Import complete.");
  await prisma.$disconnect();
  sqlite.close();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
