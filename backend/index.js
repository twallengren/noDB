// Require libraries
const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller.js");
const cors = require('cors')

// Have express create app
const app = express();

// Tell express app to use bodyParser.json() for API endpoints
app.use(bodyParser.json())
app.use(cors())

// Create endpoints
app.get("/api/patterns", controller.read)
app.delete("/api/patterns/:patternID", controller.delete)
app.put("/api/patterns/:patternID", controller.update)
app.post("/api/patterns", controller.add)

// Tell the app to start listening on port 3005
app.listen(3005, () => {
    console.log("app running on port 3005")
})