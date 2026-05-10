import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getPosts } from "@/lib/content";

export const metadata = {
  title: "Blog & Rehberler | i-Pazaryeri",
  description:
    "B2B pazaryeri yazılımı, bayi sipariş sistemleri, ERP entegrasyonu, KVKK uyumu, kargo süreçleri ve daha fazlası. Karar süreçlerinize katkı sağlayan rehberler."
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PublicShell>
      <main className="blog-page home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow"><Sparkles size={14} /> Rehberler</span>
            <h1 className="features-hero-title">
              Blog & Rehberler
            </h1>
            <p className="features-hero-description">
              B2B pazaryeri kurulumu, ERP entegrasyonu, KVKK uyumu, kargo süreçleri ve karar verme aşamasında işinize yarayacak diğer konular.
            </p>
          </div>
        </section>

        <section className="blog-list-section">
          <div className="container">
            <div className="blog-grid">
              {posts.map((post) => (
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
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
