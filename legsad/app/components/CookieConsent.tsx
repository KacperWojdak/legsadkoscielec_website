"use client";

import { useState, useEffect } from "react";
import GoogleAnalytics from "./GoogleAnalytics";

const CONSENT_KEY = "cookie-consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
    setShowBanner(false);
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}

      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-200 border-t border-brand-border bg-brand-black/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs text-white/70 md:text-left">
              Używamy plików cookie do analizy ruchu na stronie (Google Analytics), żeby lepiej zrozumieć jak korzystacie z naszej strony. Możesz zaakceptować lub odrzucić — Twój wybór nie wpływa na dostęp do treści.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={handleReject}
                className="flex min-h-10 items-center rounded-lg border border-brand-border px-4 text-xs font-bold uppercase tracking-wide text-brand-muted transition-colors hover:text-white cursor-pointer"
              >
                Odrzuć
              </button>
              <button
                onClick={handleAccept}
                className="flex min-h-10 items-center rounded-lg bg-brand-red px-4 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80 cursor-pointer"
              >
                Akceptuję
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}