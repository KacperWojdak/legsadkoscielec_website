import { getSponsors } from "../../lib/queries";
import { urlFor } from "../../lib/sanity";

export default async function Sponsors() {
  const sponsors = await getSponsors();
  const featured = sponsors.find((s: any) => s.featured);
  const others = sponsors.filter((s: any) => !s.featured);

  return (
    <section id="sponsorzy" className="border-b border-brand-border py-10">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-brand-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Partnerzy klubu
          </span>
          <div className="h-px flex-1 bg-brand-border" />
        </div>

        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex flex-col items-center gap-4 rounded-2xl border-2 border-brand-red bg-brand-surface px-8 py-8 transition-colors hover:bg-brand-red/5 md:flex-row md:justify-center"
          >
            <span className="text-[10px] uppercase tracking-widest text-brand-red md:hidden">
              Sponsor główny
            </span>
            <img
              src={featured.logo ? urlFor(featured.logo).width(200).url() : "/images/logo-white.png"}
              alt={featured.name}
              className="h-20 w-20 rounded-xl object-cover md:h-24 md:w-24"
            />
            <div className="text-center md:text-left">
              <span className="hidden text-[10px] uppercase tracking-widest text-brand-red md:block">
                Sponsor główny
              </span>
              <p className="font-bebas text-3xl text-white">{featured.name}</p>
            </div>
          </a>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {others.map((sponsor: any) => (
            <a
              key={sponsor._id}
              href={sponsor.url ?? undefined}
              target={sponsor.url ? "_blank" : undefined}
              rel={sponsor.url ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-border bg-brand-surface px-4 py-6 transition-colors hover:border-brand-red"
            >
              {sponsor.logo ? (
                <img
                  src={urlFor(sponsor.logo).width(120).url()}
                  alt={sponsor.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-black">
                  <span className="font-bebas text-xl text-brand-muted">
                    {sponsor.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-center text-xs font-medium text-white/70 leading-tight">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}