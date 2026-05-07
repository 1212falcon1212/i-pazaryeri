import { Search, X, Bot, MessagesSquare } from "lucide-react";
import { Mail, Phone, Building2, User, Briefcase, Users, Boxes, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";
import { updateOffer } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = {
  searchParams: Promise<{
    saved?: string;
    status?: string;
    q?: string;
    unread?: string;
  }>;
};

const STATUS_OPTIONS = [
  "Yeni",
  "İletişimde",
  "Demo planlandı",
  "Teklif gönderildi",
  "Kazanıldı",
  "Kayıp",
  "Spam"
];

const STATUS_TONES: Record<string, string> = {
  "Yeni": "admin-status-new",
  "İletişimde": "admin-status-active",
  "Demo planlandı": "admin-status-active",
  "Teklif gönderildi": "admin-status-active",
  "Kazanıldı": "admin-status-success",
  "Kayıp": "admin-status-muted",
  "Spam": "admin-status-danger"
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(value);
}

function timeAgo(value: Date) {
  const diffMs = Date.now() - value.getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "az önce";
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} gün önce`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} ay önce`;
  return `${Math.floor(month / 12)} yıl önce`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

type TranscriptMsg = { role: "bot" | "user"; text: string; ts: string };
type Transcript = { topics: string[]; messages: TranscriptMsg[] };

function parseTranscript(raw: string | null | undefined): Transcript | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.messages)) return parsed as Transcript;
    return null;
  } catch {
    return null;
  }
}

function formatTime(iso: string) {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default async function AdminOffersPage({ searchParams }: Props) {
  await requireAdmin();
  const query = await searchParams;
  const status = (query.status || "").trim();
  const q = (query.q || "").trim();
  const unreadOnly = query.unread === "1";

  // Build where clause
  // SQLite Prisma `contains` is case-sensitive; we OR multiple LIKEs across columns.
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (unreadOnly) where.isRead = false;
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { company: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { sector: { contains: q } },
      { message: { contains: q } }
    ];
  }

  const [offers, allCount, unreadCount, statusCounts] = await Promise.all([
    prisma.offerRequest.findMany({
      where,
      orderBy: [{ isRead: "asc" }, { createdAt: "desc" }]
    }),
    prisma.offerRequest.count(),
    prisma.offerRequest.count({ where: { isRead: false } }),
    prisma.offerRequest.groupBy({ by: ["status"], _count: { _all: true } })
  ]);

  const countByStatus = Object.fromEntries(
    statusCounts.map((row) => [row.status, row._count._all])
  ) as Record<string, number>;

  const hasActiveFilter = Boolean(status || q || unreadOnly);

  return (
    <AdminShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Yönetim</p>
          <h1>Teklif Talepleri</h1>
          <p className="admin-subtitle">Siteden gelen teklif isteklerini buradan görüntüleyin, durumlarını ve iç notları güncelleyin.</p>
        </div>
        <div className="admin-page-meta-row">
          {unreadCount > 0 ? <div className="admin-page-pill admin-page-pill-accent">{unreadCount} okunmamış</div> : null}
          <div className="admin-page-meta">
            {hasActiveFilter ? `${offers.length} / ${allCount} talep` : `${allCount} talep`}
          </div>
        </div>
      </div>

      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Değişiklikler kaydedildi.</div> : null}

      {/* Filter bar */}
      <form className="admin-filter-bar" method="get" action="/admin/offers">
        <div className="admin-filter-search">
          <Search size={16} />
          <input
            type="search"
            name="q"
            placeholder="Ad, şirket, e-posta, sektör veya mesaj ara…"
            defaultValue={q}
          />
        </div>
        <div className="admin-filter-controls">
          <div className="field admin-filter-field">
            <label htmlFor="filter-status">Durum</label>
            <select id="filter-status" name="status" defaultValue={status}>
              <option value="">Tümü</option>
              {STATUS_OPTIONS.map((opt) => {
                const c = countByStatus[opt] ?? 0;
                return (
                  <option key={opt} value={opt}>
                    {opt}{c ? ` (${c})` : ""}
                  </option>
                );
              })}
            </select>
          </div>
          <label className="admin-filter-toggle">
            <input type="checkbox" name="unread" value="1" defaultChecked={unreadOnly} />
            <span>Sadece okunmamış</span>
          </label>
          <button className="btn btn-primary btn-sm" type="submit">Uygula</button>
          {hasActiveFilter ? (
            <Link className="btn btn-ghost btn-sm admin-filter-clear" href="/admin/offers">
              <X size={14} /> Temizle
            </Link>
          ) : null}
        </div>
      </form>

      {offers.length === 0 ? (
        <div className="admin-card admin-empty-card">
          <p>{hasActiveFilter ? "Bu filtreye uyan talep bulunamadı." : "Henüz teklif talebi yok."}</p>
          <p className="muted">
            {hasActiveFilter
              ? "Filtreyi değiştirip tekrar deneyin veya temizleyin."
              : "Site üzerinden gelen ilk talep burada görünecek."}
          </p>
        </div>
      ) : null}

      <div className="admin-list">
        {offers.map((offer) => {
          const services = splitList(offer.selectedServices);
          const modules = splitList(offer.modules);
          const tone = STATUS_TONES[offer.status] || "admin-status-muted";
          return (
            <div className={`admin-card admin-offer-card ${offer.isRead ? "" : "admin-offer-unread"}`} key={offer.id}>
              <header className="admin-offer-head">
                <div className="admin-offer-identity">
                  <div className="admin-offer-avatar" aria-hidden>{initials(offer.company || offer.fullName)}</div>
                  <div className="admin-offer-identity-text">
                    <h2>{offer.company || offer.fullName}</h2>
                    <p className="admin-offer-sub">
                      {offer.fullName ? <span>{offer.fullName}</span> : null}
                      {offer.sector ? <span>· {offer.sector}</span> : null}
                    </p>
                  </div>
                </div>
                <div className="admin-offer-meta">
                  {!offer.isRead ? <span className="admin-status-pill admin-status-new">Yeni</span> : null}
                  {offer.source === "chatbot" ? (
                    <span className="admin-status-pill admin-status-chat" title="Chatbot üzerinden gelen talep">
                      <Bot size={12} style={{ marginRight: 4 }} /> Sohbet
                    </span>
                  ) : null}
                  <span className={`admin-status-pill ${tone}`}>{offer.status}</span>
                  <span className="admin-offer-time" title={formatDate(offer.createdAt)}>
                    <Calendar size={13} /> {timeAgo(offer.createdAt)}
                  </span>
                </div>
              </header>

              <div className="admin-offer-body">
                <section className="admin-offer-block">
                  <h3 className="admin-block-title">İletişim bilgileri</h3>
                  <dl className="admin-info-grid">
                    <div>
                      <dt><User size={13} /> Ad Soyad</dt>
                      <dd>{offer.fullName || "—"}</dd>
                    </div>
                    <div>
                      <dt><Building2 size={13} /> Şirket</dt>
                      <dd>{offer.company || "—"}</dd>
                    </div>
                    <div>
                      <dt><Mail size={13} /> E-posta</dt>
                      <dd>
                        {offer.email ? (
                          <a href={`mailto:${offer.email}`} className="admin-info-link">{offer.email}</a>
                        ) : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt><Phone size={13} /> Telefon</dt>
                      <dd>
                        {offer.phone ? (
                          <a href={`tel:${offer.phone.replace(/\s/g, "")}`} className="admin-info-link">{offer.phone}</a>
                        ) : "—"}
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="admin-offer-block">
                  <h3 className="admin-block-title">İhtiyaç & Kapsam</h3>
                  <dl className="admin-info-grid">
                    <div>
                      <dt><Briefcase size={13} /> Sektör</dt>
                      <dd>{offer.sector || "—"}</dd>
                    </div>
                    <div>
                      <dt><Users size={13} /> Bayi / Kullanıcı sayısı</dt>
                      <dd>{offer.networkSize || "—"}</dd>
                    </div>
                  </dl>
                  {services.length > 0 ? (
                    <div className="admin-chip-row">
                      <span className="admin-chip-label">İlgilenilen servisler</span>
                      <div className="admin-chips">
                        {services.map((s) => (
                          <span className="admin-chip" key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {modules.length > 0 ? (
                    <div className="admin-chip-row">
                      <span className="admin-chip-label"><Boxes size={13} style={{ marginRight: 4 }} /> Modüller</span>
                      <div className="admin-chips">
                        {modules.map((m) => (
                          <span className="admin-chip admin-chip-soft" key={m}>{m}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>

                <section className="admin-offer-block">
                  <h3 className="admin-block-title"><MessageSquare size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} /> Müşteri mesajı</h3>
                  <blockquote className="admin-message">
                    {offer.message || <span className="muted">Mesaj bırakılmamış.</span>}
                  </blockquote>
                </section>

                {(() => {
                  const transcript = parseTranscript(offer.chatTranscript);
                  if (!transcript) return null;
                  return (
                    <section className="admin-offer-block">
                      <h3 className="admin-block-title"><MessagesSquare size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} /> Sohbet kaydı</h3>
                      {transcript.topics.length > 0 ? (
                        <div className="admin-chip-row" style={{ marginTop: 0, marginBottom: 12 }}>
                          <span className="admin-chip-label">Geçilen konular</span>
                          <div className="admin-chips">
                            {transcript.topics.map((t) => (
                              <span className="admin-chip admin-chip-soft" key={t}>{t}</span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      <details className="admin-transcript">
                        <summary>{transcript.messages.length} mesajlık sohbet — aç/kapat</summary>
                        <div className="admin-transcript-list">
                          {transcript.messages.map((m, i) => (
                            <div key={i} className={`admin-transcript-row admin-transcript-${m.role}`}>
                              <span className="admin-transcript-role">{m.role === "bot" ? "Bot" : "Müşteri"}</span>
                              <p className="admin-transcript-text">{m.text}</p>
                              <span className="admin-transcript-time">{formatTime(m.ts)}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    </section>
                  );
                })()}

                <form className="admin-offer-block admin-offer-actions" action={updateOffer}>
                  <input type="hidden" name="id" value={offer.id} />
                  <h3 className="admin-block-title">Yönetim</h3>
                  <div className="admin-actions-grid">
                    <div className="field">
                      <label htmlFor={`status-${offer.id}`}>Durum</label>
                      <select id={`status-${offer.id}`} name="status" defaultValue={offer.status}>
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field full">
                      <label htmlFor={`note-${offer.id}`}>İç not</label>
                      <textarea
                        id={`note-${offer.id}`}
                        name="internalNote"
                        defaultValue={offer.internalNote ?? ""}
                        placeholder="Sadece ekibinizin göreceği notlar — görüşme özetleri, sonraki adımlar..."
                      />
                    </div>
                  </div>
                  <div className="admin-form-actions">
                    <span className="admin-offer-stamp">
                      Talep: {formatDate(offer.createdAt)}
                      {offer.updatedAt.getTime() !== offer.createdAt.getTime() ? <> · Son güncelleme: {formatDate(offer.updatedAt)}</> : null}
                    </span>
                    <button className="btn btn-primary" type="submit">Kaydet</button>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
