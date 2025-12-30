import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Projects from "./pages/Projects.js";
import ReactPgs from "./pages/ReactPgs.js";
import Resume from "./pages/Resume.js";
import About from "./pages/About.js";
import Home from "./pages/HomePage";
import WeddingPhotos from "./pages/WeddingPhotos";
import Landing from "./components/Landing.js";
import Nav from "react-bootstrap/Nav";
import lnkInImg from "./images/linkedIn_PNG32.png";
import {
  Navbar,
  Container,
  NavItem,
} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/components/Landing" element={<div>
            <Landing /> </div>} />
        <Route path="/" element={<div>
            <Landing /> </div>} />
          <Route path="/pages/HomePage" element={<div>
            <Heading />
            <Home />
            <Footer />
            </div>} />
          <Route path="/pages/Projects" element={<div>
            <Heading />
            <Projects />
            <Footer />
            </div>}/>
          <Route path="/pages/ReactPgs" element={<div>
            <Heading />
            <ReactPgs />
            <Footer />
          </div>}/>
          <Route path="/pages/Resume" element={<div>
            <Heading />
            <Resume />
            <Footer />
          </div>}/>
          <Route path="/pages/About" element={<div>
            <Heading />
            <About />
            <Footer />
          </div>}/>
          <Route path="/pages/WeddingPhotos" element={<div>
            <Heading />
            <WeddingPhotos />
            <Footer />
          </div>}/>
          <Route path="/pages/*" element={<div>
            <Landing />
            <Footer />
          </div>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

function Heading() {
  //Produces header navbar with links to internal and external pages.
  return (
    <>
      <header className="heading">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="page-links">
                <Nav.Link href="../pages/HomePage">Home</Nav.Link> {//Links
                //internal react pages
                }
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
                  {/*workaround for linking external pages using links*/}
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
      <footer className="footer">
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
