import { defineField, defineType } from "sanity";

export default defineType({
  name: "news",
  title: "Aktualność",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (adres URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Zdjęcie główne",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead (krótki opis pod kafelkiem)",
      type: "text",
      rows: 2,
      description: "1-2 zdania widoczne na liście aktualności",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Treść artykułu",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    }),
    defineField({
      name: "isAkademia",
      title: "Akademia",
      type: "boolean",
      description: "Zaznacz, jeśli ta aktualność dotyczy Akademii — pojawi się też na /akademia/aktualnosci i dostanie wyróżnienie na liście głównej.",
      initialValue: false,
    }),
    ],
    preview: {
      select: {
        title: "title",
        media: "mainImage",
        isAkademia: "isAkademia",
      },
      prepare({ title, media, isAkademia }) {
        return {
          title,
          subtitle: isAkademia ? "Akademia" : undefined,
          media,
        };
      },
    },
  });