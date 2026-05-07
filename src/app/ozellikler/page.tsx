import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { FeatureIcon } from "@/components/public/FeatureIcon";
import { getSettings, getSolutionCards } from "@/lib/content";

function splitLines(value: string | null) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function FeaturesPage() {
  const [settings, cards] = await Promise.all([getSettings(), getSolutionCards()]);
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <h1>Özellikler ve teknik çözümler</h1>
            <p>{settings.featuresDescription} ERP, kargo, ödeme, panel ve sektör doğrulama süreçlerini çalışan altyapı üzerinden anlatıyoruz.</p>
          </div>
        </section>
        <section className="section section-muted">
          <div className="container solution-list-grid">
            {cards.map((card) => {
              const brands = splitLines(card.brands);
              return (
                <article className="solution-list-card" key={card.id}>
                  {card.visualImage ? (
                    <Link className="solution-list-visual" href={`/ozellikler/${card.slug}`}>
                      <Image
                        src={card.visualImage}
                        alt={`${card.question} görseli`}
                        fill
                        sizes="(max-width: 980px) 100vw, 360px"
                      />
                    </Link>
                  ) : (
                    <Link className="solution-list-icon" href={`/ozellikler/${card.slug}`} style={{ "--card-accent": card.visualAccent ?? "#B87333" } as CSSProperties}>
                      <FeatureIcon name={card.icon ?? "Plug"} />
                    </Link>
                  )}
                  <div className="solution-list-body">
                    <FeatureIcon name={card.icon ?? "Plug"} />
                    <h2>{card.question}</h2>
                    <p>{card.answer}</p>
                    {card.proof ? <div className="solution-proof">{card.proof}</div> : null}
                    {brands.length > 0 ? (
                      <div className="solution-brand-list">
                        {brands.map((brand) => <span key={brand}>{brand}</span>)}
                      </div>
                    ) : null}
                    <Link className="solution-detail-button" href={`/ozellikler/${card.slug}`}>
                      Detayları gör <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
