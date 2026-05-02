import Link from "next/link";
import { logout } from "@/app/admin/actions";

const links = [
  ["Panel", "/admin"],
  ["Ayarlar", "/admin/settings"],
  ["Projeler", "/admin/projects"],
  ["Özellikler", "/admin/features"],
  ["Sektörler", "/admin/sectors"],
  ["Blog", "/admin/blog"],
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

