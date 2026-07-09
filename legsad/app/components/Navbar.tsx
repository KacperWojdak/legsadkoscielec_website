"use client";

import Link from "next/link";
import { useState } from "react";
import matchesData from "../../data/matches.json"
import { useRouter, usePathname } from "next/navigation";

const links = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Terminarz", href: "/terminarz" },
  { label: "Drużyna", href: "/druzyna" },
  { label: "O klubie", href: "/o-klubie" },
];

function getNextMatch() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return matchesData
    .filter((m) => new Date(m.date) >= today && m.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;
}

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

export default function Navbar() {
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
          className="flex items-center gap-3">
            <img
              src="/images/logo-pink.png"
              alt="GKS Legsad Kościelec"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bebas text-lg tracking-wider text-white">
              GKS Legsad Kościelec
            </span>
          </Link>

          {/* DESKTOP LINKS */}
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

          {/* HAMBURGER */}
          <button
            className="flex flex-col gap-1.5 lg:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>

        </div>

        {/* MOBILE MENU */}
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

        {/* NEXT MATCH PILL — desktop */}
          {(() => {
            const next = getNextMatch();
            if (!next) return null;
            const opponent = next.homeIsLegsad ? next.away : next.home;
            const date = new Date(next.date).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
            return (
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 rounded-full border border-brand-border bg-brand-black/80 px-4 py-1.5">
                <span className="text-[10px]">
                  {next.homeIsLegsad ? "🏠" : "🚌"}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-white/70">
                  {date} · vs {opponent}
                </span>
              </div>
            );
          })()}

      </nav>
    </div>
  );
}