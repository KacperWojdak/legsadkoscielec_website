import { getNews } from "../../lib/queries";
import PageHeaderAccent from "../components/PageHeaderAccent";
import NewsClient from "./NewsClient";
import FadeInSection from "../components/FadeInSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktualności | GKS Legsad Kościelec",
  description: "Najnowsze wiadomości i aktualności GKS Legsad Kościelec — transfery, wyniki, zapowiedzi meczów i wydarzenia klubowe.",
  openGraph: {
    title: "Aktualności | GKS Legsad Kościelec",
    description: "Najnowsze wiadomości z życia klubu GKS Legsad Kościelec.",
    type: "website",
  },
};

export default async function AktualnosciPage() {
  const news = await getNews();

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-brand-crimson/20 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">

        <FadeInSection>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              Klub
            </p>
            <h1 className="font-bebas text-5xl text-white md:text-6xl">
              Aktualności
            </h1>
          </div>
        </FadeInSection>

        <NewsClient news={news} />

      </div>
    </main>
  );
}