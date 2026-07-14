import { defineField, defineType } from "sanity";

const scorerField = defineField({
  name: "scorer",
  title: "Strzelec",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Imię i nazwisko", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
    defineField({ name: "assist", title: "Asysta (opcjonalnie)", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "minute" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle}'` }),
  },
});

const cardField = defineField({
  name: "card",
  title: "Kartka",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Imię i nazwisko", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "minute" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle}'` }),
  },
});

const redCardField = defineField({
  name: "redCard",
  title: "Czerwona kartka",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Imię i nazwisko", type: "string", validation: (Rule) => Rule.required() }),
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
    select: { title: "name", subtitle: "minute", isSecondYellow: "isSecondYellow" },
    prepare: ({ title, subtitle, isSecondYellow }) => ({
      title,
      subtitle: isSecondYellow ? `${subtitle}' · 2. żółta → czerwona` : `${subtitle}'`,
    }),
  },
});

const lineupPlayerField = defineField({
  name: "lineupPlayer",
  title: "Zawodnik w składzie",
  type: "object",
  fields: [
    defineField({ name: "number", title: "Numer", type: "number", validation: (Rule) => Rule.required() }),
    defineField({ name: "name", title: "Imię i nazwisko", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "number" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `#${subtitle}` }),
  },
});

const substitutionField = defineField({
  name: "substitution",
  title: "Zmiana",
  type: "object",
  fields: [
    defineField({ name: "minute", title: "Minuta", type: "number", validation: (Rule) => Rule.required() }),
    defineField({ name: "in", title: "Wchodzi", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "out", title: "Schodzi", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "in", subtitle: "minute" },
    prepare: ({ title, subtitle }) => ({ title: `↑ ${title}`, subtitle: `${subtitle}'` }),
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
    validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status meczu",
      type: "string",
      options: {
        list: [
          { title: "Nadchodzący", value: "upcoming" },
          { title: "Zakończony", value: "finished" },
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

    // RAPORT MECZOWY — widoczny tylko dla zakończonych meczów
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
      name: "coachAway",
      title: "Trener — gość",
      type: "string",
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