"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import PlayerModal from "../components/PlayerModal";
import PlayerStatsTable from "./PlayerStatsTable";
import { urlFor } from "../../lib/sanity";
import type { PlayerStats, Player, StaffMember } from "../../lib/types";

const positionOrder = ["Bramkarz", "Obrońca", "Pomocnik", "Napastnik"];
const positionLabel: Record<string, string> = {
  "Bramkarz": "Bramkarze",
  "Obrońca": "Obrońcy",
  "Pomocnik": "Pomocnicy",
  "Napastnik": "Napastnicy",
};
const badgeColors: Record<string, string> = {
  red: "bg-red-900/40 text-red-400 border-red-800/60",
  yellow: "bg-yellow-900/40 text-yellow-400 border-yellow-800/60",
  green: "bg-green-900/40 text-green-400 border-green-800/60",
  blue: "bg-blue-900/40 text-blue-400 border-blue-800/60",
  purple: "bg-purple-900/40 text-purple-400 border-purple-800/60",
  gray: "bg-white/10 text-white/60 border-white/20",
};

function PlayerCard({
  name,
  photo,
  number,
  role,
  nationality,
  badges,
  onClick,
}: {
  name: string;
  photo: any;
  number?: number;
  role?: string;
  nationality?: string;
  badges?: { label: string; color: string }[];
  onClick?: () => void;
}) {
  const imageUrl = photo ? urlFor(photo).width(300).url() : "/images/logo-white.png";

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface transition-all duration-300 ${
        onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-red/20" : ""
      }`}
    >
      {/* RAMKA HOVER */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl border-2 border-brand-red opacity-0 transition-all duration-800 ease-out [clip-path:circle(0%_at_50%_0%)] group-hover:opacity-100 group-hover:[clip-path:circle(150%_at_50%_0%)]" />

      {/* WATERMARK */}
      <div className="absolute right-0 top-0 h-36 w-36 opacity-10">
        <img src="/images/logo-white.png" alt="" className="h-full w-full object-contain" />
      </div>
      <div className="absolute right-0 top-0 h-36 w-36 opacity-0 transition-all duration-800 ease-out [clip-path:circle(0%_at_50%_50%)] group-hover:opacity-60 group-hover:[clip-path:circle(75%_at_50%_50%)]">
        <img src="/images/logo-pink.png" alt="" className="h-full w-full object-contain" />
      </div>

      {number && (
        <span className="absolute right-3 top-3 z-10 font-bebas text-3xl text-brand-red">
          {number}
        </span>
      )}

      <div className="relative z-10 h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* ODZNAKI */}
      {badges && badges.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-1 border-t border-brand-border bg-brand-black/60 px-2 py-1.5">
          {badges.map((badge, i) => (
            <span
              key={i}
              className={`rounded-md border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide ${badgeColors[badge.color] ?? badgeColors.gray}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 border-t border-brand-border bg-brand-black/60 px-4 py-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          {nationality && (
            <span className={`fi fi-${nationality.toLowerCase()} shrink-0 rounded-xs`} style={{ fontSize: "0.85em" }} />
          )}
          <p className="font-bebas text-xl leading-tight text-white">{name}</p>
        </div>
        {role && <p className="text-[11px] uppercase tracking-widest text-brand-muted">{role}</p>}
      </div>
    </div>
  );
}

export default function RosterClient({
  players,
  staff,
  allPlayerStats,
}: {
  players: Player[];
  staff: StaffMember[];
  allPlayerStats: Record<string, PlayerStats>;
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [positionFilter, setPositionFilter] = useState<string>("Wszyscy");

  const filteredPositions =
    positionFilter === "Wszyscy" ? positionOrder : [positionFilter];

  return (
    <>
      <div className="mb-14">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-brand-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Sztab szkoleniowy
          </span>
          <div className="h-px w-8 bg-brand-border" />
        </div>
        <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
          {staff.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <PlayerCard
                name={member.name}
                photo={member.photo}
                role={member.role}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-brand-border" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Skład drużyny
        </span>
        <div className="h-px w-8 bg-brand-border" />
      </div>
      <div className="mb-6 flex justify-center gap-2">
        <button
          onClick={() => setView("cards")}
          className={`flex min-h-12 items-center rounded-lg px-5 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
            view === "cards"
              ? "bg-brand-red text-white"
              : "border border-brand-border text-brand-muted hover:text-white"
          }`}
        >
          Zawodnicy
        </button>
        <button
          onClick={() => setView("table")}
          className={`flex min-h-12 items-center rounded-lg px-5 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
            view === "table"
              ? "bg-brand-red text-white"
              : "border border-brand-border text-brand-muted hover:text-white"
          }`}
        >
          Tabela statystyk
        </button>
      </div>

      {view === "cards" && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {["Wszyscy", ...positionOrder].map((pos) => (
            <button
              key={pos}
              onClick={() => setPositionFilter(pos)}
              className={`flex min-h-10 items-center rounded-lg px-4 text-xs font-medium uppercase tracking-wide transition-colors cursor-pointer ${
                positionFilter === pos
                  ? "bg-brand-red text-white"
                  : "border border-brand-border text-brand-muted hover:text-white"
              }`}
            >
              {pos === "Wszyscy" ? "Wszyscy" : positionLabel[pos]}
            </button>
          ))}
        </div>
      )}

      {view === "table" ? (
        <div className="mb-14">
          <PlayerStatsTable
            players={players}
            allPlayerStats={allPlayerStats}
            onSelectPlayer={setSelectedPlayer}
          />
        </div>
      ) : (
        filteredPositions.map((position) => {
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
                {group.map((player, index) => (
                  <motion.div
                    key={player._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: (index % 4) * 0.08, ease: "easeOut" }}
                    className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.75rem)]"
                  >
                    <PlayerCard
                      name={player.name}
                      photo={player.photoCard}
                      number={player.number}
                      nationality={player.nationality}
                      badges={player.badges}
                      onClick={() => setSelectedPlayer(player)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })
      )}

      <AnimatePresence>
        {selectedPlayer && (
          <PlayerModal
            key={selectedPlayer._id}
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
      </AnimatePresence>
    </>
  );
}