"use client";

export default function ScrollToHarmonogram() {
  return (
    <a
      href="#harmonogram"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("harmonogram")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="rounded-lg border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
    >
      Harmonogram treningów
    </a>
  );
}