export type SanityMatch = {
  _id: string;
  date: string;
  homeIsLegsad: boolean;
  status: string;
  scoreHome: number | null;
  scoreAway: number | null;
  opponent?: { name: string };
  reportScorersHome?: { name: string; minute: number; assist?: string }[];
  reportScorersAway?: { name: string; minute: number; assist?: string }[];
  reportYellowCardsHome?: { name: string; minute: number }[];
  reportYellowCardsAway?: { name: string; minute: number }[];
  reportRedCardsHome?: { name: string; minute: number; isSecondYellow?: boolean }[];
  reportRedCardsAway?: { name: string; minute: number; isSecondYellow?: boolean }[];
  reportLineupHome?: { number: number; name: string }[];
  reportLineupAway?: { number: number; name: string }[];
  reportSubstitutionsHome?: { out: string; in: string; minute: number }[];
  reportSubstitutionsAway?: { out: string; in: string; minute: number }[];
};

export type PlayerStats = {
  name: string;
  mecze: number;
  gole: number;
  asysty: number;
  minuty: number;
  zolteKartki: number;
  czerwoneKartki: number;
  czysteKonta: number;
};

function emptyStats(name: string): PlayerStats {
  return {
    name,
    mecze: 0,
    gole: 0,
    asysty: 0,
    minuty: 0,
    zolteKartki: 0,
    czerwoneKartki: 0,
    czysteKonta: 0,
  };
}

export function computePlayerStats(matches: SanityMatch[]): Record<string, PlayerStats> {
  const stats: Record<string, PlayerStats> = {};

  const getOrCreate = (name: string) => {
    if (!stats[name]) stats[name] = emptyStats(name);
    return stats[name];
  };

  const finishedMatches = matches.filter((m) => m.status === "finished");

  for (const match of finishedMatches) {
    const legsadSide = match.homeIsLegsad ? "home" : "away";

    const scorers =
      legsadSide === "home" ? match.reportScorersHome : match.reportScorersAway;
    for (const g of scorers ?? []) {
      getOrCreate(g.name).gole += 1;
      if (g.assist) getOrCreate(g.assist).asysty += 1;
    }

    const yellowCards =
      legsadSide === "home" ? match.reportYellowCardsHome : match.reportYellowCardsAway;
    for (const c of yellowCards ?? []) {
      getOrCreate(c.name).zolteKartki += 1;
    }

    const redCards =
      legsadSide === "home" ? match.reportRedCardsHome : match.reportRedCardsAway;
    for (const c of redCards ?? []) {
      getOrCreate(c.name).czerwoneKartki += 1;
      if (c.isSecondYellow) {
        getOrCreate(c.name).zolteKartki += 1;
      }
    }

    const lineup =
      legsadSide === "home" ? match.reportLineupHome : match.reportLineupAway;
    const subs =
      legsadSide === "home" ? match.reportSubstitutionsHome : match.reportSubstitutionsAway;

    const redCardMinuteByName = new Map<string, number>();
    for (const c of redCards ?? []) {
      redCardMinuteByName.set(c.name, c.minute);
    }

    for (const p of lineup ?? []) {
      const s = getOrCreate(p.name);
      s.mecze += 1;

      const redMinute = redCardMinuteByName.get(p.name);
      if (redMinute !== undefined) {
        s.minuty += redMinute;
      } else {
        s.minuty += 90;
      }
    }

    for (const sub of subs ?? []) {
      const outPlayer = getOrCreate(sub.out);
      outPlayer.minuty -= 90 - sub.minute;

      const inPlayer = getOrCreate(sub.in);
      inPlayer.mecze += 1;

      const redMinute = redCardMinuteByName.get(sub.in);
      if (redMinute !== undefined) {
        inPlayer.minuty += redMinute - sub.minute;
      } else {
        inPlayer.minuty += 90 - sub.minute;
      }
    }

    const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
    if (opponentScore === 0 && lineup) {
      const goalkeeper = lineup.find((p) => p.number === 1 || p.number === 99);
      if (goalkeeper) getOrCreate(goalkeeper.name).czysteKonta += 1;
    }
  }

  return stats;
}

export function getTopByStat(
  playerStats: Record<string, PlayerStats>,
  key: "gole" | "asysty"
): { names: string[]; value: number } {
  const entries = Object.values(playerStats).filter((p) => p[key] > 0);
  if (entries.length === 0) return { names: [], value: 0 };

  const maxValue = Math.max(...entries.map((p) => p[key]));
  const topPlayers = entries.filter((p) => p[key] === maxValue).map((p) => p.name);

  return { names: topPlayers, value: maxValue };
}

export function computeSeasonStats(matches: SanityMatch[]) {
  const finished = matches.filter((m) => m.status === "finished");

  let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;
  let homeWins = 0, homeDraws = 0, homeLosses = 0, homeGF = 0, homeGA = 0;
  let awayWins = 0, awayDraws = 0, awayLosses = 0, awayGF = 0, awayGA = 0;

  for (const m of finished) {
    const gf = m.homeIsLegsad ? m.scoreHome! : m.scoreAway!;
    const ga = m.homeIsLegsad ? m.scoreAway! : m.scoreHome!;

    goalsFor += gf;
    goalsAgainst += ga;

    if (gf > ga) wins++;
    else if (gf < ga) losses++;
    else draws++;

    if (m.homeIsLegsad) {
      homeGF += gf; homeGA += ga;
      if (gf > ga) homeWins++;
      else if (gf < ga) homeLosses++;
      else homeDraws++;
    } else {
      awayGF += gf; awayGA += ga;
      if (gf > ga) awayWins++;
      else if (gf < ga) awayLosses++;
      else awayDraws++;
    }
  }

  const mecze = finished.length;
  const punkty = wins * 3 + draws;
  const sredniaNaMecz = mecze > 0 ? (goalsFor / mecze).toFixed(2) : "-";

  return {
    mecze,
    zwycięstwa: wins,
    remisy: draws,
    porażki: losses,
    goleZdobyte: goalsFor,
    goleStracone: goalsAgainst,
    punkty,
    srednioNaMecz: sredniaNaMecz,
    uSiebie: `${homeWins}-${homeDraws}-${homeLosses}`,
    uSiebieGole: `${homeGF}:${homeGA}`,
    naWyjezdzie: `${awayWins}-${awayDraws}-${awayLosses}`,
    naWyjezdieGole: `${awayGF}:${awayGA}`,
  };
}

export function pluralizeBramki(n: number): string {
  if (n === 1) return "bramka";
  const lastTwo = n % 100;
  const last = n % 10;
  if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return "bramki";
  return "bramek";
}

export function pluralizeAsysty(n: number): string {
  if (n === 1) return "asysta";
  const lastTwo = n % 100;
  const last = n % 10;
  if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return "asysty";
  return "asyst";
}