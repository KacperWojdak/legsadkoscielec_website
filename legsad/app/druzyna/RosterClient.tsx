"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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

function PlayerCard({
  name,
  photo,
  number,
  role,
  onClick,
}: {
  name: string;
  photo: any;
  number?: number;
  role?: string;
  onClick?: () => void;
}) {
  const imageUrl = photo ? urlFor(photo).width(300).url() : "/images/logo-white.png";

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface ${
        onClick ? "cursor-pointer transition-colors hover:border-brand-red" : ""
      }`}
    >
      <div className="absolute right-0 top-0 opacity-10">
        <img src="/images/logo-white.png" alt="" className="h-40 w-40 object-contain" />
      </div>

      {number && (
        <span className="absolute right-3 top-3 z-10 font-bebas text-4xl text-brand-red">
          {number}
        </span>
      )}

      <div className="relative z-10 flex h-56 items-end justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-56 w-auto object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="relative z-10 border-t border-brand-border bg-brand-black/60 px-4 py-4 text-center">
        <p className="font-bebas text-xl leading-tight text-white">{name}</p>
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

      {/* PRZEŁĄCZNIK WIDOKU */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-brand-border" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Skład drużyny
        </span>
        <div className="h-px w-8 bg-brand-border" />
      </div>
      <div className="mb-10 flex justify-center gap-2">
        <button
          onClick={() => setView("cards")}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
            view === "cards"
              ? "bg-brand-red text-white"
              : "border border-brand-border text-brand-muted hover:text-white"
          }`}
        >
          Zawodnicy
        </button>
        <button
          onClick={() => setView("table")}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
            view === "table"
              ? "bg-brand-red text-white"
              : "border border-brand-border text-brand-muted hover:text-white"
          }`}
        >
          Tabela statystyk
        </button>
      </div>

      {view === "table" ? (
        <div className="mb-14">
          <PlayerStatsTable
            players={players}
            allPlayerStats={allPlayerStats}
            onSelectPlayer={setSelectedPlayer}
          />
        </div>
      ) : (
        positionOrder.map((position) => {
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