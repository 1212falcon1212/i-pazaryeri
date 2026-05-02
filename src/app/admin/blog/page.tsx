import { savePost } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminBlogPage() {
  await requireAdmin();
  const posts = await prisma.post.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Blog / Rehber</h1>
      <div className="admin-list">
        {posts.map((p) => (
          <form className="admin-card admin-form" action={savePost} key={p.id}>
            <input type="hidden" name="id" value={p.id} />
            <div className="form-grid">
              <TextField label="Başlık" name="title" defaultValue={p.title} required />
              <TextField label="Slug" name="slug" defaultValue={p.slug} required />
              <TextField label="Etiket" name="tag" defaultValue={p.tag} />
              <TextField label="Sıra" name="sortOrder" defaultValue={p.sortOrder} />
              <TextAreaField label="Özet" name="excerpt" defaultValue={p.excerpt} required />
              <TextAreaField label="İçerik" name="content" defaultValue={p.content} required />
              <TextField label="SEO başlık" name="seoTitle" defaultValue={p.seoTitle} />
              <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={p.seoDescription} />
              <CheckboxField label="Yayında" name="isPublished" defaultChecked={p.isPublished} />
            </div>
            <button className="btn btn-primary" type="submit">Kaydet</button>
          </form>
        ))}
        <form className="admin-card admin-form" action={savePost}>
          <h2>Yeni yazı</h2>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="Etiket" name="tag" defaultValue="Rehber" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Özet" name="excerpt" required />
            <TextAreaField label="İçerik" name="content" required />
            <TextField label="SEO başlık" name="seoTitle" />
            <TextAreaField label="SEO açıklama" name="seoDescription" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni yazı ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}

