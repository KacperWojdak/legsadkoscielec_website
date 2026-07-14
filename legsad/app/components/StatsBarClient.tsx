"use client";

import { useState } from "react";
import { computeSeasonStats, computePlayerStats, getTopByStat, pluralizeBramki, pluralizeAsysty, type SanityMatch } from "../../lib/stats";

type Season = {
  _id: string;
  label: string;
  league: string;
  isCurrent: boolean;
  miejsce?: string;
  historicalStats?: {
    mecze?: number;
    zwyciestwa?: number;
    remisy?: number;
    porazki?: number;
    goleZdobyte?: number;
    goleStracone?: number;
    punkty?: number;
    uSiebie?: string;
    uSiebieGole?: string;
    naWyjezdzie?: string;
    naWyjezdzieGole?: string;
    krolStrzelcow?: string;
    krolStrzelcowBramki?: number;
    krolAsyst?: string;
    krolAsystLiczba?: number;
  };
};

export default function StatsBarClient({
  seasons,
  matchesBySeasonId,
}: {
  seasons: Season[];
  matchesBySeasonId: Record<string, SanityMatch[]>;
}) {
  const currentSeason = seasons.find((s) => s.isCurrent) ?? seasons[0];
  const [selectedId, setSelectedId] = useState(currentSeason._id);
  const season = seasons.find((s) => s._id === selectedId)!;

  const isCurrentSeason = season.isCurrent;
  const matches = matchesBySeasonId[selectedId] ?? [];

  const computed = isCurrentSeason ? computeSeasonStats(matches) : null;
  const playerStats = isCurrentSeason ? computePlayerStats(matches) : null;
  const topScorer = playerStats ? getTopByStat(playerStats, "gole") : null;
  const topAssist = playerStats ? getTopByStat(playerStats, "asysty") : null;

  const hist = season.historicalStats;

  const s = isCurrentSeason && computed
    ? {
        miejsce: season.miejsce ?? "-",
        mecze: String(computed.mecze),
        zwycięstwa: String(computed.zwycięstwa),
        remisy: String(computed.remisy),
        porażki: String(computed.porażki),
        goleZdobyte: String(computed.goleZdobyte),
        goleStracone: String(computed.goleStracone),
        punkty: String(computed.punkty),
        srednioNaMecz: computed.srednioNaMecz,
        uSiebie: computed.uSiebie,
        uSiebieGole: computed.uSiebieGole,
        naWyjezdzie: computed.naWyjezdzie,
        naWyjezdieGole: computed.naWyjezdieGole,
        krolStrzelcow: topScorer && topScorer.names.length > 0 ? topScorer.names.join(", ") : "-",
        krolStrzelcowBramki: topScorer ? String(topScorer.value) : "0",
        krolAsyst: topAssist && topAssist.names.length > 0 ? topAssist.names.join(", ") : "-",
        krolAsystLiczba: topAssist ? String(topAssist.value) : "0",
      }
    : {
        miejsce: season.miejsce ?? "-",
        mecze: String(hist?.mecze ?? 0),
        zwycięstwa: String(hist?.zwyciestwa ?? 0),
        remisy: String(hist?.remisy ?? 0),
        porażki: String(hist?.porazki ?? 0),
        goleZdobyte: String(hist?.goleZdobyte ?? 0),
        goleStracone: String(hist?.goleStracone ?? 0),
        punkty: String(hist?.punkty ?? 0),
        srednioNaMecz: hist?.mecze ? ((hist.goleZdobyte ?? 0) / hist.mecze).toFixed(2) : "-",
        uSiebie: hist?.uSiebie ?? "-",
        uSiebieGole: hist?.uSiebieGole ?? "-",
        naWyjezdzie: hist?.naWyjezdzie ?? "-",
        naWyjezdieGole: hist?.naWyjezdzieGole ?? "-",
        krolStrzelcow: hist?.krolStrzelcow ?? "-",
        krolStrzelcowBramki: String(hist?.krolStrzelcowBramki ?? 0),
        krolAsyst: hist?.krolAsyst ?? "-",
        krolAsystLiczba: String(hist?.krolAsystLiczba ?? 0),
      };

  return (
    <section className="border-y border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-center justify-between border-b border-brand-border px-6 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Statystyki sezonu
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-wide text-brand-muted">
              {season.league}
            </p>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="rounded-md border border-brand-border bg-brand-black px-3 py-1.5 text-xs uppercase tracking-wide text-white focus:outline-none focus:border-brand-red cursor-pointer"
            >
              {seasons.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-y divide-brand-border md:grid-cols-6 md:divide-y-0">
          {[
            { value: s.miejsce, label: "Miejsce" },
            { value: s.mecze, label: "Mecze" },
            { value: s.zwycięstwa, label: "Zwycięstwa" },
            { value: s.remisy, label: "Remisy" },
            { value: s.porażki, label: "Porażki" },
            { value: s.punkty, label: "Punkty" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center px-4 py-5 text-center">
              <span className="font-bebas text-4xl leading-none text-brand-red">{stat.value}</span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-brand-muted">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-brand-border border-t border-brand-border md:grid-cols-4 md:divide-y-0">
          {[
            { value: `${s.goleZdobyte}:${s.goleStracone}`, label: "Bramki" },
            { value: s.srednioNaMecz, label: "Śr. na mecz" },
            { value: s.uSiebie, label: "U siebie (W-R-P)" },
            { value: s.naWyjezdzie, label: "Na wyjeździe (W-R-P)" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center px-4 py-4 text-center">
              <span className="font-bebas text-2xl leading-none text-white">{stat.value}</span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-brand-muted">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 divide-y divide-brand-border border-t border-brand-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="text-xl">⚽</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted">Król strzelców</p>
              <p className="font-bebas text-lg leading-tight text-brand-red">{s.krolStrzelcow}</p>
              <p className="text-xs text-white/50">
                {s.krolStrzelcowBramki} {pluralizeBramki(Number(s.krolStrzelcowBramki))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="text-xl">👟</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted">Król asyst</p>
              <p className="font-bebas text-lg leading-tight text-brand-red">{s.krolAsyst}</p>
              <p className="text-xs text-white/50">
                {s.krolAsystLiczba} {pluralizeAsysty(Number(s.krolAsystLiczba))}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}