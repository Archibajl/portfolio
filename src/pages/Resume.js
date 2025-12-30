import "../styles/Resume.css";

const CONTACT = {
  name: "Justin Archibald",
  headline: "Software Engineer | AI/ML | Data Science | Operations / Deployment",
  location: "Tokyo, Japan (open to relocate) • Colorado",
  email: "archibajl@gmail.com",
  phone: "(719) 661-8380",
  links: [{ label: "GitHub", href: "https://github.com/Archibajl" }],
};

const SUMMARY =
  "Software engineer with experience in full-stack development, data/ML tooling, and mission-critical operations. Skilled in Java/Spring Boot, JavaScript/React, Python/SQL, CI/CD, and Linux. Background includes Agile/Scrum leadership and operational leadership roles (crew chief / shift lead / crash recovery sergeant).";

const SKILLS = {
  "Programming Languages": [
    "Python",
    "Java",
    "JavaScript / TypeScript",
    "C#",
    "C++",
    "SQL",
    "Bash / Shell",
    "Rust (working knowledge)",
    "GO (functional knowledge)"
  ],

  "Frameworks": [
    "Spring Boot/ LAMP stack",
    "React & Node.js / MERN stack",
    "Express.js",
    ".NET & C#",
    "Python Django & pyQt"
  ],

  "Libraries": [
    "TensorFlow",
    "PyTorch (some experience)",
    "scikit-learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Bootstrap"
  ],

  "AI / Machine Learning": [
    "Artificial Neural Networks (ANN)",
    "Convolutional Neural Networks (CNN)",
    "Long Short-Term Memory (LSTM)",
    "Time-series forecasting",
    "Basic NLP & sentiment analysis & word2vec",
    "Model training & evaluation",
    "Data preprocessing & feature engineering"
  ],

  "Web & API Technologies": [
    "REST API design",
    "SOAP APIs",
    "AJAX",
    "JSON",
    "HTML5",
    "CSS3",
    "Express-based routing"
  ],

  "DevOps & Systems": [
    "Git",
    "CI/CD pipelines",
    "Docker",
    "Linux (Ubuntu / Debian)",
    "WSL",
    "Build tools (Maven, npm)",
    "Basic distributed systems concepts"
  ],

  "Databases": [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Apache Cassandra (basic)",
    "SQLite"
  ],

  "Software Engineering Practices": [
    "Agile / Scrum (Jira)",
    "Design patterns",
    "Debugging & profiling",
    "Unit & integration testing",
    "Version control workflows"
  ],

  "Networking & Security": [
    "TCP/IP",
    "UDP",
    "http/https",
    "DNS",
    "Security fundamentals (CompTIA Security+)"
  ]
};



const EXPERIENCE = [
  {
    role: "Full Stack Software Engineer",
    org: "Lockheed Martin",
    where: "Colorado Springs, CO",
    when: "Apr 2022 – Present",
    bullets: [
      "Produced, tested, and deployed enterprise software using Java, Spring Boot, and JavaScript frameworks in mission-critical environments.",
      "Worked from design documents and user requirements to deliver production features and system improvements.",
      "Used Git, remote repos, and build/automation tooling to support collaboration and deployments.",
      "Served as Scrum Master; improved CI/CD deployment efficiency by ~10% (as reported).",
    ],
  },
  {
    role: "Full Stack Developer",
    org: "Freelance",
    where: "Remote",
    when: "May 2021 – Apr 2022",
    bullets: [
      "Developed, debugged, and updated software across multiple stacks and client needs.",
      "Built REST APIs and database-backed functionality to support data-driven workflows.",
    ],
  },
  {
    role: "Crew Chief • Shift Lead • Crash Recovery Team Lead",
    org: "United States Air Force",
    where: "2008 – 2015",
    when: "2008 – 2015",
    bullets: [
      "Led teams in high-pressure operational environments; responsible for safety, readiness, and execution timelines.",
      "Coordinated crash recovery operations requiring rapid assessment, clear communication, and decisive leadership.",
      "Trained and mentored junior personnel; maintained consistent execution across shifts.",
    ],
    details: [
      "Aircraft maintenance (A/R): flight control, landing gear, canopy systems; rigging and close-tolerance component replacement.",
      "CDDAR crash recovery: recovered 16 aircraft; responded to 74+ emergency calls (as reported).",
      "Forms expert: 6+ years aircraft forms; CAMS/IMDS experience.",
      "7-level / Red X qualified; airframe general SME experience (as reported).",
      "Support section: managed airfield driving program, precision/diagnostic equipment programs, hazardous materials storage/transport/procurement/disposal; dangerous goods certifier (ADR-qualified in 2014).",
    ],
  },
];

const OTHER_ROLES = [
  { title: "USPS – Casual Clerk", details: "Mail processing and sorting; machine-sorted 5,000+ letters/day (as reported)." },
  { title: "Package Handler", details: "Sorted and shipped 100+ packages/day (as reported)." },
  { title: "Lift Operator", details: "Operated chair lift equipment; responsible for safe transport of riders (as reported)." },
];

const PROJECTS = [
  {
    name: "Stock tracker ANN (TensorFlow/Keras)",
    desc: "Estimates stock prices using market data and sentiment analysis (LSTM/ANN work).",
    link: "https://github.com/Archibajl/PythonProgramming_StockTracker",
  },
  { name: "ANN Experiments", desc: "Neural network experiments in Python.", link: "https://github.com/Archibajl/ANN" },
  {
    name: "C# Projects (Enigma Encoder, Sudoku Solver, etc.)",
    desc: "Windows Forms/.NET projects demonstrating OOP and threading.",
    link: "https://github.com/Archibajl/C_Sharp_Projects",
  },
  { name: "Misc Projects", desc: "Small web/API projects and experiments.", link: "https://github.com/Archibajl/Misc" },
];

const AGENTIC_EXPERIENCE = [
  "Designed and implemented multi-agent AI workflows to automate software engineering tasks across large and legacy codebases.",
  "Built agent pipelines where specialized agents perform code comprehension, refactoring, feature expansion, test generation, and validation.",
  "Applied planner–executor–reviewer agent patterns to decompose open-ended engineering problems into verifiable subtasks.",
  "Integrated agentic workflows with Python tooling, Git, and CI/CD pipelines to support test-aware, iterative code modification.",
  "Used quantitative metrics such as mutation testing results, test pass rates, execution time, and lines-of-code changes to evaluate agent effectiveness.",
  "Contributed documentation and onboarding material to open-source LLM and agent-based projects to support reproducibility and collaboration."
];


const EDUCATION = [
  { degree: "B.S. Computer Science", school: "University of Colorado, Colorado Springs (UCCS)", date: "Jan 2021" },
  { degree: "A.S. Science", school: "Pikes Peak Community College (PPCC)", date: "Jan 2018" },
];

const CERTIFICATIONS = [
  { name: "CompTIA Security+", date: "Jul 2024" },
  { name: "IBM Data Science Professional Certificate (Coursera)", date: "Dec 2023" },
  { name: "Google Cybersecurity Professional Certificate", date: "Aug 2023" },
];

const INTERESTS = [
  "Machine learning & computer vision",
  "Statistics & engineering",
  "Science, mathematics, & philosophy",
  "Investing & trading",
  "Networking & web development",
];

function Section({ title, children }) {
  return (
    <section className="resume-section">
      <h2 className="head-text">{title}</h2>
      {children}
    </section>
  );
}

function Dropdown({ title, defaultOpen = false, children }) {
  return (
    <details className="resume-dropdown" open={defaultOpen}>
      <summary className="resume-dropdown-summary">{title}</summary>
      <div className="resume-dropdown-content">{children}</div>
    </details>
  );
}

export default function Resume() {
  return (
    <div className="resume-tab">
      <header className="hr" />

      <main className="resume-page">
        <h1>Resume</h1>

        <div className="resume-header">
          <h2>{CONTACT.name}</h2>
          <p>
            <strong>{CONTACT.headline}</strong>
          </p>
          <p>{CONTACT.location}</p>
          <p>
            {CONTACT.email} • {CONTACT.phone} •{" "}
            {CONTACT.links.map((l, i) => (
              <span key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
                {i < CONTACT.links.length - 1 ? " • " : ""}
              </span>
            ))}
          </p>
        </div>

        <Section title="Summary">
          <p>{SUMMARY}</p>
        </Section>

        <Section title="Technical Skills">
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([k, vals]) => (
              <p className="skills-group" key={k}>
                <strong>{k}:</strong> {vals.join(", ")}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          {EXPERIENCE.map((job) => (
            <div className="job" key={`${job.org}-${job.role}`}>
              <h3>{job.role}</h3>
              <p>
                <strong>{job.org}</strong> • {job.where} • {job.when}
              </p>

              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {job.details?.length ? (
                <Dropdown title="Additional details (aircraft maintenance / certifications)" defaultOpen={false}>
                  <ul>
                    {job.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </Dropdown>
              ) : null}
            </div>
          ))}

          <Dropdown title="Other prior roles (optional)" defaultOpen={false}>
            <ul>
              {OTHER_ROLES.map((r) => (
                <li key={r.title}>
                  <strong>{r.title}:</strong> {r.details}
                </li>
              ))}
            </ul>
          </Dropdown>
        </Section>

        <Section title="Multi-Agent Systems & Agentic AI">
          <ul>
            {AGENTIC_EXPERIENCE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Projects">
          <ul>
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <strong>{p.name}:</strong> {p.desc}{" "}
                <a href={p.link} target="_blank" rel="noreferrer">
                  Repo
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul>
            {EDUCATION.map((e) => (
              <li key={`${e.school}-${e.degree}`}>
                <strong>{e.degree}</strong> — {e.school} ({e.date})
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Certifications">
          <ul>
            {CERTIFICATIONS.map((c) => (
              <li key={c.name}>
                {c.name} ({c.date})
              </li>
            ))}
          </ul>
        </Section>

        <Dropdown title="Interests " defaultOpen={false}>
          <p>{INTERESTS.join(" • ")}</p>
        </Dropdown>
      </main>

      <footer className="fr" />
    </div>
  );
}
