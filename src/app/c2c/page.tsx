import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/PublicShell";
import { ModelLandingPage } from "@/components/public/ModelLandingPage";
import { getBusinessModelPage } from "@/lib/content";

export const metadata = {
  title: "C2C / Multi-Vendor Pazaryeri Yazılımı | i-Pazaryeri",
  description:
    "Trendyol, Hepsiburada tarzı çok satıcılı pazaryeri altyapısı. Satıcı paneli, komisyon, hakediş, KYC, escrow, yorum/puan sistemi — tüm marketplace mekanikleri."
};

export default async function C2CPage() {
  const model = await getBusinessModelPage("c2c");
  if (!model) notFound();
  return (
    <PublicShell>
      <ModelLandingPage model={model} />
    </PublicShell>
  );
}
