import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getFaqCategories, getSettings } from "@/lib/content";

export const metadata = {
  title: "Sık Sorulan Sorular | i-Pazaryeri",
  description:
    "B2B pazaryeri yazılımı altyapısı, kurulum, entegrasyon, özelleştirme ve destek süreçleriyle ilgili en sık sorulan başlıklar."
};

export default async function FaqPage() {
  const [categories, settings] = await Promise.all([getFaqCategories(), getSettings()]);

  return (
    <PublicShell>
      <main className="faq-page home">
        <section className="features-hero">
          <div className="container">
            <span className="hero-eyebrow"><Sparkles size={14} /> Sık Sorulan Sorular</span>
            <h1 className="features-hero-title">
              Aklınızda soru işareti
              <span className="hero-title-highlight"> kalmasın.</span>
            </h1>
            <p className="features-hero-description">
              B2B pazaryeri altyapısı, kurulum, entegrasyon, özelleştirme ve destek süreçleri hakkında en sık sorulan başlıkları topladık.
            </p>
          </div>
        </section>

        <section className="faq-page-section">
          <div className="container faq-page-grid">
            {categories.map((category) => (
              <div className="faq-category" key={category.id}>
                <header className="faq-category-head">
                  <h2>{category.title}</h2>
                  {category.description ? <p>{category.description}</p> : null}
                </header>
                <div className="faq-list">
                  {category.items.map((item) => (
                    <details className="faq-item" key={item.id}>
                      <summary>
                        <span>{item.question}</span>
                        <ChevronDown size={16} />
                      </summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <div className="final-cta-copy">
                <span className="final-cta-eyebrow"><Sparkles size={14} /> Sorunuz hâlâ var mı?</span>
                <h2>Cevap bulamadığınız konuları birebir konuşalım.</h2>
                <p>30 dakikalık ücretsiz analiz görüşmesinde sektörünüze özel ihtiyaçları detaylı ele alıyoruz.</p>
                <div className="final-cta-actions">
                  <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
                    Bizimle iletişime geç <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
