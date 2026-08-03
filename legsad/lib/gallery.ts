import { getStandaloneGalleries, getMatchesWithPhotos } from "./queries";

export type GalleryItem = {
  id: string;
  title: string;
  date: string;
  photos: any[];
  sourceType: "match" | "gallery";
  sourceHref?: string;
};

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const [galleries, matches] = await Promise.all([
    getStandaloneGalleries(),
    getMatchesWithPhotos(),
  ]);

  const galleryItems: GalleryItem[] = galleries.map((g: any) => ({
    id: g._id,
    title: g.title,
    date: g.date,
    photos: g.photos,
    sourceType: "gallery" as const,
  }));

  const matchItems: GalleryItem[] = matches.map((m: any) => {
    const opponent = m.opponent?.name ?? "Przeciwnik";
    const home = m.homeIsLegsad ? "Legsad Kościelec" : opponent;
    const away = m.homeIsLegsad ? opponent : "Legsad Kościelec";
    return {
      id: m._id,
      title: `${home} vs ${away}`,
      date: m.date,
      photos: m.photos,
      sourceType: "match" as const,
      sourceHref: `/mecz/${m._id}`,
    };
  });

  return [...galleryItems, ...matchItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}