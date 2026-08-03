"use client";

import PhotoGrid from "../../components/PhotoGrid";

export default function AlbumClient({ photos, title }: { photos: any[]; title: string }) {
  return <PhotoGrid photos={photos} title={title} />;
}