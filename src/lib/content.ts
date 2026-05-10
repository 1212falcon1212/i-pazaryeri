import { cache } from "react";
import { prisma } from "./db";

export const getSettings = cache(async () => {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });

  if (!settings) {
    throw new Error("Site settings are not seeded.");
  }

  return settings;
});

export function publishedFeatureArgs() {
  return {
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" as const }, { createdAt: "desc" as const }]
  };
}

export const getFeatures = cache(() =>
  prisma.feature.findMany(publishedFeatureArgs())
);

export function publishedSolutionCardArgs() {
  return {
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }]
  };
}

export const getSolutionCards = cache(() =>
  prisma.solutionCard.findMany(publishedSolutionCardArgs())
);

export function publishedSolutionCardDetailArgs(slug: string) {
  return {
    where: { slug, isPublished: true }
  };
}

export const getSolutionCard = cache((slug: string) =>
  prisma.solutionCard.findFirst(publishedSolutionCardDetailArgs(slug))
);

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
    include: {
      features: {
        orderBy: [{ group: "asc" as const }, { sortOrder: "asc" as const }]
      }
    }
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

export function publishedSeoArticleArgs(placement: string) {
  return {
    where: { placement, isPublished: true },
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

export const getSeoArticleSection = cache((placement: string) =>
  prisma.seoArticleSection.findFirst(publishedSeoArticleArgs(placement))
);

export const getSectors = cache(() =>
  prisma.sector.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  })
);

export const getPosts = cache(() =>
  prisma.post.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  })
);

export const getPost = cache((slug: string) =>
  prisma.post.findFirst({ where: { slug, isPublished: true } })
);

export const getRelatedPosts = cache(async (slug: string, tag: string | null, limit = 3) => {
  // Prefer same tag; fall back to filling with other latest posts
  const sameTag = tag
    ? await prisma.post.findMany({
        where: { isPublished: true, tag, slug: { not: slug } },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        take: limit
      })
    : [];
  if (sameTag.length >= limit) return sameTag;
  const fillCount = limit - sameTag.length;
  const excludeSlugs = [slug, ...sameTag.map((p) => p.slug)];
  const fillers = await prisma.post.findMany({
    where: { isPublished: true, slug: { notIn: excludeSlugs } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: fillCount
  });
  return [...sameTag, ...fillers];
});

export const getFeaturedTestimonial = cache(() =>
  prisma.testimonial.findFirst({
    where: { isPublished: true, isFeatured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
  })
);

// =====================================================================
// FAZ 1 — Anasayfa hardcoded içerik DB'den çekiliyor
// =====================================================================

export const getBusinessModelCards = cache(() =>
  prisma.businessModelCard.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
  })
);

export const getHomeStats = cache(() =>
  prisma.homeStat.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
  })
);

export const getPlatformShowcaseCards = cache(() =>
  prisma.platformShowcaseCard.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
  })
);

export const getIntegrationGroups = cache(() =>
  prisma.integrationGroup.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      items: {
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
      }
    }
  })
);

// =====================================================================
// FAZ 2 — /b2b /b2c /c2c sayfa içerikleri DB'den
// =====================================================================

export const getBusinessModelPage = cache(async (slug: string) =>
  prisma.businessModelPage.findFirst({
    where: { slug, isPublished: true },
    include: {
      highlights: { orderBy: { sortOrder: "asc" } },
      useCases: { orderBy: { sortOrder: "asc" } },
      metrics: { orderBy: { sortOrder: "asc" } }
    }
  })
);

// =====================================================================
// FAZ 3 — Statik sayfalar + Footer + Job roles
// =====================================================================

export const getStaticPage = cache(async (slug: string) =>
  prisma.staticPage.findFirst({ where: { slug, isPublished: true } })
);

export const getJobRoles = cache(() =>
  prisma.jobRole.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
  })
);

export const getFooterLinks = cache(() =>
  prisma.footerLink.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
  })
);
