import { prisma } from "../src/lib/db";


const sectors = [
  ["dermokozmetik-eczane", "Dermokozmetik / Eczane", "Eczane, dermokozmetik marka ve distribütörleri için kontrollü B2B sipariş deneyimi.", "#0f8ea8"],
  ["hirdavat-nalbur", "Hırdavat / Nalbur", "Geniş ürün katalogları, bayi fiyat listeleri ve stok odaklı sipariş yönetimi.", "#f59e0b"],
  ["bijuteri-aksesuar", "Bijuteri / Aksesuar", "Varyant, koli, minimum sipariş ve perakendeci ağı olan aksesuar markaları için.", "#e11d48"],
  ["kirtasiye-ofis", "Kırtasiye / Ofis ürünleri", "Kurumsal alıcı, bayi ve toptancı siparişlerini tek panelden yönetmek için.", "#2563eb"],
  ["toptan-ticaret", "Toptan ticaret / Distribütörlük", "Tekrarlı sipariş, cari hesap ve bayi fiyat listeleriyle çalışan ticaret ağları için.", "#16a34a"],
  ["bayi-agi", "Bayi ağı olan markalar", "Bayi portalı, teklif, sipariş ve tahsilat akışlarını dijitalleştirmek isteyen markalar için.", "#7c3aed"]
];

const features: Array<[string, string, string, string, string, string]> = [
  ["bayi-uye-yonetimi", "Bayi / Üye Yönetimi", "Users", "Kullanıcı ve rol", "Bayi, tedarikçi ve kurumsal alıcıları rollere göre yönetin.", "/uploads/services/bayi-uye-yonetimi.png"],
  ["urun-katalog", "Ürün ve Katalog", "Boxes", "Katalog", "Kategori, marka, varyant ve ürün detaylarını düzenli yayınlayın.", "/uploads/services/urun-katalog.png"],
  ["fiyat-listeleri", "Fiyat Listeleri", "BadgePercent", "Ticari kurallar", "Bayiye, gruba veya sektöre özel fiyat ve iskonto kurgulayın.", "/uploads/services/fiyat-listeleri.png"],
  ["teklif-siparis", "Teklif ve Sipariş", "FileCheck", "Satış akışı", "Teklif, sepet, sipariş onayı ve tekrar sipariş akışlarını yönetin.", "/uploads/services/teklif-siparis.png"],
  ["cari-stok", "Cari ve Stok", "Database", "Operasyon", "Cari hesap, stok görünürlüğü ve operasyon takiplerini merkezileştirin.", "/uploads/services/cari-stok.png"],
  ["entegrasyon", "ERP Entegrasyonları", "Cable", "Entegrasyon", "ERP, muhasebe, ödeme ve kargo sistemleriyle entegre ilerleyin.", "/uploads/services/entegrasyon.png"]
];

const solutionCards = [
  {
    slug: "kod-yapisi",
    question: "Kod yapımız neye dayanıyor?",
    answer:
      "Laravel 12 API, Sanctum yetkilendirme, React ön yüz ve Filament yönetim paneliyle modüler bir B2B pazaryeri çekirdeği kullanıyoruz. Queue, zamanlanmış görevler ve log yapısı canlı operasyon için hazır gelir.",
    proof: "i-Hırdavat, i-Kırtasiye ve i-Depo projelerinde aynı backend çekirdeği; ürün, sipariş, teklif, iade, fatura, bildirim ve raporlama modelleriyle çalışıyor.",
    brands: "Laravel 12\nSanctum\nReact\nFilament\nScout\nMeilisearch\nSentry",
    icon: "Code2",
    visualImage: "/uploads/services/entegrasyon.png",
    visualAccent: "#B87333",
    sortOrder: 1
  },
  {
    slug: "erp-muhasebe",
    question: "ERP ve muhasebe nasıl bağlanıyor?",
    answer:
      "ERP bağlantıları yalnızca admin için değil, kullanıcı, bayi veya satıcı bazında yönetilebilir. Her kullanıcının entegrasyon anahtarları ayrı tutulur; ürün, sipariş ve fatura senkronizasyonu periyodik çalışır.",
    proof: "UserIntegration yapısı, ürün çekme, sistem şemasına map etme, bağlantı testi, sipariş senkronu ve fatura oluşturma adımlarını destekler. erp:sync-all görevi 30 dakikada bir çalışacak şekilde kurgulanmıştır.",
    brands: "Entegra\nBizimHesap\nParaşüt\nSentos\nStockMount\nDopigo\nKolaySoft",
    icon: "Cable",
    visualImage: "/uploads/services/cari-stok.png",
    visualAccent: "#2F6B4F",
    sortOrder: 2
  },
  {
    slug: "kargo-sureci",
    question: "Kargo süreci nasıl çözülüyor?",
    answer:
      "Kargo hesaplama, seçenek listeleme, gönderi oluşturma, takip, etiket üretimi ve satıcı kargo ayarları aynı akışta yönetilir. Sektöre göre farklı taşıyıcılar aktif edilebilir.",
    proof: "ShippingManager yapısı her kargo markasını ortak arayüzle bağlar; sipariş detayından kargo oluşturma, takip ve etiket alma ekranları aynı altyapıdan beslenir.",
    brands: "Aras Kargo\nYurtiçi Kargo\nMNG Kargo\nSürat Kargo\nPTT Kargo\nHepsijet\nSendeo\nKolay Gelsin\nNavlungo",
    icon: "Truck",
    visualImage: "/uploads/services/teklif-siparis.png",
    visualAccent: "#B87333",
    sortOrder: 3
  },
  {
    slug: "odeme-komisyon",
    question: "Ödeme ve komisyon nasıl işliyor?",
    answer:
      "Taksit, iade, satıcıya transfer, cüzdan, hakediş, ödeme talebi ve komisyon ayarları platform sahibinin kontrolünde çalışır. Her işlem yönetim panelinde raporlanabilir.",
    proof: "PaymentManager, ödeme sağlayıcıları, satıcı transferleri, wallet hareketleri, payout request ve settlement PDF akışlarıyla canlı operasyonu uçtan uca yönetir.",
    brands: "Iyzico\nPayTR\nCüzdan\nHakediş\nKomisyon\nTaksit\nİade",
    icon: "WalletCards",
    visualImage: "/uploads/services/fiyat-listeleri.png",
    visualAccent: "#2F6B4F",
    sortOrder: 4
  },
  {
    slug: "iletisim-destek",
    question: "İletişim ve destek nasıl sağlanıyor?",
    answer:
      "Sipariş, ödeme, iade, onay ve destek süreçleri için e-posta, uygulama içi bildirim, push notification ve destek talebi yapıları hazır gelir.",
    proof: "Kullanıcı bildirimleri, okunmamış sayısı, Firebase push, destek ticket mesajları ve SMS ayarları aynı yönetim disiplinine bağlanır.",
    brands: "E-posta\nFirebase Push\nBildirim Merkezi\nDestek Ticket\nSMS Ayarları",
    icon: "MessagesSquare",
    visualImage: "/uploads/services/bayi-uye-yonetimi.png",
    visualAccent: "#B87333",
    sortOrder: 5
  },
  {
    slug: "admin-panel",
    question: "Admin panelde neleri yönetiyoruz?",
    answer:
      "Ürün, kategori, marka, sipariş, teklif, kampanya, banner, blog, sayfa, kullanıcı, satıcı evrakı, ödeme, kargo, komisyon, finans ve SEO içerikleri tek panelden yönetilir.",
    proof: "Filament kaynakları ve özel panel sayfaları; finans raporları, ürün içe aktarma, sistem logları, site ayarları ve sözleşme yönetimini kapsar.",
    brands: "Filament Admin\nÜrün Yönetimi\nSipariş Yönetimi\nFinans Raporları\nSEO İçerikleri\nSistem Logları",
    icon: "LayoutDashboard",
    visualImage: "/uploads/services/urun-katalog.png",
    visualAccent: "#2F6B4F",
    sortOrder: 6
  },
  {
    slug: "sektorel-dogrulama",
    question: "Sektöre özel doğrulama yapılır mı?",
    answer:
      "Evet. Projeye göre GLN, vergi numarası, bayi onayı, satıcı evrakı ve rol bazlı yetkilendirme süreçleri eklenebilir. Böylece kapalı B2B ağları kontrollü büyür.",
    proof: "i-Depo tarafında GLN doğrulama; i-Kırtasiye tarafında vergi no whitelist yapısı, onay ve rol kontrolleriyle birlikte kullanılır.",
    brands: "GLN Doğrulama\nVergi No Whitelist\nBayi Onayı\nSatıcı Evrakı\nRol Bazlı Yetki",
    icon: "ShieldCheck",
    visualImage: "/uploads/services/bayi-uye-yonetimi.png",
    visualAccent: "#B87333",
    sortOrder: 7
  },
  {
    slug: "urun-arama-performansi",
    question: "Ürün ve arama performansı nasıl?",
    answer:
      "Geniş kataloglarda Excel içe aktarma, barkod, kategori, marka, filtre ve hızlı arama yapılarıyla ürün operasyonu ölçeklenebilir tutulur.",
    proof: "Maatwebsite Excel, Scout ve Meilisearch kullanımı; ürün senkronizasyonu, kategori/marka yönetimi ve filtreli listeleme ihtiyaçlarını tek çekirdekte toplar.",
    brands: "Excel Import\nBarkod\nKategori\nMarka\nFiltre\nMeilisearch",
    icon: "Search",
    visualImage: "/uploads/services/urun-katalog.png",
    visualAccent: "#2F6B4F",
    sortOrder: 8
  }
];

const testimonials = [
  {
    quote:
      "Üç ay önce bayilerimizden gelen siparişler hâlâ Excel ve WhatsApp'taydı. Bugün 800+ bayi sipariş için mobil uygulamayı açıyor. Stok hatası neredeyse sıfır.",
    authorName: "Ali Demir",
    authorRole: "Genel Müdür",
    authorMeta: "Demir Hırdavat · i-Hırdavat müşterisi · 2:14",
    rating: 5,
    metric1Label: "Sipariş hatası",
    metric1Value: "−%92",
    metric2Label: "Sipariş hızı",
    metric2Value: "×4.2",
    metric3Label: "Geri ödeme",
    metric3Value: "11 ay",
    isFeatured: true,
    sortOrder: 1
  }
];

const homeItems: Array<[string, string, string, string, number]> = [
  ["problem", "Siparişler WhatsApp ve Excel'de dağılıyor", "Bayi talepleri, stok bilgisi ve onay süreçleri farklı kanallara bölündüğünde operasyon yavaşlar.", "MessageSquare", 1],
  ["problem", "Bayiye özel fiyat ve iskonto yönetimi zorlaşıyor", "Farklı müşteri grupları için fiyat listelerini manuel yürütmek hata ve gecikme üretir.", "BadgePercent", 2],
  ["problem", "ERP, stok ve cari bilgiler sahaya geç yansıyor", "Satış ekibi ve bayiler güncel bilgiye ulaşamadığında sipariş kalitesi düşer.", "Database", 3],
  ["process", "Keşif", "İş modelinizi, bayi ağınızı, entegrasyonları ve öncelikli modülleri birlikte netleştiririz.", "Search", 1],
  ["process", "Kapsam", "Başlangıç için gerekli modülleri ve canlıya geçiş planını belirleriz.", "ListChecks", 2],
  ["process", "Uyarlama", "Arayüz, veri, rol ve entegrasyon ihtiyaçlarını altyapıya işleriz.", "Settings2", 3],
  ["process", "Yayın", "Test, eğitim ve canlıya geçiş adımlarını kontrollü tamamlarız.", "Rocket", 4],
  ["reason", "Kanıtlanmış çekirdek", "Farklı sektörlerde çalışan örneklerden gelen hazır bir B2B altyapısı ile başlarsınız.", "ShieldCheck", 1],
  ["reason", "Daha düşük geliştirme riski", "Sıfırdan yazılım yerine ürüne dönüşmüş modülleri iş kurallarınıza uyarlarız.", "Gauge", 2],
  ["reason", "Modüler büyüme", "İlk canlıya geçişten sonra entegrasyon, rapor ve otomasyonları aşamalı genişletebilirsiniz.", "Layers3", 3]
];

const packages = [
  {
    slug: "baslangic",
    name: "Başlangıç",
    tagline: "B2B sipariş akışını hızlıca dijitale taşımak isteyen ekipler için.",
    description: "Temel katalog, bayi girişi ve teklif/sipariş akışıyla kontrollü bir ilk canlıya geçiş sağlar.",
    audience: "Bayi siparişlerini WhatsApp ve Excel'den portala taşımak isteyen işletmeler",
    priceLabel: "Başlangıç fiyatı",
    price: "₺45.000",
    pricePeriod: "tek seferlik kurulum",
    priceNote: "KDV hariç örnek başlangıç fiyatıdır.",
    ctaLabel: "Başlangıç kapsamını konuşalım",
    ctaHref: "/teklif-al",
    sortOrder: 1
  },
  {
    slug: "profesyonel",
    name: "Profesyonel",
    tagline: "Fiyat listeleri, stok görünürlüğü ve raporlama isteyen büyüyen ağlar için.",
    description: "Bayi grupları, ticari kurallar, cari/stok görünürlüğü ve temel entegrasyonlarla operasyonu merkezileştirir.",
    audience: "Birden çok bayi grubu, ürün ağacı ve entegrasyon ihtiyacı olan firmalar",
    priceLabel: "Profesyonel kapsam",
    price: "₺85.000",
    pricePeriod: "proje bazlı",
    priceNote: "Entegrasyon kapsamına göre revize edilir.",
    ctaLabel: "Profesyonel kapsamı inceleyelim",
    ctaHref: "/teklif-al",
    isFeatured: true,
    sortOrder: 2
  },
  {
    slug: "kurumsal",
    name: "Kurumsal",
    tagline: "ERP/API entegrasyonu ve özel iş kuralları olan büyük yapılar için.",
    description: "Çoklu rol, özel onay süreçleri, ileri entegrasyonlar, eğitim ve destek kapsamıyla kurumsal yayına hazırlanır.",
    audience: "Dağıtım, üretim veya çok kanallı toptan ticaret operasyonları",
    priceLabel: "Kurumsal kapsam",
    price: "Teklif ile",
    pricePeriod: "keşif sonrası",
    priceNote: "ERP, kargo, ödeme ve özel iş kuralları analiz edilir.",
    ctaLabel: "Kurumsal keşif planla",
    ctaHref: "/teklif-al",
    sortOrder: 3
  }
];

const packageFeatures: Array<[string, string, string, string, number]> = [
  ["baslangic", "Katalog", "Temel ürün/kategori yayını", "Modüller", 1],
  ["baslangic", "Bayi girişi", "Tek rol ve temel bayi paneli", "Modüller", 2],
  ["baslangic", "Sipariş", "Teklif ve sipariş talebi", "Modüller", 3],
  ["baslangic", "Destek", "Canlıya geçiş eğitimi", "Hizmet", 4],
  ["profesyonel", "Katalog", "Varyant, marka ve gelişmiş filtreler", "Modüller", 1],
  ["profesyonel", "Fiyat listeleri", "Bayi grubu ve iskonto yönetimi", "Modüller", 2],
  ["profesyonel", "Stok / cari", "Görünürlük ve operasyon raporları", "Modüller", 3],
  ["profesyonel", "Entegrasyon", "Temel ERP veya muhasebe bağlantısı", "Hizmet", 4],
  ["kurumsal", "Rol yapısı", "Bayi, tedarikçi, yönetici ve özel roller", "Modüller", 1],
  ["kurumsal", "İş kuralları", "Özel onay ve sipariş senaryoları", "Modüller", 2],
  ["kurumsal", "API / ERP", "Çift yönlü veri akışı ve özel entegrasyonlar", "Hizmet", 3],
  ["kurumsal", "Destek", "Yayın sonrası iyileştirme ve eğitim planı", "Hizmet", 4]
];

const faqCategories: Array<{
  slug: string;
  title: string;
  description: string;
  sortOrder: number;
  items: Array<[string, string, boolean, number]>;
}> = [
  {
    slug: "kurulum-sure",
    title: "Kurulum ve süre",
    description: "Canlıya geçiş planı, veri hazırlığı ve teslimat adımları.",
    sortOrder: 1,
    items: [
      ["B2B pazaryeri ne kadar sürede yayına alınır?", "Kapsama göre değişir. Temel bir bayi sipariş portalı haftalar içinde hazırlanabilir; ERP entegrasyonu ve özel iş kuralları olan yapılarda önce keşif ve kapsam çalışması yapılır.", true, 1],
      ["Kurulumdan önce bizden hangi bilgiler istenir?", "Ürün/kategori yapısı, bayi grupları, fiyat listeleri, mevcut sipariş akışı, entegrasyon ihtiyaçları ve canlıya geçiş öncelikleri istenir.", false, 2],
      ["Mevcut bayi sipariş akışımız sisteme taşınabilir mi?", "Evet. WhatsApp, Excel, telefon veya saha ekibiyle ilerleyen sipariş akışı analiz edilir; bayi rolü, onay adımı, minimum sipariş, fiyat listesi ve tekrar sipariş senaryoları sisteme uyarlanır.", true, 3],
      ["Sistem sadece B2B için mi kullanılır?", "Ana odağımız B2B pazaryeri ve bayi portalıdır. Ancak aynı çekirdek altyapı, iş modeline göre B2C veya C2C akışlarını destekleyecek şekilde genişletilebilir.", false, 4],
      ["Mobil uyumlu çalışır mı?", "Evet. Public sayfalar, bayi sipariş akışı ve yönetim ihtiyaçları mobil uyumlu tasarlanır. Proje kapsamına göre ayrıca mobil uygulama veya PWA planı çıkarılabilir.", false, 5]
    ]
  },
  {
    slug: "maliyet-kapsam",
    title: "Maliyet ve kapsam",
    description: "Paket seçimi, modül kapsamı ve tekliflendirme yaklaşımı.",
    sortOrder: 2,
    items: [
      ["Tüm servisleri almak zorunda mıyız?", "Hayır. İhtiyacınız olan modüllerle başlanır; entegrasyon, rapor veya otomasyonlar sonraki fazlarda eklenebilir.", true, 1],
      ["Hazır paket mi, özel yazılım mı?", "Çekirdek altyapı hazırdır; iş modelinize göre rol, veri, ekran ve entegrasyon uyarlamaları yapılır. Bu yaklaşım sıfırdan geliştirmeye göre riski azaltır.", true, 2],
      ["Kaynak kod ve özelleştirme durumu nedir?", "Proje modeline göre kapsam belirlenir. Hazır çekirdek üzerinde marka, rol, ekran, entegrasyon ve iş kuralı özelleştirmeleri yapılabilir; kaynak kod ve bakım koşulları teklif aşamasında netleştirilir.", false, 3],
      ["Fiyatlandırma nasıl belirlenir?", "Kullanıcı rolleri, ürün sayısı, entegrasyon sayısı, ödeme/kargo kapsamı, özel panel ihtiyaçları ve yayın sonrası destek seviyesi fiyatı belirler.", false, 4],
      ["Önce küçük başlayıp sonra büyüyebilir miyiz?", "Evet. İlk fazda katalog, bayi girişi ve sipariş akışıyla yayına çıkıp; sonraki fazlarda ERP, kargo, ödeme, rapor ve mobil uygulama adımları eklenebilir.", false, 5]
    ]
  },
  {
    slug: "entegrasyon-veri",
    title: "ERP, entegrasyon ve veri",
    description: "Stok, cari, fiyat ve sipariş verilerinin mevcut sistemlerle ilişkisi.",
    sortOrder: 3,
    items: [
      ["ERP entegrasyonu yapılabilir mi?", "Evet. Kullanılan ERP veya muhasebe sistemine göre ürün, stok, cari, fiyat ve sipariş akışları için entegrasyon kapsamı çıkarılır.", true, 1],
      ["Mevcut ürün ve bayi verileri aktarılır mı?", "Evet. Veri formatı incelenir, temizleme ve eşleştirme ihtiyacı belirlenir, ardından canlıya geçiş planına dahil edilir.", false, 2],
      ["Hangi ERP ve muhasebe sistemleri destekleniyor?", "Çekirdek yapıda Entegra, BizimHesap, Paraşüt, Sentos, StockMount, Dopigo ve KolaySoft gibi sağlayıcılara uygun entegrasyon yaklaşımı bulunur. Farklı bir ERP için API dokümanı üzerinden analiz yapılır.", true, 3],
      ["ERP bağlantısı sadece admin için mi çalışır?", "Hayır. UserIntegration yapısı sayesinde kullanıcı, bayi veya satıcı bazında farklı ERP bilgileri tutulabilir. Böylece farklı kullanıcıların kendi ürün, sipariş veya fatura akışları ayrıştırılabilir.", true, 4],
      ["Kargo firmaları sisteme bağlanabilir mi?", "Evet. Aras, Yurtiçi, MNG, Sürat, PTT, Hepsijet, Sendeo, Kolay Gelsin ve Navlungo gibi sağlayıcılar için hesaplama, gönderi oluşturma, takip ve etiket akışları kurgulanabilir.", true, 5],
      ["Ödeme ve komisyon sistemi var mı?", "Iyzico ve PayTR gibi ödeme sağlayıcılarıyla ödeme alma, iade, taksit, satıcı transferi, cüzdan, hakediş ve komisyon raporları proje kapsamına göre yönetilebilir.", false, 6]
    ]
  },
  {
    slug: "ozellestirme-destek",
    title: "Özelleştirme ve destek",
    description: "Arayüz, iş kuralları, eğitim ve yayın sonrası destek.",
    sortOrder: 4,
    items: [
      ["Site ön yüzü markamıza göre değişebilir mi?", "Evet. Public arayüz, bayi paneli ve temel kullanıcı deneyimi marka kimliğinize ve sektörünüzdeki kullanım alışkanlıklarına göre uyarlanabilir.", true, 1],
      ["Yayın sonrası destek veriliyor mu?", "Evet. Canlıya geçiş sonrası eğitim, hata düzeltme, iyileştirme ve yeni modül planları için destek süreci oluşturulur.", false, 2],
      ["Admin panelde neleri yönetebiliriz?", "Ürün, kategori, marka, sipariş, teklif, kampanya, banner, blog, sayfa, kullanıcı, satıcı evrakı, ödeme, kargo, komisyon, finans ve SEO içerikleri yönetilebilir.", true, 3],
      ["Sektöre özel doğrulama yapılabilir mi?", "Evet. i-Depo tarafındaki GLN doğrulama veya i-Kırtasiye tarafındaki vergi no whitelist yapısı gibi sektöre özel kontrol adımları eklenebilir.", false, 4],
      ["SEO altyapısı hazır mı?", "Evet. Okunabilir URL yapısı, meta alanları, blog, SSS, rehber içerikleri, hızlı sayfa yapısı ve yönetilebilir içerik bölümleri SEO stratejisini destekleyecek şekilde kurgulanır.", false, 5],
      ["Destek talepleri ve bildirimler nasıl çalışır?", "E-posta, uygulama içi bildirim, Firebase push, destek ticket mesajları ve SMS ayarları proje kapsamına göre devreye alınabilir.", false, 6]
    ]
  }
];

const offerServiceOptions: Array<[string, string, number]> = [
  ["Bayi / üye yönetimi", "bayi-uye-yonetimi", 1],
  ["Ürün ve katalog", "urun-katalog", 2],
  ["Fiyat listeleri", "fiyat-listeleri", 3],
  ["Teklif ve sipariş", "teklif-siparis", 4],
  ["Cari ve stok", "cari-stok", 5],
  ["ERP entegrasyonu", "erp-entegrasyonu", 6],
  ["Ödeme / kargo entegrasyonu", "odeme-kargo", 7],
  ["Raporlama ve bildirim", "raporlama-bildirim", 8]
];

const seoArticle = {
  id: "homepage-after-blog-main",
  placement: "homepage-after-blog",
  eyebrow: "Kapsamlı rehber",
  title: "B2B, B2C ve C2C ticaret altyapısı: ihtiyacınıza göre seçin, tek sistemde yönetin",
  intro:
    "Pazaryeri ya da e-ticaret altyapısı kurarken kritik soru genelde şudur: bayi ağına mı, doğrudan tüketiciye mi, çoklu satıcıya mı odaklanacaksınız? i-Pazaryeri her üç ticaret modelini de destekleyen ortak bir çekirdek altyapı sunar — bayi sipariş portalından, online mağazaya, multi-vendor pazaryerine kadar tek sistemde başlatın, büyüdükçe genişletin.",
  tableOfContents: [
    "1. Üç ticaret modeli, tek altyapı: B2B, B2C ve C2C",
    "1.1. B2B — bayi, tedarikçi ve kurumsal alıcı modeli",
    "1.2. B2C — markadan tüketiciye doğrudan satış",
    "1.3. C2C — çok satıcılı pazaryeri modeli",
    "2. Ortak çekirdek modüller",
    "2.1. Kullanıcı, rol ve yetkilendirme",
    "2.2. Ürün, varyant, fiyat ve stok yönetimi",
    "2.3. Sipariş, ödeme, kargo ve iade akışları",
    "2.4. ERP, muhasebe ve e-fatura entegrasyonları",
    "3. Modeli farklılaştıran iş kuralları",
    "4. Admin panel, raporlama ve operasyon kontrolü",
    "5. Multichannel: Trendyol, Hepsiburada, n11, Google Shopping",
    "6. SEO, içerik ve büyüme kanalları",
    "7. Hazır çekirdek + sektöre özel uyarlama yaklaşımı"
  ].join("\n"),
  content: [
    "1. Üç ticaret modeli, tek altyapı: B2B, B2C ve C2C",
    "Pazaryeri yazılımı tek bir kalıp değildir. Bayi ağına sipariş aldırmak, doğrudan tüketiciye satmak ve çoklu satıcıya alan açmak — bunların hepsi farklı ticari mantıkla çalışır ama ortak bir teknik omurga üstüne kurulabilir. i-Pazaryeri tam olarak bu yaklaşımı benimser: B2B, B2C ve C2C modellerini destekleyen aynı çekirdek altyapı, projenize göre yapılandırılır.",
    "Bu yaklaşım bir önemli avantaj sağlar: bugün B2B bayi portalı olarak başlayan bir sistem, ileride B2C online mağaza ekleyebilir; B2C mağaza zamanla diğer satıcıları da kabul ederek C2C pazaryerine dönüşebilir. Ayrı yazılım satın almanız gerekmez — model genişler, altyapı aynı kalır.",
    "1.1. B2B — bayi, tedarikçi ve kurumsal alıcı modeli",
    "B2B modelinde alıcılar tüketici değil; bayi, tedarikçi, distribütör veya kurumsal alıcıdır. Bu yapıda kapalı kullanıcı sistemi, davetli kayıt, GLN/vergi numarası doğrulama, bayi grupları, gruba özel fiyat listeleri, minimum sipariş tutarı, vade/cari hesap, sipariş onay akışları ve ERP'ye derin entegrasyon kritiktir. WhatsApp + Excel + telefon üçgeninde dağılan operasyon, dijital ve raporlanabilir bir kanala dönüşür.",
    "1.2. B2C — markadan tüketiciye doğrudan satış",
    "B2C modeli markanızın kendi online mağazasıdır. Açık kayıt, görsel ağırlıklı katalog, kampanya/kupon yönetimi, taksit, hızlı ödeme, kargo seçenekleri, iade-değişim akışı, üye paneli, sadakat programı, ürün yorumları ve mobil uygulama bu modelde öne çıkar. SEO, dönüşüm optimizasyonu, hız ve mobil deneyim doğrudan satışı etkiler. Multichannel köprüleri ile aynı katalog Trendyol, Hepsiburada, n11 ve Google Shopping gibi kanallara da yansıtılabilir.",
    "1.3. C2C — çok satıcılı pazaryeri modeli",
    "C2C (multi-vendor) modelinde sistem üzerinde sadece markanız değil, başka satıcılar da satış yapar. Bu durumda satıcı kayıt ve KYC akışı, evrak onayı, satıcı paneli, komisyon yapılandırması, hakediş ve cüzdan yönetimi, escrow ödeme, anlaşmazlık yönetimi, kargo etiketi üretimi ve performans/uyum raporlaması zorunludur. Trendyol/Hepsiburada/Etsy benzeri akışlar bu mimaride ele alınır.",
    "2. Ortak çekirdek modüller",
    "B2B, B2C ve C2C modellerinin yüzde 70-80'i aslında aynı modüllerden oluşur. Farklılık iş kurallarında ve hangi modülün öne çıkarıldığında ortaya çıkar. i-Pazaryeri altyapısı bu çekirdeği aynı disiplin altında yönetir.",
    "2.1. Kullanıcı, rol ve yetkilendirme",
    "Tüketici, üye, bayi, tedarikçi, satıcı, yönetici, operasyon ekibi, finans ekibi, saha temsilcisi gibi farklı roller tek sistem üzerinde tanımlanabilir. Her rolün göreceği ürün, fiyat, sipariş durumu, ödeme ekranı, rapor ve panel sekmesi ayrıştırılır. Bu yapı projeniz B2B'den B2C'ye, oradan C2C'ye geçtiğinde de yeniden yazım gerektirmez.",
    "2.2. Ürün, varyant, fiyat ve stok yönetimi",
    "Kategori, marka, varyant, barkod, görsel, açıklama ve teknik bilgi tek katalog yapısında tutulur. B2B'de bayi grubuna özel fiyat listeleri ve minimum sipariş kuralları; B2C'de kampanya, kupon ve dinamik fiyat; C2C'de satıcı bazlı fiyat ve stok aynı veri modeli üstünde yönetilir. Excel içe aktarma, toplu güncelleme ve ERP ürün senkronu büyük kataloglarda operasyon hızını korur.",
    "2.3. Sipariş, ödeme, kargo ve iade akışları",
    "Sipariş yaşam döngüsü tüm modellerde benzerdir: oluşturma → onay → hazırlık → kargo → teslim → iade/değişim. Modele göre değişen şey kuraldır: B2B'de cari/vade ile çalışılabilir, B2C'de çoğu sipariş anlık ödenir, C2C'de satıcıya transfer ve komisyon kesintisi gerekir. Iyzico, PayTR, BKM Express gibi ödeme sağlayıcıları ile taksit, iade, cüzdan ve marketplace ödeme dağıtımı çalışır.",
    "2.4. ERP, muhasebe ve e-fatura entegrasyonları",
    "Logo, Mikro, Netsis, Paraşüt, Entegra, Sentos, BizimHesap, KolaySoft gibi ERP/muhasebe sağlayıcıları ile ürün, stok, sipariş ve fatura akışları çift yönlü çalışır. UserIntegration yaklaşımıyla farklı satıcı veya bayilerin kendi ERP bağlantıları ayrıştırılabilir. e-Fatura ve e-Arşiv sağlayıcıları sipariş tamamlandığında otomatik tetiklenir.",
    "3. Modeli farklılaştıran iş kuralları",
    "B2B, B2C ve C2C arasındaki gerçek fark genelde teknik altyapıda değil, iş kurallarındadır: kim hangi ürünü görür, kime ne fiyat gösterilir, hangi sipariş hangi onaydan geçer, ödeme nasıl tahsil edilir, kargo etiketi kim adına basılır, gelir nasıl paylaşılır. i-Pazaryeri her modeli bu kuralların yapılandırıldığı bir konfigürasyon katmanıyla destekler.",
    "Bu yapı projenizin sektörel ihtiyacına göre çok daha esnek bir başlangıç sağlar. Aynı sistem, bir hırdavat firmasının B2B bayi portalı; bir kozmetik markasının B2C online mağazası; bir el yapımı ürün topluluğunun C2C pazaryeri olabilir.",
    "4. Admin panel, raporlama ve operasyon kontrolü",
    "Tek bir admin panel; ürün, kategori, marka, sipariş, kampanya, kupon, banner, blog, sayfa, kullanıcı, bayi/satıcı, firma, evrak, sistem logları, destek, fatura, kargo, ödeme ayarları, komisyon, finans raporları, SEO içerikleri gibi alanları yönetir. Operasyon ekibi siparişleri, ödemeleri, kargo süreçlerini ve entegrasyon hatalarını tek merkezden izleyebildiğinde pazaryeri büyüdükçe kontrol kaybı yaşanmaz.",
    "5. Multichannel: Trendyol, Hepsiburada, n11, Google Shopping",
    "Modeli ne olursa olsun çoğu işletme tek kanaldan yetinmez. i-Pazaryeri, Trendyol, Hepsiburada, n11, Amazon ve Google Shopping gibi pazaryerlerine ürün, fiyat, stok ve sipariş senkronu sağlar. Tek katalogla çoklu kanal — fiyat farklılaştırma, stok ortaklaştırma, kampanya yönetimi merkezi olarak yapılır.",
    "6. SEO, içerik ve büyüme kanalları",
    "B2C ve C2C modellerinde organik trafik kritik; B2B modelinde de potansiyel müşteri rehber içeriklerle sisteminize gelir. Okunabilir URL yapısı, hızlı sayfa açılışı, mobil uyum, schema.org markup, blog, SSS, kapsamlı rehber içerikleri ve taranabilir sayfa yapısı SEO'nun temelidir. i-Pazaryeri sitesindeki blog, SSS ve rehber alanları admin panelinden düzenlenebilir — sektörünüze uygun anahtar kelimeler, maliyet açıklamaları ve operasyon cevapları zamanla geliştirilebilir.",
    "7. Hazır çekirdek + sektöre özel uyarlama yaklaşımı",
    "Tamamen sıfırdan yazılım geliştirmek yüksek kontrol sağlar fakat süre ve maliyet riski taşır. Hazır paketler hızlı başlangıç sunar ama çoğu zaman özel iş kurallarında sınırlı kalır. i-Pazaryeri bu iki yaklaşım arasında konumlanır: çalışan bir çekirdek altyapı üzerine — B2B, B2C veya C2C — sektörünüze özel rol, ekran, veri ve entegrasyon uyarlamaları yapılır.",
    "Bu yaklaşım canlıya geçiş süresini kısaltır, geliştirme riskini azaltır ve markanın kendi ticari akışını korumasını sağlar. İlk fazda temel modülle başlanır; sonraki fazlarda ERP, kargo, ödeme, multichannel, mobil uygulama ve gelişmiş otomasyonlar eklenir. Model değiştiğinde sistem değişmez — yapılandırma genişler."
  ].join("\n\n"),
  ctaTitle: "Hangi modelle başlayacağınızı birlikte netleştirelim",
  ctaDescription:
    "B2B bayi portalı, B2C online mağaza veya C2C çok satıcılı pazaryeri — sektörünüze, hedef kitlenize ve operasyon yapınıza en uygun başlangıç kapsamını 30 dakikalık ücretsiz analizde çıkaralım.",
  ctaLabel: "Teklif al",
  ctaHref: "/teklif-al",
  sortOrder: 1
};

const blogPosts = [
  {
    slug: "b2b-pazaryeri-yazilimi-nedir",
    title: "B2B Pazaryeri Yazılımı Nedir?",
    excerpt: "Bayi, tedarikçi ve kurumsal alıcıları tek altyapıda buluşturan B2B pazaryeri modelini sade şekilde anlatıyoruz.",
    content: [
      "## B2B pazaryeri yazılımı ne işe yarar?",
      "B2B pazaryeri yazılımı, bayi, tedarikçi, satıcı ve kurumsal alıcıların tek dijital platformda işlem yapmasını sağlar. Bu sistem yalnızca ürün listeleme alanı değil; fiyat, stok, sipariş, ödeme, kargo ve raporlama akışlarını yöneten operasyon altyapısıdır.",
      "## Neden klasik e-ticaret sitesinden farklıdır?",
      "B2B ticarette her müşteri aynı fiyatı görmez. Bayi grupları, özel iskontolar, minimum sipariş kuralları, cari hesaplar ve ERP bağlantıları gerekir. Bu nedenle B2B pazaryeri yazılımı, standart e-ticaret yapısından daha güçlü rol ve veri yönetimi ister.",
      "## i-Pazaryeri yaklaşımı",
      "i-Pazaryeri, çalışan projelerden gelen hazır çekirdeği sektörünüze uyarlamaya odaklanır. Böylece sıfırdan yazılım geliştirme riskini azaltırken markanıza özel akışları koruyabilirsiniz."
    ].join("\n\n"),
    tag: "Rehber",
    sortOrder: 1,
    seoTitle: "B2B Pazaryeri Yazılımı Nedir?",
    seoDescription: "B2B pazaryeri yazılımının bayi, ERP, stok, sipariş ve yönetim paneli açısından ne işe yaradığını öğrenin."
  },
  {
    slug: "bayi-portali-ve-pazaryeri-farki",
    title: "Bayi Portalı ile Pazaryeri Arasındaki Farklar",
    excerpt: "Bayi portalı, kapalı B2B sipariş sistemi ve çok satıcılı pazaryeri yapıları arasındaki farkları karşılaştırıyoruz.",
    content: [
      "## Bayi portalı nedir?",
      "Bayi portalı, markanın kendi bayi ağına özel ürün, fiyat, stok ve sipariş akışı sunduğu kapalı sistemdir. Bayiler kendilerine tanımlanan fiyat listeleriyle sipariş verir ve operasyon merkezi panelden yönetilir.",
      "## Pazaryeri ne zaman gerekir?",
      "Birden fazla satıcı, tedarikçi veya marka aynı çatı altında işlem yapacaksa pazaryeri modeli gerekir. Bu modelde komisyon, satıcı paneli, ödeme dağıtımı, kargo yönetimi ve onay süreçleri daha kritik hale gelir.",
      "## Aynı altyapı iki modeli de destekleyebilir",
      "Doğru kurgulanmış bir B2B altyapı önce bayi portalı olarak başlayabilir, daha sonra satıcı ve tedarikçi rolleri eklenerek pazaryeri modeline genişleyebilir."
    ].join("\n\n"),
    tag: "B2B",
    sortOrder: 2,
    seoTitle: "Bayi Portalı ve Pazaryeri Farkı",
    seoDescription: "Bayi portalı, B2B sipariş sistemi ve pazaryeri yazılımı arasındaki temel farkları inceleyin."
  },
  {
    slug: "erp-entegrasyonlu-b2b-siparis-sistemi",
    title: "ERP Entegrasyonlu B2B Sipariş Sistemi Nasıl Çalışır?",
    excerpt: "ERP bağlantısı olan B2B sistemlerde ürün, stok, sipariş ve fatura akışının nasıl yönetildiğini anlatıyoruz.",
    content: [
      "## ERP neden kritik?",
      "B2B sipariş sisteminde ürün, stok, cari ve fiyat verileri güncel değilse bayi yanlış sipariş verir. ERP entegrasyonu bu verilerin tek merkezden yönetilmesini ve pazaryeri ekranlarına doğru yansımasını sağlar.",
      "## Kullanıcı bazlı ERP yaklaşımı",
      "Bazı projelerde ERP yalnızca platform sahibine ait değildir. Farklı satıcı veya bayiler kendi ERP bilgileriyle işlem yapabilir. UserIntegration yapısı bu senaryolar için kullanıcı bazlı bağlantı mantığı sunar.",
      "## Desteklenen sağlayıcılar",
      "Entegra, BizimHesap, Paraşüt, Sentos, StockMount, Dopigo ve KolaySoft gibi sağlayıcılarla ürün, sipariş ve fatura senkronizasyonu proje kapsamına göre planlanabilir."
    ].join("\n\n"),
    tag: "ERP",
    sortOrder: 3,
    seoTitle: "ERP Entegrasyonlu B2B Sipariş Sistemi",
    seoDescription: "ERP entegrasyonlu B2B sipariş sistemlerinde ürün, stok, sipariş ve fatura akışını öğrenin."
  },
  {
    slug: "kargo-entegrasyonu-olan-pazaryeri",
    title: "Kargo Entegrasyonu Olan Pazaryeri Altyapısı",
    excerpt: "Kargo hesaplama, gönderi oluşturma, takip ve etiket üretimi pazaryeri operasyonunda nasıl çalışır?",
    content: [
      "## Kargo entegrasyonu ne sağlar?",
      "Kargo entegrasyonu sipariş sonrası operasyonu hızlandırır. Sistem kargo seçeneklerini gösterebilir, gönderi oluşturabilir, takip numarası alabilir ve etiket üretimini panelden yönetebilir.",
      "## Hangi firmalarla çalışılır?",
      "Aras, Yurtiçi, MNG, Sürat, PTT, Hepsijet, Sendeo, Kolay Gelsin ve Navlungo gibi sağlayıcılar proje kapsamına göre entegre edilebilir.",
      "## Satıcı bazlı kargo ayarları",
      "Çok satıcılı veya bayi bazlı yapılarda her kullanıcının kargo anlaşması farklı olabilir. Bu durumda satıcı veya kullanıcı bazlı kargo ayarları planlanır."
    ].join("\n\n"),
    tag: "Kargo",
    sortOrder: 4,
    seoTitle: "Kargo Entegrasyonu Olan Pazaryeri Altyapısı",
    seoDescription: "Pazaryeri yazılımlarında kargo entegrasyonu, takip ve etiket üretimi süreçlerini inceleyin."
  },
  {
    slug: "b2b-admin-panel-neleri-yonetmeli",
    title: "B2B E-ticarette Admin Panel Neleri Yönetmeli?",
    excerpt: "Ürün, sipariş, ödeme, kargo, komisyon, kullanıcı ve SEO içerikleri için güçlü admin panel kapsamı.",
    content: [
      "## Admin panel neden önemlidir?",
      "B2B pazaryeri büyüdükçe operasyon yalnızca kodla değil, yönetilebilir panel yapısıyla ölçeklenir. Ekiplerin ürün, sipariş, kullanıcı, ödeme ve destek süreçlerini tek merkezden yönetmesi gerekir.",
      "## Temel panel alanları",
      "Ürün, kategori, marka, sipariş, kampanya, banner, blog, sayfa, kullanıcı, satıcı evrakı, sistem logları, ödeme ayarları, kargo ayarları, komisyon ve finans raporları yönetilebilir olmalıdır.",
      "## Operasyon kontrolü",
      "İyi tasarlanmış admin panel, pazaryeri sahibine günlük operasyonu izleme, hataları görme, içerikleri güncelleme ve yeni modülleri kontrollü devreye alma imkanı verir."
    ].join("\n\n"),
    tag: "Admin Panel",
    sortOrder: 5,
    seoTitle: "B2B E-ticarette Admin Panel Neleri Yönetmeli?",
    seoDescription: "B2B pazaryeri admin panelinde ürün, sipariş, ödeme, kargo, finans ve SEO yönetimi nasıl olmalı?"
  },
  {
    slug: "hazir-altyapi-mi-ozel-yazilim-mi",
    title: "Hazır Altyapı mı Özel Yazılım mı?",
    excerpt: "B2B pazaryeri projesinde hazır çekirdek, özel geliştirme ve hibrit yaklaşımın avantajlarını karşılaştırıyoruz.",
    content: [
      "## Hazır altyapının avantajı",
      "Hazır çekirdek altyapı, canlıya geçiş süresini kısaltır ve daha önce test edilmiş modüller üzerinden ilerleme imkanı verir. Bu yaklaşım özellikle bayi sipariş, katalog ve temel entegrasyon ihtiyaçlarında riski azaltır.",
      "## Özel yazılımın avantajı",
      "Özel yazılım, benzersiz iş kuralları ve farklı kullanıcı deneyimleri için daha geniş kontrol sağlar. Ancak süre, maliyet ve bakım planı daha dikkatli yönetilmelidir.",
      "## Hibrit yaklaşım",
      "i-Pazaryeri yaklaşımı çalışan çekirdek altyapıyı özel geliştirmeyle birleştirir. Temel modüller hazır gelir, sektörünüze özel rol, ekran, entegrasyon ve operasyon akışları eklenir."
    ].join("\n\n"),
    tag: "Strateji",
    sortOrder: 6,
    seoTitle: "Hazır Altyapı mı Özel Yazılım mı?",
    seoDescription: "B2B pazaryeri yazılımında hazır altyapı, özel yazılım ve hibrit geliştirme yaklaşımını karşılaştırın."
  }
];

async function main() {
  const settingsDefaults = {
    siteName: "i-Pazaryeri",
    logoText: "i-Pazaryeri",
    heroTitle: "B2B pazaryerinizi güçlü bir altyapıyla kurun",
    heroDescription:
      "Bayi, tedarikçi ve kurumsal alıcı ağlarını tek platformda yöneten, sektöre uyarlanabilir pazaryeri altyapısı.",
    heroBannerImage: null,
    heroBannerAlt: "i-Pazaryeri tanıtım banner",
    primaryCtaLabel: "Teklif Al",
    primaryCtaHref: "/teklif-al",
    projectsTitle: "Lafla değil, çalışan sistemlerle.",
    projectsTitleAccent: "çalışan",
    projectsDescription:
      "i-Grup bünyesinde 4 farklı sektörde aktif çalışan B2B platformlar. Aynı çekirdek altyapı, sektöre özgü iş kuralları.",
    sectorsTitle: "Sektöre göre uyarlanabilir altyapı",
    sectorsDescription:
      "Dermokozmetikten hırdavata, bayi ağı olan markalardan toptan ticarete kadar farklı iş modelleri için kurgulanabilir.",
    featuresDescription:
      "Sıfırdan yazılım geliştirmek yerine, 4 farklı sektörde işletilen ürünleşmiş bir altyapıyı sektörünüze uyarlıyoruz. Geliştirme süresi haftalara, maliyet projeye değil ürüne.",
    finalCtaTitle: "Sektörünüze uygun ticaret altyapısı için bugün konuşalım.",
    finalCtaDescription:
      "B2B bayi portalı, B2C online mağaza veya C2C çok satıcılı pazaryeri — 60 dakikalık keşif görüşmesi, sizin için bir mimari taslak çıkarmamıza yetiyor. Bağlayıcı değil.",
    ctaNote: "48 saat içinde dönüş garantisi",
    contactEmail: "info@i-pazaryeri.com",
    contactPhone: "+90 850 000 00 00",
    seoTitle: "i-Pazaryeri | B2B Pazaryeri Altyapısı",
    seoDescription: "Bayi, tedarikçi ve kurumsal alıcı ağları için sektöre uyarlanabilir B2B pazaryeri altyapısı."
  };

  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: {
      featuresDescription: settingsDefaults.featuresDescription,
      projectsTitle: settingsDefaults.projectsTitle,
      projectsTitleAccent: settingsDefaults.projectsTitleAccent,
      projectsDescription: settingsDefaults.projectsDescription,
      finalCtaTitle: settingsDefaults.finalCtaTitle,
      finalCtaDescription: settingsDefaults.finalCtaDescription,
      ctaNote: settingsDefaults.ctaNote,
      heroBannerAlt: settingsDefaults.heroBannerAlt
    },
    create: { id: "singleton", ...settingsDefaults }
  });

  for (const [slug, title, shortDesc, accent] of sectors) {
    await prisma.sector.upsert({
      where: { slug },
      update: { title, shortDesc, content: shortDesc, accent, isFeatured: true },
      create: { slug, title, shortDesc, content: shortDesc, accent, isFeatured: true }
    });
  }

  for (const [index, feature] of features.entries()) {
    const [slug, title, icon, category, shortDesc, visualImage] = feature;
    const visualData = { visualType: "image", visualImage, visualAccent: "#B87333" };
    await prisma.feature.upsert({
      where: { slug },
      update: { title, icon, category, shortDesc, content: shortDesc, sortOrder: index + 1, ...visualData },
      create: { slug, title, icon, category, shortDesc, content: shortDesc, sortOrder: index + 1, ...visualData }
    });
  }

  for (const card of solutionCards) {
    await prisma.solutionCard.upsert({
      where: { slug: card.slug },
      update: card,
      create: card
    });
  }

  for (const [type, title, description, icon, sortOrder] of homeItems) {
    await prisma.homeSectionItem.upsert({
      where: { id: `${type}-${sortOrder}` },
      update: { type, title, description, icon, sortOrder },
      create: { id: `${type}-${sortOrder}`, type, title, description, icon, sortOrder }
    });
  }

  for (const item of packages) {
    await prisma.package.upsert({
      where: { slug: item.slug },
      update: item,
      create: item
    });
  }

  for (const [packageSlug, label, value, group, sortOrder] of packageFeatures) {
    const pkg = await prisma.package.findUnique({ where: { slug: packageSlug }, select: { id: true } });
    if (!pkg) continue;
    await prisma.packageFeature.upsert({
      where: { id: `${packageSlug}-${sortOrder}` },
      update: { packageId: pkg.id, label, value, group, sortOrder },
      create: { id: `${packageSlug}-${sortOrder}`, packageId: pkg.id, label, value, group, sortOrder }
    });
  }

  for (const category of faqCategories) {
    const savedCategory = await prisma.faqCategory.upsert({
      where: { slug: category.slug },
      update: {
        title: category.title,
        description: category.description,
        sortOrder: category.sortOrder
      },
      create: {
        slug: category.slug,
        title: category.title,
        description: category.description,
        sortOrder: category.sortOrder
      }
    });

    for (const [question, answer, isFeatured, sortOrder] of category.items) {
      await prisma.faqItem.upsert({
        where: { id: `${category.slug}-${sortOrder}` },
        update: { categoryId: savedCategory.id, question, answer, isFeatured, sortOrder },
        create: { id: `${category.slug}-${sortOrder}`, categoryId: savedCategory.id, question, answer, isFeatured, sortOrder }
      });
    }
  }

  for (const [label, value, sortOrder] of offerServiceOptions) {
    await prisma.offerServiceOption.upsert({
      where: { value },
      update: { label, sortOrder },
      create: { label, value, sortOrder }
    });
  }

  const { id: seoArticleId, ...seoArticleData } = seoArticle;
  await prisma.seoArticleSection.upsert({
    where: { id: seoArticleId },
    update: seoArticleData,
    create: { id: seoArticleId, ...seoArticleData }
  });

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }

  if ((await prisma.testimonial.count()) === 0) {
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
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
