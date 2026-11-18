import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import "../../globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-heading", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const figtree = Figtree({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const notoSerif = Noto_Serif_Devanagari({ variable: "--font-devanagari-heading", subsets: ["devanagari"], weight: ["400", "500"], display: "swap" });
const notoSans = Noto_Sans_Devanagari({ variable: "--font-devanagari-body", subsets: ["devanagari"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://varmalapalace.com/"),
  title: "वरमाला पैलेस | भभुआ, कैमूर का बेस्ट मैरिज लॉन और बैंक्वेट हॉल",
  description: "वरमाला पैलेस भभुआ का सुंदर शादी लॉन और कैमूर बैंक्वेट हॉल है, जहां विवाह, मांगलिक उत्सव और पारिवारिक समारोह मनाए जाते हैं।",
  alternates: { canonical: "https://varmalapalace.com/hi/", languages: { en: "https://varmalapalace.com/", hi: "https://varmalapalace.com/hi/", "x-default": "https://varmalapalace.com/" } },
  openGraph: { title: "वरमाला पैलेस | भभुआ, कैमूर", description: "भभुआ का सुंदर शादी लॉन और कैमूर बैंक्वेट हॉल।", url: "https://varmalapalace.com/hi/", locale: "hi_IN", type: "website" },
  twitter: { card: "summary_large_image", title: "वरमाला पैलेस", description: "भभुआ, कैमूर का शादी लॉन और बैंक्वेट हॉल।" },
  icons: { icon: "/favicon.svg" },
};

export default function HindiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hi" className={`${cormorant.variable} ${figtree.variable} ${notoSerif.variable} ${notoSans.variable}`}><body>{children}</body></html>;
}
