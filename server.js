// server code here

// importing .env
require("dotenv").config();

// rendering
const es6Renderer = require("express-es6-template-engine");

// importing express
const express = require("express");

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
    partials: {
      footer: "partials/footer",
      header: "partials/header",
      main: "partials/main/landing",
    },
  });
});

server.get("/login", (req, res) => {
  res.render("index", {
    partials: {
      footer: "partials/footer",
      header: "partials/header",
      main: "partials/main/login",
    },
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
