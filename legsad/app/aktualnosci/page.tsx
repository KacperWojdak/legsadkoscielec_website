"use client";

import { useState } from "react";
import news from "../../data/news.json";
import NewsCard from "../components/NewsCard";
import PageHeaderAccent from "../components/PageHeaderAccent";

const PER_PAGE = 9;

export default function AktualnosciPage() {
  const [page, setPage] = useState(1);

  const sorted = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-brand-crimson/20 to-brand-black pt-32 pb-20">
    <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">

        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Klub
          </p>
          <h1 className="font-bebas text-5xl text-white md:text-6xl">
            Aktualności
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                  p === page
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-border text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}