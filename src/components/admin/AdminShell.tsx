import Link from "next/link";
import { logout } from "@/app/admin/actions";

const links = [
  ["Panel", "/admin"],
  ["Ayarlar", "/admin/settings"],
  ["Ana Sayfa", "/admin/home"],
  ["Çözüm Modeli Kartları", "/admin/business-models"],
  ["B2B/B2C/C2C Sayfaları", "/admin/business-pages"],
  ["Statik Sayfalar (Hakkımızda/Kariyer)", "/admin/static-pages"],
  ["İş Rolleri", "/admin/job-roles"],
  ["Footer Linkleri", "/admin/footer-links"],
  ["Anasayfa İstatistikleri", "/admin/home-stats"],
  ["Platformu Görün", "/admin/platform-showcase"],
  ["Entegrasyonlar", "/admin/integrations"],
  ["Servisler / Modüller", "/admin/features"],
  ["Çözüm Kartları", "/admin/solution-cards"],
  ["Paketler", "/admin/packages"],
  ["Sık Sorulan Sorular", "/admin/faqs"],
  ["SEO Yazısı", "/admin/seo-article"],
  ["Sektörler", "/admin/sectors"],
  ["Müşteri yorumları", "/admin/testimonials"],
  ["Blog", "/admin/blog"],
  ["Teklif seçenekleri", "/admin/offer-options"],
  ["Teklifler", "/admin/offers"],
  ["Siteye dön", "/"]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <div className="admin-shell">
        <aside className="admin-side">
          <h2>i-Pazaryeri</h2>
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <form action={logout}><button type="submit">Çıkış yap</button></form>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
