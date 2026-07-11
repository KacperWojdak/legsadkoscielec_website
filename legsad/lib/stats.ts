import matchesRaw from "../data/matches.json";

type Scorer = { name: string; minute: number; assist: string | null };
type Card = { name: string; minute: number };
type Substitution = { out: string; in: string; minute: number };
type LineupPlayer = { number: number; name: string };

type MatchWithReport = {
  id: number;
  date: string;
  time: string;
  home: string;
  away: string;
  homeIsLegsad: boolean;
  opponentLogo: string;
  scoreHome: number | null;
  scoreAway: number | null;
  status: string;
  season: string;
  round: string;
  league: string;
  report?: {
    scorers: { home: Scorer[]; away: Scorer[] };
    yellowCards: { home: Card[]; away: Card[] };
    redCards: { home: Card[]; away: Card[] };
    lineupHome: LineupPlayer[];
    lineupAway: LineupPlayer[];
    substitutions?: { home: Substitution[]; away: Substitution[] };
    coachHome?: string;
    coachAway?: string;
  };
};

const matchesData = matchesRaw as unknown as MatchWithReport[];

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

export function computePlayerStats(): Record<string, PlayerStats> {
  const stats: Record<string, PlayerStats> = {};

  const getOrCreate = (name: string) => {
    if (!stats[name]) stats[name] = emptyStats(name);
    return stats[name];
  };

  const finishedMatches = matchesData.filter(
    (m) => m.status === "finished" && m.report
  );

  for (const match of finishedMatches) {
    const report = match.report!;
    const legsadSide = match.homeIsLegsad ? "home" : "away";

    // Gole i asysty
    for (const g of report.scorers[legsadSide]) {
      getOrCreate(g.name).gole += 1;
      if (g.assist) getOrCreate(g.assist).asysty += 1;
    }

    // Kartki
    for (const c of report.yellowCards[legsadSide]) {
      getOrCreate(c.name).zolteKartki += 1;
    }
    for (const c of report.redCards[legsadSide]) {
      getOrCreate(c.name).czerwoneKartki += 1;
    }

    // Skład podstawowy — domyślnie 90 minut, mecz rozegrany
    const lineup = legsadSide === "home" ? report.lineupHome : report.lineupAway;
    for (const p of lineup) {
      const s = getOrCreate(p.name);
      s.mecze += 1;
      s.minuty += 90;
    }

    // Zmiany — korygujemy minuty obu zawodników
    const subs = report.substitutions?.[legsadSide] ?? [];
    for (const sub of subs) {
      const outPlayer = getOrCreate(sub.out);
      outPlayer.minuty -= 90 - sub.minute;

      const inPlayer = getOrCreate(sub.in);
      inPlayer.mecze += 1;
      inPlayer.minuty += 90 - sub.minute;
    }

    // Czyste konto dla bramkarza
    const opponentScore = match.homeIsLegsad ? match.scoreAway : match.scoreHome;
    if (opponentScore === 0) {
      const goalkeeper = lineup.find(
        (p) => p.number === 1 || p.number === 99
      );
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

export function computeSeasonStats() {
  const finished = matchesData.filter((m) => m.status === "finished");

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