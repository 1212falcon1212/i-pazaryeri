import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    title: card?.question,
    description: card?.answer
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const [card, cards] = await Promise.all([getSolutionCard(slug), getSolutionCards()]);
  if (!card) notFound();

  const brands = splitLines(card.brands);
  const related = cards.filter((item) => item.slug !== slug).slice(0, 3);
  const accent = card.visualAccent ?? "#B87333";

  return (
    <PublicShell>
      <main>
        <section className="feature-detail-hero">
          <div className="container feature-detail-grid">
            <div className="feature-detail-copy">
              <Link className="back-link" href="/ozellikler">
                <ArrowLeft size={16} /> Özelliklere dön
              </Link>
              <span className="clean-eyebrow">Teknik çözüm</span>
              <h1>{card.question}</h1>
              <p>{card.answer}</p>
            </div>
            {card.visualImage ? (
              <div className="feature-detail-visual">
                <Image
                  src={card.visualImage}
                  alt={`${card.question} görseli`}
                  fill
                  sizes="(max-width: 980px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <div className="feature-detail-icon" style={{ "--card-accent": accent } as CSSProperties}>
                <FeatureIcon name={card.icon ?? "Plug"} />
              </div>
            )}
          </div>
        </section>

        <section className="section">
          <div className="container feature-detail-content">
            <article className="feature-detail-main">
              <h2>Nasıl çözüyoruz?</h2>
              <p>{card.answer}</p>
              {card.proof ? (
                <>
                  <h2>Çalışan sistem kanıtı</h2>
                  <div className="solution-proof">{card.proof}</div>
                </>
              ) : null}
              {brands.length > 0 ? (
                <>
                  <h2>Bağlı sistemler ve markalar</h2>
                  <div className="solution-brand-list large">
                    {brands.map((brand) => <span key={brand}>{brand}</span>)}
                  </div>
                </>
              ) : null}
            </article>

            <aside className="feature-detail-side">
              <h3>Diğer özellikler</h3>
              {related.map((item) => (
                <Link href={`/ozellikler/${item.slug}`} key={item.id}>
                  <FeatureIcon name={item.icon ?? "Plug"} />
                  <span>{item.question}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
