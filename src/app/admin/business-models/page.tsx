import { deleteBusinessModelCard, saveBusinessModelCard } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextField, TextAreaField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminBusinessModelsPage({ searchParams }: Props) {
  await requireAdmin();
  const [cards, query] = await Promise.all([
    prisma.businessModelCard.findMany({ orderBy: { sortOrder: "asc" } }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Çözüm Modeli Kartları</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Anasayfada görünen B2B / B2C / C2C modeli kartları. Bullets alanı her satıra bir madde gelecek şekilde JSON array olarak yazılır.
      </p>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Silindi.</div> : null}

      <div className="admin-list">
        {cards.map((card) => (
          <div className="admin-card" key={card.id}>
            <h2 style={{ marginTop: 0 }}>
              {card.badge} — {card.title}
            </h2>
            <form className="admin-form" action={saveBusinessModelCard}>
              <input type="hidden" name="id" value={card.id} />
              <div className="form-grid">
                <TextField label="Slug" name="slug" defaultValue={card.slug} required />
                <TextField label="Rozet (B2B/B2C/C2C)" name="badge" defaultValue={card.badge} required />
                <TextField label="Başlık" name="title" defaultValue={card.title} required />
                <TextField label="Link (href)" name="href" defaultValue={card.href} required />
                <TextField label="Renk (blue/indigo/amber)" name="color" defaultValue={card.color} />
                <TextField label="Görsel yolu (/uploads/...)" name="image" defaultValue={card.image ?? ""} />
                <TextField label="Sıra" name="sortOrder" defaultValue={card.sortOrder} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={card.isPublished} />
              </div>
              <TextAreaField label="Açıklama" name="description" defaultValue={card.description} required />
              <TextAreaField
                label='Bullets (JSON array, örn: ["Madde 1", "Madde 2"])'
                name="bullets"
                defaultValue={card.bullets}
                required
                             />
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
            <form action={deleteBusinessModelCard} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={card.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveBusinessModelCard}>
          <h2>Yeni model kartı</h2>
          <div className="form-grid">
            <TextField label="Slug" name="slug" required />
            <TextField label="Rozet" name="badge" required />
            <TextField label="Başlık" name="title" required />
            <TextField label="Link (href)" name="href" required />
            <TextField label="Renk" name="color" defaultValue="blue" />
            <TextField label="Görsel yolu" name="image" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <TextAreaField label="Açıklama" name="description" required />
          <TextAreaField label='Bullets (JSON array)' name="bullets" required defaultValue='["", "", "", ""]' />
          <button className="btn btn-primary" type="submit">Yeni kart ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
