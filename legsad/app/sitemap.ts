import type { MetadataRoute } from "next";
import { getNews, getSeasons, getMatchesBySeason } from "../lib/queries";
import { SITE_URL } from "../lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/terminarz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/druzyna`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/aktualnosci`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/o-klubie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const news = await getNews();
  const newsPages: MetadataRoute.Sitemap = news.map((article: any) => ({
    url: `${SITE_URL}/aktualnosci/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);
  const matches = currentSeason ? await getMatchesBySeason(currentSeason._id) : [];
  const finishedMatches = matches.filter((m: any) => m.status === "finished");

  const matchPages: MetadataRoute.Sitemap = finishedMatches.map((match: any) => ({
    url: `${SITE_URL}/mecz/${match._id}`,
    lastModified: new Date(match.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...newsPages, ...matchPages];
}