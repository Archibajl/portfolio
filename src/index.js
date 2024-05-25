import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/HomePage";
import Landing from "./components/Landing";
import Base from "./BackEndFunctions.js";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  Container,
  Button,
  NavDropdown,
  Dropdown,
  ButtonGroup,
  DropdownButton,
  SplitButton,
} from "react-bootstrap";

//import { Navlink, Button } from "reactstrap";
//import resume from "./pages/resume";
//import rctPages from "./pages/react-projects";
//import projects from "./pages/projects";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
//let BaseClass = new Base();
//ReactDOM.render(<App />, document.getElementById("root"));
//ReactDOM.render(<Home />, document.getElementById("root"));

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
/*ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);*/
/*const navBtn = (
  <>
    <Navbar bg="light" expand="lg" className="heading">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            `` <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  </>
);

let dropBtn = (
  <>
    <heading className="head2">
      <div>
        <DropdownButton
          as={ButtonGroup}
          menuAlign={{ lg: "right" }}
          title="Left-aligned but right aligned when large screen"
          id="dropdown-menu-align-responsive-1"
        >
          <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="mt-2">
        <SplitButton
          menuAlign={{ lg: "left" }}
          title="Right-aligned but left aligned when large screen"
          id="dropdown-menu-align-responsive-2"
        >
          <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
        </SplitButton>
      </div>
    </heading>
  </>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
