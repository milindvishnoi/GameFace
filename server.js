"use strict";
const log = console.log;
const path = require('path')

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Games } = require("./models/games");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "./client/build")));

// // All routes other than above will go to index.html
// app.get("*", (req, res) => {
//   // check for page routes that we expect in the frontend to provide correct status code.
//   const goodPageRoutes = ["/", "/login", "/dashboard"];
//   if (!goodPageRoutes.includes(req.url)) {
//       // if url not in expected page routes, set status to 404.
//       res.status(404);
//   }

//   // send index.html
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
