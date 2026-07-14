"use client";

import { useState } from "react";
import NewsCard from "../components/NewsCard";

const PER_PAGE = 9;

export default function NewsClient({ news }: { news: any[] }) {
  const [page, setPage] = useState(1);

  const sorted = [...news].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginated.map((article) => (
          <NewsCard key={article._id} {...article} />
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
    </>
  );
}