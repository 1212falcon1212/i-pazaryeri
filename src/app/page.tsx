import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Sparkles,
  Zap,
  Smartphone,
  Cable,
  Truck,
  Wallet,
  Search as SearchIcon,
  MessagesSquare,
  PhoneCall
} from "lucide-react";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { HomeWizard } from "@/components/public/HomeWizard";
import { PublicShell } from "@/components/public/PublicShell";
import {
  getBusinessModelCards,
  getFeaturedFaqs,
  getFeaturedPosts,
  getHomeStats,
  getIntegrationGroups,
  getPackages,
  getPlatformShowcaseCards,
  getSeoArticleSection,
  getSettings,
  getSolutionCards
} from "@/lib/content";

function safeParseJsonArray(value: string | null | undefined, fallback: string[] = []): string[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
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
            <nav className="seo-toc" aria-label="İçindekiler">
              {tocItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>
          ) : null}
        </aside>
        <div className="seo-article-content">
          {paragraphs.map((paragraph) => {
            const isHeading =
              /^\d+(\.\d+)*\.\s/.test(paragraph) || (paragraph.length < 86 && paragraph.endsWith(":"));
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
              <Link className="btn btn-primary btn-lg" href={article.ctaHref}>
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
  const [
    settings,
    solutionCards,
    featuredFaqs,
    featuredPosts,
    packages,
    seoArticle,
    businessModelCards,
    homeStats,
    platformShowcase,
    integrationGroups
  ] = await Promise.all([
    getSettings(),
    getSolutionCards(),
    getFeaturedFaqs(),
    getFeaturedPosts(),
    getPackages(),
    getSeoArticleSection("homepage-after-blog"),
    getBusinessModelCards(),
    getHomeStats(),
    getPlatformShowcaseCards(),
    getIntegrationGroups()
  ]);

  // Hero copy from settings (with safe fallbacks)
  const heroEyebrow = settings.heroEyebrow ?? "B2B • B2C • C2C — Tek Altyapı";
  const heroRotatingWords = safeParseJsonArray(settings.heroRotatingWords, ["Bayi portalı", "Online mağaza", "Pazaryeri"]);
  const heroTitleLead = settings.heroTitleLead ?? "İster";
  const heroTitleConnector = settings.heroTitleConnector ?? "için —";
  const heroHighlight = settings.heroHighlight ?? "ticaret altyapınız tek yerde.";
  const heroChecklist = safeParseJsonArray(settings.heroChecklist, []);
  const heroPrimaryCta = settings.heroPrimaryCta ?? "Teklif Al";
  const heroSecondaryCta = settings.heroSecondaryCta ?? "Demo görmek istiyorum";
  const trustTags = safeParseJsonArray(settings.trustTags, []);
  const integrationsTitle = settings.integrationsTitle ?? "Yaygın ERP, kargo ve ödeme sağlayıcılarıyla hazır.";
  const integrationsDesc = settings.integrationsDesc ?? "";

  return (
    <PublicShell>
      <main className="home">
        {/* ==================== HERO ==================== */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-eyebrow">
                <Sparkles size={14} /> {heroEyebrow}
              </span>
              <h1 className="hero-title">
                {heroTitleLead}{" "}
                <span className="hero-rotator" aria-live="polite">
                  {heroRotatingWords.map((word, i) => (
                    <span key={word} style={{ animationDelay: `${i * 2}s` }}>{word}</span>
                  ))}
                </span>{" "}
                {heroTitleConnector}{" "}
                <span className="hero-title-highlight">{heroHighlight}</span>
              </h1>
              <p className="hero-description">{settings.heroDescription}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
                  {heroPrimaryCta} <ArrowRight size={16} />
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/ozellikler">
                  {heroSecondaryCta}
                </Link>
              </div>
              {heroChecklist.length > 0 ? (
                <ul className="hero-checklist">
                  {heroChecklist.map((item) => (
                    <li key={item}><Check size={16} /> {item}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="hero-visual" aria-hidden={settings.heroBannerImage ? undefined : true}>
              {settings.heroBannerImage ? (
                <div className="hero-banner-wrap">
                  <Image
                    src={settings.heroBannerImage}
                    alt={settings.heroBannerAlt ?? "i-Pazaryeri hero banner"}
                    fill
                    sizes="(max-width: 980px) 100vw, 600px"
                    priority
                    className="hero-banner-img"
                  />
                </div>
              ) : (
                <div className="hero-mock hero-mock-shop">
                  {/* Browser chrome */}
                  <div className="hero-mock-toolbar">
                    <span /><span /><span />
                    <b>shop.markaniz.com</b>
                    <span className="hero-mock-live">
                      <i className="hero-mock-live-dot" /> Canlı
                    </span>
                  </div>

                  {/* Site header bar (logo + search + cart) */}
                  <div className="hero-shop-header">
                    <div className="hero-shop-brand">
                      <span className="hero-shop-brand-mark">M</span>
                      <span>Markanız</span>
                    </div>
                    <div className="hero-shop-search">
                      <SearchIcon size={13} />
                      <span>Ürün ara…</span>
                    </div>
                    <div className="hero-shop-actions">
                      <span className="hero-shop-cart">
                        <Wallet size={14} />
                        <i className="hero-shop-cart-badge">3</i>
                      </span>
                    </div>
                  </div>

                  {/* Category nav */}
                  <div className="hero-shop-cats">
                    <span className="is-active">Yeni</span>
                    <span>Kadın</span>
                    <span>Erkek</span>
                    <span>Aksesuar</span>
                    <span className="hero-shop-cat-sale">Outlet</span>
                  </div>

                  {/* Promo banner */}
                  <div className="hero-shop-banner">
                    <div>
                      <span className="hero-shop-banner-eyebrow">Yaz Koleksiyonu</span>
                      <strong>%30'a varan indirim</strong>
                    </div>
                    <span className="hero-shop-banner-cta">İncele →</span>
                  </div>

                  {/* Product grid */}
                  <div className="hero-shop-products">
                    <div className="hero-shop-product hero-shop-product-1">
                      <div className="hero-shop-product-img">
                        <span className="hero-shop-product-fav">♡</span>
                        <span className="hero-shop-product-badge">−25%</span>
                      </div>
                      <div className="hero-shop-product-body">
                        <span className="hero-shop-product-name">Premium Tişört</span>
                        <span className="hero-shop-product-price">
                          <em>₺899</em>
                          <strong>₺674</strong>
                        </span>
                      </div>
                    </div>

                    <div className="hero-shop-product hero-shop-product-2">
                      <div className="hero-shop-product-img">
                        <span className="hero-shop-product-fav">♡</span>
                      </div>
                      <div className="hero-shop-product-body">
                        <span className="hero-shop-product-name">Deri Çanta</span>
                        <span className="hero-shop-product-price">
                          <strong>₺2.490</strong>
                        </span>
                      </div>
                    </div>

                    <div className="hero-shop-product hero-shop-product-3">
                      <div className="hero-shop-product-img">
                        <span className="hero-shop-product-fav is-fav">♥</span>
                        <span className="hero-shop-product-badge sale">Kampanya</span>
                      </div>
                      <div className="hero-shop-product-body">
                        <span className="hero-shop-product-name">Spor Ayakkabı</span>
                        <span className="hero-shop-product-price">
                          <em>₺3.299</em>
                          <strong>₺2.474</strong>
                        </span>
                      </div>
                    </div>

                    <div className="hero-shop-product hero-shop-product-4">
                      <div className="hero-shop-product-img">
                        <span className="hero-shop-product-fav">♡</span>
                      </div>
                      <div className="hero-shop-product-body">
                        <span className="hero-shop-product-name">Saat — Klasik</span>
                        <span className="hero-shop-product-price">
                          <strong>₺4.199</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Live order toast */}
                  <div className="hero-shop-toast">
                    <span className="hero-shop-toast-dot" />
                    <span>Demet K. <em>15 sn önce</em> sipariş verdi · Spor Ayakkabı</span>
                  </div>
                </div>
              )}

              <div className="hero-floating hero-floating-tl">
                <Smartphone size={18} />
                <div>
                  <strong>Mobil sipariş</strong>
                  <span>iOS & Android</span>
                </div>
              </div>
              <div className="hero-floating hero-floating-br">
                <Cable size={18} />
                <div>
                  <strong>30+ entegrasyon</strong>
                  <span>ERP, kargo, ödeme</span>
                </div>
              </div>
              <div className="hero-floating hero-floating-tr">
                <span className="hero-floating-badge">+%24</span>
                <div>
                  <strong>Aylık büyüme</strong>
                  <span>Son 30 gün</span>
                </div>
              </div>

              <div className="hero-glow" />
            </div>
          </div>
        </section>

        {/* ==================== TRUST STRIP ==================== */}
        <section className="trust">
          <div className="container">
            <p className="trust-copy">Tek altyapıda yöneteceğiniz tüm operasyon</p>
            <div className="trust-tags">
              {trustTags.map((tag) => (
                <span className="trust-chip" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== BUSINESS MODEL SHOWCASE (B2B/B2C/C2C) ==================== */}
        <section className="business-models-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Çözüm Modelleri</span>
              <h2>İhtiyacınıza göre seçin: B2B, B2C veya C2C.</h2>
              <p>Aynı çekirdek altyapı; üç farklı ticaret modelini destekleyecek şekilde yapılandırılır. Hangi modelle başlarsanız başlayın, ileride diğer modelleri de aynı sistem üstüne eklenebilir.</p>
            </div>
            <div className="business-models-grid">
              {businessModelCards.map((m) => {
                const bullets = safeParseJsonArray(m.bullets, []);
                return (
                  <Link key={m.slug} href={m.href} className={`business-model-card business-model-card-${m.color}`}>
                    {m.image ? (
                      <div className="business-model-cover">
                        <Image
                          src={m.image}
                          alt={m.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 400px"
                          className="business-model-cover-img"
                        />
                        <span className="business-model-badge">{m.badge}</span>
                      </div>
                    ) : null}
                    <div className="business-model-body">
                      <h3>{m.title}</h3>
                      <p>{m.description}</p>
                      <ul className="business-model-bullets">
                        {bullets.map((b) => (
                          <li key={b}><Check size={14} /> {b}</li>
                        ))}
                      </ul>
                      <span className="business-model-cta">
                        Detayları gör <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== WIZARD: "Ne için doğru?" ==================== */}
        <HomeWizard />

        {/* ==================== PLATFORM SHOWCASE ==================== */}
        <section className="platform-section">
          <div className="container">
            <div className="section-head centered">
              <span className="kicker">Platformu görün</span>
              <h2>Admin panel, mağaza vitrini ve mobil uygulama — tek altyapıda.</h2>
              <p>Yönetim, müşteri deneyimi ve mobil — üçü birden çalışan bir sistem. Görsellerin yerine sonradan kendi proje ekran görüntülerinizi koyabilirsiniz.</p>
            </div>
            <div className="platform-grid">
              {platformShowcase.map((p, idx) => {
                const bullets = safeParseJsonArray(p.bullets, []);
                return (
                  <article className={`platform-card${idx === 0 ? " platform-card-featured" : ""}`} key={p.slug}>
                    <div className="platform-card-image">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 600px"
                        className="platform-card-img"
                      />
                      <span className="platform-card-label">{p.label}</span>
                    </div>
                    <div className="platform-card-body">
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <ul className="platform-card-bullets">
                        {bullets.map((b) => (
                          <li key={b}><Check size={14} /> {b}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== SOLUTION CARDS — what we offer ==================== */}
        {solutionCards.length > 0 ? (
          <section className="services-section">
            <div className="container">
              <div className="section-head centered">
                <span className="kicker">Neler sunuyoruz?</span>
                <h2>Pazaryerinizin tüm operasyonel ihtiyaçları için hazır servisler.</h2>
                <p>Her servis canlıda test edilmiş bir altyapı parçasıdır — sektörünüze özel uyarlanır, üstüne ekleme yapılır.</p>
              </div>
              <div className="services-grid">
                {solutionCards.slice(0, 6).map((card) => (
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
                          {splitLines(card.brands).slice(0, 4).map((b) => (
                            <span key={b}>{b}</span>
                          ))}
                        </div>
                      ) : null}
                      <span className="service-card-link">
                        Detayları gör <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="section-foot">
                <Link className="btn btn-soft btn-lg" href="/ozellikler">
                  Tüm özellikleri gör <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* ==================== METRICS / WHY ==================== */}
        <section className="metrics-section">
          <div className="container">
            <div className="metrics-grid metrics-grid-with-image">
              <div className="metrics-image">
                <Image
                  src="/uploads/home/metrics-team.webp"
                  alt="Operasyon ekibi — dijital sipariş akışı"
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  className="metrics-image-img"
                />
              </div>
              <div className="metrics-copy">
                <span className="kicker">Operasyonel kazanç</span>
                <h2>Manuel sipariş işleme yerine, dijital akış.</h2>
                <p>İster bayi ağına satın, ister doğrudan tüketiciye, ister çoklu satıcı pazaryeri kurun — i-Pazaryeri ile WhatsApp, Excel ve telefon üçgeninde dağılan sipariş süreci raporlanabilir bir kanala dönüşür.</p>
                <div className="metrics-numbers">
                  {homeStats.map((s) => (
                    <div className="metric-card" key={s.id}>
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== PACKAGES PREVIEW ==================== */}
        {packages.length > 0 ? (
          <section className="packages-section">
            <div className="container">
              <div className="section-head centered">
                <span className="kicker">Paketler</span>
                <h2>İhtiyacınıza uygun başlangıç paketi.</h2>
                <p>Aşağıdaki paketlerden birini seçebilir ya da bizden sektörünüze özel bir kapsam talep edebilirsiniz.</p>
              </div>
              <div className="package-grid">
                {packages.slice(0, 3).map((pkg, idx) => (
                  <article
                    className={`package-card${pkg.isFeatured || idx === 1 ? " package-card-featured" : ""}`}
                    key={pkg.id}
                  >
                    {(pkg.isFeatured || idx === 1) ? <span className="package-badge">Öne çıkan</span> : null}
                    <h3>{pkg.name}</h3>
                    <p className="package-tagline">{pkg.tagline}</p>
                    <div className="package-price">
                      {pkg.priceLabel ? <span className="package-price-label">{pkg.priceLabel}</span> : null}
                      {pkg.price ? <strong>{pkg.price}</strong> : <strong className="package-price-quote">Özel teklif</strong>}
                      {pkg.pricePeriod ? <span className="package-price-period">{pkg.pricePeriod}</span> : null}
                    </div>
                    <Link className="btn btn-primary btn-lg package-cta" href={pkg.ctaHref || "/teklif-al"}>
                      {pkg.ctaLabel || "Teklif al"}
                    </Link>
                  </article>
                ))}
              </div>
              <div className="section-foot">
                <Link className="btn btn-ghost btn-lg" href="/paketler">
                  Tüm paketleri ve içerikleri gör <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* ==================== INTEGRATIONS ==================== */}
        <section className="integrations-section">
          <div className="container integrations-grid">
            <div className="integrations-copy">
              <div className="integrations-visual">
                <Image
                  src="/uploads/home/integrations-network.webp"
                  alt="Entegrasyon ağı — ERP, kargo, ödeme"
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  className="integrations-visual-img"
                />
              </div>
              <span className="kicker">Entegrasyonlar</span>
              <h2>{integrationsTitle}</h2>
              {integrationsDesc ? <p>{integrationsDesc}</p> : null}
              <Link className="btn btn-soft btn-lg" href="/entegrasyonlar">
                Tüm entegrasyonları gör <ArrowRight size={16} />
              </Link>
            </div>
            <div className="integrations-groups">
              {integrationGroups.map((g) => (
                <div className="integration-group" key={g.id}>
                  <h4>{g.title}</h4>
                  <div className="integration-chips">
                    {g.items.map((it) => (
                      <span key={it.id}>{it.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FAQ ==================== */}
        {featuredFaqs.length > 0 ? (
          <section className="faq-section">
            <div className="container faq-grid">
              <div>
                <span className="kicker">Sık Sorulan Sorular</span>
                <h2>Aklınızda soru işareti kalmasın.</h2>
                <p>B2B, B2C ve C2C ticaret modelleri, kurulum süreci ve entegrasyonlarla ilgili en çok merak edilen konular.</p>
                <Link className="btn btn-primary btn-lg" href="/sik-sorulan-sorular">
                  Tümünü görüntüle <ArrowRight size={16} />
                </Link>
              </div>
              <div className="faq-list">
                {featuredFaqs.slice(0, 6).map((faq) => (
                  <details className="faq-item" key={faq.id}>
                    <summary>
                      <span>{faq.question}</span>
                      <ChevronDown size={16} />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ==================== BLOG ==================== */}
        {featuredPosts.length > 0 ? (
          <section className="blog-section">
            <div className="container">
              <div className="section-head centered">
                <span className="kicker">Rehberler</span>
                <h2>Karar süreçlerinize katkı sağlayan içerikler.</h2>
              </div>
              <div className="blog-grid">
                {featuredPosts.slice(0, 3).map((post) => (
                  <article className="blog-tile" key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="blog-tile-cover" aria-label={post.title}>
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
                    <div className="blog-tile-body">
                      {post.tag ? <span className="blog-tile-tag">{post.tag}</span> : null}
                      <h3>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p>{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="blog-tile-link">
                        Yazıyı oku <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <div className="section-foot">
                <Link className="btn btn-ghost btn-lg" href="/blog">
                  Tüm yazılar <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {seoArticle ? <SeoArticleBlock article={seoArticle} /> : null}

        {/* ==================== FINAL CTA CARD ==================== */}
        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              {/* Decorative bg layers */}
              <div className="final-cta-bg" aria-hidden="true">
                <div className="final-cta-bg-grid" />
                <div className="final-cta-bg-glow final-cta-bg-glow-a" />
                <div className="final-cta-bg-glow final-cta-bg-glow-b" />
                <div className="final-cta-bg-stars">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span key={i} style={{
                      left: `${(i * 53) % 100}%`,
                      top: `${(i * 37) % 100}%`,
                      animationDelay: `${(i * 0.3) % 4}s`
                    }} />
                  ))}
                </div>
              </div>

              <div className="final-cta-copy">
                <span className="final-cta-eyebrow">
                  <span className="final-cta-eyebrow-dot" /> 7/24 yanınızdayız
                </span>
                <h2>{settings.finalCtaTitle}</h2>
                <p>{settings.finalCtaDescription}</p>

                <div className="final-cta-stats">
                  <div className="final-cta-stat">
                    <strong>30+</strong>
                    <span>Hazır entegrasyon</span>
                  </div>
                  <div className="final-cta-stat">
                    <strong>8–14</strong>
                    <span>Hafta canlıda</span>
                  </div>
                  <div className="final-cta-stat">
                    <strong>%70+</strong>
                    <span>Manuel iş azalır</span>
                  </div>
                </div>

                <div className="final-cta-actions">
                  <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
                    {settings.primaryCtaLabel} <ArrowRight size={16} />
                  </Link>
                  {settings.contactPhone ? (
                    <a className="btn btn-ghost btn-lg" href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}>
                      <PhoneCall size={16} /> {settings.contactPhone}
                    </a>
                  ) : null}
                </div>

                <div className="final-cta-trust">
                  <span className="final-cta-trust-dot" />
                  <span>{settings.ctaNote ?? "48 saat içinde dönüş"}</span>
                  <span className="final-cta-trust-sep">•</span>
                  <span>Bağlayıcı değil</span>
                  <span className="final-cta-trust-sep">•</span>
                  <span>Ücretsiz analiz</span>
                </div>
              </div>

              <div className="final-cta-visual" aria-hidden="true">
                <div className="final-cta-orbits">
                  <div className="final-cta-orbit-ring final-cta-orbit-ring-1" />
                  <div className="final-cta-orbit-ring final-cta-orbit-ring-2" />
                  <div className="final-cta-orbit-ring final-cta-orbit-ring-3" />

                  <div className="final-cta-orbit-wrap final-cta-orbit-wrap-1">
                    <span className="final-cta-orbit-item"><MessagesSquare size={16} /></span>
                  </div>
                  <div className="final-cta-orbit-wrap final-cta-orbit-wrap-2">
                    <span className="final-cta-orbit-item"><Wallet size={16} /></span>
                  </div>
                  <div className="final-cta-orbit-wrap final-cta-orbit-wrap-3">
                    <span className="final-cta-orbit-item"><Truck size={16} /></span>
                  </div>
                  <div className="final-cta-orbit-wrap final-cta-orbit-wrap-4">
                    <span className="final-cta-orbit-item"><SearchIcon size={16} /></span>
                  </div>
                  <div className="final-cta-orbit-wrap final-cta-orbit-wrap-5">
                    <span className="final-cta-orbit-item"><Cable size={16} /></span>
                  </div>
                  <div className="final-cta-orbit-wrap final-cta-orbit-wrap-6">
                    <span className="final-cta-orbit-item"><Smartphone size={16} /></span>
                  </div>

                  <span className="final-cta-orbit-core">
                    <Zap size={28} />
                  </span>

                  <div className="final-cta-orbit-chip final-cta-orbit-chip-tl">
                    <span className="final-cta-orbit-chip-dot" />
                    <span><strong>Yeni teklif geldi</strong><em>2 dk önce</em></span>
                  </div>
                  <div className="final-cta-orbit-chip final-cta-orbit-chip-br">
                    <Truck size={13} />
                    <span><strong>3 sipariş kargoda</strong><em>Aras Kargo</em></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
