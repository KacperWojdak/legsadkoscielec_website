"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PlayerModal from "../../components/PlayerModal";
import type { PlayerStats, Player, PlayerRef } from "../../../lib/types";

export default function MatchClient({
  match,
  players,
  allPlayerStats,
  home,
  away,
}: {
  match: any;
  players: Player[];
  allPlayerStats: Record<string, PlayerStats>;
  home: string;
  away: string;
}) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const selectedPlayer = players.find((p) => p._id === selectedPlayerId);
  const renderEntry = (entry: { name?: string; player?: PlayerRef }, isLegsad: boolean) => {
    const displayName = entry.player?.name ?? entry.name ?? "Nieznany zawodnik";

    if (isLegsad && entry.player) {
      return (
        <button
          onClick={() => setSelectedPlayerId(entry.player!._id)}
          className="cursor-pointer text-white transition-colors hover:text-brand-red"
        >
          {displayName}
        </button>
      );
    }
    return <span className={isLegsad ? "text-white" : "text-white/60"}>{displayName}</span>;
  };

  const renderAssist = (entry: { assist?: string; assistPlayer?: PlayerRef }) => {
    const assistName = entry.assistPlayer?.name ?? entry.assist;
    if (!assistName) return null;

    if (entry.assistPlayer) {
      return (
        <button
          onClick={() => setSelectedPlayerId(entry.assistPlayer!._id)}
          className="cursor-pointer text-brand-muted transition-colors hover:text-brand-red"
        >
          {assistName}
        </button>
      );
    }
    return <span className="text-brand-muted">{assistName}</span>;
  };

  const scorersHome = match.reportScorersHome ?? [];
  const scorersAway = match.reportScorersAway ?? [];
  const yellowHome = match.reportYellowCardsHome ?? [];
  const yellowAway = match.reportYellowCardsAway ?? [];
  const redHome = match.reportRedCardsHome ?? [];
  const redAway = match.reportRedCardsAway ?? [];
  const lineupHome = match.reportLineupHome ?? [];
  const lineupAway = match.reportLineupAway ?? [];
  const benchHome = match.reportBenchHome ?? [];
  const benchAway = match.reportBenchAway ?? [];
  const subsHome = match.reportSubstitutionsHome ?? [];
  const subsAway = match.reportSubstitutionsAway ?? [];

  return (
    <>
      {/* STRZELCY */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
        className="mb-6 rounded-2xl border border-brand-border bg-brand-surface p-6"
      >
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Strzelcy
        </p>

        {/* DESKTOP — dwie kolumny */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          <div className="flex flex-col items-start gap-3">
            {scorersHome
              .slice()
              .sort((a: any, b: any) => a.minute - b.minute)
              .map((g: any, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-8 shrink-0 text-right text-brand-muted">{g.minute}&apos;</span>
                  <span className="shrink-0">⚽</span>
                  <div className="min-w-0 flex-1">
                    {renderEntry(g, match.homeIsLegsad)}
                    {(g.assist || g.assistPlayer) && (
                      <div className="text-xs text-brand-muted">
                        Asysta: {renderAssist(g)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {scorersHome.length === 0 && (
              <span className="text-sm text-brand-muted">Brak strzelców</span>
            )}
          </div>
          <div className="flex flex-col items-end gap-3">
            {scorersAway
              .slice()
              .sort((a: any, b: any) => a.minute - b.minute)
              .map((g: any, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="min-w-0 flex-1 text-right">
                    {renderEntry(g, !match.homeIsLegsad)}
                    {(g.assist || g.assistPlayer) && (
                      <div className="text-xs text-brand-muted">
                        Asysta: {renderAssist(g)}
                      </div>
                    )}
                  </div>
                  <span className="shrink-0">⚽</span>
                  <span className="w-8 shrink-0 text-left text-brand-muted">{g.minute}&apos;</span>
                </div>
              ))}
            {scorersAway.length === 0 && (
              <span className="text-sm text-brand-muted">Brak strzelców</span>
            )}
          </div>
        </div>

        {/* MOBILE — jedna kolumna chronologiczna z etykietą drużyny */}
        <div className="flex flex-col gap-3 md:hidden">
          {[
            ...scorersHome.map((g: any) => ({ ...g, team: home, isLegsad: match.homeIsLegsad })),
            ...scorersAway.map((g: any) => ({ ...g, team: away, isLegsad: !match.homeIsLegsad })),
          ]
            .sort((a, b) => a.minute - b.minute)
            .map((g, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-8 shrink-0 text-right text-brand-muted">{g.minute}&apos;</span>
                <span className="shrink-0">⚽</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-1">
                    {renderEntry(g, g.isLegsad)}
                  </div>
                  {(g.assist || g.assistPlayer) && (
                    <div className="text-xs text-brand-muted">
                      Asysta: {renderAssist(g)}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-brand-muted">
                  {g.team}
                </span>
              </div>
            ))}
          {scorersHome.length === 0 && scorersAway.length === 0 && (
            <span className="text-center text-sm text-brand-muted">Brak strzelców</span>
          )}
        </div>
      </motion.div>

      {/* KARTKI */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mb-6 rounded-2xl border border-brand-border bg-brand-surface p-6"
      >
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Kartki
        </p>

        {/* DESKTOP — dwie kolumny */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          {[
            { cards: [...yellowHome.map((c: any) => ({ ...c, type: "yellow" as const })), ...redHome.map((c: any) => ({ ...c, type: "red" as const }))], isLegsad: match.homeIsLegsad },
            { cards: [...yellowAway.map((c: any) => ({ ...c, type: "yellow" as const })), ...redAway.map((c: any) => ({ ...c, type: "red" as const }))], isLegsad: !match.homeIsLegsad },
          ].map((side, sideIndex) => (
            <div key={sideIndex} className={`flex flex-col gap-3 ${sideIndex === 1 ? "items-end" : "items-start"}`}>
              {side.cards
                .slice()
                .sort((a: any, b: any) => a.minute - b.minute)
                .map((c: any, i: number) =>
                  sideIndex === 1 ? (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="min-w-0 flex-1 text-right">{renderEntry(c, side.isLegsad)}</div>
                      {c.type === "red" && c.isSecondYellow ? (
                        <div className="relative h-3.5 w-4 shrink-0">
                          <span className="absolute left-0 top-0 h-3.5 w-3 rounded-xs bg-yellow-400" />
                          <span className="absolute left-1 top-0.5 h-3.5 w-3 rounded-xs bg-red-500" />
                        </div>
                      ) : (
                        <span
                          className={`h-3.5 w-3 shrink-0 rounded-sm ${
                            c.type === "yellow" ? "bg-yellow-400" : "bg-red-500"
                          }`}
                        />
                      )}
                      <span className="w-8 shrink-0 text-left text-brand-muted">{c.minute}&apos;</span>
                    </div>
                  ) : (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-8 shrink-0 text-right text-brand-muted">{c.minute}&apos;</span>
                      {c.type === "red" && c.isSecondYellow ? (
                        <div className="relative h-3.5 w-4 shrink-0">
                          <span className="absolute left-0 top-0 h-3.5 w-3 rounded-xs bg-yellow-400" />
                          <span className="absolute left-1 top-0.5 h-3.5 w-3 rounded-xs bg-red-500" />
                        </div>
                      ) : (
                        <span
                          className={`h-3.5 w-3 shrink-0 rounded-sm ${
                            c.type === "yellow" ? "bg-yellow-400" : "bg-red-500"
                          }`}
                        />
                      )}
                      <div className="min-w-0 flex-1">{renderEntry(c, side.isLegsad)}</div>
                    </div>
                  )
                )}
              {side.cards.length === 0 && (
                <span className="text-sm text-brand-muted">Brak kartek</span>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE — jedna kolumna chronologiczna z etykietą drużyny */}
        <div className="flex flex-col gap-3 md:hidden">
          {[
            ...yellowHome.map((c: any) => ({ ...c, team: home, isLegsad: match.homeIsLegsad, type: "yellow" as const })),
            ...yellowAway.map((c: any) => ({ ...c, team: away, isLegsad: !match.homeIsLegsad, type: "yellow" as const })),
            ...redHome.map((c: any) => ({ ...c, team: home, isLegsad: match.homeIsLegsad, type: "red" as const })),
            ...redAway.map((c: any) => ({ ...c, team: away, isLegsad: !match.homeIsLegsad, type: "red" as const })),
          ]
            .sort((a, b) => a.minute - b.minute)
            .map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-8 shrink-0 text-right text-brand-muted">{c.minute}&apos;</span>

                {c.type === "red" && c.isSecondYellow ? (
                  <div className="relative h-3.5 w-4 shrink-0">
                    <span className="absolute left-0 top-0 h-3.5 w-3 rounded-xs bg-yellow-400" />
                    <span className="absolute left-1 top-0.5 h-3.5 w-3 rounded-xs bg-red-500" />
                  </div>
                ) : (
                  <span
                    className={`h-3.5 w-3 shrink-0 rounded-sm ${
                      c.type === "yellow" ? "bg-yellow-400" : "bg-red-500"
                    }`}
                  />
                )}

                <div className="min-w-0 flex-1">{renderEntry(c, c.isLegsad)}</div>
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-brand-muted">
                  {c.team}
                </span>
              </div>
            ))}
          {yellowHome.length === 0 && yellowAway.length === 0 && redHome.length === 0 && redAway.length === 0 && (
            <span className="text-center text-sm text-brand-muted">Brak kartek</span>
          )}
        </div>
      </motion.div>

      {/* SKŁADY */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-6 rounded-2xl border border-brand-border bg-brand-surface p-6"
      >
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Składy wyjściowe
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          <div>
            <p className="mb-3 font-bebas text-lg text-white">{home}</p>
            <div className="flex flex-col items-start gap-1.5">
              {lineupHome.map((p: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-6 text-brand-red">{p.number}</span>
                  {renderEntry(p, match.homeIsLegsad)}
                </div>
              ))}
            </div>

            {benchHome.length > 0 && (
              <>
                <p className="mb-2 mt-4 text-xs uppercase tracking-widest text-brand-muted">
                  Ławka rezerwowych
                </p>
                <div className="flex flex-col items-start gap-1.5">
                  {benchHome.map((p: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <span className="w-6 text-brand-muted">{p.number}</span>
                      <span>{p.player?.name ?? p.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="mt-3 text-xs text-brand-muted">Trener: {match.coachHome}</p>
          </div>

          <div className="md:text-right">
            <p className="mb-3 font-bebas text-lg text-white">{away}</p>
            <div className="flex flex-col items-start gap-1.5 md:items-end">
              {lineupAway.map((p: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-6 text-brand-red md:order-2">{p.number}</span>
                  <span className="md:order-1">{renderEntry(p, !match.homeIsLegsad)}</span>
                </div>
              ))}
            </div>

            {benchAway.length > 0 && (
              <>
                <p className="mb-2 mt-4 text-xs uppercase tracking-widest text-brand-muted">
                  Ławka rezerwowych
                </p>
                <div className="flex flex-col items-start gap-1.5 md:items-end">
                  {benchAway.map((p: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <span className="w-6 text-brand-muted md:order-2">{p.number}</span>
                      <span className="md:order-1">{p.player?.name ?? p.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="mt-3 text-xs text-brand-muted">Trener: {match.coachAway}</p>
          </div>

        </div>
      </motion.div>

      {/* ZMIANY */}
      {(subsHome.length > 0 || subsAway.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="rounded-2xl border border-brand-border bg-brand-surface p-6"
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Zmiany
          </p>

          {/* DESKTOP — dwie kolumny */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col items-start gap-4">
              {subsHome
                .slice()
                .sort((a: any, b: any) => a.minute - b.minute)
                .map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-8 shrink-0 text-right text-brand-muted">{s.minute}&apos;</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="shrink-0 text-green-400">↑</span>
                        {renderEntry({ name: s.in, player: s.inPlayer }, match.homeIsLegsad)}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="shrink-0 text-red-500">↓</span>
                        <span className="text-brand-muted">{s.outPlayer?.name ?? s.out}</span>
                      </div>
                    </div>
                  </div>
                ))}
              {subsHome.length === 0 && (
                <span className="text-sm text-brand-muted">Brak zmian</span>
              )}
            </div>
            <div className="flex flex-col items-end gap-4">
              {subsAway
                .slice()
                .sort((a: any, b: any) => a.minute - b.minute)
                .map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="min-w-0 flex-1 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {renderEntry({ name: s.in, player: s.inPlayer }, !match.homeIsLegsad)}
                        <span className="shrink-0 text-green-400">↑</span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-end gap-2">
                        <span className="text-brand-muted">{s.outPlayer?.name ?? s.out}</span>
                        <span className="shrink-0 text-red-500">↓</span>
                      </div>
                    </div>
                    <span className="w-8 shrink-0 text-left text-brand-muted">{s.minute}&apos;</span>
                  </div>
                ))}
              {subsAway.length === 0 && (
                <span className="text-sm text-brand-muted">Brak zmian</span>
              )}
            </div>
          </div>

          {/* MOBILE — jedna kolumna chronologiczna z etykietą drużyny */}
          <div className="flex flex-col gap-4 md:hidden">
            {[
              ...subsHome.map((s: any) => ({ ...s, team: home, isLegsad: match.homeIsLegsad })),
              ...subsAway.map((s: any) => ({ ...s, team: away, isLegsad: !match.homeIsLegsad })),
            ]
              .sort((a, b) => a.minute - b.minute)
              .map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-8 shrink-0 text-right text-brand-muted">{s.minute}&apos;</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 text-green-400">↑</span>
                      {renderEntry({ name: s.in, player: s.inPlayer }, s.isLegsad)}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="shrink-0 text-red-500">↓</span>
                      <span className="text-brand-muted">{s.outPlayer?.name ?? s.out}</span>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] uppercase tracking-wide text-brand-muted">
                    {s.team}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
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
            onClose={() => setSelectedPlayerId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}