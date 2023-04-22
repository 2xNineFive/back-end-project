// server code here
require("dotenv").config();

// importing express
const express = require("express");

// caching express to get access to express methods
const server = express();

// destructuring
const PORT = process.env.PORT || 8080;

// heartbeat endpoint
server.get("/heartbeat", (req, res) => {
  res.json({
    is: "working",
    status: "good"
  });
});

// listening at port 8080
server.listen(PORT, () => console.log(`The server is running at port ${PORT}`));
