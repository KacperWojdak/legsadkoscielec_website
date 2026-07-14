import PageHeaderAccent from "../components/PageHeaderAccent";
import { getPlayers, getStaff, getAllMatches } from "../../lib/queries";
import { computePlayerStats } from "../../lib/stats";
import RosterClient from "./RosterClient";
import FadeInSection from "../components/FadeInSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drużyna | GKS Legsad Kościelec",
  description: "Poznaj skład GKS Legsad Kościelec — sztab szkoleniowy, bramkarze, obrońcy, pomocnicy i napastnicy na sezon 2026/2027.",
  openGraph: {
    title: "Drużyna | GKS Legsad Kościelec",
    description: "Poznaj skład GKS Legsad Kościelec na sezon 2026/2027.",
    type: "website",
  },
};

export default async function DruzynaPage() {
  const players = await getPlayers();
  const staff = await getStaff();
  const allMatches = await getAllMatches();
  const allPlayerStats = computePlayerStats(allMatches);

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-bl from-brand-crimson/20 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">

        <FadeInSection>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              Sezon 2026/2027
            </p>
            <h1 className="font-bebas text-5xl text-white md:text-6xl">
              Nasza Kadra
            </h1>
          </div>
        </FadeInSection>

        <RosterClient players={players} staff={staff} allPlayerStats={allPlayerStats} />

      </div>
    </main>
  );
}