import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#05070b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://octavian-portfolio.vercel.app"),
  title: "HERMYO PORTFOLIO — Web dincolo de obișnuit",
  description:
    "HERMYO PORTFOLIO — vitrină cinematică de produse live și câte un landing puternic pe nișă.",
  openGraph: {
    title: "HERMYO PORTFOLIO",
    description: "Lucrări live — OVB Next, Dobre Diana, Eidan, Kreya și demo-uri pe nișă.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
