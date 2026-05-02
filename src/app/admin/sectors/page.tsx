import { saveSector } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminSectorsPage() {
  await requireAdmin();
  const sectors = await prisma.sector.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Sektörler</h1>
      <div className="admin-list">
        {sectors.map((s) => (
          <form className="admin-card admin-form" action={saveSector} key={s.id}>
            <input type="hidden" name="id" value={s.id} />
            <div className="form-grid">
              <TextField label="Başlık" name="title" defaultValue={s.title} required />
              <TextField label="Slug" name="slug" defaultValue={s.slug} required />
              <TextField label="Renk" name="accent" defaultValue={s.accent} />
              <TextField label="Sıra" name="sortOrder" defaultValue={s.sortOrder} />
              <TextAreaField label="Kısa açıklama" name="shortDesc" defaultValue={s.shortDesc} required />
              <TextAreaField label="İçerik" name="content" defaultValue={s.content} required />
              <TextField label="SEO başlık" name="seoTitle" defaultValue={s.seoTitle} />
              <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={s.seoDescription} />
              <CheckboxField label="Öne çıkar" name="isFeatured" defaultChecked={s.isFeatured} />
              <CheckboxField label="Yayında" name="isPublished" defaultChecked={s.isPublished} />
            </div>
            <button className="btn btn-primary" type="submit">Kaydet</button>
          </form>
        ))}
        <form className="admin-card admin-form" action={saveSector}>
          <h2>Yeni sektör</h2>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="Renk" name="accent" defaultValue="#13a88b" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Kısa açıklama" name="shortDesc" required />
            <TextAreaField label="İçerik" name="content" required />
            <TextField label="SEO başlık" name="seoTitle" />
            <TextAreaField label="SEO açıklama" name="seoDescription" />
            <CheckboxField label="Öne çıkar" name="isFeatured" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni sektör ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}

