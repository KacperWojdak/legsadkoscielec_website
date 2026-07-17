import Image from "next/image";
import { getMatchesBySeason, getSeasons } from "../../lib/queries";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NextMatch() {
  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);
  if (!currentSeason) return null;

  const matches = await getMatchesBySeason(currentSeason._id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const match = matches
    .filter((m: any) => new Date(m.date) >= today && m.status === "upcoming")
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;

  if (!match) return null;

  const home = match.homeIsLegsad ? "Legsad Kościelec" : match.opponent.name;
  const away = match.homeIsLegsad ? match.opponent.name : "Legsad Kościelec";

  return (
    <section className="border-b border-brand-border bg-brand-black py-10">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-brand-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Najbliższy mecz
          </span>
          <div className="h-px flex-1 bg-brand-border" />
        </div>

        <div className="rounded-2xl border border-brand-pink/50 bg-brand-surface p-6 md:p-10">

          <div className="mb-6 flex flex-wrap items-center justify-center md:justify-between gap-2">
            <span className="text-sm text-white/50 capitalize">
              {formatDate(match.date)} · {match.time}
            </span>
            <span className="rounded-md border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
              {match.league} · Kolejka {match.round}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">

            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                {match.homeIsLegsad ? (
                  <Image src="/images/logo-pink.png" alt="Legsad Kościelec" width={48} height={48} className="object-contain" />
                ) : (
                  <Image
                    src={match.opponent.logoUrl ?? "/images/logo-white.png"}
                    alt={home}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
              </div>
              <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                {home}
              </span>
              <span className="text-xs uppercase tracking-widest text-brand-muted">
                {match.homeIsLegsad ? "Gospodarze" : "Goście"}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="font-bebas text-5xl text-brand-border">VS</span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-border bg-white">
                {!match.homeIsLegsad ? (
                  <Image src="/images/logo-pink.png" alt="Legsad Kościelec" width={48} height={48} className="object-contain" />
                ) : (
                  <Image
                    src={match.opponent.logoUrl ?? "/images/logo-white.png"}
                    alt={away}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
              </div>
              <span className="font-bebas text-xl leading-tight text-white md:text-2xl">
                {away}
              </span>
              <span className="text-xs uppercase tracking-widest text-brand-muted">
                {!match.homeIsLegsad ? "Gospodarze" : "Goście"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}