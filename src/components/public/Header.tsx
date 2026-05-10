"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { SiteSetting } from "@prisma/client";

type NavItem =
  | { label: string; href: string }
  | { label: string; children: Array<{ label: string; href: string; description?: string }> };

const navItems: NavItem[] = [
  {
    label: "Çözümler",
    children: [
      { label: "B2B Pazaryeri", href: "/b2b", description: "Bayi & toptancı için kapalı sipariş portalı" },
      { label: "B2C E-Ticaret", href: "/b2c", description: "Markanız için doğrudan tüketici satışı" },
      { label: "C2C / Multi-Vendor", href: "/c2c", description: "Çok satıcılı pazaryeri altyapısı" }
    ]
  },
  {
    label: "Özellikler",
    children: [
      { label: "Tüm modüller", href: "/ozellikler", description: "Tüm çözüm kartları" },
      { label: "Entegrasyonlar", href: "/entegrasyonlar", description: "ERP, kargo, ödeme, pazaryeri" }
    ]
  },
  { label: "Paketler", href: "/paketler" },
  { label: "Blog", href: "/blog" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "SSS", href: "/sik-sorulan-sorular" },
  { label: "İletişim", href: "/teklif-al" }
];

function BrandMark({ logoText }: { logoText: string }) {
  return (
    <span className="brand">
      <Image
        src="/logo.png"
        alt={logoText || "i-pazaryeri"}
        width={750}
        height={200}
        priority
        className="brand-logo-img"
      />
    </span>
  );
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if ("href" in item) {
    return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  }
  return item.children.some((c) => pathname.startsWith(c.href));
}

export function Header({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown")) setOpenDropdown(null);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [openDropdown]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav">
          <Link href="/" aria-label="i-Pazaryeri">
            <BrandMark logoText={settings.logoText} />
          </Link>
          <nav className="nav-links" aria-label="Ana menü">
            {navItems.map((item) => {
              const active = isItemActive(item, pathname);
              if ("href" in item) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link${active ? " is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const isOpen = openDropdown === item.label;
              return (
                <div className="nav-dropdown" key={item.label}>
                  <button
                    type="button"
                    className={`nav-link nav-link-dropdown${active ? " is-active" : ""}${isOpen ? " is-open" : ""}`}
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(isOpen ? null : item.label);
                    }}
                  >
                    {item.label} <ChevronDown size={14} />
                  </button>
                  {isOpen ? (
                    <div className="nav-dropdown-panel" role="menu">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="nav-dropdown-item">
                          <strong>{c.label}</strong>
                          {c.description ? <span>{c.description}</span> : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <Link className="btn nav-cta" href={settings.primaryCtaHref}>
            {settings.primaryCtaLabel} →
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-nav-backdrop" onClick={closeMenu} />
        <aside className="mobile-nav-panel" role="dialog" aria-label="Ana menü">
          <div className="mobile-nav-head">
            <BrandMark logoText={settings.logoText} />
            <button
              type="button"
              className="mobile-nav-close"
              aria-label="Menüyü kapat"
              onClick={closeMenu}
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mobile-nav-links" aria-label="Mobil menü">
            {navItems.map((item) => {
              if ("href" in item) {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-link${isActive ? " is-active" : ""}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div className="mobile-nav-group" key={item.label}>
                  <span className="mobile-nav-group-title">{item.label}</span>
                  {item.children.map((c) => {
                    const isActive = pathname.startsWith(c.href);
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`mobile-nav-link mobile-nav-sublink${isActive ? " is-active" : ""}`}
                        onClick={closeMenu}
                      >
                        {c.label}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>
          <div className="mobile-nav-footer">
            <Link className="btn btn-primary btn-lg mobile-nav-cta" href={settings.primaryCtaHref} onClick={closeMenu}>
              {settings.primaryCtaLabel} →
            </Link>
            {settings.contactPhone ? (
              <a className="mobile-nav-meta" href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}>
                {settings.contactPhone}
              </a>
            ) : null}
            {settings.contactEmail ? (
              <a className="mobile-nav-meta" href={`mailto:${settings.contactEmail}`}>
                {settings.contactEmail}
              </a>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  );
}
