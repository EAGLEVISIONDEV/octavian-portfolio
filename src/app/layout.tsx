import type { Metadata, Viewport } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
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
  title: "Octavian Popovici — EAGLE VISION | 3D Portfolio",
  description:
    "Modern 3D portfolio of Octavian Popovici — AI products, automation, and premium web experiences from EAGLE VISION.",
  openGraph: {
    title: "Octavian Popovici — 3D Portfolio",
    description: "Selected GitHub projects with live demos and 3D interactive cards.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
