import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Projects from "./pages/Projects.js";
import ReactPgs from "./pages/ReactPgs.js";
import Resume from "./pages/Resume.js";
//import Heading from "./components/Heading";
import About from "./pages/About.js";
import Home from "./pages/HomePage";
import Landing from "./components/Landing.js";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap";
import lnkInImg from "./images/linkedIn_PNG32.png";
import {
  Form,
  FormControl,
  Button,
  Navbar,
  Container,
  NavLink,
  NavItem,
  NavDropdown,
} from "react-bootstrap";

ReactDOM.render(<></>, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));

function App() {
  return (
    <div className="App">
      <Router default="/components/Landing" component={Landing}>
        <Switch>
          <Route path="/pages/HomePage" component={Home}>
            <Heading />
            <Home />
            <Footer />
          </Route>
          <Route path="/pages/Projects" component={Projects}>
            <Heading />
            <Projects />
            <Footer />
          </Route>
          <Route path="/pages/ReactPgs" component={ReactPgs}>
            <Heading />
            <ReactPgs />
            <Footer />
          </Route>
          <Route path="/pages/Resume" component={Resume}>
            <Heading />
            <Resume />
            <Footer />
          </Route>
          <Route path="/pages/About" component={About}>
            <Heading />
            <About />
            <Footer />
          </Route>
          <default>
            <Landing />
            <Footer />
          </default>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

function Heading() {
  //Produces header navbar with links to internal and external pages.
  return (
    <>
      <header class="heading">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="page-links">
                <Nav.Link href="../pages/HomePage">Home</Nav.Link> //Links
                //internal react pages
                <Nav.Link href="../pages/Resume">Resume/CV</Nav.Link>
                <Nav.Link href="../pages/Projects">Projects</Nav.Link>
                <Nav.Link href="../pages/ReactPgs">React Pages</Nav.Link>
              </Nav>
              <Nav className="LinkedIn">
                <NavItem>
                  <Nav.Link onClick={LinkIn}>
                    <img
                      src={lnkInImg}
                      className="LinkedIn-Image"
                      alt="LinkedIn Link"
                      keywords=""
                    />
                  </Nav.Link>{" "}
                  //wprkaround for linking external pages using links
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

function LinkIn() {
  //calls page linkedin page in new tab
  window.open("https://www.linkedin.com/in/justin-archibald-319279101");
}

function Footer() {
  //Link footer/link to about page for this website
  return (
    <>
      <footer class="footer">
        <nav>
          <ul className="links">
            <Link to="/pages/About" className="about">
              About this page
            </Link>
          </ul>
        </nav>
      </footer>
    </>
  );
}
