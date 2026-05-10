/**
 * Update homepage SEO article in DB to the B2B+B2C+C2C inclusive version.
 * Run: npx tsx scripts/update-seo-article.ts
 */

import "dotenv/config";
import { prisma } from "../src/lib/db";

const article = {
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
  isPublished: true,
  sortOrder: 1
};

async function main() {
  const { id, ...data } = article;
  await prisma.seoArticleSection.upsert({
    where: { id },
    update: data,
    create: { id, ...data }
  });
  console.log(`✓ SEO article '${id}' (placement: ${article.placement}) updated.`);
  console.log(`  Title: ${article.title}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
