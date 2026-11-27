import type { Metadata } from "next";
import ChecksGrid, { type CheckCategory } from "./ChecksGrid";
import "./loophole.css";

export const metadata: Metadata = {
  title: "Loophole — Free Code Security Scanner",
  description:
    "Free zero-dependency security scanner — 62 checks for secrets, injection, XSS and weak crypto in JavaScript, Python, Go and PHP, plus a live Server Guard.",
  keywords: [
    "loophole",
    "security scanner",
    "static analysis",
    "sast tool",
    "code security scanner",
    "hardcoded secrets scanner",
    "sql injection scanner",
    "github action security",
    "server intrusion detection",
    "free security tools",
  ],
  alternates: { canonical: "https://frinjo.me/loophole" },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Loophole — Free Code Security Scanner | WebStore Pro",
    description:
      "One Python file, zero dependencies: 61 security checks with taint tracking and a fix for every finding — plus Server Guard, live protection for running servers.",
    url: "https://frinjo.me/loophole",
    type: "website",
  },
};

const GITHUB = "https://github.com/rootsiemen/loophole";

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Loophole",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://frinjo.me/loophole",
  license: "https://opensource.org/licenses/MIT",
  downloadUrl: GITHUB,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Zero-dependency static security scanner in a single Python file. 62 checks for secrets, injection, XSS and more across JavaScript/TypeScript, Python, Go and PHP — with taint tracking, a fix for every finding, SARIF output and a GitHub Action. Includes Loophole Server Guard for live server protection.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Loophole", item: "https://frinjo.me/loophole" },
  ],
};

const CHECK_NAMES = [
  "SEC001 — Hardcoded API key / token / secret",
  "SEC002 — Hardcoded password",
  "SEC003 — Private key in source code",
  "SEC004 — Hardcoded AWS access key ID",
  "SEC005 — High-entropy secret-like string",
  "SQLI001 — SQL injection via string building (JS/TS)",
  "SQLI002 — SQL injection via string formatting (Python)",
  "SQLI003 — SQL injection via string building (Go)",
  "SQLI004 — SQL injection via string concatenation (PHP)",
  "XSS001 — Dynamic HTML via innerHTML",
  "XSS002 — Dynamic document.write()",
  "XSS003 — dangerouslySetInnerHTML used",
  "XSS004 — Unescaped echo of user input (PHP)",
  "CMD001 — Command injection (JS/TS)",
  "CMD002 — Command injection (Python)",
  "CMD003 — Command injection (Go)",
  "CMD004 — Command injection (PHP)",
  "PATH001 — File access with user-influenced path",
  "PATH002 — Path traversal combined with user input",
  "RAND001 — Math.random() for tokens/secrets (JS)",
  "RAND002 — Python random module for secrets",
  "RAND003 — math/rand for secrets (Go)",
  "CRY001 — MD5 used for password hashing",
  "CRY002 — SHA-1 used for password hashing",
  "CRY003 — Weak cipher (DES/3DES/RC4)",
  "CRY004 — Hardcoded IV",
  "EVAL001 — eval() with dynamic input",
  "EVAL002 — new Function() with dynamic input",
  "SSRF001 — SSRF: user-influenced URL in outbound request",
  "AUTH001 — Sensitive route without visible auth",
  "CORS001 — Wildcard CORS origin",
  "JWT001 — JWT decoded without verification",
  "TLS001 — TLS verification disabled",
  "DBG001 — Debug mode enabled",
  "ERR001 — Exception details leaked to client",
  "PROTO001 — Prototype pollution",
  "DESER001 — Unsafe deserialization",
  "NOSQL001 — NoSQL injection",
  "XXE001 — XML external entity",
  "REDIR001 — Open redirect",
  "ZIP001 — Zip Slip (archive extraction traversal)",
  "CSRF001 — CSRF protection missing",
  "UPL001 — File upload without validation",
  "REDOS001 — ReDoS-prone regex",
  "JWT002 — JWT none algorithm / weak secret",
  "TLS002 — Weak/outdated TLS version",
  "CRY005 — ECB mode or zero/static IV",
  "LOG001 — Sensitive data written to logs",
  "LDAP001 — LDAP injection",
  "HDR001 — Missing security headers",
  "SSTI001 — Server-side template injection",
  "COOKIE001 — Cookie set without HttpOnly",
  "RAND004 — PHP rand()/mt_rand()/uniqid() for tokens",
  "TLS003 — TLS validation off via CERT_NONE / unverified context",
  "CORS002 — CORS reflects any Origin / credentials with wildcard",
  "CRLF001 — HTTP header injection (response splitting)",
  "CMP001 — Secret compared without constant-time check",
  "REDIR002 — DOM open redirect (client-side)",
  "XXE002 — XML entity expansion via libxmljs",
  "XSS005 — Dynamic HTML via insertAdjacentHTML / v-html",
  "DESER002 — Unsafe deserialization (jsonpickle / v8.deserialize)",
];

const checksJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Loophole — All 61 Security Checks",
  numberOfItems: 61,
  itemListElement: CHECK_NAMES.map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
  })),
};

const CATEGORIES: CheckCategory[] = [
  {
    key: "keys",
    num: "01",
    title: "🔑 Passwords & Secret Keys",
    sub: "The #1 problem in AI-built apps — secrets typed straight into the code.",
    cards: [
      { icon: "🔑", title: "Secret Keys Left in Code", desc: "API keys and tokens typed directly into your files — visible to anyone who ever sees the project.", pill: "high", pillLabel: "HIGH", code: "SEC001" },
      { icon: "🔓", title: "Passwords Written in Code", desc: "A real password sitting in a file instead of a private settings area.", pill: "high", pillLabel: "HIGH", code: "SEC002" },
      { icon: "🗝️", title: "Private Key in the Project", desc: "The master key file of your server, included in the code folder itself.", pill: "crit", pillLabel: "CRITICAL", code: "SEC003" },
      { icon: "☁️", title: "Cloud Keys Exposed", desc: "Amazon/AWS access keys hardcoded — someone could run up cloud bills in your name.", pill: "high", pillLabel: "HIGH", code: "SEC004" },
      { icon: "🎲", title: "Secret-Looking Strings", desc: "Random-looking strings that behave exactly like passwords, even if nobody labelled them.", pill: "med", pillLabel: "MEDIUM", code: "SEC005" },
      { icon: "📜", title: "Secrets Printed in Logs", desc: "Passwords or tokens written into log files, where they quietly stay forever.", pill: "med", pillLabel: "MEDIUM", code: "LOG001" },
    ],
  },
  {
    key: "db",
    num: "02",
    title: "🗄️ Database Safety",
    sub: "Ways a visitor can steal, change or delete your data through normal-looking forms.",
    cards: [
      { icon: "💉", title: "SQL Injection", desc: "Typed input slips into database commands — the classic way entire customer lists get stolen. Covers JavaScript, Python, Go and PHP.", pill: "high", pillLabel: "HIGH", code: "SQLI001–004" },
      { icon: "🍃", title: "NoSQL Injection", desc: "The same trick aimed at MongoDB-style databases — login forms are the favourite target.", pill: "high", pillLabel: "HIGH", code: "NOSQL001" },
      { icon: "📇", title: "LDAP Injection", desc: "Company directory lookups built from typed input can be twisted to bypass logins.", pill: "high", pillLabel: "HIGH", code: "LDAP001" },
    ],
  },
  {
    key: "entry",
    num: "03",
    title: "🚪 Hackers' Entry Points",
    sub: "Code that lets a visitor run things on your site or server they should never touch.",
    cards: [
      { icon: "🖥️", title: "Cross-Site Scripting (XSS)", desc: "Comments and reviews shown without cleaning, so attackers can hide scripts in them. Four patterns covered.", pill: "high", pillLabel: "HIGH", code: "XSS001–004" },
      { icon: "⌨️", title: "Command Injection", desc: "Visitor input turned into server commands — the attacker ends up driving your machine.", pill: "crit", pillLabel: "CRITICAL", code: "CMD001–004" },
      { icon: "🧨", title: "Code Injection (eval)", desc: "eval() and friends running text as code — if any of that text comes from a visitor, game over.", pill: "crit", pillLabel: "CRITICAL", code: "EVAL001–002" },
      { icon: "📡", title: "Server-Side Request Forgery", desc: "Your server tricked into calling internal addresses it should never reveal or reach.", pill: "high", pillLabel: "HIGH", code: "SSRF001" },
      { icon: "🧬", title: "Prototype Pollution", desc: "A JavaScript flaw where attackers quietly rewrite how your whole app behaves.", pill: "high", pillLabel: "HIGH", code: "PROTO001" },
      { icon: "📄", title: "XML External Entity (XXE)", desc: "Uploaded XML files that make your server hand over its own private files.", pill: "high", pillLabel: "HIGH", code: "XXE001" },
      { icon: "🌀", title: "Regex Denial of Service", desc: "A pattern so tangled that one crafted input can freeze your site for everyone.", pill: "med", pillLabel: "MEDIUM", code: "REDOS001" },
      { icon: "🧩", title: "Server-Side Template Injection", desc: "User input used as the template itself — Jinja2, EJS, Pug, Go templates or Twig — lets an attacker run code on your server.", pill: "high", pillLabel: "HIGH", code: "SSTI001", isNew: true },
      { icon: "🧾", title: "Header Injection (Response Splitting)", desc: "User-influenced values written into response headers can smuggle extra headers — or a whole fake response — into the reply.", pill: "med", pillLabel: "MEDIUM", code: "CRLF001", isNew: true },
      { icon: "🗜️", title: "XML Entity Expansion (libxmljs)", desc: "libxmljs parsers with entity expansion switched on can be fed documents that blow up memory or reach local files.", pill: "high", pillLabel: "HIGH", code: "XXE002", isNew: true },
      { icon: "🖼️", title: "Unsafe HTML Sinks", desc: "insertAdjacentHTML, Vue v-html and Angular bypassSecurityTrust* render raw HTML — the same hole as innerHTML, in framework clothing.", pill: "high", pillLabel: "HIGH", code: "XSS005", isNew: true },
    ],
  },
  {
    key: "files",
    num: "04",
    title: "📁 Files & Uploads",
    sub: "Anything your app opens, unzips or accepts from a visitor.",
    cards: [
      { icon: "🗂️", title: "Path Traversal", desc: "Tricks like \"../\" that let visitors read files outside the folder they were allowed into.", pill: "high", pillLabel: "HIGH", code: "PATH001–002" },
      { icon: "🤐", title: "Zip Slip", desc: "A booby-trapped ZIP that writes files anywhere on your server when opened.", pill: "high", pillLabel: "HIGH", code: "ZIP001" },
      { icon: "📤", title: "Unsafe File Uploads", desc: "Upload boxes that never check what kind of file arrived — a favourite break-in route.", pill: "high", pillLabel: "HIGH", code: "UPL001" },
      { icon: "📦", title: "Unsafe Deserialization", desc: "Saved-data formats (pickle, unserialize) that execute whatever an attacker packed inside.", pill: "high", pillLabel: "HIGH", code: "DESER001" },
      { icon: "🧳", title: "Unsafe Deserialization (jsonpickle / v8)", desc: "jsonpickle.decode and v8.deserialize rebuild objects from attacker data — code execution hiding in a saved file.", pill: "high", pillLabel: "HIGH", code: "DESER002", isNew: true },
    ],
  },
  {
    key: "login",
    num: "05",
    title: "🔐 Login, Sessions & Settings",
    sub: "The quiet switches that decide whether your logins and settings actually protect you.",
    cards: [
      { icon: "🎫", title: "Login Tokens Never Verified", desc: "JWT tokens read but never actually checked — a forged token sails straight in.", pill: "high", pillLabel: "HIGH", code: "JWT001" },
      { icon: "🚫", title: "JWT \"None\" / Weak Secret", desc: "Settings that accept unsigned tokens, or secrets so short anyone can guess them.", pill: "high", pillLabel: "HIGH", code: "JWT002" },
      { icon: "🧑‍💻", title: "Weak Login Patterns", desc: "Authentication shortcuts that look fine and fail quietly under attack.", pill: "med", pillLabel: "MEDIUM", code: "AUTH001" },
      { icon: "🛡️", title: "Missing CSRF Protection", desc: "Without it, a malicious page can make your logged-in visitors act without knowing.", pill: "med", pillLabel: "MEDIUM", code: "CSRF001" },
      { icon: "🌐", title: "Wide-Open CORS", desc: "Your app answering data requests from literally any website on the internet.", pill: "med", pillLabel: "MEDIUM", code: "CORS001" },
      { icon: "↪️", title: "Open Redirect", desc: "Links on your own trusted domain that silently bounce visitors to scam sites.", pill: "med", pillLabel: "MEDIUM", code: "REDIR001" },
      { icon: "🧱", title: "Missing Security Headers", desc: "Standard browser protections (CSP, frame guards) simply never switched on.", pill: "med", pillLabel: "MEDIUM", code: "HDR001" },
      { icon: "🐞", title: "Debug Mode Left On", desc: "Developer debug screens still active in the live app — they leak how everything works.", pill: "med", pillLabel: "MEDIUM", code: "DBG001" },
      { icon: "💬", title: "Error Details Shown to Visitors", desc: "Full technical error messages handed to strangers — a map for attackers.", pill: "med", pillLabel: "MEDIUM", code: "ERR001" },
      { icon: "🍪", title: "Cookie Without HttpOnly", desc: "Session cookies set without HttpOnly can be stolen by any script that slips onto the page.", pill: "med", pillLabel: "MEDIUM", code: "COOKIE001", isNew: true },
      { icon: "🔀", title: "CORS Reflects Any Origin", desc: "Echoing back any request Origin — or pairing credentials with a wildcard — lets any site act as your user.", pill: "high", pillLabel: "HIGH", code: "CORS002", isNew: true },
      { icon: "⏱️", title: "Secrets Compared with ==", desc: "Comparing tokens with == leaks timing hints, and PHP type juggling can turn a wrong secret into a match.", pill: "med", pillLabel: "MEDIUM", code: "CMP001", isNew: true },
      { icon: "🧭", title: "DOM Open Redirect", desc: "JavaScript that sends visitors to a URL taken from the page — a phishing link wearing your domain.", pill: "med", pillLabel: "MEDIUM", code: "REDIR002", isNew: true },
    ],
  },
  {
    key: "crypto",
    num: "06",
    title: "🔒 Encryption & Connection Safety",
    sub: "How passwords are stored and how data travels.",
    cards: [
      { icon: "🔐", title: "MD5 Password Storage", desc: "Passwords hashed with MD5 — crackable in seconds with free tools.", pill: "high", pillLabel: "HIGH", code: "CRY001" },
      { icon: "🔏", title: "SHA-1 Password Storage", desc: "SHA-1 is retired for passwords for a reason — nearly as fast to crack as MD5.", pill: "high", pillLabel: "HIGH", code: "CRY002" },
      { icon: "📻", title: "Ancient Ciphers (DES / RC4)", desc: "Encryption methods from another era, broken by modern computers.", pill: "med", pillLabel: "MEDIUM", code: "CRY003" },
      { icon: "🔁", title: "Hardcoded IV / ECB Mode", desc: "Encryption done with a fixed starting value, or ECB mode that leaks patterns in your data.", pill: "med", pillLabel: "MEDIUM", code: "CRY004–005" },
      { icon: "🔌", title: "Secure Connection Check Switched Off", desc: "TLS verification disabled — your app will happily talk to a fake server.", pill: "high", pillLabel: "HIGH", code: "TLS001" },
      { icon: "📶", title: "Outdated TLS Versions", desc: "Old connection protocols (TLS 1.0/1.1) that browsers and attackers both left behind.", pill: "med", pillLabel: "MEDIUM", code: "TLS002" },
      { icon: "🎰", title: "Predictable Random Values", desc: "\"Random\" codes and tokens an attacker can guess — session IDs, reset links, OTPs.", pill: "med", pillLabel: "MEDIUM", code: "RAND001–003" },
      { icon: "🔢", title: "Weak PHP Random for Tokens", desc: "PHP rand(), mt_rand() and uniqid() are predictable — fine for shuffling a list, fatal for tokens and OTPs.", pill: "med", pillLabel: "MEDIUM", code: "RAND004", isNew: true },
      { icon: "🛑", title: "TLS Validation Off (CERT_NONE)", desc: "Certificate checks disabled at the SSL layer — ssl.CERT_NONE, unverified contexts, or NODE_TLS_REJECT_UNAUTHORIZED=0 — let a fake server in.", pill: "high", pillLabel: "HIGH", code: "TLS003", isNew: true },
    ],
  },
];

const FAQS: [string, string][] = [
  [
    "What is Loophole?",
    "Loophole is a free, open-source static security scanner that ships as a single Python file with zero dependencies. It scans JavaScript/TypeScript, Python, Go and PHP codebases with 62 checks — hardcoded secrets, SQL injection, XSS, command injection, weak crypto and more — using taint tracking, and explains why each finding matters and how to fix it.",
  ],
  [
    "How do I install Loophole?",
    "There is nothing to install: clone the GitHub repository and run python3 loophole.py scan ./your-project. If Python 3.8+ runs — laptop, CI runner or air-gapped box — Loophole runs, fully offline, in seconds.",
  ],
  [
    "Does Loophole send my code to a server?",
    "No. Loophole runs entirely on your own machine: no accounts, no telemetry, no API keys and no network calls. Your code never leaves the box you scan it on.",
  ],
  [
    "How do I run Loophole in CI?",
    "Use the official GitHub Action, rootsiemen/loophole@v1: it scans on every push and pull request and uploads SARIF results to your repository's Security tab. From the CLI, Loophole exits with code 1 on critical/high findings, so any pipeline can fail the build exactly when it should.",
  ],
  [
    "What is Loophole Server Guard?",
    "Server Guard is Loophole's runtime companion. It watches live web (Apache/Nginx) and SSH/auth logs, scores every suspicious IP, and alerts you — terminal, email, Telegram or webhook — with the attacker's IP. Repeat offenders are auto-banned at the firewall (iptables, nft or ufw), whitelist-protected and dry-run by default, and decoy honeypot ports catch anyone poking around. It also runs Loophole's code scans on a schedule, so code holes and live attacks appear in one dashboard.",
  ],
  [
    "Is Loophole really free?",
    "Yes. Loophole and Server Guard are MIT-licensed open source on GitHub — free for personal and commercial use, with no paid tier, no sign-up and no usage limits.",
  ],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function GhIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function LoopholePage() {
  return (
    <div className="lh-root" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(checksJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* In-page brand bar — the Loophole site's own nav, moved over with the page */}
      <div className="lh-nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://raw.githubusercontent.com/rootsiemen/loophole/main/assets/logo.png" alt="Loophole logo" />
            Loophole <span className="ver">v1.2.0</span>
          </a>
          <div className="nav-links">
            <a href="#checks">Checks</a>
            <a href="#server-guard">Server Guard</a>
            <a href="#usage">Usage</a>
            <a href="#action">GitHub Action</a>
            <a href="#faq">FAQ</a>
            <a className="gh-btn" href={GITHUB}>
              <GhIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-in">
          <div className="eyebrow">{"// SAST · SECRETS · ZERO DEPENDENCIES"}</div>
          <h1>
            Find the security holes in your code — <span className="grad">before someone else does.</span>
          </h1>
          <p className="sub">
            Loophole is a static security scanner that ships as <strong>one Python file</strong> with{" "}
            <strong>zero dependencies</strong>. Point it at a codebase and it finds hardcoded secrets,
            injection flaws, XSS and more — then tells you <strong>why each one matters and how to fix it</strong>.
          </p>
          <div className="cta">
            <a className="btn primary" href={GITHUB}>
              Get Loophole — it&apos;s free
            </a>
            <a className="btn" href="#output">
              See a real scan ↓
            </a>
          </div>
          <div className="hero-meta">
            <span>MIT LICENSE</span>·<span>PYTHON 3.8+</span>·<span>NO PIP INSTALL</span>·<span>RUNS OFFLINE</span>
          </div>

          <div className="term fadein" id="output">
            <div className="term-bar">
              <span className="dot" style={{ background: "#f85149" }}></span>
              <span className="dot" style={{ background: "#d29922" }}></span>
              <span className="dot" style={{ background: "#3fb950" }}></span>
              <span className="term-title">zsh — loophole scan</span>
            </div>
            <div className="term-body">
              <span className="t-prompt">➜ ~</span> <span className="t-cmd">python3 loophole.py scan ./api-server</span>
              {"\n\n"}
              <span style={{ color: "#e6edf3", fontWeight: 700 }}>Loophole found 55 issue(s): 9 critical, 29 high, 17 medium</span>
              {"\n\n"}
              <span className="t-crit">CRITICAL</span> CMD001 Command injection via child_process (JS/TS){"\n"}
              {"  "}
              <span className="t-file">src/run.js:33</span> {" › exec(cmd, (err, out) => res.send(out));"}
              {"\n"}
              {"  "}
              <span className="t-taint">taint: req.query.cmd → cmd → exec</span>
              {"\n"}
              {"  "}
              <span className="t-why">why: user input reaching a shell lets attackers append commands that run with the app&apos;s privileges — full server compromise.</span>
              {"\n"}
              {"  "}
              <span className="t-fix">fix: use execFile/spawn with an argument array — never build shell strings from input.</span>
              {"\n\n"}
              <span className="t-crit">CRITICAL</span> SEC003 Private key in source code{"\n"}
              {"  "}
              <span className="t-file">config.py:6</span> {" › PRIVATE_KEY = \"\"\"-----BEGIN RSA PRIVATE KEY-----"}
              {"\n"}
              {"  "}
              <span className="t-why">why: a committed private key is a fully compromised identity — anyone who clones the repo owns it.</span>
              {"\n"}
              {"  "}
              <span className="t-fix">fix: revoke the keypair, purge it from git history, load keys from a secrets manager.</span>
              {"\n\n"}
              <span className="t-high">HIGH</span> {"    SQLI002 SQL injection via string formatting (Python)"}
              {"\n"}
              {"  "}
              <span className="t-file">db.py:16</span> {" › cur.execute(\"SELECT * FROM users WHERE id = %s\" % uid)"}
              {"\n"}
              {"  "}
              <span className="t-fix">fix: parameterized queries — let the driver separate code from data.</span>
              {"\n\n"}
              <span className="t-dim">… 52 more findings</span>
              {"\n"}
              <span className="t-prompt">➜ ~</span> <span className="cursor"></span>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="stats">
          <div className="stat">
            <div className="n">61</div>
            <div className="l">security checks</div>
          </div>
          <div className="stat">
            <div className="n">5</div>
            <div className="l">languages covered</div>
          </div>
          <div className="stat">
            <div className="n">0</div>
            <div className="l">dependencies</div>
          </div>
          <div className="stat">
            <div className="n">1</div>
            <div className="l">file — that&apos;s the install</div>
          </div>
        </div>
        <p className="table-note" style={{ textAlign: "center" }}>
          DOGFOODED — LOOPHOLE SCANS ITS OWN CODEBASE CLEAN · GITHUB ACTION VERIFIED IN CI · SARIF → GITHUB SECURITY TAB
        </p>

        {/* HOW IT WORKS / FEATURES */}
        <section>
          <div className="sec-head">
            <span className="sec-num">Fig. 01</span>
            <h2>Built like a tool developers actually keep</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="no">TAINT TRACKING</div>
              <h3>Data-flow, not grep</h3>
              <p>
                Loophole follows user input from source to sink —{" "}
                <span className="mono" style={{ color: "var(--purple)" }}>
                  req.query.cmd → cmd → exec
                </span>{" "}
                — so findings are real, reachable flows instead of keyword noise.
              </p>
            </div>
            <div className="step">
              <div className="no">WHY + FIX</div>
              <h3>Every finding teaches</h3>
              <p>
                Each result explains the risk in plain English and ships the concrete fix. No cryptic rule
                codes that send you to a wiki — the answer is in the output.
              </p>
            </div>
            <div className="step">
              <div className="no">ZERO SETUP</div>
              <h3>No platform. No account.</h3>
              <p>
                No SaaS onboarding, no required config, no telemetry, no API keys. If Python 3 runs —
                laptop, CI runner, air-gapped box — Loophole runs. Offline, in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* THE 61 CHECKS */}
        <section id="checks">
          <div className="sec-head">
            <span className="sec-num">Fig. 02</span>
            <h2>61 security tools. Zero jargon.</h2>
          </div>
          <p className="lead">
            Every check Loophole runs, explained the way you&apos;d explain it to a friend. Big plain name
            first — the technical code stays small, for those who want it.{" "}
            <strong>All 61 run together in every scan</strong>; nothing to select or configure.
          </p>
          <ChecksGrid categories={CATEGORIES} />
          <div className="strip">
            Every scan runs <b>all 61 tools together</b> — point Loophole at your project, get one report
            with a plain-English why and a concrete fix for every finding.
          </div>
        </section>

        {/* SERVER GUARD */}
        <section id="server-guard">
          <div className="sec-head">
            <span className="sec-num">Fig. 03</span>
            <h2>Loophole Server Guard — protection for running servers</h2>
          </div>
          <p className="lead">
            Scanning code is only half the job. <strong>Loophole Server Guard</strong> watches your live web
            and SSH logs, scores every suspicious IP, rings the alarm — terminal, email, Telegram or
            webhook — and auto-bans repeat offenders at the firewall, whitelist-protected and dry-run by
            default. It even runs Loophole&apos;s own scans on the server&apos;s code on a schedule, so{" "}
            <strong>code holes and live attacks land in one dashboard</strong>.
          </p>
          <div className="steps steps4">
            <div className="step">
              <div className="no">STEP 1 · WATCH</div>
              <h3>Logs + honeypots, live</h3>
              <p>
                Server Guard tails Apache/Nginx access logs and SSH/auth logs in real time — and listens on
                decoy honeypot ports for anyone poking around.
              </p>
            </div>
            <div className="step">
              <div className="no">STEP 2 · SCORE</div>
              <h3>Every IP gets a score</h3>
              <p>
                Probes for <span className="mono">/.env</span> and <span className="mono">/wp-admin</span>,
                SQL injection, XSS, traversal, scanner tools and SSH brute force all add points — LOW 5 ·
                MEDIUM 10 · HIGH 25 · CRITICAL 50.
              </p>
            </div>
            <div className="step">
              <div className="no">STEP 3 · ALARM</div>
              <h3>You hear about it instantly</h3>
              <p>
                Cross the warn line (40) and an alert goes out; cross the alarm line (75) and it gets
                louder — always with the attacker&apos;s IP and what they tried.
              </p>
            </div>
            <div className="step">
              <div className="no">STEP 4 · BAN</div>
              <h3>Repeat offenders locked out</h3>
              <p>
                At 100, the IP is banned at the firewall — iptables, nft or ufw — with an expiry. Your own
                IPs sit on a whitelist that can never be banned.
              </p>
            </div>
          </div>

          <div className="tool" style={{ marginTop: 16 }}>
            <div className="ic">🛡️</div>
            <h3>Server Guard — the runtime tool</h3>
            <p>
              Every incident is stored in SQLite, and a local dashboard shows top attackers, active bans
              and recent incidents. The fake SSH server, fake WordPress and phpMyAdmin logins and fake{" "}
              <span className="mono">.env</span> catch probers red-handed — any touch of a decoy is a HIGH
              incident. And because it&apos;s Loophole, Server Guard runs the same 61 code checks against
              the server&apos;s code on a schedule: new critical or high findings raise the same alarm and
              the same alerts.
            </p>
            <pre className="cmdpre">
              <span className="cm"># see it work in 10 seconds — built-in web + SSH attack demo, dry-run ban</span>
              {"\n"}
              python3 sitealarm.py demo{"\n\n"}
              <span className="cm"># one-shot analysis of an existing log</span>
              {"\n"}
              python3 sitealarm.py scan-log /var/log/nginx/access.log{"\n\n"}
              <span className="cm"># run Loophole&apos;s code checks against the server&apos;s code, right now</span>
              {"\n"}
              python3 sitealarm.py codescan{"\n\n"}
              <span className="cm"># daemon — watch logs + honeypot + scheduled code scans</span>
              {"\n"}
              python3 sitealarm.py --config sitealarm.json run{"\n\n"}
              <span className="cm"># live dashboard — top attackers, active bans, incidents</span>
              {"\n"}
              python3 sitealarm.py dashboard
            </pre>
            <div className="foot">
              <span className="pill med">RUNTIME</span>
              <span className="ccode">SERVER GUARD · ZERO DEPENDENCIES</span>
            </div>
          </div>

          <div className="steps" style={{ marginTop: 16 }}>
            <div className="step">
              <div className="no">ALERTS</div>
              <h3>Terminal · email · Telegram · webhook</h3>
              <p>Each channel is independent and stdlib-only. An alert carries the IP, its score, the rules it hit and sample requests.</p>
            </div>
            <div className="step">
              <div className="no">HONEYPOT</div>
              <h3>Decoys that catch pokers</h3>
              <p>A fake OpenSSH banner, fake WordPress and phpMyAdmin logins, a fake .env and .git/config — touch one and you&apos;re scored.</p>
            </div>
            <div className="step">
              <div className="no">SAFE BY DEFAULT</div>
              <h3>Whitelist + dry-run</h3>
              <p>Whitelisted IPs and CIDRs can never be banned, and dry-run logs the exact firewall command it would run — until you switch it off.</p>
            </div>
            <div className="step">
              <div className="no">INCIDENT STORE</div>
              <h3>SQLite, not a scrollback</h3>
              <p>Incidents, scores and bans persist in SQLite, so attackers, incidents and stats stay queryable across restarts.</p>
            </div>
            <div className="step">
              <div className="no">DASHBOARD</div>
              <h3>One page, whole picture</h3>
              <p>Totals, counts by rule and source, top attacker IPs, active bans and recent incidents — plus the Loophole code-security section.</p>
            </div>
            <div className="step">
              <div className="no">SERVICE-READY</div>
              <h3>Runs as a systemd service</h3>
              <p>An install script and systemd unit are included, and everything — sources, thresholds, channels, firewall — is one JSON config.</p>
            </div>
          </div>
        </section>

        {/* QUICKSTART — SCANNER */}
        <section id="usage">
          <div className="sec-head">
            <span className="sec-num">Fig. 04</span>
            <h2>Up and running in one command</h2>
          </div>
          <p className="lead">
            Clone it, run it. Machine-readable output for pipelines, human output for people, and{" "}
            <strong>--fix-dry</strong> prints mechanical fix suggestions as diffs — it never touches your
            files uninvited.
          </p>
          <div className="grid2">
            <div className="code">
              <div className="code-bar">
                <span className="dot" style={{ background: "#f85149" }}></span>
                <span className="dot" style={{ background: "#d29922" }}></span>
                <span className="dot" style={{ background: "#3fb950" }}></span>
                &nbsp; terminal
              </div>
              <pre>
                <span className="c"># clone — that&apos;s the entire install</span>
                {"\n"}
                git clone https://github.com/rootsiemen/loophole{"\n"}
                <span className="k">cd</span> loophole{"\n\n"}
                <span className="c"># scan a project</span>
                {"\n"}
                python3 loophole.py scan ./your-project{"\n\n"}
                <span className="c"># only criticals and highs, specific folder</span>
                {"\n"}
                python3 loophole.py scan ./src \{"\n"}
                {"  --severity critical,high"}
                {"\n\n"}
                <span className="c"># preview fixes as diffs (dry run)</span>
                {"\n"}
                python3 loophole.py scan . --fix-dry
              </pre>
            </div>
            <div className="code">
              <div className="code-bar">
                <span className="dot" style={{ background: "#f85149" }}></span>
                <span className="dot" style={{ background: "#d29922" }}></span>
                <span className="dot" style={{ background: "#3fb950" }}></span>
                &nbsp; pipeline output
              </div>
              <pre>
                <span className="c"># JSON for your own tooling</span>
                {"\n"}
                python3 loophole.py scan . --json{"\n\n"}
                <span className="c"># SARIF 2.1.0 for code scanning UIs</span>
                {"\n"}
                python3 loophole.py scan . --sarif{"\n\n"}
                <span className="c"># exit code 1 on critical/high findings,</span>
                {"\n"}
                <span className="c"># so CI fails the build exactly when it should</span>
                {"\n"}
                python3 loophole.py scan . ; <span className="k">echo</span> $?
              </pre>
            </div>
          </div>
        </section>

        {/* GITHUB ACTION */}
        <section id="action">
          <div className="sec-head">
            <span className="sec-num">Fig. 05</span>
            <h2>First-class in GitHub Actions</h2>
          </div>
          <p className="lead">
            The official Action runs Loophole on every push and pull request and uploads SARIF results to
            your repository&apos;s <strong>Security tab</strong> — findings show up where your team already
            reviews code.
          </p>
          <div className="grid2">
            <div className="code">
              <div className="code-bar">
                <span className="dot" style={{ background: "#f85149" }}></span>
                <span className="dot" style={{ background: "#d29922" }}></span>
                <span className="dot" style={{ background: "#3fb950" }}></span>
                &nbsp; .github/workflows/security.yml
              </div>
              <pre>
                <span className="k">name:</span> <span className="s">Security scan</span>
                {"\n"}
                <span className="k">on:</span> [push, pull_request]{"\n"}
                <span className="k">permissions:</span>
                {"\n"}
                {"  "}
                <span className="k">security-events:</span> write{"\n"}
                <span className="k">jobs:</span>
                {"\n"}
                {"  "}
                <span className="k">loophole:</span>
                {"\n"}
                {"    "}
                <span className="k">runs-on:</span> ubuntu-latest{"\n"}
                {"    "}
                <span className="k">steps:</span>
                {"\n"}
                {"      - "}
                <span className="k">uses:</span> actions/checkout@v4{"\n"}
                {"      - "}
                <span className="k">uses:</span> <span className="f">rootsiemen/loophole@v1</span>
              </pre>
            </div>
            <div>
              <table className="mini">
                <thead>
                  <tr>
                    <th>Input</th>
                    <th>What it does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>path</td>
                    <td style={{ color: "var(--muted)" }}>Directory to scan (default: repo root)</td>
                  </tr>
                  <tr>
                    <td>severity</td>
                    <td style={{ color: "var(--muted)" }}>Minimum severity to report</td>
                  </tr>
                  <tr>
                    <td>upload-sarif</td>
                    <td style={{ color: "var(--muted)" }}>Publish results to code scanning</td>
                  </tr>
                  <tr>
                    <td>fail-on-findings</td>
                    <td style={{ color: "var(--muted)" }}>Fail the workflow on critical/high</td>
                  </tr>
                </tbody>
              </table>
              <p className="table-note">PINNED AS @v1 · SELF-TESTED IN CI ON EVERY PUSH</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="sec-head">
            <span className="sec-num">Fig. 06</span>
            <h2>Loophole questions, answered</h2>
          </div>
          <div>
            {FAQS.map(([q, a]) => (
              <details key={q} className="faq">
                <summary>
                  {q}
                  <span className="plus">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="closing">
          <div className="sec-head">
            <span className="sec-num">Fig. 07</span>
            <h2>Open source, built in the open</h2>
          </div>
          <p className="lead">
            Loophole is MIT-licensed and maintained in public. A new rule is one focused function plus
            fixtures — the codebase is a single readable file, so your first contribution is an afternoon,
            not a week.
          </p>
          <div className="cta" style={{ justifyContent: "flex-start", marginTop: 4 }}>
            <a className="btn primary" href={GITHUB}>
              Star it on GitHub
            </a>
            <a className="btn" href="https://github.com/rootsiemen/loophole/releases/tag/v1.2.0">
              v1.2.0 release notes
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
