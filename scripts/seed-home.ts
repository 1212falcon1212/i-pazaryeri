/**
 * Seed homepage dynamic content from src/lib/homepage-copy.ts → DB.
 *
 * Run: npx tsx scripts/seed-home.ts
 *
 * - Idempotent: re-running won't break anything; existing rows are upserted.
 * - For SiteSetting hero/trust fields: only sets values if currently null/empty
 *   (so admin edits aren't overwritten on subsequent runs).
 */

import "dotenv/config";
import { prisma } from "../src/lib/db";

// ---- Source data (mirror of src/lib/homepage-copy.ts) ------------------

const homepageHero = {
  eyebrow: "B2B • B2C • C2C — Tek Altyapı",
  rotatingWords: ["Bayi portalı", "Online mağaza", "Pazaryeri"],
  titleLead: "İster",
  titleConnector: "için —",
  highlight: "ticaret altyapınız tek yerde.",
  description:
    "B2B bayi sipariş portalı, B2C e-ticaret mağazası, C2C çok satıcılı pazaryeri — ihtiyacınıza göre kurgulanan, ERP/kargo/ödeme/multichannel/affiliate/Google Shop entegrasyonlarına hazır altyapı.",
  primaryCta: "Teklif Al",
  secondaryCta: "Demo görmek istiyorum",
  checklist: [
    "B2B, B2C ve C2C — tek altyapıda",
    "ERP, kargo, ödeme, multichannel entegre",
    "Çalışan çekirdek + sektöre özel uyarlama"
  ]
};

const trustTags = ["Bayi ağı", "ERP", "Stok", "Cari", "Sipariş", "Katalog", "Ödeme", "Raporlama"];

const integrationsSummary = {
  title: "Yaygın ERP, kargo ve ödeme sağlayıcılarıyla hazır.",
  description:
    "Logo, Mikro, Netsis, Paraşüt, Sentos, Entegra, BizimHesap; Aras / Yurtiçi / MNG / Sürat / PTT / Hepsijet / Sendeo / Kolay Gelsin / Navlungo; Iyzico, PayTR. Özel ERP'ler için adapter geliştirilebilir."
};

const businessModelCards = [
  {
    slug: "b2b",
    badge: "B2B",
    title: "Bayi & Toptan Sipariş Portalı",
    description: "Bayi ağı olan markalar için davetli sipariş portalı. Çoklu fiyat listesi, cari hesap, ERP entegrasyonu, mobil uygulama.",
    bullets: ["Çoklu fiyat listesi & bayi grupları", "Açık hesap & vade yönetimi", "Sipariş onay akışları", "ERP & e-fatura"],
    href: "/b2b",
    color: "blue",
    image: "/uploads/home/model-b2b.webp",
    sortOrder: 1
  },
  {
    slug: "b2c",
    badge: "B2C",
    title: "Doğrudan Tüketiciye Satış",
    description: "Markanızın online satış kanalı. Ürün katalog, ödeme, kargo, SEO ve mobil deneyim; multichannel pazaryeri köprüsü.",
    bullets: ["Iyzico/PayTR ödeme & taksit", "Aras, Yurtiçi, Hepsijet, Sendeo", "Trendyol/Hepsiburada multichannel", "SEO & dönüşüm motoru"],
    href: "/b2c",
    color: "indigo",
    image: "/uploads/home/model-b2c.webp",
    sortOrder: 2
  },
  {
    slug: "c2c",
    badge: "C2C",
    title: "Çok Satıcılı Pazaryeri",
    description: "Trendyol/Hepsiburada tarzı multi-vendor altyapı. Satıcı paneli, komisyon, hakediş, KYC, escrow, yorum sistemi.",
    bullets: ["Satıcı kayıt & KYC", "Komisyon & hakediş", "Escrow ödeme", "Yorum, puan, anlaşmazlık yönetimi"],
    href: "/c2c",
    color: "amber",
    image: "/uploads/home/model-c2c.webp",
    sortOrder: 3
  }
];

const platformShowcase = [
  {
    slug: "admin",
    label: "Admin paneli",
    title: "Operasyonun her parçasını tek panelden yönetin.",
    description: "Sipariş, stok, kullanıcı, kampanya, kargo, fatura, raporlama — entegrasyon hataları dahil her şey tek merkezden izlenir.",
    image: "/uploads/home/platform-admin.webp",
    bullets: ["Real-time sipariş izleme", "Hızlı kampanya & fiyat yönetimi", "Entegrasyon health-check"],
    sortOrder: 1
  },
  {
    slug: "storefront",
    label: "Mağaza / vitrin",
    title: "Müşteri deneyimini öne çıkaran modern vitrin.",
    description: "B2B'de bayiye, B2C'de tüketiciye, C2C'de pazaryeri ziyaretçisine uygun şekilde yapılandırılan, hızlı ve SEO'ya uygun vitrin.",
    image: "/uploads/home/platform-storefront.webp",
    bullets: ["Hızlı sayfa açılışı (Core Web Vitals)", "Mobil-öncelikli tasarım", "Schema.org markup, SEO uyumu"],
    sortOrder: 2
  },
  {
    slug: "mobile",
    label: "Mobil uygulama",
    title: "iOS & Android — saha ekibi ve müşteri için.",
    description: "Bayi/saha ekibi siparişi yolda alır, müşteri push bildirim ile geri kazanılır. Native veya PWA — projenize göre seçilir.",
    image: "/uploads/home/platform-mobile.webp",
    bullets: ["Push bildirim & sepet hatırlatma", "Barkod ile hızlı ürün ekleme", "Offline-first sipariş taslakları"],
    sortOrder: 3
  }
];

const homeStats = [
  { value: "%70+", label: "Manuel sipariş işleme yükünde azalma", sortOrder: 1 },
  { value: "8-14 hafta", label: "Tipik canlıya geçiş süresi", sortOrder: 2 },
  { value: "30+", label: "Hazır entegrasyon konnektörü", sortOrder: 3 },
  { value: "iOS & Android", label: "Mobil uygulama deneyimi", sortOrder: 4 }
];

const integrationGroups = [
  {
    slug: "erp-muhasebe",
    title: "ERP & Muhasebe",
    sortOrder: 1,
    items: ["Logo Tiger 3", "Mikro Fly", "Netsis 9", "Paraşüt", "Sentos", "Entegra", "BizimHesap", "KolaySoft"]
  },
  {
    slug: "kargo",
    title: "Kargo",
    sortOrder: 2,
    items: ["Aras", "Yurtiçi", "MNG", "Sürat", "PTT", "Hepsijet", "Sendeo", "Kolay Gelsin", "Navlungo"]
  },
  {
    slug: "odeme-fatura",
    title: "Ödeme & Fatura",
    sortOrder: 3,
    items: ["Iyzico", "PayTR", "Logo eFatura", "Mikro eFatura", "Uyumsoft", "QNB FinansBank"]
  }
];

// ---- Seed logic --------------------------------------------------------

async function main() {
  console.log("→ Seeding homepage dynamic content…\n");

  // 1. SiteSetting — only fill if empty (preserve admin edits)
  const settings = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  if (!settings) {
    console.error("✗ SiteSetting singleton not found. Run main seed first.");
    process.exit(1);
  }

  const updateSettings: Record<string, string | null> = {};
  if (!settings.heroEyebrow) updateSettings.heroEyebrow = homepageHero.eyebrow;
  if (!settings.heroRotatingWords) updateSettings.heroRotatingWords = JSON.stringify(homepageHero.rotatingWords);
  if (!settings.heroTitleLead) updateSettings.heroTitleLead = homepageHero.titleLead;
  if (!settings.heroTitleConnector) updateSettings.heroTitleConnector = homepageHero.titleConnector;
  if (!settings.heroHighlight) updateSettings.heroHighlight = homepageHero.highlight;
  if (!settings.heroChecklist) updateSettings.heroChecklist = JSON.stringify(homepageHero.checklist);
  if (!settings.heroPrimaryCta) updateSettings.heroPrimaryCta = homepageHero.primaryCta;
  if (!settings.heroSecondaryCta) updateSettings.heroSecondaryCta = homepageHero.secondaryCta;
  if (!settings.trustTags) updateSettings.trustTags = JSON.stringify(trustTags);
  if (!settings.integrationsTitle) updateSettings.integrationsTitle = integrationsSummary.title;
  if (!settings.integrationsDesc) updateSettings.integrationsDesc = integrationsSummary.description;

  if (Object.keys(updateSettings).length > 0) {
    await prisma.siteSetting.update({ where: { id: "singleton" }, data: updateSettings });
    console.log(`✓ SiteSetting filled (${Object.keys(updateSettings).length} fields)`);
  } else {
    console.log("· SiteSetting fields already populated — skip");
  }

  // 2. BusinessModelCard
  for (const card of businessModelCards) {
    const data = {
      badge: card.badge,
      title: card.title,
      description: card.description,
      bullets: JSON.stringify(card.bullets),
      href: card.href,
      color: card.color,
      image: card.image,
      sortOrder: card.sortOrder,
      isPublished: true
    };
    await prisma.businessModelCard.upsert({
      where: { slug: card.slug },
      update: data,
      create: { slug: card.slug, ...data }
    });
    console.log(`✓ BusinessModelCard: ${card.slug}`);
  }

  // 3. PlatformShowcaseCard
  for (const card of platformShowcase) {
    const data = {
      label: card.label,
      title: card.title,
      description: card.description,
      image: card.image,
      bullets: JSON.stringify(card.bullets),
      sortOrder: card.sortOrder,
      isPublished: true
    };
    await prisma.platformShowcaseCard.upsert({
      where: { slug: card.slug },
      update: data,
      create: { slug: card.slug, ...data }
    });
    console.log(`✓ PlatformShowcaseCard: ${card.slug}`);
  }

  // 4. HomeStat — clear and re-insert (no unique key other than id)
  const existingStatsCount = await prisma.homeStat.count();
  if (existingStatsCount === 0) {
    await prisma.homeStat.createMany({ data: homeStats });
    console.log(`✓ HomeStat: inserted ${homeStats.length} rows`);
  } else {
    console.log(`· HomeStat: ${existingStatsCount} rows exist — skip`);
  }

  // 5. IntegrationGroup + Integration items
  for (const grp of integrationGroups) {
    const group = await prisma.integrationGroup.upsert({
      where: { slug: grp.slug },
      update: { title: grp.title, sortOrder: grp.sortOrder, isPublished: true },
      create: { slug: grp.slug, title: grp.title, sortOrder: grp.sortOrder, isPublished: true }
    });
    const existingItems = await prisma.integration.count({ where: { groupId: group.id } });
    if (existingItems === 0) {
      await prisma.integration.createMany({
        data: grp.items.map((name, i) => ({
          groupId: group.id,
          name,
          sortOrder: i + 1,
          isPublished: true
        }))
      });
      console.log(`✓ IntegrationGroup ${grp.slug}: ${grp.items.length} items`);
    } else {
      console.log(`· IntegrationGroup ${grp.slug}: ${existingItems} items exist — skip`);
    }
  }

  console.log("\n✅ Seed complete.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
