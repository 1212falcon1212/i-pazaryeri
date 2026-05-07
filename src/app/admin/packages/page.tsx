import { deletePackage, deletePackageFeature, savePackage, savePackageFeature } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminPackagesPage({ searchParams }: Props) {
  await requireAdmin();
  const [packages, query] = await Promise.all([
    prisma.package.findMany({
      orderBy: { sortOrder: "asc" },
      include: { features: { orderBy: [{ group: "asc" }, { sortOrder: "asc" }] } }
    }),
    searchParams
  ]);

  return (
    <AdminShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Yönetim</p>
          <h1>Paketler</h1>
          <p className="admin-subtitle">Sitede gösterilen paketleri, fiyatları ve kapsam satırlarını buradan düzenleyin.</p>
        </div>
        <div className="admin-page-meta">{packages.length} paket</div>
      </div>

      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Kayıt silindi.</div> : null}

      <div className="admin-list">
        {packages.map((pkg, idx) => (
          <details className="admin-card admin-collapsible" key={pkg.id} open={idx === 0}>
            <summary className="admin-collapsible-summary">
              <div className="admin-collapsible-title">
                <span className="admin-collapsible-index">#{pkg.sortOrder}</span>
                <div>
                  <h2>{pkg.name}</h2>
                  <p className="admin-collapsible-meta">
                    <span>/{pkg.slug}</span>
                    {pkg.price ? <span>· {pkg.price}</span> : null}
                    <span>· {pkg.features.length} satır</span>
                  </p>
                </div>
              </div>
              <div className="admin-badge-row">
                {pkg.isFeatured ? <span className="admin-badge admin-badge-accent">Öne çıkan</span> : null}
                <span className={`admin-badge ${pkg.isPublished ? "admin-badge-success" : "admin-badge-muted"}`}>
                  {pkg.isPublished ? "Yayında" : "Taslak"}
                </span>
              </div>
            </summary>

            <div className="admin-collapsible-body">
              <form className="admin-form" action={savePackage}>
                <input type="hidden" name="id" value={pkg.id} />

                <section className="admin-section">
                  <header className="admin-section-head">
                    <h3>Temel bilgiler</h3>
                    <p>Paketin başlığı, slug'ı ve kısa vaadi.</p>
                  </header>
                  <div className="form-grid">
                    <TextField label="Ad" name="name" defaultValue={pkg.name} required />
                    <TextField label="Slug" name="slug" defaultValue={pkg.slug} required />
                    <TextField label="Kısa vaat" name="tagline" defaultValue={pkg.tagline} required />
                    <TextField label="Hedef kitle" name="audience" defaultValue={pkg.audience} />
                    <TextAreaField label="Açıklama" name="description" defaultValue={pkg.description} required />
                  </div>
                </section>

                <section className="admin-section">
                  <header className="admin-section-head">
                    <h3>Fiyatlandırma</h3>
                    <p>Fiyat etiketi, tutar ve periyot bilgileri.</p>
                  </header>
                  <div className="form-grid">
                    <TextField label="Fiyat etiketi" name="priceLabel" defaultValue={pkg.priceLabel} />
                    <TextField label="Fiyat" name="price" defaultValue={pkg.price} />
                    <TextField label="Fiyat periyodu" name="pricePeriod" defaultValue={pkg.pricePeriod} />
                    <TextField label="Fiyat notu" name="priceNote" defaultValue={pkg.priceNote} />
                  </div>
                </section>

                <section className="admin-section">
                  <header className="admin-section-head">
                    <h3>CTA & Yayın</h3>
                    <p>Çağrı butonu, sıralama ve görünürlük.</p>
                  </header>
                  <div className="form-grid">
                    <TextField label="CTA etiketi" name="ctaLabel" defaultValue={pkg.ctaLabel} />
                    <TextField label="CTA linki" name="ctaHref" defaultValue={pkg.ctaHref} />
                    <TextField label="Sıra" name="sortOrder" defaultValue={pkg.sortOrder} />
                    <div className="field full admin-checkbox-row">
                      <CheckboxField label="Öne çıkar" name="isFeatured" defaultChecked={pkg.isFeatured} />
                      <CheckboxField label="Yayında" name="isPublished" defaultChecked={pkg.isPublished} />
                    </div>
                  </div>
                </section>

                <div className="admin-form-actions">
                  <button className="btn btn-primary" type="submit">Paketi kaydet</button>
                </div>
              </form>

              <form action={deletePackage} className="admin-danger-row">
                <input type="hidden" name="id" value={pkg.id} />
                <button className="btn btn-ghost btn-sm" type="submit">Paketi sil</button>
              </form>

              <section className="admin-section admin-section-features">
                <header className="admin-section-head">
                  <h3>Kapsam satırları</h3>
                  <p>Pakete dahil olan modülleri ve değerleri yönetin.</p>
                </header>

                {pkg.features.length === 0 ? (
                  <p className="admin-empty">Henüz kapsam satırı eklenmemiş.</p>
                ) : (
                  <div className="admin-feature-list">
                    {pkg.features.map((feature) => (
                      <div className="admin-feature-row" key={feature.id}>
                        <form className="admin-feature-form" action={savePackageFeature}>
                          <input type="hidden" name="id" value={feature.id} />
                          <input type="hidden" name="packageId" value={pkg.id} />
                          <div className="admin-feature-grid">
                            <TextField label="Grup" name="group" defaultValue={feature.group} />
                            <TextField label="Etiket" name="label" defaultValue={feature.label} required />
                            <TextField label="Değer" name="value" defaultValue={feature.value} required />
                            <TextField label="Sıra" name="sortOrder" defaultValue={feature.sortOrder} />
                          </div>
                          <div className="admin-feature-actions">
                            <button className="btn btn-primary btn-sm" type="submit">Kaydet</button>
                          </div>
                        </form>
                        <form action={deletePackageFeature} className="admin-feature-delete">
                          <input type="hidden" name="id" value={feature.id} />
                          <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}

                <details className="admin-subcard">
                  <summary>+ Yeni kapsam satırı ekle</summary>
                  <form className="admin-form" action={savePackageFeature}>
                    <input type="hidden" name="packageId" value={pkg.id} />
                    <div className="admin-feature-grid">
                      <TextField label="Grup" name="group" defaultValue="Kapsam" />
                      <TextField label="Etiket" name="label" required />
                      <TextField label="Değer" name="value" required />
                      <TextField label="Sıra" name="sortOrder" defaultValue={99} />
                    </div>
                    <div className="admin-form-actions">
                      <button className="btn btn-primary btn-sm" type="submit">Satır ekle</button>
                    </div>
                  </form>
                </details>
              </section>
            </div>
          </details>
        ))}

        <details className="admin-card admin-collapsible admin-collapsible-add">
          <summary className="admin-collapsible-summary">
            <div className="admin-collapsible-title">
              <span className="admin-collapsible-index admin-collapsible-index-add">+</span>
              <div>
                <h2>Yeni paket ekle</h2>
                <p className="admin-collapsible-meta">Yeni bir paket kartı oluşturun.</p>
              </div>
            </div>
          </summary>
          <div className="admin-collapsible-body">
            <form className="admin-form" action={savePackage}>
              <section className="admin-section">
                <header className="admin-section-head">
                  <h3>Temel bilgiler</h3>
                </header>
                <div className="form-grid">
                  <TextField label="Ad" name="name" required />
                  <TextField label="Slug" name="slug" required />
                  <TextField label="Kısa vaat" name="tagline" required />
                  <TextField label="Hedef kitle" name="audience" />
                  <TextAreaField label="Açıklama" name="description" required />
                </div>
              </section>

              <section className="admin-section">
                <header className="admin-section-head">
                  <h3>Fiyatlandırma</h3>
                </header>
                <div className="form-grid">
                  <TextField label="Fiyat etiketi" name="priceLabel" defaultValue="Başlangıç fiyatı" />
                  <TextField label="Fiyat" name="price" />
                  <TextField label="Fiyat periyodu" name="pricePeriod" defaultValue="proje bazlı" />
                  <TextField label="Fiyat notu" name="priceNote" />
                </div>
              </section>

              <section className="admin-section">
                <header className="admin-section-head">
                  <h3>CTA & Yayın</h3>
                </header>
                <div className="form-grid">
                  <TextField label="CTA etiketi" name="ctaLabel" defaultValue="Teklif al" />
                  <TextField label="CTA linki" name="ctaHref" defaultValue="/teklif-al" />
                  <TextField label="Sıra" name="sortOrder" defaultValue={99} />
                  <div className="field full admin-checkbox-row">
                    <CheckboxField label="Öne çıkar" name="isFeatured" />
                    <CheckboxField label="Yayında" name="isPublished" defaultChecked />
                  </div>
                </div>
              </section>

              <div className="admin-form-actions">
                <button className="btn btn-primary" type="submit">Yeni paket ekle</button>
              </div>
            </form>
          </div>
        </details>
      </div>
    </AdminShell>
  );
}
