import { PublicShell } from "@/components/public/PublicShell";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { getFeatures, getSettings } from "@/lib/content";

export default async function FeaturesPage() {
  const [settings, features] = await Promise.all([getSettings(), getFeatures()]);
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <h1>Özellikler</h1>
            <p>{settings.featuresDescription}</p>
          </div>
        </section>
        <section className="section">
          <div className="container feature-grid">
            {features.map((feature) => <article className="feature-card" key={feature.id}><FeatureIcon name={feature.icon} /><h3>{feature.title}</h3><p>{feature.content}</p></article>)}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

