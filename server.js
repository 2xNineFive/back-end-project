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


server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

// render html
server.get("/", (req, res) => {
    res.render('index');
});


// heartbeat endpoint
server.get("/heartbeat", (req, res) => {
  res.json({
    is: "working",
    status: "good"
  });
});

// listening at PORT from .env
server.listen(PORT, () => console.log(`The server is running at port ${PORT}`));
