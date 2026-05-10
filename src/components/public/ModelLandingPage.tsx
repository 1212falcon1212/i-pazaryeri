import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  TrendingUp
} from "lucide-react";
import type {
  BusinessModelPage,
  BusinessModelHighlight,
  BusinessModelUseCase,
  BusinessModelMetric
} from "@prisma/client";
import { FeatureIcon } from "./FeatureIcon";

export type ModelPageData = BusinessModelPage & {
  highlights: BusinessModelHighlight[];
  useCases: BusinessModelUseCase[];
  metrics: BusinessModelMetric[];
};

function safeParseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ModelLandingPage({ model }: { model: ModelPageData }) {
  const audience = safeParseJsonArray(model.audience);
  const slugUpper = model.slug.toUpperCase();

  return (
    <main className="model-page home">
      {/* Hero */}
      <section className="model-hero">
        <div className="container">
          <span className="hero-eyebrow">
            <Sparkles size={14} /> {model.badge}
          </span>
          <h1 className="model-hero-title">
            {model.title}{" "}
            <span className="hero-title-highlight">{model.highlight}</span>
          </h1>
          <p className="model-hero-description">{model.description}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" href={model.primaryCtaHref}>
              {model.primaryCtaLabel} <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-ghost btn-lg" href="/ozellikler">
              Tüm özellikleri gör
            </Link>
          </div>
        </div>
      </section>

      {/* Audience */}
      {audience.length > 0 ? (
        <section className="model-audience-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Kimler için?</span>
              <h2>Bu altyapı sizin için doğru mu?</h2>
            </div>
            <div className="model-audience-grid">
              {audience.map((item) => (
                <div className="model-audience-card" key={item}>
                  <CheckCircle2 size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Highlights */}
      {model.highlights.length > 0 ? (
        <section className="services-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Çekirdek özellikler</span>
              <h2>{slugUpper} altyapısı ne sunar?</h2>
              <p>Aşağıdaki tüm özellikler hazır gelir. Sektörünüze özel detaylar üstüne eklenir.</p>
            </div>
            <div className="services-grid services-grid-wide">
              {model.highlights.map((h) => (
                <div className="service-card" key={h.id}>
                  <div className="service-card-head">
                    <div className="service-card-icon">
                      <FeatureIcon name={h.icon} />
                    </div>
                    <h3>{h.title}</h3>
                  </div>
                  <p>{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Use Cases */}
      {model.useCases.length > 0 ? (
        <section className="usecases-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Kullanım senaryoları</span>
              <h2>Sektörünüze yakın örnekler.</h2>
              <p>Farklı sektörlerden tipik kurulumlar — kapsam ve sonuç odaklı.</p>
            </div>
            <div className="usecase-grid">
              {model.useCases.map((uc) => (
                <article className="usecase-card" key={uc.id}>
                  <div className="usecase-icon">
                    <Building2 size={20} />
                  </div>
                  <h3>{uc.industry}</h3>
                  <p className="usecase-scenario">
                    <strong>Senaryo:</strong> {uc.scenario}
                  </p>
                  <p className="usecase-outcome">
                    <TrendingUp size={14} /> {uc.outcome}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Metrics */}
      {model.metrics.length > 0 ? (
        <section className="metrics-section">
          <div className="container">
            <div className="metrics-grid">
              <div className="metrics-copy">
                <span className="kicker">Operasyonel kazanç</span>
                <h2>Sayılarla {slugUpper} altyapısı.</h2>
                <p>Doğru kurgulanmış {slugUpper} altyapısı, manuel iş yükünü minimize ederken müşteri ve operasyon deneyimini iyileştirir.</p>
              </div>
              <div className="metrics-numbers">
                {model.metrics.map((s) => (
                  <div className="metric-card" key={s.id}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Integrations */}
      {model.integrationsCopy ? (
        <section className="model-integrations-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Entegrasyonlar</span>
              <h2>Yaygın {slugUpper} sağlayıcıları kutudan çıkar gelir.</h2>
            </div>
            <p className="model-integrations-copy">{model.integrationsCopy}</p>
            <div className="section-foot">
              <Link className="btn btn-soft btn-lg" href="/entegrasyonlar">
                Tüm entegrasyonları gör <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card">
            <div className="final-cta-copy">
              <span className="final-cta-eyebrow">
                <Sparkles size={14} /> Birlikte planlayalım
              </span>
              <h2>{model.ctaTitle}</h2>
              <p>{model.ctaDescription}</p>
              <div className="final-cta-actions">
                <Link className="btn btn-primary btn-lg" href={model.primaryCtaHref}>
                  {model.primaryCtaLabel} <ArrowRight size={16} />
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/paketler">
                  Paketleri gör
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
