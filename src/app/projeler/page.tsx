import { PublicShell } from "@/components/public/PublicShell";
import { ProjectCard } from "@/components/public/ProjectCard";
import { getProjects, getSettings } from "@/lib/content";

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <h1>Projeler</h1>
            <p>{settings.projectsDescription}</p>
          </div>
        </section>
        <section className="section">
          <div className="container project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </section>
      </main>
    </PublicShell>
  );
}

