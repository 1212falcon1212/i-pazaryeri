import Link from "next/link";
import { ArrowRight, Sparkles, Check, Gift, Calendar, Zap } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getPackages, getSettings } from "@/lib/content";

export const metadata = {
  title: "Paketler | i-Pazaryeri",
  description:
    "i-Pazaryeri B2B pazaryeri yazılımı paketleri. Bayi ağı, entegrasyon ihtiyacı ve canlıya geçiş hedefinize göre uygun paketi seçin."
};

export default async function PackagesPage() {
  const [packages, settings] = await Promise.all([getPackages(), getSettings()]);

  return (
    <PublicShell>
      <main className="packages-page home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow"><Sparkles size={14} /> Paketler</span>
            <h1 className="features-hero-title">
              İhtiyacınıza uygun başlangıç paketi.
              <span className="hero-title-highlight"> Modüler şekilde büyütün.</span>
            </h1>
            <p className="features-hero-description">
              Bayi ağı, entegrasyon ihtiyacı ve canlıya geçiş hedefinize göre uygun kapsamı birlikte seçiyoruz. Her paket sektörünüze özel olarak uyarlanabilir.
            </p>
          </div>
        </section>

        {/* ==================== KAMPANYA BANNER ==================== */}
        <section className="packages-promo-section">
          <div className="container">
            <div className="packages-promo-card">
              <div className="packages-promo-deco" aria-hidden="true">
                <span className="packages-promo-glow packages-promo-glow-a" />
                <span className="packages-promo-glow packages-promo-glow-b" />
                <span className="packages-promo-grid" />
              </div>

              <div className="packages-promo-badge">
                <Gift size={14} /> Sınırlı süreli kampanya
              </div>

              <h2 className="packages-promo-title">
                İlk <strong>6 ay bizden</strong>, ikinci <strong>6 ay sizden</strong>.
              </h2>
              <p className="packages-promo-desc">
                Yıllık abonelikte ilk 6 ayı hediye ediyoruz, sonraki 6 ayı siz ödüyorsunuz — yani <strong>%50 indirimli yıllık kullanım</strong>. Tüm paketler için geçerli.
              </p>

              <div className="packages-promo-points">
                <div className="packages-promo-point">
                  <span className="packages-promo-point-icon"><Calendar size={16} /></span>
                  <div>
                    <strong>6 + 6 ay</strong>
                    <span>İlk 6 ay ücretsiz, sonraki 6 ay normal</span>
                  </div>
                </div>
                <div className="packages-promo-point">
                  <span className="packages-promo-point-icon"><Zap size={16} /></span>
                  <div>
                    <strong>Tüm paketler</strong>
                    <span>Başlangıç, Profesyonel, Kurumsal — hepsi dahil</span>
                  </div>
                </div>
                <div className="packages-promo-point">
                  <span className="packages-promo-point-icon"><Sparkles size={16} /></span>
                  <div>
                    <strong>Bağlayıcı değil</strong>
                    <span>Önce demo, sonra karar</span>
                  </div>
                </div>
              </div>

              <div className="packages-promo-actions">
                <Link className="btn btn-primary btn-lg" href="/teklif-al?campaign=6plus6">
                  Bu fiyatla teklif al <ArrowRight size={16} />
                </Link>
                <span className="packages-promo-note">⚡ Kampanya süresi sınırlıdır</span>
              </div>
            </div>
          </div>
        </section>

        <section className="packages-detail-section">
          <div className="container">
            <div className="package-detail-grid">
              {packages.map((pkg, idx) => {
                const featured = pkg.isFeatured || (packages.length === 3 && idx === 1);
                return (
                  <article
                    className={`package-detail-card${featured ? " package-detail-card-featured" : ""}`}
                    key={pkg.id}
                  >
                    {featured ? <span className="package-badge">Öne çıkan</span> : null}
                    {pkg.audience ? (
                      <span className="package-detail-audience">{pkg.audience}</span>
                    ) : null}
                    <h2>{pkg.name}</h2>
                    <p className="package-detail-tagline">{pkg.tagline}</p>

                    <div className="package-detail-price">
                      {pkg.priceLabel ? <span className="package-price-label">{pkg.priceLabel}</span> : null}
                      <div className="package-detail-price-row">
                        {pkg.price ? <strong>{pkg.price}</strong> : <strong className="package-price-quote">Özel teklif</strong>}
                        {pkg.pricePeriod ? <span className="package-price-period">{pkg.pricePeriod}</span> : null}
                      </div>
                      {pkg.priceNote ? <small className="package-detail-note">{pkg.priceNote}</small> : null}
                    </div>

                    {pkg.description ? (
                      <p className="package-detail-desc">{pkg.description}</p>
                    ) : null}

                    {pkg.features.length > 0 ? (
                      <ul className="package-feature-list-v2">
                        {pkg.features.map((feature) => (
                          <li key={feature.id}>
                            <Check size={14} />
                            <div>
                              <strong>{feature.label}</strong>
                              {feature.value && feature.value !== feature.label ? (
                                <span>{feature.value}</span>
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <Link
                      className={`btn btn-lg package-cta ${featured ? "btn-primary" : "btn-ghost"}`}
                      href={pkg.ctaHref ?? "/teklif-al"}
                    >
                      {pkg.ctaLabel ?? "Teklif al"} <ArrowRight size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <div className="final-cta-copy">
                <span className="final-cta-eyebrow"><Sparkles size={14} /> Sektörünüze özel paket</span>
                <h2>Standart paket ihtiyacınızı karşılamıyor mu?</h2>
                <p>Sektörünüze, bayi ağınıza ve entegrasyon ihtiyacınıza göre özel kapsam tasarlıyoruz. Sizinle 30 dakikalık bir analiz görüşmesinde ihtiyaçları beraber netleştirelim.</p>
                <div className="final-cta-actions">
                  <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
                    Özel teklif al <ArrowRight size={16} />
                  </Link>
                  <Link className="btn btn-ghost btn-lg" href="/ozellikler">
                    Tüm özellikler
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
