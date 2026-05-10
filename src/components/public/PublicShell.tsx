import { Footer } from "./Footer";
import { Header } from "./Header";
import { ChatBot } from "./ChatBot";
import { getFooterLinks, getPackages, getSettings } from "@/lib/content";

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const [settings, packages, footerLinks] = await Promise.all([
    getSettings(),
    getPackages(),
    getFooterLinks()
  ]);

  const chatPackages = packages.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    priceLabel: p.priceLabel,
    pricePeriod: p.pricePeriod
  }));

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} footerLinks={footerLinks} />
      <ChatBot packages={chatPackages} />
    </>
  );
}
