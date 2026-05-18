"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function str(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function maybeNumber(formData: FormData, name: string) {
  const value = Number(str(formData, name));
  return Number.isFinite(value) ? value : 0;
}

function bool(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

export async function login(formData: FormData) {
  const password = str(formData, "password");
  if (password !== (process.env.ADMIN_PASSWORD ?? "admin123")) {
    redirect("/admin/login?error=1");
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}

function optional(formData: FormData, name: string) {
  const value = str(formData, name);
  return value.length === 0 ? null : value;
}

function revalidatePublicShell() {
  revalidatePath("/", "layout");
  for (const path of [
    "/",
    "/b2b",
    "/b2c",
    "/c2c",
    "/blog",
    "/entegrasyonlar",
    "/hakkimizda",
    "/kariyer",
    "/ozellikler",
    "/paketler",
    "/sektorler",
    "/sik-sorulan-sorular",
    "/teklif-al"
  ]) {
    revalidatePath(path);
  }
}

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  await prisma.siteSetting.update({
    where: { id: "singleton" },
    data: {
      siteName: str(formData, "siteName"),
      logoText: str(formData, "logoText"),
      heroTitle: str(formData, "heroTitle"),
      heroDescription: str(formData, "heroDescription"),
      heroBannerImage: optional(formData, "heroBannerImage"),
      heroBannerAlt: optional(formData, "heroBannerAlt"),
      heroOverlayTitle: optional(formData, "heroOverlayTitle"),
      heroOverlaySubtitle: optional(formData, "heroOverlaySubtitle"),
      heroOverlayCtaPrimaryLabel: optional(formData, "heroOverlayCtaPrimaryLabel"),
      heroOverlayCtaPrimaryHref: optional(formData, "heroOverlayCtaPrimaryHref"),
      heroOverlayCtaSecondaryLabel: optional(formData, "heroOverlayCtaSecondaryLabel"),
      heroOverlayCtaSecondaryHref: optional(formData, "heroOverlayCtaSecondaryHref"),
      primaryCtaLabel: str(formData, "primaryCtaLabel"),
      primaryCtaHref: str(formData, "primaryCtaHref"),
      projectsTitle: str(formData, "projectsTitle"),
      projectsTitleAccent: optional(formData, "projectsTitleAccent"),
      projectsDescription: str(formData, "projectsDescription"),
      sectorsTitle: str(formData, "sectorsTitle"),
      sectorsDescription: str(formData, "sectorsDescription"),
      featuresDescription: str(formData, "featuresDescription"),
      finalCtaTitle: str(formData, "finalCtaTitle"),
      finalCtaDescription: str(formData, "finalCtaDescription"),
      ctaNote: optional(formData, "ctaNote"),
      contactEmail: optional(formData, "contactEmail"),
      contactPhone: optional(formData, "contactPhone"),
      seoTitle: optional(formData, "seoTitle"),
      seoDescription: optional(formData, "seoDescription"),
      heroEyebrow: optional(formData, "heroEyebrow"),
      heroRotatingWords: optional(formData, "heroRotatingWords"),
      heroTitleLead: optional(formData, "heroTitleLead"),
      heroTitleConnector: optional(formData, "heroTitleConnector"),
      heroHighlight: optional(formData, "heroHighlight"),
      heroChecklist: optional(formData, "heroChecklist"),
      heroPrimaryCta: optional(formData, "heroPrimaryCta"),
      heroSecondaryCta: optional(formData, "heroSecondaryCta"),
      trustTags: optional(formData, "trustTags"),
      integrationsTitle: optional(formData, "integrationsTitle"),
      integrationsDesc: optional(formData, "integrationsDesc")
    }
  });
  revalidatePublicShell();
  redirect("/admin/settings?saved=1");
}

export async function uploadHeroBanner(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/settings?error=Dosya+seçilmedi");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    redirect("/admin/settings?error=Dosya+10MB%27dan+büyük+olamaz");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    redirect("/admin/settings?error=Sadece+jpg%2C+png%2C+webp%2C+gif+veya+svg+yüklenebilir");
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "") : "img";
  const filename = `banner-${Date.now()}.${ext || "img"}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  await prisma.siteSetting.update({
    where: { id: "singleton" },
    data: { heroBannerImage: `/uploads/${filename}` }
  });
  revalidatePath("/");
  redirect("/admin/settings?saved=1");
}

export async function clearHeroBanner() {
  await requireAdmin();
  await prisma.siteSetting.update({
    where: { id: "singleton" },
    data: { heroBannerImage: null }
  });
  revalidatePath("/");
  redirect("/admin/settings?saved=1");
}

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    quote: str(formData, "quote"),
    authorName: str(formData, "authorName"),
    authorRole: optional(formData, "authorRole"),
    authorMeta: optional(formData, "authorMeta"),
    rating: maybeNumber(formData, "rating") || 5,
    metric1Label: optional(formData, "metric1Label"),
    metric1Value: optional(formData, "metric1Value"),
    metric2Label: optional(formData, "metric2Label"),
    metric2Value: optional(formData, "metric2Value"),
    metric3Label: optional(formData, "metric3Label"),
    metric3Value: optional(formData, "metric3Value"),
    videoUrl: optional(formData, "videoUrl"),
    isFeatured: bool(formData, "isFeatured"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePath("/");
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/testimonials?deleted=1");
}

export async function saveHomeSectionItem(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    type: str(formData, "type"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    icon: optional(formData, "icon"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.homeSectionItem.update({ where: { id }, data });
  else await prisma.homeSectionItem.create({ data });
  revalidatePath("/");
  redirect("/admin/home?saved=1");
}

export async function deleteHomeSectionItem(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.homeSectionItem.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/home?deleted=1");
}

export async function saveSeoArticleSection(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    placement: str(formData, "placement") || "homepage-after-blog",
    eyebrow: optional(formData, "eyebrow"),
    title: str(formData, "title"),
    intro: str(formData, "intro"),
    tableOfContents: str(formData, "tableOfContents"),
    content: str(formData, "content"),
    ctaTitle: optional(formData, "ctaTitle"),
    ctaDescription: optional(formData, "ctaDescription"),
    ctaLabel: optional(formData, "ctaLabel"),
    ctaHref: optional(formData, "ctaHref"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.seoArticleSection.update({ where: { id }, data });
  else await prisma.seoArticleSection.create({ data });
  revalidatePath("/");
  redirect("/admin/seo-article?saved=1");
}

export async function deleteSeoArticleSection(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.seoArticleSection.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/seo-article?deleted=1");
}

export async function savePackage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    name: str(formData, "name"),
    tagline: str(formData, "tagline"),
    description: str(formData, "description"),
    audience: optional(formData, "audience"),
    priceLabel: optional(formData, "priceLabel"),
    price: optional(formData, "price"),
    pricePeriod: optional(formData, "pricePeriod"),
    priceNote: optional(formData, "priceNote"),
    ctaLabel: optional(formData, "ctaLabel"),
    ctaHref: optional(formData, "ctaHref"),
    isFeatured: bool(formData, "isFeatured"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.package.update({ where: { id }, data });
  else await prisma.package.create({ data });
  revalidatePath("/paketler");
  redirect("/admin/packages?saved=1");
}

export async function deletePackage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.package.delete({ where: { id } });
  revalidatePath("/paketler");
  redirect("/admin/packages?deleted=1");
}

export async function savePackageFeature(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    packageId: str(formData, "packageId"),
    label: str(formData, "label"),
    value: str(formData, "value"),
    group: str(formData, "group") || "Kapsam",
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.packageFeature.update({ where: { id }, data });
  else await prisma.packageFeature.create({ data });
  revalidatePath("/paketler");
  redirect("/admin/packages?saved=1");
}

export async function deletePackageFeature(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.packageFeature.delete({ where: { id } });
  revalidatePath("/paketler");
  redirect("/admin/packages?deleted=1");
}

export async function saveFaqCategory(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    description: optional(formData, "description"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.faqCategory.update({ where: { id }, data });
  else await prisma.faqCategory.create({ data });
  revalidatePath("/");
  revalidatePath("/sik-sorulan-sorular");
  redirect("/admin/faqs?saved=1");
}

export async function deleteFaqCategory(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.faqCategory.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/sik-sorulan-sorular");
  redirect("/admin/faqs?deleted=1");
}

export async function saveFaqItem(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    categoryId: str(formData, "categoryId"),
    question: str(formData, "question"),
    answer: str(formData, "answer"),
    isFeatured: bool(formData, "isFeatured"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.faqItem.update({ where: { id }, data });
  else await prisma.faqItem.create({ data });
  revalidatePath("/");
  revalidatePath("/sik-sorulan-sorular");
  redirect("/admin/faqs?saved=1");
}

export async function deleteFaqItem(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/sik-sorulan-sorular");
  redirect("/admin/faqs?deleted=1");
}

export async function saveOfferServiceOption(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    label: str(formData, "label"),
    value: str(formData, "value"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.offerServiceOption.update({ where: { id }, data });
  else await prisma.offerServiceOption.create({ data });
  revalidatePath("/teklif-al");
  redirect("/admin/offer-options?saved=1");
}

export async function deleteOfferServiceOption(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.offerServiceOption.delete({ where: { id } });
  revalidatePath("/teklif-al");
  redirect("/admin/offer-options?deleted=1");
}

export async function saveFeature(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    icon: str(formData, "icon") || "Boxes",
    category: str(formData, "category") || "Genel",
    visualType: str(formData, "visualType") || "icon",
    visualImage: optional(formData, "visualImage"),
    visualAccent: optional(formData, "visualAccent") ?? "#2563EB",
    shortDesc: str(formData, "shortDesc"),
    content: str(formData, "content"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription")
  };
  if (id) await prisma.feature.update({ where: { id }, data });
  else await prisma.feature.create({ data });
  revalidatePath("/");
  redirect("/admin/features?saved=1");
}

export async function saveSolutionCard(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    question: str(formData, "question"),
    answer: str(formData, "answer"),
    proof: optional(formData, "proof"),
    brands: optional(formData, "brands"),
    icon: optional(formData, "icon"),
    visualImage: optional(formData, "visualImage"),
    visualAccent: optional(formData, "visualAccent") ?? "#2563EB",
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.solutionCard.update({ where: { id }, data });
  else await prisma.solutionCard.create({ data });
  revalidatePath("/");
  redirect("/admin/solution-cards?saved=1");
}

export async function deleteSolutionCard(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.solutionCard.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/solution-cards?deleted=1");
}

export async function saveSector(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    shortDesc: str(formData, "shortDesc"),
    content: str(formData, "content"),
    accent: str(formData, "accent") || "#13a88b",
    isFeatured: bool(formData, "isFeatured"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription")
  };
  if (id) await prisma.sector.update({ where: { id }, data });
  else await prisma.sector.create({ data });
  revalidatePath("/");
  redirect("/admin/sectors?saved=1");
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    tag: str(formData, "tag") || "Rehber",
    isPublished: bool(formData, "isPublished"),
    isFeatured: bool(formData, "isFeatured"),
    sortOrder: maybeNumber(formData, "sortOrder"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription")
  };
  if (id) await prisma.post.update({ where: { id }, data });
  else await prisma.post.create({ data });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blog?saved=1");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blog?deleted=1");
}

export async function uploadPostImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const file = formData.get("file");
  if (!id) redirect("/admin/blog?error=Yazı+ID+yok");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/blog?error=Dosya+seçilmedi");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    redirect("/admin/blog?error=Dosya+10MB%27dan+büyük+olamaz");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    redirect("/admin/blog?error=Sadece+jpg%2C+png%2C+webp%2C+gif+veya+svg+yüklenebilir");
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) redirect("/admin/blog?error=Yazı+bulunamadı");

  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "") : "img";
  const filename = `${post.slug}-${Date.now()}.${ext || "img"}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  await prisma.post.update({
    where: { id },
    data: { coverImage: `/uploads/blog/${filename}` }
  });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blog?saved=1");
}

export async function clearPostImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) {
    await prisma.post.update({ where: { id }, data: { coverImage: null } });
  }
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blog?saved=1");
}

export async function updateOffer(formData: FormData) {
  await requireAdmin();
  await prisma.offerRequest.update({
    where: { id: str(formData, "id") },
    data: { status: str(formData, "status"), internalNote: str(formData, "internalNote"), isRead: true }
  });
  redirect("/admin/offers?saved=1");
}

// =====================================================================
// FAZ 1 — Anasayfa dynamic content actions
// =====================================================================

export async function saveBusinessModelCard(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    badge: str(formData, "badge"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    bullets: str(formData, "bullets"),
    href: str(formData, "href") || "/",
    color: str(formData, "color") || "blue",
    image: optional(formData, "image"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.businessModelCard.update({ where: { id }, data });
  else await prisma.businessModelCard.create({ data });
  revalidatePath("/");
  redirect("/admin/business-models?saved=1");
}

export async function deleteBusinessModelCard(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.businessModelCard.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/business-models?deleted=1");
}

export async function saveHomeStat(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    value: str(formData, "value"),
    label: str(formData, "label"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.homeStat.update({ where: { id }, data });
  else await prisma.homeStat.create({ data });
  revalidatePath("/");
  redirect("/admin/home-stats?saved=1");
}

export async function deleteHomeStat(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.homeStat.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/home-stats?deleted=1");
}

export async function savePlatformShowcaseCard(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    label: str(formData, "label"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    image: str(formData, "image"),
    bullets: str(formData, "bullets"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.platformShowcaseCard.update({ where: { id }, data });
  else await prisma.platformShowcaseCard.create({ data });
  revalidatePath("/");
  redirect("/admin/platform-showcase?saved=1");
}

export async function deletePlatformShowcaseCard(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.platformShowcaseCard.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/platform-showcase?deleted=1");
}

export async function saveIntegrationGroup(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    description: optional(formData, "description"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.integrationGroup.update({ where: { id }, data });
  else await prisma.integrationGroup.create({ data });
  revalidatePath("/");
  revalidatePath("/ozellikler");
  redirect("/admin/integrations?saved=1");
}

export async function deleteIntegrationGroup(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.integrationGroup.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/ozellikler");
  redirect("/admin/integrations?deleted=1");
}

export async function saveIntegration(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const groupId = str(formData, "groupId");
  if (!groupId) redirect("/admin/integrations?error=Grup+seçilmedi");
  const data = {
    groupId,
    name: str(formData, "name"),
    description: optional(formData, "description"),
    logo: optional(formData, "logo"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.integration.update({ where: { id }, data });
  else await prisma.integration.create({ data });
  revalidatePath("/");
  revalidatePath("/ozellikler");
  redirect("/admin/integrations?saved=1");
}

export async function deleteIntegration(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.integration.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/ozellikler");
  redirect("/admin/integrations?deleted=1");
}

// =====================================================================
// FAZ 2 — /b2b /b2c /c2c sayfa içerikleri actions
// =====================================================================

export async function saveBusinessModelPage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    badge: str(formData, "badge"),
    title: str(formData, "title"),
    highlight: str(formData, "highlight"),
    description: str(formData, "description"),
    primaryCtaLabel: str(formData, "primaryCtaLabel"),
    primaryCtaHref: str(formData, "primaryCtaHref"),
    audience: str(formData, "audience"),
    integrationsCopy: str(formData, "integrationsCopy"),
    ctaTitle: str(formData, "ctaTitle"),
    ctaDescription: str(formData, "ctaDescription"),
    isPublished: bool(formData, "isPublished")
  };
  if (id) await prisma.businessModelPage.update({ where: { id }, data });
  else await prisma.businessModelPage.create({ data });
  revalidatePath("/b2b");
  revalidatePath("/b2c");
  revalidatePath("/c2c");
  redirect(`/admin/business-pages/${data.slug}?saved=1`);
}

export async function saveBusinessModelHighlight(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const pageId = str(formData, "pageId");
  const slug = str(formData, "slug");
  if (!pageId) redirect("/admin/business-pages?error=Sayfa+seçilmedi");
  const data = {
    pageId,
    icon: str(formData, "icon"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.businessModelHighlight.update({ where: { id }, data });
  else await prisma.businessModelHighlight.create({ data });
  revalidatePath(`/${slug}`);
  redirect(`/admin/business-pages/${slug}?saved=1`);
}

export async function deleteBusinessModelHighlight(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const slug = str(formData, "slug");
  if (id) await prisma.businessModelHighlight.delete({ where: { id } });
  revalidatePath(`/${slug}`);
  redirect(`/admin/business-pages/${slug}?deleted=1`);
}

export async function saveBusinessModelUseCase(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const pageId = str(formData, "pageId");
  const slug = str(formData, "slug");
  if (!pageId) redirect("/admin/business-pages?error=Sayfa+seçilmedi");
  const data = {
    pageId,
    industry: str(formData, "industry"),
    scenario: str(formData, "scenario"),
    outcome: str(formData, "outcome"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.businessModelUseCase.update({ where: { id }, data });
  else await prisma.businessModelUseCase.create({ data });
  revalidatePath(`/${slug}`);
  redirect(`/admin/business-pages/${slug}?saved=1`);
}

export async function deleteBusinessModelUseCase(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const slug = str(formData, "slug");
  if (id) await prisma.businessModelUseCase.delete({ where: { id } });
  revalidatePath(`/${slug}`);
  redirect(`/admin/business-pages/${slug}?deleted=1`);
}

export async function saveBusinessModelMetric(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const pageId = str(formData, "pageId");
  const slug = str(formData, "slug");
  if (!pageId) redirect("/admin/business-pages?error=Sayfa+seçilmedi");
  const data = {
    pageId,
    value: str(formData, "value"),
    label: str(formData, "label"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.businessModelMetric.update({ where: { id }, data });
  else await prisma.businessModelMetric.create({ data });
  revalidatePath(`/${slug}`);
  redirect(`/admin/business-pages/${slug}?saved=1`);
}

export async function deleteBusinessModelMetric(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const slug = str(formData, "slug");
  if (id) await prisma.businessModelMetric.delete({ where: { id } });
  revalidatePath(`/${slug}`);
  redirect(`/admin/business-pages/${slug}?deleted=1`);
}

// =====================================================================
// FAZ 3 — Static pages, Job roles, Footer links actions
// =====================================================================

export async function saveStaticPage(formData: FormData) {
  await requireAdmin();
  const slug = str(formData, "slug");
  const data = {
    heroEyebrow: optional(formData, "heroEyebrow"),
    heroTitle: str(formData, "heroTitle"),
    heroHighlight: optional(formData, "heroHighlight"),
    heroDescription: str(formData, "heroDescription"),
    heroCtaLabel: optional(formData, "heroCtaLabel"),
    heroCtaHref: optional(formData, "heroCtaHref"),
    heroCtaSecondaryLabel: optional(formData, "heroCtaSecondaryLabel"),
    heroCtaSecondaryHref: optional(formData, "heroCtaSecondaryHref"),
    bodyTitle: optional(formData, "bodyTitle"),
    bodyContent: optional(formData, "bodyContent"),
    proofTitle: optional(formData, "proofTitle"),
    proofItems: optional(formData, "proofItems"),
    visualImage: optional(formData, "visualImage"),
    stats: optional(formData, "stats"),
    ctaEyebrow: optional(formData, "ctaEyebrow"),
    ctaTitle: optional(formData, "ctaTitle"),
    ctaDescription: optional(formData, "ctaDescription"),
    ctaLabel: optional(formData, "ctaLabel"),
    ctaHref: optional(formData, "ctaHref"),
    seoTitle: optional(formData, "seoTitle"),
    seoDescription: optional(formData, "seoDescription"),
    isPublished: bool(formData, "isPublished")
  };
  await prisma.staticPage.upsert({
    where: { slug },
    update: data,
    create: { slug, ...data }
  });
  revalidatePath(`/${slug}`);
  redirect(`/admin/static-pages/${slug}?saved=1`);
}

export async function saveJobRole(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    title: str(formData, "title"),
    icon: optional(formData, "icon"),
    description: str(formData, "description"),
    department: optional(formData, "department"),
    location: optional(formData, "location"),
    type: optional(formData, "type"),
    applyUrl: optional(formData, "applyUrl"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.jobRole.update({ where: { id }, data });
  else await prisma.jobRole.create({ data });
  revalidatePath("/kariyer");
  redirect("/admin/job-roles?saved=1");
}

export async function deleteJobRole(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.jobRole.delete({ where: { id } });
  revalidatePath("/kariyer");
  redirect("/admin/job-roles?deleted=1");
}

export async function saveFooterLink(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    groupSlug: str(formData, "groupSlug"),
    groupLabel: str(formData, "groupLabel"),
    label: str(formData, "label"),
    href: str(formData, "href"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder")
  };
  if (id) await prisma.footerLink.update({ where: { id }, data });
  else await prisma.footerLink.create({ data });
  revalidatePath("/");
  redirect("/admin/footer-links?saved=1");
}

export async function deleteFooterLink(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.footerLink.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/footer-links?deleted=1");
}

// =====================================================================
// Solution card image upload
// =====================================================================

export async function uploadSolutionCardImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const file = formData.get("file");
  if (!id) redirect("/admin/solution-cards?error=Kart+ID+yok");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/solution-cards?error=Dosya+seçilmedi");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    redirect("/admin/solution-cards?error=Dosya+10MB%27dan+büyük+olamaz");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    redirect("/admin/solution-cards?error=Sadece+jpg%2C+png%2C+webp%2C+gif+veya+svg+yüklenebilir");
  }

  const card = await prisma.solutionCard.findUnique({ where: { id } });
  if (!card) redirect("/admin/solution-cards?error=Kart+bulunamadı");

  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "") : "img";
  const filename = `${card.slug}-${Date.now()}.${ext || "img"}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "solutions");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  await prisma.solutionCard.update({
    where: { id },
    data: { visualImage: `/uploads/solutions/${filename}` }
  });
  revalidatePath("/");
  revalidatePath("/ozellikler");
  revalidatePath(`/ozellikler/${card.slug}`);
  redirect("/admin/solution-cards?saved=1");
}

export async function clearSolutionCardImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) {
    await prisma.solutionCard.update({ where: { id }, data: { visualImage: null } });
  }
  revalidatePath("/");
  revalidatePath("/ozellikler");
  redirect("/admin/solution-cards?saved=1");
}
