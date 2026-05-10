"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Cog,
  Layers,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Users
} from "lucide-react";

type Audience = "b2b" | "b2c" | "c2c" | "mixed";
type Volume = "0-100" | "100-1000" | "1000-10000" | "10000+";
type Timeline = "fast" | "standard" | "phased";
type Existing = "erp" | "marketplace" | "mobile" | "efatura" | "none";
type Integration = "erp" | "kargo" | "odeme" | "multichannel" | "mobil";

type Answers = {
  audience?: Audience;
  volume?: Volume;
  existing: Existing[];
  integrations: Integration[];
  timeline?: Timeline;
};

const audienceOptions: { value: Audience; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: "b2b",
    label: "Bayi / tedarikçi / kurumsal alıcı",
    description: "Davetli kullanıcılar, gruba özel fiyat, vade, ERP entegrasyonu kritik.",
    icon: <Building2 size={20} />
  },
  {
    value: "b2c",
    label: "Doğrudan tüketiciye satış",
    description: "Açık kayıt, kampanya, taksit, kargo, mobil deneyim önde.",
    icon: <ShoppingBag size={20} />
  },
  {
    value: "c2c",
    label: "Çoklu satıcı / pazaryeri",
    description: "Kendi ürününüz dışında başka satıcılar da satıyor — komisyon, hakediş, KYC.",
    icon: <Store size={20} />
  },
  {
    value: "mixed",
    label: "Karışık / emin değilim",
    description: "Birden fazla model olabilir veya henüz netleşmedi.",
    icon: <Layers size={20} />
  }
];

const volumeOptions: { value: Volume; label: string; description: string }[] = [
  { value: "0-100", label: "0 – 100", description: "Yeni başlıyoruz / pilot" },
  { value: "100-1000", label: "100 – 1.000", description: "Büyüyen operasyon" },
  { value: "1000-10000", label: "1.000 – 10.000", description: "Yerleşik markaya dönüşüm" },
  { value: "10000+", label: "10.000+", description: "Yüksek hacim, çok kanal" }
];

const existingOptions: { value: Existing; label: string }[] = [
  { value: "erp", label: "ERP / muhasebe (Logo, Mikro, Netsis, Paraşüt…)" },
  { value: "marketplace", label: "Pazaryerlerinde satıyorum (Trendyol, HB, n11)" },
  { value: "efatura", label: "e-Fatura / e-Arşiv altyapım var" },
  { value: "mobile", label: "Mevcut bir mobil uygulamam var" },
  { value: "none", label: "Hiçbiri / sıfırdan başlıyoruz" }
];

const integrationOptions: { value: Integration; label: string; icon: React.ReactNode }[] = [
  { value: "erp", label: "ERP & muhasebe", icon: <Cog size={16} /> },
  { value: "kargo", label: "Kargo (Aras, Yurtiçi, MNG…)", icon: <Truck size={16} /> },
  { value: "odeme", label: "Ödeme (Iyzico, PayTR, taksit)", icon: <TrendingUp size={16} /> },
  { value: "multichannel", label: "Multichannel (Trendyol, HB, n11)", icon: <Layers size={16} /> },
  { value: "mobil", label: "iOS / Android mobil uygulama", icon: <Users size={16} /> }
];

const timelineOptions: { value: Timeline; label: string; description: string }[] = [
  { value: "fast", label: "1 – 2 ay", description: "Hızlı başlangıç, dar kapsam" },
  { value: "standard", label: "3 – 6 ay", description: "Standart kapsam, çoğu marka için ideal" },
  { value: "phased", label: "6 ay+", description: "Kapsamlı kurulum, fazlandırılmış ilerleme" }
];

type Recommendation = {
  model: { code: "B2B" | "B2C" | "C2C"; title: string; href: string };
  packageHint: { name: string; description: string };
  features: string[];
  timeline: string;
  modelDescription: string;
};

function recommend(a: Answers): Recommendation {
  const audience = a.audience ?? "mixed";

  // Model
  const model =
    audience === "b2b"
      ? { code: "B2B" as const, title: "Bayi & Toptan Sipariş Portalı", href: "/b2b" }
      : audience === "c2c"
      ? { code: "C2C" as const, title: "Çok Satıcılı Pazaryeri", href: "/c2c" }
      : { code: "B2C" as const, title: "Doğrudan Tüketiciye Satış", href: "/b2c" };

  const modelDescription =
    audience === "b2b"
      ? "Bayi/tedarikçi ağınız, gruba özel fiyat listeleri, vade ve ERP'ye derin entegrasyon önde — kapalı kullanıcı sistemi ile başlamak doğru."
      : audience === "c2c"
      ? "Birden fazla satıcı, satıcı paneli, komisyon, hakediş, escrow ve KYC akışları kritik — çok satıcılı pazaryeri mimarisi sizin için."
      : audience === "b2c"
      ? "Markanızdan doğrudan tüketiciye satış için kampanya, taksit, mobil deneyim ve multichannel ağırlıklı — B2C altyapısı uygun."
      : "Karışık yapı için B2C ile başlayıp ileride B2B veya C2C eklenebilen bir çekirdek mantıklı; kapsamı birlikte netleştirelim.";

  // Package
  const volume = a.volume ?? "100-1000";
  const packageHint =
    volume === "10000+" || (a.integrations.length >= 4 && volume === "1000-10000")
      ? { name: "Kurumsal", description: "Yüksek hacim, multi-region, özel iş kuralları" }
      : volume === "0-100" && a.integrations.length <= 1
      ? { name: "Başlangıç", description: "Dar kapsam, hızlı canlıya geçiş" }
      : { name: "Profesyonel", description: "Tam modül seti, yaygın entegrasyonlar" };

  // Features
  const features: string[] = [];
  if (audience === "b2b") {
    features.push("Davetli bayi sistemi + gruba özel fiyat listeleri");
    features.push("Cari hesap, vade, sipariş onay akışları");
  } else if (audience === "c2c") {
    features.push("Satıcı kayıt + KYC + evrak onayı");
    features.push("Komisyon, hakediş, escrow ödeme");
  } else {
    features.push("Açık kayıt + kampanya/kupon yönetimi");
    features.push("Mobil-öncelikli ürün katalog ve checkout");
  }
  if (a.integrations.includes("erp")) features.push("ERP/muhasebe çift yönlü entegrasyon");
  if (a.integrations.includes("kargo")) features.push("Aras/Yurtiçi/MNG/Hepsijet kargo entegrasyonu");
  if (a.integrations.includes("odeme")) features.push("Iyzico/PayTR ödeme + taksit + iade akışı");
  if (a.integrations.includes("multichannel")) features.push("Trendyol/HB/n11/Google Shopping multichannel senkron");
  if (a.integrations.includes("mobil")) features.push("iOS & Android mobil uygulama");
  if (features.length < 4) features.push("Admin panel, raporlama ve operasyon kontrolü");

  // Timeline
  const timeline =
    a.timeline === "fast"
      ? "Tahmini 4–8 hafta — dar kapsamda hızlı canlıya geçiş"
      : a.timeline === "phased"
      ? "Tahmini 12–20 hafta — fazlandırılmış kapsamlı kurulum"
      : "Tahmini 8–14 hafta — standart kapsamda canlıya geçiş";

  return { model, packageHint, features: features.slice(0, 6), timeline, modelDescription };
}

function summarize(a: Answers, rec: Recommendation): { modules: string; message: string } {
  const intLabels = a.integrations
    .map((i) => integrationOptions.find((o) => o.value === i)?.label.split(" (")[0])
    .filter(Boolean)
    .join(", ");
  const exLabels = a.existing
    .map((i) => existingOptions.find((o) => o.value === i)?.label.split(" /")[0].split(" (")[0])
    .filter(Boolean)
    .join(", ");

  const modules = [
    rec.model.code,
    intLabels && `Entegrasyon: ${intLabels}`
  ]
    .filter(Boolean)
    .join(" • ");

  const lines = [
    `[Wizard üzerinden gönderildi]`,
    `Önerilen model: ${rec.model.code} — ${rec.model.title}`,
    `Önerilen paket: ${rec.packageHint.name}`,
    a.volume && `Aylık sipariş hacmi: ${a.volume}`,
    intLabels && `Kritik entegrasyonlar: ${intLabels}`,
    exLabels && `Mevcut sistemler: ${exLabels}`,
    a.timeline && `Süre tercihi: ${timelineOptions.find((t) => t.value === a.timeline)?.label}`,
    "",
    "Lütfen kapsamı detaylandırarak size geri dönüş yapalım."
  ].filter(Boolean);

  return { modules, message: lines.join("\n") };
}

export function HomeWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ existing: [], integrations: [] });
  const totalSteps = 5;

  const recommendation = useMemo(() => recommend(answers), [answers]);

  const setAudience = (v: Audience) => setAnswers((a) => ({ ...a, audience: v }));
  const setVolume = (v: Volume) => setAnswers((a) => ({ ...a, volume: v }));
  const setTimeline = (v: Timeline) => setAnswers((a) => ({ ...a, timeline: v }));
  const toggleExisting = (v: Existing) =>
    setAnswers((a) => ({
      ...a,
      existing:
        v === "none"
          ? a.existing.includes("none") ? [] : ["none"]
          : a.existing.filter((x) => x !== "none").includes(v)
          ? a.existing.filter((x) => x !== v && x !== "none")
          : [...a.existing.filter((x) => x !== "none"), v]
    }));
  const toggleIntegration = (v: Integration) =>
    setAnswers((a) => ({
      ...a,
      integrations: a.integrations.includes(v)
        ? a.integrations.filter((x) => x !== v)
        : [...a.integrations, v]
    }));

  const canAdvance =
    (step === 0 && !!answers.audience) ||
    (step === 1 && !!answers.volume) ||
    step === 2 ||
    step === 3 ||
    (step === 4 && !!answers.timeline);

  const reset = () => {
    setStep(0);
    setAnswers({ existing: [], integrations: [] });
  };

  const offerHref = useMemo(() => {
    const { modules, message } = summarize(answers, recommendation);
    const params = new URLSearchParams({
      model: recommendation.model.code.toLowerCase(),
      pkg: recommendation.packageHint.name,
      modules,
      message
    });
    if (answers.volume) params.set("networkSize", answers.volume);
    return `/teklif-al?${params.toString()}#form`;
  }, [answers, recommendation]);

  const answeredCount = [
    answers.audience,
    answers.volume,
    answers.existing.length > 0 ? "x" : undefined,
    answers.integrations.length > 0 ? "x" : undefined,
    answers.timeline
  ].filter(Boolean).length;

  const isResult = step >= totalSteps;

  return (
    <section className="wizard-section" id="ne-icin-dogru">
      {/* Decorative background elements */}
      <div className="wizard-bg-deco" aria-hidden="true">
        <div className="wizard-bg-grid" />
        <div className="wizard-bg-glow wizard-bg-glow-1" />
        <div className="wizard-bg-glow wizard-bg-glow-2" />
        <div className="wizard-bg-chip wizard-bg-chip-1">
          <span className="wizard-bg-chip-dot" />
          <span><strong>+24 yeni sipariş</strong><em>son 1 saatte</em></span>
        </div>
        <div className="wizard-bg-chip wizard-bg-chip-2">
          <Cog size={14} />
          <span><strong>ERP senkron tamam</strong><em>Logo Tiger 3</em></span>
        </div>
        <div className="wizard-bg-chip wizard-bg-chip-3">
          <Truck size={14} />
          <span><strong>3 kargo etiketi</strong><em>basıldı</em></span>
        </div>
      </div>

      <div className="container">
        <div className="section-head centered">
          <span className="kicker">Ne için doğru?</span>
          <h2>30 saniyede sizin için doğru başlangıç kapsamı.</h2>
          <p>Birkaç soruya cevap verin, modelinize ve hacminize uygun paket önerisini birlikte çıkaralım.</p>
        </div>

        <div className={`wizard-shell ${isResult ? "wizard-shell-result" : ""}`}>
        <div className="wizard-card">
          <div className="wizard-progress" aria-hidden="true">
            <div className="wizard-progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
          <div className="wizard-meta">
            <span>Adım {Math.min(step + 1, totalSteps)} / {totalSteps}</span>
            {step > 0 && step < totalSteps ? (
              <button type="button" className="wizard-meta-back" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft size={14} /> Geri
              </button>
            ) : null}
          </div>

          {step === 0 ? (
            <div className="wizard-step">
              <h3>Kime satıyorsunuz?</h3>
              <p className="wizard-step-hint">En çok hangi alıcıyla çalışacaksınız?</p>
              <div className="wizard-options wizard-options-grid">
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`wizard-option ${answers.audience === opt.value ? "is-selected" : ""}`}
                    onClick={() => setAudience(opt.value)}
                  >
                    <span className="wizard-option-icon">{opt.icon}</span>
                    <span className="wizard-option-body">
                      <span className="wizard-option-label">{opt.label}</span>
                      <span className="wizard-option-desc">{opt.description}</span>
                    </span>
                    {answers.audience === opt.value ? <CheckCircle2 size={18} className="wizard-option-check" /> : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="wizard-step">
              <h3>Aylık tahmini sipariş hacminiz?</h3>
              <p className="wizard-step-hint">Pilot mu, yerleşik operasyon mu?</p>
              <div className="wizard-options wizard-options-row">
                {volumeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`wizard-option wizard-option-compact ${answers.volume === opt.value ? "is-selected" : ""}`}
                    onClick={() => setVolume(opt.value)}
                  >
                    <span className="wizard-option-volume">{opt.label}</span>
                    <span className="wizard-option-desc">{opt.description}</span>
                    {answers.volume === opt.value ? <CheckCircle2 size={16} className="wizard-option-check" /> : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="wizard-step">
              <h3>Mevcut sistemleriniz hangileri?</h3>
              <p className="wizard-step-hint">Birden fazla seçebilirsiniz — emin değilseniz boş bırakın.</p>
              <div className="wizard-options wizard-options-list">
                {existingOptions.map((opt) => {
                  const selected = answers.existing.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`wizard-option wizard-option-checkable ${selected ? "is-selected" : ""}`}
                      onClick={() => toggleExisting(opt.value)}
                    >
                      <span className={`wizard-checkbox ${selected ? "is-checked" : ""}`} aria-hidden="true">
                        {selected ? <CheckCircle2 size={14} /> : null}
                      </span>
                      <span className="wizard-option-label">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="wizard-step">
              <h3>Hangi entegrasyonlar kritik?</h3>
              <p className="wizard-step-hint">İlk fazda mutlaka olmasını istediğiniz entegrasyonları seçin.</p>
              <div className="wizard-options wizard-options-grid">
                {integrationOptions.map((opt) => {
                  const selected = answers.integrations.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`wizard-option wizard-option-pillish ${selected ? "is-selected" : ""}`}
                      onClick={() => toggleIntegration(opt.value)}
                    >
                      <span className="wizard-option-icon">{opt.icon}</span>
                      <span className="wizard-option-label">{opt.label}</span>
                      {selected ? <CheckCircle2 size={16} className="wizard-option-check" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="wizard-step">
              <h3>Ne kadar süreniz var?</h3>
              <p className="wizard-step-hint">Hızlı bir başlangıç mı, kapsamlı bir kurulum mu?</p>
              <div className="wizard-options wizard-options-row">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`wizard-option wizard-option-compact ${answers.timeline === opt.value ? "is-selected" : ""}`}
                    onClick={() => setTimeline(opt.value)}
                  >
                    <span className="wizard-option-volume">
                      <Clock size={14} /> {opt.label}
                    </span>
                    <span className="wizard-option-desc">{opt.description}</span>
                    {answers.timeline === opt.value ? <CheckCircle2 size={16} className="wizard-option-check" /> : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="wizard-result">
              <div className="wizard-result-head">
                <span className="wizard-result-eyebrow">
                  <Sparkles size={14} /> Önerilen başlangıç
                </span>
                <h3>{recommendation.model.title}</h3>
                <p>{recommendation.modelDescription}</p>
              </div>

              <div className="wizard-result-grid">
                <div className="wizard-result-card wizard-result-model">
                  <span className="wizard-result-card-label">Ticaret modeli</span>
                  <strong>{recommendation.model.code}</strong>
                  <Link href={recommendation.model.href} className="wizard-result-card-link">
                    Detaylı incele <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="wizard-result-card">
                  <span className="wizard-result-card-label">Önerilen paket</span>
                  <strong>{recommendation.packageHint.name}</strong>
                  <span className="wizard-result-card-desc">{recommendation.packageHint.description}</span>
                </div>
                <div className="wizard-result-card">
                  <span className="wizard-result-card-label">Süre</span>
                  <strong className="wizard-result-card-timeline">{recommendation.timeline}</strong>
                </div>
              </div>

              <div className="wizard-result-features">
                <span className="wizard-result-features-title">Bu kapsamda öne çıkanlar</span>
                <ul>
                  {recommendation.features.map((f) => (
                    <li key={f}>
                      <CheckCircle2 size={15} /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wizard-result-actions">
                <Link href={offerHref} className="btn btn-primary btn-lg">
                  Bu kapsamı detaylandır <ArrowRight size={16} />
                </Link>
                <button type="button" className="btn btn-ghost btn-lg" onClick={reset}>
                  <RotateCcw size={14} /> Baştan başla
                </button>
              </div>
              <p className="wizard-result-note">
                Cevaplarınız Teklif Al formuna otomatik aktarılacak — yalnızca iletişim bilginizi eklemeniz yeterli.
              </p>
            </div>
          ) : null}

          {step < totalSteps ? (
            <div className="wizard-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg wizard-next"
                disabled={!canAdvance}
                onClick={() => setStep((s) => s + 1)}
              >
                {step === totalSteps - 1 ? "Önerimi gör" : "Devam et"} <ArrowRight size={16} />
              </button>
              {step >= 2 && step <= 3 ? (
                <button type="button" className="wizard-skip" onClick={() => setStep((s) => s + 1)}>
                  Bu adımı atla
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        {!isResult ? (
          <aside className="wizard-preview" aria-label="Canlı öneri">
            <div className="wizard-preview-head">
              <span className="wizard-preview-eyebrow">
                <Sparkles size={12} /> Önerimiz şekilleniyor
              </span>
              <div className="wizard-preview-progress" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={`wizard-preview-dot ${i < step ? "is-done" : i === step ? "is-active" : ""}`} />
                ))}
              </div>
              <p className="wizard-preview-progress-label">
                {answeredCount} / 5 cevap verildi
              </p>
            </div>

            <div className="wizard-preview-body">
              <div className={`wizard-preview-row ${answers.audience ? "is-filled" : ""}`}>
                <span className="wizard-preview-row-label">Ticaret modeli</span>
                {answers.audience ? (
                  <div className="wizard-preview-model">
                    <span className={`wizard-preview-model-badge wizard-preview-model-badge-${recommendation.model.code.toLowerCase()}`}>
                      {recommendation.model.code}
                    </span>
                    <strong>{recommendation.model.title}</strong>
                  </div>
                ) : (
                  <span className="wizard-preview-row-empty">Henüz seçilmedi</span>
                )}
              </div>

              <div className={`wizard-preview-row ${answers.volume ? "is-filled" : ""}`}>
                <span className="wizard-preview-row-label">Önerilen paket</span>
                {answers.volume ? (
                  <div className="wizard-preview-pkg">
                    <strong>{recommendation.packageHint.name}</strong>
                    <span>{recommendation.packageHint.description}</span>
                  </div>
                ) : (
                  <span className="wizard-preview-row-empty">Hacim bilgisi bekleniyor</span>
                )}
              </div>

              <div className={`wizard-preview-row ${answers.timeline ? "is-filled" : ""}`}>
                <span className="wizard-preview-row-label">Tahmini süre</span>
                {answers.timeline ? (
                  <div className="wizard-preview-timeline">
                    <Clock size={14} />
                    <span>{recommendation.timeline}</span>
                  </div>
                ) : (
                  <span className="wizard-preview-row-empty">Süre tercihi bekleniyor</span>
                )}
              </div>

              <div className={`wizard-preview-row ${answers.audience || answers.integrations.length ? "is-filled" : ""}`}>
                <span className="wizard-preview-row-label">Öne çıkan modüller</span>
                {answers.audience || answers.integrations.length ? (
                  <ul className="wizard-preview-features">
                    {recommendation.features.slice(0, 5).map((f, i) => (
                      <li key={f} style={{ animationDelay: `${i * 60}ms` }}>
                        <CheckCircle2 size={13} /> {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="wizard-preview-row-empty">Cevaplara göre belirlenir</span>
                )}
              </div>
            </div>

            <div className="wizard-preview-foot">
              <span className="wizard-preview-foot-dot" />
              <span>Cevap verdikçe canlı güncellenir</span>
            </div>
          </aside>
        ) : null}
        </div>
      </div>
    </section>
  );
}
