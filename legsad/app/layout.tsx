import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import ConditionalChrome from "./components/ConditionalChrome";
import NextMatchPill from "./components/NextMatchPill";

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
  title: "GKS Legsad Kościelec",
  description: "Oficjalna strona GKS Legsad Kościelec",
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