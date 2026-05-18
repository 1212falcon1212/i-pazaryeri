import { prisma } from "../src/lib/db";

const legalPages = [
  {
    slug: "gizlilik-politikasi",
    heroEyebrow: "Yasal Metinler",
    heroTitle: "Gizlilik Politikası",
    heroDescription: "i-Pazaryeri web sitesi, teklif formları, blog ve iletişim kanalları kapsamında işlenen kişisel verilere ilişkin gizlilik esasları.",
    bodyTitle: "Gizlilik Politikası",
    bodyContent: [
      "## 1. Amaç ve kapsam",
      "Bu Gizlilik Politikası, i-Pazaryeri web sitesini ziyaret eden, teklif formu dolduran, blog içeriklerini inceleyen veya iletişim kanallarımız üzerinden bizimle temas kuran kişilerin bilgilerinin hangi amaçlarla işlendiğini açıklamak için hazırlanmıştır. Politika; web sitesi kullanımı, form gönderimleri, teklif talepleri, teknik log kayıtları, çerezler ve pazarlama iletişimi süreçlerini kapsar.",
      "## 2. Toplanan bilgiler",
      "Web sitemizde ad soyad, şirket adı, e-posta adresi, telefon numarası, sektör bilgisi, proje ihtiyacı, seçilen servisler, mesaj içeriği, IP adresi, cihaz ve tarayıcı bilgisi, sayfa ziyaretleri, form gönderim zamanı ve çerez verileri işlenebilir. Bu bilgiler doğrudan kullanıcı tarafından sağlanabileceği gibi, site kullanımı sırasında teknik olarak otomatik şekilde de oluşabilir.",
      "## 3. Verilerin işlenme amaçları",
      "Kişisel veriler; teklif talebine dönüş yapmak, ihtiyaç analizi yapmak, proje kapsamını değerlendirmek, hizmet kalitesini artırmak, site güvenliğini sağlamak, spam ve kötüye kullanımı önlemek, yasal yükümlülükleri yerine getirmek, kullanıcı deneyimini geliştirmek ve onay verilmişse bilgilendirme iletişimi yapmak amacıyla işlenir.",
      "## 4. Verilerin saklanması",
      "Veriler, işleme amacının gerektirdiği süre boyunca saklanır. Teklif talepleri ve iletişim kayıtları ticari ilişkinin kurulması, takip edilmesi ve olası uyuşmazlıklarda ispat amacıyla makul sürelerle tutulabilir. Saklama süresi sona erdiğinde veriler silinir, yok edilir veya anonim hale getirilir.",
      "## 5. Üçüncü taraf hizmetler",
      "Web sitesi barındırma, analitik, e-posta gönderimi, güvenlik, form yönetimi, CRM, reklam ve ölçümleme hizmetleri için üçüncü taraf sağlayıcılardan yararlanılabilir. Bu hizmetler yalnızca gerekli ölçüde veri işler ve teknik/organizasyonel güvenlik önlemleri kapsamında değerlendirilir.",
      "## 6. Veri güvenliği",
      "Kişisel verilerin yetkisiz erişim, kayıp, hatalı kullanım, değiştirme veya ifşa risklerine karşı korunması için erişim kontrolü, loglama, güvenli bağlantı, yedekleme ve sınırlı yetkilendirme gibi önlemler uygulanır. Buna rağmen internet üzerinden iletilen hiçbir verinin mutlak güvenlik garantisi bulunmadığı unutulmamalıdır.",
      "## 7. Haklarınız",
      "KVKK kapsamındaki haklarınız doğrultusunda kişisel verilerinizin işlenip işlenmediğini öğrenebilir, işlenmişse bilgi talep edebilir, amacına uygun kullanılıp kullanılmadığını sorabilir, eksik veya yanlış işlenmişse düzeltilmesini isteyebilir, silinmesini veya yok edilmesini talep edebilir ve ilgili işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteyebilirsiniz.",
      "## 8. İletişim",
      "Gizlilik politikası ve kişisel veri işleme süreçleriyle ilgili talepleriniz için web sitemizde yer alan iletişim kanallarından bize ulaşabilirsiniz. Talepleriniz, yürürlükteki mevzuata uygun şekilde değerlendirilir."
    ].join("\n\n"),
    seoTitle: "Gizlilik Politikası | i-Pazaryeri",
    seoDescription: "i-Pazaryeri gizlilik politikası: kişisel veri işleme, saklama, güvenlik, çerezler ve kullanıcı hakları."
  },
  {
    slug: "kullanim-sozlesmesi",
    heroEyebrow: "Yasal Metinler",
    heroTitle: "Kullanım Sözleşmesi",
    heroDescription: "i-Pazaryeri web sitesinin kullanımı, içeriklere erişim, teklif formları ve kullanıcı yükümlülüklerine ilişkin temel şartlar.",
    bodyTitle: "Kullanım Sözleşmesi",
    bodyContent: [
      "## 1. Taraflar ve kabul",
      "Bu Kullanım Sözleşmesi, i-Pazaryeri web sitesini ziyaret eden tüm kullanıcılar ile site sahibi arasında geçerlidir. Web sitesini kullanmanız, bu sözleşmede belirtilen şartları okuduğunuz, anladığınız ve kabul ettiğiniz anlamına gelir. Şartları kabul etmiyorsanız siteyi kullanmayı durdurmanız gerekir.",
      "## 2. Hizmetin niteliği",
      "i-Pazaryeri; B2B, B2C ve C2C e-ticaret altyapıları, pazaryeri yazılımı, bayi portalı, entegrasyon, teklif alma, blog ve bilgilendirme içerikleri sunan bir tanıtım ve talep toplama platformudur. Site üzerindeki bilgiler genel bilgilendirme niteliğindedir ve bağlayıcı teklif yerine geçmez.",
      "## 3. Kullanıcı yükümlülükleri",
      "Kullanıcılar siteyi hukuka uygun şekilde kullanmayı, formlara doğru ve güncel bilgiler girmeyi, üçüncü kişilerin haklarını ihlal etmemeyi, sistemi bozacak veya güvenliği tehlikeye atacak davranışlardan kaçınmayı kabul eder. Sahte bilgi, spam, zararlı yazılım veya yetkisiz erişim girişimleri yasaktır.",
      "## 4. İçerik ve fikri mülkiyet",
      "Sitedeki metinler, görseller, logo, tasarım, yazılım yapısı, marka unsurları ve diğer içerikler i-Pazaryeri veya ilgili hak sahiplerine aittir. İçerikler, yazılı izin alınmadan kopyalanamaz, çoğaltılamaz, yayınlanamaz, ticari amaçla kullanılamaz veya türev çalışma haline getirilemez.",
      "## 5. Teklif formları ve iletişim",
      "Teklif formu veya iletişim kanalları üzerinden gönderilen bilgiler, proje ihtiyacınızı değerlendirmek ve size dönüş yapmak amacıyla kullanılabilir. Form gönderimi otomatik olarak sözleşme kurulması anlamına gelmez. Proje kapsamı, fiyat, süre ve teslimat koşulları ayrıca yazılı teklif ile netleştirilir.",
      "## 6. Sorumluluğun sınırlandırılması",
      "Web sitesindeki bilgiler güncel ve doğru tutulmaya çalışılır; ancak içeriklerin eksiksiz, hatasız veya kesintisiz olacağı garanti edilmez. Site kullanımından doğabilecek dolaylı zararlar, veri kayıpları veya üçüncü taraf hizmetlerden kaynaklanan sorunlardan i-Pazaryeri sorumlu tutulamaz.",
      "## 7. Değişiklik hakkı",
      "i-Pazaryeri, kullanım koşullarını, site içeriğini, sayfa yapısını, hizmet kapsamını veya teknik özellikleri önceden bildirim yapmaksızın değiştirme hakkını saklı tutar. Güncel sözleşme web sitesinde yayınlandığı tarihten itibaren geçerli olur.",
      "## 8. Uyuşmazlıklar",
      "Bu sözleşmeden doğabilecek uyuşmazlıklarda Türkiye Cumhuriyeti hukuku uygulanır. Yetkili mahkeme ve icra daireleri, yürürlükteki mevzuat hükümlerine göre belirlenir."
    ].join("\n\n"),
    seoTitle: "Kullanım Sözleşmesi | i-Pazaryeri",
    seoDescription: "i-Pazaryeri kullanım sözleşmesi: web sitesi kullanımı, içerik hakları, formlar, sorumluluklar ve şartlar."
  },
  {
    slug: "kvkk-aydinlatma-metni",
    heroEyebrow: "KVKK",
    heroTitle: "KVKK Aydınlatma Metni",
    heroDescription: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
    bodyTitle: "KVKK Aydınlatma Metni",
    bodyContent: [
      "## 1. Veri sorumlusu",
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, web sitesi ve iletişim süreçleri kapsamında işlenen kişisel veriler bakımından veri sorumlusu i-Pazaryeri'dir. Bu metin, kişisel verilerinizin hangi amaçlarla işlendiğini, kimlere aktarılabileceğini ve haklarınızı açıklamak amacıyla hazırlanmıştır.",
      "## 2. İşlenen kişisel veriler",
      "Ad soyad, şirket adı, e-posta adresi, telefon numarası, sektör bilgisi, proje ihtiyacı, mesaj içeriği, IP adresi, işlem güvenliği kayıtları, çerez verileri ve iletişim geçmişi işlenebilir. Teklif formunda paylaştığınız bilgiler, proje kapsamınızı değerlendirmek ve size dönüş yapmak için kullanılır.",
      "## 3. İşleme amaçları",
      "Kişisel verileriniz; iletişim taleplerini yanıtlamak, teklif hazırlamak, hizmet sunmak, sözleşme öncesi süreçleri yürütmek, müşteri ilişkilerini yönetmek, site güvenliğini sağlamak, yasal yükümlülükleri yerine getirmek, hizmet kalitesini artırmak ve izin vermeniz halinde bilgilendirme yapmak amacıyla işlenir.",
      "## 4. Hukuki sebepler",
      "Verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen hukuki sebeplere dayanarak işlenir. Bunlar; sözleşmenin kurulması veya ifası, hukuki yükümlülüklerin yerine getirilmesi, meşru menfaat, bir hakkın tesisi/kullanılması/korunması ve gerekli hallerde açık rızadır.",
      "## 5. Veri aktarımı",
      "Kişisel verileriniz; barındırma, e-posta, CRM, analitik, güvenlik, ödeme, muhasebe, hukuk ve teknik destek hizmetleri kapsamında hizmet aldığımız tedarikçilere, yetkili kamu kurumlarına ve mevzuatın izin verdiği üçüncü kişilere aktarılabilir. Aktarımlar yalnızca gerekli kapsamla sınırlıdır.",
      "## 6. Toplama yöntemi",
      "Verileriniz web formları, e-posta, telefon, çerezler, teknik loglar, canlı destek veya benzeri dijital kanallar aracılığıyla otomatik veya otomatik olmayan yollarla toplanabilir. Siteyi ziyaretiniz sırasında işlem güvenliği ve kullanıcı deneyimi amacıyla teknik kayıtlar oluşabilir.",
      "## 7. Haklarınız",
      "KVKK'nın 11. maddesi kapsamında verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlışsa düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, aktarım yapılan üçüncü kişilere bildirim yapılmasını talep etme ve zarara uğramanız halinde tazminat talep etme haklarına sahipsiniz.",
      "## 8. Başvuru yöntemi",
      "KVKK kapsamındaki taleplerinizi web sitesindeki iletişim kanalları üzerinden iletebilirsiniz. Başvurularınız, kimlik doğrulama gereklilikleri ve yasal süreler çerçevesinde değerlendirilir."
    ].join("\n\n"),
    seoTitle: "KVKK Aydınlatma Metni | i-Pazaryeri",
    seoDescription: "i-Pazaryeri KVKK aydınlatma metni: veri sorumlusu, işlenen veriler, hukuki sebepler, aktarım ve haklar."
  },
  {
    slug: "cerez-politikasi",
    heroEyebrow: "Yasal Metinler",
    heroTitle: "Çerez Politikası",
    heroDescription: "i-Pazaryeri web sitesinde kullanılan zorunlu, performans, analitik ve pazarlama çerezlerine ilişkin bilgilendirme.",
    bodyTitle: "Çerez Politikası",
    bodyContent: [
      "## 1. Çerez nedir?",
      "Çerezler, web sitesini ziyaret ettiğinizde tarayıcınıza veya cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler sayesinde site temel işlevlerini yerine getirebilir, kullanıcı deneyimi iyileştirilebilir, ziyaret istatistikleri ölçülebilir ve tercihlerinizi hatırlamak mümkün olabilir.",
      "## 2. Kullanılan çerez türleri",
      "Web sitemizde zorunlu çerezler, performans çerezleri, analitik çerezler, işlevsel çerezler ve pazarlama çerezleri kullanılabilir. Zorunlu çerezler sitenin güvenli ve doğru çalışması için gereklidir. Analitik çerezler hangi sayfaların ziyaret edildiğini anlamamıza yardımcı olur. Pazarlama çerezleri ise reklam ve yeniden hedefleme süreçlerinde kullanılabilir.",
      "## 3. Çerezlerin kullanım amaçları",
      "Çerezler; oturum güvenliği, form güvenliği, site performansının ölçülmesi, hata analizleri, kullanıcı tercihleri, sayfa görüntüleme istatistikleri, kampanya performansı, reklam ölçümleme ve kullanıcı deneyimini geliştirme amacıyla kullanılabilir. Çerezler kişisel veri içeriyorsa KVKK hükümlerine uygun şekilde işlenir.",
      "## 4. Üçüncü taraf çerezler",
      "Analitik, reklam, güvenlik, sosyal medya veya video içerik sağlayıcıları gibi üçüncü taraf hizmetler çerez kullanabilir. Bu çerezlerin yönetimi ilgili üçüncü tarafın politikalarına da tabi olabilir. Kullanılan hizmetler proje ve site yapılandırmasına göre değişebilir.",
      "## 5. Çerez tercihlerini yönetme",
      "Tarayıcı ayarlarınız üzerinden çerezleri silebilir, engelleyebilir veya belirli siteler için çerez kullanımını sınırlandırabilirsiniz. Ancak zorunlu çerezlerin kapatılması durumunda web sitesinin bazı özellikleri doğru çalışmayabilir. Tarayıcı bazlı çerez yönetimi Chrome, Safari, Firefox, Edge gibi tarayıcıların ayar ekranlarından yapılabilir.",
      "## 6. Saklama süreleri",
      "Çerezlerin saklama süreleri çerez türüne göre değişir. Oturum çerezleri tarayıcı kapatıldığında silinebilirken, kalıcı çerezler belirli sürelerle cihazınızda kalabilir. Analitik ve pazarlama çerezleri hizmet sağlayıcının belirlediği süreler boyunca saklanabilir.",
      "## 7. Politika değişiklikleri",
      "Çerez Politikası, kullanılan teknolojiler, hizmet sağlayıcılar veya yasal gereklilikler değiştiğinde güncellenebilir. Güncel politika web sitesinde yayınlandığı tarihten itibaren geçerli olur."
    ].join("\n\n"),
    seoTitle: "Çerez Politikası | i-Pazaryeri",
    seoDescription: "i-Pazaryeri çerez politikası: çerez türleri, kullanım amaçları, üçüncü taraf çerezleri ve tercih yönetimi."
  },
  {
    slug: "kvkk-yukumlulukleri",
    heroEyebrow: "KVKK",
    heroTitle: "KVKK Yükümlülükleri",
    heroDescription: "Pazaryeri, e-ticaret ve B2B portal projelerinde kişisel veri işleme süreçlerine ilişkin temel KVKK yükümlülükleri.",
    bodyTitle: "KVKK Yükümlülükleri",
    bodyContent: [
      "## 1. Pazaryeri projelerinde KVKK neden önemlidir?",
      "Pazaryeri ve e-ticaret projelerinde müşteri, satıcı, bayi, çalışan, tedarikçi ve ziyaretçi verileri işlenir. Ad soyad, iletişim bilgisi, adres, sipariş, ödeme, fatura, destek talebi, çerez ve işlem güvenliği verileri KVKK kapsamında değerlendirilir. Bu nedenle veri işleme süreçleri proje başlangıcında tasarlanmalıdır.",
      "## 2. Aydınlatma yükümlülüğü",
      "Veri sorumlusu, kişisel verileri işlerken ilgili kişileri hangi verilerin, hangi amaçla, hangi hukuki sebebe dayanarak işlendiği, kimlere aktarılabileceği ve haklarının neler olduğu konusunda bilgilendirmelidir. Bu nedenle web sitesinde KVKK Aydınlatma Metni, Çerez Politikası ve gerekli formların erişilebilir olması gerekir.",
      "## 3. Açık rıza yönetimi",
      "Her veri işleme faaliyeti açık rıza gerektirmez; ancak pazarlama iletişimi, bazı çerez türleri veya özel nitelikli veriler gibi durumlarda açık rıza gerekebilir. Açık rıza özgür iradeyle, belirli bir konuya ilişkin ve bilgilendirmeye dayalı olarak alınmalıdır. Rızanın geri alınabilir olması gerekir.",
      "## 4. Veri minimizasyonu",
      "Sistem yalnızca gerekli verileri toplamalıdır. Pazaryeri kayıt formunda, bayi başvurusunda veya teklif formunda ihtiyaç duyulmayan bilgiler istenmemelidir. Veri minimizasyonu hem yasal uyum hem de kullanıcı güveni açısından önemlidir.",
      "## 5. Saklama ve imha politikası",
      "Veriler süresiz saklanmamalıdır. Sipariş, fatura, sözleşme, destek talebi, log ve iletişim kayıtları için ayrı saklama süreleri belirlenmelidir. Süresi dolan veriler silinmeli, yok edilmeli veya anonim hale getirilmelidir. Bu süreçlerin admin panelde veya operasyon prosedürlerinde takip edilebilir olması önerilir.",
      "## 6. Veri güvenliği önlemleri",
      "Yetki kontrolü, güçlü parola politikası, iki faktörlü doğrulama, loglama, şifreleme, yedekleme, güvenli API erişimi, sınırlı personel yetkisi ve düzenli güvenlik kontrolleri KVKK uyumu için teknik ve idari önlemler arasındadır. Özellikle satıcı paneli ve admin panel erişimleri dikkatle sınırlandırılmalıdır.",
      "## 7. Tedarikçi ve entegrasyon yönetimi",
      "Odeme sağlayıcıları, kargo firmaları, ERP/muhasebe sistemleri, e-posta servisleri, CRM araçları ve analitik hizmetleri veri işleyebilir. Bu tedarikçilerle veri işleme koşulları, güvenlik sorumlulukları ve aktarım kapsamı netleştirilmelidir.",
      "## 8. Pazaryeri özelinde dikkat edilmesi gerekenler",
      "Çok satıcılı pazaryerlerinde satıcılar da müşteri verilerine erişebilir. Bu nedenle hangi satıcının hangi veriyi görebileceği, sipariş sonrası hangi verinin paylaşılacağı, iade ve destek süreçlerinde veri erişimi, satıcı sözleşmesi ve log kayıtları açık şekilde belirlenmelidir.",
      "## 9. Sonuç",
      "KVKK uyumu tek seferlik belge hazırlama işi değildir. Veri akışları, kullanıcı rolleri, entegrasyonlar, saklama süreleri ve güvenlik önlemleri birlikte tasarlanmalıdır. i-Pazaryeri projelerinde bu alanlar teknik mimari ve admin panel yetkilendirmesiyle birlikte ele alınır."
    ].join("\n\n"),
    seoTitle: "KVKK Yükümlülükleri | i-Pazaryeri",
    seoDescription: "Pazaryeri, B2B portal ve e-ticaret projeleri için KVKK yükümlülükleri, aydınlatma, açık rıza, veri güvenliği ve saklama süreçleri."
  }
];

const legalFooterLinks = [
  ["footer-legal-80", "Gizlilik Politikası", "/gizlilik-politikasi", 80],
  ["footer-legal-81", "Kullanım Sözleşmesi", "/kullanim-sozlesmesi", 81],
  ["footer-legal-82", "KVKK Aydınlatma Metni", "/kvkk-aydinlatma-metni", 82],
  ["footer-legal-83", "Çerez Politikası", "/cerez-politikasi", 83],
  ["footer-legal-84", "KVKK Yükümlülükleri", "/kvkk-yukumlulukleri", 84]
] as const;

async function main() {
  for (const page of legalPages) {
    await prisma.staticPage.upsert({
      where: { slug: page.slug },
      update: {
        ...page,
        isPublished: true,
        ctaEyebrow: "Yasal metinler",
        ctaTitle: "Projenizin yasal ve teknik kapsamını birlikte netleştirelim.",
        ctaDescription: "Pazaryeri, B2B portal veya e-ticaret altyapınız için veri, ödeme, kargo ve sözleşme akışlarını proje özelinde değerlendirelim.",
        ctaLabel: "Teklif Al",
        ctaHref: "/teklif-al"
      },
      create: {
        ...page,
        isPublished: true,
        ctaEyebrow: "Yasal metinler",
        ctaTitle: "Projenizin yasal ve teknik kapsamını birlikte netleştirelim.",
        ctaDescription: "Pazaryeri, B2B portal veya e-ticaret altyapınız için veri, ödeme, kargo ve sözleşme akışlarını proje özelinde değerlendirelim.",
        ctaLabel: "Teklif Al",
        ctaHref: "/teklif-al"
      }
    });
  }

  await prisma.footerLink.deleteMany({ where: { groupSlug: "legal" } });

  for (const [id, label, href, sortOrder] of legalFooterLinks) {
    await prisma.footerLink.upsert({
      where: { id },
      update: { groupSlug: "legal", groupLabel: "Yasal", label, href, isPublished: true, sortOrder },
      create: { id, groupSlug: "legal", groupLabel: "Yasal", label, href, isPublished: true, sortOrder }
    });
  }

  await prisma.$disconnect();
  console.log(`Seeded ${legalPages.length} legal pages.`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
