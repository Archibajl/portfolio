import "bootstrap/dist/css/bootstrap.css";
import express from "express";
import React from "react";
import ReactDOM from "react-dom";
import Projects from "./pages/Projects.js";
import ReactPgs from "./pages/ReactPgs.js";
import Resume from "./pages/Resume.js";
//import Heading from "./components/Heading";
import About from "./pages/About.js";
import Home from "./pages/HomePage";
import Landing from "./components/Landing.js";
import { Heading, Footer } from "./App.js"

// const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine")
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("public"));

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// API route (example)
app.post('/',
    (req, res) => {
        res.post(<div><Landing /></div>);
    });
app.post('/pages/HomePage',
    function (req, res) {
        res.send(<div>
            <Heading />
            <Home />
            <Footer />
        </div>);
    });
app.post('/pages/Projects',
    function (req, res) {
        res.send(<div>
            <Heading />
            <Projects />
            <Footer />
        </div>);
    });
app.post('/pages/ReactPgs',
    function (req, res) {
        res.send(<div>
            <Heading />
            <ReactPgs />
            <Footer />
        </div>);
    });
app.post('/pages/Resume',
    function (req, res) {
        <div>
            <Heading />
            <Resume />
            <Footer />
        </div>
    });
app.post('/pages/About',
    function (req, res) {
        <div>
            <Heading />
            <About />
            <Footer />
        </div>
    });
app.route('/pages/*')
    .put(function (req, res) {
        <div>
            <Landing />
            <Footer />
        </div>
    });
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.put('*', (req, res) => {
    res.sendFile(path.join(__dirname + ''));
});

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    else
        console.log("Error occurred, server can't start", error);
});