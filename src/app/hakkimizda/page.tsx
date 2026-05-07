import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata: Metadata = {
  title: "Hakkımızda | i-Pazaryeri B2B Pazaryeri Yazılımı",
  description:
    "i-Pazaryeri, i-Hırdavat, i-Kırtasiye ve i-Depo gibi çalışan sistemlerden gelen B2B pazaryeri yazılımı deneyimini ürünleşmiş altyapıya dönüştürür."
};

const proofItems = [
  "Laravel 12, React ve Filament tabanlı çalışan altyapı",
  "ERP, kargo, ödeme, bildirim ve admin panel süreçleri",
  "Bayi, satıcı, tedarikçi ve kurumsal alıcı rollerine uyarlanabilir yapı"
];

const stats = [
  ["3+", "çalışan sistem ailesi"],
  ["7", "ERP ve muhasebe bağlantısı"],
  ["9", "kargo sağlayıcı kurgusu"]
];

export default function AboutPage() {
  return (
    <PublicShell>
      <main>
        <section className="about-hero">
          <div className="container about-hero-grid">
            <div className="about-copy">
              <span className="clean-eyebrow">Hakkımızda</span>
              <h1>Çalışan B2B sistemlerden ürünleşmiş pazaryeri altyapısına.</h1>
              <p>
                i-Pazaryeri, bayi ağı olan şirketlerin ürün, fiyat, stok, sipariş, ERP, kargo ve ödeme süreçlerini
                tek dijital altyapıda yönetebilmesi için geliştirilen B2B pazaryeri yazılımıdır.
              </p>
              <div className="about-actions">
                <Link className="btn btn-accent btn-lg" href="/teklif-al">
                  Projenizi konuşalım <ArrowRight size={16} />
                </Link>
                <Link className="btn btn-soft btn-lg" href="/projeler">
                  Projeleri gör
                </Link>
              </div>
            </div>
            <div className="about-visual">
              <Image
                src="/uploads/hero-marketplace-forest-copper-v2.png"
                alt="i-Pazaryeri B2B altyapı görseli"
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container about-content-grid">
            <article className="about-main-card">
              <h2>Biz ne yapıyoruz?</h2>
              <p>
                B2B pazaryeri kurmak isteyen işletmelerin en büyük problemi yalnızca web sitesi tasarımı değildir.
                Bayi fiyatları, cari yapı, stok görünürlüğü, sipariş onayları, ERP senkronizasyonu, kargo takibi,
                ödeme ve komisyon akışları aynı anda doğru çalışmalıdır. i-Pazaryeri bu operasyonu hazır bir çekirdek
                üzerinden sektörünüze uyarlamak için geliştirilmiştir.
              </p>
              <p>
                i-Hırdavat, i-Kırtasiye ve i-Depo gibi sistemlerde kullanılan backend yaklaşımı; farklı sektörlerin
                bayi, tedarikçi, doğrulama ve entegrasyon ihtiyaçlarını tek mimari disiplin altında ele alır. Bu sayede
                sıfırdan yazılım riskini azaltırken özel iş kurallarınızı koruyan bir yapı kurabiliriz.
              </p>
            </article>
            <aside className="about-proof-card">
              <h3>Altyapı odağımız</h3>
              {proofItems.map((item) => (
                <div className="about-proof-line" key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="about-stats-section">
          <div className="container about-stats">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
