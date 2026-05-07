import { PublicShell } from "@/components/public/PublicShell";
import { getFaqCategories } from "@/lib/content";

export default async function FaqPage() {
  const categories = await getFaqCategories();
  const items = categories.flatMap((category) => category.items);

  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <span className="section-kicker">Sık Sorulan Sorular</span>
            <h1>Aklınızda soru işareti kalmasın.</h1>
            <p>B2B pazaryeri altyapısı, kurulum, entegrasyon, özelleştirme ve destek süreçleriyle ilgili en sık sorulan başlıkları topladık.</p>
          </div>
        </section>
        <section className="section faq-simple-section">
          <div className="container faq-single-list">
            {items.map((item) => (
              <details className="faq-simple-item" key={item.id}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
