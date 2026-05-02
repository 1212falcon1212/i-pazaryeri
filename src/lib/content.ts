import { cache } from "react";
import { prisma } from "./db";

export const getSettings = cache(async () => {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });

  if (!settings) {
    throw new Error("Site settings are not seeded.");
  }

  return settings;
});

export const getFeaturedProjects = cache(() =>
  prisma.project.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  })
);

export const getProjects = cache(() =>
  prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  })
);

export const getProject = cache((slug: string) =>
  prisma.project.findFirst({ where: { slug, isPublished: true } })
);

export const getFeatures = cache(() =>
  prisma.feature.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  })
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
