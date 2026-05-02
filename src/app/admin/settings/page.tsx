import { updateSettings } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/content";

export default async function SettingsPage() {
  await requireAdmin();
  const s = await getSettings();

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Site Ayarları</h1>
      <form className="admin-card admin-form" action={updateSettings}>
        <div className="form-grid">
          <TextField label="Site adı" name="siteName" defaultValue={s.siteName} required />
          <TextField label="Logo yazısı" name="logoText" defaultValue={s.logoText} required />
          <TextField label="Ana CTA" name="primaryCtaLabel" defaultValue={s.primaryCtaLabel} required />
          <TextField label="CTA linki" name="primaryCtaHref" defaultValue={s.primaryCtaHref} required />
          <TextField label="İletişim e-posta" name="contactEmail" defaultValue={s.contactEmail} />
          <TextField label="İletişim telefon" name="contactPhone" defaultValue={s.contactPhone} />
          <TextAreaField label="Hero başlık" name="heroTitle" defaultValue={s.heroTitle} required />
          <TextAreaField label="Hero açıklama" name="heroDescription" defaultValue={s.heroDescription} required />
          <TextField label="Projeler başlığı" name="projectsTitle" defaultValue={s.projectsTitle} required />
          <TextAreaField label="Projeler açıklaması" name="projectsDescription" defaultValue={s.projectsDescription} required />
          <TextField label="Sektörler başlığı" name="sectorsTitle" defaultValue={s.sectorsTitle} required />
          <TextAreaField label="Sektörler açıklaması" name="sectorsDescription" defaultValue={s.sectorsDescription} required />
          <TextField label="Özellikler başlığı" name="featuresTitle" defaultValue={s.featuresTitle} required />
          <TextAreaField label="Özellikler açıklaması" name="featuresDescription" defaultValue={s.featuresDescription} required />
          <TextField label="Süreç başlığı" name="processTitle" defaultValue={s.processTitle} required />
          <TextAreaField label="Süreç açıklaması" name="processDescription" defaultValue={s.processDescription} required />
          <TextField label="Son CTA başlığı" name="finalCtaTitle" defaultValue={s.finalCtaTitle} required />
          <TextAreaField label="Son CTA açıklaması" name="finalCtaDescription" defaultValue={s.finalCtaDescription} required />
          <TextField label="SEO başlık" name="seoTitle" defaultValue={s.seoTitle} />
          <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={s.seoDescription} />
        </div>
        <button className="btn btn-primary" type="submit">Kaydet</button>
      </form>
    </AdminShell>
  );
}

