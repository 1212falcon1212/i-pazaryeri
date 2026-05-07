import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { PublicShell } from "@/components/public/PublicShell";
import { ProjectCard } from "@/components/public/ProjectCard";
import {
  getFeaturedFaqs,
  getProjects,
  getPosts,
  getSeoArticleSection,
  getSettings,
  getSolutionCards
} from "@/lib/content";
import { homepageHero, marketplaceTrustTags } from "@/lib/homepage-copy";

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function HeroIllustration({ imageSrc, imageAlt }: { imageSrc?: string | null; imageAlt?: string | null }) {
  if (imageSrc) {
    return (
      <div className="clean-hero-visual image-mode">
        <Image
          src={imageSrc}
          alt={imageAlt ?? "i-Pazaryeri B2B pazaryeri altyapısı görseli"}
          width={1440}
          height={900}
          priority
          sizes="(max-width: 768px) 90vw, 720px"
        />
      </div>
    );
  }

  return (
    <div className="clean-hero-visual" aria-hidden="true">
      <div className="hero-blob" />
      <div className="commerce-window">
        <div className="commerce-toolbar">
          <span />
          <span />
          <span />
          <b>www</b>
        </div>
        <div className="commerce-grid">
          <div className="commerce-product a" />
          <div className="commerce-product b" />
          <div className="commerce-product c" />
        </div>
        <div className="commerce-cart">
          <div />
          <span>1</span>
        </div>
        <div className="ops-panel">
          <b>Canlı operasyon</b>
          <span>ERP stok senkron</span>
        </div>
      </div>
      <div className="hero-person left" />
      <div className="hero-person right" />
      <div className="store-badges">
        <span>WEB</span>
        <span>ERP</span>
        <span>API</span>
      </div>
    </div>
  );
}

function SolutionCardVisual({
  card
}: {
  card: {
    question: string;
    icon?: string | null;
    visualImage?: string | null;
    visualAccent?: string | null;
  };
}) {
  const accent = card.visualAccent || "#B87333";

  if (card.visualImage) {
    return (
      <div className="service-card-visual image" style={{ "--card-accent": accent } as CSSProperties}>
        <Image
          src={card.visualImage}
          alt={`${card.question} görseli`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className="service-card-visual" style={{ "--card-accent": accent } as CSSProperties} aria-hidden="true">
      <FeatureIcon name={card.icon || "Plug"} />
      <div>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

type SeoArticle = Awaited<ReturnType<typeof getSeoArticleSection>>;

function SeoArticleBlock({ article }: { article: NonNullable<SeoArticle> }) {
  const tocItems = splitLines(article.tableOfContents);
  const paragraphs = splitParagraphs(article.content);

  return (
    <section className="seo-article-section">
      <div className="container seo-article-shell">
        <aside className="seo-article-sidebar">
          <div className="seo-article-head">
            {article.eyebrow ? <span>{article.eyebrow}</span> : null}
            <h2>{article.title}</h2>
            <p>{article.intro}</p>
          </div>

          {tocItems.length > 0 ? (
            <nav className="seo-toc" aria-label="SEO yazısı içindekiler">
              {tocItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>
          ) : null}
        </aside>

        <div className="seo-article-content">
          {paragraphs.map((paragraph) => {
            const isHeading = /^\d+(\.\d+)*\.\s/.test(paragraph) || paragraph.length < 86 && paragraph.endsWith(":");
            return isHeading ? <h3 key={paragraph}>{paragraph}</h3> : <p key={paragraph}>{paragraph}</p>;
          })}
        </div>
      </div>

      {article.ctaTitle || article.ctaDescription || article.ctaHref ? (
        <div className="container">
          <div className="seo-article-cta">
            <div>
              {article.ctaTitle ? <h3>{article.ctaTitle}</h3> : null}
              {article.ctaDescription ? <p>{article.ctaDescription}</p> : null}
            </div>
            {article.ctaHref && article.ctaLabel ? (
              <Link className="btn btn-accent btn-lg" href={article.ctaHref}>
                {article.ctaLabel} <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default async function HomePage() {
  const [settings, solutionCards, projects, featuredFaqs, posts, seoArticle] = await Promise.all([
    getSettings(),
    getSolutionCards(),
    getProjects(),
    getFeaturedFaqs(),
    getPosts(),
    getSeoArticleSection("homepage-after-blog")
  ]);

  return (
    <PublicShell>
      <main className="clean-home">
        <section className="clean-hero">
          <div className="container clean-hero-grid">
            <div className="clean-hero-copy">
              <h1>
                <span>{homepageHero.accent}</span>
                {homepageHero.title}
              </h1>
              <p>{homepageHero.description}</p>
              <Link className="btn btn-accent btn-lg" href={settings.primaryCtaHref}>
                {homepageHero.primaryCta}
              </Link>
            </div>
            <HeroIllustration imageSrc={settings.heroBannerImage} imageAlt={settings.heroBannerAlt} />
          </div>
        </section>

        <section className="trust-strip-section">
          <div className="container">
            <p className="trust-strip-copy">
              i-Pazaryeri altyapısı ile bayi, ürün, fiyat, stok ve sipariş süreçlerinizi tek teknoloji bütününde yönetebilirsiniz.
            </p>
            <div className="trust-strip">
              {marketplaceTrustTags.map((tag, index) => (
                <span key={tag}>
                  {tag}
                  {index < marketplaceTrustTags.length - 1 ? <i /> : null}
                </span>
              ))}
            </div>
          </div>
        </section>

        {solutionCards.length > 0 ? (
          <section className="clean-services">
            <div className="container">
              <div className="clean-section-head centered">
                <span>Nasıl çözüyoruz?</span>
                <h2>Pazaryeriniz için çalışan teknik servisler hazır.</h2>
              </div>
              <div className="clean-service-grid">
                {solutionCards.slice(0, 6).map((card) => (
                  <Link className="clean-service-card linked" href={`/ozellikler/${card.slug}`} key={card.id}>
                    <SolutionCardVisual card={card} />
                    <h3>{card.question}</h3>
                    <p>{card.answer}</p>
                    <span className="service-detail-link">Detayları gör <ArrowRight size={14} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className="clean-projects">
            <div className="container">
              <div className="clean-section-head">
                <span>Projeler</span>
                <h2>{settings.projectsTitle}</h2>
                <p>{settings.projectsDescription}</p>
              </div>
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="clean-section-actions">
                <Link className="btn btn-accent btn-lg" href="/projeler">
                  Tüm projeleri gör <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {featuredFaqs.length > 0 ? (
          <section className="clean-faq-preview">
            <div className="container clean-faq-grid">
              <div>
                <span className="clean-eyebrow">Sık sorulan sorular</span>
                <h2>Aklınızda soru işareti kalmasın.</h2>
                <p>
                  B2B pazaryeri yazılımı, kurulum, entegrasyon ve kapsam hakkında en çok merak edilen soruları bir araya getirdik.
                </p>
                <Link className="btn btn-accent btn-lg" href="/sik-sorulan-sorular">
                  Tümünü görüntüle
                </Link>
              </div>
              <div className="faq-accordion-preview">
                {featuredFaqs.slice(0, 4).map((faq) => (
                  <Link href="/sik-sorulan-sorular" className="faq-line" key={faq.id}>
                    <ChevronDown size={16} />
                    <span>{faq.question}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {posts.length > 0 ? (
          <section className="clean-blog">
            <div className="container">
              <div className="clean-section-head centered">
                <span>Blog</span>
                <h2>B2B pazaryeri hakkında güncel yazılar.</h2>
              </div>
              <div className="clean-blog-grid">
                {posts.slice(0, 3).map((post) => (
                  <article className="clean-blog-card" key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="blog-card-visual" aria-label={post.title}>
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <span>{post.tag}</span>
                      )}
                    </Link>
                    <div className="clean-blog-body">
                      {post.tag ? <span className="blog-card-tag">{post.tag}</span> : null}
                      <h3>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p>{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`}>
                        Oku <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {seoArticle ? <SeoArticleBlock article={seoArticle} /> : null}

        <section className="clean-final-cta">
          <div className="container clean-final-cta-inner">
            <h2>{settings.finalCtaTitle}</h2>
            <p>{settings.finalCtaDescription}</p>
            <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
              {settings.primaryCtaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
