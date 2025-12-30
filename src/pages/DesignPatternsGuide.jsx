// DesignPatternsGuide.jsx
// React "quick reference" page with search + filters + expandable sections + acronym glossary.
// No external deps.

import React, { useMemo, useState } from "react";
import "../styles/DesignPatternsGuide.css";
import ACRONYMS from "../data/acronyms.json";
import GUIDE from "../data/design-patterns.json";
import { AcronymWrapper } from "../components/AcronymWrapper";

// Note: ACRONYMS and GUIDE data are now in separate JSON files at:
// - src/data/acronyms.json
// - src/data/design-patterns.json
//
// Edit those files directly to add/modify acronyms and design patterns.

function uniq(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

function normalize(s) {
  return String(s || "").toLowerCase().trim();
}

function contains(haystack, needle) {
  if (!needle) return true;
  return normalize(haystack).includes(normalize(needle));
}

function Chip({ children }) {
  return (
    <span className="dpg-chip" title={typeof children === "string" ? children : ""}>
      {children}
    </span>
  );
}

export default function DesignPatternsGuide() {
  const allItems = useMemo(
    () => GUIDE.flatMap((s) => s.items.map((it) => ({ ...it, section: s.section }))),
    []
  );

  const devTypeOptions = useMemo(() => ["(any)", ...uniq(allItems.flatMap((i) => i.bestFor || []))], [allItems]);
  const paradigmOptions = useMemo(() => ["(any)", ...uniq(allItems.flatMap((i) => i.paradigms || []))], [allItems]);
  const patternTypeOptions = useMemo(() => ["(any)", ...uniq(allItems.map((i) => i.patternType).filter(Boolean))], [allItems]);
  const languageOptions = useMemo(() => ["(any)", ...uniq(allItems.flatMap((i) => i.languages || []))], [allItems]);
  const sectionOptions = useMemo(() => ["(any)", ...uniq(GUIDE.map((s) => s.section))], []);

  const [query, setQuery] = useState("");
  const [devType, setDevType] = useState("(any)");
  const [paradigm, setParadigm] = useState("(any)");
  const [patternType, setPatternType] = useState("(any)");
  const [language, setLanguage] = useState("(any)");
  const [section, setSection] = useState("(any)");
  const [view, setView] = useState("cards"); // "cards" | "table"
  const [openAll, setOpenAll] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query);

    return allItems.filter((item) => {
      const blob = [
        item.name,
        item.notes,
        item.description,
        (item.bestFor || []).join(" "),
        (item.paradigms || []).join(" "),
        (item.languages || []).join(" "),
        item.patternType,
        item.section,
      ].join(" | ");

      const matchesQuery = q ? contains(blob, q) : true;
      const matchesDevType = devType === "(any)" ? true : (item.bestFor || []).includes(devType);
      const matchesParadigm = paradigm === "(any)" ? true : (item.paradigms || []).includes(paradigm);
      const matchesPatternType = patternType === "(any)" ? true : item.patternType === patternType;
      const matchesLanguage = language === "(any)" ? true : (item.languages || []).includes(language);
      const matchesSection = section === "(any)" ? true : item.section === section;

      return matchesQuery && matchesDevType && matchesParadigm && matchesPatternType && matchesLanguage && matchesSection;
    });
  }, [allItems, query, devType, paradigm, patternType, language, section]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const it of filtered) {
      if (!map.has(it.section)) map.set(it.section, []);
      map.get(it.section).push(it);
    }
    return GUIDE.map((s) => ({
      section: s.section,
      items: (map.get(s.section) || []).sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const glossaryFiltered = useMemo(() => {
    const q = normalize(glossaryQuery);
    if (!q) return ACRONYMS.slice().sort((a, b) => a.key.localeCompare(b.key));
    return ACRONYMS.filter((t) =>
      contains(`${t.key} ${t.expansion} ${t.explanation}`, q)
    ).sort((a, b) => a.key.localeCompare(b.key));
  }, [glossaryQuery]);

  const totalCount = allItems.length;
  const shownCount = filtered.length;

  const resetFilters = () => {
    setQuery("");
    setDevType("(any)");
    setParadigm("(any)");
    setPatternType("(any)");
    setLanguage("(any)");
    setSection("(any)");
  };

  return (
    <div className="dpg-page">
      <header className="dpg-header">
        <div>
          <h1 className="dpg-title">Software Design Patterns — Quick Reference</h1>
          <p className="dpg-subtitle">
            Filter by development type, pattern category, paradigm, and language.
            Includes a built-in acronym glossary (<AcronymWrapper acronyms={ACRONYMS}>GoF, CQRS, MVC</AcronymWrapper>, etc.).
          </p>
        </div>

        <div className="dpg-meta">
          <div className="dpg-count">
            Showing <strong>{shownCount}</strong> of <strong>{totalCount}</strong>
          </div>

          <div className="dpg-viewToggle" role="group" aria-label="View toggle">
            <button
              className={`dpg-btn dpg-btnSmall ${view === "cards" ? "isPrimary" : ""}`}
              onClick={() => setView("cards")}
              type="button"
            >
              Cards
            </button>
            <button
              className={`dpg-btn dpg-btnSmall ${view === "table" ? "isPrimary" : ""}`}
              onClick={() => setView("table")}
              type="button"
            >
              Table
            </button>
          </div>
        </div>
      </header>

      <section className="dpg-controls" aria-label="Filters">
        <div className="dpg-search">
          <label className="dpg-label" htmlFor="dpg-q">
            Search patterns
          </label>
          <input
            id="dpg-q"
            className="dpg-input"
            placeholder="Try: 'microservices', 'middleware', 'Rust', 'state machine'…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="dpg-grid">
          <Filter label="Development type" value={devType} setValue={setDevType} options={devTypeOptions} />
          <Filter label="Pattern type" value={patternType} setValue={setPatternType} options={patternTypeOptions} />
          <Filter label="Paradigm" value={paradigm} setValue={setParadigm} options={paradigmOptions} />
          <Filter label="Language" value={language} setValue={setLanguage} options={languageOptions} />
          <Filter label="Section" value={section} setValue={setSection} options={sectionOptions} />
        </div>

        <div className="dpg-actions">
          <button className="dpg-btn" type="button" onClick={resetFilters}>
            Reset filters
          </button>
          <button className="dpg-btn" type="button" onClick={() => setOpenAll((v) => !v)}>
            {openAll ? "Collapse all" : "Expand all"}
          </button>
          <button className="dpg-btn" type="button" onClick={() => setShowGlossary((v) => !v)}>
            {showGlossary ? "Hide acronym glossary" : "Show acronym glossary"}
          </button>
        </div>
      </section>

      {view === "table" ? (
        <section className="dpg-tableWrap" aria-label="Pattern table">
          <table className="dpg-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Section</th>
                <th>Pattern Type</th>
                <th>Paradigm</th>
                <th>Best Fit Development Types</th>
                <th>Languages</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <tr key={`${item.section}::${item.name}`}>
                    <td className="dpg-tdStrong">
                      <AcronymWrapper acronyms={ACRONYMS}>{item.name}</AcronymWrapper>
                    </td>
                    <td>
                      <AcronymWrapper acronyms={ACRONYMS}>{item.section}</AcronymWrapper>
                    </td>
                    <td>
                      <AcronymWrapper acronyms={ACRONYMS}>{item.patternType}</AcronymWrapper>
                    </td>
                    <td>
                      <AcronymWrapper acronyms={ACRONYMS}>
                        {(item.paradigms || []).join(", ")}
                      </AcronymWrapper>
                    </td>
                    <td>
                      <AcronymWrapper acronyms={ACRONYMS}>
                        {(item.bestFor || []).join(", ")}
                      </AcronymWrapper>
                    </td>
                    <td>
                      <AcronymWrapper acronyms={ACRONYMS}>
                        {(item.languages || []).join(", ")}
                      </AcronymWrapper>
                    </td>
                    <td>
                      <div className="dpg-tableNotes">
                        <AcronymWrapper acronyms={ACRONYMS}>{item.notes}</AcronymWrapper>
                      </div>
                      <div className="dpg-tableDesc">
                        <AcronymWrapper acronyms={ACRONYMS}>{item.description}</AcronymWrapper>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ) : (
        <main className="dpg-main">
          {grouped.map((group) => (
            <details className="dpg-section" key={group.section} open={openAll}>
              <summary className="dpg-summary">
                <span className="dpg-sectionTitle">
                  <AcronymWrapper acronyms={ACRONYMS}>{group.section}</AcronymWrapper>
                </span>
                <span className="dpg-badge">{group.items.length}</span>
              </summary>

              <div className="dpg-cards">
                {group.items.map((item) => (
                  <article className="dpg-card" key={`${group.section}::${item.name}`}>
                    <div className="dpg-cardTop">
                      <h3 className="dpg-cardTitle">
                        <AcronymWrapper acronyms={ACRONYMS}>{item.name}</AcronymWrapper>
                      </h3>
                      <div className="dpg-chipRow">
                        <Chip>{item.patternType}</Chip>
                        {(item.paradigms || []).map((p) => (
                          <Chip key={p}>{p}</Chip>
                        ))}
                      </div>
                    </div>

                    <p className="dpg-notes">
                      <strong className="dpg-oneLiner">
                        <AcronymWrapper acronyms={ACRONYMS}>{item.notes}</AcronymWrapper>
                      </strong>
                    </p>
                    <p className="dpg-desc">
                      <AcronymWrapper acronyms={ACRONYMS}>{item.description}</AcronymWrapper>
                    </p>

                    <div className="dpg-row">
                      <div className="dpg-rowLabel">Best fit</div>
                      <div className="dpg-rowValue">
                        {(item.bestFor || []).map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    </div>

                    <div className="dpg-row">
                      <div className="dpg-rowLabel">Languages</div>
                      <div className="dpg-rowValue">
                        {(item.languages || []).map((l) => (
                          <Chip key={l}>{l}</Chip>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </details>
          ))}

          {shownCount === 0 && (
            <div className="dpg-empty">
              <h3>No matches</h3>
              <p>Try clearing a filter or using a broader search term.</p>
              <button className="dpg-btn" type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}
        </main>
      )}

      <footer className="dpg-footer">
        <span>Tip: In FP codebases, "Strategy" often becomes "pass a function".</span>
      </footer>

      {showGlossary && (
        <details className="dpg-glossary">
          <summary className="dpg-summary dpg-summaryGlossary">
            <span className="dpg-sectionTitle">Acronym glossary</span>
            <span className="dpg-badge">{glossaryFiltered.length}</span>
          </summary>

          <div className="dpg-glossaryBody">
            <div className="dpg-search">
              <label className="dpg-label" htmlFor="dpg-gq">
                Search acronyms
              </label>
              <input
                id="dpg-gq"
                className="dpg-input"
                placeholder="Try: 'CQRS', 'GoF', 'AST', 'ORM'…"
                value={glossaryQuery}
                onChange={(e) => setGlossaryQuery(e.target.value)}
              />
            </div>

            <div className="dpg-glossaryGrid">
              {glossaryFiltered.map((t) => (
                <div key={t.key} className="dpg-glossaryItem">
                  <div className="dpg-glossaryKey">{t.key}</div>
                  <div className="dpg-glossaryExpansion">{t.expansion}</div>
                  <div className="dpg-glossaryExplain">{t.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </details>
      )}
    </div>
  );
}

function Filter({ label, value, setValue, options }) {
  const id = `dpg-${normalize(label).replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className="dpg-filter">
      <label className="dpg-label" htmlFor={id}>
        {label}
      </label>
      <select id={id} className="dpg-select" value={value} onChange={(e) => setValue(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}


