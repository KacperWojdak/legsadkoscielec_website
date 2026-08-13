"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { urlFor } from "../../../lib/sanity";

export default function NewsImageLightbox({ image, title }: { image: any; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    if (!pushedRef.current) {
      window.history.pushState({ lightbox: true }, "");
      pushedRef.current = true;
    }

    const handlePopState = () => {
      pushedRef.current = false;
      setIsOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  const close = () => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative mb-6 block aspect-video w-full cursor-pointer overflow-hidden rounded-xl border border-brand-border"
      >
        <Image
          src={urlFor(image).width(1200).url()}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-black/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white transition-colors group-hover:bg-brand-red">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          Zobacz pełne zdjęcie
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex flex-col bg-black/95"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-2 top-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-brand-black/60 text-white/60 hover:text-white"
              aria-label="Zamknij"
            >
              ✕
            </button>

            <div className="relative flex flex-1 items-center justify-center p-4">
                <div
                    className="relative h-full w-full max-w-4xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                    src={urlFor(image).width(1600).url()}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    />
                </div>
                </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}