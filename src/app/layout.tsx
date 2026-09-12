import type { Metadata } from "next";
import { Archivo, Inter, Rakkas, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
// Rakkas carries the hand-lettered quality of the sign over his door, which
// is the only piece of branding he has.
const rakkas = Rakkas({
  subsets: ["arabic", "latin"],
  weight: ["400"],
  variable: "--font-rakkas",
});
const ibmar = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-ibmar",
});

export const metadata: Metadata = {
  title: "Zayed Auto — He tells you what has been redone | Beverly Hills, Sheikh Zayed",
  description:
    "The smallest dealership in this series, and the only one that volunteers a fault: factory throughout, two front wings redone.",
  metadataBase: new URL("https://zayed-auto-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Zayed Auto — He tells you what has been redone",
    description: "One forecourt in Beverly Hills, and a listing that names its own exceptions.",
    images: ["/media/merc-c180.jpg"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#17181a" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${archivo.variable} ${inter.variable} ${rakkas.variable} ${ibmar.variable}`}
    >
      <body className="bg-bay text-chalk antialiased">
        {/* Sections are confirmed by an intersection observer, so without
            scripting every one of them would stay at opacity 0. */}
        <noscript>
          <style>{`[data-check],[data-rule]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
