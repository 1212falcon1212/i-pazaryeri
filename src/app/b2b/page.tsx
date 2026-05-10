import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/PublicShell";
import { ModelLandingPage } from "@/components/public/ModelLandingPage";
import { getBusinessModelPage } from "@/lib/content";

export const metadata = {
  title: "B2B Pazaryeri Yazılımı | Bayi Sipariş Sistemi | i-Pazaryeri",
  description:
    "Bayi ağı olan markalar, distribütörler ve toptancılar için B2B pazaryeri yazılımı. Çoklu fiyat listesi, cari hesap, ERP entegrasyonu, mobil uygulama hazır gelir."
};

export default async function B2BPage() {
  const model = await getBusinessModelPage("b2b");
  if (!model) notFound();
  return (
    <PublicShell>
      <ModelLandingPage model={model} />
    </PublicShell>
  );
}
