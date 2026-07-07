import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-24 min-h-screen flex items-center">

      {/* WATERMARK — białe logo w tle */}
      <div className="absolute inset-0 flex items-center justify-center translate-y-16 opacity-[0.05] pointer-events-none">
        <img
          src="/images/logo-white.png"
          alt=""
          className="h-125 w-125 object-contain md:h-162.5 md:w-162.5"
        />
      </div>

      {/* GRADIENT tło */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-crimson/20 via-brand-red/5 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8 px-6 md:pl-8 md:pr-16 text-center md:text-left">

        {/* LEWA STRONA */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="font-bebas text-8xl leading-none text-white md:text-9xl">
            Gramy
          </h1>
          <h2 className="font-bebas text-8xl leading-none text-brand-red md:text-9xl">
            O wszystko
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
            Oficjalna strona GKS Legsad Kościelec.<br />
            Wyniki, skład, terminarz i więcej.
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/terminarz"
              className="rounded-lg bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
            >
              Najbliższy mecz
            </Link>
            <Link
              href="/aktualnosci"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white/70 transition-colors hover:border-white/50 hover:text-white"
            >
              Historia klubu
            </Link>
          </div>
        </div>

        {/* PRAWA STRONA — herb */}
        <div className="hidden md:flex shrink-0 items-center justify-end pr-8">
          <div className="relative h-64 w-64 rounded-full border-2 border-brand-red bg-black/50 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-brand-red/5" />
            <img
              src="/images/logo-pink.png"
              alt="GKS Legsad Kościelec"
              className="h-52 w-52 object-contain"
            />
          </div>
        </div>

      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

    </section>
  );
}