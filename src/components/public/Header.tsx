"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSetting } from "@prisma/client";

const navItems: Array<[string, string]> = [
  ["Hakkımızda", "/hakkimizda"],
  ["Özellikler", "/ozellikler"],
  ["Projeler", "/projeler"],
  ["Paketler", "/paketler"],
  ["Sık Sorulan Sorular", "/sik-sorulan-sorular"],
  ["Blog", "/blog"],
  ["Kariyer", "/kariyer"],
  ["İletişim", "/teklif-al"]
];

function BrandMark({ logoText }: { logoText: string }) {
  const rest = logoText.startsWith("i") ? logoText.slice(1) : logoText;
  return (
    <span className="brand">
      <span className="brand-i">i</span>
      <span className="brand-dot" aria-hidden="true" />
      <span>{rest.replace(/^[-·]?/, "").trim() || "pazaryeri"}</span>
    </span>
  );
}

export function Header({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Defensive: always restore scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ESC closes the menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav">
          <Link href="/" aria-label="i-Pazaryeri">
            <BrandMark logoText={settings.logoText} />
          </Link>
          <nav className="nav-links" aria-label="Ana menü">
            {navItems.map(([label, href]) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link${isActive ? " is-active" : ""}`}>
                  {label}
                </Link>
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

      {/* Drawer rendered OUTSIDE the header element so the header's
          backdrop-filter/scrolled transforms don't trap fixed positioning. */}
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
            {navItems.map(([label, href]) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-nav-link${isActive ? " is-active" : ""}`}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mobile-nav-footer">
            <Link className="btn btn-accent btn-lg mobile-nav-cta" href={settings.primaryCtaHref} onClick={closeMenu}>
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
