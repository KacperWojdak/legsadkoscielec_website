import type { MetadataRoute } from "next";
import { getNews, getSeasons, getMatchesBySeason } from "../lib/queries";
import { getAllGalleryItems } from "../lib/gallery";

const BASE_URL = "https://gkslegsadkoscielec.netlify.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/terminarz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/druzyna`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/aktualnosci`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/galeria`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/o-klubie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const news = await getNews();
  const newsPages: MetadataRoute.Sitemap = news.map((article: any) => ({
    url: `${BASE_URL}/aktualnosci/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);
  const matches = currentSeason ? await getMatchesBySeason(currentSeason._id) : [];
  const finishedMatches = matches.filter((m: any) => m.status === "finished");

  const matchPages: MetadataRoute.Sitemap = finishedMatches.map((match: any) => ({
    url: `${BASE_URL}/mecz/${match._id}`,
    lastModified: new Date(match.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const galleryItems = await getAllGalleryItems();
  const galleryPages: MetadataRoute.Sitemap = galleryItems.map((item) => ({
    url: `${BASE_URL}/galeria/${item.sourceType}-${item.id}`,
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...newsPages, ...matchPages, ...galleryPages];
}