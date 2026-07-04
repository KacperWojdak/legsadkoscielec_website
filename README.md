# GKS Legsad Kościelec — Project Brief
### Wstępne podsumowanie projektu · lipiec 2026

---

## 1. Cel projektu

Stworzenie oficjalnej strony internetowej dla GKS Legsad Kościelec — klubu piłkarskiego grającego w Klasie A (Okręg Legnicki). Strona ma pełnić dwie główne funkcje:

- **Informacyjną** — aktualne wyniki, terminarz, tabela, aktualności dla kibiców i środowiska klubowego
- **Promocyjną** — prezentacja klubu na zewnątrz w celu pozyskiwania nowych zawodników i sponsorów

Strona nie obejmuje na tym etapie e-commerce (sklep, bilety).

---

## 2. Identyfikacja wizualna

| Element | Szczegół |
|---|---|
| Nazwa klubu | GKS Legsad Kościelec |
| Poprzednia nazwa | Błękitni Kościelec |
| Barwy | Głęboka czerwień / bordo, czerń, biel |
| Logo | Okrągła tarcza z motywem winogron/maliny, korona, napis „Legsad Kościelec" · kolor różowy/malinowy na białym tle |
| Klimat graficzny | Dark theme, dramatyczny, plakatowy — inspirowany grafikami meczowymi z FB |
| Typografia | Bebas Neue (nagłówki, wyniki) + Inter (body) |
| Paleta kolorów | `#0d0d0d` tło · `#c0132a` akcent czerwony · `#ffffff` biel · `#e91e63` akcent różowy (logo) |

---

## 3. Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Język | TypeScript |
| Stylowanie | Tailwind CSS v4 |
| Animacje | Framer Motion |
| CMS | Sanity (headless, darmowy tier) |
| Deployment | Vercel (darmowy tier) |
| Domena | legsadkoscielec.pl (do zakupu) |

---

## 4. Architektura stron

```
legsadkoscielec.pl/
├── /                     → Strona główna
├── /aktualnosci          → Lista wszystkich newsów
├── /aktualnosci/[slug]   → Pojedynczy news
├── /terminarz            → Terminarz + wyniki sezonu
├── /druzyna              → Skład (placeholder na start)
├── /galeria              → Galeria zdjęć (placeholder na start)
├── /sponsorzy            → Partnerzy klubu
├── /dolacz               → Rekrutacja zawodników
└── /kontakt              → Dane kontaktowe + formularz
```

---

## 5. Sekcje strony głównej

**Navbar** — floating, nierzylepki do góry (lekko odsunięty od krawędzi), zamknięty w zaokrąglonym prostokącie z `backdrop-filter: blur`, logo + linki nawigacyjne + CTA „Dołącz do nas"

**Hero** — pełna szerokość, dark background, duży claim typograficzny (Bebas Neue), herb klubu po prawej, dwa przyciski: „Najbliższy mecz" i „Historia klubu"

**Pasek ligowy** — pojedyncza linia pod hero: „Klasa A · Okręg Legnicki · Sezon 2026/27"

**Statystyki sezonu** — 5 kafli: Mecze / Wygrane / Gole / Miejsce / Zawodnicy — dane z Sanity

**Najbliższy mecz** — karta z herbami obu drużyn, wynik VS, data, godzina, boisko — dane z Sanity

**Ostatni wynik** — karta z wynikiem zakończonego meczu i strzelcami — dane z Sanity

**Aktualności** — 3 karty z najnowszych wpisów z Sanity (tytuł, miniatura, data)

**Ostatnie wyniki** — lista 3–5 ostatnich meczów z wynikami (W/R/P) — dane z Sanity

**Sponsorzy** — logotypy lub nazwy partnerów + przycisk „Zostań sponsorem" (mailto)

**Footer** — nazwa klubu, copyright, linki do FB i Instagrama, adres e-mail

---

## 6. Zarządzanie treścią (Sanity CMS)

Panel dostępny pod adresem `legsadkoscielec.sanity.studio` — kierownik drużyny loguje się przez przeglądarkę bez znajomości kodu.

### Schematy danych w Sanity:

**`match`** (mecz)
```
- date: datetime
- opponent: string
- homeAway: 'home' | 'away'
- venue: string
- scoreUs: number (null jeśli nierozegrany)
- scoreThem: number (null jeśli nierozegrany)
- goalscorers: array of string
- status: 'upcoming' | 'finished'
```

**`news`** (aktualność)
```
- title: string
- slug: slug
- publishedAt: datetime
- mainImage: image
- body: block content (rich text)
- category: 'wynik' | 'aktualnosci' | 'transfery' | 'inne'
```

**`sponsor`** (partner)
```
- name: string
- logo: image (opcjonalne)
- url: string (opcjonalne)
- tier: 'główny' | 'partner' | 'przyjaciel'
```

**`player`** (zawodnik — na przyszłość)
```
- name: string
- number: number
- position: string
- photo: image
```

---

## 7. Dane — źródła i strategia

| Dane | Źródło | Sposób |
|---|---|---|
| Wyniki meczów | Sanity CMS | Kierownik wpisuje ręcznie po meczu |
| Terminarz | Sanity CMS | Wpisywany na początku rundy |
| Tabela ligowa | Sanity CMS | Aktualizowana raz w tygodniu |
| Aktualności | Sanity CMS | Kierownik/admin wpisuje dowolnie |
| Skład | Sanity CMS | Aktualizowany przy transferach |
| Sponsorzy | Sanity CMS | Aktualizowane rzadko |
| Zdjęcia | Sanity CMS (Assets) | Upload przez panel |

**Dlaczego nie zewnętrzne API:**
- laczynaspilka.pl (PZPN) — API istnieje, ale nie jest publiczne (403 Forbidden, whitelist hostów)
- 90minut.pl — brak API, stary HTML, dane często nieaktualne dla niższych lig
- Sofascore — pokrywa do IV ligi, Klasa A poza zasięgiem

---

## 8. Workflow dla kierownika drużyny

Po meczu kierownik wchodzi na `legsadkoscielec.sanity.studio`, loguje się i:

1. Otwiera dokument meczu → wpisuje wynik i strzelców (2 minuty)
2. Opcjonalnie dodaje aktualność z opisem meczu + zdjęcie (5 minut)
3. Klika „Publish" → strona aktualizuje się automatycznie (ISR Vercel)

Nie wymaga znajomości kodu, GitHuba ani żadnych narzędzi deweloperskich.

---

## 9. Hosting i domena

| Usługa | Plan | Koszt |
|---|---|---|
| Vercel | Hobby (darmowy) | 0 zł/mies. |
| Sanity | Free tier (3 users, 10GB) | 0 zł/mies. |
| Domena legsadkoscielec.pl | Rejestracja roczna | ~50–80 zł/rok |

Jedyny koszt to domena. Całość hostingu i CMS — bezpłatna.

---

## 10. Fazy realizacji

### Faza 1 — Fundament
- Inicjalizacja projektu Next.js + Tailwind v4 + TypeScript
- Konfiguracja Sanity (projekt, schematy, studio)
- Navbar (floating, blur, responsive)
- Strona główna z komponentami statycznymi

### Faza 2 — Integracja danych
- Podpięcie Sanity do Next.js (GROQ queries)
- Dynamiczne komponenty: statystyki, najbliższy mecz, wyniki, aktualności
- ISR (Incremental Static Regeneration) dla wydajności

### Faza 3 — Podstrony
- `/aktualnosci` + `/aktualnosci/[slug]`
- `/terminarz`
- `/sponsorzy` + `/dolacz` + `/kontakt`
- Formularz kontaktowy (EmailJS lub Resend)

### Faza 4 — Dopracowanie
- Responsywność mobile
- Animacje Framer Motion (page transitions, scroll reveals)
- SEO (metadata, Open Graph, sitemap.xml)
- Rejestracja w Google Search Console

### Faza 5 — Launch
- Konfiguracja domeny legsadkoscielec.pl na Vercel
- Instrukcja obsługi Sanity dla kierownika
- Przekazanie projektu

---

## 11. Co pozostaje poza zakresem (na razie)

- Sklep internetowy / bilety
- System komentarzy
- Logowanie użytkowników / strefa kibica
- Transmisje live
- Aplikacja mobilna
- Statystyki zawodników z zewnętrznych źródeł

---

## 12. Otwarte decyzje

- [ ] Potwierdzenie domeny (legsadkoscielec.pl czy inna?)
- [ ] Czy galeria od razu ma działać, czy zostaje jako placeholder?
- [ ] Kto będzie administratorem Sanity poza kierownikiem?
- [ ] Czy potrzebny jest formularz rekrutacyjny z wysyłką maila?

---

*Dokument wstępny · do weryfikacji przed rozpoczęciem implementacji*
