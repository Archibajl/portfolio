import "../styles/HomePage.css";
import selfImg from "../images/DSC02218.JPG";

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="h1">Portfolio</h1>

      <header className="home-header">
        <h2 className="h2">Justin Archibald</h2>
        <p className="home-tagline">
          Software Engineer • ML/Data • Former Crash Recovery Specialist & Team Lead
        </p>
      </header>

      <main className="home-body">
        <section className="about">
          <h1 className="h1H">About Me</h1>

          <p>
            I'm a software engineer with a B.S. in Computer Science from the
            University of Colorado Colorado Springs (UCCS). Before transitioning
            into software, I served in the U.S. Air Force as an aircraft
            maintainer, including roles in crash recovery and shift leadership.
          </p>

          <p>
            I enjoy building reliable systems end-to-end — from backend services
            and APIs to user-facing applications — and I'm especially interested
            in data-driven software and applied machine learning. My strongest
            languages include Java, Python, C#, and C++, with experience using
            SQL and modern development workflows (Git, CI/CD, Docker, Linux).
          </p>

          <p>
            Recent work includes projects in neural networks (ANN/CNN/LSTM),
            database-backed applications, multithreading and TCP/IP networking,
            and full-stack web development with React and Node/Express.
          </p>

          <p>
            I'm currently seeking roles in{" "}
            <strong>Software Engineering</strong>,{" "}
            <strong>Machine Learning / Data</strong>, or{" "}
            <strong>backend / systems development</strong>.
          </p>
        </section>
      </main>

      <img
        src={selfImg}
        className="bottom-image"
        alt="waterfall"
      />
    </div>
  );
}

export default HomePage;
