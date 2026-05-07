import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { RichContent } from "@/components/public/RichContent";
import { getPost, getRelatedPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).slug);
  return {
    title: post?.seoTitle ?? post?.title,
    description: post?.seoDescription ?? post?.excerpt
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(slug, post.tag);

  return (
    <PublicShell>
      <main>
        <section className="page-hero blog-detail-hero">
          <div className="container blog-detail-head">
            <Link href="/blog" className="blog-back-link">
              <ArrowLeft size={14} /> Tüm yazılar
            </Link>
            {post.tag ? <span className="article-tag">{post.tag}</span> : null}
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
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
          <article className="container card blog-detail-body">
            <RichContent content={post.content} />
          </article>
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
              <Link className="btn btn-soft btn-lg" href="/projeler">
                Çalışan projeler
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
