import { clearHeroBanner, updateSettings, uploadHeroBanner } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/content";

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

export default async function SettingsPage({ searchParams }: Props) {
  await requireAdmin();
  const [s, query] = await Promise.all([getSettings(), searchParams]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Site Ayarları</h1>

      {query.saved ? (
        <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div>
      ) : null}
      {query.error ? (
        <div className="notice" style={{ marginBottom: 18, background: "#FFE5E5", color: "#B00020" }}>
          {query.error}
        </div>
      ) : null}

      <div className="admin-card admin-form" style={{ marginBottom: 18 }}>
        <h2 style={{ marginTop: 0 }}>Ana banner görseli</h2>
        <p className="muted" style={{ marginTop: -10 }}>
          16:7 oranında, jpg / png / webp / gif / svg — 10 MB&apos;a kadar. Yüklediğinizde URL otomatik güncellenir.
        </p>

        {s.heroBannerImage ? (
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 12 }}>
            <img
              src={s.heroBannerImage}
              alt={s.heroBannerAlt ?? "Banner önizleme"}
              style={{
                width: 280,
                height: 158,
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid var(--line)",
                background: "#f0f0f3"
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 13, color: "var(--muted)", wordBreak: "break-all" }}>
                {s.heroBannerImage}
              </div>
              <form action={clearHeroBanner}>
                <button className="btn btn-ghost btn-sm" type="submit">
                  Görseli kaldır
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p className="muted" style={{ marginTop: 0 }}>Henüz görsel yüklenmedi — placeholder gösteriliyor.</p>
        )}

        <form action={uploadHeroBanner} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            required
            style={{
              padding: "10px 12px",
              border: "1px solid var(--line)",
              borderRadius: 12,
              background: "#fff"
            }}
          />
          <button className="btn btn-primary" type="submit">Görseli yükle</button>
        </form>
      </div>

      <form className="admin-card admin-form" action={updateSettings}>
        <h2 style={{ marginTop: 0 }}>Genel</h2>
        <div className="form-grid">
          <TextField label="Site adı" name="siteName" defaultValue={s.siteName} required />
          <TextField label="Logo yazısı" name="logoText" defaultValue={s.logoText} required />
          <TextField label="Ana CTA" name="primaryCtaLabel" defaultValue={s.primaryCtaLabel} required />
          <TextField label="CTA linki" name="primaryCtaHref" defaultValue={s.primaryCtaHref} required />
          <TextField label="İletişim e-posta" name="contactEmail" defaultValue={s.contactEmail} />
          <TextField label="İletişim telefon" name="contactPhone" defaultValue={s.contactPhone} />
        </div>

        <h2>Hero / Banner metinleri</h2>
        <div className="form-grid">
          <TextField label="Banner görsel URL (manuel)" name="heroBannerImage" defaultValue={s.heroBannerImage} />
          <TextField label="Banner alt metin" name="heroBannerAlt" defaultValue={s.heroBannerAlt} />
          <TextAreaField label="Banner üzerindeki başlık (sol, opsiyonel)" name="heroOverlayTitle" defaultValue={s.heroOverlayTitle} />
          <TextAreaField label="Banner üzerindeki alt başlık (opsiyonel)" name="heroOverlaySubtitle" defaultValue={s.heroOverlaySubtitle} />
          <TextField label="Birincil buton metni (mavi)" name="heroOverlayCtaPrimaryLabel" defaultValue={s.heroOverlayCtaPrimaryLabel} />
          <TextField label="Birincil buton linki" name="heroOverlayCtaPrimaryHref" defaultValue={s.heroOverlayCtaPrimaryHref} />
          <TextField label="İkincil buton metni (ghost)" name="heroOverlayCtaSecondaryLabel" defaultValue={s.heroOverlayCtaSecondaryLabel} />
          <TextField label="İkincil buton linki" name="heroOverlayCtaSecondaryHref" defaultValue={s.heroOverlayCtaSecondaryHref} />
          <TextAreaField label="Hero başlık (yedek)" name="heroTitle" defaultValue={s.heroTitle} required />
          <TextAreaField label="Hero açıklama (yedek)" name="heroDescription" defaultValue={s.heroDescription} required />
        </div>

        <h2>Özellikler sayfası (/ozellikler)</h2>
        <div className="form-grid">
          <TextAreaField label="Açıklama" name="featuresDescription" defaultValue={s.featuresDescription} required />
        </div>

        <h2>Referans projeler bölümü (anasayfa)</h2>
        <div className="form-grid">
          <TextField label="Başlık" name="projectsTitle" defaultValue={s.projectsTitle} required />
          <TextField label="Vurgu kelimesi" name="projectsTitleAccent" defaultValue={s.projectsTitleAccent} />
          <TextAreaField label="Açıklama" name="projectsDescription" defaultValue={s.projectsDescription} required />
        </div>

        <h2>Sektörler sayfası</h2>
        <div className="form-grid">
          <TextField label="Başlık" name="sectorsTitle" defaultValue={s.sectorsTitle} required />
          <TextAreaField label="Açıklama" name="sectorsDescription" defaultValue={s.sectorsDescription} required />
        </div>

        <h2>Son CTA bölümü</h2>
        <div className="form-grid">
          <TextField label="Başlık" name="finalCtaTitle" defaultValue={s.finalCtaTitle} required />
          <TextAreaField label="Açıklama" name="finalCtaDescription" defaultValue={s.finalCtaDescription} required />
          <TextField label="CTA notu" name="ctaNote" defaultValue={s.ctaNote} />
        </div>

        <h2>SEO</h2>
        <div className="form-grid">
          <TextField label="SEO başlık" name="seoTitle" defaultValue={s.seoTitle} />
          <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={s.seoDescription} />
        </div>

        <button className="btn btn-primary" type="submit">Kaydet</button>
      </form>
    </AdminShell>
  );
}
