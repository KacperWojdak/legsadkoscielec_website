import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "academy",
  title: "Akademia",
  type: "document",
  groups: [
    { name: "groups", title: "Grupy" },
    { name: "schedule", title: "Harmonogram" },
    { name: "coaches", title: "Trenerzy" },
    { name: "saller", title: "Saller" },
    { name: "contact", title: "Kontakt" },
  ],
  fields: [
    defineField({
      name: "groups",
      title: "Grupy wiekowe",
      type: "array",
      group: "groups",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nazwa grupy",
              type: "string",
              description: 'Np. "Skrzat"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "years",
              title: "Roczniki",
              type: "string",
              description: 'Np. "2020–2021"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "years" },
          },
        }),
      ],
    }),

    defineField({
      name: "schedule",
      title: "Harmonogram treningów",
      type: "array",
      group: "schedule",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "groups",
              title: "Grupy",
              type: "string",
              description: 'Np. "Młodzik / Trampkarz"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sessions",
              title: "Terminy",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "day",
                      title: "Dzień",
                      type: "string",
                      description: 'Np. "Wtorek"',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "time",
                      title: "Godziny",
                      type: "string",
                      description: 'Np. "16:30 - 18:00"',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "day", subtitle: "time" },
                  },
                }),
              ],
            }),
            defineField({
              name: "location",
              title: "Miejsce",
              type: "string",
              description: 'Np. "Boisko w Janowicach"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "groups", subtitle: "location" },
          },
        }),
      ],
    }),

    defineField({
      name: "coaches",
      title: "Sztab trenerów",
      type: "array",
      group: "coaches",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Imię i nazwisko",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Funkcja",
              type: "string",
              description: 'Np. "Trener grupy Orlik"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "phone",
              title: "Telefon",
              type: "string",
              description: 'Opcjonalnie, może być ze spacjami, np. "722 183 270"',
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role" },
          },
        }),
      ],
    }),

    defineField({
      name: "sallerAkademiaUrl",
      title: "Link: Saller Akademia",
      type: "url",
      group: "saller",
    }),
    defineField({
      name: "sallerRodziceUrl",
      title: "Link: Saller Rodzice",
      type: "url",
      group: "saller",
    }),

    defineField({
      name: "coordinatorName",
      title: "Koordynator — imię i nazwisko",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coordinatorRole",
      title: "Koordynator — funkcja",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coordinatorPhone",
      title: "Koordynator — telefon",
      type: "string",
      group: "contact",
      description: 'Może być ze spacjami, np. "123 456 789"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Akademia — treści strony" };
    },
  },
});