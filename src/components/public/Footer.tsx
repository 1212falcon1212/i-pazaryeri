import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import type { FooterLink as FooterLinkRow, SiteSetting } from "@prisma/client";

function FooterCol({ title, items }: { title: string; items: FooterLinkRow[] }) {
  if (items.length === 0) return null;
  return (
    <div className="footer-col">
      <div className="footer-col-title">{title}</div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({
  settings,
  footerLinks
}: {
  settings: SiteSetting;
  footerLinks: FooterLinkRow[];
}) {
  // Group footerLinks by groupSlug; preserve original group order from sortOrder of first item
  const groups = new Map<string, { label: string; items: FooterLinkRow[] }>();
  for (const link of footerLinks) {
    const existing = groups.get(link.groupSlug);
    if (existing) {
      existing.items.push(link);
    } else {
      groups.set(link.groupSlug, { label: link.groupLabel, items: [link] });
    }
  }

  const solutionGroup = groups.get("solutions");
  const integrationGroup = groups.get("integrations");
  const guideGroup = groups.get("guides");
  const companyGroup = groups.get("company");
  const legalGroup = groups.get("legal");

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top CTA */}
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <span className="footer-cta-eyebrow">Hadi başlayalım</span>
            <h2>B2B, B2C veya C2C — sektörünüze özel ticaret altyapısı.</h2>
            <p>Sizinle 30 dakikalık ücretsiz analiz görüşmesinde modülleri, entegrasyonları ve fazlandırmayı planlıyoruz.</p>
          </div>
          <div className="footer-cta-actions">
            <Link className="btn btn-primary btn-lg" href={settings.primaryCtaHref}>
              {settings.primaryCtaLabel} <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-ghost btn-lg" href="/paketler">
              Paketleri gör
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="footer-grid footer-grid-wide">
          <div className="footer-intro">
            <Link href="/" className="footer-brand" aria-label="i-Pazaryeri">
              <span className="brand">
                <Image
                  src="/logo.png"
                  alt={settings.logoText || "i-pazaryeri"}
                  width={750}
                  height={200}
                  className="brand-logo-img"
                />
              </span>
            </Link>
            <p>
              B2B, B2C ve C2C ticaret altyapısı. Bayi ağı olan markalar, doğrudan tüketici satışı yapan işletmeler ve çok satıcılı pazaryerleri için sektörünüze uyarlanan, çalışan altyapı.
            </p>
            <ul className="footer-contact">
              {settings.contactEmail ? (
                <li>
                  <Mail size={14} />
                  <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
                </li>
              ) : null}
              {settings.contactPhone ? (
                <li>
                  <Phone size={14} />
                  <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}>{settings.contactPhone}</a>
                </li>
              ) : null}
              <li>
                <MapPin size={14} />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
          {solutionGroup ? <FooterCol title={solutionGroup.label} items={solutionGroup.items} /> : null}
          {integrationGroup ? <FooterCol title={integrationGroup.label} items={integrationGroup.items} /> : null}
          {guideGroup ? <FooterCol title={guideGroup.label} items={guideGroup.items} /> : null}
          {companyGroup ? <FooterCol title={companyGroup.label} items={companyGroup.items} /> : null}
        </div>

        {/* Legal & bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-meta">
            <div>© {new Date().getFullYear()} {settings.siteName ?? "i-Pazaryeri"}. Tüm hakları saklıdır.</div>
            {legalGroup && legalGroup.items.length > 0 ? (
              <div className="footer-bottom-links">
                {legalGroup.items.map((it) => (
                  <Link key={it.id} href={it.href ?? "#"}>{it.label}</Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
