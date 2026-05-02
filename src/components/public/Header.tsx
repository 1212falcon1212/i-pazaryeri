import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";
import type { SiteSetting } from "@prisma/client";

const navItems = [["Projeler", "/projeler"], ["Özellikler", "/ozellikler"], ["Sektörler", "/sektorler"], ["Blog", "/blog"]];

export function Header({ settings }: { settings: SiteSetting }) {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/">
          <span className="brand-mark"><Boxes size={22} /></span>
          <span>{settings.logoText}</span>
        </Link>
        <nav className="nav-links" aria-label="Ana menü">
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link className="btn" href={settings.primaryCtaHref}>{settings.primaryCtaLabel}<ArrowRight size={17} /></Link>
        </nav>
      </div>
    </header>
  );
}

