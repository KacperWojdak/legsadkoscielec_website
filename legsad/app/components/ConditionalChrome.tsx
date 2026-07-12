"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return <>{children}</>;

  return (
    <>
      <ScrollToTopOnNavigate />
      <Navbar />
      {children}
      <ScrollToTop />
    </>
  );
}