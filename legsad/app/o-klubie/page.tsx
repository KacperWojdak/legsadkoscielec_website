import type { Metadata } from "next";
import PageHeaderAccent from "../components/PageHeaderAccent";
import OKlubieContent from "./OKlubieContent";

export const metadata: Metadata = {
  title: "O klubie | GKS Legsad Kościelec",
  description: "Poznaj GKS Legsad Kościelec — historię, zarząd i podstawowe informacje o klubie założonym w 1993 roku.",
  openGraph: {
    title: "O klubie | GKS Legsad Kościelec",
    description: "Historia, zarząd i informacje o GKS Legsad Kościelec.",
    type: "website",
  },
};

export default function OKlubiePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-black to-brand-crimson/20 pt-32 pb-20">
      <PageHeaderAccent />
      <OKlubieContent />
    </main>
  );
}