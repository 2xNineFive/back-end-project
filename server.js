// server code here

// importing .env
require("dotenv").config();

const { checkAuth } = require("./middleware");
const cookieParser = require("cookie-parser");

// rendering
const es6Renderer = require("express-es6-template-engine");

// importing express
const express = require("express");

const sessions = require("express-session");

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

server.use(express.json());

server.use(cookieParser());

server.use(
  sessions({
    secret: process.env.SECRET,
    saveUnitialized: true,
    cookie: { maxAge: 30000 },
    resave: false,
  })
);

// const authStatus = {
//   isAuthenticated: false
// }

const validCreds = {
  password: "1234",
  username: "anna",
};

// render html
server.get("/", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),

    partials: setMainView("landing"),
  });
});

server.get("/home", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),

    partials: setMainView("home"),
  });
});

server.get("/gallery", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),
    partials: setMainView("gallery"),
  });
});

server.get("/about", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),

    partials: setMainView("about"),
  });
});

server.get("/contact-us", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),

    partials: setMainView("contact-us"),
  });
});

server.get("/profile", checkAuth, (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),

    partials: setMainView("profile"),
  });
});

server.get("/login", (req, res) => {
  res.render("index", {
    locals: setNavs(req.url, navs, !!req.session.userId),

    partials: setMainView("login"),
  });
});

server.post("/login", (req, res) => {
  const afterLogin = {
    isAuthenticated: false,
    redirectedTo: "./login",
  };
  const { password, username } = req.body;
  if (password === validCreds.password && username === validCreds.username) {
    req.session.userId = username;
    afterLogin.isAuthenticated = true;
    afterLogin.redirectTo = "/profile";
  }

  res.json(afterLogin);
});

server.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/')
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
