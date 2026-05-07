import { saveFeature } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminFeaturesPage() {
  await requireAdmin();
  const features = await prisma.feature.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Servisler / Modüller</h1>
      <div className="admin-list">
        {features.map((f) => (
          <form className="admin-card admin-form" action={saveFeature} key={f.id}>
            <input type="hidden" name="id" value={f.id} />
            <div className="form-grid">
              <TextField label="Başlık" name="title" defaultValue={f.title} required />
              <TextField label="Slug" name="slug" defaultValue={f.slug} required />
              <TextField label="İkon" name="icon" defaultValue={f.icon} />
              <TextField label="Kategori" name="category" defaultValue={f.category} />
              <TextField label="Görsel tipi" name="visualType" defaultValue={f.visualType} />
              <TextField label="Görsel URL" name="visualImage" defaultValue={f.visualImage} />
              <TextField label="Vurgu rengi" name="visualAccent" defaultValue={f.visualAccent} />
              <TextField label="Sıra" name="sortOrder" defaultValue={f.sortOrder} />
              <TextAreaField label="Kısa açıklama" name="shortDesc" defaultValue={f.shortDesc} required />
              <TextAreaField label="İçerik" name="content" defaultValue={f.content} required />
              <TextField label="SEO başlık" name="seoTitle" defaultValue={f.seoTitle} />
              <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={f.seoDescription} />
              <CheckboxField label="Yayında" name="isPublished" defaultChecked={f.isPublished} />
            </div>
            <button className="btn btn-primary" type="submit">Kaydet</button>
          </form>
        ))}
        <form className="admin-card admin-form" action={saveFeature}>
          <h2>Yeni servis / modül</h2>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="İkon" name="icon" defaultValue="Boxes" />
            <TextField label="Kategori" name="category" defaultValue="Genel" />
            <TextField label="Görsel tipi" name="visualType" defaultValue="icon" />
            <TextField label="Görsel URL" name="visualImage" />
            <TextField label="Vurgu rengi" name="visualAccent" defaultValue="#B87333" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Kısa açıklama" name="shortDesc" required />
            <TextAreaField label="İçerik" name="content" required />
            <TextField label="SEO başlık" name="seoTitle" />
            <TextAreaField label="SEO açıklama" name="seoDescription" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni servis ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
