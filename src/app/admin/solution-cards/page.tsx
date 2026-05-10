import Image from "next/image";
import {
  clearSolutionCardImage,
  deleteSolutionCard,
  saveSolutionCard,
  uploadSolutionCardImage
} from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string; error?: string }> };

const ICON_OPTIONS = [
  "Plug", "Cable", "Boxes", "Truck", "WalletCards", "Search",
  "MessagesSquare", "LayoutDashboard", "Users", "ShieldCheck",
  "FileCheck", "Smartphone", "TrendingUp", "Zap", "Sparkles",
  "Code2", "Database", "PanelTop", "Building2"
];

export default async function AdminSolutionCardsPage({ searchParams }: Props) {
  await requireAdmin();
  const [cards, query] = await Promise.all([
    prisma.solutionCard.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    searchParams
  ]);

  return (
    <AdminShell>
      <div className="admin-page-head">
        <div>
          <h1 style={{ fontSize: 44, margin: 0 }}>Çözüm Kartları</h1>
          <p style={{ color: "var(--muted)", marginTop: 6, maxWidth: 760, lineHeight: 1.55 }}>
            Anasayfada &quot;Neler sunuyoruz?&quot; bölümü ve <code>/ozellikler</code> sayfasında listelenen modüller.
            Her kartın görseli, ikonu, marka listesi ve detay sayfası için kanıt metni var.
          </p>
        </div>
        <div className="admin-page-meta">{cards.length} kart</div>
      </div>

      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Kart silindi.</div> : null}
      {query.error ? <div className="notice" style={{ marginBottom: 18, background: "#FEE2E2", color: "#B72525" }}>{query.error}</div> : null}

      <div className="admin-list">
        {cards.map((card, idx) => (
          <details className="admin-card admin-collapsible" key={card.id} open={idx === 0}>
            <summary className="admin-collapsible-summary">
              <div className="admin-collapsible-title">
                {card.visualImage ? (
                  <span className="admin-blog-thumb">
                    <Image src={card.visualImage} alt="" width={60} height={60} sizes="60px" />
                  </span>
                ) : (
                  <span className="admin-collapsible-index">🧩</span>
                )}
                <div>
                  <h2>{card.question}</h2>
                  <p className="admin-collapsible-meta">
                    <span>/{card.slug}</span>
                    <span>· icon: {card.icon ?? "—"}</span>
                    <span>· #{card.sortOrder}</span>
                  </p>
                </div>
              </div>
              <div className="admin-badge-row">
                <span className={`admin-badge ${card.isPublished ? "admin-badge-success" : "admin-badge-muted"}`}>
                  {card.isPublished ? "Yayında" : "Taslak"}
                </span>
              </div>
            </summary>

            <div className="admin-collapsible-body">
              {/* --- Banner upload --- */}
              <section className="admin-section">
                <header className="admin-section-head">
                  <h3>Banner Görseli</h3>
                  <p>Anasayfada kart üstünde, /ozellikler sayfasında ve /ozellikler/{card.slug} detayında görünür. Önerilen oran: <strong>16:9 (1600×900 px)</strong>, format: WebP veya JPG, max 10 MB.</p>
                </header>
                <div className="admin-blog-cover-row">
                  {card.visualImage ? (
                    <span className="admin-blog-cover-preview">
                      <Image src={card.visualImage} alt={card.question} width={240} height={135} sizes="240px" />
                    </span>
                  ) : (
                    <div className="admin-blog-cover-empty">Görsel yok</div>
                  )}
                  <div className="admin-blog-cover-actions">
                    <form action={uploadSolutionCardImage} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <input type="hidden" name="id" value={card.id} />
                      <input
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                        required
                        style={{
                          padding: "8px 10px",
                          border: "1px solid var(--line)",
                          borderRadius: 10,
                          background: "#fff",
                          fontSize: 13
                        }}
                      />
                      <button className="btn btn-primary btn-sm" type="submit">Yükle</button>
                    </form>
                    {card.visualImage ? (
                      <form action={clearSolutionCardImage}>
                        <input type="hidden" name="id" value={card.id} />
                        <button className="btn btn-ghost btn-sm" type="submit">Görseli kaldır</button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* --- Main edit form --- */}
              <form className="admin-form" action={saveSolutionCard}>
                <input type="hidden" name="id" value={card.id} />

                <section className="admin-section">
                  <header className="admin-section-head"><h3>Temel bilgiler</h3></header>
                  <div className="form-grid">
                    <TextField label="Soru / Başlık" name="question" defaultValue={card.question} required />
                    <TextField label="Slug (URL)" name="slug" defaultValue={card.slug} required />
                    <div className="field">
                      <label htmlFor={`icon-${card.id}`}>İkon</label>
                      <select id={`icon-${card.id}`} name="icon" defaultValue={card.icon ?? "Plug"}>
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <TextField label="Vurgu rengi (hex)" name="visualAccent" defaultValue={card.visualAccent} />
                    <TextField label="Sıra" name="sortOrder" defaultValue={card.sortOrder} />
                    <div className="field admin-checkbox-row">
                      <CheckboxField label="Yayında" name="isPublished" defaultChecked={card.isPublished} />
                    </div>
                  </div>
                  {/* Hidden: visualImage URL hâlâ gönderilmeli ki form save'i mevcut değeri korusun */}
                  <input type="hidden" name="visualImage" value={card.visualImage ?? ""} />
                </section>

                <section className="admin-section">
                  <header className="admin-section-head">
                    <h3>İçerik</h3>
                    <p>Cevap, kart üzerinde özet metni; kanıt ise detay sayfasında genişletilmiş açıklama.</p>
                  </header>
                  <TextAreaField label="Cevap (kart özeti)" name="answer" defaultValue={card.answer} required />
                  <TextAreaField label="Kanıt / teknik detay (detay sayfası)" name="proof" defaultValue={card.proof} />
                </section>

                <section className="admin-section">
                  <header className="admin-section-head">
                    <h3>Markalar / Sistemler</h3>
                    <p>Her satıra bir marka adı yazın (örn. <code>Logo Tiger 3</code>). Kart altında chip olarak listelenir.</p>
                  </header>
                  <TextAreaField label="Markalar (satır satır)" name="brands" defaultValue={card.brands} />
                </section>

                <div className="admin-form-actions">
                  <button className="btn btn-primary" type="submit">Kartı kaydet</button>
                </div>
              </form>

              <form action={deleteSolutionCard} className="admin-danger-row">
                <input type="hidden" name="id" value={card.id} />
                <button className="btn btn-ghost btn-sm" type="submit">Bu kartı sil</button>
              </form>
            </div>
          </details>
        ))}

        {/* --- Add new card --- */}
        <details className="admin-card admin-collapsible admin-collapsible-add">
          <summary className="admin-collapsible-summary">
            <div className="admin-collapsible-title">
              <span className="admin-collapsible-index admin-collapsible-index-add">+</span>
              <div>
                <h2>Yeni çözüm kartı</h2>
                <p className="admin-collapsible-meta">
                  <span>Sıfırdan kart oluştur, görseli sonra yükle</span>
                </p>
              </div>
            </div>
          </summary>

          <div className="admin-collapsible-body">
            <form className="admin-form" action={saveSolutionCard}>
              <section className="admin-section">
                <header className="admin-section-head"><h3>Temel bilgiler</h3></header>
                <div className="form-grid">
                  <TextField label="Soru / Başlık" name="question" required />
                  <TextField label="Slug" name="slug" required />
                  <div className="field">
                    <label htmlFor="new-icon">İkon</label>
                    <select id="new-icon" name="icon" defaultValue="Plug">
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <TextField label="Vurgu rengi (hex)" name="visualAccent" defaultValue="#2563EB" />
                  <TextField label="Sıra" name="sortOrder" defaultValue={99} />
                  <div className="field admin-checkbox-row">
                    <CheckboxField label="Yayında" name="isPublished" defaultChecked />
                  </div>
                </div>
              </section>

              <section className="admin-section">
                <header className="admin-section-head"><h3>İçerik</h3></header>
                <TextAreaField label="Cevap" name="answer" required />
                <TextAreaField label="Kanıt / teknik detay" name="proof" />
              </section>

              <section className="admin-section">
                <header className="admin-section-head"><h3>Markalar / Sistemler</h3></header>
                <TextAreaField label="Markalar (satır satır)" name="brands" />
              </section>

              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
                💡 Kart oluşturulduktan sonra üst alandan görsel yükleyebilirsin.
              </p>

              <div className="admin-form-actions">
                <button className="btn btn-primary" type="submit">Yeni kart ekle</button>
              </div>
            </form>
          </div>
        </details>
      </div>
    </AdminShell>
  );
}
