import { getSeasons, getMatchesBySeason } from "../../lib/queries";

export default async function NextMatchPill() {
  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);
  if (!currentSeason) return null;

  const matches = await getMatchesBySeason(currentSeason._id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next = matches
    .filter((m: any) => new Date(m.date) >= today && m.status === "upcoming")
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;

  if (!next) return null;

  const opponent = next.opponent.name;
  const date = new Date(next.date).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });

  return (
    <>
      <span className="text-[9px] lg:text-[10px]">{next.homeIsLegsad ? "🏠" : "🚌"}</span>
      <span className="text-[9px] uppercase tracking-wide text-white/70 lg:text-[11px]">
        {date} · vs {opponent}
      </span>
    </>
  );
}