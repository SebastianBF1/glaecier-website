import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import "../globals.css";

// Manrope is the sans used on the current glaecier.com; Newsreader is the new editorial serif.
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap", style: ["normal", "italic"] });

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#1c1b19" };

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, t.meta);
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  // data-scroll-behavior lets Next switch off smooth scrolling during page changes, so a new page opens at the top.
  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          {t.nav.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
