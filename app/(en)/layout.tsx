import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import "../globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-heading", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const figtree = Figtree({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const notoSerif = Noto_Serif_Devanagari({ variable: "--font-devanagari-heading", subsets: ["devanagari"], weight: ["400", "500"], display: "swap" });
const notoSans = Noto_Sans_Devanagari({ variable: "--font-devanagari-body", subsets: ["devanagari"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.varmalapalace.in/"),
  verification: { google: "hWdPK7iG2V8RiECzxv5HiVetdCS8ZFHNvQqUK5oRD9w" },
  title: "Varmala Palace | Marriage Lawn in Bhabua, Kaimur",
  description: "Varmala Palace is a spacious marriage lawn in Bhabua and banquet hall in Kaimur for beautiful weddings, events and family celebrations.",
  alternates: { canonical: "https://www.varmalapalace.in/", languages: { en: "https://www.varmalapalace.in/", hi: "https://www.varmalapalace.in/hi/", "x-default": "https://www.varmalapalace.in/" } },
  keywords: ["marriage lawn in Bhabua", "banquet hall in Kaimur", "wedding venue Bihar", "Varmala Palace Bhabua"],
  openGraph: { title: "Varmala Palace | Wedding Venue in Kaimur", description: "Elegant weddings, celebrations and gatherings in Bhabua, Kaimur.", url: "https://www.varmalapalace.in/", siteName: "Varmala Palace", type: "website", images: [{ url: "/images/weddinglawn01.webp", width: 1360, height: 608, alt: "Varmala Palace wedding lawn" }] },
  twitter: { card: "summary_large_image", title: "Varmala Palace", description: "Wedding venue in Kaimur, Bihar." },
  icons: { icon: "/favicon.svg" },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${cormorant.variable} ${figtree.variable} ${notoSerif.variable} ${notoSans.variable}`}><body>{children}</body></html>;
}
