import { deleteSeoArticleSection, saveSeoArticleSection } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminSeoArticlePage({ searchParams }: Props) {
  await requireAdmin();
  const [articles, query] = await Promise.all([
    prisma.seoArticleSection.findMany({ orderBy: [{ placement: "asc" }, { sortOrder: "asc" }] }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>SEO Yazısı</h1>
      <p className="admin-muted">
        Ana sayfada blog kartlarının altında görünen uzun SEO içeriğini buradan düzenleyebilirsiniz.
      </p>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Kayıt silindi.</div> : null}

      <div className="admin-list">
        {articles.map((article) => (
          <div className="admin-card" key={article.id}>
            <h2 style={{ marginTop: 0 }}>{article.title}</h2>
            <form className="admin-form" action={saveSeoArticleSection}>
              <input type="hidden" name="id" value={article.id} />
              <div className="form-grid">
                <TextField label="Yerleşim" name="placement" defaultValue={article.placement} required />
                <TextField label="Üst başlık" name="eyebrow" defaultValue={article.eyebrow} />
                <TextField label="Başlık" name="title" defaultValue={article.title} required />
                <TextField label="Sıra" name="sortOrder" defaultValue={article.sortOrder} />
                <TextAreaField label="Giriş metni" name="intro" defaultValue={article.intro} required />
                <TextAreaField
                  label="İçindekiler (her satır bir madde)"
                  name="tableOfContents"
                  defaultValue={article.tableOfContents}
                  required
                />
                <TextAreaField label="Ana içerik" name="content" defaultValue={article.content} required />
                <TextField label="CTA başlığı" name="ctaTitle" defaultValue={article.ctaTitle} />
                <TextAreaField label="CTA açıklaması" name="ctaDescription" defaultValue={article.ctaDescription} />
                <TextField label="CTA buton etiketi" name="ctaLabel" defaultValue={article.ctaLabel} />
                <TextField label="CTA linki" name="ctaHref" defaultValue={article.ctaHref} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={article.isPublished} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
            <form action={deleteSeoArticleSection} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={article.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveSeoArticleSection}>
          <h2>Yeni SEO yazısı</h2>
          <div className="form-grid">
            <TextField label="Yerleşim" name="placement" defaultValue="homepage-after-blog" required />
            <TextField label="Üst başlık" name="eyebrow" defaultValue="Kapsamlı rehber" />
            <TextField label="Başlık" name="title" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Giriş metni" name="intro" required />
            <TextAreaField label="İçindekiler (her satır bir madde)" name="tableOfContents" required />
            <TextAreaField label="Ana içerik" name="content" required />
            <TextField label="CTA başlığı" name="ctaTitle" />
            <TextAreaField label="CTA açıklaması" name="ctaDescription" />
            <TextField label="CTA buton etiketi" name="ctaLabel" />
            <TextField label="CTA linki" name="ctaHref" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni yazı ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
