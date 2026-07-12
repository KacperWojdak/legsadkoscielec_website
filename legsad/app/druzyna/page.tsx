"use client";

import { useState } from "react";
import staff from "../../data/staff.json";
import players from "../../data/players.json";
import { computePlayerStats } from "../../lib/stats";
import PlayerModal from "../components/PlayerModal";
import PageHeaderAccent from "../components/PageHeaderAccent";

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

export default function DruzynaPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-bl from-brand-crimson/20 to-brand-black pt-32 pb-20">
    <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">
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