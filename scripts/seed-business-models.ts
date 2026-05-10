/**
 * Seed B2B/B2C/C2C model pages from src/lib/business-models.ts → DB.
 * Run: npx tsx scripts/seed-business-models.ts
 *
 * - Idempotent on the page itself (upsert by slug).
 * - Highlights/useCases/metrics: only seeded if the page has none yet (so
 *   admin edits aren't overwritten on subsequent runs).
 */

import "dotenv/config";
import { prisma } from "../src/lib/db";

type Highlight = { icon: string; title: string; description: string };
type UseCase = { industry: string; scenario: string; outcome: string };
type Metric = { value: string; label: string };

type ModelData = {
  slug: "b2b" | "b2c" | "c2c";
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  audience: string[];
  highlights: Highlight[];
  useCases: UseCase[];
  metrics: Metric[];
  integrationsCopy: string;
  ctaTitle: string;
  ctaDescription: string;
};

const models: ModelData[] = [
  {
    slug: "b2b",
    badge: "B2B Pazaryeri Altyapısı",
    title: "Bayi, satıcı ve kurumsal alıcılarınız için",
    highlight: "kapalı B2B pazaryeri.",
    description:
      "Bayi ağı olan markalar, distribütörler ve toptancılar için davetli sipariş portalı, çoklu fiyat listesi, cari hesap yönetimi ve ERP entegrasyonu hazır gelir. Sektörünüze özel akışlar üstüne inşa edilir.",
    primaryCtaLabel: "B2B için teklif al",
    primaryCtaHref: "/teklif-al?model=b2b",
    audience: [
      "Distribütör ve toptancılar",
      "Bayi ağı olan üretici markalar",
      "Sektörel tedarikçiler",
      "Kurumsal alıcı yönetimi yapan firmalar"
    ],
    highlights: [
      { icon: "Users", title: "Çoklu fiyat listesi & bayi grupları", description: "A/B/C bayi sınıfları, sözleşme fiyatları, miktarsal iskonto, sektör bazlı fiyat. Her bayi yalnızca kendine açılan ürünleri ve fiyatları görür." },
      { icon: "WalletCards", title: "Cari hesap & açık hesap limiti", description: "Açık hesap, çek/senet takibi, vade yönetimi, ekstre, risk skoru, kara liste — finans ekibinin günlük operasyonu tek panelde." },
      { icon: "FileCheck", title: "Sipariş onay akışları", description: "Çok adımlı onay (saha temsilcisi → bölge müdürü → finans), kontrat kontrolü, stok yetersizliğinde alternatif öneri." },
      { icon: "Cable", title: "ERP & e-fatura entegrasyonu", description: "Logo Tiger, Mikro Fly, Netsis, Paraşüt, Sentos, Entegra ile iki yönlü senkron. Sipariş anlık ERP'ye düşer, sevkiyatla fatura kesilir." },
      { icon: "Smartphone", title: "Mobil uygulama (iOS & Android)", description: "Bayi mobil uygulaması: barkod, hızlı tekrar sipariş, açık hesap görüntüleme, push bildirim. Saha satış temsilcisi profili ayrı." },
      { icon: "ShieldCheck", title: "Sektörel doğrulama", description: "Eczacılık için GLN, sağlık için yetkili eczacı kontrolü, kırtasiye için vergi numarası whitelist, hırdavat için bayi onay süreci." }
    ],
    useCases: [
      { industry: "Dermokozmetik distribütörü", scenario: "1.200 eczane bayisi, 6 farklı fiyat grubu, GLN doğrulama, açık hesap limiti, ERP'de Logo Tiger.", outcome: "Sipariş hatası %95 azaldı, manuel veri girişi sıfırlandı, eczane sipariş frekansı arttı." },
      { industry: "Hırdavat & yapı market", scenario: "350 nalbur bayisi, 25.000 SKU, varyant yönetimi, mobil barkod sipariş, çoklu depo sevkiyat.", outcome: "Saha satış temsilcisi başına yapılan ziyaret 2 katına çıktı, sipariş işleme süresi %70 düştü." },
      { industry: "Kırtasiye & ofis tedariki", scenario: "Okul ve kurumsal alıcı, Excel sipariş listesi yükleme, sezon kampanya, set ürün indirimi.", outcome: "Ağustos-Eylül sezonunda manuel sipariş yükü %80 azaldı, kurumsal müşteri portfolyosu büyüdü." }
    ],
    metrics: [
      { value: "%70+", label: "Manuel sipariş yükünde azalma" },
      { value: "8-14 hafta", label: "Tipik canlıya geçiş" },
      { value: "30+", label: "Hazır entegrasyon konnektörü" },
      { value: "iOS+Android", label: "Native mobil deneyim" }
    ],
    integrationsCopy:
      "Logo Tiger 3, Mikro Fly, Netsis 9.0, Paraşüt, Sentos, Entegra, BizimHesap, KolaySoft; Aras / Yurtiçi / MNG / Sürat / PTT / Hepsijet / Sendeo / Kolay Gelsin / Navlungo; Iyzico, PayTR; Logo / Mikro / Uyumsoft e-Fatura.",
    ctaTitle: "B2B pazaryeriniz için yol haritası birlikte çıkartalım.",
    ctaDescription: "Sektörünüze, bayi ağınıza ve mevcut sisteminize göre özel bir kapsam ve fazlandırma hazırlayalım."
  },
  {
    slug: "b2c",
    badge: "B2C E-Ticaret Altyapısı",
    title: "Markanızın doğrudan tüketiciye satışı için",
    highlight: "ölçeklenebilir B2C altyapı.",
    description:
      "Online satış kanalınızı kurun veya mevcut altyapınızı yenileyin. Ürün katalog, ödeme, kargo, kampanya, SEO ve mobil deneyim tek altyapıda; Trendyol/Hepsiburada/Google Shopping multichannel destekli.",
    primaryCtaLabel: "B2C için teklif al",
    primaryCtaHref: "/teklif-al?model=b2c",
    audience: [
      "Doğrudan tüketiciye satan üretici markalar",
      "Boutique ve butik perakendeciler",
      "D2C (Direct-to-Consumer) startuplar",
      "Pazaryeri yorgunluğu yaşayan satıcılar"
    ],
    highlights: [
      { icon: "Boxes", title: "Zengin ürün katalog & varyant", description: "Sınırsız ürün, varyant (renk/beden/desen), bundle, set ürün, abonelik, dijital ürün desteği. Toplu Excel/CSV import." },
      { icon: "WalletCards", title: "Ödeme & taksit", description: "Iyzico, PayTR ile 36 banka, anında havale, kapıda ödeme, ödeme noktası (havale/EFT), cüzdan, mağaza kredisi, taksit yönetimi." },
      { icon: "Truck", title: "Kargo & teslimat", description: "Aras, Yurtiçi, MNG, PTT, Hepsijet, Sendeo, Kolay Gelsin entegrasyonu. Aynı gün teslim, 2 saatlik kurye, kapıda iade." },
      { icon: "Search", title: "SEO & dönüşüm optimizasyonu", description: "Otomatik schema.org markup, OpenGraph, kanonik URL, JSON-LD, breadcrumb, sitemap, blog ve içerik yönetimi. Hızlı LCP, CLS optimizasyonu." },
      { icon: "MessagesSquare", title: "Pazarlama otomasyonu", description: "E-posta, SMS, push bildirim ile sepette bırakılan ürün, geri kazanım, doğum günü kampanyası, segment bazlı promosyon." },
      { icon: "LayoutDashboard", title: "Multichannel pazaryeri", description: "Trendyol, Hepsiburada, n11, GittiGidiyor, Amazon, Google Shopping; tek katalogla çoklu kanala satış. Otomatik fiyat ve stok senkronu." }
    ],
    useCases: [
      { industry: "Kozmetik markası", scenario: "Kendi sitesinden + 4 pazaryeri + Instagram Shop. Otomatik stok senkronu, bundle ürünler, sepet bırakma kampanyası.", outcome: "Aynı gün stok hata oranı sıfır, online ciro %180 arttı, organik trafik 5 katına çıktı." },
      { industry: "Giyim D2C markası", scenario: "Mobil-first deneyim, hızlı kargo, beden iadesi, sosyal medya entegrasyonu, abonelik kutusu.", outcome: "Mobil dönüşüm %5'in üzerine çıktı, müşteri yaşam değeri 2.5x büyüdü." },
      { industry: "Gıda & catering", scenario: "Bölge bazlı teslim, sipariş kesim saati, soğuk zincir kargo, abonelik (haftalık), SMS bildirimleri.", outcome: "Tekrar sipariş oranı %62, müşteri memnuniyeti %94, çağrı merkezi yükü yarıya indi." }
    ],
    metrics: [
      { value: "%180+", label: "Tipik ciro artışı (yıllık)" },
      { value: "10-12 hafta", label: "Standart canlıya geçiş" },
      { value: "8+", label: "Pazaryeri & sosyal kanal" },
      { value: "<2s", label: "Hedef LCP (Lighthouse 90+)" }
    ],
    integrationsCopy:
      "Iyzico, PayTR, BKM Express; Aras / Yurtiçi / MNG / Sürat / PTT / Hepsijet / Sendeo / Kolay Gelsin / Navlungo; Trendyol, Hepsiburada, n11, GittiGidiyor, Amazon, Google Shopping; Logo, Mikro, Netsis, Paraşüt, Uyumsoft e-fatura; Mailchimp / SendGrid / Iletimerkezi / NetGSM; Google Analytics 4, Meta Pixel, TikTok Pixel.",
    ctaTitle: "B2C kanalınızı sektörünüze özel kuralım.",
    ctaDescription: "Mevcut sitenize geçiş, çoklu pazaryeri entegrasyonu veya sıfırdan kurulum — ihtiyacınıza göre planlama yapalım."
  },
  {
    slug: "c2c",
    badge: "C2C / Multi-Vendor Pazaryeri",
    title: "Birden çok satıcının satış yaptığı",
    highlight: "kendi pazaryerinizi kurun.",
    description:
      "Trendyol, Hepsiburada, Sahibinden tarzı çok satıcılı (multi-vendor) pazaryeri altyapısı. Satıcı paneli, komisyon, hakediş, KYC, escrow, yorum/puan sistemi — tüm marketplace mekanikleri hazır.",
    primaryCtaLabel: "C2C için teklif al",
    primaryCtaHref: "/teklif-al?model=c2c",
    audience: [
      "Sektörel pazaryeri kurmak isteyen girişimciler",
      "Niche e-ticaret (vintage, el yapımı, koleksiyon vb.)",
      "Hizmet pazaryerleri (eğitim, danışmanlık, iş ilanı)",
      "Tedarik zinciri pazaryeri (B2B + C2C hibrit)"
    ],
    highlights: [
      { icon: "Users", title: "Satıcı kayıt & onboarding", description: "Self-servis kayıt, KYC (kimlik, vergi levhası, IBAN, imza sirküleri), evrak yükleme, otomatik doğrulama, onay akışı." },
      { icon: "WalletCards", title: "Komisyon & hakediş", description: "Kategori bazlı komisyon, sabit/yüzdesel/karma komisyon, satıcı hakediş takibi, otomatik settlement, payout request." },
      { icon: "ShieldCheck", title: "Güven mekanizması", description: "Müşteri yorumu & puanı, satıcı puan sistemi, anlaşmazlık yönetimi, escrow ile teslimat sonrası ödeme aktarımı." },
      { icon: "FileCheck", title: "Sipariş & sevkiyat", description: "Birden fazla satıcıdan tek sepet, satıcı bazlı sevkiyat ve takip, kısmi iade, satıcı kargo etiketi otomasyonu." },
      { icon: "Search", title: "Arama, kategori & filtre", description: "Meilisearch tabanlı hızlı arama, sektörel kategori ağacı, varyant filtreleme, satıcı bazlı arama, öneri motoru." },
      { icon: "MessagesSquare", title: "Müşteri-satıcı mesajlaşma", description: "Sipariş öncesi soru-cevap, satıcı içi mesaj kutusu, otomatik şablonlar, anlaşmazlık konuları için destek talebi entegrasyonu." }
    ],
    useCases: [
      { industry: "Vintage / el yapımı pazaryeri (Etsy modeli)", scenario: "300+ satıcı, manuel KYC, %12 komisyon, satıcı dükkan sayfaları, müşteri yorumları, sosyal medya entegrasyonu.", outcome: "İlk yılda 12.000 sipariş, satıcı memnuniyet skoru 4.6/5, müşteri tekrar oranı %38." },
      { industry: "Sektörel B2B+C2C pazaryeri", scenario: "Tarım sektörü için üretici, distribütör ve çiftçi rolleri; çoklu fiyat listesi + komisyonlu açık satış hibriti.", outcome: "350 satıcı, 8.000 alıcı, ortalama %15 maliyet düşüşü tedarik zincirinde." },
      { industry: "İkinci el / koleksiyon pazaryeri", scenario: "C2C ikinci el satış, escrow ödeme, satıcı puan sistemi, ürün doğrulama hizmeti, mobil-first uygulama.", outcome: "Aylık 25.000 listing, %3 anlaşmazlık oranı, müşteri güven skoru sektör ortalamasının üstünde." }
    ],
    metrics: [
      { value: "Multi-vendor", label: "Sınırsız satıcı, kategori, varyant" },
      { value: "12-20 hafta", label: "Karmaşık marketplace canlıya geçiş" },
      { value: "%100", label: "Komisyon ve hakediş otomasyonu" },
      { value: "Escrow", label: "Müşteri-satıcı güven mekanizması" }
    ],
    integrationsCopy:
      "Iyzico Marketplace API, PayTR Marketplace, satıcı transfer & cüzdan; KYC için vergi numarası, GLN, NACE kodu doğrulama; e-fatura entegratörleri; satıcı IBAN doğrulama; Sentry hata izleme, Meilisearch arama; mobil push bildirim.",
    ctaTitle: "Marketplace projenizin kapsamını birlikte tanımlayalım.",
    ctaDescription: "Satıcı sayısı, komisyon yapısı, ödeme akışı, KYC ve müşteri güven mekanizmaları — projenize özel kapsam çıkartalım."
  }
];

async function main() {
  console.log("→ Seeding business model pages…\n");

  for (const m of models) {
    const pageData = {
      badge: m.badge,
      title: m.title,
      highlight: m.highlight,
      description: m.description,
      primaryCtaLabel: m.primaryCtaLabel,
      primaryCtaHref: m.primaryCtaHref,
      audience: JSON.stringify(m.audience),
      integrationsCopy: m.integrationsCopy,
      ctaTitle: m.ctaTitle,
      ctaDescription: m.ctaDescription,
      isPublished: true
    };
    const page = await prisma.businessModelPage.upsert({
      where: { slug: m.slug },
      update: pageData,
      create: { slug: m.slug, ...pageData }
    });
    console.log(`✓ Page: ${m.slug}`);

    // Highlights / UseCases / Metrics — only seed if empty
    const [hCount, uCount, mCount] = await Promise.all([
      prisma.businessModelHighlight.count({ where: { pageId: page.id } }),
      prisma.businessModelUseCase.count({ where: { pageId: page.id } }),
      prisma.businessModelMetric.count({ where: { pageId: page.id } })
    ]);

    if (hCount === 0) {
      await prisma.businessModelHighlight.createMany({
        data: m.highlights.map((h, i) => ({ pageId: page.id, ...h, sortOrder: i + 1 }))
      });
      console.log(`  ↪ ${m.highlights.length} highlights`);
    } else {
      console.log(`  · ${hCount} highlights exist — skip`);
    }

    if (uCount === 0) {
      await prisma.businessModelUseCase.createMany({
        data: m.useCases.map((u, i) => ({ pageId: page.id, ...u, sortOrder: i + 1 }))
      });
      console.log(`  ↪ ${m.useCases.length} use cases`);
    } else {
      console.log(`  · ${uCount} use cases exist — skip`);
    }

    if (mCount === 0) {
      await prisma.businessModelMetric.createMany({
        data: m.metrics.map((mt, i) => ({ pageId: page.id, ...mt, sortOrder: i + 1 }))
      });
      console.log(`  ↪ ${m.metrics.length} metrics`);
    } else {
      console.log(`  · ${mCount} metrics exist — skip`);
    }
  }

  console.log("\n✅ Seed complete.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
