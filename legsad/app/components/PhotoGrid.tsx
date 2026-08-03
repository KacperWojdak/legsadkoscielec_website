"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { urlFor } from "../../lib/sanity";

export default function PhotoGrid({ photos, title }: { photos: any[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";

    window.history.pushState({ lightbox: true }, "");
    const handlePopState = () => setLightboxIndex(null);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [lightboxIndex]);

  const closeLightbox = () => {
    if (window.history.state?.lightbox) {
      window.history.back();
    } else {
      setLightboxIndex(null);
    }
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setDirection(1);
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setDirection(-1);
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  if (!photos || photos.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-brand-muted">
        Brak zdjęć w tej galerii.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(0);
              setLightboxIndex(index);
            }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-brand-border transition-colors hover:border-brand-red"
          >
            <Image
              src={urlFor(photo).width(400).height(400).url()}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex flex-col bg-black/95"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-2 top-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/60 hover:text-white"
              aria-label="Zamknij"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/70 hover:text-white"
              aria-label="Poprzednie zdjęcie"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/70 hover:text-white"
              aria-label="Następne zdjęcie"
            >
              ›
            </button>

            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={lightboxIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : direction < 0 ? -80 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : direction < 0 ? 80 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="relative h-full w-full max-w-4xl"
                >
                  <Image
                    src={urlFor(photos[lightboxIndex]).width(1400).url()}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="relative z-10 flex flex-col items-center gap-1 border-t border-brand-border bg-brand-black/60 px-4 py-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-bebas text-lg text-white">{title}</p>
              <p className="text-xs text-brand-muted">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}