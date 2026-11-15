"use client";

import { useEffect, useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

interface Person {
  id: number;
  name: string;
  wish: string;
}

interface Assignment {
  giver: number;
  receiver: number;
}

interface RevealData {
  name: string;
  match: string;
  wish?: string;
  budget?: string;
  date?: string;
  note?: string;
}

let nextId = 4;

function encodeReveal(data: RevealData): string {
  const json = JSON.stringify(data);
  return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
}

function decodeReveal(hash: string): RevealData | null {
  try {
    const raw = hash.replace(/^#r=/, "");
    const json = decodeURIComponent(escape(atob(decodeURIComponent(raw))));
    const data = JSON.parse(json);
    if (typeof data?.name === "string" && typeof data?.match === "string") return data;
    return null;
  } catch {
    return null;
  }
}

/**
 * Backtracking derangement: assign every giver a different receiver,
 * never themselves, never someone on their exclusion list.
 * Givers and receivers are tried in random order for a fair draw.
 */
export function drawAssignments(
  people: Person[],
  exclusions: Record<number, number[]>
): Assignment[] | null {
  const ids = people.map((p) => p.id);
  const givers = [...ids].sort(() => Math.random() - 0.5);
  const taken = new Set<number>();
  const result: Assignment[] = [];

  function backtrack(i: number): boolean {
    if (i === givers.length) return true;
    const giver = givers[i];
    const banned = new Set(exclusions[giver] ?? []);
    const options = ids
      .filter((r) => r !== giver && !taken.has(r) && !banned.has(r))
      .sort(() => Math.random() - 0.5);
    for (const receiver of options) {
      taken.add(receiver);
      result.push({ giver, receiver });
      if (backtrack(i + 1)) return true;
      taken.delete(receiver);
      result.pop();
    }
    return false;
  }

  return backtrack(0) ? result : null;
}

export default function SecretSantaGenerator() {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: "", wish: "" },
    { id: 2, name: "", wish: "" },
    { id: 3, name: "", wish: "" },
  ]);
  const [exclusions, setExclusions] = useState<Record<number, number[]>>({});
  const [exclFor, setExclFor] = useState<number | null>(null);
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [error, setError] = useState("");
  const [passPhoneFor, setPassPhoneFor] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [reveal, setReveal] = useState<RevealData | null>(null);
  const [revealShown, setRevealShown] = useState(false);
  const [hashChecked, setHashChecked] = useState(false);

  // Private-link reveal view: #r=<encoded match> in the URL hash.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.startsWith("#r=")) {
      const data = decodeReveal(window.location.hash);
      if (data) setReveal(data);
    }
    setHashChecked(true);
  }, []);

  const byId = useMemo(() => {
    const m = new Map<number, Person>();
    people.forEach((p) => m.set(p.id, p));
    return m;
  }, [people]);

  const namedPeople = people.filter((p) => p.name.trim().length > 0);
  const duplicateNames = useMemo(() => {
    const seen = new Set<string>();
    for (const p of namedPeople) {
      const key = p.name.trim().toLowerCase();
      if (seen.has(key)) return true;
      seen.add(key);
    }
    return false;
  }, [namedPeople]);

  function addPerson() {
    if (people.length >= 50) return;
    setPeople((prev) => [...prev, { id: nextId++, name: "", wish: "" }]);
  }

  function removePerson(id: number) {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    setExclusions((prev) => {
      const copy: Record<number, number[]> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (Number(k) !== id) copy[Number(k)] = v.filter((r) => r !== id);
      }
      return copy;
    });
    if (exclFor === id) setExclFor(null);
  }

  function updatePerson(id: number, field: "name" | "wish", value: string) {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function toggleExclusion(giver: number, receiver: number) {
    setExclusions((prev) => {
      const current = prev[giver] ?? [];
      const next = current.includes(receiver)
        ? current.filter((r) => r !== receiver)
        : [...current, receiver];
      return { ...prev, [giver]: next };
    });
  }

  function handleDraw() {
    setError("");
    if (namedPeople.length < 3) {
      setError("Add at least 3 names before drawing.");
      return;
    }
    if (duplicateNames) {
      setError("Two people share the same name — add a surname or initial so the private links go to the right person.");
      return;
    }
    const trimmed = people
      .filter((p) => p.name.trim().length > 0)
      .map((p) => ({ ...p, name: p.name.trim(), wish: p.wish.trim() }));
    const result = drawAssignments(trimmed, exclusions);
    if (!result) {
      setAssignments(null);
      setError(
        "No valid draw exists with these exclusions — somebody is blocked from drawing almost everyone. Remove a few exclusions and try again."
      );
      return;
    }
    setPeople(trimmed);
    setAssignments(result);
    setPassPhoneFor(null);
    setRevealed(new Set());
  }

  function resetDraw() {
    setAssignments(null);
    setPassPhoneFor(null);
    setRevealed(new Set());
    setError("");
  }

  function linkFor(a: Assignment): string {
    const giver = byId.get(a.giver);
    const receiver = byId.get(a.receiver);
    if (!giver || !receiver || typeof window === "undefined") return "";
    const data: RevealData = {
      name: giver.name,
      match: receiver.name,
      ...(receiver.wish ? { wish: receiver.wish } : {}),
      ...(budget.trim() ? { budget: budget.trim() } : {}),
      ...(date ? { date } : {}),
      ...(note.trim() ? { note: note.trim() } : {}),
    };
    return `${window.location.origin}${window.location.pathname}#r=${encodeReveal(data)}`;
  }

  async function copyLink(a: Assignment) {
    const link = linkFor(a);
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(a.giver);
    setTimeout(() => setCopiedId(null), 2000);
  }

  /* ---------- PRIVATE LINK REVEAL VIEW ---------- */
  if (hashChecked && reveal) {
    return (
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-8 sm:p-10 shadow-sm text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
              Secret Santa · Private reveal
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Hi {reveal.name}!
            </h2>
            {!revealShown ? (
              <>
                <p className="mt-4 text-stone-600 leading-relaxed">
                  Your Secret Santa match is hidden behind the button. Make sure nobody is
                  looking over your shoulder, then tap to reveal it.
                </p>
                <button
                  type="button"
                  onClick={() => setRevealShown(true)}
                  className="mt-6 rounded-full bg-orange-600 px-8 py-3 font-bold text-white hover:bg-orange-700 transition"
                >
                  Reveal my match
                </button>
              </>
            ) : (
              <>
                <p className="mt-6 text-stone-600">You are buying a gift for</p>
                <p className="mt-2 font-display text-5xl font-bold text-stone-900">{reveal.match}</p>
                {reveal.wish && (
                  <p className="mt-4 rounded-2xl bg-white border border-stone-200 px-5 py-4 text-stone-700">
                    <span className="font-bold text-stone-900">Their wish list:</span> {reveal.wish}
                  </p>
                )}
                <div className="mt-6 grid gap-3 sm:grid-cols-2 text-left">
                  {reveal.budget && (
                    <div className="rounded-2xl bg-white border border-stone-100 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Budget</p>
                      <p className="mt-1 font-bold text-stone-900">{reveal.budget}</p>
                    </div>
                  )}
                  {reveal.date && (
                    <div className="rounded-2xl bg-white border border-stone-100 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Exchange date</p>
                      <p className="mt-1 font-bold text-stone-900">{reveal.date}</p>
                    </div>
                  )}
                </div>
                {reveal.note && <p className="mt-4 text-sm text-stone-500">{reveal.note}</p>}
                <p className="mt-6 text-sm text-stone-400">
                  Keep it secret — that is the whole game.
                </p>
              </>
            )}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500">
            Running your own exchange?{" "}
            <a href="/secret-santa-generator" className="font-semibold text-orange-700 hover:text-orange-800">
              Open the free Secret Santa Generator
            </a>
          </p>
        </div>
      </section>
    );
  }

  /* ---------- GENERATOR VIEW ---------- */
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          {/* Participants */}
          <h2 className="font-display text-2xl font-bold text-stone-900">1 · Who is playing?</h2>
          <p className="mt-1 text-sm text-stone-500">
            Add everyone taking part — minimum 3, maximum 50. The wish list is optional and is
            only shown to the person who draws that name.
          </p>
          <div className="mt-5 space-y-3">
            {people.map((p, i) => (
              <div key={p.id} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end">
                <div>
                  <label className={labelCls} htmlFor={`ss-name-${p.id}`}>
                    Name {i + 1}
                  </label>
                  <input
                    id={`ss-name-${p.id}`}
                    type="text"
                    maxLength={60}
                    className={inputCls}
                    placeholder="e.g. Ayesha"
                    value={p.name}
                    onChange={(e) => updatePerson(p.id, "name", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor={`ss-wish-${p.id}`}>
                    Wish list <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <input
                    id={`ss-wish-${p.id}`}
                    type="text"
                    maxLength={140}
                    className={inputCls}
                    placeholder="e.g. Books, dark chocolate, nothing scented"
                    value={p.wish}
                    onChange={(e) => updatePerson(p.id, "wish", e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePerson(p.id)}
                  disabled={people.length <= 3}
                  className="rounded-2xl border border-stone-300 bg-white px-4 py-3 font-bold text-stone-600 hover:border-red-300 hover:text-red-600 disabled:opacity-40 disabled:hover:border-stone-300 disabled:hover:text-stone-600 transition"
                  aria-label={`Remove ${p.name || "participant"}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPerson}
            disabled={people.length >= 50}
            className="mt-4 rounded-full bg-white border border-stone-300 px-5 py-2 font-bold text-sm text-stone-700 hover:border-orange-400 disabled:opacity-40 transition"
          >
            + Add another person
          </button>

          {/* Exchange details */}
          <h2 className="mt-10 font-display text-2xl font-bold text-stone-900">
            2 · Exchange details <span className="text-base font-normal text-stone-400">(optional)</span>
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="ss-budget">Budget</label>
              <input
                id="ss-budget"
                type="text"
                maxLength={40}
                className={inputCls}
                placeholder="e.g. $25 / Rs 2,000 max"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="ss-date">Exchange date</label>
              <input
                id="ss-date"
                type="date"
                className={inputCls}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="ss-note">Organiser note</label>
              <input
                id="ss-note"
                type="text"
                maxLength={140}
                className={inputCls}
                placeholder="e.g. Gifts exchanged at the office party"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          {/* Exclusions */}
          <h2 className="mt-10 font-display text-2xl font-bold text-stone-900">
            3 · Exclusions <span className="text-base font-normal text-stone-400">(optional)</span>
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Stop certain people from drawing each other — couples, housemates, last year&apos;s
            match. Pick a name, then tick everyone they must <strong>not</strong> draw. For
            couples, set it on both names.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {namedPeople.length === 0 && (
              <p className="text-sm text-stone-400">Add names above first — they will appear here.</p>
            )}
            {namedPeople.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setExclFor(exclFor === p.id ? null : p.id)}
                className={`rounded-full px-4 py-2 font-bold text-sm transition ${
                  exclFor === p.id
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                }`}
              >
                {p.name}
                {(exclusions[p.id]?.length ?? 0) > 0 && (
                  <span className="ml-2 rounded-full bg-stone-900/10 px-2 py-0.5 text-xs">
                    {exclusions[p.id].length} blocked
                  </span>
                )}
              </button>
            ))}
          </div>
          {exclFor !== null && byId.get(exclFor) && (
            <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-5">
              <p className="font-bold text-stone-900">
                {byId.get(exclFor)?.name} must NOT draw:
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {namedPeople
                  .filter((p) => p.id !== exclFor)
                  .map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 cursor-pointer hover:border-orange-300 transition"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-orange-600"
                        checked={(exclusions[exclFor] ?? []).includes(p.id)}
                        onChange={() => toggleExclusion(exclFor, p.id)}
                      />
                      <span className="font-semibold text-stone-800">{p.name}</span>
                    </label>
                  ))}
              </div>
            </div>
          )}

          {/* Draw */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleDraw}
              className="rounded-full bg-orange-600 px-10 py-4 font-display text-xl font-bold text-white hover:bg-orange-700 transition shadow-md"
            >
              Draw names
            </button>
            <p className="mt-3 text-xs text-stone-400">
              Nothing is stored — the draw runs entirely in your browser and no email addresses
              are collected.
            </p>
          </div>

          {error && (
            <p className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
              {error}
            </p>
          )}
        </div>

        {/* Results */}
        {assignments && (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                The draw is done
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-stone-900">
                {assignments.length} matches made — nobody drew themselves
              </h2>
              <p className="mt-2 text-stone-600">
                Keep the matches secret. Choose how to share them:
              </p>
            </div>

            {/* Pass the phone */}
            <h3 className="mt-10 font-display text-xl font-bold text-stone-900">
              Option A · Pass the phone
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Everyone in the same room? Hand the phone around — each person taps their own name,
              sees only their match, then hides it again.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {assignments.map((a) => (
                <button
                  key={a.giver}
                  type="button"
                  onClick={() => setPassPhoneFor(passPhoneFor === a.giver ? null : a.giver)}
                  className={`rounded-full px-4 py-2 font-bold text-sm transition ${
                    passPhoneFor === a.giver
                      ? "bg-orange-600 text-white"
                      : revealed.has(a.giver)
                        ? "bg-green-100 border border-green-300 text-green-800"
                        : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                  }`}
                >
                  {byId.get(a.giver)?.name}
                  {revealed.has(a.giver) && passPhoneFor !== a.giver ? " ✓" : ""}
                </button>
              ))}
            </div>
            {passPhoneFor !== null &&
              (() => {
                const a = assignments.find((x) => x.giver === passPhoneFor);
                if (!a) return null;
                const giver = byId.get(a.giver);
                const receiver = byId.get(a.receiver);
                const isRevealed = revealed.has(a.giver);
                return (
                  <div className="mt-5 rounded-2xl bg-stone-50 border border-stone-200 p-6 text-center">
                    {!isRevealed ? (
                      <>
                        <p className="text-stone-600">
                          Pass the phone to <strong>{giver?.name}</strong>. Only they should tap
                          the button.
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setRevealed((prev) => new Set(prev).add(a.giver))
                          }
                          className="mt-4 rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700 transition"
                        >
                          I am {giver?.name} — reveal my match
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-stone-600">{giver?.name}, you are buying for</p>
                        <p className="mt-1 font-display text-4xl font-bold text-stone-900">
                          {receiver?.name}
                        </p>
                        {receiver?.wish && (
                          <p className="mt-3 text-stone-600">
                            <strong>Wish list:</strong> {receiver.wish}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setPassPhoneFor(null)}
                          className="mt-4 rounded-full bg-white border border-stone-300 px-6 py-3 font-bold text-stone-700 hover:border-orange-400 transition"
                        >
                          Hide it &amp; pass on
                        </button>
                      </>
                    )}
                  </div>
                );
              })()}

            {/* Private links */}
            <h3 className="mt-10 font-display text-xl font-bold text-stone-900">
              Option B · Private links
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Group spread out? Send each person their own link by WhatsApp, text or chat. The
              link opens a page that shows only their match — the match travels inside the link
              itself, so send each link privately to the right person.
            </p>
            <div className="mt-4 space-y-3">
              {assignments.map((a) => (
                <div
                  key={a.giver}
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50/60 px-5 py-4"
                >
                  <p className="font-bold text-stone-900 min-w-32">{byId.get(a.giver)?.name}</p>
                  <code className="flex-1 min-w-48 truncate rounded-xl bg-white border border-stone-200 px-3 py-2 text-xs text-stone-500">
                    {linkFor(a)}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyLink(a)}
                    className={`rounded-full px-5 py-2 font-bold text-sm transition ${
                      copiedId === a.giver
                        ? "bg-green-600 text-white"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                    }`}
                  >
                    {copiedId === a.giver ? "Copied!" : "Copy link"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleDraw}
                className="rounded-full bg-white border border-stone-300 px-6 py-3 font-bold text-stone-700 hover:border-orange-400 transition"
              >
                Redraw
              </button>
              <button
                type="button"
                onClick={resetDraw}
                className="rounded-full bg-white border border-stone-300 px-6 py-3 font-bold text-stone-700 hover:border-orange-400 transition"
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
