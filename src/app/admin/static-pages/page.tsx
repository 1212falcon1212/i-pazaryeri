import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminStaticPagesIndex() {
  await requireAdmin();
  const pages = await prisma.staticPage.findMany({ orderBy: { slug: "asc" } });

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Statik Sayfalar</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Hakkımızda, Kariyer gibi sayfaların hero, içerik, kanıt listesi, istatistikler ve CTA alanları.
      </p>

      <div className="admin-list">
        {pages.map((p) => (
          <Link key={p.id} href={`/admin/static-pages/${p.slug}`} className="admin-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ marginTop: 0, marginBottom: 6 }}>
                  <span style={{ background: "var(--accent)", color: "#fff", padding: "3px 10px", borderRadius: 6, fontSize: 13, marginRight: 10 }}>
                    /{p.slug}
                  </span>
                  {p.heroTitle}
                </h2>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
                  {p.heroEyebrow ?? "—"} · {p.isPublished ? "✓ Yayında" : "○ Taslak"}
                </p>
              </div>
              <span style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600 }}>Düzenle →</span>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
