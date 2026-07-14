"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-24 min-h-screen flex items-center">
      <div className="absolute inset-0 flex items-center justify-center translate-y-16 opacity-[0.05] pointer-events-none">
        <img
          src="/images/logo-white.png"
          alt=""
          className="h-125 w-125 object-contain md:h-162.5 md:w-162.5"
        />
      </div>

      <img
        src="/images/effects/brush-top-left.png"
        alt=""
        className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 opacity-60 md:h-80 md:w-80"
      />
      <img
        src="/images/effects/brush-bottom-right.png"
        alt=""
        className="pointer-events-none absolute -bottom-12 -right-18 h-56 w-56 opacity-60 md:h-80 md:w-80"
      />

      <img
        src="/images/effects/brush-diagonal.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 hidden h-[160%] w-[60%] object-cover opacity-30 md:block"
        style={{ objectPosition: "right center" }}
      />

      <div className="absolute inset-0 bg-linear-to-br from-brand-crimson/20 via-brand-red/5 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8 px-6 md:pl-8 md:pr-16 text-center md:text-left">

        <div className="flex-1 flex flex-col items-center md:items-start">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-bebas text-8xl leading-none text-white md:text-9xl"
          >
            Jeden klub
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="font-bebas text-8xl leading-none text-brand-red md:text-9xl"
          >
            Jedna rodzina
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-6 max-w-sm text-sm leading-relaxed text-white/50"
          >
            Oficjalna strona GKS Legsad Kościelec.<br />
            Wyniki, skład, terminarz i więcej.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <Link
              href="/terminarz"
              className="rounded-lg bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
            >
              Terminarz
            </Link>
            <Link
              href="/o-klubie"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white/70 transition-colors hover:border-white/50 hover:text-white"
            >
              O klubie
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden md:flex shrink-0 items-center justify-end pr-8"
        >
          <img
            src="/images/logo-pink.png"
            alt="GKS Legsad Kościelec"
            className="relative z-10 h-52 w-52 object-contain scale-125"
          />
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

    </section>
  );
}