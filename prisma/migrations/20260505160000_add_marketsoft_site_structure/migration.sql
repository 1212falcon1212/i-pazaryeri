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
