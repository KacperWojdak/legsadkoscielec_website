import PageHeaderAccent from "../components/PageHeaderAccent";
import { getSeasons, getMatchesBySeason } from "../../lib/queries";
import ScheduleClient from "./ScheduleClient";
import FadeInSection from "../components/FadeInSection";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);

  return {
    title: `Terminarz ${currentSeason?.label ?? ""} | GKS Legsad Kościelec`,
    description: `Terminarz meczów GKS Legsad Kościelec — ${currentSeason?.league ?? "sezon 2026/2027"}. Sprawdź wyniki i nadchodzące spotkania.`,
    openGraph: {
      title: `Terminarz | GKS Legsad Kościelec`,
      description: `Terminarz meczów GKS Legsad Kościelec — ${currentSeason?.league ?? ""}.`,
      type: "website",
    },
  };
}

export default async function TerminarzPage() {
  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);

  const matches = currentSeason ? await getMatchesBySeason(currentSeason._id) : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-crimson/15 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">

        <FadeInSection>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              {currentSeason?.label ?? "Sezon"}
            </p>
            <h1 className="font-bebas text-5xl text-white md:text-6xl">
              Terminarz
            </h1>
            <p className="mt-2 text-sm text-brand-muted">
              {currentSeason?.league ?? ""}
            </p>
          </div>
        </FadeInSection>

        <ScheduleClient matches={matches} />

      </div>
    </main>
  );
}