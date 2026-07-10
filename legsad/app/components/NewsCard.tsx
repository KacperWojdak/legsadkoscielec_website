import Link from "next/link";

const categoryColor: Record<string, string> = {
  "Klub": "bg-brand-red",
  "Wynik": "bg-green-700",
  "Zapowiedź": "bg-blue-700",
  "Transfery": "bg-yellow-700",
};

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
  category,
  date,
  image,
  lead,
}: {
  slug: string;
  title: string;
  category: string;
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
        <span className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${categoryColor[category] ?? "bg-brand-red"}`}>
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs text-brand-muted">{formatDate(date)}</span>
        <h3 className="font-bebas text-xl leading-tight text-white">{title}</h3>
        <p className="line-clamp-2 text-sm text-white/60">{lead}</p>
      </div>
    </Link>
  );
}