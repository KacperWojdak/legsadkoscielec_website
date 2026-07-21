import { getSeasons, getMatchesBySeason } from "../../lib/queries";
import RecentResultsClient from "./RecentResultsClient";

export default async function RecentResults() {
  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);

  if (!currentSeason) return null;

  const allMatches = await getMatchesBySeason(currentSeason._id);

  const results = allMatches
    .filter((m: any) => m.status === "finished")
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (results.length === 0) {
    return (
      <section className="border-b border-brand-border py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-brand-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              Ostatnie wyniki
            </span>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <p className="text-center text-sm text-brand-muted">
            Brak rozegranych meczów w tym sezonie.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-brand-border py-10">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-brand-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              Ostatnie wyniki
            </span>
          </div>
          <a
            href="/terminarz"
            className="text-xs uppercase tracking-wide text-brand-muted transition-colors hover:text-white"
          >
            Pełny terminarz →
          </a>
        </div>

        <RecentResultsClient results={results} />

      </div>
    </section>
  );
}