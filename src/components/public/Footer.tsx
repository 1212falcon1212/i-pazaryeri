import Link from "next/link";
import type { SiteSetting } from "@prisma/client";

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><strong>{settings.logoText}</strong><div>B2B pazaryeri altyapısı ve sektörel kurulum.</div></div>
        <div>{settings.contactEmail}{settings.contactPhone ? ` · ${settings.contactPhone}` : ""}</div>
        <Link className="btn btn-soft" href={settings.primaryCtaHref}>{settings.primaryCtaLabel}</Link>
      </div>
    </footer>
  );
}

