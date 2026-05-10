import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://i-pazaryeri.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "i-Pazaryeri | B2B, B2C ve C2C E-ticaret Altyapısı",
    template: "%s | i-Pazaryeri"
  },
  description:
    "Bayi sipariş portalı, online mağaza veya çok satıcılı pazaryeri — i-Pazaryeri ile B2B, B2C ve C2C ticaret modellerinizi tek altyapıda kurun. ERP, kargo, ödeme ve multichannel entegrasyonları hazır.",
  keywords: [
    "pazaryeri yazılımı",
    "B2B pazaryeri",
    "B2C e-ticaret",
    "C2C pazaryeri",
    "çok satıcılı pazaryeri",
    "bayi sipariş portalı",
    "multi-vendor marketplace",
    "ERP entegrasyon",
    "e-ticaret altyapı",
    "Trendyol Hepsiburada multichannel"
  ],
  authors: [{ name: "i-Pazaryeri" }],
  creator: "i-Pazaryeri",
  publisher: "i-Pazaryeri",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "i-Pazaryeri",
    title: "i-Pazaryeri | B2B, B2C ve C2C E-ticaret Altyapısı",
    description:
      "Tek altyapıda B2B bayi sipariş portalı, B2C online mağaza ve C2C çok satıcılı pazaryeri. ERP, kargo, ödeme ve multichannel entegrasyonları hazır.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "i-Pazaryeri — B2B, B2C, C2C ticaret altyapısı"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "i-Pazaryeri | B2B, B2C ve C2C E-ticaret Altyapısı",
    description:
      "B2B bayi portalı, B2C mağaza, C2C pazaryeri — üç ticaret modelini de destekleyen tek altyapı.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: SITE_URL
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
