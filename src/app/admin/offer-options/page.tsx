import { deleteOfferServiceOption, saveOfferServiceOption } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminOfferOptionsPage({ searchParams }: Props) {
  await requireAdmin();
  const [options, query] = await Promise.all([
    prisma.offerServiceOption.findMany({ orderBy: { sortOrder: "asc" } }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Teklif Seçenekleri</h1>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Kayıt silindi.</div> : null}

      <div className="admin-list">
        {options.map((option) => (
          <div className="admin-card" key={option.id}>
            <form className="admin-form" action={saveOfferServiceOption}>
              <input type="hidden" name="id" value={option.id} />
              <div className="form-grid">
                <TextField label="Etiket" name="label" defaultValue={option.label} required />
                <TextField label="Değer" name="value" defaultValue={option.value} required />
                <TextField label="Sıra" name="sortOrder" defaultValue={option.sortOrder} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={option.isPublished} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
            <form action={deleteOfferServiceOption} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={option.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveOfferServiceOption}>
          <h2>Yeni teklif seçeneği</h2>
          <div className="form-grid">
            <TextField label="Etiket" name="label" required />
            <TextField label="Değer" name="value" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni seçenek ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
