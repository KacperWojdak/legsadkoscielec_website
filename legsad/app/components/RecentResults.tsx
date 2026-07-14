import { getSeasons, getMatchesBySeason } from "../../lib/queries";

function getResult(match: any) {
  if (match.scoreHome === null || match.scoreAway === null) return null;
  const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
  const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
  if (legsadScore > opponentScore) return "W";
  if (legsadScore < opponentScore) return "P";
  return "R";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
  });
}

function hasReport(match: any) {
  return (
    (match.reportScorersHome && match.reportScorersHome.length > 0) ||
    (match.reportScorersAway && match.reportScorersAway.length > 0) ||
    (match.reportLineupHome && match.reportLineupHome.length > 0) ||
    (match.reportLineupAway && match.reportLineupAway.length > 0)
  );
}

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

        <div className="flex flex-col divide-y divide-brand-border rounded-2xl border border-brand-border bg-brand-surface overflow-hidden">
          {results.map((match: any) => {
            const result = getResult(match);
            const opponent = match.opponent.name;
            const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
            const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;

            return (
              <div
                key={match._id}
                className="flex items-center gap-4 px-5 py-4"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-bebas text-sm ${
                    result === "W"
                      ? "bg-green-900/50 text-green-400"
                      : result === "P"
                      ? "bg-red-900/50 text-red-400"
                      : "bg-yellow-900/50 text-yellow-400"
                  }`}
                >
                  {result}
                </div>

                <img
                  src={match.opponent.logoUrl ?? "/images/logo-white.png"}
                  alt={opponent}
                  className="h-8 w-8 object-contain shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    vs {opponent}
                  </p>
                  <p className="text-xs text-brand-muted">
                    {formatDate(match.date)} · kolejka {match.round}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-right">
                  <span className="font-bebas text-2xl text-white">
                    {legsadScore}:{opponentScore}
                  </span>
                  {hasReport(match) && (
                    <a
                      href={`/mecz/${match._id}`}
                      className="rounded-md border border-brand-red px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                    >
                      Raport
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}