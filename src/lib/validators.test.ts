import { describe, expect, it } from "vitest";
import { validateOfferInput } from "./validators";

describe("validateOfferInput", () => {
  it("accepts a complete offer request", () => {
    const result = validateOfferInput({
      fullName: "Ali Veli",
      company: "Veli Tedarik",
      email: "ali@example.com",
      phone: "05550000000",
      sector: "Hırdavat / Nalbur",
      networkSize: "50 bayi",
      modules: "Sipariş, stok, cari",
      message: "Bayi sipariş sürecimizi dijitale taşımak istiyoruz."
    });

    expect(result.ok).toBe(true);
  });

  it("rejects missing contact information", () => {
    const result = validateOfferInput({
      fullName: "Ali Veli",
      company: "Veli Tedarik",
      email: "",
      phone: "",
      sector: "Hırdavat / Nalbur",
      networkSize: "50 bayi",
      modules: "Sipariş",
      message: "İhtiyaç notu"
    });

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected validation to fail");
    expect(result.errors).toContain("Telefon veya e-posta gereklidir.");
  });

  it("serializes selected service options for offer requests", () => {
    const result = validateOfferInput({
      fullName: "Ayşe Demir",
      company: "Demir Dağıtım",
      email: "ayse@example.com",
      phone: "",
      sector: "Toptan ticaret",
      networkSize: "120 bayi",
      modules: "",
      selectedServices: ["bayi-yonetimi", "erp-entegrasyonu", "fiyat-listeleri"],
      message: "Bayi fiyat listelerini ve ERP stok bilgisini portala taşımak istiyoruz."
    });

    expect(result).toEqual({
      ok: true,
      data: {
        fullName: "Ayşe Demir",
        company: "Demir Dağıtım",
        email: "ayse@example.com",
        phone: "",
        sector: "Toptan ticaret",
        networkSize: "120 bayi",
        modules: "",
        selectedServices: "bayi-yonetimi, erp-entegrasyonu, fiyat-listeleri",
        message: "Bayi fiyat listelerini ve ERP stok bilgisini portala taşımak istiyoruz."
      }
    });
  });
});
