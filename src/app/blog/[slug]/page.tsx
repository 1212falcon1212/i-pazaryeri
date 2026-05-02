import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/PublicShell";
import { getPost } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).slug);
  return { title: post?.seoTitle ?? post?.title, description: post?.seoDescription ?? post?.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return (
    <PublicShell>
      <main>
        <section className="page-hero"><div className="container page-title"><h1>{post.title}</h1><p>{post.excerpt}</p></div></section>
        <section className="section"><article className="container content admin-card"><p>{post.content}</p></article></section>
      </main>
    </PublicShell>
  );
}

