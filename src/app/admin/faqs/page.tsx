import { deleteFaqCategory, deleteFaqItem, saveFaqCategory, saveFaqItem } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminFaqsPage({ searchParams }: Props) {
  await requireAdmin();
  const [categories, query] = await Promise.all([
    prisma.faqCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { items: { orderBy: { sortOrder: "asc" } } }
    }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Sık Sorulan Sorular</h1>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Kayıt silindi.</div> : null}

      <div className="admin-list">
        {categories.map((category) => (
          <div className="admin-card" key={category.id}>
            <h2 style={{ marginTop: 0 }}>{category.title}</h2>
            <form className="admin-form" action={saveFaqCategory}>
              <input type="hidden" name="id" value={category.id} />
              <div className="form-grid">
                <TextField label="Başlık" name="title" defaultValue={category.title} required />
                <TextField label="Slug" name="slug" defaultValue={category.slug} required />
                <TextField label="Sıra" name="sortOrder" defaultValue={category.sortOrder} />
                <TextAreaField label="Açıklama" name="description" defaultValue={category.description} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={category.isPublished} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kategoriyi kaydet</button>
            </form>
            <form action={deleteFaqCategory} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={category.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Kategoriyi sil</button>
            </form>

            <h3>Sorular</h3>
            {category.items.map((item) => (
              <div key={item.id} style={{ borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: 14 }}>
                <form className="admin-form" action={saveFaqItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="categoryId" value={category.id} />
                  <div className="form-grid">
                    <TextField label="Soru" name="question" defaultValue={item.question} required />
                    <TextField label="Sıra" name="sortOrder" defaultValue={item.sortOrder} />
                    <TextAreaField label="Cevap" name="answer" defaultValue={item.answer} required />
                    <CheckboxField label="Ana sayfada öne çıkar" name="isFeatured" defaultChecked={item.isFeatured} />
                    <CheckboxField label="Yayında" name="isPublished" defaultChecked={item.isPublished} />
                  </div>
                  <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 12 }}>Soruyu kaydet</button>
                </form>
                <form action={deleteFaqItem} style={{ marginTop: 8 }}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="btn btn-ghost btn-sm" type="submit">Soruyu sil</button>
                </form>
              </div>
            ))}

            <form className="admin-form" action={saveFaqItem} style={{ borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: 14 }}>
              <input type="hidden" name="categoryId" value={category.id} />
              <h3>Yeni soru</h3>
              <div className="form-grid">
                <TextField label="Soru" name="question" required />
                <TextField label="Sıra" name="sortOrder" defaultValue={99} />
                <TextAreaField label="Cevap" name="answer" required />
                <CheckboxField label="Ana sayfada öne çıkar" name="isFeatured" />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked />
              </div>
              <button className="btn btn-primary btn-sm" type="submit">Soru ekle</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveFaqCategory}>
          <h2>Yeni SSS kategorisi</h2>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Açıklama" name="description" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni kategori ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
