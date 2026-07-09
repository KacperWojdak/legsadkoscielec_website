export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 text-center md:text-left">

          {/* KOLUMNA 1 — logo i opis */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-white.png"
                alt="GKS Legsad Kościelec"
                className="h-10 w-10 object-contain"
              />
              <span className="font-bebas text-lg tracking-wider text-white">
                Legsad Kościelec
              </span>
            </div>
            <p className="text-xs leading-relaxed text-brand-muted">
              Oficjalna strona GKS Legsad Kościelec.
            </p>
            <div className="flex flex-wrap gap-3">
            {[
                {
                label: "Facebook",
                href: "https://www.facebook.com/BlekitniKoscielec",
                icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                ),
                },
                {
                label: "Instagram",
                href: "https://www.instagram.com/gks_legsad_koscielec",
                icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                ),
                },
                {
                label: "TikTok",
                href: "https://www.tiktok.com/@gks_legsad_koscielec",
                icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                    </svg>
                ),
                },
                {
                label: "YouTube",
                href: "https://www.youtube.com/@GKSLegsadKoscielec",
                icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    </svg>
                ),
                },
                {
                label: "X (Twitter)",
                href: "https://www.x.com/GKSLegsad",
                icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.5 2.25H8.79l4.262 5.632 5.192-5.632z" />
                    </svg>
                ),
                },
            ].map((social) => (
                <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-brand-border p-2 text-brand-muted transition-colors hover:border-brand-red hover:text-brand-red"
                aria-label={social.label}
                >
                {social.icon}
                </a>
            ))}
            </div>
          </div>

          {/* KOLUMNA 2 — nawigacja */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              Nawigacja
            </p>
            {[
              { label: "Aktualności", href: "/aktualnosci" },
              { label: "Terminarz", href: "/terminarz" },
              { label: "Drużyna", href: "/druzyna" },
              { label: "O klubie", href: "/o-klubie" }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-brand-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* KOLUMNA 3 — kontakt */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              Kontakt
            </p>
            <a
              href="mailto:gkslegsadkoscielec@wp.pl"
              className="text-xs text-brand-muted transition-colors hover:text-white"
            >
              gkslegsadkoscielec@wp.pl
            </a>
            <a
              href="tel:+48721035479"
              className="text-xs text-brand-muted transition-colors hover:text-white"
            >
              +48 721 035 479
            </a>
          </div>

        </div>

        {/* DOLNA BELKA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-brand-border pt-6 pb-16 md:pb-6 md:flex-row">
          <p className="text-xs text-brand-muted">
            © {year} GKS Legsad Kościelec. Wszelkie prawa zastrzeżone.
          </p>
        </div>

      </div>
    </footer>
  );
}