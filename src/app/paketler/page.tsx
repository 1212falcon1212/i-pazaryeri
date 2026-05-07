import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";
import { getPackages } from "@/lib/content";

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <span className="section-kicker">Paketler</span>
            <h1>İhtiyacınız olan kapsamla başlayın, modüler şekilde büyütün.</h1>
            <p>Fiyatı ezbere vermek yerine bayi ağınız, entegrasyon ihtiyacınız ve canlıya geçiş hedefinize göre doğru kapsamı birlikte seçiyoruz.</p>
          </div>
        </section>
        <section className="section">
          <div className="container package-grid">
            {packages.map((pkg) => (
              <article className={`info-card package-card${pkg.isFeatured ? " is-featured" : ""}`} key={pkg.id}>
                <span className="card-kicker">{pkg.audience ?? "B2B pazaryeri kapsamı"}</span>
                <h2>{pkg.name}</h2>
                <p>{pkg.tagline}</p>
                {pkg.price ? (
                  <div className="package-price">
                    {pkg.priceLabel ? <span>{pkg.priceLabel}</span> : null}
                    <strong>{pkg.price}</strong>
                    {pkg.pricePeriod ? <em>{pkg.pricePeriod}</em> : null}
                    {pkg.priceNote ? <small>{pkg.priceNote}</small> : null}
                  </div>
                ) : null}
                <p>{pkg.description}</p>
                <div className="package-feature-list">
                  {pkg.features.map((feature) => (
                    <div className="package-feature-row" key={feature.id}>
                      <span>{feature.group}</span>
                      <b>{feature.label}</b>
                      <em>{feature.value}</em>
                    </div>
                  ))}
                </div>
                <Link className="btn btn-primary" href={pkg.ctaHref ?? "/teklif-al"}>
                  {pkg.ctaLabel ?? "Teklif al"} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
