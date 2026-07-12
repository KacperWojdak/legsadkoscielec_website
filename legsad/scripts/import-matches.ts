import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";
import { config } from "dotenv";
config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

type Scorer = { name: string; minute: number; assist: string | null };
type Card = { name: string; minute: number };
type Substitution = { out: string; in: string; minute: number };
type LineupPlayer = { number: number; name: string };

type MatchJson = {
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
    substitutions?: { home: Substitution[]; away: Substitution[] };
    lineupHome: LineupPlayer[];
    lineupAway: LineupPlayer[];
    benchHome?: LineupPlayer[];
    benchAway?: LineupPlayer[];
    coachHome: string;
    coachAway: string;
  };
};

function generateKey(): string {
  return Math.random().toString(36).substring(2, 15);
}

function mapScorer(s: Scorer) {
  return { _type: "scorer", _key: generateKey(), name: s.name, minute: s.minute, assist: s.assist ?? undefined };
}
function mapCard(c: Card) {
  return { _type: "card", _key: generateKey(), name: c.name, minute: c.minute };
}
function mapLineup(p: LineupPlayer) {
  return { _type: "lineupPlayer", _key: generateKey(), number: p.number, name: p.name };
}
function mapSub(s: Substitution) {
  return { _type: "substitution", _key: generateKey(), minute: s.minute, in: s.in, out: s.out };
}

async function findSeasonId(label: string): Promise<string> {
  const result = await client.fetch(`*[_type == "season" && label == $label][0]._id`, { label });
  if (!result) throw new Error(`Nie znaleziono sezonu: ${label}`);
  return result;
}

async function findClubId(name: string): Promise<string> {
  const result = await client.fetch(`*[_type == "club" && name == $name][0]._id`, { name });
  if (!result) throw new Error(`Nie znaleziono klubu: ${name}`);
  return result;
}

async function importMatches() {
  const matchesData: MatchJson[] = JSON.parse(
    readFileSync(path.join(process.cwd(), "data", "matches.json"), "utf-8")
  );

  console.log(`Znaleziono ${matchesData.length} meczów do zaimportowania.`);

  const seasonCache = new Map<string, string>();

  for (const match of matchesData) {
    console.log(`Importuję mecz: ${match.home} vs ${match.away}...`);

    // Sezon — cache po pierwszym znalezieniu
    let seasonId = seasonCache.get(match.season);
    if (!seasonId) {
      seasonId = await findSeasonId(match.season);
      seasonCache.set(match.season, seasonId);
    }

    // Przeciwnik — zawsze ten, który nie jest Legsadem
    const opponentName = match.homeIsLegsad ? match.away : match.home;
    const opponentId = await findClubId(opponentName);

const baseDoc = {
  _type: "match" as const,
  season: { _type: "reference" as const, _ref: seasonId },
  date: match.date,
  time: match.time,
  round: match.round,
  league: match.league,
  homeIsLegsad: match.homeIsLegsad,
  opponent: { _type: "reference" as const, _ref: opponentId },
  status: match.status,
};

const reportFields =
  match.status === "finished"
    ? {
        scoreHome: match.scoreHome,
        scoreAway: match.scoreAway,
        ...(match.report
          ? {
              reportScorersHome: match.report.scorers.home.map(mapScorer),
              reportScorersAway: match.report.scorers.away.map(mapScorer),
              reportYellowCardsHome: match.report.yellowCards.home.map(mapCard),
              reportYellowCardsAway: match.report.yellowCards.away.map(mapCard),
              reportRedCardsHome: match.report.redCards.home.map(mapCard),
              reportRedCardsAway: match.report.redCards.away.map(mapCard),
              reportLineupHome: match.report.lineupHome.map(mapLineup),
              reportLineupAway: match.report.lineupAway.map(mapLineup),
              reportBenchHome: match.report.benchHome?.map(mapLineup) ?? [],
              reportBenchAway: match.report.benchAway?.map(mapLineup) ?? [],
              ...(match.report.substitutions
                ? {
                    reportSubstitutionsHome: match.report.substitutions.home.map(mapSub),
                    reportSubstitutionsAway: match.report.substitutions.away.map(mapSub),
                  }
                : {}),
              coachHome: match.report.coachHome,
              coachAway: match.report.coachAway,
            }
          : {}),
      }
    : {};

const doc = { ...baseDoc, ...reportFields };

const created = await client.create(doc);
    console.log(`✅ Utworzono: ${created._id}`);
  }

  console.log("Import meczów zakończony!");
}

importMatches().catch((err) => {
  console.error("Błąd importu:", err);
  process.exit(1);
});