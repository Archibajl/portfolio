// DesignPatternsGuide.jsx
// Drop-in React “quick reference” page with search + filters + expandable sections.
// No external deps. Works in any React app.

import "../styles/DesignPatternsGuide.css";
import React, { useMemo, useState } from "react";

const GUIDE = [
  {
    section: "GoF — Creational (object creation)",
    items: [
      {
        name: "Factory Method",
        bestFor: ["Libraries", "Frameworks", "Extensible backends"],
        patternType: "Creational (GoF)",
        paradigms: ["OOP", "Imperative"],
        languages: ["Java", "C#", "C++", "Kotlin", "Swift", "TypeScript", "Python"],
        notes: "Define an interface for creating objects, but let subclasses decide which class to instantiate.",
      },
      {
        name: "Abstract Factory",
        bestFor: ["Cross-platform SDKs", "UI kits", "Multi-vendor integrations"],
        patternType: "Creational (GoF)",
        paradigms: ["OOP"],
        languages: ["Java", "C#", "C++", "Kotlin", "Swift"],
        notes: "Create families of related objects without specifying their concrete classes.",
      },
      {
        name: "Builder",
        bestFor: ["APIs with many optional params", "Config objects"],
        patternType: "Creational (GoF)",
        paradigms: ["OOP", "Imperative"],
        languages: ["Java", "C#", "Kotlin", "Swift", "TypeScript"],
        notes: "Construct complex objects step-by-step; often paired with fluent APIs.",
      },
      {
        name: "Prototype",
        bestFor: ["Cloning complex objects", "Performance-sensitive creation"],
        patternType: "Creational (GoF)",
        paradigms: ["OOP"],
        languages: ["C++", "Java", "C#", "Python"],
        notes: "Create new objects by copying an existing instance (clone).",
      },
      {
        name: "Singleton (use sparingly)",
        bestFor: ["Shared runtime services (logging/config)", "Embedded/system code"],
        patternType: "Creational (GoF)",
        paradigms: ["OOP", "Imperative"],
        languages: ["Most languages"],
        notes: "One instance globally accessible. Watch for hidden dependencies and test pain.",
      },
    ],
  },
  {
    section: "GoF — Structural (composition & wiring)",
    items: [
      {
        name: "Adapter",
        bestFor: ["Legacy integration", "3rd-party APIs", "SDKs"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP", "Imperative"],
        languages: ["Most languages"],
        notes: "Convert one interface into another clients expect.",
      },
      {
        name: "Facade",
        bestFor: ["Simplifying complex subsystems", "Service clients"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP", "Imperative"],
        languages: ["Most languages"],
        notes: "Provide a unified, simpler API over a subsystem.",
      },
      {
        name: "Decorator",
        bestFor: ["Middleware", "I/O streams", "HTTP pipelines"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP", "Functional-ish"],
        languages: ["Java", "C#", "Python", "TypeScript", "Kotlin"],
        notes: "Wrap objects to add behavior without changing the original class.",
      },
      {
        name: "Composite",
        bestFor: ["UI trees", "File systems", "ASTs"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP"],
        languages: ["Most languages"],
        notes: "Treat individual objects and compositions uniformly (tree structure).",
      },
      {
        name: "Proxy",
        bestFor: ["RPC clients", "Lazy loading", "Access control"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP"],
        languages: ["Java", "C#", "Python", "TypeScript"],
        notes: "Stand-in object that controls access to a real object.",
      },
      {
        name: "Bridge",
        bestFor: ["Separating abstraction/implementation", "Platforms/drivers"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP"],
        languages: ["C++", "Java", "C#"],
        notes: "Decouple abstraction from implementation so both can vary independently.",
      },
      {
        name: "Flyweight",
        bestFor: ["Memory optimization (glyphs/game objects)", "Caching"],
        patternType: "Structural (GoF)",
        paradigms: ["OOP", "Imperative"],
        languages: ["C++", "Java", "C#", "Rust"],
        notes: "Share common state between many fine-grained objects to reduce memory.",
      },
    ],
  },
  {
    section: "GoF — Behavioral (control flow & interaction)",
    items: [
      {
        name: "Strategy",
        bestFor: ["Pluggable algorithms (pricing/routing/ranking)"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP", "Functional"],
        languages: ["Most languages"],
        notes: "Swap algorithms at runtime; in FP often just pass functions.",
      },
      {
        name: "Observer / Pub-Sub",
        bestFor: ["UI events", "Reactive systems", "Domain events"],
        patternType: "Behavioral (GoF-ish)",
        paradigms: ["OOP", "Reactive", "Functional"],
        languages: ["TypeScript/JS", "Java", "C#", "Swift", "Kotlin"],
        notes: "Notify dependents when state changes; often via event emitters/streams.",
      },
      {
        name: "Command",
        bestFor: ["Undo/redo", "Job queues", "Handler-based apps"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP", "Functional"],
        languages: ["Most languages"],
        notes: "Encapsulate requests as objects (or closures) to queue/log/undo.",
      },
      {
        name: "State",
        bestFor: ["Workflow engines", "UI state machines", "Protocol states"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP", "Functional"],
        languages: ["Most languages"],
        notes: "Change behavior when internal state changes; often a state machine.",
      },
      {
        name: "Template Method",
        bestFor: ["Framework hooks", "Consistent pipelines"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP"],
        languages: ["Java", "C#", "C++"],
        notes: "Define the skeleton of an algorithm, letting subclasses override steps.",
      },
      {
        name: "Chain of Responsibility",
        bestFor: ["Web middleware", "Validation pipelines", "Logging"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP", "Functional"],
        languages: ["TypeScript/JS", "Java", "C#", "Python"],
        notes: "Pass a request through a chain of handlers until one handles it.",
      },
      {
        name: "Mediator",
        bestFor: ["Complex UI coordination", "Message hubs"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP"],
        languages: ["Java", "C#", "TypeScript"],
        notes: "Central object coordinates interactions to reduce direct coupling.",
      },
      {
        name: "Visitor",
        bestFor: ["Compilers", "AST transforms", "Static analysis"],
        patternType: "Behavioral (GoF)",
        paradigms: ["OOP"],
        languages: ["Java", "C++", "C#", "Scala"],
        notes: "Separate operations from object structure (great for ASTs; can be verbose).",
      },
      {
        name: "Iterator",
        bestFor: ["Collection traversal abstractions"],
        patternType: "Behavioral (GoF)",
        paradigms: ["Any"],
        languages: ["Most languages"],
        notes: "Standardize traversal without exposing underlying representation.",
      },
    ],
  },
  {
    section: "Architectural (system-level shape)",
    items: [
      {
        name: "Layered (N-tier)",
        bestFor: ["Enterprise backends", "CRUD apps"],
        patternType: "Architectural",
        paradigms: ["OOP", "Imperative"],
        languages: ["Java", "C#", "Python", "Ruby", "PHP"],
        notes: "Separate concerns into layers (UI, domain, data, etc.).",
      },
      {
        name: "Hexagonal (Ports & Adapters)",
        bestFor: ["Testable services", "Clean boundaries"],
        patternType: "Architectural",
        paradigms: ["Any (OOP + Functional friendly)"],
        languages: ["Most languages"],
        notes: "Domain core with adapters at the edges (DB, web, queues).",
      },
      {
        name: "Clean Architecture",
        bestFor: ["Long-lived products", "Large teams"],
        patternType: "Architectural",
        paradigms: ["Any"],
        languages: ["Most languages"],
        notes: "Dependency rule: outer layers depend on inner; isolate business rules.",
      },
      {
        name: "Microservices",
        bestFor: ["Large distributed systems", "Org scaling"],
        patternType: "Architectural",
        paradigms: ["Any"],
        languages: ["Any (Go/Java/C#/Node/Rust common)"],
        notes: "Independent deployable services; adds ops + distributed complexity.",
      },
      {
        name: "Event-Driven Architecture",
        bestFor: ["Streaming", "Async workflows", "Integrations"],
        patternType: "Architectural",
        paradigms: ["Reactive", "Imperative", "Functional"],
        languages: ["Java", "Kotlin", "C#", "Go", "TypeScript/JS", "Scala"],
        notes: "Systems communicate via events; great for decoupling and async workflows.",
      },
      {
        name: "CQRS",
        bestFor: ["Complex domains", "Auditability", "Read scaling"],
        patternType: "Architectural",
        paradigms: ["Any"],
        languages: ["Most languages"],
        notes: "Separate read models from write commands; often paired with events.",
      },
      {
        name: "Event Sourcing",
        bestFor: ["Audit trails", "Temporal queries"],
        patternType: "Architectural",
        paradigms: ["Any (often FP-friendly)"],
        languages: ["JVM", ".NET", "Scala", "Elixir"],
        notes: "Persist state changes as an append-only event log; rebuild state from events.",
      },
      {
        name: "Modular Monolith",
        bestFor: ["Early-stage products", "Simpler ops"],
        patternType: "Architectural",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Single deployable with strong internal module boundaries.",
      },
      {
        name: "SOA (Service-Oriented Architecture)",
        bestFor: ["Enterprise integrations"],
        patternType: "Architectural",
        paradigms: ["Any"],
        languages: ["Java", "C#", "Others"],
        notes: "Enterprise service integration style; overlaps with microservices but usually heavier governance.",
      },
    ],
  },
  {
    section: "Distributed systems & resiliency",
    items: [
      {
        name: "Circuit Breaker",
        bestFor: ["Microservices", "Unreliable dependencies"],
        patternType: "Resiliency",
        paradigms: ["Any"],
        languages: ["Java/Kotlin", "C#", "Go", "TypeScript/JS"],
        notes: "Stop calling failing dependencies to prevent cascading failures.",
      },
      {
        name: "Retry + Backoff + Jitter",
        bestFor: ["Network calls", "Transient failures"],
        patternType: "Resiliency",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Retries with exponential backoff and jitter reduce thundering herds.",
      },
      {
        name: "Bulkhead",
        bestFor: ["Prevent cascading failures"],
        patternType: "Resiliency",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Isolate resources (thread pools/queues) so one failure doesn’t sink the whole system.",
      },
      {
        name: "Rate Limiting (Token Bucket / Leaky Bucket)",
        bestFor: ["Public APIs", "Abuse prevention"],
        patternType: "Resiliency",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Control request rates and protect downstream systems.",
      },
      {
        name: "Idempotency Keys",
        bestFor: ["Payments", "Webhooks", "Retries"],
        patternType: "Integration",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Make repeated requests safe by deduplicating on an idempotency key.",
      },
      {
        name: "Saga",
        bestFor: ["Distributed transactions"],
        patternType: "Distributed workflow",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Coordinate multi-step distributed operations with compensating actions.",
      },
      {
        name: "Outbox Pattern",
        bestFor: ["Reliable event publishing with a DB"],
        patternType: "Integration",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Write domain changes + outbound events in the same DB transaction, then publish asynchronously.",
      },
      {
        name: "Strangler Fig",
        bestFor: ["Legacy modernization"],
        patternType: "Migration",
        paradigms: ["Any"],
        languages: ["Any"],
        notes: "Gradually replace legacy functionality by routing traffic to new components over time.",
      },
    ],
  },
  {
    section: "Concurrency & async",
    items: [
      {
        name: "Producer–Consumer / Queue",
        bestFor: ["Pipelines", "Ingestion", "Background work"],
        patternType: "Concurrency",
        paradigms: ["Imperative", "OOP"],
        languages: ["Java", "C#", "Go", "Python", "Rust"],
        notes: "Decouple producers from consumers using queues.",
      },
      {
        name: "Thread Pool / Worker Pool",
        bestFor: ["Servers", "Batch processing"],
        patternType: "Concurrency",
        paradigms: ["Imperative"],
        languages: ["Java", "C#", "Go", "Rust", "C++"],
        notes: "Reuse a pool of workers to process tasks efficiently.",
      },
      {
        name: "Futures/Promises",
        bestFor: ["Async IO", "Web clients"],
        patternType: "Concurrency",
        paradigms: ["Reactive", "Imperative"],
        languages: ["TypeScript/JS", "Java", "C#", "Python"],
        notes: "Represent results that complete later; compose async operations.",
      },
      {
        name: "Actor Model",
        bestFor: ["Highly concurrent services", "Fault isolation"],
        patternType: "Concurrency model",
        paradigms: ["Reactive", "Functional-ish"],
        languages: ["Erlang", "Elixir", "Scala (Akka)", "JVM actors"],
        notes: "State is owned by actors; communicate via messages; great for isolation.",
      },
      {
        name: "CSP (channels)",
        bestFor: ["Go-style pipelines", "Structured concurrency"],
        patternType: "Concurrency model",
        paradigms: ["Imperative", "Functional-ish"],
        languages: ["Go", "Rust (tokio)", "Kotlin (channels)"],
        notes: "Communicate via channels; avoid shared-memory pitfalls.",
      },
      {
        name: "Reactor / Event Loop",
        bestFor: ["Network servers", "UI runtimes"],
        patternType: "Concurrency",
        paradigms: ["Imperative", "Reactive"],
        languages: ["Node.js", "Java (Netty)", "Python (asyncio)"],
        notes: "Single-threaded (or few) event loop dispatching callbacks/awaits.",
      },
    ],
  },
  {
    section: "Data access & enterprise app patterns",
    items: [
      {
        name: "Repository",
        bestFor: ["Domain-driven backends", "Testability"],
        patternType: "Data access",
        paradigms: ["Any"],
        languages: ["Java", "C#", "TypeScript", "Python"],
        notes: "Collection-like interface over persistence; helps isolate domain logic from DB concerns.",
      },
      {
        name: "Unit of Work",
        bestFor: ["Transaction boundaries"],
        patternType: "Data access",
        paradigms: ["OOP"],
        languages: ["Java", "C#", "Python"],
        notes: "Track changes to objects and commit them as a single transaction.",
      },
      {
        name: "Active Record",
        bestFor: ["Rapid CRUD apps"],
        patternType: "Data access",
        paradigms: ["OOP"],
        languages: ["Ruby (Rails)", "PHP (Laravel)", "Many ORMs"],
        notes: "Domain objects carry persistence logic (simple; can get messy in complex domains).",
      },
      {
        name: "Data Mapper",
        bestFor: ["Complex domains", "Persistence separation"],
        patternType: "Data access",
        paradigms: ["OOP"],
        languages: ["Java (Hibernate)", "C# (EF)", "Python (SQLAlchemy)"],
        notes: "Keep domain model pure; mapping layer handles persistence.",
      },
      {
        name: "DAO",
        bestFor: ["Legacy enterprise apps"],
        patternType: "Data access",
        paradigms: ["OOP"],
        languages: ["Java", "C#"],
        notes: "Encapsulate DB access behind dedicated objects (classic enterprise style).",
      },
      {
        name: "Specification",
        bestFor: ["Complex query rules"],
        patternType: "Domain/data",
        paradigms: ["OOP", "Functional-friendly"],
        languages: ["Java", "C#", "TypeScript"],
        notes: "Compose business rules/queries as reusable specifications.",
      },
    ],
  },
  {
    section: "UI / frontend state & presentation",
    items: [
      {
        name: "MVC",
        bestFor: ["Server-rendered web", "Classic apps"],
        patternType: "UI architecture",
        paradigms: ["OOP"],
        languages: ["Many (Spring MVC, etc.)"],
        notes: "Separate model, view, controller; classic web architecture.",
      },
      {
        name: "MVP",
        bestFor: ["Testable UI logic"],
        patternType: "UI architecture",
        paradigms: ["OOP"],
        languages: ["Android (Java/Kotlin)", ".NET"],
        notes: "Presenter handles view logic; helps isolate UI from business logic.",
      },
      {
        name: "MVVM",
        bestFor: ["Data-binding UIs"],
        patternType: "UI architecture",
        paradigms: ["OOP", "Reactive"],
        languages: ["C# (WPF)", "Swift", "Kotlin", "JS frameworks"],
        notes: "ViewModel exposes observable state; great for binding-heavy UIs.",
      },
      {
        name: "Flux / Redux",
        bestFor: ["Complex UI state"],
        patternType: "UI state management",
        paradigms: ["Functional-ish"],
        languages: ["TypeScript/JavaScript"],
        notes: "Unidirectional data flow; explicit actions/reducers make state predictable.",
      },
      {
        name: "Component + Unidirectional Data Flow",
        bestFor: ["Modern web UIs"],
        patternType: "UI architecture",
        paradigms: ["Functional-ish"],
        languages: ["React (JS/TS)", "Elm-ish"],
        notes: "Compose UI from components; keep data flow predictable and traceable.",
      },
    ],
  },
  {
    section: "Functional / FP-native patterns",
    items: [
      {
        name: "Pipelines / Composition",
        bestFor: ["Data processing", "Business rules"],
        patternType: "FP design",
        paradigms: ["Functional"],
        languages: ["Haskell", "F#", "Scala", "Clojure", "TypeScript/JS", "Python"],
        notes: "Build behavior by composing small pure functions.",
      },
      {
        name: "ADTs + Pattern Matching",
        bestFor: ["Domain modeling", "State machines"],
        patternType: "FP design",
        paradigms: ["Functional"],
        languages: ["Haskell", "OCaml", "F#", "Scala", "Rust", "Swift"],
        notes: "Model closed sets of states explicitly; match exhaustively (fewer bugs).",
      },
      {
        name: "Functor / Applicative / Monad",
        bestFor: ["Effects", "Async", "Optionality"],
        patternType: "FP design",
        paradigms: ["Functional"],
        languages: ["Haskell", "Scala", "F#", "Rust (some)", "JS (libs)"],
        notes: "Reusable abstractions for sequencing computations with context (maybe/async/either).",
      },
      {
        name: "Lenses",
        bestFor: ["Nested immutable updates"],
        patternType: "FP design",
        paradigms: ["Functional"],
        languages: ["Haskell", "Scala", "Clojure", "JS (libs)"],
        notes: "Composable getters/setters for deeply nested immutable structures.",
      },
      {
        name: "Immutability + Persistent Data Structures",
        bestFor: ["Concurrency-safe state"],
        patternType: "FP design",
        paradigms: ["Functional"],
        languages: ["Clojure", "Scala", "F#", "JS (libs)"],
        notes: "Prefer immutable state; use structural sharing for performance.",
      },
    ],
  },
];

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
  const allItems = useMemo(() => GUIDE.flatMap((s) => s.items.map((it) => ({ ...it, section: s.section }))), []);

  const devTypeOptions = useMemo(() => {
    const vals = allItems.flatMap((i) => i.bestFor || []);
    return ["(any)", ...uniq(vals)];
  }, [allItems]);

  const paradigmOptions = useMemo(() => {
    const vals = allItems.flatMap((i) => i.paradigms || []);
    return ["(any)", ...uniq(vals)];
  }, [allItems]);

  const patternTypeOptions = useMemo(() => {
    const vals = allItems.map((i) => i.patternType).filter(Boolean);
    return ["(any)", ...uniq(vals)];
  }, [allItems]);

  const languageOptions = useMemo(() => {
    const vals = allItems.flatMap((i) => i.languages || []);
    return ["(any)", ...uniq(vals)];
  }, [allItems]);

  const sectionOptions = useMemo(() => ["(any)", ...uniq(GUIDE.map((s) => s.section))], []);

  const [query, setQuery] = useState("");
  const [devType, setDevType] = useState("(any)");
  const [paradigm, setParadigm] = useState("(any)");
  const [patternType, setPatternType] = useState("(any)");
  const [language, setLanguage] = useState("(any)");
  const [section, setSection] = useState("(any)");
  const [view, setView] = useState("cards"); // "cards" | "table"
  const [openAll, setOpenAll] = useState(false);

  const filtered = useMemo(() => {
    const q = normalize(query);

    return allItems.filter((item) => {
      // Text search over name + notes + tags
      const blob = [
        item.name,
        item.notes,
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
    // preserve original GUIDE order
    const out = GUIDE.map((s) => ({
      section: s.section,
      items: (map.get(s.section) || []).sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((g) => g.items.length > 0);
    return out;
  }, [filtered]);

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
            Filter by development type, pattern category, paradigm, and language. Use this as a fast “what fits here?”
            guide.
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
            Search
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
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <tr key={`${item.section}::${item.name}`}>
                    <td className="dpg-tdStrong">{item.name}</td>
                    <td>{item.section}</td>
                    <td>{item.patternType}</td>
                    <td>{(item.paradigms || []).join(", ")}</td>
                    <td>{(item.bestFor || []).join(", ")}</td>
                    <td>{(item.languages || []).join(", ")}</td>
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
                <span className="dpg-sectionTitle">{group.section}</span>
                <span className="dpg-badge">{group.items.length}</span>
              </summary>

              <div className="dpg-cards">
                {group.items.map((item) => (
                  <article className="dpg-card" key={`${group.section}::${item.name}`}>
                    <div className="dpg-cardTop">
                      <h3 className="dpg-cardTitle">{item.name}</h3>
                      <div className="dpg-chipRow">
                        <Chip>{item.patternType}</Chip>
                        {(item.paradigms || []).map((p) => (
                          <Chip key={p}>{p}</Chip>
                        ))}
                      </div>
                    </div>

                    <p className="dpg-notes">{item.notes}</p>

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
        <span>Tip: “Strategy” often becomes “pass a function” in functional codebases.</span>
      </footer>
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
