import type { Metadata } from "next";
import PageHeaderAccent from "@/app/components/PageHeaderAccent";
import FadeInSection from "@/app/components/FadeInSection";
import { getComputedLeagueTable } from "../../lib/leagueTable";
import TableClient from "./TableClient";

export const metadata: Metadata = {
  title: "Tabela | GKS Legsad Kościelec",
  description: "Aktualna tabela ligowa GKS Legsad Kościelec.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function TabelaPage() {
  const table = await getComputedLeagueTable();

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-crimson/20 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="mx-auto max-w-4xl px-6">
        <FadeInSection>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              {table?.leagueName ?? "Tabela ligowa"}
            </p>
            <h1 className="font-bebas text-5xl text-white md:text-6xl">
              Tabela
            </h1>
            {table && table.lastUpdated && (
              <p className="mt-2 text-sm text-white/60">
                Aktualizacja: {formatDate(table.lastUpdated)}
              </p>
            )}
          </div>
        </FadeInSection>

        {!table ? (
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-10 text-center text-sm text-brand-muted">
            Tabela nie jest jeszcze dostępna.
          </div>
        ) : (
          <FadeInSection delay={0.1}>
            <TableClient rows={table.rows} />

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-green-900/90" /> Awans
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-red-900/90" /> Spadek
              </span>
              {/* <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-yellow-900/90" /> Baraże
              </span> */}
            </div>
          </FadeInSection>
        )}
      </div>
    </main>
  );
}