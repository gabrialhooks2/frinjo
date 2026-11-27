"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/**
 * Site chrome switch: /loophole and its sub-pages (/loophole/terms,
 * /loophole/privacy) are a standalone product site — they render WITHOUT
 * the WebStore Pro navbar, footer and WhatsApp float (the Loophole layout
 * provides its own brand bar and footer). Every other route keeps the
 * normal WebStore Pro chrome.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = pathname === "/loophole" || (pathname?.startsWith("/loophole/") ?? false);

  if (standalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
