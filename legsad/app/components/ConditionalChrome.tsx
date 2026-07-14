"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";

export default function ConditionalChrome({
  children,
  matchPill,
}: {
  children: ReactNode;
  matchPill: ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return <>{children}</>;

  return (
    <>
      <ScrollToTopOnNavigate />
      <Navbar matchPill={matchPill} />
      {children}
      <ScrollToTop />
    </>
  );
}