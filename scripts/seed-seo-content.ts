import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { prisma } from "../src/lib/db";

type SeoPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  focus: string;
  audience: string;
  intent: string;
  modules: string[];
  integrations: string[];
  revenue: string[];
  sortOrder: number;
  isFeatured?: boolean;
  colorA: string;
  colorB: string;
};

const posts: SeoPost[] = [
  {
    slug: "pazaryeri-sitesi-kurma-maliyeti-2026",
    title: "Pazaryeri Sitesi Kurma Maliyeti 2026: Gercekci Butce Rehberi",
    excerpt: "Pazaryeri sitesi kurma maliyetini etkileyen yazilim, tasarim, entegrasyon, mobil uygulama ve operasyon kalemlerini detayli inceliyoruz.",
    tag: "Maliyet",
    focus: "pazaryeri sitesi kurma maliyeti",
    audience: "cok saticili pazaryeri kurmak isteyen girisimciler, markalar ve dagitim sirketleri",
    intent: "butce planlamak ve teklif almadan once kapsam netlestirmek",
    modules: ["cok saticili katalog", "satici paneli", "komisyon ve hak edis", "odeme dagitimi", "kargo entegrasyonu", "admin panel"],
    integrations: ["Iyzico", "PayTR", "Aras Kargo", "Yurtici Kargo", "Logo", "Paraşut"],
    revenue: ["satis komisyonu", "satici aboneligi", "one cikan urun", "reklam alanlari", "entegrasyon hizmetleri"],
    sortOrder: 30,
    isFeatured: true,
    colorA: "#2563EB",
    colorB: "#1D4ED8"
  },
  {
    slug: "trendyol-gibi-site-kurma-maliyeti",
    title: "Trendyol Gibi Site Kurma Maliyeti: Hangi Kalemler Butceyi Belirler?",
    excerpt: "Trendyol benzeri bir platformun yazilim, mobil uygulama, satici operasyonu, kargo ve odeme maliyetlerini adim adim acikliyoruz.",
    tag: "Maliyet",
    focus: "Trendyol gibi site kurma maliyeti",
    audience: "Trendyol benzeri pazaryeri modeliyle buyumek isteyen sirketler",
    intent: "yatirim butcesi ve MVP kapsami belirlemek",
    modules: ["multi-vendor urun sistemi", "satici onay akisi", "kampanya modulu", "mobil uygulama", "gelismis arama", "raporlama"],
    integrations: ["Iyzico Marketplace", "PayTR", "Hepsijet", "Sendeo", "Entegra", "Google Shopping"],
    revenue: ["kategori bazli komisyon", "kampanya katilim bedeli", "magaza aboneligi", "lojistik hizmet farki"],
    sortOrder: 31,
    isFeatured: true,
    colorA: "#F97316",
    colorB: "#EA580C"
  },
  {
    slug: "cok-saticili-pazaryeri-yazilimi-fiyatlari",
    title: "Cok Saticili Pazaryeri Yazilimi Fiyatlari: Paket, Ozel Yazilim ve Hibrit Model",
    excerpt: "Cok saticili pazaryeri yazilimi fiyatlarini paket altyapi, ozel yazilim ve hazir cekirdek uzerine uyarlama yaklasimi ile karsilastiriyoruz.",
    tag: "Maliyet",
    focus: "cok saticili pazaryeri yazilimi fiyatlari",
    audience: "pazaryeri yazilimi arastiran is sahipleri ve proje yoneticileri",
    intent: "fiyatlandirma modellerini karsilastirmak",
    modules: ["satici paneli", "urun onay", "komisyon", "cuzdan", "iade", "destek ticket"],
    integrations: ["ERP", "kargo", "e-fatura", "odeme", "SMS", "push bildirim"],
    revenue: ["kurulum ucreti", "aylik lisans", "islem komisyonu", "bakim ve destek"],
    sortOrder: 32,
    colorA: "#0F766E",
    colorB: "#115E59"
  },
  {
    slug: "b2b-bayi-portali-kurma-maliyeti",
    title: "B2B Bayi Portali Kurma Maliyeti: Bayi Siparis Sistemi Butce Rehberi",
    excerpt: "B2B bayi portali kurarken fiyat listesi, cari hesap, ERP entegrasyonu ve bayi onay sureclerinin maliyete etkisini anlatiyoruz.",
    tag: "B2B",
    focus: "B2B bayi portali kurma maliyeti",
    audience: "bayi agi olan uretici, distributor ve toptan ticaret sirketleri",
    intent: "bayi siparislerini WhatsApp ve Excel yerine dijital kanala tasimak",
    modules: ["bayi girisi", "fiyat listeleri", "minimum siparis", "teklif ve siparis", "cari/stok gorunurlugu", "rol bazli yetki"],
    integrations: ["Logo", "Mikro", "Netsis", "Paraşut", "KolaySoft", "Aras Kargo"],
    revenue: ["operasyon tasarrufu", "hata azalmasi", "tekrar siparis artisi", "bayi sadakati"],
    sortOrder: 33,
    colorA: "#16A34A",
    colorB: "#15803D"
  },
  {
    slug: "mobil-uygulamali-e-ticaret-sitesi-fiyatlari",
    title: "Mobil Uygulamali E-ticaret Sitesi Fiyatlari: Web, iOS ve Android Kapsami",
    excerpt: "Mobil uygulamali e-ticaret sitesi kurarken web paneli, iOS, Android, push bildirim ve odeme entegrasyonu maliyetlerini acikliyoruz.",
    tag: "Mobil",
    focus: "mobil uygulamali e-ticaret sitesi fiyatlari",
    audience: "mobil agirlikli satis yapmak isteyen markalar ve pazaryeri girisimleri",
    intent: "mobil uygulama yatirimini dogru kapsamlandirmak",
    modules: ["React Native uygulama", "push bildirim", "mobil sepet", "uye paneli", "siparis takip", "kampanya ekranlari"],
    integrations: ["Firebase", "Iyzico", "PayTR", "Apple Pay", "Google Pay", "kargo takip"],
    revenue: ["mobil tekrar satin alma", "push kampanya donusumu", "sadakat programi", "uygulama ici kampanya"],
    sortOrder: 34,
    colorA: "#7C3AED",
    colorB: "#6D28D9"
  },
  {
    slug: "hazir-pazaryeri-yazilimi-mi-ozel-yazilim-mi",
    title: "Hazir Pazaryeri Yazilimi mi Ozel Yazilim mi? Karar Rehberi",
    excerpt: "Hazir pazaryeri yazilimi, ozel yazilim ve hibrit altyapi yaklasimlarini maliyet, sure, esneklik ve risk acisindan karsilastiriyoruz.",
    tag: "Strateji",
    focus: "hazir pazaryeri yazilimi mi ozel yazilim mi",
    audience: "yeni pazaryeri projesi baslatacak karar vericiler",
    intent: "dogru teknoloji ve teslimat modelini secmek",
    modules: ["hazir cekirdek", "ozel is kurallari", "admin panel", "API", "entegrasyon", "bakim sureci"],
    integrations: ["odeme", "kargo", "ERP", "muhasebe", "e-fatura", "multichannel"],
    revenue: ["daha hizli canliya cikis", "daha dusuk risk", "olceklenebilir operasyon", "fazli buyume"],
    sortOrder: 35,
    colorA: "#475569",
    colorB: "#334155"
  },
  {
    slug: "shopify-mi-ozel-e-ticaret-altyapisi-mi",
    title: "Shopify mi Ozel E-ticaret Altyapisi mi? Turkiye Pazari Icin Karsilastirma",
    excerpt: "Shopify, paket e-ticaret sistemleri ve ozel e-ticaret altyapilarini Turkiye'deki entegrasyon, odeme ve operasyon ihtiyacina gore karsilastiriyoruz.",
    tag: "Karsilastirma",
    focus: "Shopify mi ozel e-ticaret altyapisi mi",
    audience: "e-ticaret altyapisi secerken esneklik ve entegrasyon arayan markalar",
    intent: "paket sistem ile ozel altyapi farkini anlamak",
    modules: ["tema", "urun katalog", "odeme", "kargo", "ERP", "ozel is akisi"],
    integrations: ["Iyzico", "PayTR", "Logo", "Entegra", "Trendyol", "Google Shopping"],
    revenue: ["abonelik", "komisyon", "ozel gelistirme", "kanal satislari"],
    sortOrder: 36,
    colorA: "#22C55E",
    colorB: "#16A34A"
  },
  {
    slug: "woocommerce-pazaryeri-mi-ozel-pazaryeri-yazilimi-mi",
    title: "WooCommerce Pazaryeri mi Ozel Pazaryeri Yazilimi mi?",
    excerpt: "WooCommerce eklentileriyle pazaryeri kurmak ile ozel pazaryeri altyapisi kullanmak arasindaki farklari performans, guvenlik ve operasyon acisindan inceliyoruz.",
    tag: "Karsilastirma",
    focus: "WooCommerce pazaryeri mi ozel pazaryeri yazilimi mi",
    audience: "WordPress uzerinden pazaryeri kurmayi dusunen isletmeler",
    intent: "eklenti tabanli sistemin sinirlarini anlamak",
    modules: ["urun katalog", "satici paneli", "komisyon", "odeme", "iade", "performans"],
    integrations: ["WooCommerce", "WordPress", "Iyzico", "PayTR", "kargo eklentileri", "ERP API"],
    revenue: ["kurulum maliyeti", "eklenti lisanslari", "bakim", "ozel gelistirme"],
    sortOrder: 37,
    colorA: "#9333EA",
    colorB: "#7E22CE"
  },
  {
    slug: "trendyol-entegrasyonu-mu-kendi-pazaryeri-siten-mi",
    title: "Trendyol Entegrasyonu mu Kendi Pazaryeri Siten mi?",
    excerpt: "Mevcut pazaryerlerinde satis yapmak ile kendi pazaryeri veya e-ticaret altyapinizi kurmak arasindaki stratejik farklari anlatiyoruz.",
    tag: "Strateji",
    focus: "Trendyol entegrasyonu mu kendi pazaryeri siten mi",
    audience: "marka kontrolu ve kanal cesitliligi isteyen isletmeler",
    intent: "kanal stratejisi belirlemek",
    modules: ["marka sitesi", "multichannel", "stok senkron", "siparis yonetimi", "musteri verisi", "SEO"],
    integrations: ["Trendyol", "Hepsiburada", "n11", "Amazon", "Google Shopping", "ERP"],
    revenue: ["kanal komisyon tasarrufu", "musteri verisi", "organik trafik", "marka degeri"],
    sortOrder: 38,
    colorA: "#F59E0B",
    colorB: "#D97706"
  },
  {
    slug: "b2b-portal-mi-b2c-e-ticaret-sitesi-mi",
    title: "B2B Portal mi B2C E-ticaret Sitesi mi? Is Modeline Gore Secim Rehberi",
    excerpt: "Bayi agina satis yapan firmalar ile tuketiciye dogrudan satis yapan markalar icin B2B ve B2C altyapi farklarini inceliyoruz.",
    tag: "B2B",
    focus: "B2B portal mi B2C e-ticaret sitesi mi",
    audience: "satis kanalini dijitallestirmek isteyen markalar",
    intent: "dogru ticaret modelini secmek",
    modules: ["bayi fiyat listesi", "tuketici kampanyasi", "cari hesap", "online odeme", "uye paneli", "siparis akisi"],
    integrations: ["ERP", "muhasebe", "odeme", "kargo", "CRM", "e-fatura"],
    revenue: ["bayi siparis verimliligi", "B2C kar marji", "kanal genislemesi", "tekrar satis"],
    sortOrder: 39,
    colorA: "#0EA5E9",
    colorB: "#0284C7"
  },
  {
    slug: "kozmetik-pazaryeri-sitesi-kurmak",
    title: "Kozmetik Pazaryeri Sitesi Kurmak: Marka, Bayi ve Satici Modeli",
    excerpt: "Kozmetik ve dermokozmetik sektorunde pazaryeri kurarken marka dogrulama, urun icerigi, kampanya ve yasal surecleri anlatiyoruz.",
    tag: "Sektor",
    focus: "kozmetik pazaryeri sitesi kurmak",
    audience: "kozmetik markalari, distributorler ve dermokozmetik girisimleri",
    intent: "kozmetik sektorune ozel pazaryeri kapsami planlamak",
    modules: ["marka dogrulama", "urun icerik alanlari", "cilt tipi filtreleri", "kampanya", "yorum", "orijinallik kontrolu"],
    integrations: ["e-fatura", "kargo", "odeme", "ERP", "pazaryeri kanallari", "SMS"],
    revenue: ["kategori komisyonu", "marka vitrinleri", "kampanya katilimi", "abonelik"],
    sortOrder: 40,
    colorA: "#DB2777",
    colorB: "#BE185D"
  },
  {
    slug: "hirdavat-b2b-bayi-siparis-sistemi",
    title: "Hirdavat B2B Bayi Siparis Sistemi: Stok, Fiyat ve Katalog Yonetimi",
    excerpt: "Hirdavat ve nalbur sektorunde bayi siparis portali kurarken genis katalog, stok, iskonto ve ERP entegrasyonu nasil planlanir?",
    tag: "Sektor",
    focus: "hirdavat B2B bayi siparis sistemi",
    audience: "hirdavat ureticileri, toptancilar ve bayi agi olan firmalar",
    intent: "hirdavat siparis operasyonunu dijitallestirmek",
    modules: ["genis katalog", "marka/olcu filtreleri", "bayi iskonto", "minimum koli", "tekrar siparis", "stok gorunurlugu"],
    integrations: ["Logo", "Mikro", "Netsis", "Excel import", "kargo", "e-fatura"],
    revenue: ["siparis hizi", "hata azalmasi", "saha ekibi verimliligi", "stok devir hizi"],
    sortOrder: 41,
    colorA: "#B45309",
    colorB: "#92400E"
  },
  {
    slug: "yedek-parca-pazaryeri-sitesi-kurmak",
    title: "Yedek Parca Pazaryeri Sitesi Kurmak: Marka, Model ve Uyumluluk Altyapisi",
    excerpt: "Otomotiv ve makine yedek parca pazaryerlerinde arac uyumlulugu, OEM kodu, stok ve tedarikci yonetimini detaylandiriyoruz.",
    tag: "Sektor",
    focus: "yedek parca pazaryeri sitesi kurmak",
    audience: "otomotiv yedek parca saticilari, tedarikciler ve distributorler",
    intent: "uyumluluk odakli katalog ve pazaryeri kurmak",
    modules: ["OEM kodu", "arac uyumluluk", "marka/model filtre", "tedarikci paneli", "stok eslestirme", "teklif alma"],
    integrations: ["ERP", "stok API", "kargo", "e-fatura", "Excel import", "barkod"],
    revenue: ["tedarikci komisyonu", "kurumsal teklif", "B2B bayi satisi", "one cikan urun"],
    sortOrder: 42,
    colorA: "#334155",
    colorB: "#1E293B"
  },
  {
    slug: "medikal-urun-pazaryeri-kurmak",
    title: "Medikal Urun Pazaryeri Kurmak: Yetki, Belge ve B2B Satis Surecleri",
    excerpt: "Medikal urun pazaryeri veya B2B siparis sistemi kurarken belge dogrulama, fiyat listesi ve kurumsal alici sureclerini inceliyoruz.",
    tag: "Sektor",
    focus: "medikal urun pazaryeri kurmak",
    audience: "medikal tedarikciler, distributorler ve saglik urunu saticilari",
    intent: "regule urunlerde guvenli dijital satis altyapisi kurmak",
    modules: ["belge dogrulama", "kurumsal alici", "fiyat listesi", "stok", "teklif", "onayli satici"],
    integrations: ["ERP", "e-fatura", "kargo", "odeme", "GLN dogrulama", "muhasebe"],
    revenue: ["kurumsal satis", "bayi siparisi", "tedarikci komisyonu", "teklif donusumu"],
    sortOrder: 43,
    colorA: "#0891B2",
    colorB: "#0E7490"
  },
  {
    slug: "mobilya-e-ticaret-pazaryeri-kurmak",
    title: "Mobilya E-ticaret Pazaryeri Kurmak: Varyant, Kargo ve Montaj Surecleri",
    excerpt: "Mobilya pazaryerlerinde urun varyantlari, olcu secenekleri, teslimat, montaj ve iade surecleri nasil kurgulanir?",
    tag: "Sektor",
    focus: "mobilya e-ticaret pazaryeri kurmak",
    audience: "mobilya ureticileri, saticilari ve dekorasyon pazaryeri girisimleri",
    intent: "mobilya sektorune uygun satis altyapisi tasarlamak",
    modules: ["olcu/varyant", "renk ve kumas", "teslimat bolgesi", "montaj talebi", "3D gorsel", "iade kurallari"],
    integrations: ["nakliye", "Navlungo", "kargo", "ERP", "odeme", "stok"],
    revenue: ["magaza komisyonu", "montaj hizmeti", "lojistik farki", "dekorasyon paketi"],
    sortOrder: 44,
    colorA: "#A16207",
    colorB: "#854D0E"
  },
  {
    slug: "gida-toptan-satis-b2b-portali",
    title: "Gida Toptan Satis B2B Portali: Bayi, Soguk Zincir ve Tekrar Siparis",
    excerpt: "Gida toptan satisinda B2B portal kurarken soguk zincir, raf omru, tekrar siparis ve bayi fiyat listeleri nasil yonetilir?",
    tag: "Sektor",
    focus: "gida toptan satis B2B portali",
    audience: "gida ureticileri, distributorler, restoran tedarikcileri ve toptancilar",
    intent: "gida siparis surecini dijital kanala almak",
    modules: ["raf omru", "soguk zincir", "minimum koli", "tekrar siparis", "bayi fiyat", "teslimat gunu"],
    integrations: ["ERP", "kargo/lojistik", "e-fatura", "stok", "saha satis", "muhasebe"],
    revenue: ["tekrar siparis", "rota verimliligi", "stok kaybi azalmasi", "B2B buyume"],
    sortOrder: 45,
    colorA: "#65A30D",
    colorB: "#4D7C0F"
  },
  {
    slug: "erp-entegrasyonlu-pazaryeri-yazilimi",
    title: "ERP Entegrasyonlu Pazaryeri Yazilimi: Urun, Stok, Siparis ve Fatura Akisi",
    excerpt: "ERP entegrasyonlu pazaryeri yaziliminda urun, stok, fiyat, siparis ve fatura verilerinin nasil senkronize edildigini anlatiyoruz.",
    tag: "Entegrasyon",
    focus: "ERP entegrasyonlu pazaryeri yazilimi",
    audience: "ERP kullanan e-ticaret, B2B ve pazaryeri projeleri",
    intent: "mevcut sistemlerle entegre calisan altyapi kurmak",
    modules: ["urun senkron", "stok senkron", "fiyat listesi", "siparis aktarimi", "fatura", "hata loglari"],
    integrations: ["Logo", "Mikro", "Netsis", "Paraşut", "BizimHesap", "Entegra"],
    revenue: ["manuel is azalmasi", "stok dogrulugu", "siparis hizi", "fatura otomasyonu"],
    sortOrder: 46,
    colorA: "#1D4ED8",
    colorB: "#1E40AF"
  },
  {
    slug: "logo-erp-entegrasyonlu-e-ticaret-sitesi",
    title: "Logo ERP Entegrasyonlu E-ticaret Sitesi: Stok, Cari ve Fatura Senkronu",
    excerpt: "Logo ERP kullanan firmalar icin e-ticaret ve pazaryeri altyapisinda stok, cari, fiyat ve fatura akislari nasil planlanir?",
    tag: "Entegrasyon",
    focus: "Logo ERP entegrasyonlu e-ticaret sitesi",
    audience: "Logo ERP kullanan B2B ve B2C isletmeler",
    intent: "Logo verilerini dijital satis kanalina baglamak",
    modules: ["Logo urun aktarimi", "cari hesap", "fiyat listesi", "stok", "siparis", "fatura"],
    integrations: ["Logo", "e-fatura", "kargo", "odeme", "Excel", "API"],
    revenue: ["stok hatasi azalmasi", "siparis otomasyonu", "cari kontrol", "hizli fatura"],
    sortOrder: 47,
    colorA: "#0369A1",
    colorB: "#075985"
  },
  {
    slug: "parasut-entegrasyonlu-e-ticaret-altyapisi",
    title: "Parasut Entegrasyonlu E-ticaret Altyapisi: Siparis ve Fatura Otomasyonu",
    excerpt: "Parasut kullanan isletmeler icin e-ticaret sitesinde siparis, musteri, fatura ve tahsilat surecleri nasil entegre edilir?",
    tag: "Entegrasyon",
    focus: "Parasut entegrasyonlu e-ticaret altyapisi",
    audience: "KOBI olceginde e-ticaret yapan ve Parasut kullanan firmalar",
    intent: "muhasebe surecini satis kanaliyla birlestirmek",
    modules: ["siparis aktarimi", "musteri kaydi", "fatura olusturma", "tahsilat", "urun eslestirme", "raporlama"],
    integrations: ["Parasut", "Iyzico", "PayTR", "kargo", "e-fatura", "banka"],
    revenue: ["muhasebe hizi", "operasyon tasarrufu", "tahsilat takibi", "fatura otomasyonu"],
    sortOrder: 48,
    colorA: "#06B6D4",
    colorB: "#0891B2"
  },
  {
    slug: "iyzico-marketplace-odeme-sistemi-nasil-calisir",
    title: "Iyzico Marketplace Odeme Sistemi Nasil Calisir? Pazaryeri Odeme Rehberi",
    excerpt: "Iyzico marketplace odeme sisteminde satici alt uye is yeri, komisyon, para dagitimi, iade ve escrow sureclerini anlatiyoruz.",
    tag: "Entegrasyon",
    focus: "Iyzico marketplace odeme sistemi nasil calisir",
    audience: "cok saticili pazaryeri kuracak girisimciler",
    intent: "pazaryeri odeme akisini anlamak",
    modules: ["alt uye is yeri", "komisyon", "para dagitimi", "iade", "cuzdan", "hak edis"],
    integrations: ["Iyzico Marketplace", "e-fatura", "kargo", "admin panel", "satıcı paneli", "webhook"],
    revenue: ["komisyon", "hak edis planlama", "odeme guveni", "iade kontrolu"],
    sortOrder: 49,
    colorA: "#22C55E",
    colorB: "#15803D"
  },
  {
    slug: "paytr-pazaryeri-odeme-entegrasyonu",
    title: "PayTR Pazaryeri Odeme Entegrasyonu: Komisyon, Iade ve Satici Odeme Akisi",
    excerpt: "PayTR ile pazaryeri odeme entegrasyonu yaparken satici dogrulama, komisyon, iade ve hak edis surecleri nasil kurgulanir?",
    tag: "Entegrasyon",
    focus: "PayTR pazaryeri odeme entegrasyonu",
    audience: "PayTR ile marketplace odeme almak isteyen pazaryeri sahipleri",
    intent: "odeme dagitimini teknik ve operasyonel olarak planlamak",
    modules: ["satici dogrulama", "komisyon", "odeme alma", "iade", "hak edis", "webhook"],
    integrations: ["PayTR", "admin panel", "ERP", "e-fatura", "kargo", "bildirim"],
    revenue: ["komisyon geliri", "guvenli tahsilat", "satici odemesi", "operasyon kontrolu"],
    sortOrder: 50,
    colorA: "#EF4444",
    colorB: "#DC2626"
  },
  {
    slug: "kargo-entegrasyonlu-pazaryeri-sitesi",
    title: "Kargo Entegrasyonlu Pazaryeri Sitesi: Etiket, Takip ve Satici Kargo Ayarlari",
    excerpt: "Kargo entegrasyonlu pazaryeri sitesinde hesaplama, etiket basma, takip numarasi, iade kargosu ve satici bazli ayarlar nasil calisir?",
    tag: "Kargo",
    focus: "kargo entegrasyonlu pazaryeri sitesi",
    audience: "fiziksel urun satan e-ticaret ve pazaryeri projeleri",
    intent: "siparis sonrasi lojistik surecini otomatiklestirmek",
    modules: ["kargo hesaplama", "etiket basma", "takip", "iade kargo", "satici ayari", "teslimat raporu"],
    integrations: ["Aras", "Yurtici", "MNG", "Surat", "PTT", "Hepsijet"],
    revenue: ["lojistik verimlilik", "hata azalmasi", "teslimat memnuniyeti", "iade kontrolu"],
    sortOrder: 51,
    colorA: "#64748B",
    colorB: "#475569"
  },
  {
    slug: "shopier-alternatifi-e-ticaret-altyapisi",
    title: "Shopier Alternatifi E-ticaret Altyapisi: Ne Zaman Ozel Siteye Gecilmeli?",
    excerpt: "Shopier benzeri kolay satis cozumlerinden ozel e-ticaret veya pazaryeri altyapisina gecis ihtiyacini ve avantajlarini inceliyoruz.",
    tag: "Alternatif",
    focus: "Shopier alternatifi e-ticaret altyapisi",
    audience: "Instagram ve sosyal medya uzerinden satis yapip buyumek isteyen markalar",
    intent: "basit odeme linkinden yonetilebilir e-ticaret sitesine gecmek",
    modules: ["urun katalog", "odeme", "kargo", "uye paneli", "SEO", "admin panel"],
    integrations: ["Iyzico", "PayTR", "kargo", "Instagram", "Google Shopping", "ERP"],
    revenue: ["organik trafik", "tekrar musteri", "marka kontrolu", "kampanya yonetimi"],
    sortOrder: 52,
    colorA: "#EC4899",
    colorB: "#DB2777"
  },
  {
    slug: "ticimax-alternatifi-pazaryeri-yazilimi",
    title: "Ticimax Alternatifi Pazaryeri Yazilimi: Paket Sistemden Ozel Altyapiya",
    excerpt: "Ticimax alternatifi arayan isletmeler icin pazaryeri, B2B, ERP entegrasyonu ve ozel is kurallari acisindan secenekleri anlatiyoruz.",
    tag: "Alternatif",
    focus: "Ticimax alternatifi pazaryeri yazilimi",
    audience: "paket e-ticaret sisteminden daha esnek altyapi arayan firmalar",
    intent: "ozel ihtiyaclara uygun yazilim secmek",
    modules: ["B2B", "B2C", "C2C", "ERP", "ozel panel", "API"],
    integrations: ["Logo", "Mikro", "Iyzico", "PayTR", "kargo", "pazaryeri kanallari"],
    revenue: ["lisans esnekligi", "ozel is modeli", "entegrasyon kontrolu", "olceklenebilirlik"],
    sortOrder: 53,
    colorA: "#8B5CF6",
    colorB: "#7C3AED"
  },
  {
    slug: "ikas-alternatifi-ozel-e-ticaret-altyapisi",
    title: "Ikas Alternatifi Ozel E-ticaret Altyapisi: B2B, B2C ve Pazaryeri Secenekleri",
    excerpt: "Ikas alternatifi arayan markalar icin ozel e-ticaret altyapisi, pazaryeri modeli ve entegrasyon avantajlarini karsilastiriyoruz.",
    tag: "Alternatif",
    focus: "Ikas alternatifi ozel e-ticaret altyapisi",
    audience: "paket sistemden daha esnek ve sektore ozel altyapi isteyen markalar",
    intent: "buyume hedeflerine uygun altyapi secmek",
    modules: ["ozel tema", "B2B fiyat", "pazaryeri", "mobil uygulama", "ERP", "SEO"],
    integrations: ["odeme", "kargo", "ERP", "Google Shopping", "Trendyol", "e-fatura"],
    revenue: ["kanal buyumesi", "marka kontrolu", "SEO trafegi", "operasyon verimliligi"],
    sortOrder: 54,
    colorA: "#14B8A6",
    colorB: "#0F766E"
  },
  {
    slug: "ideasoft-alternatifi-pazaryeri-yazilimi",
    title: "IdeaSoft Alternatifi Pazaryeri Yazilimi: Ozel Panel, ERP ve Multi-vendor",
    excerpt: "IdeaSoft alternatifi arayanlar icin standart e-ticaret ile multi-vendor pazaryeri yazilimi arasindaki farklari anlatiyoruz.",
    tag: "Alternatif",
    focus: "IdeaSoft alternatifi pazaryeri yazilimi",
    audience: "e-ticaret operasyonunu pazaryeri veya B2B modele genisletmek isteyen firmalar",
    intent: "paket e-ticaretin sinirlarini asmak",
    modules: ["satici paneli", "komisyon", "B2B bayi", "ozel admin", "entegrasyon", "raporlama"],
    integrations: ["ERP", "kargo", "odeme", "e-fatura", "multichannel", "CRM"],
    revenue: ["komisyon modeli", "bayi siparisi", "kanal cesitliligi", "operasyon merkezi"],
    sortOrder: 55,
    colorA: "#F43F5E",
    colorB: "#E11D48"
  },
  {
    slug: "shopify-turkiye-alternatifi",
    title: "Shopify Turkiye Alternatifi: Yerel Entegrasyonlu E-ticaret Altyapisi",
    excerpt: "Shopify Turkiye alternatifi arayan markalar icin yerel odeme, kargo, ERP, e-fatura ve B2B ihtiyaclarini degerlendiriyoruz.",
    tag: "Alternatif",
    focus: "Shopify Turkiye alternatifi",
    audience: "Turkiye'de yerel entegrasyon ve ozel operasyon isteyen e-ticaret markalari",
    intent: "global paket sistem yerine yerel uyumlu altyapi secmek",
    modules: ["yerel odeme", "kargo", "e-fatura", "ERP", "B2B", "mobil uygulama"],
    integrations: ["Iyzico", "PayTR", "Logo", "Mikro", "KolaySoft", "Yurtici Kargo"],
    revenue: ["yerel uyumluluk", "daha az operasyon", "ozel akış", "destek kolayligi"],
    sortOrder: 56,
    colorA: "#84CC16",
    colorB: "#65A30D"
  },
  {
    slug: "pazaryeri-sitesi-nasil-kurulur",
    title: "Pazaryeri Sitesi Nasil Kurulur? Fikirden Canliya Gecise Yol Haritasi",
    excerpt: "Pazaryeri sitesi kurma surecini fikir dogrulama, MVP, yazilim, entegrasyon, satici kazanimi ve lansman adimlariyla anlatiyoruz.",
    tag: "Rehber",
    focus: "pazaryeri sitesi nasil kurulur",
    audience: "pazaryeri fikrini hayata gecirmek isteyen girisimciler",
    intent: "adim adim uygulama plani cikarmak",
    modules: ["MVP", "satici paneli", "urun katalog", "odeme", "kargo", "analitik"],
    integrations: ["odeme", "kargo", "ERP", "SMS", "e-posta", "SEO"],
    revenue: ["komisyon", "abonelik", "reklam", "lojistik hizmet", "premium paket"],
    sortOrder: 57,
    isFeatured: true,
    colorA: "#2563EB",
    colorB: "#0F172A"
  },
  {
    slug: "cok-saticili-e-ticaret-sitesi-nasil-kurulur",
    title: "Cok Saticili E-ticaret Sitesi Nasil Kurulur? Multi-vendor Rehberi",
    excerpt: "Multi-vendor e-ticaret sitesi kurmak icin satici yonetimi, urun onayi, komisyon, odeme ve kargo sureclerini inceliyoruz.",
    tag: "C2C",
    focus: "cok saticili e-ticaret sitesi nasil kurulur",
    audience: "multi-vendor pazaryeri kurmak isteyen isletmeler",
    intent: "cok saticili modelin teknik ve operasyonel adimlarini anlamak",
    modules: ["satici basvuru", "urun onay", "komisyon", "hak edis", "iade", "destek"],
    integrations: ["Iyzico", "PayTR", "kargo", "e-fatura", "ERP", "bildirim"],
    revenue: ["satici komisyonu", "urun one cikar", "abonelik", "reklam", "kampanya"],
    sortOrder: 58,
    colorA: "#7C3AED",
    colorB: "#4C1D95"
  },
  {
    slug: "b2b-bayi-siparis-sistemi-nasil-kurulur",
    title: "B2B Bayi Siparis Sistemi Nasil Kurulur? Bayi Portal Rehberi",
    excerpt: "B2B bayi siparis sistemi kurmak icin bayi rolleri, fiyat listeleri, stok, cari hesap ve ERP entegrasyonu adimlarini anlatiyoruz.",
    tag: "B2B",
    focus: "B2B bayi siparis sistemi nasil kurulur",
    audience: "bayi agini dijitallestirmek isteyen uretici ve distributorler",
    intent: "bayi portalinin kapsamini netlestirmek",
    modules: ["bayi rol", "fiyat listesi", "cari hesap", "stok", "tekrar siparis", "onay akisi"],
    integrations: ["ERP", "muhasebe", "e-fatura", "kargo", "saha satis", "Excel"],
    revenue: ["manuel is azalmasi", "bayi memnuniyeti", "siparis hizi", "hata azalmasi"],
    sortOrder: 59,
    colorA: "#16A34A",
    colorB: "#166534"
  },
  {
    slug: "c2c-pazaryeri-nasil-kurulur",
    title: "C2C Pazaryeri Nasil Kurulur? Kullanici, Guvenli Odeme ve Moderasyon",
    excerpt: "C2C pazaryeri kurarken kullanici dogrulama, ilan/urun moderasyonu, guvenli odeme, kargo ve yorum sistemleri nasil tasarlanir?",
    tag: "C2C",
    focus: "C2C pazaryeri nasil kurulur",
    audience: "ikinci el, ilan veya bireysel satici modeli kurmak isteyen girisimler",
    intent: "C2C modelin guven ve operasyon gereksinimlerini anlamak",
    modules: ["kullanici dogrulama", "ilan/urun", "moderasyon", "guvenli odeme", "yorum", "sikayet"],
    integrations: ["odeme", "kargo", "SMS", "e-posta", "kimlik dogrulama", "bildirim"],
    revenue: ["komisyon", "one cikan ilan", "abonelik", "reklam", "guvenli odeme ucreti"],
    sortOrder: 60,
    colorA: "#EC4899",
    colorB: "#BE185D"
  },
  {
    slug: "e-ticaret-sitesi-kurarken-dikkat-edilmesi-gerekenler",
    title: "E-ticaret Sitesi Kurarken Dikkat Edilmesi Gerekenler: Teknik ve Operasyonel Liste",
    excerpt: "E-ticaret sitesi kurarken altyapi, SEO, hiz, odeme, kargo, guvenlik, yasal metinler ve operasyon tarafinda dikkat edilmesi gerekenleri siraladik.",
    tag: "Rehber",
    focus: "e-ticaret sitesi kurarken dikkat edilmesi gerekenler",
    audience: "yeni e-ticaret projesine baslayacak markalar",
    intent: "hatalari onlemek ve dogru baslangic yapmak",
    modules: ["urun katalog", "SEO", "odeme", "kargo", "guvenlik", "raporlama"],
    integrations: ["odeme", "kargo", "ERP", "e-fatura", "analytics", "CRM"],
    revenue: ["donusum artisi", "SEO trafik", "operasyon verimi", "musteri memnuniyeti"],
    sortOrder: 61,
    colorA: "#0F172A",
    colorB: "#334155"
  },
  {
    slug: "pazaryerinde-satici-yonetimi-nasil-yapilir",
    title: "Pazaryerinde Satici Yonetimi Nasil Yapilir? Onboarding, Performans ve Uyum",
    excerpt: "Pazaryerinde satici basvurusu, evrak onayi, urun onayi, performans skoru ve destek surecleri nasil yonetilir?",
    tag: "Operasyon",
    focus: "pazaryerinde satici yonetimi nasil yapilir",
    audience: "cok saticili pazaryeri yoneten veya kuracak ekipler",
    intent: "satici operasyonunu olceklenebilir hale getirmek",
    modules: ["satici basvuru", "evrak onayi", "urun onay", "performans skoru", "uyari", "destek"],
    integrations: ["e-fatura", "odeme", "kargo", "CRM", "bildirim", "raporlama"],
    revenue: ["satici kalitesi", "komisyon artisi", "iade azalmasi", "musteri memnuniyeti"],
    sortOrder: 62,
    colorA: "#EA580C",
    colorB: "#C2410C"
  },
  {
    slug: "bayi-fiyat-listesi-yonetimi-nasil-calisir",
    title: "Bayi Fiyat Listesi Yonetimi Nasil Calisir? B2B Iskonto ve Cari Kurallar",
    excerpt: "Bayi gruplarina ozel fiyat listesi, iskonto, minimum siparis, cari hesap ve vadeli satis kurallarini B2B portal mantigiyla acikliyoruz.",
    tag: "B2B",
    focus: "bayi fiyat listesi yonetimi nasil calisir",
    audience: "B2B fiyat yapisi karmasik olan uretici ve toptancilar",
    intent: "bayiye ozel fiyat ve iskonto sistemini dijitallestirmek",
    modules: ["bayi grup", "fiyat listesi", "iskonto", "min siparis", "cari", "vade"],
    integrations: ["ERP", "Logo", "Mikro", "Netsis", "Excel", "muhasebe"],
    revenue: ["fiyat hatasi azalmasi", "hizli siparis", "bayi sadakati", "operasyon tasarrufu"],
    sortOrder: 63,
    colorA: "#0284C7",
    colorB: "#0369A1"
  },
  {
    slug: "satici-komisyon-sistemi-nasil-kurulur",
    title: "Satici Komisyon Sistemi Nasil Kurulur? Kategori, Marka ve Satici Bazli Model",
    excerpt: "Pazaryeri komisyon sisteminde kategori, marka, satici, kampanya ve hacim bazli oranlar nasil tasarlanir?",
    tag: "Operasyon",
    focus: "satici komisyon sistemi nasil kurulur",
    audience: "pazaryeri gelir modelini netlestirmek isteyen ekipler",
    intent: "komisyon yapisini dogru kurgulamak",
    modules: ["kategori komisyon", "satici komisyon", "kampanya", "hak edis", "rapor", "fatura"],
    integrations: ["odeme", "e-fatura", "ERP", "admin panel", "raporlama", "webhook"],
    revenue: ["komisyon geliri", "kampanya geliri", "abonelik", "reklam", "premium hizmet"],
    sortOrder: 64,
    colorA: "#9333EA",
    colorB: "#6B21A8"
  },
  {
    slug: "marketplace-hak-edis-sistemi-nedir",
    title: "Marketplace Hak Edis Sistemi Nedir? Satici Odeme, Komisyon ve Mutabakat",
    excerpt: "Marketplace hak edis sisteminde satis tutari, komisyon, iade, kargo, vergi ve satici odemeleri nasil hesaplanir?",
    tag: "Operasyon",
    focus: "marketplace hak edis sistemi nedir",
    audience: "pazaryeri finans operasyonunu kuracak ekipler",
    intent: "satici odeme ve mutabakat surecini anlamak",
    modules: ["hak edis", "komisyon", "iade", "mutabakat", "cuzdan", "payout"],
    integrations: ["Iyzico", "PayTR", "ERP", "muhasebe", "e-fatura", "banka"],
    revenue: ["finans kontrolu", "satici guveni", "komisyon takibi", "otomatik odeme"],
    sortOrder: 65,
    colorA: "#0D9488",
    colorB: "#0F766E"
  },
  {
    slug: "bayi-onay-sistemi-nasil-calisir",
    title: "Bayi Onay Sistemi Nasil Calisir? Kapali B2B Portal Kayit ve Yetkilendirme",
    excerpt: "Kapali B2B bayi portallarinda basvuru, evrak kontrolu, vergi no dogrulama, bayi grubu ve fiyat yetkisi nasil calisir?",
    tag: "B2B",
    focus: "bayi onay sistemi nasil calisir",
    audience: "sadece onayli bayilere satis yapmak isteyen markalar",
    intent: "kapali bayi agi ve yetkilendirme akisini kurmak",
    modules: ["bayi basvuru", "evrak", "vergi no", "onay", "rol", "fiyat yetkisi"],
    integrations: ["ERP", "CRM", "e-fatura", "SMS", "e-posta", "muhasebe"],
    revenue: ["kontrollu satis", "bayi guveni", "fiyat gizliligi", "operasyon disiplini"],
    sortOrder: 66,
    colorA: "#4F46E5",
    colorB: "#3730A3"
  },
  {
    slug: "pazaryeri-kurmak-icin-sirket-gerekir-mi",
    title: "Pazaryeri Kurmak Icin Sirket Gerekir mi? Vergi, Sozlesme ve Operasyon Rehberi",
    excerpt: "Pazaryeri kurmak icin sirket gerekliligi, vergi, sozlesme, odeme altyapisi ve satici iliskileri acisindan nelere dikkat edilmeli?",
    tag: "Yasal",
    focus: "pazaryeri kurmak icin sirket gerekir mi",
    audience: "pazaryeri fikrini ticari olarak hayata gecirmek isteyen girisimciler",
    intent: "yasal baslangic gereksinimlerini anlamak",
    modules: ["sirket", "sozlesme", "odeme", "fatura", "satici", "musteri hizmetleri"],
    integrations: ["odeme sağlayıcı", "e-fatura", "muhasebe", "KVKK", "ETBIS", "kargo"],
    revenue: ["yasal guven", "odeme alabilme", "kurumsal satici", "surdurulebilir is"],
    sortOrder: 67,
    colorA: "#475569",
    colorB: "#1E293B"
  },
  {
    slug: "etbis-kaydi-pazaryeri-icin-zorunlu-mu",
    title: "ETBIS Kaydi Pazaryeri Icin Zorunlu mu? E-ticaret Uyumluluk Rehberi",
    excerpt: "ETBIS kaydi, e-ticaret bilgi sistemi yukumlulukleri, pazaryeri işletmeleri ve dijital satis yapan firmalar icin temel kurallari anlatiyoruz.",
    tag: "Yasal",
    focus: "ETBIS kaydi pazaryeri icin zorunlu mu",
    audience: "e-ticaret ve pazaryeri sitesi kuran sirketler",
    intent: "yasal uyumluluk adimlarini belirlemek",
    modules: ["ETBIS", "ticari bilgi", "sozlesme", "KVKK", "iletisim", "raporlama"],
    integrations: ["e-fatura", "muhasebe", "odeme", "admin panel", "log", "bildirim"],
    revenue: ["yasal uyum", "musteri guveni", "risk azalmasi", "kurumsal algi"],
    sortOrder: 68,
    colorA: "#64748B",
    colorB: "#334155"
  },
  {
    slug: "pazaryeri-kvkk-yukumlulukleri",
    title: "Pazaryeri KVKK Yukumlulukleri: Kullanici, Satici ve Odeme Verileri",
    excerpt: "Pazaryeri sitelerinde KVKK acisindan kullanici verisi, satici evraki, odeme bilgisi, cerezler ve aydinlatma metinleri nasil yonetilir?",
    tag: "Yasal",
    focus: "pazaryeri KVKK yukumlulukleri",
    audience: "kullanici ve satici verisi isleyen pazaryeri sahipleri",
    intent: "veri koruma ve guvenlik gereksinimlerini anlamak",
    modules: ["aydinlatma metni", "acik riza", "cerez", "veri saklama", "yetki", "log"],
    integrations: ["odeme", "e-posta", "SMS", "analytics", "CRM", "admin panel"],
    revenue: ["guven", "uyumluluk", "risk azalmasi", "kurumsal itibar"],
    sortOrder: 69,
    colorA: "#1E40AF",
    colorB: "#172554"
  },
  {
    slug: "mesafeli-satis-sozlesmesi-pazaryeri-modeli",
    title: "Mesafeli Satis Sozlesmesi Pazaryeri Modelinde Nasil Hazirlanir?",
    excerpt: "Pazaryeri modelinde mesafeli satis sozlesmesi, on bilgilendirme formu, satici sorumlulugu ve platform rolu nasil kurgulanir?",
    tag: "Yasal",
    focus: "mesafeli satis sozlesmesi pazaryeri modeli",
    audience: "B2C ve C2C pazaryeri kuran ekipler",
    intent: "sozlesme ve on bilgilendirme akisini dogru kurmak",
    modules: ["sozlesme", "on bilgilendirme", "siparis", "iade", "satici", "musteri paneli"],
    integrations: ["e-fatura", "odeme", "admin panel", "e-posta", "PDF", "log"],
    revenue: ["yasal koruma", "iade disiplini", "musteri guveni", "operasyon netligi"],
    sortOrder: 70,
    colorA: "#7F1D1D",
    colorB: "#991B1B"
  },
  {
    slug: "cok-saticili-pazaryerinde-fatura-nasil-kesilir",
    title: "Cok Saticili Pazaryerinde Fatura Nasil Kesilir? Satici, Platform ve Musteri Akisi",
    excerpt: "Cok saticili pazaryerlerinde fatura kesme sorumlulugu, komisyon faturasi, e-arsiv ve muhasebe entegrasyonu nasil calisir?",
    tag: "Yasal",
    focus: "cok saticili pazaryerinde fatura nasil kesilir",
    audience: "marketplace finans ve muhasebe surecini planlayan ekipler",
    intent: "faturalama ve komisyon muhasebesini anlamak",
    modules: ["satis faturasi", "komisyon faturasi", "e-arsiv", "iade", "hak edis", "mutabakat"],
    integrations: ["KolaySoft", "Paraşut", "Logo", "Mikro", "Iyzico", "PayTR"],
    revenue: ["muhasebe otomasyonu", "komisyon takibi", "yasal uyum", "finans kontrolu"],
    sortOrder: 71,
    colorA: "#B91C1C",
    colorB: "#7F1D1D"
  }
];

const footerLinks = [
  ["solutions", "Çözümler", "B2B Bayi Portalı", "/b2b", 1],
  ["solutions", "Çözümler", "B2C E-ticaret Sitesi", "/b2c", 2],
  ["solutions", "Çözümler", "C2C Pazaryeri", "/c2c", 3],
  ["solutions", "Çözümler", "Pazaryeri Sitesi Kurmak", "/blog/pazaryeri-sitesi-nasil-kurulur", 8],
  ["integrations", "Entegrasyonlar", "ERP Entegrasyonlu Pazaryeri", "/blog/erp-entegrasyonlu-pazaryeri-yazilimi", 20],
  ["integrations", "Entegrasyonlar", "Logo ERP Entegrasyonu", "/blog/logo-erp-entegrasyonlu-e-ticaret-sitesi", 21],
  ["integrations", "Entegrasyonlar", "Parasut Entegrasyonu", "/blog/parasut-entegrasyonlu-e-ticaret-altyapisi", 22],
  ["integrations", "Entegrasyonlar", "Iyzico Marketplace", "/blog/iyzico-marketplace-odeme-sistemi-nasil-calisir", 23],
  ["integrations", "Entegrasyonlar", "PayTR Pazaryeri Ödeme", "/blog/paytr-pazaryeri-odeme-entegrasyonu", 24],
  ["integrations", "Entegrasyonlar", "Kargo Entegrasyonları", "/blog/kargo-entegrasyonlu-pazaryeri-sitesi", 25],
  ["integrations", "Entegrasyonlar", "Tüm Entegrasyonlar", "/entegrasyonlar", 26],
  ["guides", "Rehberler", "Pazaryeri Maliyeti 2026", "/blog/pazaryeri-sitesi-kurma-maliyeti-2026", 40],
  ["guides", "Rehberler", "Çok Satıcılı Yazılım Fiyatları", "/blog/cok-saticili-pazaryeri-yazilimi-fiyatlari", 41],
  ["guides", "Rehberler", "Hazır mı Özel Yazılım mı?", "/blog/hazir-pazaryeri-yazilimi-mi-ozel-yazilim-mi", 42],
  ["guides", "Rehberler", "Bayi Fiyat Listesi", "/blog/bayi-fiyat-listesi-yonetimi-nasil-calisir", 43],
  ["guides", "Rehberler", "Satıcı Komisyon Sistemi", "/blog/satici-komisyon-sistemi-nasil-kurulur", 44],
  ["guides", "Rehberler", "Marketplace Hakediş", "/blog/marketplace-hak-edis-sistemi-nedir", 45],
  ["guides", "Rehberler", "Pazaryeri Yasal Rehber", "/blog/pazaryeri-kurmak-icin-sirket-gerekir-mi", 46],
  ["company", "Şirket", "Hakkımızda", "/hakkimizda", 60],
  ["company", "Şirket", "Kariyer", "/kariyer", 61],
  ["company", "Şirket", "Paketler", "/paketler", 62],
  ["company", "Şirket", "Sık Sorulan Sorular", "/sik-sorulan-sorular", 63],
  ["company", "Şirket", "Blog", "/blog", 64],
  ["company", "Şirket", "Teklif Al", "/teklif-al", 65],
  ["legal", "Yasal", "Gizlilik Politikası", "/gizlilik-politikasi", 80],
  ["legal", "Yasal", "Kullanım Sözleşmesi", "/kullanim-sozlesmesi", 81],
  ["legal", "Yasal", "KVKK Aydınlatma Metni", "/kvkk-aydinlatma-metni", 82],
  ["legal", "Yasal", "Çerez Politikası", "/cerez-politikasi", 83],
  ["legal", "Yasal", "KVKK Yükümlülükleri", "/kvkk-yukumlulukleri", 84]
] as const;

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function coverSvg(post: SeoPost, logoDataUri: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <title>${escapeXml(post.title)}</title>
  <rect width="1200" height="675" fill="#ffffff"/>
  <rect x="1" y="1" width="1198" height="673" rx="28" fill="none" stroke="#E5E7EB" stroke-width="2"/>
  <image href="${logoDataUri}" x="260" y="238" width="680" height="199" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
}

function article(post: SeoPost) {
  const moduleList = post.modules.map((m) => `- ${m}`).join("\n");
  const integrationList = post.integrations.map((i) => `- ${i}`).join("\n");
  const revenueList = post.revenue.map((r) => `- ${r}`).join("\n");

  return [
    `## ${post.title}`,
    `${post.focus} aramasi yapan kullanicinin asil niyeti genellikle sadece bilgi almak degil, uygulanabilir bir yol haritasi cikarmaktir. Bu nedenle bu rehberde konuyu yalnizca tanim seviyesinde birakmiyoruz; kapsam, teknik altyapi, operasyon, entegrasyon, maliyet kalemleri ve canliya gecis adimlariyla birlikte ele aliyoruz. ${post.audience} icin dogru planlama yapildiginda pazaryeri veya e-ticaret projesi yalnizca vitrin sayfalarindan ibaret kalmaz; satis, siparis, odeme, kargo, fatura, raporlama ve musteri deneyimini tek merkezde yoneten bir is sistemine donusur.`,
    `## Arama Niyeti ve Hedef Kitle`,
    `Bu konudaki arama niyeti: ${post.intent}. Kullanici genellikle hangi modullerin zorunlu oldugunu, hangi entegrasyonlarin gerektigini, ne kadar butce ayrilmasi gerektigini ve hazir altyapi ile ozel yazilim arasindaki farki anlamak ister. ${post.focus} konusunda basarili bir proje cikarmak icin ilk adim hedef kitleyi netlestirmektir. B2B modelde bayi, tedarikci ve kurumsal alici; B2C modelde son kullanici; C2C modelde ise hem bireysel satici hem de alici deneyimi birlikte tasarlanmalidir.`,
    `## Temel Moduller`,
    `${post.focus} icin moduller proje kapsamini belirleyen en kritik unsurdur. Baslangic asamasinda her seyi ayni anda yapmak yerine, MVP kapsamindaki zorunlu modulleri secmek daha dogru olur. Bu konuda one cikan moduller sunlardir:\n\n${moduleList}\n\nBu moduller yalnizca ekranda gorunen alanlar degildir. Her modulun arkasinda veri modeli, yetki yapisi, admin panel, loglama, hata yonetimi, raporlama ve SEO etkisi bulunur. Ornegin satici paneli sadece urun ekleme ekrani degildir; evrak onayi, magaza performansi, siparis cevaplama, iade sureci, hak edis raporu ve destek taleplerini de kapsayabilir.`,
    `## Entegrasyonlar`,
    `Entegrasyon ihtiyaci, projenin gercek operasyona baglandigi noktadir. Sadece vitrin sitesi kurmak kolaydir; fakat stok, fiyat, siparis, odeme, kargo ve fatura akislari dogru calismadiginda operasyon hizla dagilir. Bu konuda sik karsilasilan entegrasyonlar sunlardir:\n\n${integrationList}\n\nEntegrasyonlar tek seferlik baglanti gibi dusunulmemelidir. Her entegrasyon icin yetkilendirme, hata logu, yeniden deneme mekanizmasi, manuel mudahale ekrani ve raporlama katmani planlanmalidir. Ozellikle ERP ve odeme entegrasyonlarinda test senaryolari canliya gecisten once ayrintili olarak denenmelidir.`,
    `## Admin Panel ve Icerik Yonetimi`,
    `Basarili bir ${post.focus} projesinde admin panel yalnizca kayit listeleme ekrani olmamalidir. Urun, kategori, marka, satici, bayi, musteri, siparis, teklif, odeme, kargo, komisyon, blog, SEO meta alanlari, kampanya, banner, SSS ve yasal sayfalar admin panelden yonetilebilir olmalidir. Bu sayede teknik ekibe bagimli kalmadan icerik guncellemesi yapilir, SEO sayfalari gelistirilir ve kampanya donemlerinde hizli aksiyon alinir.`,
    `## SEO Stratejisi`,
    `${post.focus} sayfasi SEO acisindan sadece tek bir anahtar kelimeye odaklanmamalidir. Ana kelimenin yaninda maliyet, nasil kurulur, fiyat, entegrasyon, alternatif, sektor ve yasal konulari destekleyen ic linkleme yapisi kurulmalidir. Blog yazilari, kategori landing page'leri, SSS bloklari, schema.org isaretlemeleri, okunabilir URL yapisi ve hizli mobil deneyim organik performansi guclendirir. Iceriklerin admin panelden guncellenebilir olmasi, zaman icinde yeni anahtar kelimeleri hedeflemeyi kolaylastirir.`,
    `## Maliyet ve Fazlandirma`,
    `Bu tur projelerde maliyet en cok kapsam, entegrasyon sayisi, mobil uygulama ihtiyaci, ozel is kurallari, veri aktarimi ve tasarim kalitesine gore degisir. En saglikli yaklasim projeyi fazlara ayirmaktir: ilk fazda temel katalog, kullanici rolleri, siparis ve odeme akisi; ikinci fazda ERP, kargo, e-fatura ve raporlama; ucuncu fazda mobil uygulama, gelismis kampanya ve otomasyonlar devreye alinabilir. Boylece ilk canliya gecis suresi kisalir ve yatirim riski azalir.`,
    `## Gelir ve Geri Donus Modeli`,
    `${post.focus} yatiriminda gelir veya operasyonel geri donus yalnizca yazilimdan degil, dogru is modelinden gelir. Bu konuda one cikan geri donus kalemleri sunlardir:\n\n${revenueList}\n\nPazaryeri modelinde komisyon, abonelik, reklam ve one cikarma gelirleri; B2B modelde operasyon tasarrufu, siparis hizi ve hata azalmasi; B2C modelde organik trafik, tekrar satin alma ve marka kontrolu on plana cikar.`,
    `## i-Pazaryeri ile Nasil Planlanir?`,
    `i-Pazaryeri yaklasimi, sifirdan her seyi yeniden yazmak yerine calisan bir cekirdek altyapiyi is modelinize uyarlamaya dayanir. B2B bayi portali, B2C online magaza veya C2C cok saticili pazaryeri olarak baslanabilir; ihtiyac arttikca ERP, kargo, odeme, mobil uygulama, multichannel ve raporlama modulleri eklenebilir. Bu yapi hem hizli baslangic hem de uzun vadeli olceklenebilirlik saglar.`,
    `## Sonuc`,
    `${post.focus} konusunda basarili olmak icin sadece guzel bir arayuz yeterli degildir. Dogru veri modeli, yonetilebilir admin panel, guvenilir entegrasyonlar, SEO uyumlu icerik yapisi, olceklenebilir altyapi ve net operasyon surecleri birlikte kurgulanmalidir. Projenizin kapsamini netlestirmek, hangi modullerle baslayacaginizi belirlemek ve maliyeti fazlara bolmek icin i-Pazaryeri ekibiyle 30 dakikalik bir analiz gorusmesi planlayabilirsiniz.`
  ].join("\n\n");
}

async function main() {
  const blogDir = join(process.cwd(), "public", "uploads", "blog");
  const logoDataUri = `data:image/png;base64,${readFileSync(join(process.cwd(), "public", "logo.png")).toString("base64")}`;
  mkdirSync(blogDir, { recursive: true });

  for (const post of posts) {
    const coverFilename = `${post.slug}.svg`;
    writeFileSync(join(blogDir, coverFilename), coverSvg(post, logoDataUri));
    const content = article(post);
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content,
        coverImage: `/uploads/blog/${coverFilename}`,
        tag: post.tag,
        isPublished: true,
        isFeatured: post.isFeatured ?? false,
        sortOrder: post.sortOrder,
        seoTitle: post.title,
        seoDescription: post.excerpt
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content,
        coverImage: `/uploads/blog/${coverFilename}`,
        tag: post.tag,
        isPublished: true,
        isFeatured: post.isFeatured ?? false,
        sortOrder: post.sortOrder,
        seoTitle: post.title,
        seoDescription: post.excerpt
      }
    });
  }

  for (const filename of readdirSync(blogDir).filter((file) => file.endsWith(".svg"))) {
    const slug = filename.replace(/\.svg$/, "");
    writeFileSync(join(blogDir, filename), coverSvg({ ...posts[0], slug, title: "i-Pazaryeri" }, logoDataUri));
  }

  for (const [groupSlug, groupLabel, label, href, sortOrder] of footerLinks) {
    const id = `footer-${groupSlug}-${sortOrder}`;
    await prisma.footerLink.upsert({
      where: { id },
      update: { groupSlug, groupLabel, label, href, isPublished: true, sortOrder },
      create: { id, groupSlug, groupLabel, label, href, isPublished: true, sortOrder }
    });
  }

  await prisma.$disconnect();
  console.log(`Seeded ${posts.length} SEO posts and ${footerLinks.length} footer links.`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
