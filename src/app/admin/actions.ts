"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

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

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  await prisma.siteSetting.update({
    where: { id: "singleton" },
    data: {
      siteName: str(formData, "siteName"),
      logoText: str(formData, "logoText"),
      heroTitle: str(formData, "heroTitle"),
      heroDescription: str(formData, "heroDescription"),
      primaryCtaLabel: str(formData, "primaryCtaLabel"),
      primaryCtaHref: str(formData, "primaryCtaHref"),
      projectsTitle: str(formData, "projectsTitle"),
      projectsDescription: str(formData, "projectsDescription"),
      sectorsTitle: str(formData, "sectorsTitle"),
      sectorsDescription: str(formData, "sectorsDescription"),
      featuresTitle: str(formData, "featuresTitle"),
      featuresDescription: str(formData, "featuresDescription"),
      processTitle: str(formData, "processTitle"),
      processDescription: str(formData, "processDescription"),
      finalCtaTitle: str(formData, "finalCtaTitle"),
      finalCtaDescription: str(formData, "finalCtaDescription"),
      contactEmail: str(formData, "contactEmail"),
      contactPhone: str(formData, "contactPhone"),
      seoTitle: str(formData, "seoTitle"),
      seoDescription: str(formData, "seoDescription")
    }
  });
  revalidatePath("/");
  redirect("/admin/settings?saved=1");
}

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    category: str(formData, "category"),
    sector: str(formData, "sector"),
    status: str(formData, "status") || "Yayında",
    shortDesc: str(formData, "shortDesc"),
    content: str(formData, "content"),
    accent: str(formData, "accent") || "#0f8ea8",
    year: maybeNumber(formData, "year") || null,
    liveUrl: str(formData, "liveUrl"),
    isFeatured: bool(formData, "isFeatured"),
    isPublished: bool(formData, "isPublished"),
    sortOrder: maybeNumber(formData, "sortOrder"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription")
  };
  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });
  revalidatePath("/");
  redirect("/admin/projects?saved=1");
}

export async function saveFeature(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    icon: str(formData, "icon") || "Boxes",
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
    sortOrder: maybeNumber(formData, "sortOrder"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription")
  };
  if (id) await prisma.post.update({ where: { id }, data });
  else await prisma.post.create({ data });
  revalidatePath("/");
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
