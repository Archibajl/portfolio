import "../styles/Landing.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
} from "react-bootstrap";
import "bootstrap";

function Landing() {
  return (
    <div className="landing-page">
      <div
        className="land-body"
        style={{
          height: "auto",
          minHeight: "100%",
          background: `url(../images/IMG_0020.png) no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="welcome-slogan">Welcome to my Portfolio Page</h1>
        <br />
        <br />
        <Button
          variant="outline-success"
          size="lg"
          className="btn"
          href="../pages/HomePage"
        >
          Enter Here
        </Button>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function RouteToApp() {
  // Placeholder for API routing
}

export default Landing;
