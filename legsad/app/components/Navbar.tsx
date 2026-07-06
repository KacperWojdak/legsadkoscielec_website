"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Terminarz", href: "/terminarz" },
  { label: "Drużyna", href: "/druzyna" },
  { label: "Sponsorzy", href: "/sponsorzy" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl rounded-2xl border border-white/10 bg-black/30 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">
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
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wide text-white/60 transition-colors hover:text-red-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* HAMBURGER */}
          <button
            className="flex flex-col gap-1.5 md:hidden cursor-pointer"
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
            <div className="mt-4 flex flex-col items-center gap-4 border-t border-white/10 pt-4 md:hidden">
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
            </div>
        )}

      </nav>
    </div>
  );
}