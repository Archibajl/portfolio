import "../styles/ReactPgs.css";

const SIDE_PROJECTS = [
  {
    title: "Real-Time Collaborative Code Editor",
    link: "https://github.com/Archibajl/collaborative-editor",
    tags: ["React", "WebSockets", "Node.js", "Operational Transforms"],
    description:
      "A web-based collaborative code editor supporting multiple users editing the same file in real-time. Uses operational transforms for conflict resolution and WebSocket connections for low-latency synchronization.",
    status: "In Progress"
  },
  {
    title: "Terminal-Based Task Manager",
    link: "https://github.com/Archibajl/terminal-tasks",
    tags: ["Rust", "CLI", "TUI", "Async"],
    description:
      "A terminal user interface (TUI) application for managing tasks and todos with keyboard shortcuts, priority levels, and deadline tracking. Built with Rust for performance and safety.",
    status: "Planning"
  },
  {
    title: "Markdown Blog Generator",
    link: "https://github.com/Archibajl/static-blog",
    tags: ["Python", "Static Site", "Markdown", "Jinja2"],
    description:
      "A static site generator that converts markdown files into a fully-styled blog with syntax highlighting, tags, search functionality, and RSS feeds. Focuses on simplicity and speed.",
    status: "Completed"
  },
  {
    title: "GitHub Activity Visualizer",
    link: "https://github.com/Archibajl/gh-viz",
    tags: ["JavaScript", "D3.js", "GitHub API", "Data Visualization"],
    description:
      "Interactive visualization of GitHub activity patterns including commit history, language usage, and contribution graphs. Uses D3.js for dynamic charts and the GitHub API for data fetching.",
    status: "In Progress"
  },
  {
    title: "Smart Home Dashboard",
    link: "https://github.com/Archibajl/home-dashboard",
    tags: ["React", "IoT", "MQTT", "Raspberry Pi"],
    description:
      "Web dashboard for monitoring and controlling IoT devices in a home automation setup. Integrates with various sensors and actuators via MQTT protocol, with a clean responsive UI.",
    status: "Planning"
  },
  {
    title: "Algorithm Visualizer",
    link: "https://github.com/Archibajl/algo-viz",
    tags: ["TypeScript", "Canvas API", "Algorithms", "Education"],
    description:
      "Interactive tool for visualizing sorting algorithms, graph traversals, and pathfinding algorithms. Allows speed control, step-through execution, and comparison of different approaches.",
    status: "In Progress"
  },
];

function ReactPgs() {
  return (
    <div className="react-projects">
      <main className="react-projects-page">
        <div className="react-projects-header">
          <h1>Side Projects & Experiments</h1>
          <p>Personal projects, experiments, and learning explorations</p>
        </div>

        {SIDE_PROJECTS.map((proj) => (
          <section className="side-project-card" key={proj.title}>
            <div className="project-header-row">
              <h2>
                <a href={proj.link} target="_blank" rel="noreferrer">
                  {proj.title}
                </a>
              </h2>
              <span className={`project-status status-${proj.status.toLowerCase().replace(" ", "-")}`}>
                {proj.status}
              </span>
            </div>

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

export default ReactPgs;
