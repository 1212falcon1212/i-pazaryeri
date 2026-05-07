import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getPosts } from "@/lib/content";

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <h1>Blog / Rehber</h1>
            <p>B2B pazaryeri, bayi sipariş sistemi ve dijital ticaret altyapısı için rehber içerikler.</p>
          </div>
        </section>
        <section className="section">
          <div className="container tile-grid">
            {posts.map((post) => (
              <article className="article-card article-card-with-cover" key={post.id}>
                <Link href={`/blog/${post.slug}`} className="article-cover-link" aria-label={post.title}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="article-cover"
                    />
                  ) : (
                    <div className="article-cover article-cover-fallback">{post.title.slice(0, 1)}</div>
                  )}
                </Link>
                <div className="article-card-body">
                  {post.tag ? <span className="article-tag">{post.tag}</span> : null}
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="article-read-link"
                  >
                    Oku <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
