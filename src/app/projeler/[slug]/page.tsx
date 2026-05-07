import { notFound } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { RichContent } from "@/components/public/RichContent";
import { getProject } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const project = await getProject((await params).slug);
  return {
    title: project?.seoTitle ?? project?.title,
    description: project?.seoDescription ?? project?.shortDesc
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const accent = project.accent || "#1F4FFF";

  return (
    <PublicShell>
      <main>
        <section className="project-detail-hero">
          <div className="container project-detail-hero-grid">
            <div className="project-detail-copy">
              <div className="project-detail-meta">
                <span
                  className="project-detail-chip"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {project.category}
                </span>
                <span>{project.sector}</span>
              </div>
              <h1>{project.title}</h1>
              <p>{project.shortDesc}</p>
            </div>
            <div className="project-detail-media">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 980px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="project-detail-placeholder" style={{ background: `linear-gradient(135deg, ${accent}16, ${accent}45)` }}>
                  {project.title}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="project-detail-mobile-meta">
          <div className="container project-detail-mobile-bar">
            <span className="project-detail-mobile-status" style={{ background: `${accent}14`, color: accent }}>
              {project.status}
            </span>
            {project.year ? <span className="project-detail-mobile-year">{project.year}</span> : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-accent btn-sm project-detail-mobile-cta"
              >
                Canlı siteyi gör <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </section>

        <section className="section">
          <div className="container split">
            <aside className="card project-detail-aside">
              <div
                style={{
                  borderRadius: 12,
                  padding: 18,
                  background: `${accent}14`,
                  color: accent,
                  fontWeight: 600,
                  letterSpacing: "-0.01em"
                }}
              >
                {project.category}
              </div>
              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 4 }}>Sektör</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{project.sector}</div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 4 }}>Durum</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{project.status}</div>
              </div>
              {project.year ? (
                <div>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 4 }}>Yayın yılı</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{project.year}</div>
                </div>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-accent btn-sm"
                  style={{ marginTop: 4 }}
                >
                  Canlı siteyi gör →
                </a>
              ) : null}
            </aside>
            <article
              className="card"
              style={{ padding: 32, color: "var(--ink-2)" }}
            >
              <RichContent content={project.content} />
            </article>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
