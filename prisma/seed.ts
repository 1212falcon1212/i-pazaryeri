import { prisma } from "../src/lib/db";

const projects = [
  {
    slug: "i-depo",
    title: "i-Depo",
    category: "B2B Pazaryeri",
    sector: "Dermokozmetik / Eczane",
    status: "Yayında",
    shortDesc: "Kapalı B2B dermokozmetik pazaryeri. Distribütör ve eczane arasında davetli sipariş akışı.",
    content: "i-Depo, dermokozmetik ürünlerin B2B sipariş, stok ve tedarik süreçlerini tek platformda toplamak için kurgulanan pazaryeri örneğidir.",
    accent: "#0f8ea8",
    year: 2023,
    isFeatured: true,
    sortOrder: 1,
    seoTitle: "i-Depo B2B Pazaryeri",
    seoDescription: "Dermokozmetik ve eczane odağında kapalı B2B pazaryeri örneği."
  },
  {
    slug: "i-eczane",
    title: "i-Eczane",
    category: "Pazaryeri",
    sector: "Eczane",
    status: "Yayında",
    shortDesc: "Eczacılar için doğrudan stok, sipariş ve iade akışı sunan pazaryeri.",
    content: "i-Eczane, eczacıların ürün tedarikini, sipariş akışını ve marka iletişimini dijital ortamda yönetmesine odaklanan pazaryeri yapısıdır.",
    accent: "#1d4ed8",
    year: 2023,
    isFeatured: true,
    sortOrder: 2,
    seoTitle: "i-Eczane Pazaryeri",
    seoDescription: "Eczacılar için doğrudan pazaryeri ve sipariş akışı örneği."
  },
  {
    slug: "i-hirdavat",
    title: "i-Hırdavat",
    category: "B2B",
    sector: "Hırdavat / Nalbur",
    status: "Yayında",
    shortDesc: "Hırdavat sektörü için toptancı-bayi arası kalem bazlı sipariş ve cari yönetim akışı.",
    content: "i-Hırdavat, geniş ürün ağacı ve bayi sipariş süreçleri olan hırdavat firmaları için B2B ticaret altyapısının nasıl çalışabileceğini gösterir.",
    accent: "#f59e0b",
    year: 2024,
    isFeatured: true,
    sortOrder: 3,
    seoTitle: "i-Hırdavat B2B Altyapısı",
    seoDescription: "Hırdavat ve nalbur sektörü için B2B pazaryeri örneği."
  },
  {
    slug: "i-bijuteri",
    title: "i-Bijuteri",
    category: "B2B",
    sector: "Bijuteri / Aksesuar",
    status: "Yayında",
    shortDesc: "Bijuteri üreticileri ve perakendeciler arasında koli bazlı B2B sipariş akışı.",
    content: "i-Bijuteri, aksesuar ve bijuteri kategorilerinde ürün varyantları, minimum sipariş ve bayi yönetimi gibi ihtiyaçlara uygun örnek bir B2B yapıdır.",
    accent: "#e11d48",
    year: 2024,
    isFeatured: true,
    sortOrder: 4,
    seoTitle: "i-Bijuteri B2B Pazaryeri",
    seoDescription: "Bijuteri ve aksesuar sektörü için B2B pazaryeri örneği."
  }
];

const sectors = [
  ["dermokozmetik-eczane", "Dermokozmetik / Eczane", "Eczane, dermokozmetik marka ve distribütörleri için kontrollü B2B sipariş deneyimi.", "#0f8ea8"],
  ["hirdavat-nalbur", "Hırdavat / Nalbur", "Geniş ürün katalogları, bayi fiyat listeleri ve stok odaklı sipariş yönetimi.", "#f59e0b"],
  ["bijuteri-aksesuar", "Bijuteri / Aksesuar", "Varyant, koli, minimum sipariş ve perakendeci ağı olan aksesuar markaları için.", "#e11d48"],
  ["kirtasiye-ofis", "Kırtasiye / Ofis ürünleri", "Kurumsal alıcı, bayi ve toptancı siparişlerini tek panelden yönetmek için.", "#2563eb"],
  ["toptan-ticaret", "Toptan ticaret / Distribütörlük", "Tekrarlı sipariş, cari hesap ve bayi fiyat listeleriyle çalışan ticaret ağları için.", "#16a34a"],
  ["bayi-agi", "Bayi ağı olan markalar", "Bayi portalı, teklif, sipariş ve tahsilat akışlarını dijitalleştirmek isteyen markalar için.", "#7c3aed"]
];

const features = [
  ["bayi-uye-yonetimi", "Bayi / Üye Yönetimi", "Users", "Bayi, tedarikçi ve kurumsal alıcıları rollere göre yönetin."],
  ["urun-katalog", "Ürün ve Katalog", "Boxes", "Kategori, marka, varyant ve ürün detaylarını düzenli yayınlayın."],
  ["fiyat-listeleri", "Fiyat Listeleri", "BadgePercent", "Bayiye, gruba veya sektöre özel fiyat ve iskonto kurgulayın."],
  ["teklif-siparis", "Teklif ve Sipariş", "FileCheck", "Teklif, sepet, sipariş onayı ve tekrar sipariş akışlarını yönetin."],
  ["cari-stok", "Cari ve Stok", "Database", "Cari hesap, stok görünürlüğü ve operasyon takiplerini merkezileştirin."],
  ["entegrasyon", "ERP Entegrasyonları", "Cable", "ERP, muhasebe, ödeme ve kargo sistemleriyle entegre ilerleyin."]
];

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "i-Pazaryeri",
      logoText: "i-Pazaryeri",
      heroTitle: "B2B pazaryerinizi güçlü bir altyapıyla kurun",
      heroDescription:
        "Bayi, tedarikçi ve kurumsal alıcı ağlarını tek platformda yöneten, sektöre uyarlanabilir pazaryeri altyapısı.",
      primaryCtaLabel: "Teklif Al",
      primaryCtaHref: "/teklif-al",
      projectsTitle: "Gerçek projelerden gelen pazaryeri deneyimi",
      projectsDescription:
        "i-Grup bünyesindeki B2B ve pazaryeri projeleri, farklı sektörlerde kurulabilecek yapının pratik karşılığını gösterir.",
      sectorsTitle: "Sektöre göre uyarlanabilir altyapı",
      sectorsDescription:
        "Dermokozmetikten hırdavata, bayi ağı olan markalardan toptan ticarete kadar farklı iş modelleri için kurgulanabilir.",
      featuresTitle: "B2B ticaretin temel modülleri",
      featuresDescription:
        "Sipariş, teklif, cari, stok, fiyat listesi ve entegrasyon ihtiyaçlarını tek yönetim yapısında toplar.",
      processTitle: "Kurulum süreci sade ve kontrollü ilerler",
      processDescription:
        "İhtiyaç analizi, sektör uyarlaması, veri hazırlığı, yayın ve iyileştirme adımlarıyla pazaryeri canlıya alınır.",
      finalCtaTitle: "Pazaryeri fikrinizi birlikte netleştirelim",
      finalCtaDescription:
        "Sektörünüzü, bayi/tedarikçi yapınızı ve ihtiyaç duyduğunuz modülleri paylaşın; size uygun kurguyu çıkaralım.",
      contactEmail: "info@i-pazaryeri.com",
      contactPhone: "+90 850 000 00 00",
      seoTitle: "i-Pazaryeri | B2B Pazaryeri Altyapısı",
      seoDescription: "Bayi, tedarikçi ve kurumsal alıcı ağları için sektöre uyarlanabilir B2B pazaryeri altyapısı."
    }
  });

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }

  for (const [slug, title, shortDesc, accent] of sectors) {
    await prisma.sector.upsert({
      where: { slug },
      update: { title, shortDesc, content: shortDesc, accent, isFeatured: true },
      create: { slug, title, shortDesc, content: shortDesc, accent, isFeatured: true }
    });
  }

  for (const [index, feature] of features.entries()) {
    const [slug, title, icon, shortDesc] = feature;
    await prisma.feature.upsert({
      where: { slug },
      update: { title, icon, shortDesc, content: shortDesc, sortOrder: index + 1 },
      create: { slug, title, icon, shortDesc, content: shortDesc, sortOrder: index + 1 }
    });
  }

  await prisma.post.upsert({
    where: { slug: "b2b-pazaryeri-nasil-kurulur" },
    update: {},
    create: {
      slug: "b2b-pazaryeri-nasil-kurulur",
      title: "B2B pazaryeri nasıl kurulur?",
      excerpt: "Bayi, tedarikçi ve kurumsal alıcı ağlarını dijitalleştirmek için temel adımlar.",
      content:
        "B2B pazaryeri kurulumunda önce iş modeli, kullanıcı rolleri, fiyat listeleri, sipariş akışı ve entegrasyon ihtiyaçları netleştirilir.",
      tag: "Rehber",
      sortOrder: 1,
      seoTitle: "B2B Pazaryeri Nasıl Kurulur?",
      seoDescription: "B2B pazaryeri kurmak isteyen firmalar için temel kurulum rehberi."
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

