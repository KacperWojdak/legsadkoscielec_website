"use client";

import { useState } from "react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getResult(match: any) {
  if (match.scoreHome === null || match.scoreAway === null) return null;
  const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
  const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
  if (legsadScore > opponentScore) return "W";
  if (legsadScore < opponentScore) return "P";
  return "R";
}

function hasReport(match: any) {
  return (
    (match.reportScorersHome && match.reportScorersHome.length > 0) ||
    (match.reportScorersAway && match.reportScorersAway.length > 0) ||
    (match.reportLineupHome && match.reportLineupHome.length > 0) ||
    (match.reportLineupAway && match.reportLineupAway.length > 0)
  );
}

export default function ScheduleClient({ matches }: { matches: any[] }) {
  const [search, setSearch] = useState("");

  const sorted = [...matches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filtered = sorted.filter((match) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    const home = match.homeIsLegsad ? "Legsad Kościelec" : match.opponent.name;
    const away = match.homeIsLegsad ? match.opponent.name : "Legsad Kościelec";
    return (
      home.toLowerCase().includes(query) || away.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="mb-6">
        <div className="relative mx-auto max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj drużyny np. Górnik..."
            className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-2.5 text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-red"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white"
              aria-label="Wyczyść wyszukiwanie"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col divide-y divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-brand-surface">
          {filtered.map((match) => {
            const result = getResult(match);
            const isFinished = match.status === "finished";
            const home = match.homeIsLegsad ? "Legsad Kościelec" : match.opponent.name;
            const away = match.homeIsLegsad ? match.opponent.name : "Legsad Kościelec";

            return (
              <div
                key={match._id}
                className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:gap-4"
              >

                <div className="flex items-center gap-3 md:w-40 shrink-0">
                  <span className="text-xs uppercase text-brand-muted">
                    {formatDate(match.date)}
                  </span>
                  <span className="text-xs text-brand-muted">
                    {match.time}
                  </span>
                </div>

                <div className="flex flex-1 items-center justify-center gap-3">

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <span className={`text-sm font-medium ${match.homeIsLegsad ? "text-white" : "text-white/60"} text-right`}>
                      {home}
                    </span>
                    {match.homeIsLegsad ? (
                      <img src="/images/logo-pink.png" alt="" className="h-7 w-7 shrink-0 object-contain" />
                    ) : (
                      <img src={match.opponent.logoUrl ?? "/images/logo-white.png"} alt="" className="h-7 w-7 shrink-0 object-contain" />
                    )}
                  </div>

                  <div className="shrink-0 px-2 text-center">
                    {isFinished ? (
                      <span className="font-bebas text-xl text-brand-red">
                        {match.scoreHome}:{match.scoreAway}
                      </span>
                    ) : (
                      <span className="font-bebas text-lg text-brand-muted">VS</span>
                    )}
                  </div>

                  <div className="flex flex-1 items-center gap-2">
                    {!match.homeIsLegsad ? (
                      <img src="/images/logo-pink.png" alt="" className="h-7 w-7 shrink-0 object-contain" />
                    ) : (
                      <img src={match.opponent.logoUrl ?? "/images/logo-white.png"} alt="" className="h-7 w-7 shrink-0 object-contain" />
                    )}
                    <span className={`text-sm font-medium ${!match.homeIsLegsad ? "text-white" : "text-white/60"}`}>
                      {away}
                    </span>
                  </div>

                </div>

                <div className="flex items-center justify-center gap-2 md:w-40 shrink-0 md:justify-end">
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
                  {hasReport(match) && (
                    <a
                      href={`/mecz/${match._id}`}
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
      ) : (
        <p className="py-12 text-center text-sm text-brand-muted">
          Nie znaleziono meczów dla &quot;{search}&quot;
        </p>
      )}

      <p className="mt-6 text-center text-xs text-brand-muted">
        Godzina meczu może ulec zmianie
      </p>
    </>
  );
}