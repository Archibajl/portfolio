import "./About.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

function About() {
  const aboutPage = (
    <text>
      This page was created using react along with HTML5 and CSS processed
      through react classes and pages, this includes libraries react-router and
      react-bootstrap.
      <br /> These pages were written using Atom IDE, Yarn and NPM for package
      management, and of course React with a Node.js back end.
    </text>
  );
  const usageLinks = (
    <text>
      <li class="nav-links">
        <a href="https://reactjs.org/" target="blank" class="nav-links">
          React
        </a>
      </li>
      React- Front-end JavaScript library used for web development, deployment
      of html/CSS and like components.
      <li class="nav-links">
        <a
          href="https://getbootstrap.com/docs/5.0/getting-started/introduction/"
          target="blank"
          class="nav-links"
        >
          Bootstrap{" "}
        </a>
      </li>
      Bootstrap- Library for visual components in Javascript.
      <li class="nav-links">
        <a
          href="https://react-bootstrap.github.io/"
          target="blank"
          class="nav-links"
        >
          React Bootstrap{" "}
        </a>
      </li>
      React Bootstrap- visual website components using bootstrap adapted for
      React libraries in Javascript.
      <li class="nav-links">
        <a href="https://nodejs.org/en/about/" target="blank" class="nav-links">
          Node.js{" "}
        </a>
      </li>
      Node js a networking JavaScript library that links parts of the react
      server based processes.
    </text>
  );

  return (
    <div class="aboutpg">
      <body class="about-page">
        <h1 class="head">About This page</h1>
        <p>{aboutPage}</p>
        <h2 class="link-header"> Links</h2>
        <p>{usageLinks}</p>
      </body>
    </div>
  );
}

export default About;
