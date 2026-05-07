import { clearProjectImage, saveProject, uploadProjectImage } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

export default async function AdminProjectsPage({ searchParams }: Props) {
  await requireAdmin();
  const [projects, query] = await Promise.all([
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Projeler</h1>

      {query.saved ? (
        <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div>
      ) : null}
      {query.error ? (
        <div className="notice" style={{ marginBottom: 18, background: "#FFE5E5", color: "#B00020" }}>
          {query.error}
        </div>
      ) : null}

      <div className="admin-list">
        {projects.map((p) => (
          <div className="admin-card" key={p.id} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ marginTop: 0 }}>{p.title}</h2>

            <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
              {p.coverImage ? (
                <img
                  src={p.coverImage}
                  alt={p.title}
                  style={{
                    width: 220,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid var(--line)",
                    background: "#f0f0f3"
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 220,
                    height: 140,
                    borderRadius: 12,
                    border: "1px dashed var(--line-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    fontSize: 13,
                    background: "#fafafb"
                  }}
                >
                  Görsel yok
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 240 }}>
                <form action={uploadProjectImage} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input type="hidden" name="id" value={p.id} />
                  <input
                    type="file"
                    name="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    required
                    style={{ padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 10, background: "#fff", flex: 1, minWidth: 180 }}
                  />
                  <button className="btn btn-primary btn-sm" type="submit">Görseli yükle</button>
                </form>
                {p.coverImage ? (
                  <form action={clearProjectImage}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="btn btn-ghost btn-sm" type="submit">Görseli kaldır</button>
                  </form>
                ) : null}
                <p className="muted" style={{ margin: 0, fontSize: 12 }}>
                  Önerilen: 16:9 oran, jpg / png / webp — max 10 MB
                </p>
              </div>
            </div>

            <form className="admin-form" action={saveProject}>
              <input type="hidden" name="id" value={p.id} />
              <div className="form-grid">
                <TextField label="Başlık" name="title" defaultValue={p.title} required />
                <TextField label="Slug" name="slug" defaultValue={p.slug} required />
                <TextField label="Kategori" name="category" defaultValue={p.category} required />
                <TextField label="Sektör" name="sector" defaultValue={p.sector} required />
                <TextField label="Durum" name="status" defaultValue={p.status} />
                <TextField label="Renk" name="accent" defaultValue={p.accent} />
                <TextField label="Yıl" name="year" defaultValue={p.year} />
                <TextField label="Sıra" name="sortOrder" defaultValue={p.sortOrder} />
                <TextField label="Canlı URL" name="liveUrl" defaultValue={p.liveUrl} />
                <TextAreaField label="Kısa açıklama" name="shortDesc" defaultValue={p.shortDesc} required />
                <TextAreaField label="İçerik" name="content" defaultValue={p.content} required />
                <TextField label="SEO başlık" name="seoTitle" defaultValue={p.seoTitle} />
                <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={p.seoDescription} />
                <CheckboxField label="Öne çıkar" name="isFeatured" defaultChecked={p.isFeatured} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={p.isPublished} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
          </div>
        ))}
        <form className="admin-card admin-form" action={saveProject}>
          <h2>Yeni proje</h2>
          <p className="muted" style={{ marginTop: -10 }}>
            Önce projeyi kaydedin, sonra üstteki kartından görseli yükleyebilirsiniz.
          </p>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="Kategori" name="category" required />
            <TextField label="Sektör" name="sector" required />
            <TextField label="Durum" name="status" defaultValue="Yayında" />
            <TextField label="Renk" name="accent" defaultValue="#1F4FFF" />
            <TextField label="Yıl" name="year" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextField label="Canlı URL" name="liveUrl" />
            <TextAreaField label="Kısa açıklama" name="shortDesc" required />
            <TextAreaField label="İçerik" name="content" required />
            <TextField label="SEO başlık" name="seoTitle" />
            <TextAreaField label="SEO açıklama" name="seoDescription" />
            <CheckboxField label="Öne çıkar" name="isFeatured" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni proje ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
