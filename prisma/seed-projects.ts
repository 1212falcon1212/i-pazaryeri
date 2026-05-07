import { prisma } from "../src/lib/db";

type ProjectSeed = {
  slug: string;
  title: string;
  category: string;
  sector: string;
  status: string;
  shortDesc: string;
  content: string;
  accent: string;
  year: number;
  sortOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};

const projects: ProjectSeed[] = [
  {
    slug: "i-eczane",
    title: "i-Eczane",
    category: "Çok Satıcılı B2B Pazaryeri",
    sector: "Eczacılık & Dermokozmetik",
    status: "Yayında",
    accent: "#1F4FFF",
    year: 2023,
    sortOrder: 1,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Eczacılar için dermokozmetik odaklı çok satıcılı B2B pazaryeri. Markalar ile eczaneler arasında doğrudan stok, sipariş, kampanya ve iade akışını dijitalleştirir.",
    content: `i-Eczane, Türkiye'deki eczacıların dermokozmetik ve sağlıklı yaşam ürünü tedarikini tek bir B2B pazaryeri üzerinden yönetebilmesi için kurgulanmış çok satıcılı (multi-vendor) bir platformdur. Geleneksel olarak telefon, faks, WhatsApp grupları ve depo temsilcileri üzerinden yürüyen toptan tedarik süreci; i-Eczane ile birlikte mobil ve web uygulamaları üzerinden uçtan uca dijitalleştirilmiştir. Eczane sahibinin onlarca farklı tedarikçiyle ayrı ayrı iletişim kurma, fiyat sorma, sipariş geçme ve cari hesap takip etme zorunluluğu ortadan kalkar; tüm süreç tek bir hesap üzerinden yürür.

## Sektörel ihtiyaç ve çözüm yaklaşımı

Türkiye'de bir eczanenin ortalama 30 ile 50 arasında dermokozmetik markasıyla çalıştığı, her markanın da kendi sipariş kanalı, fiyat listesi, kampanya kuralları ve iade politikası olduğu düşünüldüğünde toptan tedarik kanalının ne kadar parçalı olduğu görülür. i-Eczane bu parçalanmış yapıyı tek bir alışveriş deneyimi etrafında toplayarak hem eczaneye hem de markaya operasyonel hız ve şeffaflık kazandırır. Eczacılar tek bir uygulamada yüzlerce ürünü filtreleyebilir, fiyat karşılaştırması yapabilir, kampanyalı ürünleri görebilir ve aynı sepette farklı markalardan sipariş geçebilir.

## Markalar için satış kanalı

i-Eczane'nin marka tarafı, dermokozmetik üreticileri ve distribütörleri için tam donanımlı bir B2B satış paneli sunar. Markalar kendi kataloglarını ürün varyantı, ambalaj boyutu, KDV oranı ve barkod düzeyinde yönetir; bayi/eczane gruplarına özel fiyat listeleri tanımlar; çoklu alım indirimi, X+Y hediye, kademeli iskonto ve sezon kampanyaları kurgular. Stok ve fiyat değişiklikleri eczane uygulamasına gerçek zamanlı yansır.

## Modül listesi

- Çoklu satıcı (multi-vendor) mimari: Her marka kendi alanını yönetir, sipariş otomatik yönlendirilir
- Eczane mobil uygulaması (iOS & Android) ve responsive web paneli
- Marka katalog yönetimi: ürün, varyant, ambalaj, görsel, barkod, KDV
- Çoklu fiyat listesi: eczane grubu, bölge, kanal ve sezon bazında
- Kampanya motoru: X+Y, oransal indirim, hediye ürün, kademeli iskonto
- Sipariş bölme ve sevkiyat: tek sepetten farklı markalara otomatik bölünme
- Cari hesap & açık hesap limit yönetimi
- E-fatura, e-arşiv ve banka tahsilat entegrasyonu
- Logo, Mikro ve Netsis ERP'lerine iki yönlü entegrasyon
- İade yönetimi, ürün uygunluk kontrolü, alacak/borç dekontu

## Sağlanan iş etkisi

i-Eczane'de birlikte çalıştığımız markalar; sipariş alma süreçlerinde ortalama %60'a varan zaman tasarrufu, bayi sipariş frekansında belirgin artış ve tahsilat gecikmelerinde gözle görülür azalma raporlamıştır. Eczane tarafında ise tek panel üzerinden toplu sipariş, kampanyaların kaçırılmaması ve cari hesap görünürlüğü en sık öne çıkan kazanımlardır. Platform, dermokozmetik sektörünün B2B kanalını ölçülebilir, raporlanabilir ve dijital bir yapıya kavuşturmaktadır.`,
    seoTitle: "i-Eczane | Eczane Dermokozmetik B2B Pazaryeri Yazılımı",
    seoDescription:
      "i-Eczane, eczaneler için dermokozmetik odaklı çok satıcılı B2B pazaryeri. Marka katalogları, eczane fiyat listesi, kampanya motoru, cari yönetimi ve mobil sipariş tek platformda."
  },

  {
    slug: "i-depo",
    title: "i-Depo",
    category: "Kapalı B2B Pazaryeri",
    sector: "Dermokozmetik Distribütörü",
    status: "Yayında",
    accent: "#0EA5A4",
    year: 2023,
    sortOrder: 2,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Dermokozmetik distribütörleri ile eczaneler arasında çalışan kapalı (davetli) B2B pazaryeri. Bayi fiyat grupları, cari yönetimi ve toplu sipariş üzerine kurulu.",
    content: `i-Depo, dermokozmetik distribütörlerinin kontrol ettiği davetli (kapalı) bir B2B pazaryeri olarak kurgulanmıştır. Halka açık bir pazaryerinin aksine i-Depo'ya yalnızca distribütör tarafından davet edilmiş eczaneler ve bayiler erişebilir; her bayinin kendi onaylı fiyat grubu, cari limiti, kampanya hakkı ve sevkiyat tercihi tanımlanır. Bu kapalı yapı, dermokozmetik tedarik kanalında kritik olan fiyat gizliliği, kontrollü ürün dağıtımı ve bayi sınıflandırması ihtiyaçlarına doğrudan cevap verir.

## Distribütör için neden davetli pazaryeri

Dermokozmetik markalarının dağıtım anlaşmaları çoğunlukla bölgesel kısıtlar, bayi sınıfları (A/B/C) ve özel kontrat fiyatlarıyla yürür. Bu yapıyı klasik bir e-ticaret altyapısında doğru kurmak hem zordur hem de risklidir. i-Depo, dağıtımın kapalılığını koruyarak siparişin dijitalleşmesini sağlar; her bayi yalnızca kendisine açılan ürünleri ve fiyatları görür, kontrat dışı sipariş geçemez.

## Eczane / bayi tarafındaki deneyim

Davet edilen bir eczane, mobil uygulamasına giriş yaptığında doğrudan kendi fiyat grubunda görüntülenen ürünleri görür. Sürekli sipariş verdiği SKU'lar için "tekrar sipariş" listesi oluşturur, kampanya dönemlerinde özel sepetler hazırlar, açık hesap limitini ve son ödeme tarihini anlık takip eder. Sipariş onayından sevkiyat ve teslimata kadar tüm aşamalar uygulamadan görülür.

## Modül listesi

- Davet bazlı erişim ve eczane onay akışı
- Fiyat grupları (A/B/C bayi sınıfları, özel kontrat)
- Bölgesel görünürlük ve stok dağıtımı
- Çoklu depo desteği ve depodan-eczaneye atama
- Toplu sipariş ve hızlı sipariş listeleri (Excel içe aktarma)
- Cari hesap, açık hesap limiti ve kontrat şartları
- Çek/senet takibi, ödeme planı ve ekstre
- Kampanya motoru (sınıf bazlı, koşullu, hediye ürün)
- E-fatura, e-arşiv, banka tahsilat ve POS entegrasyonu
- Logo / Mikro / Netsis iki yönlü ERP entegrasyonu

## Sağladığı operasyonel etki

i-Depo, distribütöre kontrolü kaybetmeden tedarik kanalını dijitalleştirme imkânı tanır. Sahaya çıkan satış temsilcisi sayısını azaltırken, eczanenin sipariş frekansını artırır. Aynı anda 50 farklı bayinin geçtiği yüzlerce kalemli siparişler, manuel veri girişi olmadan ERP'ye düşer; muhasebe ve sevkiyat ekipleri sipariş işleme yerine istisna yönetimine odaklanır. Bu yapı dermokozmetik distribütörü için doğrudan operasyon maliyetini düşürür ve tedarik akışında hata oranını azaltır.`,
    seoTitle: "i-Depo | Dermokozmetik Distribütör B2B Pazaryeri Yazılımı",
    seoDescription:
      "i-Depo, dermokozmetik distribütörleri için kapalı/davetli B2B pazaryeri yazılımı. Bayi fiyat grupları, cari limit, kampanya, çoklu depo ve ERP entegrasyonu içerir."
  },

  {
    slug: "i-hirdavat",
    title: "i-Hırdavat",
    category: "B2B Sipariş & Cari Yönetimi",
    sector: "Hırdavat & Yapı Market",
    status: "Yayında",
    accent: "#F59E0B",
    year: 2024,
    sortOrder: 3,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Hırdavat sektöründe toptancı ile bayi arasında çalışan B2B sipariş ve cari yönetim platformu. Kalem bazlı hızlı sipariş, özel fiyat ve sevkiyat takibi üzerine kurulu.",
    content: `i-Hırdavat, hırdavat ve yapı market sektörü için özel olarak kurgulanmış bir B2B sipariş ve cari yönetim platformudur. Hırdavat sektörünün karakteristiği olan binlerce SKU, ölçü/ebat varyasyonu, paket bazlı satış ve bölgesel bayi ağları gibi ihtiyaçlar; klasik e-ticaret altyapılarında çözülemeyen problemler olarak öne çıkar. i-Hırdavat bu ihtiyaçları temel alarak, toptancılar ile nalburlar/yapı marketler arasında tekrar eden, yüksek kalemli ve hızlı yapılması gereken siparişleri dijital bir kanala taşır.

## Hırdavat sektörünün B2B özgün ihtiyaçları

Hırdavat ürün ağacı çoğu sektörden çok daha derindir: bir vidanın çapı, boyu, baş tipi, malzemesi ve kaplaması ayrı ayrı varyantlar oluşturur. Bayi siparişlerinin büyük kısmı tekrar eden kalemlerden oluştuğu için klasik kategori-bazlı alışveriş deneyimi yetersiz kalır. i-Hırdavat, "kalem listesi" yaklaşımıyla bayinin sürekli aldığı SKU'ları kayıt altına alır, geçmiş siparişlerden tek tıkla yeniden sipariş yapılmasını sağlar ve barkod/SKU okuyucularıyla mobilde hızlı sepet oluşturmaya imkân verir.

## Toptancı paneli ve fiyat yönetimi

Toptancı tarafında her bayiye özel iskonto, ödeme vadesi, minimum sipariş tutarı ve sevkiyat sıklığı tanımlanabilir. Birden fazla depo için stok yönetimi, en yakın depodan otomatik atama ve aynı sipariş için bölünmüş sevkiyat planlama özellikleri vardır. Fiyat değişikliği, kampanya açma ve yeni ürün yayınlama tek panelden yapılır.

## Modül listesi

- Çok varyantlı ürün kataloğu (ölçü, ebat, malzeme, kaplama)
- Kalem bazlı hızlı sipariş ve geçmişten tekrar sipariş
- Mobil uygulama: barkod/SKU okuyucu ile saha siparişi
- Bayi grubu bazlı fiyat ve iskonto
- Çoklu depo, en yakın depodan otomatik sevkiyat ataması
- Sevkiyat takibi: hazırlama, kargo, teslim, ETA
- Cari hesap, açık hesap limit ve risk skoru
- Çek/senet takibi, ekstre, ödeme planı
- Kampanya motoru: tonaj/kasa bazlı indirim, sezon kampanyaları
- ERP entegrasyonu (Logo, Mikro, Netsis ve özel ERP)

## Sağlanan iş kazanımları

i-Hırdavat ile birlikte çalıştığımız toptancılarda bayi sipariş sıklığı arttı, sipariş başına geçen süre düştü ve sipariş hatası neredeyse sıfırlandı. Sahada satış temsilcisinin not aldığı sipariş kâğıtları yerine, bayinin kendi mobil uygulamasından gönderdiği yapısal siparişler ERP'ye akmaya başladı. Toptancı için bu kanalın getirisi yalnızca ciro değil; aynı zamanda iş gücünün yeniden satış ve müşteri ilişkilerine odaklanabilmesidir.`,
    seoTitle: "i-Hırdavat | Hırdavat & Yapı Market B2B Sipariş Yazılımı",
    seoDescription:
      "i-Hırdavat, hırdavat ve yapı market sektörü için B2B sipariş ve cari yönetim yazılımı. Kalem bazlı hızlı sipariş, özel fiyat, çoklu depo, sevkiyat ve ERP entegrasyonu."
  },

  {
    slug: "i-bijuteri",
    title: "i-Bijuteri",
    category: "B2B Sipariş Pazaryeri",
    sector: "Bijuteri & Aksesuar",
    status: "Yayında",
    accent: "#E11D48",
    year: 2024,
    sortOrder: 4,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Bijuteri üreticileri, ithalatçılar ve perakendeciler için B2B sipariş pazaryeri. Koli bazlı sipariş, koleksiyon sunumu ve vadeli satış akışlarını yönetir.",
    content: `i-Bijuteri, bijuteri üreticileri ve ithalatçıları ile perakendeci mağazalar arasında çalışan görsel ağırlıklı bir B2B sipariş pazaryeridir. Bijuteri sektörünün satış kanalı; sezon koleksiyonları, koli bazlı satış, vadeli ödeme ve görselin ürünün önüne geçtiği bir karakter taşır. i-Bijuteri bu sektörel ihtiyaçlara özel olarak kurgulanmış; perakendecinin koleksiyonları sanal showroom benzeri bir deneyimle gezdiği, koli adetleriyle hızlı sipariş geçtiği ve cari/vade yapısını yönetebildiği bir platformdur.

## Bijuteride B2B'nin görsel boyutu

Bijuteri ürünlerinin çoğu görsel ağırlıklı kategori olduğu için B2B sürecin çekirdeğinde "ürün vitrini" yer almak zorundadır. i-Bijuteri'de her ürün; çoklu görsel, video, malzeme bilgisi, renk ve ölçü varyasyonlarıyla zengin bir ürün kartı olarak yayınlanır. Perakendeci ürünü "lookbook" tarzı bir akış içinde gezebilir, favori koleksiyonlar oluşturabilir, hızlı sipariş için filtrelenmiş listeler hazırlayabilir.

## Koli mantığı ve minimum sipariş

Bijuteri toptanı çoğunlukla koli bazlı yapılır: bir SKU 6'lı, 12'li veya 24'lü kolilerde satılır, perakendeci adet değil koli sipariş eder. i-Bijuteri'de her ürün için koli adeti, minimum sipariş kombinasyonu ve sezon kampanyaları kurgulanabilir. Sepete eklerken sistem otomatik olarak koli mantığına göre miktarı önerir.

## Modül listesi

- Görsel ağırlıklı katalog: çoklu fotoğraf, video, lookbook
- Koleksiyon ve sezon yönetimi (SS25, AW25 vb.)
- Koli bazlı sipariş, minimum sipariş tutarı/kombinasyonu
- Perakendeci grupları ve özel fiyat listeleri
- Vadeli satış: ödeme planı, çek/senet, açık hesap
- Mobil uygulama: koleksiyon gezme ve hızlı sipariş
- Stok ve sevkiyat: ön sipariş, hazırlama, kargo
- Geri bildirim toplama: koleksiyon performansı
- ERP entegrasyonu ve e-fatura/e-arşiv
- Kampanya: koli adetine göre indirim, koleksiyon hediye

## Perakendeci için kazanım

Bijuteri perakendecisinin en büyük operasyonel yükü, sezon başlarında onlarca tedarikçiden ürün seçip stok hazırlamasıdır. i-Bijuteri ile bu süreç dijital bir showroom deneyimine dönüşür; perakendeci sezon sepetini hazırlar, tedarikçiyle birlikte revize eder ve siparişi tek tuşla onaylar. Toptancı tarafında ise koleksiyon performansı, hangi ürünün hangi bölgede daha iyi tuttuğu ve sezonluk talep eğrileri net olarak raporlanır.`,
    seoTitle: "i-Bijuteri | Bijuteri Aksesuar B2B Sipariş Pazaryeri",
    seoDescription:
      "i-Bijuteri, bijuteri üretici ve ithalatçıları için görsel ağırlıklı B2B sipariş pazaryeri. Koleksiyon yönetimi, koli bazlı sipariş, vadeli satış ve perakendeci paneli."
  },

  {
    slug: "i-kirtasiye",
    title: "i-Kırtasiye",
    category: "Liste Bazlı B2B Pazaryeri",
    sector: "Kırtasiye & Ofis Tedarik",
    status: "Yayında",
    accent: "#7C3AED",
    year: 2024,
    sortOrder: 5,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Okul ve ofis tedarik kanalı için B2B kırtasiye pazaryeri. Liste bazlı sipariş, sezon kampanyaları ve kurumsal toplu alım süreçlerine odaklanır.",
    content: `i-Kırtasiye, kırtasiye toptancıları ile okullar, kurumsal ofisler, kırtasiye perakendecileri ve hediyelik eşya kanalı arasında çalışan bir B2B sipariş pazaryeridir. Kırtasiye sektörünün satış akışı, yıl boyunca düz tempolu seyrederken Ağustos-Eylül okul döneminde yoğun bir patlamaya, yıl sonu kurumsal alımlarında ise toplu listelere dayanır. i-Kırtasiye bu iki farklı tempoyu (rutin tedarik + sezon ataklı liste alımı) tek bir platformda yönetebilen, liste bazlı sipariş mantığı üzerine kurulu bir altyapıdır.

## Liste bazlı sipariş neden önemli

Kurumsal alıcı, okul müdürlüğü veya kırtasiye zincirinin sipariş şekli "ürün ürün gez" değil "listeyi yükle, miktarları belirle, gönder" şeklindedir. i-Kırtasiye'nin merkezindeki liste motoru; Excel/CSV import, geçmiş sipariş listeleri, okul bazlı standart paket listeleri ve kurumsal yıllık demirbaş listeleri gibi yapıları destekler. Bir liste yüklendiğinde sistem ürünleri SKU/barkod üzerinden eşleştirir, eksik ürünleri bildirir ve fiyat hesabını anlık yapar.

## Sezon kampanyaları ve okul döneminin yönetimi

Ağustos-Eylül "okul başlangıcı" sezonu, kırtasiye sektörünün ciro tepe noktasıdır. i-Kırtasiye sezon başlamadan önce ön sipariş kampanyalarını, set ürün indirimlerini ve okul listelerine özel paket fiyatlarını kurgulamaya imkân verir. Sezon içinde ise stok darboğazlarını engellemek için tedarikçi-bazlı sevkiyat planlaması, alternatif ürün önerisi ve son dakika kampanyaları kullanılabilir.

## Modül listesi

- Liste bazlı sipariş: Excel/CSV içe aktarma, geçmiş listeden tekrar sipariş
- Standart paket listeleri (okul standardı, kurumsal demirbaş)
- Sezon kampanya motoru ve ön sipariş yönetimi
- Çoklu fiyat listesi: bayi, kurumsal alıcı, okul, perakendeci
- Set ürün ve paket indirimi
- Kurumsal teklif akışı (RFQ): istek > teklif > onay
- Cari hesap, açık hesap, kurumsal fatura
- Çoklu depo ve okul-bazlı sevkiyat planlaması
- ERP entegrasyonu, e-fatura, e-arşiv
- Mobil uygulama: hızlı tarama ve sepet hazırlama

## Hedef kitle ve kullanım senaryoları

Platformun ana kullanıcı grupları; kırtasiye toptancıları ve distribütörleri, kırtasiye zincirleri, okul satın alma yetkilileri, kurumsal satın alma birimleri (insan kaynakları, idari işler) ve kırtasiye e-ticaret/marketplace satıcılarıdır. Her grubun kendine özgü onay akışı, fiyat görme yetkisi ve sipariş limiti tanımlanabilir. i-Kırtasiye sektördeki manuel teklif-pazarlık-sipariş döngüsünü dijital bir akışa kavuşturarak hem toptancıyı hem alıcıyı zaman ve maliyet açısından rahatlatır.`,
    seoTitle: "i-Kırtasiye | Okul ve Ofis Tedarik B2B Pazaryeri Yazılımı",
    seoDescription:
      "i-Kırtasiye, okul ve ofis tedarik kanalı için liste bazlı B2B kırtasiye pazaryeri. Excel sipariş, sezon kampanyaları, kurumsal RFQ ve toplu alım yönetimi."
  },

  {
    slug: "i-nalbur",
    title: "i-Nalbur",
    category: "Bölgesel B2B Tedarik Platformu",
    sector: "Yapı & Nalbur",
    status: "Beta",
    accent: "#475569",
    year: 2025,
    sortOrder: 6,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Yapı ve nalbur sektöründe bölgesel B2B tedarik platformu. Bölgesel stok, yakın tedarikçi eşleştirme ve proje bazlı sipariş akışı için kurgulanmıştır. Şu an beta statüsünde.",
    content: `i-Nalbur, yapı ve nalbur sektöründe bölgesel tedarik akışını dijitalleştirmek üzere kurulmuş, halen beta sürümünde olan bir B2B platformdur. Klasik B2B pazaryerlerinden farklı olarak i-Nalbur'un ana ekseni "bölgesellik" üzerine kurgulanmıştır: müşteri bir ürünü ararken yalnızca kendi bölgesindeki stoğu olan tedarikçileri görür, sevkiyat süresi minimize edilir, küçük şantiye ve yapı marketleri için günlük tedarik sürekliliği sağlanır.

## Neden bölgesel tedarik

Yapı sektörünün tedarik akışı, ürünün özelliğinden çok lojistiğine bağlıdır. Çimento, demir, alçı, agrega gibi ağır ve hacimli ürünlerin uzak şehirden taşınması ekonomik değildir; aynı şekilde inşaat sahasının ihtiyaç duyduğu küçük metrekare seramik, fayans, boya ürünleri için bölgedeki nalburdan günlük tedarik beklenir. i-Nalbur tam bu noktada; bölgesel stok haritası oluşturarak en yakın tedarikçiyi en hızlı şekilde alıcıya bağlar.

## Proje bazlı sipariş akışı

Yapı sektöründe siparişler çoğunlukla "proje" mantığıyla yönetilir: bir şantiyenin malzeme ihtiyacı, fiyat onayı, sevkiyat planlaması ve cari kayıt aynı proje altında izlenir. i-Nalbur'da müşteri (örneğin bir taşeron veya şantiye satın alma sorumlusu) projesini tanımlar, alt malzeme listesini oluşturur, bölgedeki tedarikçilerden teklif alır ve siparişi proje bazlı yürütür. Proje ilerledikçe yapılan tüm siparişler aynı dosya altında raporlanabilir.

## Modül listesi (beta)

- Bölgesel stok haritası ve yakın tedarikçi eşleştirme
- Proje bazlı sipariş ve dosyalama
- Çoklu tedarikçi teklif akışı (RFQ)
- Hızlı sipariş ve günlük tedarik abonelikleri
- Şantiyeye sevkiyat: araç tipi, boşaltma seçenekleri, ETA
- Toplu cari ve proje bazlı bakiye takibi
- Mobil uygulama: saha kullanımı, fotoğraf+barkod ile sipariş
- ERP ve muhasebe entegrasyonu
- Kademeli tedarikçi onayı ve değerlendirme sistemi

## Beta sürecindeki yol haritası

i-Nalbur şu an seçili pilot bölgelerde beta olarak çalışmaktadır. Beta sürecinde toplanan saha geri bildirimleriyle özellikle "bölgesel stok güvenilirliği", "şantiye lojistiği" ve "proje bazlı raporlama" başlıklarında iyileştirmeler yapılmaktadır. Genel kullanıma açılma planı 2026 birinci yarıyılındadır. Yapı malzemesi distribütörlüğü, perakende nalbur zincirleri ve büyük ölçekli müteahhit firmalarla erken erişim görüşmelerimiz devam etmektedir.`,
    seoTitle: "i-Nalbur | Bölgesel Yapı & Nalbur B2B Tedarik Platformu",
    seoDescription:
      "i-Nalbur, yapı ve nalbur sektörü için bölgesel B2B tedarik platformu. Bölgesel stok haritası, proje bazlı sipariş, şantiye sevkiyatı ve tedarikçi RFQ akışı."
  },

  {
    slug: "i-zeruj",
    title: "i-Zeruj",
    category: "Günlük Sipariş B2B Platformu",
    sector: "Hal & Restoran Tedarik",
    status: "Beta",
    accent: "#16A34A",
    year: 2025,
    sortOrder: 7,
    isFeatured: true,
    isPublished: true,
    shortDesc:
      "Hal esnafı ile restoran, catering ve otel mutfakları arasında günlük zerzevat sipariş akışını dijitalleştiren B2B platform. Günlük fiyat, gece siparişi ve cari takip üzerine kurulu. Şu an beta statüsünde.",
    content: `i-Zeruj, sebze-meyve hali (toptan gıda hali) esnafı ile restoran zincirleri, catering firmaları, otel mutfakları, hastane mutfakları ve toplu yemek üreticileri arasında çalışan bir B2B günlük sipariş platformudur. Bu sektörün en kritik karakteri, fiyatın gün içinde hatta saat içinde değişmesi ve sipariş penceresinin gece yarısından sabaha kadar dar bir aralıkta açık kalmasıdır. i-Zeruj klasik B2B pazaryerlerinin alışveriş mantığını değil, hal esnafının doğal iş ritmini esas alarak kurgulanmış bir platformdur.

## Sektörün kendine özgü zaman akışı

Hal işleyişi şu şekilde döner: ürün geceleri hale gelir, sabaha doğru fiyat oluşur, restoran/catering müşterileri o gecenin sonunda sipariş geçer ve sabah erken saatlerde sevkiyat başlar. i-Zeruj bu döngüye uyum sağlamak için "günlük menü" yapısını kullanır; her hal esnafı her gece kendi günlük ürün listesini, tahmini fiyatını ve teslim saatini sisteme yükler, müşteri gece yarısı bu menüyü görerek siparişini geçer. Fiyat değişikliği gerçekleştiğinde müşteri otomatik bilgilendirilir.

## Müşteri tarafı: restoran, catering, otel

Restoran şefi veya satın alma sorumlusu mobil uygulama üzerinden kayıtlı tedarikçilerinin gece menüsünü görür, geçmiş siparişlerden hızlıca yeniden sipariş geçer veya yeni ürün ekler. Sipariş gönderildiğinde tedarikçiden anlık onay alır, sabah teslim saatini görür, eksik gelen veya iade edilen ürünler için doğrudan uygulamadan iade kaydı oluşturur. Cari hesap, haftalık/aylık bakiye ve fatura gönderimleri otomatik yürür.

## Hal esnafı tarafı

Hal esnafı için sistem; her gece menü güncelleme, sipariş onayı, sevkiyat listesi hazırlama, eksik ürün için müşteri bilgilendirme ve haftalık tahsilat takibi gibi rutin işleri uygulamadan yapılabilir hale getirir. Çağrı merkezi olarak çalışan telefonların yerine yapısal sipariş verisi geçer; bu da fire ve hata oranını ciddi şekilde düşürür.

## Modül listesi (beta)

- Günlük menü oluşturma ve dinamik fiyat
- Gece sipariş penceresi ve teslim saati yönetimi
- Restoran/catering mobil uygulaması (iOS & Android)
- Hızlı tekrar sipariş ve haftalık şablon listesi
- İade kaydı ve eksik teslim yönetimi
- Cari hesap, haftalık/aylık ekstre, çek/senet
- Çoklu tedarikçiyle çalışma (zincir restoran için)
- Sevkiyat planlama ve sürücü mobil görevleri
- Soğuk zincir ve hassas ürün takibi
- ERP/muhasebe entegrasyonu

## Beta sürecindeki kapsam

i-Zeruj şu an İstanbul ve Ankara hallerindeki seçili tedarikçiler ile pilot restoran ve catering müşterileriyle beta olarak çalışmaktadır. Beta sürecinde özellikle gece sipariş penceresinin operasyonel akışı, fiyat değişikliği bildirimleri ve eksik teslim çözümlerinde ciddi iyileştirmeler yapılmaktadır. 2026 birinci yarıyıl içinde hal genelinde yaygınlaştırma ve toplu yemek/hastane mutfakları gibi yeni segmentlere açılma planlanmaktadır.`,
    seoTitle: "i-Zeruj | Hal & Restoran Günlük B2B Sipariş Platformu",
    seoDescription:
      "i-Zeruj, hal esnafı ile restoran, catering ve otel mutfakları arasında günlük zerzevat sipariş akışını dijitalleştiren B2B platform. Günlük fiyat, gece siparişi, cari."
  }
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
    console.log(`✓ ${project.slug}`);
  }
  console.log(`\n${projects.length} project upserted.`);
}

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
