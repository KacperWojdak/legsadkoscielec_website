"use client";

import { motion } from "motion/react";
import PageHeaderAccent from "../components/PageHeaderAccent";

const zarzad = [
  { name: "Jarosław Małysa", role: "Prezes" },
  { name: "Dawid Kromka", role: "Wiceprezes" },
  { name: "Daniel Matysiak", role: "Kierownik klubu" },
  { name: "Joanna Mańkowska", role: "Kierowniczka I drużyny, Fotografka" },
  { name: "Marcin Strugała", role: "Koordynator" },
  { name: "Mateusz Wanielista", role: "Sekretarz" },
];

const infoCards = [
  { label: "Pełna nazwa", value: "Gminny Klub Sportowy Legsad Kościelec", accent: false },
  { label: "Rok założenia", value: "1993", accent: true },
];

export default function OKlubiePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-black to-brand-crimson/20 pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">

        {/* NAGŁÓWEK */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/images/logo-pink.png"
              alt="GKS Legsad Kościelec"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h1 className="font-bebas text-5xl text-white md:text-6xl">
            Poznaj nasz klub
          </h1>
        </motion.div>

        {/* PODSTAWOWE INFORMACJE */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-brand-surface p-6"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Pełna nazwa
            </p>
            <p className="font-bebas text-xl text-white">
              Gminny Klub Sportowy Legsad Kościelec
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-brand-surface p-6"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Rok założenia
            </p>
            <p className="font-bebas text-xl text-brand-red">
              1993
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-brand-surface p-6"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Adres / Stadion
            </p>
            <p className="text-sm text-white">
              Stadion Legsad Kościelec<br />
              Janowice Duże, 59-223 Krotoszyce
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-brand-surface p-6"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Kontakt
            </p>
            <a
              href="mailto:gkslegsadkoscielec@wp.pl"
              className="text-sm text-white transition-colors hover:text-brand-red"
            >
              gkslegsadkoscielec@wp.pl
            </a>
          </motion.div>

        </div>

        {/* ZARZĄD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-brand-border bg-brand-surface p-8 mb-8"
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Zarząd klubu
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {zarzad.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center gap-1"
              >
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-brand-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HISTORIA — placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 rounded-2xl border border-brand-border bg-brand-surface p-8"
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Historia klubu
          </p>
          <p className="text-center text-sm leading-relaxed text-brand-muted">
            Historia klubu w przygotowaniu — wkrótce znajdziesz tu pełną opowieść
            o drodze GKS Legsad Kościelec, w tym o zmianie nazwy z Błękitnych Kościelec.
          </p>
        </motion.div>
      </div>
    </main>
  );
}