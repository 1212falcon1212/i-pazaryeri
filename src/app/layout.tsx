import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "i-Pazaryeri | B2B Pazaryeri Altyapısı",
  description: "Bayi, tedarikçi ve kurumsal alıcı ağları için sektöre uyarlanabilir B2B pazaryeri altyapısı."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

