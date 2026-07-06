"use client";

import { useState } from "react";
import seasons from "../../data/seasons.json";

export default function StatsBar() {
  const [selectedId, setSelectedId] = useState(seasons[1].id);
  const season = seasons.find((s) => s.id === selectedId)!;
  const s = season.stats;

  return (
    <section className="border-y border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-center justify-between border-b border-brand-border px-6 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-muted">
            {season.league}
          </p>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="rounded-md border border-brand-border bg-brand-black px-3 py-1.5 text-xs uppercase tracking-wide text-white focus:outline-none focus:border-brand-red cursor-pointer"
          >
            {seasons.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 divide-x divide-brand-border md:grid-cols-6">
          {[
            { value: s.miejsce, label: "Miejsce" },
            { value: s.mecze, label: "Mecze" },
            { value: s.zwycięstwa, label: "Zwycięstwa" },
            { value: s.remisy, label: "Remisy" },
            { value: s.porażki, label: "Porażki" },
            { value: s.punkty, label: "Punkty" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-5 text-center"
            >
              <span className="font-bebas text-4xl leading-none text-brand-red">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-brand-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 divide-x divide-brand-border border-t border-brand-border md:grid-cols-4">
          {[
            { value: `${s.goleZdobyte}:${s.goleStracone}`, label: "Bramki" },
            { value: s.srednioNaMecz, label: "Śr. na mecz" },
            { value: s.uSiebie, label: "U siebie (Z-R-P)" },
            { value: s.naWyjezdzie, label: "Na wyjeździe (Z-R-P)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-4 text-center"
            >
              <span className="font-bebas text-2xl leading-none text-white">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-brand-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 divide-x divide-brand-border border-t border-brand-border">
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="text-xl">⚽</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted">
                Król strzelców
              </p>
              <p className="font-bebas text-lg text-brand-red leading-tight">
                {s.krolStrzelcow}
              </p>
              <p className="text-xs text-white/50">{s.krolStrzelcowBramki} bramek</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="text-xl">👟</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted">
                Król asyst
              </p>
              <p className="font-bebas text-lg text-brand-red leading-tight">
                {s.krolAsyst}
              </p>
              <p className="text-xs text-white/50">{s.krolAsystLiczba} asyst</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}