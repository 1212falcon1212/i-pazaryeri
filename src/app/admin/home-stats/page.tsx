import { deleteHomeStat, saveHomeStat } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminHomeStatsPage({ searchParams }: Props) {
  await requireAdmin();
  const [stats, query] = await Promise.all([
    prisma.homeStat.findMany({ orderBy: { sortOrder: "asc" } }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Anasayfa İstatistikleri</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Anasayfada metrics bölümünde görünen 4 sayı (örn. &quot;%70+ Manuel sipariş azalır&quot;).
      </p>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Silindi.</div> : null}

      <div className="admin-list">
        {stats.map((stat) => (
          <div className="admin-card" key={stat.id}>
            <form className="admin-form" action={saveHomeStat}>
              <input type="hidden" name="id" value={stat.id} />
              <div className="form-grid">
                <TextField label="Değer (örn. %70+)" name="value" defaultValue={stat.value} required />
                <TextField label="Etiket" name="label" defaultValue={stat.label} required />
                <TextField label="Sıra" name="sortOrder" defaultValue={stat.sortOrder} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={stat.isPublished} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
            <form action={deleteHomeStat} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={stat.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveHomeStat}>
          <h2>Yeni istatistik</h2>
          <div className="form-grid">
            <TextField label="Değer" name="value" required />
            <TextField label="Etiket" name="label" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni istatistik ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
