const zarzad = [
  { name: "Jarosław Małysa", role: "Prezes" },
  { name: "Dawid Kromka", role: "Wiceprezes" },
  { name: "Daniel Matysiak", role: "Kierownik klubu" },
  { name: "Joanna Mańkowska", role: "Kierowniczka I drużyny, Fotografka" },
  { name: "Marcin Strugała", role: "Koordynator" },
  { name: "Mateusz Wanielista", role: "Sekretarz" },
];

export default function OKlubiePage() {
  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">

        {/* NAGŁÓWEK */}
        <div className="mb-10 text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="/images/logo-pink.png"
              alt="GKS Legsad Kościelec"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h1 className="font-bebas text-5xl text-white md:text-6xl">
            Poznaj nasz klub
          </h1>
        </div>

        {/* PODSTAWOWE INFORMACJE */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Pełna nazwa
            </p>
            <p className="font-bebas text-xl text-white">
              Gminny Klub Sportowy Legsad Kościelec
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Rok założenia
            </p>
            <p className="font-bebas text-xl text-brand-red">
              1993
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Adres / Stadion
            </p>
            <p className="text-sm text-white">
              Stadion Legsad Kościelec<br />
              Janowice Duże, 59-223 Krotoszyce
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
              Kontakt
            </p>
            <a
              href="mailto:gkslegsadkoscielec@wp.pl"
              className="text-sm text-white transition-colors hover:text-brand-red"
            >
              gkslegsadkoscielec@wp.pl
            </a>
          </div>

        </div>

        {/* ZARZĄD */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-8 mb-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Zarząd klubu
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {zarzad.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center gap-1">
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-brand-muted">{member.role}</p>
            </div>
            ))}
        </div>
        </div>

        {/* HISTORIA — placeholder */}
        <div className="mb-8 rounded-2xl border border-brand-border bg-brand-surface p-8">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                Historia klubu
            </p>
            <p className="text-center text-sm leading-relaxed text-brand-muted">
                Historia klubu w przygotowaniu — wkrótce znajdziesz tu pełną opowieść
                o drodze GKS Legsad Kościelec, w tym o zmianie nazwy z Błękitnych Kościelec.
            </p>
        </div>
      </div>
    </main>
  );
}