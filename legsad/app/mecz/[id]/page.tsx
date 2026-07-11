import Link from "next/link";
import { notFound } from "next/navigation";
import matches from "../../../data/matches.json";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type MatchReport = {
  scorers: {
    home: { name: string; minute: number; assist: string | null }[];
    away: { name: string; minute: number; assist: string | null }[];
  };
  yellowCards: {
    home: { name: string; minute: number }[];
    away: { name: string; minute: number }[];
  };
  redCards: {
    home: { name: string; minute: number }[];
    away: { name: string; minute: number }[];
  };
  substitutions?: {
    home: { out: string; in: string; minute: number }[];
    away: { out: string; in: string; minute: number }[];
  };
  lineupHome: { number: number; name: string; }[];
  lineupAway: { number: number; name: string; }[];
  coachHome: string;
  coachAway: string;
};

export default async function MeczPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = matches.find((m) => m.id === Number(id));

  if (!match || match.status !== "finished" || !("report" in match)) {
    notFound();
  }

  const report = match.report as MatchReport;
  const home = match.homeIsLegsad ? "Legsad Kościelec" : match.home;
  const away = match.homeIsLegsad ? match.away : "Legsad Kościelec";

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">

        <Link
          href="/terminarz"
          className="mb-6 inline-block text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-white"
        >
          ← Wróć do terminarza
        </Link>

        {/* HERO Z WYNIKIEM */}
        <div className="mb-8 rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-10">

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-center">
            <span className="rounded-md border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
              {match.league} · Kolejka {match.round}
            </span>
          </div>

        <p className="mb-6 text-center text-sm text-white/50 capitalize">
            {formatDate(match.date)} · {match.time}
        </p>

          <div className="flex items-center justify-between gap-4">

            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                {match.homeIsLegsad ? (
                  <img src="/images/logo-pink.png" alt="" className="h-12 w-12 object-contain" />
                ) : (
                  <img src={`/images/clubs/${match.opponentLogo}`} alt="" className="h-12 w-12 object-contain" />
                )}
              </div>
              <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                {home}
              </span>
            </div>

            <div className="shrink-0">
              <span className="font-bebas text-5xl text-brand-red md:text-6xl">
                {match.scoreHome} : {match.scoreAway}
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                {!match.homeIsLegsad ? (
                  <img src="/images/logo-pink.png" alt="" className="h-12 w-12 object-contain" />
                ) : (
                  <img src={`/images/clubs/${match.opponentLogo}`} alt="" className="h-12 w-12 object-contain" />
                )}
              </div>
              <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                {away}
              </span>
            </div>

          </div>
        </div>

        {/* STRZELCY */}
        <div className="mb-6 rounded-2xl border border-brand-border bg-brand-surface p-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Strzelcy
        </p>
        <div className="flex flex-col gap-3">
            {[
            ...report.scorers.home.map((g) => ({ ...g, team: home, isLegsad: match.homeIsLegsad })),
            ...report.scorers.away.map((g) => ({ ...g, team: away, isLegsad: !match.homeIsLegsad })),
            ]
            .sort((a, b) => a.minute - b.minute)
            .map((g, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-8 shrink-0 text-right text-brand-muted">{g.minute}&apos;</span>
                <span className="shrink-0">⚽</span>
                <div className="min-w-0 flex-1">
                    <span className={g.isLegsad ? "text-white" : "text-white/60"}>{g.name}</span>
                    {g.assist && (
                    <span className="text-brand-muted"> ({g.assist})</span>
                    )}
                </div>
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-brand-muted">
                    {g.team}
                </span>
                </div>
            ))}
            {report.scorers.home.length === 0 && report.scorers.away.length === 0 && (
            <span className="text-center text-sm text-brand-muted">Brak strzelców</span>
            )}
        </div>
        </div>

        {/* KARTKI */}
        <div className="mb-6 rounded-2xl border border-brand-border bg-brand-surface p-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Kartki
        </p>
        <div className="flex flex-col gap-3">
            {[
            ...report.yellowCards.home.map((c) => ({ ...c, team: home, isLegsad: match.homeIsLegsad, type: "yellow" as const })),
            ...report.yellowCards.away.map((c) => ({ ...c, team: away, isLegsad: !match.homeIsLegsad, type: "yellow" as const })),
            ...report.redCards.home.map((c) => ({ ...c, team: home, isLegsad: match.homeIsLegsad, type: "red" as const })),
            ...report.redCards.away.map((c) => ({ ...c, team: away, isLegsad: !match.homeIsLegsad, type: "red" as const })),
            ]
            .sort((a, b) => a.minute - b.minute)
            .map((c, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-8 shrink-0 text-right text-brand-muted">{c.minute}&apos;</span>
                <span
                    className={`h-3.5 w-3 shrink-0 rounded-sm ${
                    c.type === "yellow" ? "bg-yellow-400" : "bg-red-500"
                    }`}
                />
                <span className={`min-w-0 flex-1 ${c.isLegsad ? "text-white" : "text-white/60"}`}>
                    {c.name}
                </span>
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-brand-muted">
                    {c.team}
                </span>
                </div>
            ))}
            {report.yellowCards.home.length === 0 &&
            report.yellowCards.away.length === 0 &&
            report.redCards.home.length === 0 &&
            report.redCards.away.length === 0 && (
                <span className="text-center text-sm text-brand-muted">Brak kartek</span>
            )}
        </div>
        </div>

        {/* SKŁADY */}
        <div className="mb-6 rounded-2xl border border-brand-border bg-brand-surface p-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Składy wyjściowe
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            <div>
              <p className="mb-3 font-bebas text-lg text-white">{home}</p>
              <div className="flex flex-col gap-1.5">
                {report.lineupHome.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-6 text-brand-red">{p.number}</span>
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-brand-muted">Trener: {report.coachHome}</p>
            </div>

            <div>
              <p className="mb-3 font-bebas text-lg text-white">{away}</p>
              <div className="flex flex-col gap-1.5">
                {report.lineupAway.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-6 text-brand-red">{p.number}</span>
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-brand-muted">Trener: {report.coachAway}</p>
            </div>

          </div>
        </div>

        {/* ZMIANY */}
        {report.substitutions &&
        (report.substitutions.home.length > 0 || report.substitutions.away.length > 0) && (
            <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                Zmiany
            </p>
            <div className="flex flex-col gap-4">
                {[
                ...report.substitutions.home.map((s) => ({ ...s, team: home, isLegsad: match.homeIsLegsad })),
                ...report.substitutions.away.map((s) => ({ ...s, team: away, isLegsad: !match.homeIsLegsad })),
                ]
                .sort((a, b) => a.minute - b.minute)
                .map((s, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-8 shrink-0 text-right text-brand-muted">{s.minute}&apos;</span>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                        <span className="shrink-0 text-green-400">↑</span>
                        <span className={s.isLegsad ? "text-white" : "text-white/60"}>{s.in}</span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-2">
                        <span className="shrink-0 text-red-500">↓</span>
                        <span className="text-brand-muted">{s.out}</span>
                        </div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide text-brand-muted">
                        {s.team}
                    </span>
                    </div>
                ))}
            </div>
            </div>
        )}

      </div>
    </main>
  );
}