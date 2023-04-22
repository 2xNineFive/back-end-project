// server code here

// importing express
const express = require('express')

// caching express to get access to express methods
const server = express();


// heartbeat endpoint
server.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
})


// listening at port 8080
server.listen(8080, () => console.log("The server is running at port 8080"));