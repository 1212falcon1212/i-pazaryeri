export type OfferInput = {
  fullName: unknown;
  company: unknown;
  email: unknown;
  phone: unknown;
  sector: unknown;
  networkSize: unknown;
  modules: unknown;
  selectedServices?: unknown;
  message: unknown;
};

export type OfferValidation =
  | { ok: true; data: Record<keyof OfferInput, string> }
  | { ok: false; errors: string[] };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanMulti(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(clean).filter(Boolean).join(", ");
  }

  return clean(value);
}

export function validateOfferInput(input: OfferInput): OfferValidation {
  const data = {
    fullName: clean(input.fullName),
    company: clean(input.company),
    email: clean(input.email),
    phone: clean(input.phone),
    sector: clean(input.sector),
    networkSize: clean(input.networkSize),
    modules: clean(input.modules),
    selectedServices: cleanMulti(input.selectedServices),
    message: clean(input.message)
  };

  const errors: string[] = [];

  if (!data.fullName) errors.push("Ad soyad gereklidir.");
  if (!data.company) errors.push("Şirket adı gereklidir.");
  if (!data.email && !data.phone) errors.push("Telefon veya e-posta gereklidir.");
  if (!data.sector) errors.push("Sektör gereklidir.");
  if (!data.message) errors.push("Kısa ihtiyaç notu gereklidir.");

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}
