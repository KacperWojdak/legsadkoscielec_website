"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Terminarz", href: "/terminarz" },
  { label: "Drużyna", href: "/druzyna" },
  { label: "O klubie", href: "/o-klubie" },
];

function scrollToSponsors(router: ReturnType<typeof useRouter>, pathname: string) {
  if (pathname === "/") {
    document.getElementById("sponsorzy")?.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push("/");
    setTimeout(() => {
      document.getElementById("sponsorzy")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
}

export default function Navbar({ matchPill }: { matchPill: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-black/30 px-6 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">

          <Link
            href="/"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo-pink.png"
              alt="GKS Legsad Kościelec"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="font-bebas text-lg tracking-wider text-white">
              GKS Legsad Kościelec
            </span>
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wide text-white/60 transition-colors hover:text-red-500 cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSponsors(router, pathname)}
                className="text-sm uppercase tracking-wide text-white/60 transition-colors hover:text-red-500 cursor-pointer"
              >
                Sponsorzy
              </button>
            </li>
          </ul>

          <button
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 lg:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>

        </div>

        {menuOpen && (
          <div className="mt-4 flex flex-col items-center gap-4 border-t border-white/10 pt-4 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wide text-white/60 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                scrollToSponsors(router, pathname);
                setMenuOpen(false);
              }}
              className="text-sm uppercase tracking-wide text-white/60 hover:text-white text-left"
            >
              Sponsorzy
            </button>
          </div>
        )}

        <div className={`absolute left-1/2 -translate-x-1/2 items-center gap-1.5 rounded-full border border-brand-border bg-brand-black/80 px-2.5 py-1 lg:gap-2 lg:px-4 lg:py-1.5 ${menuOpen ? "hidden" : "flex"} lg:flex`}>
          {matchPill}
        </div>

      </nav>
    </div>
  );
}