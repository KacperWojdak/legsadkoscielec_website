import Link from "next/link";
import type { Metadata } from "next";
import { getAcademyNews } from "../../../lib/queries";
import FadeInSection from "../../components/FadeInSection";
import Footer from "../../components/Footer";
import AcademyNewsClient from "./AcademyNewsClient";

export const metadata: Metadata = {
  title: "Aktualności Akademii | GKS Legsad Kościelec",
  description: "Aktualności Akademii Piłkarskiej GKS Legsad Kościelec — nabory, treningi, wydarzenia dla najmłodszych.",
};

export default async function AkademiaAktualnosciPage() {
  const news = await getAcademyNews();

  return (
    <main className="relative min-h-screen overflow-hidden bg-academy-bg pt-40 pb-20">
      <div className="relative mx-auto max-w-5xl px-6">

        <Link
          href="/akademia"
          className="mb-6 inline-block text-xs uppercase tracking-widest text-academy-muted transition-colors hover:text-academy-ink"
        >
          ← Wróć do Akademii
        </Link>

        <FadeInSection>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-academy-red">
              Akademia
            </p>
            <h1 className="font-bebas text-5xl text-academy-ink md:text-6xl">
              Aktualności
            </h1>
          </div>
        </FadeInSection>

        {news.length > 0 ? (
          <div className="mb-16">
            <AcademyNewsClient news={news} />
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-academy-muted">
            Brak aktualności Akademii na ten moment.
          </p>
        )}

      </div>

      <Footer />
    </main>
  );
}