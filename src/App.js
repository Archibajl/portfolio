import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./pages/Projects.js";
import ReactPgs from "./pages/ReactPgs.js";
import Resume from "./pages/Resume.js";
import Heading from "./components/Heading";
import Home from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router default="/pages/HomePage" component={Home}>
        <Heading />
        <Switch>
          <Route path="/pages/HomePage" component={Home}>
            <Home />
          </Route>
          <Route path="/pages/Projects" component={Projects}>
            <Projects />
          </Route>
          <Route path="/pages/ReactPgs" component={ReactPgs}>
            <ReactPgs />
          </Route>
          <Route path="/pages/Resume" component={Resume}>
            <Resume />
          </Route>
          <default>
            <Home />
          </default>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
