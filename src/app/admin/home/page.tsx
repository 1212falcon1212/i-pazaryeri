import { deleteHomeSectionItem, saveHomeSectionItem } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

const typeLabels: Record<string, string> = {
  problem: "Sorun alanı",
  process: "Süreç",
  reason: "Neden biz"
};

export default async function AdminHomePage({ searchParams }: Props) {
  await requireAdmin();
  const [items, query] = await Promise.all([
    prisma.homeSectionItem.findMany({ orderBy: [{ type: "asc" }, { sortOrder: "asc" }] }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Ana Sayfa</h1>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Kayıt silindi.</div> : null}

      <div className="admin-list">
        {items.map((item) => (
          <div className="admin-card" key={item.id}>
            <h2 style={{ marginTop: 0 }}>{typeLabels[item.type] ?? item.type}: {item.title}</h2>
            <form className="admin-form" action={saveHomeSectionItem}>
              <input type="hidden" name="id" value={item.id} />
              <div className="form-grid">
                <TextField label="Tip" name="type" defaultValue={item.type} required />
                <TextField label="Başlık" name="title" defaultValue={item.title} required />
                <TextField label="İkon" name="icon" defaultValue={item.icon} />
                <TextField label="Sıra" name="sortOrder" defaultValue={item.sortOrder} />
                <TextAreaField label="Açıklama" name="description" defaultValue={item.description} required />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={item.isPublished} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
            <form action={deleteHomeSectionItem} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={item.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveHomeSectionItem}>
          <h2>Yeni ana sayfa kartı</h2>
          <div className="form-grid">
            <TextField label="Tip" name="type" defaultValue="problem" required />
            <TextField label="Başlık" name="title" required />
            <TextField label="İkon" name="icon" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Açıklama" name="description" required />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni kart ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
