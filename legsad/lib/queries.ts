import { client } from "./sanity";

// SEZONY
export async function getSeasons() {
  return client.fetch(`
    *[_type == "season"] | order(label desc) {
      _id,
      label,
      league,
      isCurrent,
      miejsce,
      historicalStats
    }
  `);
}

// MECZE — wszystkie dla danego sezonu (po ID sezonu)
export async function getMatchesBySeason(seasonId: string) {
  return client.fetch(
    `
    *[_type == "match" && season._ref == $seasonId] | order(date asc) {
      _id,
      date,
      time,
      round,
      league,
      homeIsLegsad,
      status,
      scoreHome,
      scoreAway,
      opponent-> { _id, name, "logoUrl": logo.asset->url },
      reportScorersHome,
      reportScorersAway,
      reportYellowCardsHome,
      reportYellowCardsAway,
      reportRedCardsHome,
      reportRedCardsAway,
      reportLineupHome,
      reportLineupAway,
      reportBenchHome,
      reportBenchAway,
      reportSubstitutionsHome,
      reportSubstitutionsAway,
      coachHome,
      coachAway
    }
  `,
    { seasonId }
  );
}

// MECZ po ID (do /mecz/[id])
export async function getMatchById(id: string) {
  return client.fetch(
    `
    *[_type == "match" && _id == $id][0] {
      _id,
      date,
      time,
      round,
      league,
      homeIsLegsad,
      status,
      scoreHome,
      scoreAway,
      opponent-> { _id, name, "logoUrl": logo.asset->url },
      reportScorersHome,
      reportScorersAway,
      reportYellowCardsHome,
      reportYellowCardsAway,
      reportRedCardsHome,
      reportRedCardsAway,
      reportLineupHome,
      reportLineupAway,
      reportBenchHome,
      reportBenchAway,
      reportSubstitutionsHome,
      reportSubstitutionsAway,
      coachHome,
      coachAway
    }
  `,
    { id }
  );
}

// WSZYSTKIE MECZE (do liczenia statystyk zawodników — lib/stats.ts)
export async function getAllMatches() {
  return client.fetch(`
    *[_type == "match"] {
      _id,
      date,
      homeIsLegsad,
      status,
      scoreHome,
      scoreAway,
      opponent-> { name },
      reportScorersHome,
      reportScorersAway,
      reportYellowCardsHome,
      reportYellowCardsAway,
      reportRedCardsHome,
      reportRedCardsAway,
      reportLineupHome,
      reportLineupAway,
      reportSubstitutionsHome,
      reportSubstitutionsAway
    }
  `);
}

// ZAWODNICY
export async function getPlayers() {
  return client.fetch(`
    *[_type == "player" && isActive == true] | order(number asc) {
      _id,
      name,
      position,
      number,
      photoCard,
      photoModal
    }
  `);
}

// SZTAB
export async function getStaff() {
  return client.fetch(`
    *[_type == "staff"] | order(order asc) {
      _id,
      name,
      role,
      photo
    }
  `);
}

// SPONSORZY
export async function getSponsors() {
  return client.fetch(`
    *[_type == "sponsor"] | order(order asc) {
      _id,
      name,
      logo,
      url,
      featured
    }
  `);
}

// AKTUALNOŚCI — lista
export async function getNews() {
  return client.fetch(`
    *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      mainImage,
      lead
    }
  `);
}

// AKTUALNOŚĆ — pojedyncza (po slug)
export async function getNewsBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      mainImage,
      body
    }
  `,
    { slug }
  );
}