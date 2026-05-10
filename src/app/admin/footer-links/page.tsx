import { deleteFooterLink, saveFooterLink } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

const knownGroups = [
  { slug: "solutions", label: "Çözümler" },
  { slug: "integrations", label: "Entegrasyonlar" },
  { slug: "guides", label: "Rehberler" },
  { slug: "company", label: "Şirket" },
  { slug: "legal", label: "Yasal" }
];

export default async function AdminFooterLinksPage({ searchParams }: Props) {
  await requireAdmin();
  const [links, query] = await Promise.all([
    prisma.footerLink.findMany({ orderBy: [{ groupSlug: "asc" }, { sortOrder: "asc" }] }),
    searchParams
  ]);

  // Group by groupSlug
  const grouped = new Map<string, { label: string; items: typeof links }>();
  for (const link of links) {
    const existing = grouped.get(link.groupSlug);
    if (existing) {
      existing.items.push(link);
    } else {
      grouped.set(link.groupSlug, { label: link.groupLabel, items: [link] });
    }
  }

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Footer Linkleri</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Sitenin footer'ında görünen linkler. 5 grup: Çözümler, Entegrasyonlar, Rehberler, Şirket, Yasal.
      </p>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Silindi.</div> : null}

      <div className="admin-list">
        {[...grouped.entries()].map(([slug, group]) => (
          <div className="admin-card" key={slug}>
            <h2 style={{ marginTop: 0 }}>
              <span style={{ background: "var(--accent-soft)", color: "var(--accent)", padding: "3px 10px", borderRadius: 6, fontSize: 13, marginRight: 10 }}>
                {slug}
              </span>
              {group.label} ({group.items.length})
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {group.items.map((link) => (
                <div key={link.id} style={{ padding: 10, background: "var(--bg-soft)", borderRadius: 8 }}>
                  <form action={saveFooterLink} style={{ display: "grid", gridTemplateColumns: "2fr 3fr 80px auto auto", gap: 8, alignItems: "end" }}>
                    <input type="hidden" name="id" value={link.id} />
                    <input type="hidden" name="groupSlug" value={link.groupSlug} />
                    <input type="hidden" name="groupLabel" value={link.groupLabel} />
                    <TextField label="Etiket" name="label" defaultValue={link.label} required />
                    <TextField label="Link (href)" name="href" defaultValue={link.href} required />
                    <TextField label="Sıra" name="sortOrder" defaultValue={link.sortOrder} />
                    <CheckboxField label="Yayında" name="isPublished" defaultChecked={link.isPublished} />
                    <button className="btn btn-primary btn-sm" type="submit">Kaydet</button>
                  </form>
                  <form action={deleteFooterLink} style={{ marginTop: 6 }}>
                    <input type="hidden" name="id" value={link.id} />
                    <button className="btn btn-ghost btn-sm" type="submit" style={{ fontSize: 11 }}>Sil</button>
                  </form>
                </div>
              ))}
            </div>

            <form action={saveFooterLink} style={{ marginTop: 12, padding: 12, background: "var(--accent-soft)", borderRadius: 8 }}>
              <h3 style={{ marginTop: 0, fontSize: 14 }}>Bu gruba yeni link ekle</h3>
              <input type="hidden" name="groupSlug" value={slug} />
              <input type="hidden" name="groupLabel" value={group.label} />
              <div className="form-grid">
                <TextField label="Etiket" name="label" required />
                <TextField label="Link (href)" name="href" required />
                <TextField label="Sıra" name="sortOrder" defaultValue={99} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked />
              </div>
              <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 8 }}>Ekle</button>
            </form>
          </div>
        ))}

        {/* New group */}
        <form className="admin-card admin-form" action={saveFooterLink}>
          <h2>Yeni grup başlat</h2>
          <div className="form-grid">
            <label className="field">
              <span>Grup slug</span>
              <select name="groupSlug" required>
                {knownGroups.map((g) => <option key={g.slug} value={g.slug}>{g.slug}</option>)}
              </select>
            </label>
            <TextField label="Grup etiketi (gösterim adı)" name="groupLabel" required />
            <TextField label="Link etiketi" name="label" required />
            <TextField label="Link href" name="href" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={1} />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni link ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
