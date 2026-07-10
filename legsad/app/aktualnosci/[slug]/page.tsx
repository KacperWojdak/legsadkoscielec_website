import Link from "next/link";
import { notFound } from "next/navigation";
import news from "../../../data/news.json";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);

  if (!article) notFound();

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">

        <Link
          href="/aktualnosci"
          className="mb-6 inline-block text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-white"
        >
          ← Wróć do aktualności
        </Link>

        <div className="mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-brand-border">
          <img
            src={`/images/news/${article.image}`}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mb-6">
          <div className="mb-3 flex items-center gap-3">
           {/* <span className="rounded bg-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {article.category}
            </span>*/}
            <span className="text-xs text-brand-muted">{formatDate(article.date)}</span>
          </div>
          <h1 className="font-bebas text-4xl leading-tight text-white md:text-5xl">
            {article.title}
          </h1>
        </div>

        <div className="flex flex-col gap-4 border-t border-brand-border pt-6">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/70">
              {paragraph}
            </p>
          ))}
        </div>

      </div>
    </main>
  );
}