"use client";

import { useEffect } from "react";

/**
 * Zanderio AI chat widget loader.
 *
 * Installed 2026-11-06 on the user's explicit order after a full code scan
 * (clean) and risk briefing. The remote loader file is monitored by the
 * hourly `zanderio-security-watch` cron: any change to it is reported to
 * the user.
 *
 * This used to be a plain <script> tag in the root layout <head>, which
 * made it appear on EVERY page. It now loads from here instead, and
 * SiteChrome only renders this component outside the standalone
 * /loophole section, so the Loophole pages stay completely widget-free
 * (user order, 2026-11-27).
 */
const LOADER_SRC = "https://cdn.zanderio.ai/widget/loader.js";
const WIDGET_ID = "wdg_4gBdsUoDFfI8ehnw8ChVqwxL";

export default function ZanderioWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${LOADER_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = LOADER_SRC;
    script.dataset.id = WIDGET_ID;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Leaving for a standalone page (client-side navigation): remove the
      // loader and any DOM the widget injected, so nothing of it lingers.
      script.remove();
      document
        .querySelectorAll('[id*="zanderio" i], [class*="zanderio" i]')
        .forEach((el) => el.remove());
    };
  }, []);

  return null;
}
