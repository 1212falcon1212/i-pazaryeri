import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { getIntegrationGroups, getSettings, getSolutionCards } from "@/lib/content";

function splitLines(value: string | null) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export const metadata = {
  title: "Özellikler — Neler Sunuyoruz | i-Pazaryeri",
  description:
    "i-Pazaryeri B2B pazaryeri yazılımının çözüm modülleri: ürün katalog, fiyat listesi, sipariş, cari yönetimi, ERP, kargo, ödeme ve admin panel."
};

export default async function FeaturesPage() {
  const [settings, cards, integrationGroups] = await Promise.all([
    getSettings(),
    getSolutionCards(),
    getIntegrationGroups()
  ]);

  return (
    <PublicShell>
      <main className="features-page home">
        {/* Hero */}
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow"><Sparkles size={14} /> Çözüm modülleri</span>
            <h1 className="features-hero-title">
              B2B pazaryeriniz için ihtiyacınız olan
              <span className="hero-title-highlight"> her şey bir altyapıda.</span>
            </h1>
            <p className="features-hero-description">
              {settings.featuresDescription} Aşağıdaki modüllerin hepsi hazır gelir; sektörünüze özel ihtiyaçlar üstüne ek olarak inşa edilir.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
                Teklif Al <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/paketler">
                Paketleri gör
              </Link>
            </div>
          </div>
        </section>

        {/* Solution cards */}
        <section className="services-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Çözümler</span>
              <h2>Neler sunuyoruz?</h2>
              <p>Her bir modül canlı operasyonda test edilmiş, ölçeklenebilir bir altyapı parçasıdır. Karta tıklayarak detaylarına ulaşabilirsiniz.</p>
            </div>
            <div className="services-grid services-grid-wide">
              {cards.map((card) => (
                <Link
                  className={`service-card${card.visualImage ? " service-card-with-banner" : ""}`}
                  href={`/ozellikler/${card.slug}`}
                  key={card.id}
                >
                  {card.visualImage ? (
                    <div className="service-card-banner">
                      <Image
                        src={card.visualImage}
                        alt={card.question}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 380px"
                        className="service-card-banner-img"
                      />
                    </div>
                  ) : null}
                  <div className="service-card-body">
                    {!card.visualImage ? (
                      <div className="service-card-head">
                        <div className="service-card-icon">
                          <FeatureIcon name={card.icon ?? "Plug"} />
                        </div>
                        <h3>{card.question}</h3>
                      </div>
                    ) : (
                      <h3 className="service-card-h3-banner">{card.question}</h3>
                    )}
                    <p>{card.answer}</p>
                    {card.brands ? (
                      <div className="service-card-brands">
                        {splitLines(card.brands).slice(0, 5).map((b) => <span key={b}>{b}</span>)}
                      </div>
                    ) : null}
                    <span className="service-card-link">
                      Detayları gör <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="integrations-section">
          <div className="container integrations-grid">
            <div className="integrations-copy">
              <span className="kicker">Entegrasyonlar</span>
              <h2>{settings.integrationsTitle ?? "Yaygın ERP, kargo ve ödeme sağlayıcılarıyla hazır."}</h2>
              {settings.integrationsDesc ? <p>{settings.integrationsDesc}</p> : null}
              <Link className="btn btn-soft btn-lg" href="/entegrasyonlar">
                Tüm entegrasyonlar <ArrowRight size={16} />
              </Link>
            </div>
            <div className="integrations-groups">
              {integrationGroups.map((g) => (
                <div className="integration-group" key={g.id}>
                  <h4>{g.title}</h4>
                  <div className="integration-chips">
                    {g.items.map((it) => <span key={it.id}>{it.name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <div className="final-cta-copy">
                <span className="final-cta-eyebrow"><Sparkles size={14} /> Birlikte planlayalım</span>
                <h2>Sektörünüze özel modülleri konuşalım.</h2>
                <p>30 dakikalık ücretsiz analiz görüşmesinde modülleri, entegrasyonları ve canlıya geçiş fazlandırmasını birlikte belirliyoruz.</p>
                <div className="final-cta-actions">
                  <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
                    Teklif Al <ArrowRight size={16} />
                  </Link>
                  <Link className="btn btn-ghost btn-lg" href="/sik-sorulan-sorular">
                    SSS'yi incele
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
