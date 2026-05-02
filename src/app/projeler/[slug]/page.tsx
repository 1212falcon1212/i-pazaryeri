import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/PublicShell";
import { getProject } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const project = await getProject((await params).slug);
  return { title: project?.seoTitle ?? project?.title, description: project?.seoDescription ?? project?.shortDesc };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <h1>{project.title}</h1>
            <p>{project.shortDesc}</p>
          </div>
        </section>
        <section className="section">
          <div className="container split">
            <div className="project-card">
              <div className="project-media" style={{ "--accent": project.accent } as React.CSSProperties}>
                <span className="tag">{project.category}</span>
                <h3>{project.title}</h3>
              </div>
              <div className="project-body">
                <div className="meta"><span>{project.status}</span><span>{project.sector}</span></div>
                <p>{project.year ? `${project.year} yılında yayına alınan proje.` : "Yayında olan proje."}</p>
              </div>
            </div>
            <article className="content admin-card">
              <h2>Proje Kurgusu</h2>
              <p>{project.content}</p>
            </article>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

