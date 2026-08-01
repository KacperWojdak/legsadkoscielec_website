import { defineField, defineType } from "sanity";

export default defineType({
  name: "player",
  title: "Zawodnik",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Imię i nazwisko",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Pozycja",
      type: "string",
      options: {
        list: [
          { title: "Bramkarz", value: "Bramkarz" },
          { title: "Obrońca", value: "Obrońca" },
          { title: "Pomocnik", value: "Pomocnik" },
          { title: "Napastnik", value: "Napastnik" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Numer",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photoCard",
      title: "Zdjęcie (karta w składzie)",
      type: "image",
      description: "Zdjęcie wyświetlane na siatce zawodników, np. poza z założonymi rękami",
    }),
    defineField({
      name: "photoModal",
      title: "Zdjęcie (szczegóły po kliknięciu)",
      type: "image",
      description: "Opcjonalnie inne ujęcie — jeśli puste, użyte zostanie zdjęcie z karty",
    }),
    defineField({
      name: "birthDate",
      title: "Data urodzenia",
      type: "date",
    }),
    defineField({
      name: "height",
      title: "Wzrost (cm)",
      type: "number",
    }),
    defineField({
      name: "weight",
      title: "Waga (kg)",
      type: "number",
    }),
    defineField({
      name: "nationality",
      title: "Narodowość (kod kraju, np. PL, UA, DE)",
      type: "string",
      description: "Dwuliterowy kod kraju ISO, używany do wyświetlenia flagi (np. PL, UA, DE, SK)",
    }),
    defineField({
      name: "careerHistory",
      title: "Historia kariery",
      type: "array",
      description: "Chronologiczna lista klubów, w których zawodnik grał wcześniej (bez GKS Legsad Kościelec)",
      of: [
        {
          type: "object",
          name: "careerEntry",
          fields: [
            defineField({ name: "club", title: "Klub", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "season", title: "Sezon (np. 2023/2024)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "league", title: "Poziom rozgrywkowy (np. III liga, IV liga, U-19)", type: "string" }),
          ],
          preview: {
            select: { title: "club", subtitle: "season" },
          },
        },
      ],
    }),
    defineField({
      name: "memberSince",
      title: "W klubie od",
      type: "string",
      description: "Np. 2023 lub sezon 2023/2024",
    }),
    defineField({
      name: "badges",
      title: "Odznaki",
      type: "array",
      of: [
        {
          type: "object",
          name: "badge",
          fields: [
            defineField({ name: "label", title: "Tekst", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "color",
              title: "Kolor",
              type: "string",
              options: {
                list: [
                  { title: "Czerwony", value: "red" },
                  { title: "Żółty", value: "yellow" },
                  { title: "Zielony", value: "green" },
                  { title: "Niebieski", value: "blue" },
                  { title: "Fioletowy", value: "purple" },
                  { title: "Szary", value: "gray" },
                ],
              },
              initialValue: "gray",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "color" },
          },
        },
      ],
    }),
    defineField({
      name: "isActive",
      title: "Aktywny w składzie",
      type: "boolean",
      description: "Odznacz, jeśli zawodnik odszedł z klubu (zostaje w bazie dla historii statystyk)",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "photoCard",
      number: "number",
    },
    prepare: ({ title, subtitle, media, number }) => ({
      title: `#${number} ${title}`,
      subtitle,
      media,
    }),
  },
});