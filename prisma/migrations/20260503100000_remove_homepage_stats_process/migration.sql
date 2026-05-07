-- DropTable
DROP TABLE IF EXISTS "HomeStat";

-- DropTable
DROP TABLE IF EXISTS "ProcessStep";

-- AlterTable: drop unused SiteSetting columns by rebuilding the table
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "siteName" TEXT NOT NULL,
    "logoText" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroBannerImage" TEXT,
    "heroBannerAlt" TEXT,
    "primaryCtaLabel" TEXT NOT NULL,
    "primaryCtaHref" TEXT NOT NULL,
    "projectsTitle" TEXT NOT NULL,
    "projectsTitleAccent" TEXT,
    "projectsDescription" TEXT NOT NULL,
    "sectorsTitle" TEXT NOT NULL,
    "sectorsDescription" TEXT NOT NULL,
    "featuresDescription" TEXT NOT NULL,
    "finalCtaTitle" TEXT NOT NULL,
    "finalCtaDescription" TEXT NOT NULL,
    "ctaNote" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "new_SiteSetting" (
    "id", "siteName", "logoText", "heroTitle", "heroDescription",
    "heroBannerImage", "heroBannerAlt", "primaryCtaLabel", "primaryCtaHref",
    "projectsTitle", "projectsTitleAccent", "projectsDescription",
    "sectorsTitle", "sectorsDescription", "featuresDescription",
    "finalCtaTitle", "finalCtaDescription", "ctaNote",
    "contactEmail", "contactPhone", "seoTitle", "seoDescription",
    "createdAt", "updatedAt"
)
SELECT
    "id", "siteName", "logoText", "heroTitle", "heroDescription",
    "heroBannerImage", "heroBannerAlt", "primaryCtaLabel", "primaryCtaHref",
    "projectsTitle", "projectsTitleAccent", "projectsDescription",
    "sectorsTitle", "sectorsDescription", "featuresDescription",
    "finalCtaTitle", "finalCtaDescription", "ctaNote",
    "contactEmail", "contactPhone", "seoTitle", "seoDescription",
    "createdAt", "updatedAt"
FROM "SiteSetting";

DROP TABLE "SiteSetting";
ALTER TABLE "new_SiteSetting" RENAME TO "SiteSetting";

PRAGMA foreign_keys=ON;
