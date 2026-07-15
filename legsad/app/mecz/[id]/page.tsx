import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeaderAccent from "@/app/components/PageHeaderAccent";
import FadeInSection from "@/app/components/FadeInSection";
import { getMatchById, getPlayers, getAllMatches } from "../../../lib/queries";
import { computePlayerStats } from "../../../lib/stats";
import MatchClient from "./MatchClient";
import type { Metadata } from "next";
import { SITE_URL } from "../../../lib/constants";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const match = await getMatchById(id);

  if (!match) {
    return { title: "Mecz nie znaleziony | GKS Legsad Kościelec" };
  }

  const home = match.homeIsLegsad ? "Legsad Kościelec" : match.opponent.name;
  const away = match.homeIsLegsad ? match.opponent.name : "Legsad Kościelec";
  const scoreText = match.status === "finished" ? ` ${match.scoreHome}:${match.scoreAway}` : "";

  return {
    title: `${home} vs ${away}${scoreText} | GKS Legsad Kościelec`,
    description: `Raport meczowy: ${home} - ${away}, ${match.league}, kolejka ${match.round}. Strzelcy, kartki, składy i przebieg spotkania.`,
    openGraph: {
      title: `${home} vs ${away}${scoreText}`,
      description: `${match.league} · Kolejka ${match.round}`,
      url: `${SITE_URL}/mecz/${id}`,
      type: "website",
    },
  };
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await getMatchById(id);

  if (!match || match.status !== "finished") {
    notFound();
  }

  const players = await getPlayers();
  const allMatches = await getAllMatches();
  const allPlayerStats = computePlayerStats(allMatches);

  const home = match.homeIsLegsad ? "Legsad Kościelec" : match.opponent.name;
  const away = match.homeIsLegsad ? match.opponent.name : "Legsad Kościelec";

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="mx-auto max-w-5xl px-6">

        <Link
          href="/terminarz"
          className="mb-6 inline-block text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-white"
        >
          ← Wróć do terminarza
        </Link>

        <FadeInSection>
          <div className="mb-8 rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-10">

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-center">
              <span className="rounded-md border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
                {match.league} · Kolejka {match.round}
              </span>
            </div>

            <p className="mb-6 text-center text-sm text-white/50 capitalize">
              {formatDate(match.date)} · {match.time}
            </p>

            <div className="flex items-center justify-between gap-4">

              <div className="flex flex-1 flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                  {match.homeIsLegsad ? (
                    <img src="/images/logo-pink.png" alt="" className="h-12 w-12 object-contain" />
                  ) : (
                    <img src={match.opponent.logoUrl ?? "/images/logo-white.png"} alt="" className="h-12 w-12 object-contain" />
                  )}
                </div>
                <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                  {home}
                </span>
              </div>

              <div className="shrink-0">
                <span className="font-bebas text-5xl text-brand-red md:text-6xl">
                  {match.scoreHome} : {match.scoreAway}
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                  {!match.homeIsLegsad ? (
                    <img src="/images/logo-pink.png" alt="" className="h-12 w-12 object-contain" />
                  ) : (
                    <img src={match.opponent.logoUrl ?? "/images/logo-white.png"} alt="" className="h-12 w-12 object-contain" />
                  )}
                </div>
                <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                  {away}
                </span>
              </div>

            </div>
          </div>
        </FadeInSection>

        <MatchClient
          match={match}
          players={players}
          allPlayerStats={allPlayerStats}
          home={home}
          away={away}
        />

      </div>
    </main>
  );
}