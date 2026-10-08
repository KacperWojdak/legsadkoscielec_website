import Link from "next/link";
import type { Metadata } from "next";
import FadeInSection from "../components/FadeInSection";
import Image from "next/image";
import Footer from "../components/Footer";
import { getAcademy } from "../../lib/queries";
import ScrollToHarmonogram from "./ScrollToHarmonogram";

export const metadata: Metadata = {
  title: "Akademia | GKS Legsad Kościelec",
  description: "Akademia Piłkarska GKS Legsad Kościelec — grupy wiekowe Skrzat, Żak, Orlik, Młodzik, Trampkarz. Treningi w Janowicach Dużych.",
};

export default async function AkademiaPage() {
  const academy = await getAcademy();

  const groups = academy?.groups ?? [];
  const schedule = academy?.schedule ?? [];
  const coaches = academy?.coaches ?? [];
  const sallerLinks = [
    { label: "Saller Akademia", url: academy?.sallerAkademiaUrl },
    { label: "Saller Rodzice", url: academy?.sallerRodziceUrl },
  ].filter((link) => link.url);
  const hasCoordinator = Boolean(academy?.coordinatorName);

  return (
    <main className="relative min-h-screen overflow-hidden bg-academy-bg">

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-academy-red to-[#8f0f26] pt-40 pb-20">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <FadeInSection>
            <div className="mx-auto mb-4 h-32 w-32">
            <Image
                src="/images/logo-white.png"
                alt="GKS Legsad Kościelec"
                width={200}
                height={200}
                className="h-full w-full object-contain"
            />
            </div>
            <h1 className="font-bebas text-6xl leading-none text-white md:text-7xl">
                Akademia Piłkarska Legsad
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Zapraszamy chłopców i dziewczynki, którzy chcą spróbować swoich sił na boisku!
              Nie ma znaczenia, czy Twoje dziecko już trenuje, czy dopiero pierwszy raz chce
              kopnąć piłkę — to dobra okazja, żeby przyjść, sprawdzić się, aktywnie spędzić czas
              i może rozpocząć swoją piłkarską przygodę właśnie z nami.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/akademia/aktualnosci"
                className="rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-academy-red transition-opacity hover:opacity-90"
              >
                Aktualności Akademii
              </Link>

              <ScrollToHarmonogram />

            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* GRUPY WIEKOWE */}
        <FadeInSection>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-academy-red">
              Dołącz do nas
            </p>
            <h2 className="font-bebas text-4xl text-academy-ink md:text-5xl">
              Grupy wiekowe
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-academy-muted">
              Zapraszamy dzieci urodzone w poniższych rocznikach
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {groups.map((group: any) => (
              <div
                key={group._key}
                className="flex flex-col items-center gap-1 rounded-2xl border border-academy-border bg-academy-surface px-4 py-6 text-center shadow-sm"
              >
                <span className="font-bebas text-2xl text-academy-red">{group.name}</span>
                <span className="text-xs text-academy-muted">{group.years}</span>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* HARMONOGRAM */}
        <FadeInSection>
          <div id="harmonogram" className="mb-10 scroll-mt-28 text-center">
            <h2 className="font-bebas text-4xl text-academy-ink md:text-5xl">
              Harmonogram treningów
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
            {schedule.map((block: any) => (
              <div
                key={block.key}
                className="rounded-2xl border border-academy-border bg-academy-surface p-5 shadow-sm"
              >
                <p className="mb-3 font-bebas text-xl text-academy-ink">{block.groups}</p>
                <div className="flex flex-col gap-2">
                  {(block.sessions ?? []).map((session: any) => (
                    <div key={session.day} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-academy-ink">{session.day}</span>
                      <span className="text-academy-muted">{session.time}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-academy-red">
                  📍 {block.location}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* SZTAB TRENERÓW */}
        <FadeInSection>
          <div className="mb-8 text-center">
            <h2 className="font-bebas text-4xl text-academy-ink md:text-5xl">
              Sztab trenerów
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="mb-16 flex flex-wrap justify-center gap-4">
            {coaches.map((coach: any) => (
              <div
                key={coach.key}
                className="flex min-h-28 w-[calc(50%-0.5rem)] flex-col items-center justify-center gap-1 rounded-2xl border border-academy-border bg-academy-surface px-4 py-5 text-center shadow-sm sm:w-56"
              >
                <span className="font-bebas text-xl text-academy-ink">{coach.name}</span>
                <span className="text-xs uppercase tracking-widest text-academy-muted">{coach.role}</span>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* PARTNERZY — SALLER */}
        {sallerLinks.length > 0 && (
          <>
        <FadeInSection>
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-academy-red">
              Partner Akademii
            </p>
            <h2 className="font-bebas text-4xl text-academy-ink md:text-5xl">
              Saller
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sallerLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-academy-border bg-academy-surface px-6 py-5 shadow-sm transition-colors hover:border-academy-red"
              >
                <span className="font-bebas text-xl text-academy-ink">{item.label}</span>
                <span className="text-academy-red transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </FadeInSection>
        </>
        )}

        {/* KONTAKT / KOORDYNATOR */}
        {hasCoordinator && (
          <FadeInSection>
            <div className="rounded-2xl border border-academy-border bg-academy-surface p-8 text-center shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-academy-red">
                Kontakt
              </p>
              <p className="font-bebas text-2xl text-academy-ink">{academy.coordinatorName}</p>
              <p className="mt-1 text-sm text-academy-muted">{academy.coordinatorRole}</p>
              <a
                href={`tel:+48${String(academy.coordinatorPhone ?? "").replace(/\s/g, "")}`}
                className="mt-4 inline-block rounded-lg bg-academy-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                {academy.coordinatorPhone}
              </a>
            </div>
          </FadeInSection>
        )}

      </div>

      <Footer />
    </main>
  );
}