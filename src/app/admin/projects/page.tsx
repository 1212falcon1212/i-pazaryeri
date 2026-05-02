import { saveProject } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Projeler</h1>
      <div className="admin-list">
        {projects.map((p) => (
          <form className="admin-card admin-form" action={saveProject} key={p.id}>
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
              <TextAreaField label="Kısa açıklama" name="shortDesc" defaultValue={p.shortDesc} required />
              <TextAreaField label="İçerik" name="content" defaultValue={p.content} required />
              <TextField label="SEO başlık" name="seoTitle" defaultValue={p.seoTitle} />
              <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={p.seoDescription} />
              <CheckboxField label="Öne çıkar" name="isFeatured" defaultChecked={p.isFeatured} />
              <CheckboxField label="Yayında" name="isPublished" defaultChecked={p.isPublished} />
            </div>
            <button className="btn btn-primary" type="submit">Kaydet</button>
          </form>
        ))}
        <form className="admin-card admin-form" action={saveProject}>
          <h2>Yeni proje</h2>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="Kategori" name="category" required />
            <TextField label="Sektör" name="sector" required />
            <TextField label="Durum" name="status" defaultValue="Yayında" />
            <TextField label="Renk" name="accent" defaultValue="#0f8ea8" />
            <TextField label="Yıl" name="year" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
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
