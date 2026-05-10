import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { PublicShell } from "@/components/public/PublicShell";
import { getSolutionCard, getSolutionCards } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

function splitLines(value: string | null) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: Props) {
  const card = await getSolutionCard((await params).slug);
  return {
    title: card?.question ? `${card.question} | i-Pazaryeri` : "Özellik",
    description: card?.answer
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const [card, cards] = await Promise.all([getSolutionCard(slug), getSolutionCards()]);
  if (!card) notFound();

  const brands = splitLines(card.brands);
  const related = cards.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <PublicShell>
      <main className="feature-page home">
        {/* Hero */}
        <section className="feature-hero">
          <div className="container">
            <Link className="feature-back-link" href="/ozellikler">
              <ArrowLeft size={14} /> Tüm özellikler
            </Link>
            <div className="feature-hero-grid">
              <div>
                <span className="hero-eyebrow"><Sparkles size={14} /> Teknik çözüm</span>
                <h1 className="feature-hero-title">{card.question}</h1>
                <p className="feature-hero-description">{card.answer}</p>
              </div>
              {card.visualImage ? (
                <div className="feature-hero-visual">
                  <Image
                    src={card.visualImage}
                    alt={`${card.question} görseli`}
                    fill
                    sizes="(max-width: 980px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className="feature-hero-icon">
                  <FeatureIcon name={card.icon ?? "Plug"} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="feature-body-section">
          <div className="container feature-body-grid">
            <article className="feature-body">
              {card.proof ? (
                <div className="feature-block">
                  <h2>Çalışan sistem yaklaşımı</h2>
                  <p>{card.proof}</p>
                </div>
              ) : null}

              {brands.length > 0 ? (
                <div className="feature-block">
                  <h2>Bağlı sağlayıcılar / markalar</h2>
                  <div className="feature-brand-chips">
                    {brands.map((brand) => (
                      <span key={brand}>
                        <CheckCircle2 size={14} /> {brand}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="feature-cta-card">
                <div>
                  <h3>Bu modülü sektörünüze nasıl uyarlarız?</h3>
                  <p>30 dakikalık ücretsiz analiz görüşmesinde sektörünüze özel akışı birlikte planlayalım.</p>
                </div>
                <Link className="btn btn-primary btn-lg" href="/teklif-al">
                  Teklif Al <ArrowRight size={16} />
                </Link>
              </div>
            </article>

            <aside className="feature-aside">
              <div className="feature-aside-block">
                <h4>Diğer özellikler</h4>
                <ul>
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link href={`/ozellikler/${item.slug}`}>
                        <FeatureIcon name={item.icon ?? "Plug"} />
                        <span>{item.question}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-aside-help">
                <h4>Yardıma ihtiyacınız mı var?</h4>
                <p>Ekibimiz tüm modüllerin sektörünüze özel uyarlanması için sizinle birlikte planlama yapar.</p>
                <Link className="btn btn-soft btn-sm" href="/teklif-al">
                  Bizimle iletişime geçin
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
