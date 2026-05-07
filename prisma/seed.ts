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
  title: "B2B pazaryeri yazılımı ile bayi, ERP, kargo ve sipariş süreçlerini tek altyapıda yönetin",
  intro:
    "B2B pazaryeri kurmak isteyen firmalar için başarı yalnızca modern bir web arayüzünden ibaret değildir. Bayi ağı, ürün kataloğu, fiyat listeleri, stok, sipariş, ERP, ödeme, kargo ve yönetim paneli aynı sistemde doğru çalıştığında sürdürülebilir bir dijital satış kanalı oluşur.",
  tableOfContents: [
    "1. B2B pazaryeri yazılımı nedir?",
    "1.1. Bayi portalı ile pazaryeri arasındaki fark",
    "1.2. i-Pazaryeri altyapısının teknik omurgası",
    "2. B2B pazaryerinde temel modüller",
    "2.1. Bayi, satıcı ve kullanıcı rolleri",
    "2.2. Ürün, fiyat, stok ve sipariş yönetimi",
    "2.3. Kullanıcı bazlı ERP ve muhasebe bağlantıları",
    "2.4. Kargo, ödeme, komisyon ve hakediş akışları",
    "3. Admin panel ve operasyon kontrolü",
    "4. SEO uyumlu B2B ticaret mimarisi",
    "5. Hazır çekirdek ve özel geliştirme yaklaşımı"
  ].join("\n"),
  content: [
    "1. B2B pazaryeri yazılımı nedir?",
    "B2B pazaryeri yazılımı, bayi, tedarikçi, satıcı ve kurumsal alıcıları tek dijital platformda buluşturan ticaret altyapısıdır. Bu yapı yalnızca ürün listeleyen bir vitrin değildir; kullanıcı rolleri, ticari kurallar, fiyat listeleri, cari hesap, stok, sipariş, ödeme, kargo ve raporlama süreçlerini merkezi olarak yönetir.",
    "Bayi ağı olan markalarda satış süreci çoğu zaman WhatsApp, Excel, telefon ve ERP ekranları arasında dağılır. Bu da hatalı fiyat, güncel olmayan stok, geciken sipariş onayı ve takip edilemeyen operasyon anlamına gelir. B2B pazaryeri yazılımı bu parçalı yapıyı tek kontrollü akışa dönüştürür.",
    "1.1. Bayi portalı ile pazaryeri arasındaki fark",
    "Bayi portalı genellikle markanın kendi bayilerine sipariş aldırdığı kapalı bir yapıdır. Pazaryeri ise farklı satıcı, tedarikçi veya kullanıcı rollerinin aynı sistemde işlem yapabildiği daha geniş bir modeldir. i-Pazaryeri altyapısı iki ihtiyacı da aynı çekirdek üzerinden ele alır: sadece bayi sipariş portalı olarak başlayabilir, zamanla satıcı, tedarikçi, komisyon ve çoklu katalog yapısına dönüşebilir.",
    "1.2. i-Pazaryeri altyapısının teknik omurgası",
    "i-Pazaryeri; Laravel 12 API, Sanctum yetkilendirme, React ön yüz, Filament admin panel, queue, zamanlanmış görevler, Scout ve Meilisearch gibi bileşenlerle çalışır. Bu teknik yapı i-Hırdavat, i-Kırtasiye ve i-Depo gibi sistemlerde kullanılan ortak backend yaklaşımından gelir.",
    "Bu omurga ürün, kategori, marka, sepet, sipariş, teklif, fatura, iade, cüzdan, ödeme, kargo, destek talebi, bildirim, banner, blog, sayfa ve sistem logları gibi operasyon modellerini aynı disiplin altında yönetir.",
    "2. B2B pazaryerinde temel modüller",
    "Başarılı bir B2B pazaryeri, iyi tasarlanmış modüllerin birlikte çalışmasıyla ortaya çıkar. Ürün kataloğu güçlü olsa bile bayi fiyat listeleri yönetilemiyorsa, ERP güncel değilse veya kargo takibi kopuksa sistem operasyon yükünü azaltmaz. Bu nedenle i-Pazaryeri her modülü gerçek ticaret akışına göre konumlandırır.",
    "2.1. Bayi, satıcı ve kullanıcı rolleri",
    "Bayi, tedarikçi, satıcı, yönetici, saha ekibi veya kurumsal alıcı farklı yetkilerle sisteme dahil olabilir. Her rolün göreceği ürün, fiyat, sipariş durumu, ödeme bilgisi ve rapor farklılaştırılabilir. Sektöre göre GLN doğrulama, vergi numarası whitelist, satıcı evrak onayı veya kapalı bayi daveti gibi kontroller eklenebilir.",
    "2.2. Ürün, fiyat, stok ve sipariş yönetimi",
    "Kategori, marka, varyant, barkod, ürün görseli ve teknik bilgi düzenli olduğunda kullanıcı doğru ürüne hızlı ulaşır. Bayiye özel fiyat listeleri, iskonto kuralları, minimum sipariş, tekrar sipariş ve stok görünürlüğü sipariş kalitesini artırır. Excel içe aktarma ve ERP ürün senkronizasyonu geniş kataloglarda operasyon hızını korur.",
    "2.3. Kullanıcı bazlı ERP ve muhasebe bağlantıları",
    "ERP entegrasyonu yalnızca admin seviyesinde düşünülmemelidir. i-Pazaryeri tarafında UserIntegration yaklaşımıyla farklı kullanıcı, bayi veya satıcıların kendi ERP bağlantıları ayrıştırılabilir. Entegra, BizimHesap, Paraşüt, Sentos, StockMount, Dopigo ve KolaySoft gibi sağlayıcılarla ürün, sipariş ve fatura akışları proje kapsamına göre kurgulanabilir.",
    "2.4. Kargo, ödeme, komisyon ve hakediş akışları",
    "Aras, Yurtiçi, MNG, Sürat, PTT, Hepsijet, Sendeo, Kolay Gelsin ve Navlungo gibi kargo sağlayıcıları için hesaplama, seçenek listeleme, gönderi oluşturma, takip ve etiket üretimi planlanabilir. Ödeme tarafında Iyzico ve PayTR gibi sağlayıcılarla taksit, iade, satıcı transferi, cüzdan, hakediş ve komisyon raporları yönetilebilir.",
    "3. Admin panel ve operasyon kontrolü",
    "Filament tabanlı admin panel; ürün, kategori, marka, sipariş, kampanya, banner, sözleşme, blog, sayfa, kullanıcı, firma, satıcı evrakı, sistem logları, destek talepleri, fatura, ödeme ayarları, kargo ayarları, komisyon, finans raporları ve SEO içerikleri gibi alanları yönetmek için kullanılır.",
    "Bu panelin amacı yalnızca içerik girmek değildir. Operasyon ekibi siparişleri, kullanıcıları, ödemeleri, kargo süreçlerini ve entegrasyon hatalarını tek merkezden izleyebildiğinde pazaryeri büyüdükçe kontrol kaybı yaşanmaz.",
    "4. SEO uyumlu B2B ticaret mimarisi",
    "SEO uyumlu B2B pazaryeri mimarisi; okunabilir URL yapısı, hızlı sayfa açılışı, mobil uyum, doğru meta alanları, blog, SSS, rehber içerikleri ve taranabilir sayfa yapısı gerektirir. Ürün ve kategori sayfaları kadar, potansiyel müşterinin karar sürecini destekleyen rehber içerikler de önemlidir.",
    "i-Pazaryeri sitesindeki SSS, blog ve kapsamlı rehber alanları bu nedenle admin panelinden düzenlenebilir yapıdadır. Böylece sektörünüze uygun anahtar kelimeler, entegrasyon soruları, maliyet açıklamaları ve operasyon cevapları zaman içinde geliştirilebilir.",
    "5. Hazır çekirdek ve özel geliştirme yaklaşımı",
    "Tamamen sıfırdan yazılım geliştirmek yüksek kontrol sağlar fakat süre ve maliyet riski taşır. Hazır paketler hızlı başlangıç sunar ama çoğu zaman özel iş kurallarında sınırlı kalır. i-Pazaryeri bu iki yaklaşım arasında konumlanır: çalışan bir çekirdek altyapı üzerine sektörünüze özel rol, ekran, veri ve entegrasyon uyarlamaları yapılır.",
    "Bu yaklaşım canlıya geçiş süresini kısaltır, geliştirme riskini azaltır ve markanın kendi ticari akışını korumasını sağlar. İlk fazda bayi sipariş, katalog ve temel panelle başlanabilir; sonraki fazlarda ERP, kargo, ödeme, raporlama, mobil uygulama ve gelişmiş otomasyonlar eklenebilir."
  ].join("\n\n"),
  ctaTitle: "Kendi pazaryeri modelinizi netleştirelim",
  ctaDescription:
    "Bayi ağınız, ürün yapınız ve entegrasyon ihtiyaçlarınız üzerinden size uygun B2B, B2C veya C2C pazaryeri kapsamını birlikte çıkaralım.",
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
    finalCtaTitle: "Sektörünüze uygun bir B2B pazaryeri için bugün konuşalım.",
    finalCtaDescription:
      "60 dakikalık keşif görüşmesi, sizin için bir mimari taslak çıkarmamıza yetiyor. Bağlayıcı değil.",
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
