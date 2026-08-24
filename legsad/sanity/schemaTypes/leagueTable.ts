import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "leagueTable",
  title: "Tabela ligowa",
  type: "document",
  fields: [
    defineField({
      name: "leagueName",
      title: "Nazwa rozgrywek",
      type: "string",
      description: 'Np. "Legnica: Klasa A Grupa 3"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season",
      title: "Sezon",
      type: "reference",
      to: [{ type: "season" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Ostatnia aktualizacja (po kolejce)",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rows",
      title: "Wiersze tabeli",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "team",
              title: "Drużyna",
              type: "reference",
              to: [{ type: "club" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isLegsad",
              title: "To Legsad Kościelec?",
              type: "boolean",
              description: "Zaznacz przy wierszu Legsadu — wyróżni się na stronie",
              initialValue: false,
            }),
            defineField({
              name: "matchesPlayed",
              title: "Mecze (M)",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "wins",
              title: "Wygrane (W)",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "draws",
              title: "Remisy (R)",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "losses",
              title: "Porażki (P)",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "goalsFor",
              title: "Bramki strzelone",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "goalsAgainst",
              title: "Bramki stracone",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "pointsDeduction",
              title: "Punkty karne (odejmowane)",
              type: "number",
              description: "Jeśli drużyna ma odjęte punkty przez PZPN — wpisz ile. Zwykle 0.",
              initialValue: 0,
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: "zoneStatus",
              title: "Strefa",
              type: "string",
              options: {
                list: [
                  { title: "Brak wyróżnienia", value: "none" },
                  { title: "Strefa awansu", value: "promotion" },
                  { title: "Strefa spadkowa", value: "relegation" },
                  { title: "Baraże", value: "playoff" },
                ],
              },
              initialValue: "none",
            }),
          ],
          preview: {
            select: {
              title: "team.name",
              wins: "wins",
              draws: "draws",
              losses: "losses",
              media: "team.logo",
            },
            prepare({ title, wins, draws, losses, media }) {
              return {
                title: title ?? "Brak drużyny",
                subtitle: `W:${wins ?? 0} R:${draws ?? 0} P:${losses ?? 0}`,
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "leagueName", subtitle: "lastUpdated" },
  },
});