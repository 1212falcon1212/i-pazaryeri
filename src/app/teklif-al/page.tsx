import { Sparkles, Mail, Phone, MapPin, Check } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getOfferServiceOptions, getSectors, getSettings } from "@/lib/content";
import { createOffer } from "./actions";

type Props = {
  searchParams: Promise<{
    success?: string;
    error?: string;
    model?: string;
    pkg?: string;
    modules?: string;
    message?: string;
    networkSize?: string;
  }>;
};

export const metadata = {
  title: "Teklif Al",
  description:
    "B2B, B2C veya C2C pazaryeri ihtiyacınız için sektörünüze özel teklif alın. Mevcut sipariş akışınızı ve beklediğiniz modülleri paylaşın, 1 iş günü içinde dönüş yapalım."
};

const benefitItems = [
  "30 dakikalık ücretsiz analiz görüşmesi",
  "Sektörünüze özel modül planlaması",
  "ERP, kargo, ödeme entegrasyon haritası",
  "Canlıya geçiş süresi ve fazlandırma"
];

export default async function OfferPage({ searchParams }: Props) {
  const [settings, sectors, serviceOptions, query] = await Promise.all([
    getSettings(),
    getSectors(),
    getOfferServiceOptions(),
    searchParams
  ]);

  return (
    <PublicShell>
      <main className="offer-page home">
        <section className="features-hero offer-hero">
          <div className="container">
            <span className="hero-eyebrow"><Sparkles size={14} /> Teklif Al</span>
            <h1 className="features-hero-title">
              Sektörünüze özel B2B pazaryerini
              <span className="hero-title-highlight"> birlikte planlayalım.</span>
            </h1>
            <p className="features-hero-description">
              {settings.finalCtaDescription}
            </p>
          </div>
        </section>

        <section className="offer-section">
          <div className="container offer-grid">
            <aside className="offer-aside">
              <h3>Görüşmemizde neler var?</h3>
              <ul className="offer-benefits">
                {benefitItems.map((b) => (
                  <li key={b}>
                    <Check size={16} /> {b}
                  </li>
                ))}
              </ul>
              <div className="offer-contact-block">
                <h4>Doğrudan iletişim</h4>
                <ul>
                  {settings.contactEmail ? (
                    <li>
                      <Mail size={14} />
                      <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
                    </li>
                  ) : null}
                  {settings.contactPhone ? (
                    <li>
                      <Phone size={14} />
                      <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}>{settings.contactPhone}</a>
                    </li>
                  ) : null}
                  <li>
                    <MapPin size={14} />
                    <span>İstanbul, Türkiye</span>
                  </li>
                </ul>
              </div>
            </aside>

            <form id="form" className="offer-form" action={createOffer}>
              {query.success ? <div className="offer-notice offer-notice-success">Talebiniz alındı. En kısa sürede dönüş yapılacak.</div> : null}
              {query.error ? <div className="offer-notice offer-notice-error">{query.error}</div> : null}
              {query.model || query.pkg ? (
                <div className="offer-notice offer-notice-prefilled">
                  <strong>Wizard üzerinden geldi:</strong>
                  <span>
                    {query.model ? `Model: ${query.model.toUpperCase()}` : null}
                    {query.model && query.pkg ? " • " : null}
                    {query.pkg ? `Paket: ${query.pkg}` : null}
                  </span>
                </div>
              ) : null}

              <div className="offer-form-grid">
                <label className="offer-field">
                  <span>Ad Soyad *</span>
                  <input name="fullName" required autoComplete="name" />
                </label>
                <label className="offer-field">
                  <span>Şirket *</span>
                  <input name="company" required autoComplete="organization" />
                </label>
                <label className="offer-field">
                  <span>E-posta</span>
                  <input name="email" type="email" autoComplete="email" placeholder="ornek@firma.com" />
                </label>
                <label className="offer-field">
                  <span>Telefon</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="05xx xxx xx xx" />
                </label>
                <label className="offer-field">
                  <span>Sektör *</span>
                  <select name="sector" required defaultValue="">
                    <option value="" disabled>Seçiniz</option>
                    {sectors.map((sector) => <option key={sector.id} value={sector.title}>{sector.title}</option>)}
                  </select>
                </label>
                <label className="offer-field">
                  <span>Sipariş hacmi / bayi sayısı</span>
                  <input
                    name="networkSize"
                    placeholder="Örn. 50 bayi veya 1.000 sipariş/ay"
                    defaultValue={query.networkSize ?? ""}
                  />
                </label>
              </div>

              {serviceOptions.length > 0 ? (
                <div className="offer-services">
                  <span className="offer-services-label">İlgilendiğiniz servisler</span>
                  <div className="offer-services-grid">
                    {serviceOptions.map((option) => (
                      <label className="offer-service-pill" key={option.id}>
                        <input type="checkbox" name="selectedServices" value={option.value} />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              <label className="offer-field">
                <span>İstenen modüller</span>
                <input
                  name="modules"
                  placeholder="Sipariş, stok, cari, ERP entegrasyonu..."
                  defaultValue={query.modules ?? ""}
                />
              </label>

              <label className="offer-field">
                <span>Kısa ihtiyaç notu *</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Mevcut sipariş akışınızı kısaca anlatabilir misiniz? Hangi sorunları çözmek istiyorsunuz?"
                  defaultValue={query.message ?? ""}
                />
              </label>

              <p className="offer-form-hint">* zorunlu alanlar — telefon veya e-postadan en az birini doldurun.</p>

              <button className="btn btn-primary btn-lg offer-submit" type="submit">
                {settings.primaryCtaLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
