import Link from "next/link";
import Image from "next/image";
import { getAcademy } from "../../lib/queries";

export default async function AcademyPromo() {
  const academy = await getAcademy();
  const groups = academy?.groups ?? [];

  return (
    <section className="border-b border-brand-border bg-brand-black py-10">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-brand-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Akademia
          </span>
          <div className="h-px flex-1 bg-brand-border" />
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-academy-red to-[#8f0f26] p-6 md:p-10">
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 opacity-10 md:h-80 md:w-80">
            <Image
              src="/images/logo-white.png"
              alt=""
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain"
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <h2 className="font-bebas text-4xl leading-none text-white md:text-5xl">
              Akademia Piłkarska Legsad
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
              Zapraszamy chłopców i dziewczynki na treningi na boisku w Janowicach Dużych.
              Nie ma znaczenia, czy Twoje dziecko już trenuje, czy dopiero chce kopnąć piłkę
              po raz pierwszy. Przyjdźcie i spróbujcie!
            </p>

            {groups.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {groups.map((group: any) => (
                  <span
                    key={group._key}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                  >
                    {group.name}{" "}
                    <span className="font-normal normal-case text-white/70">{group.years}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/akademia"
                className="rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-academy-red transition-opacity hover:opacity-90"
              >
                Poznaj Akademię
              </Link>
              <Link
                href="/akademia/aktualnosci"
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Aktualności Akademii
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}