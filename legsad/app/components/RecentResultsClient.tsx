"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

function getResult(match: any) {
  if (match.scoreHome === null || match.scoreAway === null) return null;
  const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
  const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
  if (legsadScore > opponentScore) return "W";
  if (legsadScore < opponentScore) return "P";
  return "R";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
  });
}

function hasReport(match: any) {
  return (
    (match.reportScorersHome && match.reportScorersHome.length > 0) ||
    (match.reportScorersAway && match.reportScorersAway.length > 0) ||
    (match.reportLineupHome && match.reportLineupHome.length > 0) ||
    (match.reportLineupAway && match.reportLineupAway.length > 0)
  );
}

export default function RecentResultsClient({ results }: { results: any[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col divide-y divide-brand-border rounded-2xl border border-brand-border bg-brand-surface overflow-hidden">
      {results.map((match: any) => {
        const result = getResult(match);
        const opponent = match.opponent.name;
        const legsadScore = match.homeIsLegsad ? match.scoreHome : match.scoreAway;
        const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
        const clickable = hasReport(match);

        return (
          <div
            key={match._id}
            onClick={clickable ? () => router.push(`/mecz/${match._id}`) : undefined}
            className={`flex items-center gap-4 px-5 py-4 transition-colors ${
              clickable ? "cursor-pointer hover:bg-brand-black/40" : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-bebas text-sm ${
                result === "W"
                  ? "bg-green-900/50 text-green-400"
                  : result === "P"
                  ? "bg-red-900/50 text-red-400"
                  : "bg-yellow-900/50 text-yellow-400"
              }`}
            >
              {result}
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <Image
                src={match.opponent.logoUrl ?? "/images/logo-white.png"}
                alt={opponent}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-white">
                vs {opponent}
              </p>
              <p className="text-xs text-brand-muted">
                {formatDate(match.date)} · kolejka {match.round}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-right">
              <span className="font-bebas text-2xl text-white">
                {legsadScore}:{opponentScore}
              </span>
              {clickable && (
                <a
                  href={`/mecz/${match._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-md border border-brand-red px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                >
                  Raport
                </a>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}