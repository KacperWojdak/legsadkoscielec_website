"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { PlayerStats, Player } from "../../lib/types";
import { urlFor } from "../../lib/sanity";

const badgeColors: Record<string, string> = {
  red: "bg-red-900/40 text-red-400 border-red-800/60",
  yellow: "bg-yellow-900/40 text-yellow-400 border-yellow-800/60",
  green: "bg-green-900/40 text-green-400 border-green-800/60",
  blue: "bg-blue-900/40 text-blue-400 border-blue-800/60",
  purple: "bg-purple-900/40 text-purple-400 border-purple-800/60",
  gray: "bg-white/10 text-white/60 border-white/20",
};

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatBirthDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function PlayerModal({
  player,
  stats,
  onClose,
}: {
  player: Player;
  stats: PlayerStats;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"stats" | "profile">("stats");
  const s = stats;

  useEffect(() => {
  document.body.style.overflow = "hidden";
  window.history.pushState({ modal: true }, "");

  const handlePopState = () => {
    onClose();
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("popstate", handlePopState);
  };
}, []);

  const imageSource = player.photoModal ?? player.photoCard;
  const imageUrl = imageSource ? urlFor(imageSource).width(400).url() : "/images/logo-white.png";

  const statRows = [
    { label: "Mecze", value: s.mecze, color: "text-white" },
    { label: "Gole", value: s.gole, color: "text-brand-red" },
    { label: "Asysty", value: s.asysty, color: "text-white" },
    { label: "Minuty", value: `${s.minuty}'`, color: "text-white" },
    { label: "Żółte kartki", value: s.zolteKartki, color: "text-yellow-400" },
    { label: "Czerwone kartki", value: s.czerwoneKartki, color: "text-red-500" },
  ];

  if (player.position === "Bramkarz") {
    statRows.push({ label: "Czyste konta", value: s.czysteKonta, color: "text-blue-400" });
  }

  const hasProfileData =
    player.birthDate || player.height || player.weight || player.nationality || (player.careerHistory && player.careerHistory.length > 0) || player.memberSince;

  const handleClose = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface md:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/60 hover:text-white"
          aria-label="Zamknij"
        >
          ✕
        </button>

        <div className="flex flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">

          {/* LEWA STRONA — zdjęcie + nazwa + numer */}
          <div className="relative flex shrink-0 flex-col items-center overflow-hidden bg-brand-black px-6 py-8 md:w-72">
            <div className="absolute right-0 top-0 opacity-10">
              <Image src="/images/logo-white.png" alt="" width={160} height={160} className="h-40 w-40 object-contain" />
            </div>
            <div className="relative z-10 mb-4 h-80 w-full">
              <Image
                src={imageUrl}
                alt={player.name}
                fill
                sizes="288px"
                className="object-contain"
              />
            </div>
            {player.number && (
              <span className="relative z-10 font-bebas text-6xl leading-none text-brand-red">
                {player.number}
              </span>
            )}
            <p className="relative z-10 mt-2 text-center font-bebas text-2xl leading-tight text-white">
              {player.name}
            </p>
            <p className="relative z-10 text-xs uppercase tracking-widest text-brand-muted">
              {player.position}
            </p>

            {player.badges && player.badges.length > 0 && (
              <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-1.5">
                {player.badges.map((badge: any, i: number) => (
                  <span
                    key={i}
                    className={`rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${badgeColors[badge.color] ?? badgeColors.gray}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* PRAWA STRONA — przełącznik + treść */}
          <div className="flex flex-1 flex-col md:overflow-y-auto">

            <div className="flex border-b border-brand-border">
              <button
                onClick={() => setTab("stats")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                  tab === "stats" ? "border-b-2 border-brand-red text-white" : "text-brand-muted hover:text-white"
                }`}
              >
                Statystyki sezonu
              </button>
              <button
                onClick={() => setTab("profile")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                  tab === "profile" ? "border-b-2 border-brand-red text-white" : "text-brand-muted hover:text-white"
                }`}
              >
                Dane zawodnika
              </button>
            </div>

            {tab === "stats" ? (
              <div className="flex flex-col divide-y divide-brand-border">
                {statRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-6 py-3">
                    <span className="text-xs uppercase tracking-widest text-brand-muted">
                      {row.label}
                    </span>
                    <span className={`font-bebas text-2xl ${row.color}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-brand-border">
                {player.nationality && (
                  <div className="flex items-center justify-between px-6 py-3">
                    <span className="text-xs uppercase tracking-widest text-brand-muted">
                      Narodowość
                    </span>
                    <span className="flex items-center gap-2">
                      <span className={`fi fi-${player.nationality.toLowerCase()} rounded-sm`} style={{ fontSize: "1.3em" }} />
                      <span className="text-sm font-medium text-white">{player.nationality.toUpperCase()}</span>
                    </span>
                  </div>
                )}
                {player.birthDate && (
                  <div className="flex items-center justify-between px-6 py-3">
                    <span className="text-xs uppercase tracking-widest text-brand-muted">
                      Data urodzenia
                    </span>
                    <span className="text-sm font-medium text-white">
                      {formatBirthDate(player.birthDate)} <span className="text-brand-muted">({calculateAge(player.birthDate)} lat)</span>
                    </span>
                  </div>
                )}
                {player.careerHistory && player.careerHistory.length > 0 && (
                <div className="px-6 py-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-brand-muted">
                    Historia kariery
                  </p>
                  <div className="flex flex-col gap-2">
                    {player.careerHistory.map((entry: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-white">{entry.club}</span>
                          {entry.league && (
                            <span className="ml-2 text-xs text-brand-muted">({entry.league})</span>
                          )}
                        </div>
                        <span className="shrink-0 text-xs text-brand-muted">{entry.season}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                {player.memberSince && (
                  <div className="flex items-center justify-between px-6 py-3">
                    <span className="text-xs uppercase tracking-widest text-brand-muted">
                      W klubie od
                    </span>
                    <span className="text-sm font-medium text-white">{player.memberSince}</span>
                  </div>
                )}
                {!hasProfileData && (
                  <div className="px-6 py-8 text-center text-sm text-brand-muted">
                    Brak dodatkowych danych o zawodniku.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}