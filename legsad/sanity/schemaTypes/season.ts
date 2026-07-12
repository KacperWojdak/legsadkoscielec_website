import { defineField, defineType } from "sanity";

export default defineType({
  name: "season",
  title: "Sezon",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Etykieta sezonu",
      type: "string",
      description: "Np. 2026/2027",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "league",
      title: "Liga",
      type: "string",
      description: "Np. Klasa A · Legnica gr. 3",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Aktualny sezon",
      type: "boolean",
      description: "Zaznacz, jeśli to trwający sezon (statystyki liczone automatycznie z meczów)",
      initialValue: false,
    }),
    defineField({
      name: "miejsce",
      title: "Miejsce w tabeli",
      type: "string",
      description: "Wpisywane ręcznie, np. 4. — aktualizuj po każdej kolejce",
    }),
    defineField({
      name: "historicalStats",
      title: "Statystyki historyczne (tylko dla zakończonych sezonów)",
      type: "object",
      description: "Wypełnij tylko jeśli sezon jest zakończony i nie liczymy go automatycznie z meczów",
      fields: [
        defineField({ name: "mecze", title: "Mecze", type: "number" }),
        defineField({ name: "zwyciestwa", title: "Zwycięstwa", type: "number" }),
        defineField({ name: "remisy", title: "Remisy", type: "number" }),
        defineField({ name: "porazki", title: "Porażki", type: "number" }),
        defineField({ name: "goleZdobyte", title: "Gole zdobyte", type: "number" }),
        defineField({ name: "goleStracone", title: "Gole stracone", type: "number" }),
        defineField({ name: "punkty", title: "Punkty", type: "number" }),
        defineField({ name: "uSiebie", title: "Bilans u siebie (W-R-P)", type: "string" }),
        defineField({ name: "naWyjezdzie", title: "Bilans na wyjeździe (W-R-P)", type: "string" }),
        defineField({ name: "krolStrzelcow", title: "Król strzelców", type: "string" }),
        defineField({ name: "krolStrzelcowBramki", title: "Liczba bramek króla strzelców", type: "number" }),
        defineField({ name: "krolAsyst", title: "Król asyst", type: "string" }),
        defineField({ name: "krolAsystLiczba", title: "Liczba asyst króla asyst", type: "number" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "league",
    },
  },
});