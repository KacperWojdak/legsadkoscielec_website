"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { PlayerStats, Player } from "../../lib/types";
import { urlFor } from "../../lib/sanity";

export default function PlayerModal({
  player,
  stats,
  onClose,
}: {
  player: Player;
  stats: PlayerStats;
  onClose: () => void;
}) {
  const s = stats;

  const imageSource = player.photoModal ?? player.photoCard;
  const imageUrl = imageSource ? urlFor(imageSource).width(400).url() : "/images/logo-white.png";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/60 hover:text-white"
          aria-label="Zamknij"
        >
          ✕
        </button>

        <div className="relative overflow-hidden rounded-t-2xl bg-brand-black">
          <div className="absolute right-0 top-0 opacity-10">
            <Image src="/images/logo-white.png" alt="" width={140} height={140} className="object-contain" />
          </div>
          {player.number && (
            <span className="absolute right-4 bottom-1 z-10 font-bebas text-5xl text-brand-red">
              {player.number}
            </span>
          )}
          <div className="relative z-10 flex h-64 items-end justify-center">
            <div className="relative h-64 w-64">
              <Image
                src={imageUrl}
                alt={player.name}
                fill
                sizes="256px"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-brand-border px-6 py-5 text-center">
          <p className="font-bebas text-3xl text-white">{player.name}</p>
          <p className="text-xs uppercase tracking-widest text-brand-muted">{player.position}</p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-brand-border">
          {[
            { value: s.mecze, label: "Mecze" },
            { value: s.gole, label: "Gole" },
            { value: s.asysty, label: "Asysty" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-5">
              <span className="font-bebas text-4xl text-brand-red">{stat.value}</span>
              <span className="text-[11px] uppercase tracking-widest text-brand-muted">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 divide-x divide-brand-border border-t border-brand-border">
          <div className="flex flex-col items-center py-5">
            <span className="font-bebas text-3xl text-white">{s.minuty}&apos;</span>
            <span className="text-[11px] uppercase tracking-widest text-brand-muted">Minuty</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className="font-bebas text-3xl text-yellow-400">{s.zolteKartki}</span>
            <span className="text-[11px] uppercase tracking-widest text-brand-muted">Żółte kartki</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className="font-bebas text-3xl text-red-500">{s.czerwoneKartki}</span>
            <span className="text-[9px] uppercase tracking-widest text-brand-muted">Czerwone kartki</span>
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

      </motion.div>
    </motion.div>
  );
}