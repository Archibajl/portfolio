import "./Projects.css";

const PROJECTS = [
  {
    title: "Ray Tracer & Rendering Systems",
    link: "https://github.com/Archibajl/RayTracer",
    tags: ["Computer Graphics", "Ray Tracing", "C++", "Algorithms"],
    description:
      "Implemented ray tracing components including ray–triangle intersection (Möller–Trumbore), voxel-based spatial acceleration, and shading models such as Lambertian diffuse reflection. Focused on performance, numerical robustness, and correctness.",
  },
  {
    title: "Active Interview Application",
    link: "https://github.com/UCCS-CS4300-5300/Fall-25-CS-5300", //course repo
    tags: ["Full Stack", "Python", "Web Apps", "Testing"],
    description:
      "Developed and extended a full-stack interview preparation application, adding new features, improving test coverage, and repairing previously broken functionality. Emphasized maintainability, backend logic correctness, and CI-aware development.",
  },
  {
    title: "Stock Price Prediction – LSTM Neural Network",
    link: "https://github.com/Archibajl/PythonProgramming_StockTracker",
    tags: ["Python", "TensorFlow", "Keras", "LSTM", "Sentiment Analysis"],
    description:
      "Deep learning project using TensorFlow/Keras to predict stock prices from historical market data and sentiment signals. Implements a multi-layer LSTM network combined with a linear model for sentiment-based feature integration.",
  },
  {
    title: "Tokio – Asynchronous Runtime for Rust",
    link: "https://github.com/tokio-rs/tokio",
    tags: ["Rust", "Asynchronous Systems", "Concurrency", "Distributed Systems"],
    description:
      "Studied and contributed to the Tokio asynchronous runtime ecosystem, focusing on understanding async execution models, task scheduling, and concurrency primitives in Rust. Work involved exploring real-world async system design patterns and evaluating performance and correctness considerations in high-concurrency environments.",
  },
  {
    title: "Open Assistant – Open Source LLM Project",
    link: "https://github.com/LAION-AI/Open-Assistant",
    tags: ["LLMs", "Open Source", "Documentation", "Agentic AI"],
    description:
      "Contributed to the Open Assistant open-source LLM project by producing technical documentation and onboarding material. Helped clarify system design, workflows, and contributor processes to support scalable collaboration and reproducibility.",
  },
  {
    title: "Personal Portfolio & CV Website",
    link: "https://github.com/Archibajl/portfolio", // adjust if repo name differs
    tags: ["React", "JavaScript", "CSS", "Web Architecture"],
    description:
      "Designed and implemented a personal portfolio website using React to present projects, a detailed CV, and technical experience. The site emphasizes clean component structure, reusable layouts, and readability over complex background styling, with custom pages for projects, resume/CV, and featured work.",
  },
  {
    title: "Artificial Neural Network Experiments",
    link: "https://github.com/Archibajl/ANN",
    tags: ["Python", "TensorFlow", "Keras", "scikit-learn"],
    description:
      "Collection of neural network experiments including ANN, CNN, and LSTM architectures. Focused on model training, evaluation, and data preprocessing for coursework and experimentation.",
  },
  {
    title: "C# Projects – Enigma, Sudoku Solver, Threaded Systems",
    link: "https://github.com/Archibajl/C_Sharp_Projects",
    tags: ["C#", ".NET", "Multithreading", "TCP/IP", "Windows Forms"],
    description:
      "Set of C# applications including an Enigma machine encoder/decoder, a Sudoku game with built-in solver, and a multiplayer Tic-Tac-Toe game using TCP/IP networking and multithreading.",
  },
  {
    title: "Miscellaneous Projects",
    link: "https://github.com/Archibajl/Misc",
    tags: ["JavaScript", "APIs", "Web Development"],
    description:
      "Small web and utility projects including a weather application, JavaScript utilities, and API-driven demos.",
  },
];

function Projects() {
  return (
    <div className="projects">
      <main className="projects-page">
        <div className="projects-header">
          <h1>Projects</h1>
          <p>Selected software, ML, systems, and open-source work</p>
        </div>
        <h2>Featured Projects & Contributions</h2>

        {PROJECTS.map((proj) => (
          <section className="project-card" key={proj.title}>
            <h2>
              <a href={proj.link} target="_blank" rel="noreferrer">
                {proj.title}
              </a>
            </h2>

            <p className="project-tags">
              {proj.tags.join(" • ")}
            </p>

            <p className="project-description">{proj.description}</p>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Projects;
