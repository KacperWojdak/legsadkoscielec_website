import matches from "../../data/matches.json";

function getRecentResults() {
  return matches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
}

function getResult(match: (typeof matches)[0]) {
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

export default function RecentResults() {
  const results = getRecentResults();

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

        {/* NAGŁÓWEK */}
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

        {/* LISTA WYNIKÓW */}
        <div className="flex flex-col divide-y divide-brand-border rounded-2xl border border-brand-border bg-brand-surface overflow-hidden">
          {results.map((match) => {
            const result = getResult(match);
            const opponent = match.homeIsLegsad ? match.away : match.home;
            const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
            const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;

            return (
              <div
                key={match.id}
                className="flex items-center gap-4 px-5 py-4"
              >
                {/* WYNIK W/R/P */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-bebas text-sm ${
                    result === "W"
                      ? "bg-green-900/50 text-green-400"
                      : result === "P"
                      ? "bg-red-900/50 text-red-400"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {result}
                </div>

                {/* LOGO PRZECIWNIKA */}
                <img
                  src={`/images/clubs/${match.opponentLogo}`}
                  alt={opponent}
                  className="h-8 w-8 object-contain shrink-0"
                />

                {/* NAZWA */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {match.homeIsLegsad ? "vs " : "@ "}{opponent}
                  </p>
                  <p className="text-xs text-brand-muted">
                    {formatDate(match.date)} · kolejka {match.round}
                  </p>
                </div>

                {/* WYNIK */}
                <div className="shrink-0 text-right">
                  <span className="font-bebas text-2xl text-white">
                    {legsadScore}:{opponentScore}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}