import Image from "next/image";
import { clearPostImage, deletePost, savePost, uploadPostImage } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string; error?: string }> };

const TAG_OPTIONS = [
  "Rehber",
  "B2B",
  "B2C",
  "C2C",
  "Entegrasyon",
  "Mobil",
  "Strateji",
  "Pazarlama",
  "Güvenlik",
  "Kargo",
  "ERP",
  "Admin Panel",
  "Planlama"
];

export default async function AdminBlogPage({ searchParams }: Props) {
  await requireAdmin();
  const [posts, query] = await Promise.all([
    prisma.post.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    searchParams
  ]);

  return (
    <AdminShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Yönetim</p>
          <h1>Blog Yazıları</h1>
          <p className="admin-subtitle">Tüm blog yazılarını buradan yönetin. SEO meta, kapak görseli, tag ve sıralama düzenlenebilir.</p>
        </div>
        <div className="admin-page-meta">{posts.length} yazı</div>
      </div>

      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Yazı silindi.</div> : null}
      {query.error ? <div className="notice" style={{ marginBottom: 18, background: "#FEE2E2", color: "#B72525" }}>{query.error}</div> : null}

      <div className="admin-list">
        {posts.map((post, idx) => (
          <details className="admin-card admin-collapsible" key={post.id} open={idx === 0}>
            <summary className="admin-collapsible-summary">
              <div className="admin-collapsible-title">
                {post.coverImage ? (
                  <span className="admin-blog-thumb">
                    <Image src={post.coverImage} alt="" width={60} height={60} sizes="60px" />
                  </span>
                ) : (
                  <span className="admin-collapsible-index">📝</span>
                )}
                <div>
                  <h2>{post.title}</h2>
                  <p className="admin-collapsible-meta">
                    <span>/{post.slug}</span>
                    <span>· {post.tag}</span>
                    <span>· #{post.sortOrder}</span>
                  </p>
                </div>
              </div>
              <div className="admin-badge-row">
                <span className={`admin-badge ${post.isPublished ? "admin-badge-success" : "admin-badge-muted"}`}>
                  {post.isPublished ? "Yayında" : "Taslak"}
                </span>
              </div>
            </summary>

            <div className="admin-collapsible-body">
              <section className="admin-section">
                <header className="admin-section-head">
                  <h3>Kapak Görseli</h3>
                  <p>Blog kartlarında ve detay sayfasında gösterilen görsel.</p>
                </header>
                <div className="admin-blog-cover-row">
                  {post.coverImage ? (
                    <span className="admin-blog-cover-preview">
                      <Image src={post.coverImage} alt={post.title} width={200} height={120} sizes="200px" />
                    </span>
                  ) : (
                    <div className="admin-blog-cover-empty">Görsel yok</div>
                  )}
                  <div className="admin-blog-cover-actions">
                    <form action={uploadPostImage}>
                      <input type="hidden" name="id" value={post.id} />
                      <label className="btn btn-soft btn-sm">
                        Yeni görsel yükle
                        <input type="file" name="file" accept="image/*" hidden />
                      </label>
                      <button className="btn btn-ghost btn-sm" type="submit">Yükle</button>
                    </form>
                    {post.coverImage ? (
                      <form action={clearPostImage}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className="btn btn-ghost btn-sm" type="submit">Görseli kaldır</button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </section>

              <form className="admin-form" action={savePost}>
                <input type="hidden" name="id" value={post.id} />

                <section className="admin-section">
                  <header className="admin-section-head"><h3>Temel bilgiler</h3></header>
                  <div className="form-grid">
                    <TextField label="Başlık" name="title" defaultValue={post.title} required />
                    <TextField label="Slug" name="slug" defaultValue={post.slug} required />
                    <div className="field">
                      <label htmlFor={`tag-${post.id}`}>Kategori (Tag)</label>
                      <select id={`tag-${post.id}`} name="tag" defaultValue={post.tag}>
                        {TAG_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <TextField label="Sıra" name="sortOrder" defaultValue={post.sortOrder} />
                    <TextAreaField label="Özet (excerpt)" name="excerpt" defaultValue={post.excerpt} required />
                    <div className="field full admin-checkbox-row">
                      <CheckboxField label="Yayında" name="isPublished" defaultChecked={post.isPublished} />
                    </div>
                  </div>
                </section>

                <section className="admin-section">
                  <header className="admin-section-head">
                    <h3>İçerik (Markdown)</h3>
                    <p>Başlıklar için ## , alt başlıklar için ### , listeler için "- " prefix. Paragrafları boş satırla ayırın.</p>
                  </header>
                  <div className="form-grid">
                    <TextAreaField label="İçerik" name="content" defaultValue={post.content} required />
                  </div>
                </section>

                <section className="admin-section">
                  <header className="admin-section-head"><h3>SEO</h3></header>
                  <div className="form-grid">
                    <TextField label="SEO Title" name="seoTitle" defaultValue={post.seoTitle} />
                    <TextAreaField label="SEO Description" name="seoDescription" defaultValue={post.seoDescription} />
                  </div>
                </section>

                <div className="admin-form-actions">
                  <button className="btn btn-primary" type="submit">Yazıyı kaydet</button>
                </div>
              </form>

              <form action={deletePost} className="admin-danger-row">
                <input type="hidden" name="id" value={post.id} />
                <button className="btn btn-ghost btn-sm" type="submit">Yazıyı sil</button>
              </form>
            </div>
          </details>
        ))}

        <details className="admin-card admin-collapsible admin-collapsible-add">
          <summary className="admin-collapsible-summary">
            <div className="admin-collapsible-title">
              <span className="admin-collapsible-index admin-collapsible-index-add">+</span>
              <div>
                <h2>Yeni yazı ekle</h2>
                <p className="admin-collapsible-meta">Sıfırdan yeni bir blog yazısı oluşturun.</p>
              </div>
            </div>
          </summary>
          <div className="admin-collapsible-body">
            <form className="admin-form" action={savePost}>
              <section className="admin-section">
                <header className="admin-section-head"><h3>Temel bilgiler</h3></header>
                <div className="form-grid">
                  <TextField label="Başlık" name="title" required />
                  <TextField label="Slug" name="slug" required />
                  <div className="field">
                    <label htmlFor="new-tag">Kategori</label>
                    <select id="new-tag" name="tag" defaultValue="Rehber">
                      {TAG_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <TextField label="Sıra" name="sortOrder" defaultValue={500} />
                  <TextAreaField label="Özet (excerpt)" name="excerpt" required />
                  <div className="field full admin-checkbox-row">
                    <CheckboxField label="Yayında" name="isPublished" defaultChecked />
                  </div>
                </div>
              </section>

              <section className="admin-section">
                <header className="admin-section-head"><h3>İçerik (Markdown)</h3></header>
                <div className="form-grid">
                  <TextAreaField label="İçerik" name="content" required />
                </div>
              </section>

              <section className="admin-section">
                <header className="admin-section-head"><h3>SEO</h3></header>
                <div className="form-grid">
                  <TextField label="SEO Title" name="seoTitle" />
                  <TextAreaField label="SEO Description" name="seoDescription" />
                </div>
              </section>

              <div className="admin-form-actions">
                <button className="btn btn-primary" type="submit">Yazıyı oluştur</button>
              </div>
            </form>
          </div>
        </details>
      </div>
    </AdminShell>
  );
}
