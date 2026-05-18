import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Mail, Phone } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { RichContent, parseHeadings } from "@/components/public/RichContent";
import { BlogTOC } from "@/components/public/BlogTOC";
import { ReadingProgress } from "@/components/public/ReadingProgress";
import { BlogShare } from "@/components/public/BlogShare";
import { getPost, getRelatedPosts, getSettings } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).slug);
  return {
    title: post?.seoTitle ?? post?.title,
    description: post?.seoDescription ?? post?.excerpt
  };
}

const WPM = 200;

function calcReadingTime(content: string): number {
  const words = content
    .replace(/[#>*`_-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1).length;
  return Math.max(1, Math.round(words / WPM));
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const [related, settings] = await Promise.all([
    getRelatedPosts(slug, post.tag),
    getSettings()
  ]);
  const headings = parseHeadings(post.content);
  const readingTime = calcReadingTime(post.content);
  const publishedAt = formatDate(post.createdAt);

  return (
    <PublicShell>
      <ReadingProgress targetId="blog-article" />
      <main>
        <section className="page-hero blog-detail-hero">
          <div className="container blog-detail-head">
            <Link href="/blog" className="blog-back-link">
              <ArrowLeft size={14} /> Tüm yazılar
            </Link>
            {post.tag ? <span className="article-tag">{post.tag}</span> : null}
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="blog-detail-meta">
              <span className="blog-meta-chip">
                <Calendar size={14} /> {publishedAt}
              </span>
              <span className="blog-meta-chip">
                <Clock size={14} /> {readingTime} dk okuma
              </span>
              <span className="blog-meta-chip blog-meta-chip-author">
                <span className="blog-meta-avatar" aria-hidden="true">İP</span>
                i-Pazaryeri Editör Ekibi
              </span>
            </div>
          </div>
        </section>

        {post.coverImage ? (
          <section className="blog-detail-cover-section">
            <div className="container">
              <div className="blog-detail-cover-wrap">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                  className="blog-detail-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="section blog-detail-body-section">
          <div className="container blog-detail-grid">
            <article id="blog-article" className="blog-detail-body">
              <RichContent content={post.content} />

              <div className="blog-article-footer">
                <BlogShare title={post.title} slug={post.slug} />
                {post.tag ? (
                  <div className="blog-article-tags">
                    <span className="blog-article-tags-label">Etiket</span>
                    <Link href={`/blog?tag=${encodeURIComponent(post.tag)}`} className="blog-article-tag-pill">
                      #{post.tag}
                    </Link>
                  </div>
                ) : null}
              </div>
            </article>

            <aside className="blog-detail-sidebar">
              <div className="blog-sidebar-sticky">
                <BlogTOC headings={headings} />

                <div className="blog-sidebar-card blog-sidebar-cta">
                  <div className="blog-sidebar-cta-icon" aria-hidden="true">
                    <BookOpen size={18} />
                  </div>
                  <h3>Bu konuyu projenize uyarlayalım</h3>
                  <p>30 dakikalık ücretsiz analizde sektörünüze özel modülleri ve entegrasyon ihtiyaçlarınızı birlikte konuşuyoruz.</p>
                  <Link href="/teklif-al" className="btn btn-accent btn-sm blog-sidebar-cta-btn">
                    Teklif Al <ArrowRight size={14} />
                  </Link>
                  <div className="blog-sidebar-cta-divider" />
                  {settings.contactEmail ? (
                    <a href={`mailto:${settings.contactEmail}`} className="blog-sidebar-link">
                      <Mail size={14} /> {settings.contactEmail}
                    </a>
                  ) : null}
                  {settings.contactPhone ? (
                    <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="blog-sidebar-link">
                      <Phone size={14} /> {settings.contactPhone}
                    </a>
                  ) : null}
                </div>

                {related.length > 0 ? (
                  <div className="blog-sidebar-card blog-sidebar-related">
                    <div className="blog-sidebar-card-title">Sıradaki yazılar</div>
                    <ul className="blog-sidebar-related-list">
                      {related.slice(0, 3).map((rp) => (
                        <li key={rp.id}>
                          <Link href={`/blog/${rp.slug}`}>
                            <span className="blog-sidebar-related-title">{rp.title}</span>
                            {rp.tag ? <span className="blog-sidebar-related-tag">{rp.tag}</span> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <section className="blog-cta-band">
          <div className="container blog-cta-band-inner">
            <div>
              <span className="blog-cta-band-eyebrow">Bir sonraki adım</span>
              <h2>Bu konuyu projenize uyarlayalım.</h2>
              <p>30 dakikalık ücretsiz analiz görüşmesinde sektörünüze özel modülleri, entegrasyon ihtiyaçlarınızı ve fazlandırma planını birlikte konuşuyoruz.</p>
            </div>
            <div className="blog-cta-band-actions">
              <Link className="btn btn-accent btn-lg" href="/teklif-al">
                Teklif Al <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-soft btn-lg" href="/blog">
                Tüm yazılar
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="section blog-related-section">
            <div className="container">
              <div className="blog-related-head">
                <h2>İlgili yazılar</h2>
                <Link href="/blog" className="blog-related-link">
                  Tüm yazılar <ArrowRight size={14} />
                </Link>
              </div>
              <div className="tile-grid">
                {related.map((rp) => (
                  <article className="article-card article-card-with-cover" key={rp.id}>
                    <Link href={`/blog/${rp.slug}`} className="article-cover-link" aria-label={rp.title}>
                      {rp.coverImage ? (
                        <Image
                          src={rp.coverImage}
                          alt={rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="article-cover"
                        />
                      ) : (
                        <div className="article-cover article-cover-fallback">{rp.title.slice(0, 1)}</div>
                      )}
                    </Link>
                    <div className="article-card-body">
                      {rp.tag ? <span className="article-tag">{rp.tag}</span> : null}
                      <h3>
                        <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                      </h3>
                      <p>{rp.excerpt}</p>
                      <Link href={`/blog/${rp.slug}`} className="article-read-link">
                        Oku <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </PublicShell>
  );
}
