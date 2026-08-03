"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { urlFor } from "../../lib/sanity";
import type { GalleryItem } from "../../lib/gallery";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-brand-muted">
        Galeria jest jeszcze pusta — wkrótce pojawią się tu zdjęcia z meczów i wydarzeń klubowych.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: (index % 3) * 0.1, ease: "easeOut" }}
        >
          <Link
            href={`/galeria/${item.sourceType}-${item.id}`}
            className="group block overflow-hidden rounded-2xl border border-brand-border bg-brand-surface transition-colors hover:border-brand-red"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={urlFor(item.photos[0]).width(600).height(340).url()}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {item.photos.length} {item.photos.length === 1 ? "zdjęcie" : "zdjęć"}
              </div>
            </div>
            <div className="p-4">
              <p className="font-bebas text-xl leading-tight text-white">{item.title}</p>
              <p className="text-xs text-brand-muted">{formatDate(item.date)}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}