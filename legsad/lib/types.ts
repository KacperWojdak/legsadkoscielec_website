// ===== SANITY =====
export type SanityImage = {
  asset?: { _ref: string; _id?: string; url?: string };
  [key: string]: unknown;
} | null | undefined;

// ===== ZAWODNICY I SZTAB =====
export type Player = {
  _id: string;
  name: string;
  position: string;
  number: number;
  photoCard?: SanityImage;
  photoModal?: SanityImage;
};

export type StaffMember = {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImage;
};

// Referenja zawodnika
export type PlayerRef = { _id: string; name: string; number?: number } | null;

// ===== STATYSTYKI =====
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

// ===== MECZE I RAPORTY MECZOWE =====
export type Scorer = {
  name?: string;
  player?: PlayerRef;
  minute: number;
  assist?: string;
  assistPlayer?: PlayerRef;
};

export type Card = {
  name?: string;
  player?: PlayerRef;
  minute: number;
};

export type RedCard = Card & {
  isSecondYellow?: boolean;
};

export type LineupPlayer = {
  number: number;
  name?: string;
  player?: PlayerRef;
};

export type Substitution = {
  out?: string;
  outPlayer?: PlayerRef;
  in?: string;
  inPlayer?: PlayerRef;
  minute: number;
};

export type Opponent = {
  _id: string;
  name: string;
  logoUrl?: string;
};

export type SanityMatch = {
  _id: string;
  date: string;
  time?: string;
  round?: string;
  league?: string;
  homeIsLegsad: boolean;
  status: string;
  scoreHome: number | null;
  scoreAway: number | null;
  opponent?: Opponent;
  reportScorersHome?: Scorer[];
  reportScorersAway?: Scorer[];
  reportYellowCardsHome?: Card[];
  reportYellowCardsAway?: Card[];
  reportRedCardsHome?: RedCard[];
  reportRedCardsAway?: RedCard[];
  reportLineupHome?: LineupPlayer[];
  reportLineupAway?: LineupPlayer[];
  reportBenchHome?: LineupPlayer[];
  reportBenchAway?: LineupPlayer[];
  reportSubstitutionsHome?: Substitution[];
  reportSubstitutionsAway?: Substitution[];
  coachHome?: string;
  coachAway?: string;
};

// ===== SEZONY =====
export type HistoricalStats = {
  mecze?: number;
  zwyciestwa?: number;
  remisy?: number;
  porazki?: number;
  goleZdobyte?: number;
  goleStracone?: number;
  punkty?: number;
  uSiebie?: string;
  uSiebieGole?: string;
  naWyjezdzie?: string;
  naWyjezdzieGole?: string;
  krolStrzelcow?: string;
  krolStrzelcowBramki?: number;
  krolAsyst?: string;
  krolAsystLiczba?: number;
};

export type Season = {
  _id: string;
  label: string;
  league: string;
  isCurrent: boolean;
  miejsce?: string;
  historicalStats?: HistoricalStats;
};

// ===== SPONSORZY =====
export type Sponsor = {
  _id: string;
  name: string;
  logo?: SanityImage;
  url?: string;
  featured: boolean;
};

// ===== AKTUALNOŚCI =====
export type NewsArticle = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  mainImage?: SanityImage;
  lead?: string;
  body?: unknown[];
};