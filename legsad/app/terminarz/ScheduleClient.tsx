"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";

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
  const router = useRouter();

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
          {filtered.map((match, index) => {
            const result = getResult(match);
            const isFinished = match.status === "finished";
            const home = match.homeIsLegsad ? "Legsad Kościelec" : match.opponent.name;
            const away = match.homeIsLegsad ? match.opponent.name : "Legsad Kościelec";
            const clickable = hasReport(match);

            return (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: "easeOut" }}
                onClick={clickable ? () => router.push(`/mecz/${match._id}`) : undefined}
                className={`flex flex-col gap-3 px-6 py-6 transition-colors md:flex-row md:items-center md:gap-5 ${
                  clickable ? "cursor-pointer hover:bg-brand-black/40" : ""
                }`}
              >

                <div className="flex items-center gap-3 md:w-44 shrink-0">
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
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                      {match.homeIsLegsad ? (
                        <Image src="/images/logo-pink.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                      ) : (
                        <Image src={match.opponent.logoUrl ?? "/images/logo-white.png"} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 px-2 text-center">
                    {isFinished ? (
                      <span className="font-bebas text-xl text-brand-red">
                        {match.scoreHome}:{match.scoreAway}
                      </span>
                    ) : (
                      <span className="font-bebas text-xl text-brand-muted">VS</span>
                    )}
                  </div>

                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                      {!match.homeIsLegsad ? (
                        <Image src="/images/logo-pink.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                      ) : (
                        <Image src={match.opponent.logoUrl ?? "/images/logo-white.png"} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${!match.homeIsLegsad ? "text-white" : "text-white/60"}`}>
                      {away}
                    </span>
                  </div>

                </div>

                <div className="flex items-center justify-center gap-2 md:w-40 shrink-0 md:justify-end">
                  {isFinished && result && (
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-bebas text-sm ${
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
                  {clickable && (
                    <a
                      href={`/mecz/${match._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 whitespace-nowrap rounded-md border border-brand-red px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                    >
                      Raport
                    </a>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-brand-muted">
          Nie znaleziono meczów dla &quot;{search}&quot;
        </p>
      )}

      <p className="mt-6 text-center text-xs text-brand-muted">
        Termin oraz godzina meczu może ulec zmianie
      </p>
    </>
  );
}