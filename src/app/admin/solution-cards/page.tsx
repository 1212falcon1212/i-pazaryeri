import { deleteSolutionCard, saveSolutionCard } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const newCardDefaults = {
  icon: "Plug",
  visualAccent: "#B87333",
  sortOrder: 99
};

export default async function AdminSolutionCardsPage() {
  await requireAdmin();
  const cards = await prisma.solutionCard.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Çözüm Kartları</h1>
      <p style={{ maxWidth: 760, color: "#64748b", lineHeight: 1.6 }}>
        Ana sayfadaki “hangi sorunu nasıl çözüyoruz?” bölümünü buradan yönetin. Marka listesini satır satır yazabilirsiniz.
      </p>

      <div className="admin-list">
        {cards.map((card) => (
          <form className="admin-card admin-form" action={saveSolutionCard} key={card.id}>
            <input type="hidden" name="id" value={card.id} />
            <div className="form-grid">
              <TextField label="Soru / Başlık" name="question" defaultValue={card.question} required />
              <TextField label="Slug" name="slug" defaultValue={card.slug} required />
              <TextField label="İkon" name="icon" defaultValue={card.icon} />
              <TextField label="Görsel URL" name="visualImage" defaultValue={card.visualImage} />
              <TextField label="Vurgu rengi" name="visualAccent" defaultValue={card.visualAccent} />
              <TextField label="Sıra" name="sortOrder" defaultValue={card.sortOrder} />
              <TextAreaField label="Cevap" name="answer" defaultValue={card.answer} required />
              <TextAreaField label="Kanıt / teknik detay" name="proof" defaultValue={card.proof} />
              <TextAreaField label="Markalar / sistemler (satır satır)" name="brands" defaultValue={card.brands} />
              <CheckboxField label="Yayında" name="isPublished" defaultChecked={card.isPublished} />
            </div>
            <div className="admin-actions">
              <button className="btn btn-primary" type="submit">Kaydet</button>
            </div>
          </form>
        ))}

        <form className="admin-card admin-form" action={saveSolutionCard}>
          <h2>Yeni çözüm kartı</h2>
          <div className="form-grid">
            <TextField label="Soru / Başlık" name="question" required />
            <TextField label="Slug" name="slug" required />
            <TextField label="İkon" name="icon" defaultValue={newCardDefaults.icon} />
            <TextField label="Görsel URL" name="visualImage" />
            <TextField label="Vurgu rengi" name="visualAccent" defaultValue={newCardDefaults.visualAccent} />
            <TextField label="Sıra" name="sortOrder" defaultValue={newCardDefaults.sortOrder} />
            <TextAreaField label="Cevap" name="answer" required />
            <TextAreaField label="Kanıt / teknik detay" name="proof" />
            <TextAreaField label="Markalar / sistemler (satır satır)" name="brands" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni kart ekle</button>
        </form>

        {cards.map((card) => (
          <form className="admin-card" action={deleteSolutionCard} key={`${card.id}-delete`}>
            <input type="hidden" name="id" value={card.id} />
            <strong>{card.question}</strong>
            <button className="btn btn-muted" type="submit">Sil</button>
          </form>
        ))}
      </div>
    </AdminShell>
  );
}
