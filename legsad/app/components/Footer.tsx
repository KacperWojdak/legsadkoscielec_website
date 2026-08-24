import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-white.png"
                alt="GKS Legsad Kościelec"
                width={35}
                height={35}
                className="object-contain"
              />
              <span className="font-bebas text-lg tracking-wider text-white">
                GKS Legsad Kościelec
              </span>
            </div>
            <p className="text-xs leading-relaxed text-brand-muted">
              Zapraszamy na nasze social media.
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
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-border text-brand-muted transition-colors hover:border-brand-red hover:text-brand-red"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
            ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              Nawigacja
            </p>
            {[
              { label: "Aktualności", href: "/aktualnosci" },
              { label: "Terminarz", href: "/terminarz" },
              { label: "Tabela", href: "/tabela" },
              { label: "Drużyna", href: "/druzyna" },
              { label: "Galeria", href: "/galeria" },
              { label: "O klubie", href: "/o-klubie" },
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

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-brand-border pt-6 pb-16 md:flex-row md:pb-6">
          <p className="text-xs text-brand-muted">
            © {year} GKS Legsad Kościelec. Wszelkie prawa zastrzeżone.
          </p>
          <a
            href="https://github.com/KacperWojdak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-brand-muted transition-colors hover:text-brand-red"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Projekt i wykonanie: Kacper Wojdak
          </a>
        </div>

      </div>
    </footer>
  );
}