import { describe, expect, it } from "vitest";
import { homepageHero, marketplaceTrustTags } from "./homepage-copy";

describe("homepage copy", () => {
  it("uses the clean B2B marketplace hero approved for the homepage", () => {
    expect(homepageHero).toEqual({
      accent: "Güvenli",
      title: "B2B Pazaryeri Yazılımı",
      description:
        "Bayi, tedarikçi ve kurumsal alıcı ağlarınız için web tabanlı, entegrasyonlara hazır, yönetilebilir pazaryeri altyapısı.",
      primaryCta: "Hemen Başlayın"
    });
  });

  it("shows operational trust tags instead of marketplace logo imitations", () => {
    expect(marketplaceTrustTags).toEqual([
      "Bayi ağı",
      "ERP",
      "Stok",
      "Cari",
      "Sipariş",
      "Katalog",
      "Ödeme",
      "Raporlama"
    ]);
  });
});
