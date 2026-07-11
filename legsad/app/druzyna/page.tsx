"use client";

import { useState } from "react";
import staff from "../../data/staff.json";
import players from "../../data/players.json";
import { computePlayerStats, PlayerStats } from "../../lib/stats";

const positionOrder = ["Bramkarz", "Obrońca", "Pomocnik", "Napastnik"];
const positionLabel: Record<string, string> = {
  "Bramkarz": "Bramkarze",
  "Obrońca": "Obrońcy",
  "Pomocnik": "Pomocnicy",
  "Napastnik": "Napastnicy",
};

const allPlayerStats = computePlayerStats();

type Player = (typeof players)[0];

function PlayerCard({
  name,
  photo,
  number,
  role,
  onClick,
}: {
  name: string;
  photo: string;
  number?: number;
  role?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface ${
        onClick ? "cursor-pointer transition-colors hover:border-brand-red" : ""
      }`}
    >
      <div className="absolute right-0 top-0 opacity-10">
        <img src="/images/logo-white.png" alt="" className="h-36 w-36 object-contain" />
      </div>

      {number && (
        <span className="absolute right-3 top-3 z-10 font-bebas text-3xl text-brand-red">
          {number}
        </span>
      )}

      <div className="relative z-10 flex h-48 items-end justify-center overflow-hidden">
        <img
          src={`/images/players/${photo}`}
          alt={name}
          className="h-48 w-auto object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="relative z-10 border-t border-brand-border bg-brand-black/60 px-4 py-3 text-center">
        <p className="font-bebas text-lg leading-tight text-white">{name}</p>
        {role && <p className="text-[10px] uppercase tracking-widest text-brand-muted">{role}</p>}
      </div>
    </div>
  );
}

function PlayerModal({
  player,
  stats,
  onClose,
}: {
  player: Player;
  stats: PlayerStats;
  onClose: () => void;
}) {
  const s = stats;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-brand-border bg-brand-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ZAMKNIJ */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/60 hover:text-white"
          aria-label="Zamknij"
        >
          ✕
        </button>

        {/* HEADER ZE ZDJĘCIEM */}
        <div className="relative overflow-hidden rounded-t-2xl bg-brand-black">
          <div className="absolute right-0 top-0 opacity-10">
            <img src="/images/logo-white.png" alt="" className="h-40 w-40 object-contain" />
          </div>
          {player.number && (
            <span className="absolute right-4 top-4 z-10 font-bebas text-4xl text-brand-red">
              {player.number}
            </span>
          )}
          <div className="relative z-10 flex h-56 items-end justify-center">
            <img
              src={`/images/players/${player.photoModal}`}
              alt={player.name}
              className="h-56 w-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* NAZWA */}
        <div className="border-b border-brand-border px-6 py-4 text-center">
          <p className="font-bebas text-2xl text-white">{player.name}</p>
          <p className="text-xs uppercase tracking-widest text-brand-muted">{player.position}</p>
        </div>

        {/* STATYSTYKI */}
        <div className="grid grid-cols-3 divide-x divide-brand-border">
          {[
            { value: s.mecze, label: "Mecze" },
            { value: s.gole, label: "Gole" },
            { value: s.asysty, label: "Asysty" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-4">
              <span className="font-bebas text-3xl text-brand-red">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-muted">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 divide-x divide-brand-border border-t border-brand-border">
          <div className="flex flex-col items-center py-4">
            <span className="font-bebas text-2xl text-white">{s.minuty}&apos;</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-muted">Minuty</span>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="font-bebas text-2xl text-yellow-400">{s.zolteKartki}</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-muted">Żółte kartki</span>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="font-bebas text-2xl text-red-500">{s.czerwoneKartki}</span>
            <span className="text-[8px] uppercase tracking-widest text-brand-muted">Czerwone kartki</span>
          </div>
        </div>

        {player.position === "Bramkarz" && (
          <div className="grid grid-cols-1 border-t border-brand-border">
            <div className="flex flex-col items-center py-4">
              <span className="font-bebas text-2xl text-blue-400">{s.czysteKonta}</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-muted">Czyste konta</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function DruzynaPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Sezon 2026/2027
          </p>
          <h1 className="font-bebas text-5xl text-white md:text-6xl">
            Nasza Kadra
          </h1>
        </div>

        <div className="mb-14">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-brand-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              Sztab szkoleniowy
            </span>
            <div className="h-px w-8 bg-brand-border" />
          </div>
          <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
            {staff.map((member) => (
              <PlayerCard
                key={member.id}
                name={member.name}
                photo={member.photo}
                role={member.role}
              />
            ))}
          </div>
        </div>

        {positionOrder.map((position) => {
          const group = players.filter((p) => p.position === position);
          if (group.length === 0) return null;

          return (
            <div key={position} className="mb-14">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-brand-border" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                  {positionLabel[position]}
                </span>
                <div className="h-px w-8 bg-brand-border" />
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {group.map((player) => (
                  <div
                    key={player.id}
                    className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.75rem)]"
                  >
                    <PlayerCard
                      name={player.name}
                      photo={player.photoCard}
                      number={player.number}
                      onClick={() => setSelectedPlayer(player)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>

      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          stats={
            allPlayerStats[selectedPlayer.name] ?? {
              name: selectedPlayer.name,
              mecze: 0,
              gole: 0,
              asysty: 0,
              minuty: 0,
              zolteKartki: 0,
              czerwoneKartki: 0,
              czysteKonta: 0,
            }
          }
          onClose={() => setSelectedPlayer(null)}
        />
      )}

    </main>
  );
}