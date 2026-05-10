import {
  deleteIntegration,
  deleteIntegrationGroup,
  saveIntegration,
  saveIntegrationGroup
} from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextField, TextAreaField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string; error?: string }> };

export default async function AdminIntegrationsPage({ searchParams }: Props) {
  await requireAdmin();
  const [groups, query] = await Promise.all([
    prisma.integrationGroup.findMany({
      orderBy: { sortOrder: "asc" },
      include: { items: { orderBy: { sortOrder: "asc" } } }
    }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Entegrasyonlar</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Anasayfa ve /entegrasyonlar sayfasında görünen ERP, kargo, ödeme grupları ve içerikleri.
      </p>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Silindi.</div> : null}
      {query.error ? <div className="notice" style={{ marginBottom: 18, background: "var(--danger-soft)", color: "var(--danger)" }}>{query.error}</div> : null}

      <div className="admin-list">
        {groups.map((group) => (
          <div className="admin-card" key={group.id}>
            <h2 style={{ marginTop: 0 }}>{group.title}</h2>

            {/* Group form */}
            <form className="admin-form" action={saveIntegrationGroup}>
              <input type="hidden" name="id" value={group.id} />
              <div className="form-grid">
                <TextField label="Slug" name="slug" defaultValue={group.slug} required />
                <TextField label="Başlık" name="title" defaultValue={group.title} required />
                <TextField label="Sıra" name="sortOrder" defaultValue={group.sortOrder} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={group.isPublished} />
              </div>
              <TextAreaField label="Açıklama (opsiyonel)" name="description" defaultValue={group.description ?? ""} />
              <button className="btn btn-primary" type="submit" style={{ marginTop: 12 }}>Grubu kaydet</button>
            </form>
            <form action={deleteIntegrationGroup} style={{ marginTop: 8, marginBottom: 24 }}>
              <input type="hidden" name="id" value={group.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Grubu sil (içindeki tüm itemlerle)</button>
            </form>

            {/* Items list */}
            <h3 style={{ fontSize: 18, marginTop: 24, marginBottom: 12 }}>
              Bu gruptaki entegrasyonlar ({group.items.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  style={{ padding: 10, background: "var(--bg-soft)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <form action={saveIntegration} style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr 80px auto auto", gap: 8, alignItems: "end" }}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="groupId" value={group.id} />
                    <TextField label="Ad" name="name" defaultValue={item.name} required />
                    <TextField label="Açıklama" name="description" defaultValue={item.description ?? ""} />
                    <TextField label="Logo" name="logo" defaultValue={item.logo ?? ""} />
                    <TextField label="Sıra" name="sortOrder" defaultValue={item.sortOrder} />
                    <CheckboxField label="Yayında" name="isPublished" defaultChecked={item.isPublished} />
                    <button className="btn btn-primary btn-sm" type="submit">Kaydet</button>
                  </form>
                  <form action={deleteIntegration}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="btn btn-ghost btn-sm" type="submit" style={{ fontSize: 11 }}>Sil</button>
                  </form>
                </div>
              ))}
            </div>

            {/* Add item to group */}
            <form
              className="admin-form"
              action={saveIntegration}
              style={{ marginTop: 12, padding: 12, background: "var(--accent-soft)", borderRadius: 8 }}
            >
              <input type="hidden" name="groupId" value={group.id} />
              <h4 style={{ marginTop: 0, fontSize: 14 }}>Bu gruba yeni entegrasyon ekle</h4>
              <div className="form-grid">
                <TextField label="Ad" name="name" required />
                <TextField label="Açıklama" name="description" />
                <TextField label="Logo URL" name="logo" />
                <TextField label="Sıra" name="sortOrder" defaultValue={99} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked />
              </div>
              <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 8 }}>Ekle</button>
            </form>
          </div>
        ))}

        {/* New group */}
        <form className="admin-card admin-form" action={saveIntegrationGroup}>
          <h2>Yeni grup</h2>
          <div className="form-grid">
            <TextField label="Slug" name="slug" required />
            <TextField label="Başlık" name="title" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <TextAreaField label="Açıklama" name="description" />
          <button className="btn btn-primary" type="submit">Yeni grup ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
