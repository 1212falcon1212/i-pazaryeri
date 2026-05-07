CREATE TABLE "SeoArticleSection" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "placement" TEXT NOT NULL,
  "eyebrow" TEXT,
  "title" TEXT NOT NULL,
  "intro" TEXT NOT NULL,
  "tableOfContents" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "ctaTitle" TEXT,
  "ctaDescription" TEXT,
  "ctaLabel" TEXT,
  "ctaHref" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE INDEX "SeoArticleSection_placement_idx" ON "SeoArticleSection"("placement");
CREATE INDEX "SeoArticleSection_isPublished_idx" ON "SeoArticleSection"("isPublished");
CREATE INDEX "SeoArticleSection_sortOrder_idx" ON "SeoArticleSection"("sortOrder");
