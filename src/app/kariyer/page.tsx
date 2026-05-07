import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Code2, Database, PanelTop, Plug } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata: Metadata = {
  title: "Kariyer | i-Pazaryeri",
  description:
    "B2B pazaryeri yazılımı, ERP entegrasyonu, admin panel ve dijital ticaret altyapıları geliştiren ekibimize katılın."
};

const roles: Array<[string, string, LucideIcon]> = [
  ["Backend Geliştirme", "Laravel, API, ERP, ödeme ve kargo entegrasyonları", Code2],
  ["Frontend Geliştirme", "React, Next.js ve yönetilebilir pazaryeri arayüzleri", PanelTop],
  ["Veri ve Entegrasyon", "Ürün, stok, sipariş, fatura ve senkronizasyon süreçleri", Database],
  ["Proje ve Operasyon", "Bayi, satıcı, admin panel ve canlıya geçiş süreçleri", Plug]
];

export default function CareerPage() {
  return (
    <PublicShell>
      <main>
        <section className="page-hero">
          <div className="container page-title">
            <span className="section-kicker">Kariyer</span>
            <h1>B2B pazaryeri sistemleri geliştiren ekibe katılın.</h1>
            <p>
              i-Pazaryeri; ERP, kargo, ödeme, admin panel ve bayi sipariş süreçlerini bir araya getiren
              gerçek ticaret altyapıları üzerinde çalışan bir ürün ekibidir.
            </p>
          </div>
        </section>

        <section className="section section-muted">
          <div className="container career-grid">
            {roles.map(([title, description, Icon]) => (
              <article className="career-card" key={title}>
                <span className="icon-badge"><Icon size={20} /></span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container career-cta">
            <div>
              <span className="section-kicker">Başvuru</span>
              <h2>Açık pozisyon olmasa bile tanışabiliriz.</h2>
              <p>
                B2B, pazaryeri, Laravel, React, entegrasyon veya ürün operasyonu tarafında deneyiminiz varsa
                bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            <Link className="btn btn-accent btn-lg" href="/teklif-al">
              İletişime geç <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
