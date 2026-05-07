CREATE TABLE "SolutionCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "proof" TEXT,
    "brands" TEXT,
    "icon" TEXT,
    "visualImage" TEXT,
    "visualAccent" TEXT DEFAULT '#B87333',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "SolutionCard_slug_key" ON "SolutionCard"("slug");
CREATE INDEX "SolutionCard_isPublished_idx" ON "SolutionCard"("isPublished");
CREATE INDEX "SolutionCard_sortOrder_idx" ON "SolutionCard"("sortOrder");
