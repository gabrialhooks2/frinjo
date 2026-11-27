import Link from "next/link";
import "./loophole.css";

const GITHUB = "https://github.com/rootsiemen/loophole";
const MARKETPLACE = "https://github.com/marketplace/actions/loophole-security-scan";

/**
 * Standalone Loophole chrome: /loophole renders WITHOUT the WebStore Pro
 * site theme (see components/SiteChrome). This layout gives every
 * /loophole route its own brand bar and footer instead.
 */
export default function LoopholeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lh-root">
      <div className="lh-nav">
        <div className="wrap nav-in">
          <Link className="brand" href="/loophole">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://raw.githubusercontent.com/rootsiemen/loophole/main/assets/logo.png"
              alt="Loophole logo"
            />
            Loophole <span className="ver">v1.2.2</span>
          </Link>
          <div className="nav-links">
            <Link href="/loophole#checks">Checks</Link>
            <Link href="/loophole#server-guard">Server Guard</Link>
            <Link href="/loophole#usage">Usage</Link>
            <Link href="/loophole#action">GitHub Action</Link>
            <Link href="/loophole#faq">FAQ</Link>
            <a className="gh-btn" href={GITHUB}>
              GitHub
            </a>
          </div>
        </div>
      </div>

      {children}

      <footer className="lh-footer">
        <div className="wrap lh-footer-in">
          <div className="lh-footer-brand">
            <span className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://raw.githubusercontent.com/rootsiemen/loophole/main/assets/logo.png"
                alt="Loophole logo"
              />
              Loophole
            </span>
            <p>
              Free, open-source code security scanner. One Python file, zero
              dependencies — 62 checks with taint tracking and a fix for every
              finding.
            </p>
          </div>
          <nav className="lh-footer-links" aria-label="Loophole">
            <a href={GITHUB}>GitHub</a>
            <a href={MARKETPLACE}>GitHub Marketplace</a>
            <Link href="/loophole/terms">Terms of Use</Link>
            <Link href="/loophole/privacy">Privacy Policy</Link>
          </nav>
        </div>
        <div className="wrap lh-footer-base">
          <span>© 2026 Loophole — released under the MIT License.</span>
          <span>Scans run 100% locally. No accounts, no telemetry.</span>
        </div>
      </footer>
    </div>
  );
}
