import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@prisma/client";

export function ProjectCard({ project }: { project: Project }) {
  const accent = project.accent || "#1F4FFF";

  return (
    <Link className="project-tile" href={`/projeler/${project.slug}`}>
      <div className="project-tile-media">
        {project.coverImage ? (
          <img
            className="project-tile-img"
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div className="project-tile-placeholder" style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}66)` }}>
            <span style={{ color: accent, fontWeight: 600, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {project.title}
            </span>
          </div>
        )}
        <span className="project-tile-arrow" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="project-tile-body">
        <div className="project-tile-meta">{project.sector}</div>
        <h3 className="project-tile-title">{project.title}</h3>
        <p className="project-tile-desc">{project.shortDesc}</p>
      </div>
    </Link>
  );
}
