// Renders blog post body blocks:
// plain string -> paragraph, "## " -> h2, "### " -> h3, "- " -> bullet list,
// "1. " -> numbered list, "> " -> callout, markdown table blocks -> <table>,
// "![alt](url)" -> body image. Inline: "[text](url)" links, "**bold**",
// "*italic*" and "`code`" render properly (fixed 2026-11-15: previously bold,
// tables and h3 rendered as raw markdown).
import Link from "next/link";

const LINK_RE = /(\[[^\]]+\]\(https?:[^)\s]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  const parts = text.split(LINK_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    const m = part.match(/^\[([^\]]+)\]\((https?:[^)\s]+)\)$/);
    if (m) {
      const [, label, href] = m;
      const cls = "font-semibold text-orange-700 hover:text-orange-800 underline decoration-orange-300 underline-offset-2";
      return href.startsWith("https://frinjo.me") || href.startsWith("/") ? (
        <Link key={key} href={href.replace("https://frinjo.me", "") || "/"} className={cls}>
          {label}
        </Link>
      ) : (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {label}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-stone-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={key} className="rounded bg-orange-50 px-1.5 py-0.5 text-[0.92em] font-medium text-stone-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function parseTable(block: string, key: number): React.ReactNode {
  const rows = block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|"));
  const cells = (line: string) =>
    line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const isSep = (line: string) => /^\|?[\s:|-]+\|?$/.test(line) && line.includes("-");
  const header = rows.length ? cells(rows[0]) : [];
  const bodyRows = rows.slice(1).filter((l) => !isSep(l)).map(cells);
  return (
    <div key={key} className="my-6 overflow-x-auto rounded-2xl border border-orange-100">
      <table className="w-full text-left text-[0.98rem]">
        <thead>
          <tr className="bg-orange-50">
            {header.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold text-stone-900 border-b border-orange-100">
                {renderInline(h, `th-${key}-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((r, ri) => (
            <tr key={ri} className={ri % 2 ? "bg-orange-50/40" : ""}>
              {r.map((c, ci) => (
                <td key={ci} className="px-4 py-3 text-stone-700 border-b border-orange-50 leading-relaxed">
                  {renderInline(c, `td-${key}-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogContent({ blocks }: { blocks: string[] }) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  let olist: string[] = [];

  function flushLists(key: string) {
    if (list.length) {
      const items = list;
      out.push(
        <ul key={`ul-${key}`} className="my-5 space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-stone-700 leading-relaxed">
              <span className="text-orange-500 font-bold shrink-0">•</span>
              <span>{renderInline(item, `li-${key}-${i}`)}</span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
    if (olist.length) {
      const items = olist;
      out.push(
        <ol key={`ol-${key}`} className="my-5 space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-stone-700 leading-relaxed">
              <span className="text-orange-500 font-bold shrink-0">{i + 1}.</span>
              <span>{renderInline(item, `oli-${key}-${i}`)}</span>
            </li>
          ))}
        </ol>
      );
      olist = [];
    }
  }

  blocks.forEach((b, i) => {
    const imgMatch = b.match(/^!\[([^\]]*)\]\((https?:[^)\s]+)\)\s*$/);
    const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
    const isTable = lines.length >= 2 && lines.every((l) => l.startsWith("|"));
    if (imgMatch) {
      flushLists(`${i}`);
      out.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={imgMatch[2]} alt={imgMatch[1]} loading="lazy" className="w-full rounded-2xl my-8 border border-orange-100" />
      );
    } else if (isTable) {
      flushLists(`${i}`);
      out.push(parseTable(b, i));
    } else if (b.startsWith("## ")) {
      flushLists(`${i}`);
      out.push(
        <h2 key={i} className="font-display text-2xl font-bold text-stone-900 mt-10 mb-4">
          {b.slice(3)}
        </h2>
      );
    } else if (b.startsWith("### ")) {
      flushLists(`${i}`);
      out.push(
        <h3 key={i} className="font-display text-xl font-bold text-stone-900 mt-8 mb-3">
          {b.slice(4)}
        </h3>
      );
    } else if (b.startsWith("- ")) {
      list.push(b.slice(2));
    } else if (/^\d+\.\s/.test(b)) {
      olist.push(b.replace(/^\d+\.\s/, ""));
    } else if (b.startsWith("> ")) {
      flushLists(`${i}`);
      out.push(
        <div key={i} className="my-6 rounded-2xl border-l-4 border-orange-400 bg-orange-50 p-5 text-stone-800 leading-relaxed">
          💡 {renderInline(b.slice(2), `co-${i}`)}
        </div>
      );
    } else if (b.trim() === "") {
      flushLists(`${i}`);
    } else {
      flushLists(`${i}`);
      out.push(
        <p key={i} className="my-4 text-stone-700 leading-relaxed text-[1.05rem]">
          {renderInline(b, `p-${i}`)}
        </p>
      );
    }
  });
  flushLists("end");

  return <>{out}</>;
}
