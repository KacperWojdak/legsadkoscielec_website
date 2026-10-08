import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/sanity";

export default function NewsCard({
  slug,
  title,
  publishedAt,
  mainImage,
  lead,
  isAkademia,
}: {
  slug: string;
  title: string;
  publishedAt: string;
  mainImage: any;
  lead: string;
  isAkademia?: boolean;
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
      href={`/aktualnosci/${slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-brand-surface transition-colors ${
        isAkademia
          ? "border-brand-pink/50 hover:border-brand-pink"
          : "border-brand-border hover:border-brand-red"
      }`}
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
        <div className="flex items-center gap-2">
          <span className="text-xs text-brand-muted">{formatDate(publishedAt)}</span>
          {isAkademia && (
            <span className="rounded-md border border-brand-pink/50 bg-brand-pink/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-pink">
              Akademia
            </span>
          )}
        </div>
        <h3 className="font-bebas text-xl leading-tight text-white">{title}</h3>
        <p className="line-clamp-2 text-sm text-white/60">{lead}</p>
      </div>
    </Link>
  );
}