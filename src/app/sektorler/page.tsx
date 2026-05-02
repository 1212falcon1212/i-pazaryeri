import { PublicShell } from "@/components/public/PublicShell";
import { getSectors, getSettings } from "@/lib/content";

export default async function SectorsPage() {
  const [settings, sectors] = await Promise.all([getSettings(), getSectors()]);
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <h1>Sektörler</h1>
            <p>{settings.sectorsDescription}</p>
          </div>
        </section>
        <section className="section">
          <div className="container sector-grid">
            {sectors.map((sector) => <article className="sector-card" key={sector.id}><span className="icon-badge" style={{ color: sector.accent }}>●</span><h3>{sector.title}</h3><p>{sector.content}</p></article>)}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

