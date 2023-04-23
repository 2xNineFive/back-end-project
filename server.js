// server code here

// importing .env
require("dotenv").config();

// rendering
const es6Renderer = require("express-es6-template-engine");

// importing express
const express = require("express");

const { setMainView, setNavs } = require("./utils");

const navs = require("./data/navs.json");

// caching express to get access to express methods
const server = express();

// destructuring
const PORT = process.env.PORT || 8080;

// npm express-es6
server.engine("html", es6Renderer);
server.set("views", "views");
server.set("view engine", "html");

// ill look at public whenever I see a "./"
server.use(express.static(__dirname + "/public"));

// render html
server.get("/", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("landing"),
  });
});

server.get("/home", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("home"),
  });
});

server.get("/gallery", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),
    partials: setMainView("gallery"),
  });
});

server.get("/about", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("about"),
  });
});

server.get("/contact-us", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("contact-us"),
  });
});

server.get("/profile", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("profile"),
  });
});

server.get("/login", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("login"),
  });
});

server.get("/logout", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs),

    partials: setMainView("logout"),
  });
});

// heartbeat endpoint
server.get("/heartbeat", (req, res) => {
  res.json({
    is: "working",
    status: "good",
  });
});

// listening at PORT from .env
server.listen(PORT, () => console.log(`The server is running at port ${PORT}`));
