import Link from "next/link";
import type { SiteSetting } from "@prisma/client";

type FooterLink = { label: string; href?: string };

const solutionLinks: FooterLink[] = [
  { label: "B2B pazaryeri altyapısı", href: "/ozellikler/kod-yapisi" },
  { label: "ERP ve muhasebe", href: "/ozellikler/erp-muhasebe" },
  { label: "Kargo entegrasyonları", href: "/ozellikler/kargo-sureci" },
  { label: "Ödeme ve komisyon", href: "/ozellikler/odeme-komisyon" },
  { label: "Admin panel", href: "/ozellikler/admin-panel" },
  { label: "Tüm özellikler", href: "/ozellikler" }
];

const integrationLinks: FooterLink[] = [
  { label: "Entegra" },
  { label: "BizimHesap" },
  { label: "Paraşüt" },
  { label: "KolaySoft" },
  { label: "Aras, Yurtiçi, MNG" },
  { label: "Hepsijet, Sendeo, Navlungo" }
];

const resourceLinks: FooterLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Sık Sorulan Sorular", href: "/sik-sorulan-sorular" },
  { label: "Paketler", href: "/paketler" },
  { label: "Teklif Al", href: "/teklif-al" }
];

const referenceLinks: FooterLink[] = [
  { label: "i-Depo", href: "/projeler/i-depo" },
  { label: "i-Eczane", href: "/projeler/i-eczane" },
  { label: "i-Hırdavat", href: "/projeler/i-hirdavat" },
  { label: "i-Bijuteri", href: "/projeler/i-bijuteri" },
  { label: "Tüm projeler", href: "/projeler" }
];

const companyLinks: FooterLink[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Sektörler", href: "/sektorler" },
  { label: "Referanslar", href: "/projeler" },
  { label: "İletişim", href: "/teklif-al" }
];

function FooterCol({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div className="footer-col">
      <div className="footer-col-title">{title}</div>
      <ul>
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`}>
            {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ settings }: { settings: SiteSetting }) {
  const contactItems: FooterLink[] = [
    settings.contactEmail ? { label: settings.contactEmail } : null,
    settings.contactPhone ? { label: settings.contactPhone } : null,
    { label: "İstanbul, Türkiye" }
  ].filter(Boolean) as FooterLink[];

  const rest = settings.logoText.startsWith("i") ? settings.logoText.slice(1) : settings.logoText;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <span>B2B pazaryeri planı</span>
            <h2>Bayi, ürün, ERP, kargo ve sipariş süreçlerinizi tek altyapıda toplayalım.</h2>
          </div>
          <Link className="btn btn-accent btn-lg" href={settings.primaryCtaHref}>
            {settings.primaryCtaLabel} →
          </Link>
        </div>
        <div className="footer-grid">
          <div className="footer-intro">
            <span className="brand" style={{ fontSize: 26 }}>
              <span className="brand-i">i</span>
              <span className="brand-dot" aria-hidden="true" />
              <span>{rest.replace(/^[-·]?/, "").trim() || "pazaryeri"}</span>
            </span>
            <p>
              B2B pazaryeri kurmak isteyen şirketler için ürünleşmiş, ERP ve kargo entegrasyonlarına hazır yazılım altyapısı.
            </p>
          </div>
          <FooterCol title="Çözümler" items={solutionLinks} />
          <FooterCol title="Entegrasyonlar" items={integrationLinks} />
          <FooterCol title="Projeler" items={referenceLinks} />
          <FooterCol title="Kaynaklar" items={resourceLinks} />
          <FooterCol title="Şirket" items={companyLinks} />
          <FooterCol title="İletişim" items={contactItems} />
        </div>
        <div className="footer-meta">
          <div>© {new Date().getFullYear()} i-Pazaryeri · i-Grup teknoloji şirketidir.</div>
          <div className="footer-legal">
            <a href="#">KVKK</a>
            <a href="#">Gizlilik</a>
            <a href="#">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
