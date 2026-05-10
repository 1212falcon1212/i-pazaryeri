import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveStaticPage } from "../../actions";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminStaticPageDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const { slug } = await params;
  const query = await searchParams;
  const page = await prisma.staticPage.findUnique({ where: { slug } });
  if (!page) notFound();

  return (
    <AdminShell>
      <Link href="/admin/static-pages" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>← Tüm statik sayfalar</Link>
      <h1 style={{ fontSize: 44, marginTop: 8 }}>
        <span style={{ background: "var(--accent)", color: "#fff", padding: "4px 14px", borderRadius: 8, fontSize: 22, marginRight: 14 }}>
          /{page.slug}
        </span>
      </h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        Public URL: <Link href={`/${page.slug}`} target="_blank">/{page.slug}</Link>
      </p>

      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}

      <form className="admin-card admin-form" action={saveStaticPage}>
        <input type="hidden" name="slug" value={page.slug} />

        <h2 style={{ marginTop: 0 }}>Hero</h2>
        <div className="form-grid">
          <TextField label="Eyebrow (rozet üst metin)" name="heroEyebrow" defaultValue={page.heroEyebrow} />
          <CheckboxField label="Yayında" name="isPublished" defaultChecked={page.isPublished} />
        </div>
        <TextAreaField label="Başlık (ana cümle)" name="heroTitle" defaultValue={page.heroTitle} required />
        <TextAreaField label="Vurgulu son cümle (opsiyonel)" name="heroHighlight" defaultValue={page.heroHighlight} />
        <TextAreaField label="Hero açıklaması" name="heroDescription" defaultValue={page.heroDescription} required />
        <div className="form-grid">
          <TextField label="Birincil CTA metni" name="heroCtaLabel" defaultValue={page.heroCtaLabel} />
          <TextField label="Birincil CTA linki" name="heroCtaHref" defaultValue={page.heroCtaHref} />
          <TextField label="İkincil CTA metni" name="heroCtaSecondaryLabel" defaultValue={page.heroCtaSecondaryLabel} />
          <TextField label="İkincil CTA linki" name="heroCtaSecondaryHref" defaultValue={page.heroCtaSecondaryHref} />
        </div>

        <h2 style={{ marginTop: 28 }}>Ana İçerik</h2>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: -8 }}>
          Markdown desteklenir. Paragraflar boş satırla (\n\n) ayrılır. Alt başlık için <code>## Başlık</code> kullanın.
        </p>
        <div className="form-grid">
          <TextField label="Ana içerik başlığı" name="bodyTitle" defaultValue={page.bodyTitle} />
        </div>
        <TextAreaField label="İçerik (markdown)" name="bodyContent" defaultValue={page.bodyContent} />

        <h2 style={{ marginTop: 28 }}>Kanıt / Maddeler (sağ kolon)</h2>
        <div className="form-grid">
          <TextField label="Başlık" name="proofTitle" defaultValue={page.proofTitle} />
          <TextField label="Görsel URL" name="visualImage" defaultValue={page.visualImage} />
        </div>
        <TextAreaField label='Maddeler (JSON array, örn. ["...","..."])' name="proofItems" defaultValue={page.proofItems} />

        <h2 style={{ marginTop: 28 }}>İstatistikler</h2>
        <TextAreaField label='İstatistikler (JSON: [{"value":"%70+","label":"..."}, ...])' name="stats" defaultValue={page.stats} />

        <h2 style={{ marginTop: 28 }}>Final CTA</h2>
        <div className="form-grid">
          <TextField label="Eyebrow" name="ctaEyebrow" defaultValue={page.ctaEyebrow} />
          <TextField label="CTA buton metni" name="ctaLabel" defaultValue={page.ctaLabel} />
          <TextField label="CTA buton linki" name="ctaHref" defaultValue={page.ctaHref} />
        </div>
        <TextAreaField label="CTA başlığı" name="ctaTitle" defaultValue={page.ctaTitle} />
        <TextAreaField label="CTA açıklaması" name="ctaDescription" defaultValue={page.ctaDescription} />

        <h2 style={{ marginTop: 28 }}>SEO</h2>
        <div className="form-grid">
          <TextField label="SEO başlık" name="seoTitle" defaultValue={page.seoTitle} />
        </div>
        <TextAreaField label="SEO açıklama" name="seoDescription" defaultValue={page.seoDescription} />

        <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
      </form>
    </AdminShell>
  );
}
