import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminBusinessPagesIndex() {
  await requireAdmin();
  const pages = await prisma.businessModelPage.findMany({
    orderBy: { slug: "asc" },
    include: { _count: { select: { highlights: true, useCases: true, metrics: true } } }
  });

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>B2B / B2C / C2C Model Sayfaları</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        /b2b, /b2c, /c2c sayfalarının tüm içeriği — hero, kimler için, çekirdek özellikler, kullanım senaryoları, metrikler, entegrasyonlar, CTA.
      </p>

      <div className="admin-list">
        {pages.map((p) => (
          <Link key={p.id} href={`/admin/business-pages/${p.slug}`} className="admin-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div>
                <h2 style={{ marginTop: 0, marginBottom: 6 }}>
                  <span style={{ background: "var(--accent)", color: "#fff", padding: "3px 10px", borderRadius: 6, fontSize: 13, marginRight: 10 }}>
                    {p.slug.toUpperCase()}
                  </span>
                  {p.title}
                </h2>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
                  {p.badge}
                </p>
                <div style={{ marginTop: 10, display: "flex", gap: 18, fontSize: 13, color: "var(--ink-2)" }}>
                  <span>{p._count.highlights} özellik</span>
                  <span>{p._count.useCases} kullanım senaryosu</span>
                  <span>{p._count.metrics} metrik</span>
                  <span style={{ color: p.isPublished ? "var(--ok, #16a34a)" : "var(--muted)" }}>
                    {p.isPublished ? "✓ Yayında" : "○ Taslak"}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600 }}>Düzenle →</span>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
