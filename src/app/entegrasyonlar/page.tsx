import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { getIntegrationGroups } from "@/lib/content";

export const metadata = {
  title: "Entegrasyonlar | ERP, Kargo, Ödeme, Pazaryeri | i-Pazaryeri",
  description:
    "ERP, e-fatura, kargo, ödeme, pazaryeri, sosyal medya, analitik, affiliate ve güvenlik — i-Pazaryeri altyapısının desteklediği tüm entegrasyonlar tek sayfada."
};

export default async function IntegrationsPage() {
  const groups = await getIntegrationGroups();
  const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <PublicShell>
      <main className="integrations-page home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow">
              <Sparkles size={14} /> {totalCount}+ entegrasyon
            </span>
            <h1 className="features-hero-title">
              ERP, kargo, ödeme, pazaryeri ve fazlası
              <span className="hero-title-highlight"> — hepsi tek altyapıda.</span>
            </h1>
            <p className="features-hero-description">
              i-Pazaryeri altyapısı, Türkiye ve uluslararası pazaryerlerinde sıkça kullanılan {totalCount}+ sağlayıcıyla hazır entegrasyona sahiptir. Özel ERP'ler veya niş sağlayıcılar için adapter mimarisiyle hızlıca entegrasyon geliştirilir.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" href="/teklif-al">
                Entegrasyon ihtiyacınızı konuşalım <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/blog/erp-muhasebe-entegrasyonu-detayli-rehber">
                ERP entegrasyon rehberi
              </Link>
            </div>
          </div>
        </section>

        {groups.map((group) => (
          <section className="integration-section" id={group.slug} key={group.id}>
            <div className="container">
              <div className="integration-section-head">
                <div className="integration-section-icon">
                  <FeatureIcon name={group.icon ?? "Cable"} />
                </div>
                <div>
                  <h2>{group.title}</h2>
                  {group.description ? <p>{group.description}</p> : null}
                </div>
              </div>
              <div className="integration-card-grid">
                {group.items.map((item) => (
                  <div className="integration-card" key={item.id}>
                    <strong>{item.name}</strong>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <div className="final-cta-copy">
                <span className="final-cta-eyebrow">
                  <Sparkles size={14} /> Özel entegrasyon
                </span>
                <h2>Listede olmayan bir sağlayıcı mı var?</h2>
                <p>Adapter mimarimiz sayesinde özel ERP, kargo veya pazaryeri sağlayıcısı için 2-3 hafta içinde entegrasyon geliştiririz. Sektörünüze özel sağlayıcılar için kapsam görüşmesi yapalım.</p>
                <div className="final-cta-actions">
                  <Link className="btn btn-primary btn-lg" href="/teklif-al">
                    Özel entegrasyon talep et <ArrowRight size={16} />
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
