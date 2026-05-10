import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/PublicShell";
import { ModelLandingPage } from "@/components/public/ModelLandingPage";
import { getBusinessModelPage } from "@/lib/content";

export const metadata = {
  title: "B2C E-Ticaret Yazılımı | Online Satış Altyapısı | i-Pazaryeri",
  description:
    "B2C e-ticaret altyapısı: ürün katalog, ödeme, kargo, SEO, mobil deneyim, multichannel pazaryeri entegrasyonu. Trendyol, Hepsiburada, Google Shopping desteği."
};

export default async function B2CPage() {
  const model = await getBusinessModelPage("b2c");
  if (!model) notFound();
  return (
    <PublicShell>
      <ModelLandingPage model={model} />
    </PublicShell>
  );
}
