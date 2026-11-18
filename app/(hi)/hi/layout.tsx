import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import "../../globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-heading", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const figtree = Figtree({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const notoSerif = Noto_Serif_Devanagari({ variable: "--font-devanagari-heading", subsets: ["devanagari"], weight: ["400", "500"], display: "swap" });
const notoSans = Noto_Sans_Devanagari({ variable: "--font-devanagari-body", subsets: ["devanagari"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.varmalapalace.in/"),
  verification: { google: "hWdPK7iG2V8RiECzxv5HiVetdCS8ZFHNvQqUK5oRD9w" },
  title: "वरमाला पैलेस | भभुआ, कैमूर का बेस्ट मैरिज लॉन और बैंक्वेट हॉल",
  description: "वरमाला पैलेस भभुआ का सुंदर शादी लॉन और कैमूर बैंक्वेट हॉल है, जहां विवाह, मांगलिक उत्सव और पारिवारिक समारोह मनाए जाते हैं।",
  alternates: { canonical: "https://www.varmalapalace.in/hi/", languages: { en: "https://www.varmalapalace.in/", hi: "https://www.varmalapalace.in/hi/", "x-default": "https://www.varmalapalace.in/" } },
  openGraph: { title: "वरमाला पैलेस | भभुआ, कैमूर", description: "भभुआ का सुंदर शादी लॉन और कैमूर बैंक्वेट हॉल।", url: "https://www.varmalapalace.in/hi/", locale: "hi_IN", type: "website" },
  twitter: { card: "summary_large_image", title: "वरमाला पैलेस", description: "भभुआ, कैमूर का शादी लॉन और बैंक्वेट हॉल।" },
  icons: { icon: "/favicon.svg" },
};

export default function HindiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hi" className={`${cormorant.variable} ${figtree.variable} ${notoSerif.variable} ${notoSans.variable}`}><body>{children}</body></html>;
}
