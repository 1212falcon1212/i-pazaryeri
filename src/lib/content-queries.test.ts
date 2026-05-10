import { describe, expect, it } from "vitest";
import {
  publishedFaqCategoryArgs,
  publishedFeatureArgs,
  publishedHomeSectionArgs,
  publishedOfferServiceOptionArgs,
  publishedPackageArgs,
  publishedSeoArticleArgs,
  publishedSolutionCardArgs,
  publishedSolutionCardDetailArgs
} from "./content";

describe("content query args", () => {
  it("orders homepage section items by type and sort order", () => {
    expect(publishedHomeSectionArgs("problem")).toEqual({
      where: { type: "problem", isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });
  });

  it("loads published feature cards in admin-defined order", () => {
    expect(publishedFeatureArgs()).toEqual({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });
  });

  it("loads published solution cards in admin-defined order", () => {
    expect(publishedSolutionCardArgs()).toEqual({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });
  });

  it("loads a published solution card detail by slug", () => {
    expect(publishedSolutionCardDetailArgs("erp-muhasebe")).toEqual({
      where: { slug: "erp-muhasebe", isPublished: true }
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

  it("loads the first published homepage seo article after blog", () => {
    expect(publishedSeoArticleArgs("homepage-after-blog")).toEqual({
      where: { placement: "homepage-after-blog", isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });
  });
});
