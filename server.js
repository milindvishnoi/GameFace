"use strict";
const log = console.log;
const env = process.env.NODE_ENV

const path = require('path')
const express = require("express");
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const Game = require("./models/game");
const Discussion = require("./models/discussion");
const User = require("./models/users");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser'); 
const { deleteModel } = require('mongoose');
const { runInNewContext } = require('vm');
const { findById } = require('./models/game');
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it (from lecture)
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
  } else {
      next()  
  }   
}

/*** API routes below **********************************/
// Add Game
app.post('/api/game', mongoChecker, async (req, res) => {
  log(req.body)

  const game = new Game({
    title: req.body.title,
    score: req.body.score,
    link: req.body.link,
    imgSrc: req.body.imgSrc,
    description: req.body.description,
    tags: req.body.tags
  })

  try {
    // Save the game
    const newGame = await game.save()
    res.send(newGame)
  } catch(err) {
    if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
  }
})

// Get all games
app.get('/api/games', mongoChecker, (req, res) => {
  Game.find().then((g) => {
		if (!g) {
			res.status(404).send("Resource Not Found")
			return
		}
		res.send({gameList: g})
	})
	.catch((err) => {
		if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
	})
})

// Search Game
app.get('/api/search/:game', mongoChecker, (req, res) => {
  Game.find({'title': {$regex: `.*${req.params.game}*.`, $options: 'i'}}).then((g) => {
		if (!g) {
			res.status(404).send("Resource Not Found")
			return
		}
		res.send({gameList: g})
	})
	.catch((err) => {
		if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
	})
})

// Delete a game
app.delete('/api/game', mongoChecker, async (req, res) => {
  log(req.body.id)

  try {
    const delGame = await Game.findByIdAndRemove(req.body.id)
    if (!delGame) {
			res.status(404).send()
		} else {   
			res.send(delGame)
		}
  } catch(err) {
    if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
  }
})

// Add new user
app.post('/api/user', mongoChecker, async (req, res) => {
  log(req.body)

  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password, 
    gamerTags: []
  })

  try {
    // Save the new user
    const userAdded = await newUser.save()
    res.send(userAdded)
  } catch(err) {
    if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
  }
})

// Find user by id
app.get('/api/user/:id', mongoChecker, async (req, res) => {
  const userId = req.params.id
  log(userId)

  // Validate id 
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()  
		return;  
	}

  try {
    // get the user
    const user = await User.findById(userId)
    res.send(user)
  } catch(err) {
    if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
  }
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "./client/build")));

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
