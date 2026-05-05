# Marketsoft-Inspired Site Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved B2B sales/information architecture for i-Pazaryeri with structured admin management for homepage sections, service modules, packages, FAQs, and offer service options.

**Architecture:** Keep the existing Next.js App Router, Prisma + SQLite, server action, and `src/lib/content.ts` patterns. Add structured Prisma models instead of a page builder, seed B2B content, expose focused public pages, and add simple admin CRUD pages matching the existing admin style.

**Tech Stack:** Next.js 16, React 19, Prisma 7, SQLite, TypeScript, Vitest, lucide-react.

---

## File Structure

- Modify `prisma/schema.prisma`: add `HomeSectionItem`, `Package`, `PackageFeature`, `FaqCategory`, `FaqItem`, and `OfferServiceOption`; add `category` to `Feature` so it can serve as `ServiceModule`.
- Create `prisma/migrations/20260505160000_add_marketsoft_site_structure/migration.sql`: SQLite migration for the new tables and `Feature.category`.
- Modify `prisma/seed.ts`: seed homepage problem/process/reason items, B2B module catalog, packages, package features, FAQ categories/items, and offer service options.
- Modify `src/lib/content.ts`: add cached getters for home items, packages, FAQs, and offer service options.
- Create `src/lib/content-queries.test.ts`: unit tests for published/sorted query argument builders.
- Modify `src/lib/validators.ts` and `src/lib/validators.test.ts`: support `selectedServices` in offer requests while preserving existing `modules`.
- Modify `src/app/teklif-al/actions.ts` and `src/app/teklif-al/page.tsx`: render service option checkboxes and persist selections.
- Modify `src/app/admin/actions.ts`: add save/delete actions for home items, packages, package features, FAQ categories/items, and offer service options.
- Modify `src/components/admin/AdminShell.tsx`: add admin links for Homepage, Packages, FAQ, and Offer Options; rename features label to Service Modules.
- Create `src/app/admin/home/page.tsx`: CRUD for homepage problem/process/reason cards.
- Modify `src/app/admin/features/page.tsx`: treat features as service modules and expose category.
- Create `src/app/admin/packages/page.tsx`: CRUD for packages and package features.
- Create `src/app/admin/faqs/page.tsx`: CRUD for FAQ categories/items.
- Create `src/app/admin/offer-options/page.tsx`: CRUD for offer service choices.
- Modify `src/components/public/Header.tsx` and `src/components/public/Footer.tsx`: update public navigation.
- Modify `src/app/page.tsx`: implement approved homepage flow.
- Modify `src/app/ozellikler/page.tsx`: service/module catalog page.
- Create `src/app/paketler/page.tsx`: packages page.
- Create `src/app/sik-sorulan-sorular/page.tsx`: categorized FAQ page.
- Modify `src/app/projeler/page.tsx` and `src/app/projeler/[slug]/page.tsx`: position projects as working-system proof.
- Modify `src/app/globals.css`: add restrained light B2B section/card styles for new pages.

## Task 1: Data Model and Seed Content

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260505160000_add_marketsoft_site_structure/migration.sql`
- Modify: `prisma/seed.ts`
- Create: `src/lib/content-queries.test.ts`
- Modify: `src/lib/content.ts`

- [ ] **Step 1: Write failing tests for reusable query args**

Create `src/lib/content-queries.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  publishedFaqCategoryArgs,
  publishedHomeSectionArgs,
  publishedOfferServiceOptionArgs,
  publishedPackageArgs
} from "./content";

describe("content query args", () => {
  it("orders homepage section items by type and sort order", () => {
    expect(publishedHomeSectionArgs("problem")).toEqual({
      where: { type: "problem", isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });
  });

  it("loads published packages with sorted features", () => {
    expect(publishedPackageArgs()).toEqual({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: { features: { orderBy: [{ group: "asc" }, { sortOrder: "asc" }] } }
    });
  });

  it("loads faq categories with published sorted items", () => {
    expect(publishedFaqCategoryArgs()).toEqual({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        items: {
          where: { isPublished: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
        }
      }
    });
  });

  it("loads published offer service options in admin-defined order", () => {
    expect(publishedOfferServiceOptionArgs()).toEqual({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });
  });
});
```

- [ ] **Step 2: Run the new test and verify RED**

Run: `pnpm test src/lib/content-queries.test.ts`

Expected: fail because `publishedHomeSectionArgs`, `publishedPackageArgs`, `publishedFaqCategoryArgs`, and `publishedOfferServiceOptionArgs` are not exported from `src/lib/content.ts`.

- [ ] **Step 3: Add Prisma schema models**

In `prisma/schema.prisma`, add `category String @default("Genel")` to `Feature`, add `selectedServices String?` to `OfferRequest`, and append these models:

```prisma
model HomeSectionItem {
  id          String   @id @default(cuid())
  type        String
  title       String
  description String
  icon        String?
  sortOrder   Int      @default(0)
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([type])
  @@index([isPublished])
  @@index([sortOrder])
}

model Package {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  tagline     String
  description String
  audience    String?
  ctaLabel    String?
  ctaHref     String?
  isFeatured  Boolean  @default(false)
  isPublished Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  features    PackageFeature[]

  @@index([isPublished])
  @@index([sortOrder])
}

model PackageFeature {
  id        String   @id @default(cuid())
  packageId String
  label     String
  value     String
  group     String   @default("Kapsam")
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  package   Package  @relation(fields: [packageId], references: [id], onDelete: Cascade)

  @@index([packageId])
  @@index([sortOrder])
}

model FaqCategory {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String?
  isPublished Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  items       FaqItem[]

  @@index([isPublished])
  @@index([sortOrder])
}

model FaqItem {
  id          String      @id @default(cuid())
  categoryId  String
  question    String
  answer      String
  isFeatured  Boolean     @default(false)
  isPublished Boolean     @default(true)
  sortOrder   Int         @default(0)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  category    FaqCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@index([categoryId])
  @@index([isFeatured])
  @@index([isPublished])
  @@index([sortOrder])
}

model OfferServiceOption {
  id          String   @id @default(cuid())
  label       String
  value       String   @unique
  isPublished Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isPublished])
  @@index([sortOrder])
}
```

- [ ] **Step 4: Create migration SQL**

Create `prisma/migrations/20260505160000_add_marketsoft_site_structure/migration.sql` with:

```sql
ALTER TABLE "Feature" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Genel';
ALTER TABLE "OfferRequest" ADD COLUMN "selectedServices" TEXT;

CREATE TABLE "HomeSectionItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "Package" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "tagline" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "audience" TEXT,
  "ctaLabel" TEXT,
  "ctaHref" TEXT,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "PackageFeature" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "packageId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "group" TEXT NOT NULL DEFAULT 'Kapsam',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "PackageFeature_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "FaqCategory" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "FaqItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "categoryId" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "FaqItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FaqCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "OfferServiceOption" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");
CREATE UNIQUE INDEX "FaqCategory_slug_key" ON "FaqCategory"("slug");
CREATE UNIQUE INDEX "OfferServiceOption_value_key" ON "OfferServiceOption"("value");
CREATE INDEX "HomeSectionItem_type_idx" ON "HomeSectionItem"("type");
CREATE INDEX "HomeSectionItem_isPublished_idx" ON "HomeSectionItem"("isPublished");
CREATE INDEX "HomeSectionItem_sortOrder_idx" ON "HomeSectionItem"("sortOrder");
CREATE INDEX "Package_isPublished_idx" ON "Package"("isPublished");
CREATE INDEX "Package_sortOrder_idx" ON "Package"("sortOrder");
CREATE INDEX "PackageFeature_packageId_idx" ON "PackageFeature"("packageId");
CREATE INDEX "PackageFeature_sortOrder_idx" ON "PackageFeature"("sortOrder");
CREATE INDEX "FaqCategory_isPublished_idx" ON "FaqCategory"("isPublished");
CREATE INDEX "FaqCategory_sortOrder_idx" ON "FaqCategory"("sortOrder");
CREATE INDEX "FaqItem_categoryId_idx" ON "FaqItem"("categoryId");
CREATE INDEX "FaqItem_isFeatured_idx" ON "FaqItem"("isFeatured");
CREATE INDEX "FaqItem_isPublished_idx" ON "FaqItem"("isPublished");
CREATE INDEX "FaqItem_sortOrder_idx" ON "FaqItem"("sortOrder");
CREATE INDEX "OfferServiceOption_isPublished_idx" ON "OfferServiceOption"("isPublished");
CREATE INDEX "OfferServiceOption_sortOrder_idx" ON "OfferServiceOption"("sortOrder");
```

- [ ] **Step 5: Export query builders and getters**

Modify `src/lib/content.ts` to export the tested query builders and getters:

```ts
export function publishedHomeSectionArgs(type: string) {
  return {
    where: { type, isPublished: true },
    orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }]
  };
}

export function publishedPackageArgs() {
  return {
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }],
    include: { features: { orderBy: [{ group: "asc" as const }, { sortOrder: "asc" as const }] } }
  };
}

export function publishedFaqCategoryArgs() {
  return {
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }],
    include: {
      items: {
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }]
      }
    }
  };
}

export function publishedOfferServiceOptionArgs() {
  return {
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }]
  };
}

export const getHomeSectionItems = cache((type: string) =>
  prisma.homeSectionItem.findMany(publishedHomeSectionArgs(type))
);

export const getPackages = cache(() =>
  prisma.package.findMany(publishedPackageArgs())
);

export const getFaqCategories = cache(() =>
  prisma.faqCategory.findMany(publishedFaqCategoryArgs())
);

export const getFeaturedFaqs = cache(() =>
  prisma.faqItem.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    take: 6
  })
);

export const getOfferServiceOptions = cache(() =>
  prisma.offerServiceOption.findMany(publishedOfferServiceOptionArgs())
);
```

- [ ] **Step 6: Update seed data**

Modify `prisma/seed.ts` to upsert:

```ts
const homeItems = [
  ["problem", "Siparişler WhatsApp ve Excel'de dağılıyor", "Bayi talepleri, stok bilgisi ve onay süreçleri farklı kanallara bölündüğünde operasyon yavaşlar.", "MessageSquare", 1],
  ["problem", "Bayiye özel fiyat ve iskonto yönetimi zorlaşıyor", "Farklı müşteri grupları için fiyat listelerini manuel yürütmek hata ve gecikme üretir.", "BadgePercent", 2],
  ["problem", "ERP, stok ve cari bilgiler sahaya geç yansıyor", "Satış ekibi ve bayiler güncel bilgiye ulaşamadığında sipariş kalitesi düşer.", "Database", 3],
  ["process", "Keşif", "İş modelinizi, bayi ağınızı, entegrasyonları ve öncelikli modülleri birlikte netleştiririz.", "Search", 1],
  ["process", "Kapsam", "Başlangıç için gerekli modülleri ve canlıya geçiş planını belirleriz.", "ListChecks", 2],
  ["process", "Uyarlama", "Arayüz, veri, rol ve entegrasyon ihtiyaçlarını altyapıya işleriz.", "Settings2", 3],
  ["process", "Yayın", "Test, eğitim ve canlıya geçiş adımlarını kontrollü tamamlarız.", "Rocket", 4],
  ["reason", "Kanıtlanmış çekirdek", "Farklı sektörlerde çalışan örneklerden gelen hazır bir B2B altyapısı ile başlarsınız.", "ShieldCheck", 1],
  ["reason", "Daha düşük geliştirme riski", "Sıfırdan yazılım yerine ürüne dönüşmüş modülleri iş kurallarınıza uyarlarız.", "Gauge", 2],
  ["reason", "Modüler büyüme", "İlk canlıya geçişten sonra entegrasyon, rapor ve otomasyonları aşamalı genişletebilirsiniz.", "Layers3", 3]
];
```

Add similar arrays for packages, package features, FAQs, and offer service options matching the approved spec. Use `upsert` by stable unique fields (`slug` or `value`) and preserve existing project/blog data.

- [ ] **Step 7: Run migration/generate and tests**

Run:

```bash
pnpm exec prisma migrate deploy
pnpm db:generate
pnpm test src/lib/content-queries.test.ts
pnpm test
```

Expected: Prisma client generated, migrations applied, all tests pass.

- [ ] **Step 8: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/20260505160000_add_marketsoft_site_structure/migration.sql prisma/seed.ts src/lib/content.ts src/lib/content-queries.test.ts
git commit -m "feat: add structured site content models"
```

## Task 2: Offer Form Service Selection

**Files:**
- Modify: `src/lib/validators.ts`
- Modify: `src/lib/validators.test.ts`
- Modify: `src/app/teklif-al/actions.ts`
- Modify: `src/app/teklif-al/page.tsx`

- [ ] **Step 1: Write failing validator test**

Add to `src/lib/validators.test.ts`:

```ts
it("serializes selected service options for offer requests", () => {
  const result = validateOfferInput({
    fullName: "Ayşe Demir",
    company: "Demir Dağıtım",
    email: "ayse@example.com",
    phone: "",
    sector: "Toptan ticaret",
    networkSize: "120 bayi",
    modules: "",
    selectedServices: ["bayi-yonetimi", "erp-entegrasyonu", "fiyat-listeleri"],
    message: "Bayi fiyat listelerini ve ERP stok bilgisini portala taşımak istiyoruz."
  });

  expect(result).toEqual({
    ok: true,
    data: {
      fullName: "Ayşe Demir",
      company: "Demir Dağıtım",
      email: "ayse@example.com",
      phone: "",
      sector: "Toptan ticaret",
      networkSize: "120 bayi",
      modules: "",
      selectedServices: "bayi-yonetimi, erp-entegrasyonu, fiyat-listeleri",
      message: "Bayi fiyat listelerini ve ERP stok bilgisini portala taşımak istiyoruz."
    }
  });
});
```

- [ ] **Step 2: Run RED**

Run: `pnpm test src/lib/validators.test.ts`

Expected: fail because `selectedServices` is not part of `OfferInput` or returned data.

- [ ] **Step 3: Implement validator support**

Modify `src/lib/validators.ts` so `OfferInput` includes `selectedServices: unknown` and `validateOfferInput` serializes arrays:

```ts
function cleanMulti(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(clean).filter(Boolean).join(", ");
  }
  return clean(value);
}
```

Add `selectedServices: cleanMulti(input.selectedServices)` to `data`.

- [ ] **Step 4: Update action and form**

In `src/app/teklif-al/actions.ts`, pass `selectedServices: formData.getAll("selectedServices")`.

In `src/app/teklif-al/page.tsx`, load `getOfferServiceOptions()` and render checkbox inputs:

```tsx
{serviceOptions.length > 0 ? (
  <div className="field full">
    <label>İlgilendiğiniz servisler</label>
    <div className="choice-grid">
      {serviceOptions.map((option) => (
        <label className="choice-pill" key={option.id}>
          <input type="checkbox" name="selectedServices" value={option.value} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  </div>
) : null}
```

- [ ] **Step 5: Run tests**

Run:

```bash
pnpm test src/lib/validators.test.ts
pnpm test
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/validators.ts src/lib/validators.test.ts src/app/teklif-al/actions.ts src/app/teklif-al/page.tsx
git commit -m "feat: collect offer service selections"
```

## Task 3: Admin CRUD for Structured Content

**Files:**
- Modify: `src/app/admin/actions.ts`
- Modify: `src/components/admin/AdminShell.tsx`
- Create: `src/app/admin/home/page.tsx`
- Modify: `src/app/admin/features/page.tsx`
- Create: `src/app/admin/packages/page.tsx`
- Create: `src/app/admin/faqs/page.tsx`
- Create: `src/app/admin/offer-options/page.tsx`

- [ ] **Step 1: Add server actions**

Add actions in `src/app/admin/actions.ts` following the existing `saveFeature` pattern:

```ts
export async function saveHomeSectionItem(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    type: str(formData, "type"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    icon: optional(formData, "icon"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.homeSectionItem.update({ where: { id }, data });
  else await prisma.homeSectionItem.create({ data });
  revalidatePath("/");
  redirect("/admin/home?saved=1");
}
```

Add equivalent `deleteHomeSectionItem`, `savePackage`, `deletePackage`, `savePackageFeature`, `deletePackageFeature`, `saveFaqCategory`, `deleteFaqCategory`, `saveFaqItem`, `deleteFaqItem`, `saveOfferServiceOption`, and `deleteOfferServiceOption` actions.

- [ ] **Step 2: Add admin nav links**

Modify `src/components/admin/AdminShell.tsx` links to include:

```ts
["Ana Sayfa", "/admin/home"],
["Servisler / Modüller", "/admin/features"],
["Paketler", "/admin/packages"],
["Sık Sorulan Sorular", "/admin/faqs"],
["Teklif seçenekleri", "/admin/offer-options"],
```

- [ ] **Step 3: Build admin pages**

Create pages with the existing `admin-card admin-form` pattern. Each page should:

- call `await requireAdmin()`;
- fetch records ordered by `sortOrder`;
- render edit forms for existing records;
- render one "Yeni ..." form;
- show `query.saved` and `query.deleted` notices where useful.

- [ ] **Step 4: Run build**

Run: `pnpm build`

Expected: TypeScript and Next build pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/actions.ts src/components/admin/AdminShell.tsx src/app/admin/home/page.tsx src/app/admin/features/page.tsx src/app/admin/packages/page.tsx src/app/admin/faqs/page.tsx src/app/admin/offer-options/page.tsx
git commit -m "feat: manage structured site content in admin"
```

## Task 4: Public Pages and Navigation

**Files:**
- Modify: `src/components/public/Header.tsx`
- Modify: `src/components/public/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/ozellikler/page.tsx`
- Create: `src/app/paketler/page.tsx`
- Create: `src/app/sik-sorulan-sorular/page.tsx`
- Modify: `src/app/projeler/page.tsx`
- Modify: `src/app/projeler/[slug]/page.tsx`

- [ ] **Step 1: Update navigation**

Public nav should become:

```ts
const navItems: Array<[string, string]> = [
  ["Hakkımızda", "/sektorler"],
  ["Özellikler", "/ozellikler"],
  ["Paketler", "/paketler"],
  ["Sık Sorulan Sorular", "/sik-sorulan-sorular"],
  ["Blog", "/blog"],
  ["İletişim", "/teklif-al"]
];
```

- [ ] **Step 2: Implement homepage flow**

Load:

```ts
const [settings, projects, testimonial, problems, processSteps, reasons, modules, featuredFaqs] = await Promise.all([
  getSettings(),
  getProjects(),
  getFeaturedTestimonial(),
  getHomeSectionItems("problem"),
  getHomeSectionItems("process"),
  getHomeSectionItems("reason"),
  getFeatures(),
  getFeaturedFaqs()
]);
```

Render sections in approved order: hero, problem, proof projects, service modules, process, reasons, featured FAQ, final CTA.

- [ ] **Step 3: Implement packages page**

Create `src/app/paketler/page.tsx` that loads `getPackages()` and renders package cards plus feature rows grouped by `group`.

- [ ] **Step 4: Implement FAQ page**

Create `src/app/sik-sorulan-sorular/page.tsx` that loads `getFaqCategories()` and renders each category with all published items.

- [ ] **Step 5: Strengthen feature and project pages**

Update `/ozellikler` to read like a service/module catalog. Update project list/detail copy to frame projects as "çalışan sistem kanıtları".

- [ ] **Step 6: Run build**

Run: `pnpm build`

Expected: build passes.

- [ ] **Step 7: Commit**

```bash
git add src/components/public/Header.tsx src/components/public/Footer.tsx src/app/page.tsx src/app/ozellikler/page.tsx src/app/paketler/page.tsx src/app/sik-sorulan-sorular/page.tsx src/app/projeler/page.tsx src/app/projeler/[slug]/page.tsx
git commit -m "feat: rebuild public site around b2b buying journey"
```

## Task 5: Styling and Final Verification

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add CSS for new structured sections**

Add classes:

```css
.section-kicker { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 13px; letter-spacing: 0; }
.problem-grid, .module-grid, .process-grid, .reason-grid, .faq-preview-grid, .package-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.info-card { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 24px; box-shadow: var(--shadow-sm); }
.info-card h3 { margin: 0 0 10px; font-size: 22px; line-height: 1.15; letter-spacing: 0; }
.info-card p { margin: 0; color: var(--muted); line-height: 1.55; }
.choice-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.choice-pill { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line); border-radius: 999px; padding: 10px 14px; background: #fff; }
@media (max-width: 900px) { .problem-grid, .module-grid, .process-grid, .reason-grid, .faq-preview-grid, .package-grid { grid-template-columns: 1fr; } }
```

Adjust names during implementation only if existing CSS already defines a conflicting class.

- [ ] **Step 2: Run full verification**

Run:

```bash
pnpm db:seed
pnpm test
pnpm build
```

Expected: seed completes, tests pass, build passes.

- [ ] **Step 3: Start dev server**

Run: `pnpm dev`

Expected: local Next dev server starts and prints a localhost URL.

- [ ] **Step 4: Manual visual check**

Open the dev URL and check:

- `/`
- `/ozellikler`
- `/paketler`
- `/sik-sorulan-sorular`
- `/teklif-al`
- `/admin`

Confirm no obvious overlap, missing content, or broken navigation.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "style: polish structured b2b site pages"
```
