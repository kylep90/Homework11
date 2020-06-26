//Dependencies
//===================================================
const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");



//===================================================
// parse application/x-www-form-urlencoded TAKEN FROM THE BODY-PARSER DOC
const app = express();
const PORT = process.env.PORT || 3001; //In order to use default port.

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //Make everything in the public folder public

// TAKEN FROM THE BODYPARSE DOC Line 19 -22
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//=========================================================



require("./routing/html-routes.js")(app) //Gets the HTML routes form the JS file
require("./routing/api-routes.js")(app) //Gets the API routes

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });
