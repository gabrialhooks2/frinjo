import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use — Loophole" },
  description:
    "Terms of use for Loophole, the free open-source code security scanner and Loophole Server Guard.",
  alternates: { canonical: "https://frinjo.me/loophole/terms" },
  openGraph: { title: "Terms of Use — Loophole", description: "Terms of use for Loophole, the free open-source code security scanner and Loophole Server Guard.", url: "https://frinjo.me/loophole/terms", type: "website" },
  twitter: { card: "summary_large_image", title: "Terms of Use — Loophole", description: "Terms of use for Loophole, the free open-source code security scanner and Loophole Server Guard." },
};

export default function LoopholeTermsPage() {
  return (
    <div className="wrap lh-doc">
      <h1>Terms of Use</h1>
      <p className="lh-doc-meta">Loophole — effective 27 November 2026</p>

      <p>
        These terms govern your use of Loophole (the code security scanner),
        Loophole Server Guard, and this website. By using any of them, you
        accept these terms. If you do not agree, please do not use the tool or
        this site.
      </p>

      <h2>1. The software is MIT-licensed open source</h2>
      <p>
        Loophole is free, open-source software released under the{" "}
        <a href="https://github.com/rootsiemen/loophole/blob/main/LICENSE">
          MIT License
        </a>
        . You may use, copy, modify and distribute it under the conditions of
        that license. The full source code is public on{" "}
        <a href="https://github.com/rootsiemen/loophole">GitHub</a>.
      </p>

      <h2>2. Provided &ldquo;as is&rdquo; — no warranties</h2>
      <p>
        Loophole and this website are provided &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo;, without warranties of any kind, express or
        implied. A static scanner cannot find every vulnerability: a clean
        Loophole report is <b>not</b> a guarantee that your code or server is
        secure, and it is not a substitute for professional security review,
        penetration testing or legal advice.
      </p>

      <h2>3. Only scan what you own or are allowed to test</h2>
      <p>
        You may use Loophole and Server Guard only on code, repositories and
        servers that you own, or that you have explicit permission to test.
        You are solely responsible for how you use the tool and for any
        configuration you apply with it — including Server Guard firewall
        bans, which act on your own server under your own settings.
      </p>

      <h2>4. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, the Loophole maintainers are
        not liable for any damages or losses arising from the use of — or the
        inability to use — the tool or this website, including lost data,
        downtime, blocked visitors or missed security issues.
      </p>

      <h2>5. This website</h2>
      <p>
        The content on this site is provided for general information about the
        tool. We may update, move or remove pages at any time without notice.
        Links to third-party sites (such as GitHub) are provided for
        convenience; those sites are governed by their own terms, which we do
        not control.
      </p>

      <h2>6. Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. The version published on
        this page applies from its effective date, and continuing to use the
        tool or site after a change means you accept the updated terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:neilsonsmarry@gmail.com">neilsonsmarry@gmail.com</a>.
        Security issues in Loophole itself are best reported through{" "}
        <a href="https://github.com/rootsiemen/loophole/security">
          GitHub&apos;s security reporting
        </a>
        .
      </p>

      <p className="lh-doc-back">
        <Link href="/loophole">← Back to Loophole</Link> ·{" "}
        <Link href="/loophole/privacy">Privacy Policy</Link>
      </p>
    </div>
  );
}
