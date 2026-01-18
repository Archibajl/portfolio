/**
 * Chat Route Implementation
 *
 * Handles AI chat functionality via Ollama.
 */

const express = require('express');

// Ollama Configuration
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

// Bio context for AI chat
const bioContext = {
  personal: {
    name: "Justin Archibald",
    headline: "Software Engineer | AI/ML | Data Science | Operations / Deployment",
    location: "Tokyo, Japan (open to relocate) • Colorado",
    email: "archibajl@gmail.com",
    github: "https://github.com/Archibajl",
  },
  summary: "Software engineer with experience in full-stack development, data/ML tooling, and mission-critical operations. Skilled in Java/Spring Boot, JavaScript/React, Python/SQL, CI/CD, and Linux. Background includes Agile/Scrum leadership and operational leadership roles (crew chief / shift lead / crash recovery sergeant). Before transitioning into software, Justin served in the U.S. Air Force as an aircraft maintainer, including roles in crash recovery and shift leadership.",
  seekingRoles: ["Software Engineering", "Machine Learning / Data", "Backend / Systems Development"],
  skills: {
    programmingLanguages: ["Python", "Java", "JavaScript / TypeScript", "C#", "C++", "SQL", "Bash / Shell", "Rust (working knowledge)", "GO (functional knowledge)"],
    frameworks: ["Spring Boot / LAMP stack", "React & Node.js / MERN stack", "Express.js", ".NET & C#", "Python Django & pyQt"],
    libraries: ["TensorFlow", "PyTorch (some experience)", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Bootstrap"],
    aiMachineLearning: ["Artificial Neural Networks (ANN)", "Convolutional Neural Networks (CNN)", "Long Short-Term Memory (LSTM)", "Time-series forecasting", "Basic NLP & sentiment analysis & word2vec", "Model training & evaluation", "Data preprocessing & feature engineering"],
    webApiTechnologies: ["REST API design", "SOAP APIs", "AJAX", "JSON", "HTML5", "CSS3", "Express-based routing"],
    devOpsSystems: ["Git", "CI/CD pipelines", "Docker", "Linux (Ubuntu / Debian)", "WSL", "Build tools (Maven, npm)", "Basic distributed systems concepts"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Apache Cassandra (basic)", "SQLite"],
    softwareEngineeringPractices: ["Agile / Scrum (Jira)", "Design patterns", "Debugging & profiling", "Unit & integration testing", "Version control workflows"],
    networkingSecurity: ["TCP/IP", "UDP", "HTTP/HTTPS", "DNS", "Security fundamentals (CompTIA Security+)"],
  },
  experience: [
    { role: "Full Stack Software Engineer", organization: "Lockheed Martin", location: "Colorado Springs, CO", period: "Apr 2022 – Present", highlights: ["Produced, tested, and deployed enterprise software using Java, Spring Boot, and JavaScript frameworks in mission-critical environments.", "Worked from design documents and user requirements to deliver production features and system improvements.", "Used Git, remote repos, and build/automation tooling to support collaboration and deployments.", "Served as Scrum Master; improved CI/CD deployment efficiency by ~10%."] },
    { role: "Full Stack Developer", organization: "Freelance", location: "Remote", period: "May 2021 – Apr 2022", highlights: ["Developed, debugged, and updated software across multiple stacks and client needs.", "Built REST APIs and database-backed functionality to support data-driven workflows."] },
    { role: "Crew Chief • Shift Lead • Crash Recovery Team Lead", organization: "United States Air Force", location: "Various", period: "2008 – 2015", highlights: ["Led teams in high-pressure operational environments; responsible for safety, readiness, and execution timelines.", "Coordinated crash recovery operations requiring rapid assessment, clear communication, and decisive leadership.", "Trained and mentored junior personnel; maintained consistent execution across shifts.", "CDDAR crash recovery: recovered 16 aircraft; responded to 74+ emergency calls.", "7-level / Red X qualified; airframe general SME experience."] },
  ],
  agenticExperience: ["Designed and implemented multi-agent AI workflows to automate software engineering tasks across large and legacy codebases.", "Built agent pipelines where specialized agents perform code comprehension, refactoring, feature expansion, test generation, and validation.", "Applied planner–executor–reviewer agent patterns to decompose open-ended engineering problems into verifiable subtasks.", "Integrated agentic workflows with Python tooling, Git, and CI/CD pipelines to support test-aware, iterative code modification."],
  projects: [
    { name: "Stock tracker ANN (TensorFlow/Keras)", description: "Estimates stock prices using market data and sentiment analysis (LSTM/ANN work)." },
    { name: "ANN Experiments", description: "Neural network experiments in Python." },
    { name: "C# Projects (Enigma Encoder, Sudoku Solver, etc.)", description: "Windows Forms/.NET projects demonstrating OOP and threading." },
    { name: "Misc Projects", description: "Small web/API projects and experiments." },
  ],
  education: [
    { degree: "B.S. Computer Science", school: "University of Colorado, Colorado Springs (UCCS)", date: "Jan 2021" },
    { degree: "A.S. Science", school: "Pikes Peak Community College (PPCC)", date: "Jan 2018" },
  ],
  certifications: [
    { name: "CompTIA Security+", date: "Jul 2024" },
    { name: "IBM Data Science Professional Certificate (Coursera)", date: "Dec 2023" },
    { name: "Google Cybersecurity Professional Certificate", date: "Aug 2023" },
  ],
  interests: ["Machine learning & computer vision", "Statistics & engineering", "Science, mathematics, & philosophy", "Investing & trading", "Networking & web development"],
};

function buildSystemPrompt() {
  const ctx = bioContext;
  const skillsText = Object.entries(ctx.skills)
    .map(([category, items]) => `  ${category}: ${items.join(", ")}`)
    .join("\n");
  const experienceText = ctx.experience
    .map((job) => `  ${job.role} at ${job.organization} (${job.period})\n    ${job.highlights.join("\n    ")}`)
    .join("\n\n");
  const projectsText = ctx.projects.map((p) => `  - ${p.name}: ${p.description}`).join("\n");
  const educationText = ctx.education.map((e) => `  - ${e.degree} from ${e.school} (${e.date})`).join("\n");
  const certsText = ctx.certifications.map((c) => `  - ${c.name} (${c.date})`).join("\n");

  return `You are an AI assistant on Justin Archibald's portfolio website. Your role is to answer questions about Justin based on the following information. Be helpful, accurate, and conversational. If asked something not covered in the provided information, politely say you don't have that information.

PERSONAL INFO:
  Name: ${ctx.personal.name}
  Headline: ${ctx.personal.headline}
  Location: ${ctx.personal.location}
  Email: ${ctx.personal.email}
  GitHub: ${ctx.personal.github}

SUMMARY:
${ctx.summary}

CURRENTLY SEEKING ROLES IN:
${ctx.seekingRoles.join(", ")}

TECHNICAL SKILLS:
${skillsText}

WORK EXPERIENCE:
${experienceText}

AGENTIC AI EXPERIENCE:
${ctx.agenticExperience.map((item) => `  - ${item}`).join("\n")}

PROJECTS:
${projectsText}

EDUCATION:
${educationText}

CERTIFICATIONS:
${certsText}

INTERESTS:
${ctx.interests.join(", ")}

Remember: You represent Justin's portfolio. Be professional, friendly, and accurate. Only share information provided above.`;
}

/**
 * Register chat routes on the Express app
 * @param {import('express').Application} app
 */
function chatRoutes(app) {
  // Chat API endpoint for Ollama
  app.post('/api/chat', express.json(), async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const systemPrompt = buildSystemPrompt();

      // Build the full message array with system prompt
      const fullMessages = [
        { role: 'system', content: systemPrompt },
        ...messages,
      ];

      console.log(`[Chat] Sending request to Ollama (${OLLAMA_MODEL})...`);

      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages: fullMessages,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Chat] Ollama error:', errorText);
        return res.status(500).json({ error: 'Failed to get response from AI model' });
      }

      // Set up streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Stream the response from Ollama to the client
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Ollama returns newline-delimited JSON
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              res.write(`data: ${JSON.stringify({ content: parsed.message.content })}\n\n`);
            }
            if (parsed.done) {
              res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            }
          } catch (e) {
            // Skip malformed JSON lines
          }
        }
      }

      res.end();
    } catch (error) {
      console.error('[Chat] Error:', error.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.end();
      }
    }
  });
}

module.exports = chatRoutes;
