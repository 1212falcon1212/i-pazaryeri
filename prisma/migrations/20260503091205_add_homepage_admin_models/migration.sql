-- AlterTable
ALTER TABLE "SiteSetting" ADD COLUMN "ctaNote" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "featuresTitleAccent" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "heroBannerAlt" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "heroBannerImage" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "projectsTitleAccent" TEXT;

-- CreateTable
CREATE TABLE "HomeStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "num" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "authorMeta" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "metric1Label" TEXT,
    "metric1Value" TEXT,
    "metric2Label" TEXT,
    "metric2Value" TEXT,
    "metric3Label" TEXT,
    "metric3Value" TEXT,
    "videoUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "HomeStat_isPublished_idx" ON "HomeStat"("isPublished");

-- CreateIndex
CREATE INDEX "HomeStat_sortOrder_idx" ON "HomeStat"("sortOrder");

-- CreateIndex
CREATE INDEX "ProcessStep_isPublished_idx" ON "ProcessStep"("isPublished");

-- CreateIndex
CREATE INDEX "ProcessStep_sortOrder_idx" ON "ProcessStep"("sortOrder");

-- CreateIndex
CREATE INDEX "Testimonial_isFeatured_idx" ON "Testimonial"("isFeatured");

-- CreateIndex
CREATE INDEX "Testimonial_isPublished_idx" ON "Testimonial"("isPublished");

-- CreateIndex
CREATE INDEX "Testimonial_sortOrder_idx" ON "Testimonial"("sortOrder");
