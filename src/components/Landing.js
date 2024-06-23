import "./Landing.css";
//import * as bootstrap from "react-bootstrap";
//import App from "../App.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "../App.js";
import Projects from "../pages/Projects.js";
import ReactPgs from "../pages/ReactPgs.js";
import Resume from "../pages/Resume.js";
//import Heading from "./components/Heading";
import About from "../pages/About.js";
import Home from "../pages/HomePage";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap";
import {
  Navbar,
  Container,
  NavDropdown,
  NavItem,
  Button,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
//import { slide as Menu } from "react-burger-menu";
import "bootstrap";

function Landing() {
  let intro = false;
  return (
    <div class="landing-page">
      <body
        class="land-body"
        style={{
          height: "auto",
          minheight: "100%",
          background: `url(../images/IMG_0020.png) no-repeat center center fixed`,
          backgroundsize: "cover",
        }}
      >
        <h1 class="welcome-slogan">Welcome to my Portfolio Page</h1>
        <br />
        <br />
        <a >
          <Button
            variant="outline-success"
            size="lg"
            class="btn"
            href="../pages/HomePage"
            onClick={RouteToApp(intro)}
          >
            Enter Here
          </Button>
        </a>
      </body>
    </div>
  );
}

function RouteToApp() {
  //val.key = false;
}

export default Landing;
