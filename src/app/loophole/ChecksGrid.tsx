"use client";

import { useState } from "react";

export type PillKind = "crit" | "high" | "med";

export interface CheckCard {
  icon: string;
  title: string;
  desc: string;
  pill: PillKind;
  pillLabel: string;
  code: string;
  isNew?: boolean;
}

export interface CheckCategory {
  key: string;
  num: string;
  title: string;
  sub: string;
  cards: CheckCard[];
}

const CHIP_LABELS: Record<string, string> = {
  all: "All 61 tools",
  new: "🆕 11 New Tools",
  keys: "🔑 Passwords & Keys",
  db: "🗄️ Database",
  entry: "🚪 Entry Points",
  files: "📁 Files",
  login: "🔐 Login & Settings",
  crypto: "🔒 Encryption",
};

export default function ChecksGrid({ categories }: { categories: CheckCategory[] }) {
  const [filter, setFilter] = useState("all");
  const chips = ["all", "new", ...categories.map((c) => c.key)];

  return (
    <>
      <div className="filters">
        {chips.map((key) => (
          <button
            key={key}
            type="button"
            className={filter === key ? "fchip on" : "fchip"}
            onClick={() => setFilter(key)}
          >
            {CHIP_LABELS[key] ?? key}
          </button>
        ))}
      </div>

      {categories.map((cat) => {
        const visible =
          filter === "all"
            ? cat.cards
            : filter === "new"
              ? cat.cards.filter((c) => c.isNew)
              : cat.key === filter
                ? cat.cards
                : [];
        if (visible.length === 0) return null;
        return (
          <section className="catsec" key={cat.key}>
            <div className="sec-head">
              <span className="sec-num">{cat.num}</span>
              <h2>{cat.title}</h2>
            </div>
            <p className="cat-sub">{cat.sub}</p>
            <div className="tgrid">
              {visible.map((card) => (
                <div className="tool" key={card.code}>
                  <div className="ic">{card.icon}</div>
                  <h3>
                    {card.title}
                    {card.isNew ? <span className="new">NEW</span> : null}
                  </h3>
                  <p>{card.desc}</p>
                  <div className="foot">
                    <span className={`pill ${card.pill}`}>{card.pillLabel}</span>
                    <span className="ccode">{card.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
