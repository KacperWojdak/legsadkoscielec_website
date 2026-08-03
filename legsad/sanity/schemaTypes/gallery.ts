import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Galeria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł galerii",
      type: "string",
      description: "Np. Trening przygotowawczy, Sparing z Jaworzanką II",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Zdjęcia",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "photos.0" },
  },
});