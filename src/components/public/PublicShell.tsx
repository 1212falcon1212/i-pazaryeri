import { Footer } from "./Footer";
import { Header } from "./Header";
import { getSettings } from "@/lib/content";

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return <><Header settings={settings} />{children}<Footer settings={settings} /></>;
}

