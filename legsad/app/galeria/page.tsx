import { getAllGalleryItems } from "../../lib/gallery";
import PageHeaderAccent from "../components/PageHeaderAccent";
import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria | GKS Legsad Kościelec",
  description: "Zdjęcia z meczów, treningów i wydarzeń klubowych GKS Legsad Kościelec.",
  openGraph: {
    title: "Galeria | GKS Legsad Kościelec",
    description: "Zdjęcia z meczów, treningów i wydarzeń klubowych.",
    type: "website",
  },
};

export default async function GaleriaPage() {
  const items = await getAllGalleryItems();

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-crimson/20 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-6xl px-6">

        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Klub
          </p>
          <h1 className="font-bebas text-5xl text-white md:text-6xl">
            Galeria
          </h1>
        </div>

        <GalleryClient items={items} />

      </div>
    </main>
  );
}