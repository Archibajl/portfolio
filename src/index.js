import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/HomePage";

//import resume from "./pages/resume";
//import rctPages from "./pages/react-projects";
//import projects from "./pages/projects";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

//ReactDOM.render(<App />, document.getElementById("root"));
//ReactDOM.render(<Home />, document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
