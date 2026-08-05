import { defineField, defineType } from "sanity";
import { AutoFillNumberInput } from "../components/AutoFillNumberInput";

const scorerField = defineField({
  name: "scorer",
  title: "Strzelec",
  type: "object",
  fields: [
    defineField({
      name: "player",
      title: "Zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
      description: "Wybierz, jeśli strzelcem jest zawodnik Legsadu",
    }),
    defineField({
      name: "name",
      title: "Imię i nazwisko (jeśli przeciwnik lub brak na liście)",
      type: "string",
      description: "Wypełnij tylko, jeśli nie wybrałeś zawodnika powyżej",
    }),
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
    defineField({
      name: "assistPlayer",
      title: "Asysta — zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
    }),
    defineField({
      name: "assist",
      title: "Asysta — imię i nazwisko (jeśli przeciwnik)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", playerName: "player.name", subtitle: "minute" },
    prepare: ({ title, playerName, subtitle }) => ({
      title: playerName ?? title,
      subtitle: `${subtitle}'`,
    }),
  },
});

const cardField = defineField({
  name: "card",
  title: "Kartka",
  type: "object",
  fields: [
    defineField({
      name: "player",
      title: "Zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
    }),
    defineField({
      name: "name",
      title: "Imię i nazwisko (jeśli przeciwnik)",
      type: "string",
    }),
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", playerName: "player.name", subtitle: "minute" },
    prepare: ({ title, playerName, subtitle }) => ({
      title: playerName ?? title,
      subtitle: `${subtitle}'`,
    }),
  },
});

const redCardField = defineField({
  name: "redCard",
  title: "Czerwona kartka",
  type: "object",
  fields: [
    defineField({
      name: "player",
      title: "Zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
    }),
    defineField({
      name: "name",
      title: "Imię i nazwisko (jeśli przeciwnik)",
      type: "string",
    }),
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
    defineField({
      name: "isSecondYellow",
      title: "Czerwona po dwóch żółtych",
      type: "boolean",
      description: "Zaznacz, jeśli to czerwona kartka wynikająca z drugiej żółtej (doliczy dodatkową żółtą do statystyk)",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", playerName: "player.name", subtitle: "minute", isSecondYellow: "isSecondYellow" },
    prepare: ({ title, playerName, subtitle, isSecondYellow }) => ({
      title: playerName ?? title,
      subtitle: isSecondYellow ? `${subtitle}' · 2. żółta → czerwona` : `${subtitle}'`,
    }),
  },
});

const lineupPlayerField = defineField({
  name: "lineupPlayer",
  title: "Zawodnik w składzie",
  type: "object",
  fields: [
    defineField({
      name: "player",
      title: "Zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
      options: {
        filter: ({ document, parentPath }) => {
          const pathStr = JSON.stringify(parentPath);
          const isHome = pathStr.includes("Home");

          const lineupField = isHome ? "reportLineupHome" : "reportLineupAway";
          const benchField = isHome ? "reportBenchHome" : "reportBenchAway";

          const usedIds = [
            ...((document?.[lineupField] as any[]) ?? []),
            ...((document?.[benchField] as any[]) ?? []),
          ]
            .map((entry) => entry?.player?._ref)
            .filter(Boolean);

          if (usedIds.length === 0) {
            return { filter: "true" };
          }

          return {
            filter: "!(_id in $usedIds)",
            params: { usedIds },
          };
        },
      },
    }),
    defineField({
      name: "name",
      title: "Imię i nazwisko (jeśli przeciwnik)",
      type: "string",
    }),
    defineField({
      name: "number",
      title: "Numer",
      type: "number",
      validation: (Rule) => Rule.required(),
      components: {
        input: AutoFillNumberInput,
      },
    }),
  ],
  preview: {
    select: { title: "name", playerName: "player.name", subtitle: "number" },
    prepare: ({ title, playerName, subtitle }) => ({
      title: playerName ?? title,
      subtitle: `#${subtitle}`,
    }),
  },
});

const substitutionField = defineField({
  name: "substitution",
  title: "Zmiana",
  type: "object",
  fields: [
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
    defineField({
      name: "inPlayer",
      title: "Wchodzi — zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
    }),
    defineField({
      name: "in",
      title: "Wchodzi — imię i nazwisko (jeśli przeciwnik)",
      type: "string",
    }),
    defineField({
      name: "outPlayer",
      title: "Schodzi — zawodnik Legsadu (wybierz z listy)",
      type: "reference",
      to: [{ type: "player" }],
    }),
    defineField({
      name: "out",
      title: "Schodzi — imię i nazwisko (jeśli przeciwnik)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "in", playerName: "inPlayer.name", subtitle: "minute" },
    prepare: ({ title, playerName, subtitle }) => ({
      title: `↑ ${playerName ?? title}`,
      subtitle: `${subtitle}'`,
    }),
  },
});

const staffMemberField = defineField({
  name: "staffMember",
  title: "Członek sztabu",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Imię i nazwisko", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Rola", type: "string", description: "Np. Trener II, Kierownik, Masażysta, Koordynator", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});

export default defineType({
  name: "match",
  title: "Mecz",
  type: "document",
  fields: [
    defineField({
      name: "season",
      title: "Sezon",
      type: "reference",
      to: [{ type: "season" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data meczu",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Godzina",
      type: "string",
      description: "Np. 14:00",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "round",
      title: "Kolejka",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "league",
      title: "Liga",
      type: "string",
      description: "Np. Klasa A",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homeIsLegsad",
      title: "Legsad gra u siebie",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "opponent",
      title: "Przeciwnik",
      type: "reference",
      to: [{ type: "club" }],
      hidden: ({ document }) => document?.status === "bye",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as any;
          if (doc?.status === "bye") return true;
          return value ? true : "Przeciwnik jest wymagany";
        }),
    }),
    defineField({
      name: "status",
      title: "Status meczu",
      type: "string",
      options: {
        list: [
          { title: "Nadchodzący", value: "upcoming" },
          { title: "Zakończony", value: "finished" },
          { title: "Pauza (wolny termin)", value: "bye" },
        ],
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scoreHome",
      title: "Wynik — gospodarz",
      type: "number",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "scoreAway",
      title: "Wynik — gość",
      type: "number",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "isWalkover",
      title: "Walkower",
      type: "boolean",
      description: "Zaznacz, jeśli mecz zakończył się walkowerem",
      initialValue: false,
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "walkoverReceiver",
      title: "Walkower — strona otrzymująca zwycięstwo",
      type: "string",
      description: "Wybierz drużynę, która otrzymuje walkower na korzyść",
      options: {
        list: [
          { title: "Gospodarz", value: "home" },
          { title: "Gość", value: "away" },
        ],
      },
      hidden: ({ document }) => document?.status !== "finished" || !document?.isWalkover,
    }),
    defineField({
      name: "actualScoreHome",
      title: "Wynik na boisku — gospodarz",
      description: "Rzeczywisty wynik osiągnięty w trakcie gry, przed unieważnieniem",
      type: "number",
      hidden: ({ document }) => document?.status !== "finished" || !document?.isWalkover,
    }),
    defineField({
      name: "actualScoreAway",
      title: "Wynik na boisku — gość",
      description: "Rzeczywisty wynik osiągnięty w trakcie gry, przed unieważnieniem",
      type: "number",
      hidden: ({ document }) => document?.status !== "finished" || !document?.isWalkover,
    }),
    defineField({
      name: "scoreHomeHalftime",
      title: "Wynik do przerwy — gospodarz",
      type: "number",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "scoreAwayHalftime",
      title: "Wynik do przerwy — gość",
      type: "number",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportScorersHome",
      title: "Strzelcy — gospodarz",
      type: "array",
      of: [scorerField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportScorersAway",
      title: "Strzelcy — gość",
      type: "array",
      of: [scorerField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportYellowCardsHome",
      title: "Żółte kartki — gospodarz",
      type: "array",
      of: [cardField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportYellowCardsAway",
      title: "Żółte kartki — gość",
      type: "array",
      of: [cardField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportRedCardsHome",
      title: "Czerwone kartki — gospodarz",
      type: "array",
      of: [redCardField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportRedCardsAway",
      title: "Czerwone kartki — gość",
      type: "array",
      of: [redCardField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportLineupHome",
      title: "Skład — gospodarz",
      type: "array",
      of: [lineupPlayerField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportLineupAway",
      title: "Skład — gość",
      type: "array",
      of: [lineupPlayerField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportBenchHome",
      title: "Ławka rezerwowych — gospodarz",
      type: "array",
      of: [lineupPlayerField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportBenchAway",
      title: "Ławka rezerwowych — gość",
      type: "array",
      of: [lineupPlayerField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportSubstitutionsHome",
      title: "Zmiany — gospodarz",
      type: "array",
      of: [substitutionField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "reportSubstitutionsAway",
      title: "Zmiany — gość",
      type: "array",
      of: [substitutionField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "coachHome",
      title: "Trener — gospodarz",
      type: "string",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "additionalStaffHome",
      title: "Dodatkowy sztab — gospodarz",
      type: "array",
      of: [staffMemberField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "coachAway",
      title: "Trener — gość",
      type: "string",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "additionalStaffAway",
      title: "Dodatkowy sztab — gość",
      type: "array",
      of: [staffMemberField],
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "refereeMain",
      title: "Sędzia główny",
      type: "string",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "refereeAssistant1",
      title: "Sędzia asystent I",
      type: "string",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "refereeAssistant2",
      title: "Sędzia asystent II",
      type: "string",
      hidden: ({ document }) => document?.status !== "finished",
    }),
    defineField({
      name: "photos",
      title: "Galeria zdjęć z meczu",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      hidden: ({ document }) => document?.status !== "finished",
    }),
  ],
  preview: {
    select: {
      home: "homeIsLegsad",
      opponent: "opponent.name",
      date: "date",
      scoreHome: "scoreHome",
      scoreAway: "scoreAway",
      status: "status",
    },
    prepare: ({ home, opponent, date, scoreHome, scoreAway, status }) => {
      const title = home ? `Legsad vs ${opponent}` : `${opponent} vs Legsad`;
      const subtitle =
        status === "finished" && scoreHome !== undefined
          ? `${date} · ${scoreHome}:${scoreAway}`
          : date;
      return { title, subtitle };
    },
  },
});