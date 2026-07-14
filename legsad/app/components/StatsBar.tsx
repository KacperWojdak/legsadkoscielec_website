import { getSeasons, getMatchesBySeason } from "../../lib/queries";
import StatsBarClient from "./StatsBarClient";
import type { SanityMatch } from "../../lib/stats";

export default async function StatsBar() {
  const seasons = await getSeasons();

  const matchesBySeasonId: Record<string, SanityMatch[]> = {};
  for (const season of seasons) {
    matchesBySeasonId[season._id] = await getMatchesBySeason(season._id);
  }

  return <StatsBarClient seasons={seasons} matchesBySeasonId={matchesBySeasonId} />;
}