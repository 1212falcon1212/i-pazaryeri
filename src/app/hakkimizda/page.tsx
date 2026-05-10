import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getStaticPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStaticPage("hakkimizda");
  return {
    title: page?.seoTitle ?? "Hakkımızda | i-Pazaryeri",
    description: page?.seoDescription ?? undefined
  };
}

function safeParseJsonArray<T = unknown>(value: string | null): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function splitParagraphs(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function AboutPage() {
  const page = await getStaticPage("hakkimizda");
  if (!page) notFound();

  const proofItems = safeParseJsonArray<string>(page.proofItems);
  const stats = safeParseJsonArray<{ value: string; label: string }>(page.stats);
  const paragraphs = splitParagraphs(page.bodyContent);

  return (
    <PublicShell>
      <main className="about-page home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow">
              <Sparkles size={14} /> {page.heroEyebrow ?? "Hakkımızda"}
            </span>
            <h1 className="features-hero-title">
              {page.heroTitle}{" "}
              {page.heroHighlight ? (
                <span className="hero-title-highlight">{page.heroHighlight}</span>
              ) : null}
            </h1>
            <p className="features-hero-description">{page.heroDescription}</p>
            {page.heroCtaLabel && page.heroCtaHref ? (
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href={page.heroCtaHref}>
                  {page.heroCtaLabel} <ArrowRight size={16} />
                </Link>
                {page.heroCtaSecondaryLabel && page.heroCtaSecondaryHref ? (
                  <Link className="btn btn-ghost btn-lg" href={page.heroCtaSecondaryHref}>
                    {page.heroCtaSecondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        {paragraphs.length > 0 || proofItems.length > 0 ? (
          <section className="about-content-section">
            <div className="container about-content-v2">
              <article className="about-main-v2">
                {paragraphs.map((p, i) => {
                  if (p.startsWith("## ")) {
                    return <h2 key={i}>{p.slice(3)}</h2>;
                  }
                  if (i === 0 && page.bodyTitle) {
                    return (
                      <div key={i}>
                        <h2>{page.bodyTitle}</h2>
                        <p>{p}</p>
                      </div>
                    );
                  }
                  return <p key={i}>{p}</p>;
                })}
              </article>
              {proofItems.length > 0 ? (
                <aside className="about-proof-v2">
                  {page.proofTitle ? <h3>{page.proofTitle}</h3> : null}
                  <ul>
                    {proofItems.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {page.visualImage ? (
                    <div className="about-visual-v2">
                      <Image
                        src={page.visualImage}
                        alt={page.heroTitle}
                        fill
                        sizes="(max-width: 980px) 100vw, 360px"
                      />
                    </div>
                  ) : null}
                </aside>
              ) : null}
            </div>
          </section>
        ) : null}

        {stats.length > 0 ? (
          <section className="about-stats-v2-section">
            <div className="container">
              <div className="about-stats-v2-grid">
                {stats.map((s) => (
                  <div className="metric-card" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
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
                    <Sparkles size={14} /> {page.ctaEyebrow ?? "Birlikte planlayalım"}
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
