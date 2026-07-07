import matches from "../../data/matches.json";

function getNextMatch() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return matches
    .filter((m) => new Date(m.date) >= today && m.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NextMatch() {
  const match = getNextMatch();

  if (!match) return null;

  const home = match.homeIsLegsad ? "Legsad Kościelec" : match.home;
  const away = match.homeIsLegsad ? match.away : "Legsad Kościelec";

  return (
    <section className="border-b border-brand-border bg-brand-black py-10">
      <div className="mx-auto max-w-5xl px-6">

        {/* NAGŁÓWEK */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-brand-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Najbliższy mecz
          </span>
          <div className="h-px flex-1 bg-brand-border" />
        </div>

        {/* KARTA MECZU */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-10">

          {/* DATA I LIGA */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-white/50 capitalize">
              {formatDate(match.date)} · {match.time}
            </span>
            <span className="rounded-md border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
              {match.league} · Kolejka {match.round}
            </span>
          </div>

          {/* DRUŻYNY */}
          <div className="flex items-center justify-between gap-4">

            {/* GOSPODARZ */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                {match.homeIsLegsad ? (
                  <img src="/images/logo-pink.png" alt="Legsad Kościelec" className="h-12 w-12 object-contain" />
                ) : (
                  <img src={`/images/clubs/${match.opponentLogo}`} alt={home} className="h-12 w-12 object-contain" />
                )}
              </div>
              <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                {home}
              </span>
              <span className="text-xs uppercase tracking-widest text-brand-muted">
                {match.homeIsLegsad ? "Gospodarze" : "Goście"}
              </span>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-bebas text-5xl text-brand-border">VS</span>
            </div>

            {/* GOŚĆ */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                {!match.homeIsLegsad ? (
                  <img src="/images/logo-pink.png" alt="Legsad Kościelec" className="h-12 w-12 object-contain" />
                ) : (
                  <img src={`/images/clubs/${match.opponentLogo}`} alt={away} className="h-12 w-12 object-contain" />
                )}
              </div>
              <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                {away}
              </span>
              <span className="text-xs uppercase tracking-widest text-brand-muted">
                {!match.homeIsLegsad ? "Gospodarze" : "Goście"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}