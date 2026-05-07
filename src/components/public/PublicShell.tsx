import { Footer } from "./Footer";
import { Header } from "./Header";
import { ChatBot } from "./ChatBot";
import { getPackages, getProjects, getSettings } from "@/lib/content";

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const [settings, packages, projects] = await Promise.all([
    getSettings(),
    getPackages(),
    getProjects()
  ]);

  const chatPackages = packages.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    priceLabel: p.priceLabel,
    pricePeriod: p.pricePeriod
  }));

  const chatProjects = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    shortDesc: p.shortDesc,
    sector: p.sector
  }));

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
      <ChatBot packages={chatPackages} projects={chatProjects} />
    </>
  );
}
