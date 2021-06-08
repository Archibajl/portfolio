import "./Heading.css";

import { Link } from "react-router-dom";

function Heading() {
  return (
    <>
      <nav>
        <ul className="links">
          <li>
            <Link to="/pages/HomePage" className="home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pages/Resume" className="resume">
              Resume
            </Link>
          </li>
          <li>
            <Link to="/pages/Projects" className="projects">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/pages/ReactPgs" className="react-pages">
              React pages
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Heading;
