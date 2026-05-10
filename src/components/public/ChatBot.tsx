"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { MessageCircle, Send, X, Bot, User as UserIcon, ArrowRight, Check } from "lucide-react";
import { submitChatLead, type ChatTranscript, type ChatTranscriptMessage } from "@/app/actions/chat";

// ---------- Public types (props from server) ----------

export type ChatPackage = {
  slug: string;
  name: string;
  tagline: string;
  price: string | null;
  priceLabel: string | null;
  pricePeriod: string | null;
};

type Props = {
  packages: ChatPackage[];
};

// ---------- Internal message types ----------

type QuickReply = {
  label: string;
  next: IntentKey | "open-form" | "external";
  href?: string;
};

type BotBubble = {
  id: string;
  role: "bot";
  ts: string;
  text?: string;
  quickReplies?: QuickReply[];
  cards?: Array<{
    title: string;
    subtitle?: string;
    body?: string;
    href?: string;
    cta?: string;
  }>;
};

type UserBubble = {
  id: string;
  role: "user";
  ts: string;
  text: string;
};

type Bubble = BotBubble | UserBubble;

type IntentKey =
  | "greeting"
  | "what-is-b2b"
  | "advantages"
  | "packages"
  | "demo"
  | "erp"
  | "go-live"
  | "kvkk"
  | "contact-intro";

// ---------- Sectors for the lead form ----------

const SECTOR_OPTIONS = [
  "Bayi ağı olan markalar",
  "Distribütör / Toptancı",
  "Eczacılık & Dermokozmetik",
  "Hırdavat / Yapı Market",
  "Kırtasiye / Ofis ürünleri",
  "Bijuteri / Aksesuar",
  "Gıda / Hal tedariki",
  "Tekstil / Hazır giyim",
  "Endüstriyel / Yedek parça",
  "Diğer"
];

// ---------- Intent → bot reply factory ----------

function buildIntent(key: IntentKey, ctx: Props): BotBubble {
  const id = `bot-${key}-${Date.now()}`;
  const ts = new Date().toISOString();

  switch (key) {
    case "greeting":
      return {
        id,
        role: "bot",
        ts,
        text: "Merhaba! Ben i-Pazaryeri asistanıyım. B2B pazaryeri yazılımı, paketlerimiz veya size özel demo hakkında nasıl yardımcı olabilirim?",
        quickReplies: [
          { label: "B2B pazaryeri nedir?", next: "what-is-b2b" },
          { label: "B2B'nin avantajları", next: "advantages" },
          { label: "Paketleri görmek istiyorum", next: "packages" },
          { label: "Demo görmek istiyorum", next: "demo" },
          { label: "Bir uzmanla görüşmek istiyorum", next: "contact-intro" }
        ]
      };

    case "what-is-b2b":
      return {
        id,
        role: "bot",
        ts,
        text:
          "B2B (Business-to-Business) pazaryeri yazılımı, bayi, tedarikçi ve kurumsal alıcıları tek dijital platformda buluşturan ticaret altyapısıdır.\n\nKlasik e-ticaretten farklı olarak; bayi grupları, özel iskontolar, cari hesap, ERP entegrasyonu ve onay akışları gibi kurumsal ihtiyaçları yönetir.",
        quickReplies: [
          { label: "B2B'nin avantajları nelerdir?", next: "advantages" },
          { label: "Hangi paketleriniz var?", next: "packages" },
          { label: "Detaylı blog yazısı", next: "external", href: "/blog/b2b-pazaryeri-yazilimi-nedir" },
          { label: "Teklif al", next: "contact-intro" }
        ]
      };

    case "advantages":
      return {
        id,
        role: "bot",
        ts,
        text:
          "B2B pazaryerinin getirileri:\n\n• Manuel sipariş alma yükü %70'in üzerinde azalır\n• Sipariş hatası neredeyse sıfırlanır\n• Bayi sipariş sıklığı artar (ortalama AOV yükselir)\n• ERP'ye otomatik veri akışı; muhasebe yükü düşer\n• Saha satış ekibi rapor/sipariş işleme yerine müşteriye odaklanır\n• Kampanya ve fiyat kuralları tek panelden yönetilir",
        quickReplies: [
          { label: "Paketleri görelim", next: "packages" },
          { label: "Demo görmek istiyorum", next: "demo" },
          { label: "ERP entegrasyonu nasıl çalışır?", next: "erp" },
          { label: "Teklif al", next: "contact-intro" }
        ]
      };

    case "packages": {
      const top = ctx.packages.slice(0, 3);
      const cards = top.map((p) => ({
        title: p.name,
        subtitle: p.tagline,
        body: [p.priceLabel, p.price, p.pricePeriod].filter(Boolean).join(" "),
        href: `/paketler#${p.slug}`,
        cta: "Detayları gör"
      }));
      return {
        id,
        role: "bot",
        ts,
        text: top.length
          ? `Şu an ${ctx.packages.length} paketimiz mevcut. İhtiyaca göre özel olarak da uyarlıyoruz.`
          : "Paketler yakında eklenecek — size özel bir teklif hazırlayalım mı?",
        cards: cards.length > 0 ? cards : undefined,
        quickReplies: [
          { label: "Tüm paketler sayfası", next: "external", href: "/paketler" },
          { label: "Bana özel teklif istiyorum", next: "contact-intro" },
          { label: "Demo görmek istiyorum", next: "demo" }
        ]
      };
    }

    case "demo":
      return {
        id,
        role: "bot",
        ts,
        text:
          "Sektörünüze özel canlı demo seansı planlıyoruz. Demo'da:\n\n• Bayi paneli ve sipariş akışı\n• Admin panel & yönetim ekranları\n• ERP / kargo / ödeme entegrasyonları\n• Sektörünüze özel modüller\n\nbirebir gösterilir, sorularınızı anında cevaplarız. Formu doldurun, 1 iş günü içinde uygun saati birlikte belirleyelim.",
        quickReplies: [
          { label: "Demo için formu aç", next: "contact-intro" },
          { label: "Önce paketleri göreyim", next: "packages" },
          { label: "Özelliklere bakacağım", next: "external", href: "/ozellikler" }
        ]
      };

    case "erp":
      return {
        id,
        role: "bot",
        ts,
        text:
          "i-Pazaryeri ERP entegrasyonları:\n\n• Logo Tiger 3, Mikro Fly, Netsis 9.0 (yerel ERP)\n• Paraşüt, BizimHesap, Sentos, Entegra (bulut)\n• Logo, Mikro, Uyumsoft, QNB e-Fatura entegratörleri\n• Aras, Yurtiçi, MNG, Sürat, PTT, Hepsijet, Sendeo, Kolay Gelsin, Navlungo (kargo)\n• Iyzico, PayTR (ödeme)\n\nÖzel ERP'lere de adapter geliştirebiliyoruz.",
        quickReplies: [
          { label: "Detaylı ERP yazısı", next: "external", href: "/blog/erp-entegrasyonlu-b2b-siparis-sistemi" },
          { label: "Paketleri gör", next: "packages" },
          { label: "Teklif al", next: "contact-intro" }
        ]
      };

    case "go-live":
      return {
        id,
        role: "bot",
        ts,
        text:
          "Hibrit yaklaşımla orta ölçekli bir B2B pazaryeri tipik olarak 8-14 hafta arasında canlıya alınır.\n\nFaz 1: Çekirdek modüller (sipariş, cari, ürün, fiyat)\nFaz 2: Kampanya + mobil + entegrasyonlar\nFaz 3: İleri otomasyonlar ve özel raporlama",
        quickReplies: [
          { label: "Detaylı planlama yazısı", next: "external", href: "/blog/b2b-canliya-gecis-suresi" },
          { label: "Bana özel plan istiyorum", next: "contact-intro" }
        ]
      };

    case "kvkk":
      return {
        id,
        role: "bot",
        ts,
        text:
          "KVKK gereklilikleri standart olarak gelir: rol bazlı yetki, denetim logları, veri silme/anonimleştirme, şifreli yedekleme, SSL/WAF/DDoS koruması, iki faktörlü doğrulama desteği.",
        quickReplies: [
          { label: "Detaylı KVKK rehberi", next: "external", href: "/blog/kvkk-uyumlu-b2b-pazaryeri" },
          { label: "Teklif al", next: "contact-intro" }
        ]
      };

    case "contact-intro":
      return {
        id,
        role: "bot",
        ts,
        text:
          "Harika! Birkaç bilgiyi alırsam ekibimiz 1 iş günü içinde size dönüş yapar. Aşağıdaki formu doldurmanız yeterli — sohbetimizdeki bağlam otomatik olarak iletilecek.",
        quickReplies: [{ label: "Formu aç", next: "open-form" }]
      };
  }
}

// ---------- Topic key → Turkish label (used in transcript summary) ----------

const TOPIC_LABEL: Record<IntentKey, string> = {
  greeting: "Karşılama",
  "what-is-b2b": "B2B nedir",
  advantages: "B2B avantajları",
  packages: "Paketler",
  demo: "Demo talebi",
  erp: "ERP entegrasyonu",
  "go-live": "Canlıya geçiş süresi",
  kvkk: "KVKK & güvenlik",
  "contact-intro": "İletişim talebi"
};

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ---------- Component ----------

export function ChatBot({ packages }: Props) {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // pulse the launcher first time
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [topics, setTopics] = useState<IntentKey[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting on first open
  useEffect(() => {
    if (open && bubbles.length === 0) {
      const greeting = buildIntent("greeting", { packages });
      setBubbles([greeting]);
      setTopics(["greeting"]);
    }
    if (open) setHasUnread(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll to bottom on new bubble
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [bubbles, showForm, submitted]);

  function pickIntent(intent: IntentKey, userLabel: string) {
    const userBubble: UserBubble = {
      id: uid(),
      role: "user",
      ts: new Date().toISOString(),
      text: userLabel
    };
    const botBubble = buildIntent(intent, { packages });
    setBubbles((prev) => [...prev, userBubble, botBubble]);
    setTopics((prev) => (prev.includes(intent) ? prev : [...prev, intent]));
  }

  function handleQuickReply(qr: QuickReply, label: string) {
    if (qr.next === "external") {
      if (qr.href) window.location.href = qr.href;
      return;
    }
    if (qr.next === "open-form") {
      const userBubble: UserBubble = {
        id: uid(),
        role: "user",
        ts: new Date().toISOString(),
        text: label
      };
      setBubbles((prev) => [...prev, userBubble]);
      setShowForm(true);
      return;
    }
    pickIntent(qr.next, label);
  }

  function buildTranscript(extraMessages: ChatTranscriptMessage[] = []): ChatTranscript {
    return {
      topics: topics.map((t) => TOPIC_LABEL[t]).filter(Boolean),
      messages: [
        ...bubbles.map<ChatTranscriptMessage>((b) => ({
          role: b.role,
          text: b.role === "user" ? b.text : (b.text ?? ""),
          ts: b.ts
        })),
        ...extraMessages
      ]
    };
  }

  async function handleFormSubmit(form: HTMLFormElement) {
    const fd = new FormData(form);
    const userMessage = (fd.get("message") as string) || "";
    const transcript = buildTranscript(
      userMessage.trim()
        ? [{ role: "user", text: userMessage.trim(), ts: new Date().toISOString() }]
        : []
    );

    startTransition(async () => {
      const result = await submitChatLead({
        fullName: (fd.get("fullName") as string) || "",
        company: (fd.get("company") as string) || "",
        email: (fd.get("email") as string) || "",
        phone: (fd.get("phone") as string) || "",
        sector: (fd.get("sector") as string) || "",
        message: userMessage,
        transcript
      });
      if (result.ok) {
        setErrors([]);
        setSubmitted(true);
        setShowForm(false);
        setBubbles((prev) => [
          ...prev,
          {
            id: uid(),
            role: "bot",
            ts: new Date().toISOString(),
            text: "Teşekkürler! Talebiniz ekibimize ulaştı. 1 iş günü içinde sizinle iletişime geçeceğiz."
          }
        ]);
      } else {
        setErrors(result.errors);
      }
    });
  }

  return (
    <>
      <button
        type="button"
        className={`chat-launcher${hasUnread ? " is-pulsing" : ""}${open ? " is-open" : ""}`}
        aria-label={open ? "Sohbeti kapat" : "Sohbeti aç"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && hasUnread ? <span className="chat-launcher-dot" aria-hidden /> : null}
      </button>

      <div className={`chat-panel${open ? " is-open" : ""}`} aria-hidden={!open} role="dialog" aria-label="i-Pazaryeri asistanı">
        <header className="chat-panel-head">
          <div className="chat-panel-head-info">
            <div className="chat-panel-avatar" aria-hidden><Bot size={18} /></div>
            <div>
              <strong>i-Pazaryeri Asistanı</strong>
              <span>Sorularınızı yanıtlıyorum</span>
            </div>
          </div>
          <button type="button" className="chat-panel-close" aria-label="Kapat" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </header>

        <div className="chat-panel-body" ref={scrollRef}>
          {bubbles.map((b) => (
            <div key={b.id} className={`chat-row chat-row-${b.role}`}>
              <div className="chat-row-icon" aria-hidden>
                {b.role === "bot" ? <Bot size={14} /> : <UserIcon size={14} />}
              </div>
              <div className="chat-row-content">
                {b.role === "bot" ? (
                  <>
                    {b.text ? <div className="chat-bubble chat-bubble-bot">{b.text}</div> : null}
                    {b.cards && b.cards.length > 0 ? (
                      <div className="chat-cards">
                        {b.cards.map((card, idx) => (
                          <Link key={idx} href={card.href ?? "#"} className="chat-card" onClick={() => setOpen(false)}>
                            <strong>{card.title}</strong>
                            {card.subtitle ? <span className="chat-card-sub">{card.subtitle}</span> : null}
                            {card.body ? <p>{card.body}</p> : null}
                            <span className="chat-card-cta">
                              {card.cta ?? "Aç"} <ArrowRight size={12} />
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                    {b.quickReplies && b.quickReplies.length > 0 ? (
                      <div className="chat-quick-replies">
                        {b.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="chat-quick-reply"
                            onClick={() => handleQuickReply(qr, qr.label)}
                          >
                            {qr.label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="chat-bubble chat-bubble-user">{b.text}</div>
                )}
              </div>
            </div>
          ))}

          {showForm && !submitted ? (
            <form
              className="chat-lead-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(e.currentTarget);
              }}
            >
              <h4>İletişim bilgileri</h4>
              <div className="chat-form-grid">
                <label>
                  <span>Ad Soyad *</span>
                  <input name="fullName" required autoComplete="name" />
                </label>
                <label>
                  <span>Şirket *</span>
                  <input name="company" required autoComplete="organization" />
                </label>
                <label>
                  <span>E-posta</span>
                  <input name="email" type="email" autoComplete="email" placeholder="ornek@firma.com" />
                </label>
                <label>
                  <span>Telefon</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="05xx xxx xx xx" />
                </label>
                <label className="chat-form-full">
                  <span>Sektör</span>
                  <select name="sector" defaultValue="">
                    <option value="">Seçiniz</option>
                    {SECTOR_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label className="chat-form-full">
                  <span>Eklemek istediğiniz mesaj (opsiyonel)</span>
                  <textarea name="message" rows={3} placeholder="Özel bir ihtiyaç veya soru..." />
                </label>
              </div>
              <p className="chat-form-hint">* zorunlu alanlar — telefon veya e-postadan en az birini doldurun.</p>
              {errors.length > 0 ? (
                <ul className="chat-form-errors">
                  {errors.map((e) => <li key={e}>{e}</li>)}
                </ul>
              ) : null}
              <div className="chat-form-actions">
                <button type="button" className="chat-form-cancel" onClick={() => setShowForm(false)}>Vazgeç</button>
                <button type="submit" className="chat-form-submit" disabled={pending}>
                  {pending ? "Gönderiliyor..." : <><Send size={14} /> Gönder</>}
                </button>
              </div>
            </form>
          ) : null}

          {submitted ? (
            <div className="chat-success">
              <div className="chat-success-icon" aria-hidden><Check size={20} /></div>
              <div>
                <strong>Talebiniz iletildi</strong>
                <p>1 iş günü içinde sizinle iletişime geçeceğiz.</p>
              </div>
            </div>
          ) : null}
        </div>

        <footer className="chat-panel-foot">
          <span>i-Pazaryeri · 7/24 chatbot</span>
        </footer>
      </div>
    </>
  );
}
