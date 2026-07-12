import { defineField, defineType } from "sanity";

export default defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Opcjonalne — jeśli brak, wyświetli się inicjał nazwy",
    }),
    defineField({
      name: "url",
      title: "Strona / link",
      type: "url",
      description: "Opcjonalne — link do strony lub Facebooka sponsora",
    }),
    defineField({
      name: "featured",
      title: "Sponsor główny",
      type: "boolean",
      description: "Zaznacz dla sponsora głównego (wyróżniony na stronie)",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Kolejność wyświetlania",
      type: "number",
      description: "Niższa liczba = wyżej na liście",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
      featured: "featured",
    },
    prepare: ({ title, media, featured }) => ({
      title: featured ? `⭐ ${title}` : title,
      media,
    }),
  },
});