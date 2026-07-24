"use client";

import { useState } from "react";
import { motion } from "motion/react";
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
        {paginated.map((article, index) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
          >
            <NewsCard {...article} />
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border text-sm transition-colors cursor-pointer ${
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