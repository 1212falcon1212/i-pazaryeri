/**
 * Faz 3 seed: StaticPage (Hakkımızda, Kariyer) + JobRole + FooterLink + 80+ Integration items.
 *
 * Run: npx tsx scripts/seed-faz3.ts
 *
 * - StaticPage / FooterLink: idempotent upsert/skip-if-exists.
 * - JobRole / Integration items: only seeded if the table/section is empty.
 * - IntegrationGroup: updates icon field on existing Faz 1 groups + creates 7 new ones.
 */

import "dotenv/config";
import { prisma } from "../src/lib/db";

// ---- StaticPage data ---------------------------------------------------

const hakkimizda = {
  slug: "hakkimizda",
  heroEyebrow: "Hakkımızda",
  heroTitle: "Çalışan B2B sistemlerden",
  heroHighlight: "ürünleşmiş pazaryeri altyapısına.",
  heroDescription:
    "i-Pazaryeri, bayi ağı olan şirketlerin ürün, fiyat, stok, sipariş, ERP, kargo ve ödeme süreçlerini tek dijital altyapıda yönetebilmesi için geliştirilen B2B pazaryeri yazılımıdır.",
  heroCtaLabel: "Projenizi konuşalım",
  heroCtaHref: "/teklif-al",
  heroCtaSecondaryLabel: "Özelliklere bak",
  heroCtaSecondaryHref: "/ozellikler",
  bodyTitle: "Biz ne yapıyoruz?",
  bodyContent: [
    "B2B pazaryeri kurmak isteyen işletmelerin en büyük problemi yalnızca web sitesi tasarımı değildir. Bayi fiyatları, cari yapı, stok görünürlüğü, sipariş onayları, ERP senkronizasyonu, kargo takibi, ödeme ve komisyon akışları aynı anda doğru çalışmalıdır.",
    "i-Pazaryeri bu operasyonu hazır bir çekirdek üzerinden sektörünüze uyarlamak için geliştirilmiştir. Yıllar içinde geliştirdiğimiz çekirdek backend yaklaşımı; farklı sektörlerin bayi, tedarikçi, doğrulama ve entegrasyon ihtiyaçlarını tek mimari disiplin altında ele alır. Bu sayede sıfırdan yazılım riskini azaltırken özel iş kurallarınızı koruyan bir yapı kurabiliriz.",
    "## Yaklaşımımız",
    "Hibrit model: hazır çekirdek + sektörel uyarlama. Faz 1'de çekirdek modüller (sipariş, cari, ürün, fiyat) canlıya alınır. Faz 2'de kampanya, mobil ve entegrasyonlar açılır. Faz 3'te ileri otomasyon ve özel raporlama tamamlanır. Operasyonu durdurmadan kademeli ilerleme."
  ].join("\n\n"),
  proofTitle: "Altyapı odağımız",
  proofItems: JSON.stringify([
    "Laravel 12, React ve Filament tabanlı çalışan altyapı",
    "ERP, kargo, ödeme, bildirim ve admin panel süreçleri",
    "Bayi, satıcı, tedarikçi ve kurumsal alıcı rollerine uyarlanabilir yapı",
    "iOS & Android mobil uygulamalar, push bildirim, barkod okuma",
    "KVKK uyumlu, rol bazlı yetki, denetim logları"
  ]),
  visualImage: "/uploads/hero-marketplace-forest-copper-v2.png",
  stats: JSON.stringify([
    { value: "3+", label: "çalışan sistem ailesi" },
    { value: "30+", label: "hazır entegrasyon" },
    { value: "9", label: "kargo sağlayıcısı" },
    { value: "8-14 hafta", label: "tipik canlıya geçiş" }
  ]),
  ctaEyebrow: "Birlikte planlayalım",
  ctaTitle: "Sektörünüze özel B2B pazaryerini birlikte konuşalım.",
  ctaDescription:
    "30 dakikalık ücretsiz analiz görüşmesinde modülleri, entegrasyonları ve canlıya geçiş planını birlikte ele alalım.",
  ctaLabel: "Bizimle iletişime geç",
  ctaHref: "/teklif-al",
  seoTitle: "Hakkımızda | i-Pazaryeri B2B Pazaryeri Yazılımı",
  seoDescription:
    "i-Pazaryeri, B2B pazaryeri yazılımı geliştirme deneyimini paketlenmiş, sektörünüze uyarlanabilir bir altyapıya dönüştürür."
};

const kariyer = {
  slug: "kariyer",
  heroEyebrow: "Kariyer",
  heroTitle: "Gerçek ticaret altyapıları üzerinde",
  heroHighlight: "birlikte çalışalım.",
  heroDescription:
    "i-Pazaryeri; ERP, kargo, ödeme, admin panel ve bayi sipariş süreçlerini bir araya getiren ürün ekibidir. Pazarlama yazılımı değil; canlıda çalışan ticaret operasyonu inşa ediyoruz.",
  heroCtaLabel: null,
  heroCtaHref: null,
  heroCtaSecondaryLabel: null,
  heroCtaSecondaryHref: null,
  bodyTitle: null,
  bodyContent: null,
  proofTitle: null,
  proofItems: null,
  visualImage: null,
  stats: null,
  ctaEyebrow: "Açık başvuru",
  ctaTitle: "Açık pozisyon olmasa bile tanışabiliriz.",
  ctaDescription:
    "B2B, pazaryeri, Laravel, React, entegrasyon veya ürün operasyonu tarafında deneyiminiz varsa bizimle iletişime geçin.",
  ctaLabel: "İletişime geç",
  ctaHref: "/teklif-al",
  seoTitle: "Kariyer | i-Pazaryeri",
  seoDescription:
    "B2B pazaryeri yazılımı, ERP entegrasyonu, admin panel ve dijital ticaret altyapıları geliştiren ekibimize katılın."
};

// ---- JobRole data ------------------------------------------------------

const jobRoles = [
  { title: "Backend Geliştirme", icon: "Code2", description: "Laravel, API, ERP, ödeme ve kargo entegrasyonları", department: "Engineering", sortOrder: 1 },
  { title: "Frontend Geliştirme", icon: "PanelTop", description: "React, Next.js ve yönetilebilir pazaryeri arayüzleri", department: "Engineering", sortOrder: 2 },
  { title: "Veri ve Entegrasyon", icon: "Database", description: "Ürün, stok, sipariş, fatura ve senkronizasyon süreçleri", department: "Engineering", sortOrder: 3 },
  { title: "Proje ve Operasyon", icon: "Plug", description: "Bayi, satıcı, admin panel ve canlıya geçiş süreçleri", department: "Operations", sortOrder: 4 }
];

// ---- FooterLink data ---------------------------------------------------

const footerLinks: Array<{ groupSlug: string; groupLabel: string; label: string; href: string; sortOrder: number }> = [
  // Çözümler
  { groupSlug: "solutions", groupLabel: "Çözümler", label: "B2B Pazaryeri", href: "/b2b", sortOrder: 1 },
  { groupSlug: "solutions", groupLabel: "Çözümler", label: "B2C E-Ticaret", href: "/b2c", sortOrder: 2 },
  { groupSlug: "solutions", groupLabel: "Çözümler", label: "C2C / Multi-Vendor", href: "/c2c", sortOrder: 3 },
  { groupSlug: "solutions", groupLabel: "Çözümler", label: "Tüm özellikler", href: "/ozellikler", sortOrder: 4 },
  { groupSlug: "solutions", groupLabel: "Çözümler", label: "Paketler", href: "/paketler", sortOrder: 5 },
  // Entegrasyonlar
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "ERP & Muhasebe", href: "/entegrasyonlar#erp-muhasebe", sortOrder: 1 },
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "e-Fatura & e-Arşiv", href: "/entegrasyonlar#e-fatura", sortOrder: 2 },
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "Kargo & Lojistik", href: "/entegrasyonlar#kargo", sortOrder: 3 },
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "Ödeme & Cüzdan", href: "/entegrasyonlar#odeme", sortOrder: 4 },
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "Pazaryeri & Multichannel", href: "/entegrasyonlar#pazaryeri", sortOrder: 5 },
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "Sosyal Medya", href: "/entegrasyonlar#sosyal-medya", sortOrder: 6 },
  { groupSlug: "integrations", groupLabel: "Entegrasyonlar", label: "Tüm entegrasyonlar", href: "/entegrasyonlar", sortOrder: 7 },
  // Rehberler
  { groupSlug: "guides", groupLabel: "Rehberler", label: "B2B pazaryeri yazılımı nedir?", href: "/blog/b2b-pazaryeri-yazilimi-nedir", sortOrder: 1 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "B2C e-ticaret yazılımı nedir?", href: "/blog/b2c-eticaret-yazilimi-nedir", sortOrder: 2 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "C2C pazaryeri nedir?", href: "/blog/c2c-pazaryeri-nedir-trendyol-modeli", sortOrder: 3 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "ERP entegrasyonu rehberi", href: "/blog/erp-muhasebe-entegrasyonu-detayli-rehber", sortOrder: 4 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "Multichannel e-ticaret", href: "/blog/multichannel-eticaret-pazaryerlerine-entegrasyon", sortOrder: 5 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "Google Shopping feed", href: "/blog/google-shopping-feed-optimizasyonu", sortOrder: 6 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "Mobil sipariş uygulaması", href: "/blog/b2b-mobil-siparis-uygulamasi", sortOrder: 7 },
  { groupSlug: "guides", groupLabel: "Rehberler", label: "Tüm yazılar", href: "/blog", sortOrder: 8 },
  // Şirket
  { groupSlug: "company", groupLabel: "Şirket", label: "Hakkımızda", href: "/hakkimizda", sortOrder: 1 },
  { groupSlug: "company", groupLabel: "Şirket", label: "Kariyer", href: "/kariyer", sortOrder: 2 },
  { groupSlug: "company", groupLabel: "Şirket", label: "İletişim", href: "/teklif-al", sortOrder: 3 },
  { groupSlug: "company", groupLabel: "Şirket", label: "Sık Sorulan Sorular", href: "/sik-sorulan-sorular", sortOrder: 4 },
  // Yasal
  { groupSlug: "legal", groupLabel: "Yasal", label: "Gizlilik Politikası", href: "/sik-sorulan-sorular#gizlilik", sortOrder: 1 },
  { groupSlug: "legal", groupLabel: "Yasal", label: "Kullanım Sözleşmesi", href: "/sik-sorulan-sorular#kullanim", sortOrder: 2 },
  { groupSlug: "legal", groupLabel: "Yasal", label: "KVKK Aydınlatma Metni", href: "/sik-sorulan-sorular#kvkk", sortOrder: 3 },
  { groupSlug: "legal", groupLabel: "Yasal", label: "Çerez Politikası", href: "/sik-sorulan-sorular#cerez", sortOrder: 4 }
];

// ---- IntegrationGroup data (Faz 1'i extend ediyor + 7 yeni grup) -------

const integrationGroups: Array<{
  slug: string; title: string; icon: string; description: string;
  items: Array<{ name: string; description?: string }>;
}> = [
  {
    slug: "erp-muhasebe",
    title: "ERP & Muhasebe",
    icon: "Cable",
    description: "Ürün, stok, cari, sipariş ve fatura senkronizasyonu için yerinde ve bulut ERP/muhasebe sağlayıcılarıyla iki yönlü entegrasyon.",
    items: [
      { name: "Logo Tiger 3", description: "Yerinde ERP, ürün/stok/cari/sipariş/fatura senkronu" },
      { name: "Mikro Fly", description: "Yerinde ERP, periyodik ve webhook tabanlı senkron" },
      { name: "Netsis 9.0", description: "Yerinde ERP, kapsamlı operasyon entegrasyonu" },
      { name: "Paraşüt", description: "Bulut muhasebe — KOBİ ve start-up'lar için" },
      { name: "BizimHesap", description: "Bulut muhasebe ve fatura akışı" },
      { name: "Sentos", description: "E-ticaret odaklı bulut ERP" },
      { name: "Entegra", description: "Çoklu pazaryeri & ERP köprüsü" },
      { name: "KolaySoft", description: "Mali entegrasyon ve ön muhasebe" },
      { name: "StockMount", description: "Stok ve sipariş yönetimi" },
      { name: "Dopigo", description: "Pazaryeri ve XML entegrasyon platformu" }
    ]
  },
  {
    slug: "e-fatura",
    title: "e-Fatura & e-Arşiv",
    icon: "FileCheck",
    description: "GIB onaylı entegratörlerle otomatik e-fatura ve e-arşiv kesim, satıcı bazlı vergi konfigürasyonu.",
    items: [
      { name: "Logo eFatura" },
      { name: "Mikro eFatura" },
      { name: "Uyumsoft" },
      { name: "QNB FinansBank" },
      { name: "Foriba (Sovos)" },
      { name: "Nilvera" },
      { name: "Edm" },
      { name: "Turkcell e-Şirket" }
    ]
  },
  {
    slug: "kargo",
    title: "Kargo & Lojistik",
    icon: "Truck",
    description: "Sepet aşamasında fiyat hesaplama, gönderi oluşturma, etiket basımı, takip ve iade. Çoklu sağlayıcı + akıllı yönlendirme.",
    items: [
      { name: "Aras Kargo" }, { name: "Yurtiçi Kargo" }, { name: "MNG Kargo" },
      { name: "Sürat Kargo" }, { name: "PTT Kargo" }, { name: "Hepsijet" },
      { name: "Sendeo" }, { name: "Kolay Gelsin" }, { name: "Navlungo" },
      { name: "DHL eCommerce" }, { name: "UPS" }, { name: "Trendyol Express" }
    ]
  },
  {
    slug: "odeme-fatura",  // Faz 1'den var, isim aynı tutuldu
    title: "Ödeme & Cüzdan",
    icon: "WalletCards",
    description: "36 banka taksit, anında havale, kapıda ödeme, cüzdan, mağaza kredisi, marketplace satıcı transferi ve hakediş yönetimi.",
    items: [
      { name: "Iyzico" }, { name: "PayTR" }, { name: "BKM Express" },
      { name: "Param POS" }, { name: "Param Marketplace" }, { name: "iyzico Marketplace" },
      { name: "Stripe (uluslararası)" }, { name: "PayPal (uluslararası)" }
    ]
  },
  {
    slug: "pazaryeri",
    title: "Pazaryeri & Multichannel",
    icon: "LayoutDashboard",
    description: "Tek katalog ile çoklu pazaryerine satış. Otomatik ürün listeleme, fiyat ve stok senkronu, sipariş çekme, iade akışı.",
    items: [
      { name: "Trendyol" }, { name: "Hepsiburada" }, { name: "n11" },
      { name: "GittiGidiyor" }, { name: "Amazon TR" }, { name: "Amazon Global" },
      { name: "Pazarama" }, { name: "PttAvm" }, { name: "Çiçeksepeti" },
      { name: "Etsy" }, { name: "eBay" }
    ]
  },
  {
    slug: "sosyal-medya",
    title: "Sosyal & Reklam Kanalları",
    icon: "MessagesSquare",
    description: "Sosyal medyada satış, reklam dönüşüm takibi, ürün katalog feed'i ve dinamik remarketing.",
    items: [
      { name: "Google Shopping" }, { name: "Google Merchant Center" },
      { name: "Meta (Facebook & Instagram) Shop" }, { name: "TikTok Shop" },
      { name: "Pinterest Shopping" }, { name: "YouTube Shopping" },
      { name: "Google Ads dönüşüm" }, { name: "Meta Pixel" }, { name: "TikTok Pixel" }
    ]
  },
  {
    slug: "iletisim-bildirim",
    title: "İletişim & Bildirim",
    icon: "MessagesSquare",
    description: "Sipariş onayı, kargo bildirimi, kampanya, sepet bırakma, doğum günü ve segment bazlı pazarlama otomasyonu.",
    items: [
      { name: "İleti Merkezi (SMS)" }, { name: "NetGSM (SMS)" }, { name: "Iletimerkezi" },
      { name: "Mailchimp" }, { name: "SendGrid" }, { name: "Mailgun" },
      { name: "Twilio (SMS & WhatsApp)" }, { name: "Firebase Cloud Messaging (push)" },
      { name: "OneSignal (push)" }
    ]
  },
  {
    slug: "analitik",
    title: "Analitik & Optimizasyon",
    icon: "Search",
    description: "Web analitik, ısı haritası, dönüşüm hunisi, A/B test, müşteri davranış izleme.",
    items: [
      { name: "Google Analytics 4" }, { name: "Google Tag Manager" }, { name: "Hotjar" },
      { name: "Mixpanel" }, { name: "Amplitude" }, { name: "Microsoft Clarity" },
      { name: "Sentry (hata izleme)" }, { name: "Meilisearch (arama)" }
    ]
  },
  {
    slug: "affiliate-influencer",
    title: "Affiliate & Influencer",
    icon: "Users",
    description: "Referans satışı, influencer komisyonu, kupon kodu yönetimi ve dönüşüm bazlı ödeme.",
    items: [
      { name: "Affiliate panel (özel geliştirme)" },
      { name: "Influencer kupon kodu yönetimi" },
      { name: "Referans linki & cookie tracking" },
      { name: "Komisyon hesaplama & raporlama" },
      { name: "Otomatik payout (banka transferi)" }
    ]
  },
  {
    slug: "guvenlik-kvkk",
    title: "Güvenlik & KVKK",
    icon: "ShieldCheck",
    description: "Veri güvenliği, kimlik doğrulama, KVKK uyumu için kullanılan altyapı bileşenleri.",
    items: [
      { name: "Cloudflare WAF & DDoS" }, { name: "Let's Encrypt SSL" },
      { name: "Vault / Bitwarden secret management" }, { name: "Google reCAPTCHA" },
      { name: "İki faktörlü kimlik doğrulama" }, { name: "KVKK aydınlatma metni & açık rıza" }
    ]
  }
];

async function main() {
  console.log("→ Faz 3 seed başlıyor…\n");

  // 1. StaticPage
  for (const page of [hakkimizda, kariyer]) {
    const { slug, ...data } = page;
    await prisma.staticPage.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data }
    });
    console.log(`✓ StaticPage: ${slug}`);
  }

  // 2. JobRole — only seed if empty
  const jobsCount = await prisma.jobRole.count();
  if (jobsCount === 0) {
    await prisma.jobRole.createMany({ data: jobRoles });
    console.log(`✓ JobRole: ${jobRoles.length} rows`);
  } else {
    console.log(`· JobRole: ${jobsCount} rows exist — skip`);
  }

  // 3. FooterLink — only seed if empty
  const footerCount = await prisma.footerLink.count();
  if (footerCount === 0) {
    await prisma.footerLink.createMany({ data: footerLinks });
    console.log(`✓ FooterLink: ${footerLinks.length} rows across ${new Set(footerLinks.map((l) => l.groupSlug)).size} groups`);
  } else {
    console.log(`· FooterLink: ${footerCount} rows exist — skip`);
  }

  // 4. IntegrationGroup + Integration items (Faz 1'de bazıları var, eksikleri ekle, item'ları doldur)
  for (const grp of integrationGroups) {
    const existing = await prisma.integrationGroup.findUnique({ where: { slug: grp.slug } });
    const data = {
      title: grp.title,
      icon: grp.icon,
      description: grp.description,
      isPublished: true,
      sortOrder: integrationGroups.indexOf(grp) + 1
    };
    const group = existing
      ? await prisma.integrationGroup.update({ where: { slug: grp.slug }, data })
      : await prisma.integrationGroup.create({ data: { slug: grp.slug, ...data } });

    const itemCount = await prisma.integration.count({ where: { groupId: group.id } });
    if (itemCount === 0) {
      await prisma.integration.createMany({
        data: grp.items.map((it, i) => ({
          groupId: group.id,
          name: it.name,
          description: it.description ?? null,
          sortOrder: i + 1,
          isPublished: true
        }))
      });
      console.log(`✓ Integration ${grp.slug}: ${grp.items.length} items`);
    } else if (itemCount < grp.items.length) {
      // Existing items — ensure descriptions are filled if newly added in source
      const existingItems = await prisma.integration.findMany({ where: { groupId: group.id } });
      const existingNames = new Set(existingItems.map((i) => i.name));
      const newOnes = grp.items.filter((i) => !existingNames.has(i.name));
      if (newOnes.length > 0) {
        await prisma.integration.createMany({
          data: newOnes.map((it, i) => ({
            groupId: group.id,
            name: it.name,
            description: it.description ?? null,
            sortOrder: existingItems.length + i + 1,
            isPublished: true
          }))
        });
        console.log(`✓ Integration ${grp.slug}: +${newOnes.length} new items (had ${itemCount})`);
      } else {
        console.log(`· Integration ${grp.slug}: ${itemCount} items already exist — skip`);
      }
    } else {
      console.log(`· Integration ${grp.slug}: ${itemCount} items exist — skip`);
    }
  }

  console.log("\n✅ Faz 3 seed complete.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
