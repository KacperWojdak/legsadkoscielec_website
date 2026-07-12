import { defineField, defineType } from "sanity";

export default defineType({
  name: "club",
  title: "Klub przeciwnika",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa klubu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});