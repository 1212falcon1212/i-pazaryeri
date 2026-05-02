import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { ProjectCard } from "@/components/public/ProjectCard";
import { getFeaturedProjects, getFeatures, getSectors, getSettings } from "@/lib/content";

export default async function HomePage() {
  const [settings, projects, sectors, features] = await Promise.all([getSettings(), getFeaturedProjects(), getSectors(), getFeatures()]);
  return (
    <PublicShell>
      <main>
        <section className="hero premium-hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <h1>{settings.heroTitle}</h1>
              <p className="lead">{settings.heroDescription}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href={settings.primaryCtaHref}>{settings.primaryCtaLabel}<ArrowRight size={18} /></Link>
                <Link className="btn btn-soft" href="/projeler">Projeleri gör</Link>
              </div>
              <div className="proof-row">
                <div className="proof-item"><strong>{projects.length}+</strong><span>pazaryeri örneği</span></div>
                <div className="proof-item"><strong>6</strong><span>sektör odağı</span></div>
                <div className="proof-item"><strong>ERP</strong><span>entegrasyon uyumu</span></div>
              </div>
            </div>
            <div className="market-visual" aria-hidden="true">
              <div className="orb orb-a" />
              <div className="orb orb-b" />
              <div className="screen">
                <div className="screen-top"><span className="dot" /><span className="dot" /><span className="dot" /></div>
                <div className="screen-body">
                  <div className="sidebar"><div className="side-line active" /><div className="side-line" /><div className="side-line" /><div className="side-line" /></div>
                  <div className="dashboard">
                    <div className="metric-grid"><div className="metric"><b>1.248</b><span>sipariş</span></div><div className="metric"><b>86</b><span>bayi</span></div><div className="metric"><b>12K</b><span>ürün</span></div></div>
                    <div className="product-list">{[1, 2, 3].map((item) => <div className="product-row" key={item}><div className="thumb" /><div className="row-lines"><span /><span /></div><div className="price">₺{item * 240}</div></div>)}</div>
                  </div>
                </div>
              </div>
              <div className="float-card"><strong>%34</strong><span>daha hızlı sipariş toplama</span></div>
              <div className="mini-panel mini-panel-a"><b>Canlı katalog</b><span>12.480 ürün senkron</span></div>
              <div className="mini-panel mini-panel-b"><b>Bayi siparişi</b><span>Onay bekleyen 24 talep</span></div>
            </div>
          </div>
        </section>
        <section className="section section-muted proof-showcase reveal">
          <div className="container">
            <div className="section-head"><div><h2>{settings.projectsTitle}</h2><p>{settings.projectsDescription}</p></div><Link className="btn btn-soft" href="/projeler">Tüm projeler</Link></div>
            <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
          </div>
        </section>
        <section className="section reveal">
          <div className="container">
            <div className="section-head"><div><h2>{settings.sectorsTitle}</h2><p>{settings.sectorsDescription}</p></div></div>
            <div className="sector-grid">{sectors.map((sector) => <article className="sector-card" key={sector.id}><span className="icon-badge" style={{ color: sector.accent }}>●</span><h3>{sector.title}</h3><p>{sector.shortDesc}</p></article>)}</div>
          </div>
        </section>
        <section className="section section-muted reveal">
          <div className="container">
            <div className="section-head"><div><h2>{settings.featuresTitle}</h2><p>{settings.featuresDescription}</p></div></div>
            <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.id}><FeatureIcon name={feature.icon} /><h3>{feature.title}</h3><p>{feature.shortDesc}</p></article>)}</div>
          </div>
        </section>
        <section className="section reveal">
          <div className="container">
            <div className="section-head"><div><h2>{settings.processTitle}</h2><p>{settings.processDescription}</p></div></div>
            <div className="process">{["İhtiyaç analizi", "Sektör uyarlaması", "Veri ve entegrasyon", "Yayın ve iyileştirme"].map((step) => <div className="process-step" key={step}><b>{step}</b><p>Net kapsam, kontrollü kurulum ve ölçülebilir ilerleme.</p></div>)}</div>
          </div>
        </section>
        <section className="section reveal">
          <div className="container cta-band"><div><h2>{settings.finalCtaTitle}</h2><p>{settings.finalCtaDescription}</p></div><Link className="btn" href={settings.primaryCtaHref}>{settings.primaryCtaLabel}</Link></div>
        </section>
      </main>
    </PublicShell>
  );
}
