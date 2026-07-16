"use client";

import { useState, useMemo } from "react";
import type { PlayerStats, Player } from "../../lib/types";

type SortKey = "number" | "name" | "position" | "mecze" | "gole" | "asysty" | "minuty" | "zolteKartki" | "czerwoneKartki" | "czysteKonta";

const columns: { key: SortKey; label: string }[] = [
  { key: "number", label: "Nr" },
  { key: "name", label: "Zawodnik" },
  { key: "position", label: "Pozycja" },
  { key: "mecze", label: "Mecze" },
  { key: "gole", label: "Gole" },
  { key: "asysty", label: "Asysty" },
  { key: "minuty", label: "Minuty" },
  { key: "zolteKartki", label: "Żółte" },
  { key: "czerwoneKartki", label: "Czerwone" },
  { key: "czysteKonta", label: "Czyste konta" },
];

// Wyciąga ostatni wyraz z pełnego imienia i nazwiska (zakłada, że nazwisko jest na końcu)
function getLastName(fullName: string): string {
  const parts = fullName.trim().split(" ");
  return parts[parts.length - 1];
}

export default function PlayerStatsTable({
  players,
  allPlayerStats,
  onSelectPlayer,
}: {
  players: Player[];
  allPlayerStats: Record<string, PlayerStats>;
  onSelectPlayer: (player: Player) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("gole");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const rows = useMemo(() => {
    return players.map((player) => {
      const stats = allPlayerStats[player.name] ?? {
        name: player.name,
        mecze: 0,
        gole: 0,
        asysty: 0,
        minuty: 0,
        zolteKartki: 0,
        czerwoneKartki: 0,
        czysteKonta: 0,
      };
      return { player, stats };
    });
  }, [players, allPlayerStats]);

  const sortedRows = useMemo(() => {
    const sorted = [...rows].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      if (sortKey === "name") {
        aVal = getLastName(a.player.name);
        bVal = getLastName(b.player.name);
      } else if (sortKey === "position") {
        aVal = a.player.position;
        bVal = b.player.position;
      } else if (sortKey === "number") {
        aVal = a.player.number;
        bVal = b.player.number;
      } else {
        aVal = a.stats[sortKey];
        bVal = b.stats[sortKey];
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortDirection === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return sorted;
  }, [rows, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection(key === "name" || key === "position" || key === "number" ? "asc" : "desc");
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-surface">
      <table className="w-full min-w-190 border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-border">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-brand-muted transition-colors hover:text-white"
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <span className="text-brand-red">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map(({ player, stats }) => (
            <tr
              key={player._id}
              onClick={() => onSelectPlayer(player)}
              className="cursor-pointer border-b border-brand-border/50 transition-colors last:border-b-0 hover:bg-brand-black/40"
            >
              <td className="whitespace-nowrap px-4 py-3 text-brand-red font-bebas text-lg">
                {player.number}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="font-medium text-white">{player.name}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-brand-muted">{player.position}</td>
              <td className="px-4 py-3 text-white/80">{stats.mecze}</td>
              <td className="px-4 py-3 font-bebas text-lg text-brand-red">{stats.gole}</td>
              <td className="px-4 py-3 text-white/80">{stats.asysty}</td>
              <td className="px-4 py-3 text-white/80">{stats.minuty}&apos;</td>
              <td className="px-4 py-3 text-yellow-400">{stats.zolteKartki}</td>
              <td className="px-4 py-3 text-red-500">{stats.czerwoneKartki}</td>
              <td className="px-4 py-3 text-blue-400">
                {player.position === "Bramkarz" ? stats.czysteKonta : "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}