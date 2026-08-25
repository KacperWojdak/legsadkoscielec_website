import { getLeagueTable as fetchLeagueTable, getSeasons, getMatchesBySeason } from "./queries";

export interface ComputedTableRow {
  team: { _id: string; name: string; logo?: any };
  isLegsad: boolean;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  zoneStatus: "none" | "promotion" | "relegation" | "playoff";
  form: ("W" | "R" | "P")[];
}

export async function getComputedLeagueTable() {
  const table = await fetchLeagueTable();
  if (!table) return null;

  const rows: ComputedTableRow[] = table.rows.map((r: any) => {
    const points = r.wins * 3 + r.draws - (r.pointsDeduction ?? 0);
    const goalDifference = r.goalsFor - r.goalsAgainst;
    return {
      team: r.team,
      isLegsad: r.isLegsad ?? false,
      matchesPlayed: r.matchesPlayed ?? 0,
      wins: r.wins ?? 0,
      draws: r.draws ?? 0,
      losses: r.losses ?? 0,
      goalsFor: r.goalsFor ?? 0,
      goalsAgainst: r.goalsAgainst ?? 0,
      goalDifference,
      points,
      zoneStatus: r.zoneStatus ?? "none",
      form: r.form ?? [],
    };
  });

  rows.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  const withZones = rows.map((row, index) => {
    if (row.zoneStatus === "playoff") return row;
    if (index === 0) return { ...row, zoneStatus: "promotion" as const };
    if (index >= rows.length - 2) return { ...row, zoneStatus: "relegation" as const };
    return { ...row, zoneStatus: "none" as const };
  });

  return { leagueName: table.leagueName, lastUpdated: table.lastUpdated, rows: withZones };
}