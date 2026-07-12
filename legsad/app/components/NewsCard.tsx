import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsCard({
  slug,
  title,
  date,
  image,
  lead,
}: {
  slug: string;
  title: string;
  date: string;
  image: string;
  lead: string;
}) {
  return (
    <Link
      href={`/aktualnosci/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface transition-colors hover:border-brand-red"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={`/images/news/${image}`}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs text-brand-muted">{formatDate(date)}</span>
        <h3 className="font-bebas text-xl leading-tight text-white">{title}</h3>
        <p className="line-clamp-2 text-sm text-white/60">{lead}</p>
      </div>
    </Link>
  );
}