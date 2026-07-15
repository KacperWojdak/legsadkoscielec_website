import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import ConditionalChrome from "./components/ConditionalChrome";
import NextMatchPill from "./components/NextMatchPill";
import { SITE_URL } from "../lib/constants";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GKS Legsad Kościelec — Oficjalna strona klubu",
  description: "Oficjalna strona GKS Legsad Kościelec. Wyniki, terminarz, skład drużyny i aktualności klubu piłkarskiego z Kościelca",
  openGraph: {
    title: "GKS Legsad Kościelec",
    description: "Oficjalna strona klubu piłkarskiego GKS Legsad Kościelec. Wyniki, terminarz, skład i aktualności.",
    url: SITE_URL,
    siteName: "GKS Legsad Kościelec",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GKS Legsad Kościelec",
    description: "Oficjalna strona klubu piłkarskiego GKS Legsad Kościelec.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
        <ConditionalChrome matchPill={<NextMatchPill />}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}