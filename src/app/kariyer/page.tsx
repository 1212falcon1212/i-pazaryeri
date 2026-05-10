import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { getJobRoles, getStaticPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStaticPage("kariyer");
  return {
    title: page?.seoTitle ?? "Kariyer | i-Pazaryeri",
    description: page?.seoDescription ?? undefined
  };
}

export default async function CareerPage() {
  const [page, roles] = await Promise.all([getStaticPage("kariyer"), getJobRoles()]);
  if (!page) notFound();

  return (
    <PublicShell>
      <main className="career-page home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow">
              <Sparkles size={14} /> {page.heroEyebrow ?? "Kariyer"}
            </span>
            <h1 className="features-hero-title">
              {page.heroTitle}{" "}
              {page.heroHighlight ? (
                <span className="hero-title-highlight">{page.heroHighlight}</span>
              ) : null}
            </h1>
            <p className="features-hero-description">{page.heroDescription}</p>
          </div>
        </section>

        {roles.length > 0 ? (
          <section className="services-section">
            <div className="container">
              <div className="section-head centered">
                <span className="kicker">Roller</span>
                <h2>Hangi alanda çalışabilirsiniz?</h2>
                <p>Açık pozisyon olmadığında bile yeteneklerle ileriye dönük tanışmaktan keyif alıyoruz.</p>
              </div>
              <div className="services-grid services-grid-wide">
                {roles.map((role) => (
                  <div className="service-card" key={role.id}>
                    <div className="service-card-head">
                      <div className="service-card-icon">
                        <FeatureIcon name={role.icon ?? "Plug"} />
                      </div>
                      <h3>{role.title}</h3>
                    </div>
                    <p>{role.description}</p>
                    {role.location || role.type ? (
                      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
                        {[role.location, role.type].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                    {role.applyUrl ? (
                      <Link href={role.applyUrl} className="service-card-link">
                        Başvur <ArrowRight size={14} />
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {page.ctaTitle ? (
          <section className="final-cta-section">
            <div className="container">
              <div className="final-cta-card">
                <div className="final-cta-copy">
                  <span className="final-cta-eyebrow">
                    <Sparkles size={14} /> {page.ctaEyebrow ?? "Açık başvuru"}
                  </span>
                  <h2>{page.ctaTitle}</h2>
                  {page.ctaDescription ? <p>{page.ctaDescription}</p> : null}
                  {page.ctaLabel && page.ctaHref ? (
                    <div className="final-cta-actions">
                      <Link className="btn btn-primary btn-lg" href={page.ctaHref}>
                        {page.ctaLabel} <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </PublicShell>
  );
}
