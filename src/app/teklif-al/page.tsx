import { PublicShell } from "@/components/public/PublicShell";
import { getSectors, getSettings } from "@/lib/content";
import { createOffer } from "./actions";

type Props = { searchParams: Promise<{ success?: string; error?: string }> };

export default async function OfferPage({ searchParams }: Props) {
  const [settings, sectors, query] = await Promise.all([getSettings(), getSectors(), searchParams]);
  return (
    <PublicShell>
      <main>
        <section className="page-hero"><div className="container page-title"><h1>Teklif Al</h1><p>{settings.finalCtaDescription}</p></div></section>
        <section className="section">
          <div className="container split">
            <aside className="admin-card"><h2>Ne paylaşmalısınız?</h2><p>Sektörünüzü, bayi veya tedarikçi sayınızı, mevcut sipariş akışınızı ve beklediğiniz modülleri yazmanız yeterli.</p></aside>
            <form className="admin-card form-grid" action={createOffer}>
              {query.success ? <div className="notice field full">Talebiniz alındı. En kısa sürede dönüş yapılacak.</div> : null}
              {query.error ? <div className="notice field full">{query.error}</div> : null}
              <div className="field"><label>Ad soyad</label><input name="fullName" required /></div>
              <div className="field"><label>Şirket</label><input name="company" required /></div>
              <div className="field"><label>E-posta</label><input name="email" type="email" /></div>
              <div className="field"><label>Telefon</label><input name="phone" /></div>
              <div className="field"><label>Sektör</label><select name="sector" required>{sectors.map((sector) => <option key={sector.id}>{sector.title}</option>)}</select></div>
              <div className="field"><label>Bayi / tedarikçi sayısı</label><input name="networkSize" placeholder="Örn. 50 bayi" /></div>
              <div className="field full"><label>İstenen modüller</label><input name="modules" placeholder="Sipariş, stok, cari, ERP entegrasyonu..." /></div>
              <div className="field full"><label>Kısa ihtiyaç notu</label><textarea name="message" required /></div>
              <button className="btn btn-primary" type="submit">{settings.primaryCtaLabel}</button>
            </form>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
