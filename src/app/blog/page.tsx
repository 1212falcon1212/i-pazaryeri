import Link from "next/link";
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
          <div className="container feature-grid">
            {posts.map((post) => <article className="article-card" key={post.id}><span className="tag" style={{ background: "#eef8fb", color: "#075b76" }}>{post.tag}</span><h3>{post.title}</h3><p>{post.excerpt}</p><Link className="card-link" href={`/blog/${post.slug}`}>Oku →</Link></article>)}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

