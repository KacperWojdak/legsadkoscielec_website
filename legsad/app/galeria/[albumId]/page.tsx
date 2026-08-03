import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeaderAccent from "../../components/PageHeaderAccent";
import { client } from "../../../lib/sanity";
import { getMatchById } from "../../../lib/queries";
import AlbumClient from "./AlbumClient";
import type { Metadata } from "next";
import { urlFor } from "../../../lib/sanity";

async function getAlbumData(albumId: string) {
  const [sourceType, ...idParts] = albumId.split("-");
  const id = idParts.join("-");

  if (sourceType === "match") {
    const match = await getMatchById(id);
    if (!match || !match.photos || match.photos.length === 0) return null;

    const opponent = match.opponent?.name ?? "Przeciwnik";
    const home = match.homeIsLegsad ? "Legsad Kościelec" : opponent;
    const away = match.homeIsLegsad ? opponent : "Legsad Kościelec";

    return {
      title: `${home} vs ${away}`,
      date: match.date,
      photos: match.photos,
    };
  }

  if (sourceType === "gallery") {
    const gallery = await client.fetch(
      `*[_type == "gallery" && _id == $id][0] { title, date, photos }`,
      { id }
    );
    if (!gallery) return null;
    return gallery;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ albumId: string }>;
}): Promise<Metadata> {
  const { albumId } = await params;
  const album = await getAlbumData(albumId);

  if (!album) {
    return { title: "Album nie znaleziony | GKS Legsad Kościelec" };
  }

  const coverImage = album.photos?.[0]
    ? urlFor(album.photos[0]).width(1200).height(630).url()
    : undefined;

  return {
    title: `${album.title} — Galeria | GKS Legsad Kościelec`,
    description: `Zdjęcia: ${album.title}. Zobacz pełny album w galerii GKS Legsad Kościelec.`,
    openGraph: {
      title: `${album.title} — Galeria`,
      description: `Zdjęcia z: ${album.title}`,
      images: coverImage ? [{ url: coverImage, width: 1200, height: 630 }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${album.title} — Galeria`,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  const album = await getAlbumData(albumId);

  if (!album) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-crimson/20 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-6xl px-6">

        <Link
          href="/galeria"
          className="mb-6 inline-block text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-white"
        >
          ← Wróć do galerii
        </Link>

        <div className="mb-10 text-center">
          <h1 className="font-bebas text-4xl text-white md:text-5xl">{album.title}</h1>
          <p className="mt-2 text-sm text-brand-muted">
            {new Date(album.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <AlbumClient photos={album.photos} title={album.title} />

      </div>
    </main>
  );
}