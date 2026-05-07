import { deleteTestimonial, saveTestimonial } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const items = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Müşteri yorumları</h1>
      <p className="muted" style={{ marginTop: -10 }}>
        Anasayfadaki referans alıntısı. Sadece &quot;Öne çıkan&quot; ve &quot;Yayında&quot; olan ilk kayıt anasayfaya çıkar.
      </p>
      <div className="admin-list">
        {items.map((t) => (
          <form className="admin-card admin-form" action={saveTestimonial} key={t.id}>
            <input type="hidden" name="id" value={t.id} />
            <div className="form-grid">
              <TextField label="Yazan adı" name="authorName" defaultValue={t.authorName} required />
              <TextField label="Pozisyon" name="authorRole" defaultValue={t.authorRole} />
              <TextField label="Alt satır (şirket · proje · süre)" name="authorMeta" defaultValue={t.authorMeta} />
              <TextField label="Yıldız (1-5)" name="rating" defaultValue={t.rating} />
              <TextField label="Video URL" name="videoUrl" defaultValue={t.videoUrl} />
              <TextField label="Sıra" name="sortOrder" defaultValue={t.sortOrder} />
              <TextAreaField label="Alıntı" name="quote" defaultValue={t.quote} required />
              <TextField label="Metrik 1 — etiket" name="metric1Label" defaultValue={t.metric1Label} />
              <TextField label="Metrik 1 — değer" name="metric1Value" defaultValue={t.metric1Value} />
              <TextField label="Metrik 2 — etiket" name="metric2Label" defaultValue={t.metric2Label} />
              <TextField label="Metrik 2 — değer" name="metric2Value" defaultValue={t.metric2Value} />
              <TextField label="Metrik 3 — etiket" name="metric3Label" defaultValue={t.metric3Label} />
              <TextField label="Metrik 3 — değer" name="metric3Value" defaultValue={t.metric3Value} />
              <CheckboxField label="Öne çıkan" name="isFeatured" defaultChecked={t.isFeatured} />
              <CheckboxField label="Yayında" name="isPublished" defaultChecked={t.isPublished} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-primary" type="submit">Kaydet</button>
              <button
                className="btn btn-ghost"
                type="submit"
                formAction={deleteTestimonial}
                formNoValidate
              >
                Sil
              </button>
            </div>
          </form>
        ))}
        <form className="admin-card admin-form" action={saveTestimonial}>
          <h2>Yeni yorum</h2>
          <div className="form-grid">
            <TextField label="Yazan adı" name="authorName" required />
            <TextField label="Pozisyon" name="authorRole" />
            <TextField label="Alt satır" name="authorMeta" />
            <TextField label="Yıldız" name="rating" defaultValue={5} />
            <TextField label="Video URL" name="videoUrl" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <TextAreaField label="Alıntı" name="quote" required />
            <TextField label="Metrik 1 — etiket" name="metric1Label" />
            <TextField label="Metrik 1 — değer" name="metric1Value" />
            <TextField label="Metrik 2 — etiket" name="metric2Label" />
            <TextField label="Metrik 2 — değer" name="metric2Value" />
            <TextField label="Metrik 3 — etiket" name="metric3Label" />
            <TextField label="Metrik 3 — değer" name="metric3Value" />
            <CheckboxField label="Öne çıkan" name="isFeatured" />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <button className="btn btn-primary" type="submit">Yeni yorum ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
