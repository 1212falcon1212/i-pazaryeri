import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  deleteBusinessModelHighlight,
  deleteBusinessModelMetric,
  deleteBusinessModelUseCase,
  saveBusinessModelHighlight,
  saveBusinessModelMetric,
  saveBusinessModelPage,
  saveBusinessModelUseCase
} from "../../actions";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminBusinessPageDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const { slug } = await params;
  const query = await searchParams;

  const page = await prisma.businessModelPage.findUnique({
    where: { slug },
    include: {
      highlights: { orderBy: { sortOrder: "asc" } },
      useCases: { orderBy: { sortOrder: "asc" } },
      metrics: { orderBy: { sortOrder: "asc" } }
    }
  });
  if (!page) notFound();

  return (
    <AdminShell>
      <Link href="/admin/business-pages" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>← Tüm model sayfaları</Link>
      <h1 style={{ fontSize: 44, marginTop: 8 }}>
        <span style={{ background: "var(--accent)", color: "#fff", padding: "4px 14px", borderRadius: 8, fontSize: 22, marginRight: 14 }}>
          {page.slug.toUpperCase()}
        </span>
        {page.title}
      </h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Public URL: <Link href={`/${page.slug}`} target="_blank">/{page.slug}</Link>
      </p>

      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Silindi.</div> : null}

      {/* Page main fields */}
      <form className="admin-card admin-form" action={saveBusinessModelPage}>
        <h2 style={{ marginTop: 0 }}>Hero & Genel</h2>
        <input type="hidden" name="id" value={page.id} />
        <input type="hidden" name="slug" value={page.slug} />
        <div className="form-grid">
          <TextField label="Rozet (badge)" name="badge" defaultValue={page.badge} required />
          <TextField label="Birincil CTA metni" name="primaryCtaLabel" defaultValue={page.primaryCtaLabel} required />
          <TextField label="Birincil CTA linki" name="primaryCtaHref" defaultValue={page.primaryCtaHref} required />
          <CheckboxField label="Yayında" name="isPublished" defaultChecked={page.isPublished} />
        </div>
        <TextAreaField label="Hero başlık (ana cümle)" name="title" defaultValue={page.title} required />
        <TextAreaField label="Hero vurgusu (renkli son cümle)" name="highlight" defaultValue={page.highlight} required />
        <TextAreaField label="Hero açıklaması" name="description" defaultValue={page.description} required />
        <TextAreaField label='Hedef kitle (audience — JSON array)' name="audience" defaultValue={page.audience} required />

        <h2 style={{ marginTop: 28 }}>Entegrasyon copy</h2>
        <TextAreaField label="Entegrasyon paragrafı" name="integrationsCopy" defaultValue={page.integrationsCopy} required />

        <h2 style={{ marginTop: 28 }}>Final CTA</h2>
        <TextAreaField label="CTA başlığı" name="ctaTitle" defaultValue={page.ctaTitle} required />
        <TextAreaField label="CTA açıklaması" name="ctaDescription" defaultValue={page.ctaDescription} required />

        <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Sayfayı kaydet</button>
      </form>

      {/* Highlights */}
      <div className="admin-card" style={{ marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Çekirdek Özellikler ({page.highlights.length})</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {page.highlights.map((h) => (
            <div key={h.id} style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 10 }}>
              <form action={saveBusinessModelHighlight}>
                <input type="hidden" name="id" value={h.id} />
                <input type="hidden" name="pageId" value={page.id} />
                <input type="hidden" name="slug" value={page.slug} />
                <div className="form-grid">
                  <TextField label="Icon (Lucide adı, örn. Users)" name="icon" defaultValue={h.icon} required />
                  <TextField label="Başlık" name="title" defaultValue={h.title} required />
                  <TextField label="Sıra" name="sortOrder" defaultValue={h.sortOrder} />
                </div>
                <TextAreaField label="Açıklama" name="description" defaultValue={h.description} required />
                <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 8 }}>Kaydet</button>
              </form>
              <form action={deleteBusinessModelHighlight} style={{ marginTop: 6 }}>
                <input type="hidden" name="id" value={h.id} />
                <input type="hidden" name="slug" value={page.slug} />
                <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
              </form>
            </div>
          ))}
        </div>

        <form action={saveBusinessModelHighlight} style={{ marginTop: 16, padding: 14, background: "var(--accent-soft)", borderRadius: 10 }}>
          <h3 style={{ marginTop: 0, fontSize: 16 }}>Yeni özellik ekle</h3>
          <input type="hidden" name="pageId" value={page.id} />
          <input type="hidden" name="slug" value={page.slug} />
          <div className="form-grid">
            <TextField label="Icon" name="icon" defaultValue="Sparkles" required />
            <TextField label="Başlık" name="title" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
          </div>
          <TextAreaField label="Açıklama" name="description" required />
          <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 8 }}>Ekle</button>
        </form>
      </div>

      {/* Use Cases */}
      <div className="admin-card" style={{ marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Kullanım Senaryoları ({page.useCases.length})</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {page.useCases.map((u) => (
            <div key={u.id} style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 10 }}>
              <form action={saveBusinessModelUseCase}>
                <input type="hidden" name="id" value={u.id} />
                <input type="hidden" name="pageId" value={page.id} />
                <input type="hidden" name="slug" value={page.slug} />
                <div className="form-grid">
                  <TextField label="Sektör / Endüstri" name="industry" defaultValue={u.industry} required />
                  <TextField label="Sıra" name="sortOrder" defaultValue={u.sortOrder} />
                </div>
                <TextAreaField label="Senaryo" name="scenario" defaultValue={u.scenario} required />
                <TextAreaField label="Sonuç" name="outcome" defaultValue={u.outcome} required />
                <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 8 }}>Kaydet</button>
              </form>
              <form action={deleteBusinessModelUseCase} style={{ marginTop: 6 }}>
                <input type="hidden" name="id" value={u.id} />
                <input type="hidden" name="slug" value={page.slug} />
                <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
              </form>
            </div>
          ))}
        </div>

        <form action={saveBusinessModelUseCase} style={{ marginTop: 16, padding: 14, background: "var(--accent-soft)", borderRadius: 10 }}>
          <h3 style={{ marginTop: 0, fontSize: 16 }}>Yeni senaryo ekle</h3>
          <input type="hidden" name="pageId" value={page.id} />
          <input type="hidden" name="slug" value={page.slug} />
          <div className="form-grid">
            <TextField label="Sektör" name="industry" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
          </div>
          <TextAreaField label="Senaryo" name="scenario" required />
          <TextAreaField label="Sonuç" name="outcome" required />
          <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 8 }}>Ekle</button>
        </form>
      </div>

      {/* Metrics */}
      <div className="admin-card" style={{ marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Metrikler ({page.metrics.length})</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {page.metrics.map((m) => (
            <div key={m.id} style={{ padding: 12, background: "var(--bg-soft)", borderRadius: 8 }}>
              <form action={saveBusinessModelMetric}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="pageId" value={page.id} />
                <input type="hidden" name="slug" value={page.slug} />
                <div className="form-grid">
                  <TextField label="Değer" name="value" defaultValue={m.value} required />
                  <TextField label="Etiket" name="label" defaultValue={m.label} required />
                  <TextField label="Sıra" name="sortOrder" defaultValue={m.sortOrder} />
                </div>
                <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 6 }}>Kaydet</button>
              </form>
              <form action={deleteBusinessModelMetric} style={{ marginTop: 4 }}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="slug" value={page.slug} />
                <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
              </form>
            </div>
          ))}
        </div>

        <form action={saveBusinessModelMetric} style={{ marginTop: 12, padding: 12, background: "var(--accent-soft)", borderRadius: 8 }}>
          <h3 style={{ marginTop: 0, fontSize: 16 }}>Yeni metrik ekle</h3>
          <input type="hidden" name="pageId" value={page.id} />
          <input type="hidden" name="slug" value={page.slug} />
          <div className="form-grid">
            <TextField label="Değer" name="value" required />
            <TextField label="Etiket" name="label" required />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
          </div>
          <button className="btn btn-primary btn-sm" type="submit" style={{ marginTop: 6 }}>Ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
