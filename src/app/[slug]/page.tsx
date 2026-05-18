import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Scale, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { RichContent } from "@/components/public/RichContent";
import { getStaticPage } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getStaticPage(slug);
  return {
    title: page?.seoTitle ?? page?.heroTitle,
    description: page?.seoDescription ?? page?.heroDescription
  };
}

export default async function StaticPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = await getStaticPage(slug);
  if (!page) notFound();

  return (
    <PublicShell>
      <main className="home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow">
              <Scale size={14} /> {page.heroEyebrow ?? "Yasal"}
            </span>
            <h1 className="features-hero-title">
              {page.heroTitle}{" "}
              {page.heroHighlight ? <span className="hero-title-highlight">{page.heroHighlight}</span> : null}
            </h1>
            <p className="features-hero-description">{page.heroDescription}</p>
          </div>
        </section>

        <section className="section blog-detail-body-section">
          <div className="container blog-detail-grid">
            <article className="blog-detail-body">
              {page.bodyTitle ? <h2 className="rich-h2">{page.bodyTitle}</h2> : null}
              {page.bodyContent ? <RichContent content={page.bodyContent} /> : null}
            </article>

            <aside className="blog-detail-sidebar">
              <div className="blog-sidebar-sticky">
                <div className="blog-sidebar-card blog-sidebar-cta">
                  <div className="blog-sidebar-cta-icon" aria-hidden="true">
                    <Sparkles size={18} />
                  </div>
                  <h3>Yasal metinler bilgilendirme amaçlıdır</h3>
                  <p>Projenizin iş modeli, ödeme akışı, veri işleme yöntemi ve sektörüne göre hukuki danışmanlıkla özelleştirilmesi önerilir.</p>
                  <Link href="/teklif-al" className="btn btn-accent btn-sm blog-sidebar-cta-btn">
                    Projeyi konuşalım <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
