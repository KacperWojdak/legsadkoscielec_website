import { client } from "./sanity";

const matchReportFields = `
  reportScorersHome[] {
    ...,
    player-> { _id, name, number },
    assistPlayer-> { _id, name, number }
  },
  reportScorersAway[] {
    ...,
    player-> { _id, name, number },
    assistPlayer-> { _id, name, number }
  },
  reportYellowCardsHome[] {
    ...,
    player-> { _id, name, number }
  },
  reportYellowCardsAway[] {
    ...,
    player-> { _id, name, number }
  },
  reportRedCardsHome[] {
    ...,
    player-> { _id, name, number }
  },
  reportRedCardsAway[] {
    ...,
    player-> { _id, name, number }
  },
  reportLineupHome[] {
    ...,
    player-> { _id, name, number }
  },
  reportLineupAway[] {
    ...,
    player-> { _id, name, number }
  },
  reportBenchHome[] {
    ...,
    player-> { _id, name, number }
  },
  reportBenchAway[] {
    ...,
    player-> { _id, name, number }
  },
  reportSubstitutionsHome[] {
    ...,
    inPlayer-> { _id, name, number },
    outPlayer-> { _id, name, number }
  },
  reportSubstitutionsAway[] {
    ...,
    inPlayer-> { _id, name, number },
    outPlayer-> { _id, name, number }
  },
  additionalStaffHome,
  additionalStaffAway
`;

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
      ${matchReportFields},
      coachHome,
      coachAway,
      refereeMain,
      refereeAssistant1,
      refereeAssistant2,
    }
  `,
    { seasonId }
  );
}

// MECZ po ID
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
      ${matchReportFields},
      coachHome,
      coachAway,
      refereeMain,
      refereeAssistant1,
      refereeAssistant2
    }
  `,
    { id }
  );
}

// WSZYSTKIE MECZE (do liczenia statystyk zawodników)
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
      ${matchReportFields}
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

// AKTUALNOŚCI
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

// AKTUALNOŚĆ
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