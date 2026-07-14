import { getNews } from "../../lib/queries";
import PageHeaderAccent from "../components/PageHeaderAccent";
import NewsClient from "./NewsClient";
import FadeInSection from "../components/FadeInSection";

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