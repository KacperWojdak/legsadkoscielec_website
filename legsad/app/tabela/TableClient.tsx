"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "../../lib/sanity";
import type { ComputedTableRow } from "../../lib/leagueTable";

const zoneBadge: Record<string, string> = {
  promotion: "bg-green-900/40 text-green-400",
  relegation: "bg-red-900/40 text-red-400",
  playoff: "bg-yellow-900/40 text-yellow-400",
  none: "text-white/70",
};

const zoneColor: Record<string, string> = {
  promotion: "border-green-500/70",
  relegation: "border-red-500/70",
  playoff: "border-yellow-500/70",
  none: "",
};

const zoneCardBorder: Record<string, string> = {
  promotion: "border-green-500/70",
  relegation: "border-red-500/70",
  playoff: "border-yellow-500/70",
  none: "border-brand-border",
};

const resultColor: Record<string, string> = {
  W: "bg-green-900/50 text-green-400",
  P: "bg-red-900/50 text-red-400",
  R: "bg-yellow-900/50 text-yellow-400",
};

function zoneCellClasses(zone: string, position: "first" | "middle" | "last") {
  const color = zoneColor[zone];
  if (!color) return "";
  if (position === "first") return `border-y-1 border-l-2 ${color}`;
  if (position === "last") return `border-y-1 border-r-2 ${color}`;
  return `border-y-1 ${color}`;
}

function TeamLogo({ logo }: { logo: any }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
      {logo ? (
        <Image
          src={urlFor(logo).width(28).height(28).url()}
          alt=""
          width={22}
          height={22}
          className="h-5.5 w-5.5 object-contain"
        />
      ) : (
        <span className="h-4 w-4 rounded-full bg-brand-border" />
      )}
    </div>
  );
}

function FormSquares({ form }: { form: ("W" | "R" | "P")[] }) {
  if (form.length === 0) {
    return <span className="text-xs text-brand-muted">—</span>;
  }
  return (
    <div className="flex items-center gap-1">
      {form.slice(0, 5).map((result, i) => (
        <span
          key={i}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[10px] font-bold ${resultColor[result]}`}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

export default function TableClient({
  rows
}: {
  rows: ComputedTableRow[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden overflow-x-auto rounded-2xl border border-brand-border bg-brand-surface md:block">
        <table className="w-full min-w-176 border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-border text-left text-xs uppercase tracking-widest text-brand-muted">
              <th className="px-3 py-3 text-center">#</th>
              <th className="px-3 py-3">Drużyna</th>
              <th className="px-3 py-3 text-center">M</th>
              <th className="px-3 py-3 text-center">W</th>
              <th className="px-3 py-3 text-center">R</th>
              <th className="px-3 py-3 text-center">P</th>
              <th className="px-3 py-3 text-center">Bramki</th>
              <th className="px-3 py-3 text-center">Bilans</th>
              <th className="px-3 py-3 text-center">Pkt</th>
              <th className="px-3 py-3 text-center">Forma</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.team._id}
                className={`border-b border-brand-border/60 last:border-0 ${
                  row.isLegsad ? "bg-brand-red/10" : ""
                }`}
              >
                <td className={`px-3 py-3 text-center ${zoneCellClasses(row.zoneStatus, "first")}`}>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold ${zoneBadge[row.zoneStatus]}`}>
                    {i + 1}
                  </span>
                </td>
                <td className={`px-3 py-3 ${zoneCellClasses(row.zoneStatus, "middle")}`}>
                  <div className="flex items-center gap-2">
                    <TeamLogo logo={row.team.logo} />
                    <span className={`font-medium ${row.isLegsad ? "text-white" : "text-white/80"}`}>
                      {row.team.name}
                    </span>
                  </div>
                </td>
                <td className={`px-3 py-3 text-center text-white/70 ${zoneCellClasses(row.zoneStatus, "middle")}`}>{row.matchesPlayed}</td>
                <td className={`px-3 py-3 text-center text-white/70 ${zoneCellClasses(row.zoneStatus, "middle")}`}>{row.wins}</td>
                <td className={`px-3 py-3 text-center text-white/70 ${zoneCellClasses(row.zoneStatus, "middle")}`}>{row.draws}</td>
                <td className={`px-3 py-3 text-center text-white/70 ${zoneCellClasses(row.zoneStatus, "middle")}`}>{row.losses}</td>
                <td className={`px-3 py-3 text-center text-white/70 ${zoneCellClasses(row.zoneStatus, "middle")}`}>
                  {row.goalsFor}:{row.goalsAgainst}
                </td>
                <td className={`px-3 py-3 text-center text-white/70 ${zoneCellClasses(row.zoneStatus, "middle")}`}>
                  {row.goalDifference > 0 ? "+" : ""}
                  {row.goalDifference}
                </td>
                <td className={`px-3 py-3 text-center font-bebas text-lg text-white ${zoneCellClasses(row.zoneStatus, "middle")}`}>{row.points}</td>
                <td className={`px-3 py-3 ${zoneCellClasses(row.zoneStatus, "last")}`}>
                  <div className="flex items-center justify-center">
                    <FormSquares form={row.form} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col gap-2 md:hidden">
        {rows.map((row, i) => {
          const isOpen = expanded === row.team._id;
          return (
            <div
              key={row.team._id}
              className={`overflow-hidden rounded-xl border-2 bg-brand-surface ${zoneCardBorder[row.zoneStatus]} ${
                row.isLegsad ? "bg-brand-red/10" : ""
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : row.team._id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span className={`flex shrink-0 items-center gap-1 text-xs font-bold ${zoneBadge[row.zoneStatus]}`}>
                  {i + 1}.
                </span>
                <TeamLogo logo={row.team.logo} />
                <span className={`flex-1 truncate text-sm font-medium ${row.isLegsad ? "text-white" : "text-white/80"}`}>
                  {row.team.name}
                </span>
                <span className={`shrink-0 text-brand-muted transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="flex flex-col divide-y divide-brand-border/60 border-t border-brand-border/60 bg-brand-black/30 px-4">
                  {[
                    { label: "Mecze", value: row.matchesPlayed },
                    { label: "Punkty", value: row.points },
                    { label: "Wygrane", value: row.wins },
                    { label: "Remisy", value: row.draws },
                    { label: "Porażki", value: row.losses },
                    { label: "Bramki strzelone", value: row.goalsFor },
                    { label: "Bramki stracone", value: row.goalsAgainst },
                    { label: "Bilans", value: `${row.goalDifference > 0 ? "+" : ""}${row.goalDifference}` },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-brand-muted">{stat.label}</span>
                      <span className="font-bebas text-lg text-white">{stat.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-brand-muted">Forma</span>
                    <div className="flex items-center">
                      <FormSquares form={row.form} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}