import { defineField, defineType } from "sanity";

export default defineType({
  name: "staff",
  title: "Sztab szkoleniowy",
  type: "document",
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
      description: "Np. I trener, II trener / asystent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Zdjęcie",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Kolejność wyświetlania",
      type: "number",
      description: "Niższa liczba = wyżej na liście, np. 1 dla I trenera, 2 dla asystenta",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});