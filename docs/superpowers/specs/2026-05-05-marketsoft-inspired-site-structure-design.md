# i-Pazaryeri Marketsoft Referanslı Site Yapısı Tasarımı

## Amaç

i-Pazaryeri sitesini sadece vitrin/portföy sayfası olmaktan çıkarıp, B2B pazaryeri altyapısı satın almayı düşünen karar vericinin sorularını sırayla cevaplayan bir satış ve bilgilendirme yapısına dönüştürmek.

Referans olarak Marketsoft ana sayfası ve Sık Sorulan Sorular sayfası incelendi. Referanstan alınacak ana fikirler şunlar:

- "Neler sunuyoruz?" bölümündeki servis/modül kartı disiplini.
- "Nasıl ilerleyeceğiz?" bölümündeki süreç anlatımı.
- "Neden Marketsoft?" bölümündeki kısa ikna maddeleri.
- Ana sayfada öne çıkan SSS ve ayrı SSS sayfası.
- Çalışan demo/kanıt üzerinden güven oluşturma yaklaşımı.

Bu yapı birebir kopyalanmayacak. i-Pazaryeri dili C2C pazaryeri değil, B2B bayi/tedarikçi/kurumsal alıcı ağı odağında olacak.

## Seçilen Yaklaşım

Ana omurga "problemden çözüme giden danışmanlık odaklı yapı" olacak.

Bu yapı üç fikri birleştirir:

- Problem odaklı akış: Ziyaretçi önce kendi operasyon sorunlarını görür.
- Servis/modül vitrini: Hazır altyapının hangi parçaları sunduğu netleşir.
- Çalışan sistem kanıtı: i-Depo, i-Eczane, i-Hırdavat, i-Bijuteri gibi örnekler güven unsuru olarak öne çıkar.

## Ana Navigasyon

Public site ana menüsü:

- Hakkımızda
- Özellikler
- Paketler
- Sık Sorulan Sorular
- Blog
- İletişim
- Teklif Al

"Teklif Al" birincil CTA olarak kalır. "Projeler" menüde gerekirse "Referanslar" ismiyle kullanılabilir, ancak ana karar akışında çalışan sistem kanıtları ana sayfaya da taşınmalıdır.

## Ana Sayfa Akışı

Ana sayfa şu bölümlerden oluşacak:

1. Hero
   - B2B pazaryeri altyapısı vaadi.
   - Bayi, tedarikçi ve kurumsal alıcı ağları vurgusu.
   - Birincil CTA: Teklif Al / Keşif Görüşmesi Planla.

2. Sorun Alanı
   - WhatsApp/Excel üzerinden sipariş takibi.
   - Bayiye özel fiyat listeleri.
   - Stok, cari, sipariş ve ERP kopukluğu.
   - Tedarikçi/bayi rol ayrımı.

3. Çalışan Sistem Kanıtları
   - i-Depo, i-Eczane, i-Hırdavat, i-Bijuteri kartları.
   - Her kartta sektör, kısa açıklama, kullanılan modül vurgusu.
   - Detay sayfalarında problem, çözüm, modüller ve sonuç anlatımı.

4. Neler Sunuyoruz?
   - Marketsoft referansındaki servis kartı yapısının B2B karşılığı.
   - Örnek modüller: bayi yönetimi, ürün/katalog, fiyat listeleri, teklif/sipariş, cari/stok, ERP, ödeme, kargo, bildirim, raporlama, API.

5. Nasıl İlerleyeceğiz?
   - Keşif görüşmesi.
   - Kapsam ve modül seçimi.
   - Veri hazırlığı ve aktarım.
   - Uyarlama ve entegrasyon.
   - Test ve canlıya geçiş.
   - Destek ve iyileştirme.

6. Neden i-Pazaryeri?
   - Kanıtlanmış çekirdek altyapı.
   - Sıfırdan geliştirmeye göre daha düşük risk.
   - Daha hızlı yayına alma.
   - Sektöre uyarlanabilir modüler yapı.

7. Öne Çıkan SSS
   - Maliyet, süre, özel geliştirme, ERP entegrasyonu, veri aktarımı, destek ve sahiplik soruları.
   - Ayrı SSS sayfasına yönlendirme.

8. Final CTA
   - 60 dakikalık keşif görüşmesi veya teklif talebi.
   - Karar vericiyi form doldurmaya taşıyan net kapanış.

## Public Sayfalar

### Özellikler

Servis/modül kataloğu olacak. Her modül şunları anlatır:

- Hangi operasyon sorununu çözer?
- Kim kullanır?
- Hangi çıktıyı üretir?
- Hangi entegrasyon veya paketlerle ilişkili olabilir?

### Paketler

Fiyat belirtmeden kapsam karşılaştırması sunar.

Önerilen paket yapısı:

- Başlangıç: Temel B2B katalog, bayi girişi, teklif/sipariş akışı.
- Profesyonel: Fiyat listeleri, cari/stok görünürlüğü, raporlar, temel entegrasyonlar.
- Kurumsal: Çoklu rol, özel iş kuralları, ERP/API entegrasyonu, ileri destek.

Paketler kesin fiyat sayfası değil; "hangi işletme hangi kapsamla başlamalı?" sorusunu cevaplayan yönlendirme sayfası olmalı.

### Sık Sorulan Sorular

Referans sitedeki kısa SSS yaklaşımı genişletilecek. Sayfa satın alma itirazlarını çözen detaylı bir bilgi merkezi olacak.

Önerilen kategoriler:

- Kurulum ve süre
- Maliyet ve kapsam
- Özelleştirme
- ERP ve entegrasyonlar
- Veri aktarımı
- Güvenlik ve yetkilendirme
- Destek ve bakım

### Projeler / Referanslar

Çalışan sistem kanıtı sayfası olacak. Proje detaylarında sadece açıklama değil, vaka anlatımı bulunmalı:

- Başlangıç problemi.
- Kurulan çözüm.
- Kullanılan modüller.
- İşletmeye sağlanan çıktı.

### Teklif Al

Mevcut teklif formu korunur, ancak yeni servis/paket yapısına bağlanır.

Form şunları toplamalı:

- İletişim bilgileri.
- Sektör.
- Bayi/tedarikçi/kurumsal alıcı ağı büyüklüğü.
- İlgilenilen servis/modül seçenekleri.
- Entegrasyon ihtiyacı.
- Kısa ihtiyaç notu.

## Admin Panel Kapsamı

Seçilen kapsam: yapılandırılmış admin.

Tam sayfa oluşturucu yapılmayacak. Bunun yerine içerik türleri net veri modelleriyle yönetilecek.

Admin menüye eklenecek/güçlendirilecek başlıklar:

- Ana Sayfa
- Servisler / Modüller
- Paketler
- Sık Sorulan Sorular
- Projeler
- Sektörler
- Blog
- Teklifler
- Site Ayarları

## Veri Modeli Taslağı

### HomeSectionItem

Ana sayfadaki tekrar eden içerikler için kullanılacak.

Tip örnekleri:

- problem
- process
- reason

Alanlar:

- title
- description
- icon
- type
- sortOrder
- isPublished

### ServiceModule

Servis/modül kartları ve detayları.

Alanlar:

- slug
- title
- shortDesc
- content
- icon
- category
- sortOrder
- isPublished
- seoTitle
- seoDescription

Mevcut `Feature` modeli bu role dönüştürülebilir veya yeni model oluşturulabilir. Uygulama planında migration riski ve mevcut veri kullanımı dikkate alınarak karar verilecek.

### Package

Paket sayfasındaki kapsam grupları.

Alanlar:

- slug
- name
- tagline
- description
- audience
- ctaLabel
- ctaHref
- sortOrder
- isFeatured
- isPublished

### PackageFeature

Paket karşılaştırma satırları.

Alanlar:

- packageId
- label
- value
- group
- sortOrder

### FaqCategory

SSS kategori başlıkları.

Alanlar:

- slug
- title
- description
- sortOrder
- isPublished

### FaqItem

SSS soru-cevap kayıtları.

Alanlar:

- categoryId
- question
- answer
- sortOrder
- isFeatured
- isPublished

### OfferServiceOption

Teklif formundaki seçilebilir hizmet/modül ihtiyaçları.

Alanlar:

- label
- value
- sortOrder
- isPublished

## Teknik Yaklaşım

Mevcut mimari korunacak:

- Next.js App Router.
- Prisma + SQLite.
- Server actions ile admin kayıt işlemleri.
- Public veri erişimi için `src/lib/content.ts`.
- Admin erişimi için mevcut cookie tabanlı `requireAdmin` akışı.

Yeni sayfalar ve veri erişimleri mevcut pattern ile yazılacak. Büyük bir CMS veya sayfa oluşturucu eklenmeyecek.

## Test ve Doğrulama

Uygulamada şu doğrulamalar yapılmalı:

- Veri okuma yardımcıları için odaklı unit testler.
- Teklif formu validasyonunda servis seçimi eklendiğinde test güncellemesi.
- Prisma schema sonrası `prisma generate`.
- `pnpm test`.
- `pnpm build`.

Public sayfa görsel doğrulaması için değişiklik sonrası yerel dev server açılıp ana sayfa, paketler, SSS ve teklif formu kontrol edilmeli.

## Kapsam Dışı

Bu tasarımda şu işler yok:

- Çok dilli yapı.
- Sürükle/bırak sayfa oluşturucu.
- Online ödeme veya abonelik.
- Kullanıcı hesabı/CRM sistemi.
- Gelişmiş medya kütüphanesi.

## Açık Kararlar

Uygulama planında netleştirilecek kararlar:

- Mevcut `Feature` modeli `ServiceModule` olarak mı evrilecek, yoksa yeni model mi açılacak?
- "Projeler" public menüde kalacak mı, yoksa "Referanslar" ismine mi dönecek?
- Paketlerde fiyat bilgisi tamamen gizli mi kalacak, yoksa "Teklif bazlı" etiketi kullanılacak mı?
