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