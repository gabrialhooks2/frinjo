import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — Loophole" },
  description:
    "Privacy policy for Loophole: the scanner runs 100% locally and collects nothing. What this website does and does not collect.",
  alternates: { canonical: "https://frinjo.me/loophole/privacy" },
  openGraph: { title: "Privacy Policy — Loophole", description: "Privacy policy for Loophole: the scanner runs 100% locally and collects nothing. What this website does and does not collect.", url: "https://frinjo.me/loophole/privacy", type: "website" },
  twitter: { card: "summary_large_image", title: "Privacy Policy — Loophole", description: "Privacy policy for Loophole: the scanner runs 100% locally and collects nothing. What this website does and does not collect." },
};

export default function LoopholePrivacyPage() {
  return (
    <div className="wrap lh-doc">
      <h1>Privacy Policy</h1>
      <p className="lh-doc-meta">Loophole — effective 27 November 2026</p>

      <p>
        Loophole was built on a simple privacy principle:{" "}
        <b>your code never leaves your machine.</b> This page explains exactly
        what the tool collects (nothing) and what this website collects
        (basic, privacy-respecting analytics).
      </p>

      <h2>1. The scanner collects nothing</h2>
      <p>
        Loophole runs 100% locally — on your laptop, in your CI runner or on
        your server. It has <b>no accounts, no telemetry, no analytics and no
        network calls</b> of its own. Your source code, your findings and your
        reports are never transmitted to us or to anyone else. Reports are
        written only to files you choose, on your own machine.
      </p>

      <h2>2. Loophole Server Guard keeps data on your server</h2>
      <p>
        Server Guard watches your own server&apos;s logs and stores incidents,
        IP scores and bans in a local SQLite database <b>on your server</b>.
        Nothing is sent to us. Alerts go only to the channels you configure
        yourself (your terminal, your email, your Telegram or your webhook).
      </p>

      <h2>3. What this website collects</h2>
      <p>
        This page is served from frinjo.me. Like most websites, it uses
        analytics to understand which pages are useful:
      </p>
      <ul>
        <li>
          <b>Simple Analytics</b> — privacy-first analytics that does not use
          cookies and does not collect personal data; it records anonymised
          page views (page visited, referrer, browser, country).
        </li>
        <li>
          <b>Google Analytics</b> — may set cookies and collect anonymised
          usage data (pages visited, approximate location, device and browser)
          under{" "}
          <a href="https://policies.google.com/privacy">Google&apos;s privacy policy</a>.
        </li>
      </ul>
      <p>
        We do not sell personal data, we do not build advertising profiles,
        and there are no sign-ups, comments or contact forms on the Loophole
        pages — so there is no account data to store in the first place.
      </p>

      <h2>4. Third-party links</h2>
      <p>
        The Loophole pages link to GitHub (source code, releases and the
        GitHub Marketplace listing). When you follow those links, GitHub&apos;s
        own privacy policy applies to anything you do there.
      </p>

      <h2>5. Changes to this policy</h2>
      <p>
        If this policy changes, the updated version will be published on this
        page with a new effective date. The scanner&apos;s core promise will
        not change: it collects nothing, and your code stays on your machine.
      </p>

      <h2>6. Contact</h2>
      <p>
        Privacy questions:{" "}
        <a href="mailto:neilsonsmarry@gmail.com">neilsonsmarry@gmail.com</a>.
      </p>

      <p className="lh-doc-back">
        <Link href="/loophole">← Back to Loophole</Link> ·{" "}
        <Link href="/loophole/terms">Terms of Use</Link>
      </p>
    </div>
  );
}
