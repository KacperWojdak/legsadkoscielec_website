import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../../lib/sanity";

export default function AcademyNewsCard({
  slug,
  title,
  publishedAt,
  mainImage,
  lead,
}: {
  slug: string;
  title: string;
  publishedAt: string;
  mainImage: any;
  lead: string;
}) {
  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const imageUrl = mainImage ? urlFor(mainImage).width(600).height(340).url() : "/images/logo-white.png";

  return (
    <Link
      href={`/aktualnosci/${slug}?from=akademia`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-academy-border bg-academy-surface shadow-sm transition-colors hover:border-academy-red"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs text-academy-muted">{formatDate(publishedAt)}</span>
        <h3 className="font-bebas text-xl leading-tight text-academy-ink">{title}</h3>
        <p className="line-clamp-2 text-sm text-academy-ink/60">{lead}</p>
      </div>
    </Link>
  );
}