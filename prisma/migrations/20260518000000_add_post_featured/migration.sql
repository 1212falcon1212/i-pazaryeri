ALTER TABLE "Post" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX "Post_isFeatured_idx" ON "Post"("isFeatured");
