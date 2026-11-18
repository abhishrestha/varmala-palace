import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://varmalapalace.com/"),
  title: "Varmala Palace | Best Marriage Lawn & Banquet in Bhabua, Kaimur",
  description:
    "Varmala Palace is a spacious marriage lawn in Bhabua/Kaimur with a banquet hall, AC rooms, parking and wedding packages.",
  alternates: { canonical: "https://varmalapalace.com/" },
  keywords: [
    "marriage lawn in Bhabua",
    "banquet hall in Kaimur",
    "wedding venue Bihar",
    "Varmala Palace Khadaura",
  ],
  openGraph: {
    title: "Varmala Palace | Wedding Venue in Kaimur",
    description: "Elegant weddings, celebrations and gatherings in Khadaura, Bhabua.",
    url: "https://varmalapalace.com/",
    siteName: "Varmala Palace",
    type: "website",
    images: [{ url: "/images/wedding-lawn.svg", width: 1200, height: 630, alt: "Varmala Palace wedding lawn" }],
  },
  twitter: { card: "summary_large_image", title: "Varmala Palace", description: "Wedding venue in Kaimur, Bihar." },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
