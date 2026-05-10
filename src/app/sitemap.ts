import type { MetadataRoute } from "next";
import { getPosts, getSolutionCards, getFaqCategories } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://i-pazaryeri.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, solutionCards, faqCategories] = await Promise.all([
    getPosts(),
    getSolutionCards(),
    getFaqCategories()
  ]);

  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/b2b`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/b2c`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/c2c`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/ozellikler`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/entegrasyonlar`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/paketler`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/hakkimizda`, lastModified: now, priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE_URL}/kariyer`, lastModified: now, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/sik-sorulan-sorular`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/teklif-al`, lastModified: now, priority: 0.9, changeFrequency: "yearly" }
  ];

  // Dynamic: blog posts
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.6,
    changeFrequency: "monthly"
  }));

  // Dynamic: feature/solution detail pages
  const featureRoutes: MetadataRoute.Sitemap = solutionCards.map((card) => ({
    url: `${BASE_URL}/ozellikler/${card.slug}`,
    lastModified: card.updatedAt,
    priority: 0.7,
    changeFrequency: "monthly"
  }));

  // FAQ category anchors (for SEO crawlers)
  const faqAnchors: MetadataRoute.Sitemap = faqCategories.map((cat) => ({
    url: `${BASE_URL}/sik-sorulan-sorular#${cat.slug}`,
    lastModified: cat.updatedAt,
    priority: 0.5,
    changeFrequency: "monthly"
  }));

  return [...staticRoutes, ...blogRoutes, ...featureRoutes, ...faqAnchors];
}
