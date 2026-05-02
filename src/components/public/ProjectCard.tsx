import Link from "next/link";
import type { Project } from "@prisma/client";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-media" style={{ "--accent": project.accent } as React.CSSProperties}>
        <span className="tag">{project.category}</span>
        <h3>{project.title}</h3>
      </div>
      <div className="project-body">
        <div className="meta"><span>{project.status}</span><span>{project.sector}</span></div>
        <p>{project.shortDesc}</p>
        <Link className="card-link" href={`/projeler/${project.slug}`}>İncele →</Link>
      </div>
    </article>
  );
}

