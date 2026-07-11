import matches from "../../data/matches.json";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getResult(match: (typeof matches)[0]) {
  if (match.scoreHome === null || match.scoreAway === null) return null;
  const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
  const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
  if (legsadScore > opponentScore) return "W";
  if (legsadScore < opponentScore) return "P";
  return "R";
}

export default function TerminarzPage() {
  const sorted = [...matches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-6">

        {/* NAGŁÓWEK */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Sezon 2026/2027
          </p>
          <h1 className="font-bebas text-5xl text-white md:text-6xl">
            Terminarz
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            Klasa A · Legnica gr. 3 · Runda jesienna
          </p>
        </div>

        {/* LISTA MECZÓW */}
        <div className="flex flex-col divide-y divide-brand-border overflow-hidden rounded-2xl border border-brand-border bg-brand-surface">
          {sorted.map((match) => {
            const result = getResult(match);
            const isFinished = match.status === "finished";

            return (
              <div
                key={match.id}
                className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-4"
              >

                {/* DATA */}
                <div className="flex items-center gap-3 md:w-40 md:shrink-0">
                  <span className="text-xs uppercase text-brand-muted">
                    {formatDate(match.date)}
                  </span>
                  <span className="text-xs text-brand-muted">
                    {match.time}
                  </span>
                </div>

                {/* MECZ */}
                <div className="flex flex-1 items-center justify-center gap-3">

                  {/* GOSPODARZ */}
                  <div className="flex flex-1 items-center justify-end gap-2">
                    <span className={`text-sm font-medium ${match.homeIsLegsad ? "text-white" : "text-white/60"} text-right`}>
                      {match.home}
                    </span>
                    {match.homeIsLegsad ? (
                      <img src="/images/logo-pink.png" alt="" className="h-6 w-6 shrink-0 object-contain" />
                    ) : (
                      <img src={`/images/clubs/${match.opponentLogo}`} alt="" className="h-6 w-6 shrink-0 object-contain" />
                    )}
                  </div>

                  {/* WYNIK / GODZINA */}
                  <div className="shrink-0 px-2 text-center">
                    {isFinished ? (
                      <span className="font-bebas text-xl text-brand-red">
                        {match.scoreHome}:{match.scoreAway}
                      </span>
                    ) : (
                      <span className="font-bebas text-lg text-brand-muted">VS</span>
                    )}
                  </div>

                  {/* GOŚĆ */}
                  <div className="flex flex-1 items-center gap-2">
                    {!match.homeIsLegsad ? (
                      <img src="/images/logo-pink.png" alt="" className="h-6 w-6 shrink-0 object-contain" />
                    ) : (
                      <img src={`/images/clubs/${match.opponentLogo}`} alt="" className="h-6 w-6 shrink-0 object-contain" />
                    )}
                    <span className={`text-sm font-medium ${!match.homeIsLegsad ? "text-white" : "text-white/60"}`}>
                      {match.away}
                    </span>
                  </div>

                </div>

                {/* STATUS / LIGA */}
                <div className="flex items-center justify-center gap-2 md:w-40 md:shrink-0 md:justify-end">
                {isFinished && result && (
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-bebas text-xs ${
                      result === "W"
                        ? "bg-green-900/50 text-green-400"
                        : result === "P"
                        ? "bg-red-900/50 text-red-400"
                        : "bg-yellow-900/50 text-yellow-400"
                    }`}
                  >
                    {result}
                  </span>
                )}
                <span className="shrink-0 whitespace-nowrap text-[10px] uppercase tracking-widest text-brand-muted">
                  Kolejka {match.round}
                </span>
                {"report" in match && match.report && (
                  <a
                    href={`/mecz/${match.id}`}
                    className="shrink-0 whitespace-nowrap rounded-md border border-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                  >
                    Raport
                  </a>
                )}
              </div>

              </div>
            );
          })}
        </div>

        {/* INFO */}
        <p className="mt-6 text-center text-xs text-brand-muted">
        Godzina meczu może ulec zmianie · {matches[0]?.league ?? "Klasa A"} · Legnica gr. 3
        </p>

      </div>
    </main>
  );
}