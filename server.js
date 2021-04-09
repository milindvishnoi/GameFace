"use strict";
const log = console.log;
const env = process.env.NODE_ENV
const bcrypt = require('bcryptjs')
const path = require('path')
const express = require("express");
var session = require('express-session')
// starting the express server
const app = express();

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dcbaj2gh5',
    api_key: '613126637958386',
    api_secret: 'Uad6X0WNYQAM83TFlWzunw6k4kI'
});

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// to validate object IDs
const { ObjectID } = require('mongodb')
// import the mongoose models
const Game = require("./models/game");
const Discussion = require("./models/discussion");
const User = require("./models/users");

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

// Middleware for authenticating
const authenticate = async (req, res, next) => {
  if (!res.session.user_id) {
    res.status(401).send("Unauthorized")
  }

  try {
    const user = await User.findById(req.session.user_id)
    if (!user)
      res.status(401).send("Unauthorized")
    else {
      req.user = user
      next()
    }
  } catch {
    res.status(401).send("Unauthorized")
  }
}

const authenticateAuth = async (req, res, next) => {
  if (!res.session.user_id) {
    res.status(401).send("Unauthorized")
  }

  try {
    const user = await User.findById(req.session.user_id)
    if (!user.isAdmin)
      res.status(401).send("Unauthorized")
    else {
      req.user = user
      next()
    }
  } catch {
    res.status(401).send("Unauthorized")
  }
}

/*** Auth Session **********************************/
app.use(session({
  secret: 'Rand Secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 100000000,
      httpOnly: true
  },
  store: env === 'production' ? new MongoStore({ mongooseConnection: mongoose.connection }) : null  
}))

app.post('/api/login', mongoChecker, async (req, res) => {
  const { username, password } = req.body
  
  try {
    // get the user
    const user = await User.findAndValidate(username, password)
    if (user) {
      req.session.user_id = user._id;
      req.session.username = user.username;
      req.session.is_admin = user.isAdmin;
      res.send({ currentUser: user, adminPriv: user.isAdmin})
      return
    }
    res.send(404).send('Username or Password is incorrect. Please try again!')
  } catch(err) {
    if (isMongoError(err)) { // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(err)
      res.status(400).send('Bad Request') // bad request for changing the student.
    }
  }
})

app.post('/api/logout', mongoChecker, async (req, res) => {
  req.session.destroy()
  log(req.session)
  res.send('Logged out')
  // res.redirect('/')
})

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
  log("Getting to games API")
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
  log("In delete Game")
  log(req)

  try {
    const delGame = await Game.findByIdAndRemove(req.body.id)
    if (!delGame) {
			res.status(404).send()
		} else {   
			res.send({delGame})
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

// Add game tag
app.post('/api/game/tag', mongoChecker, authenticateAuth, (req, res) => {
  Game.findByIdAndUpdate({ _id: req.body.game_id }, {$push: { 'tags': req.game_tag }}, { new: true, useFindAndModify: false })
	.then((g) => {
		if (!g) {
			res.status(404).send('Resource not found')
		} else {   
			res.send({
				tags: g.tags
			})
		}
	})
	.catch((e) => {
		log(e)
		if (isMongoError(e)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Add a discussion
app.post('/api/discussion', mongoChecker, authenticate, (req, res) => {
  log(req.body)

  const discussion = new Discussion({
    author: req.user._id,
    body: req.body
  })

  Game.findByIdAndUpdate({ _id: req.body.game_id }, {$push: { 'discussions': discussion }}, { new: true, useFindAndModify: false })
	.then((g) => {
		if (!g) {
			res.status(404).send('Resource not found')
		} else {   
			res.send({
				discussion: g.discussions
			})
		}
	})
	.catch((e) => {
		log(e)
		if (isMongoError(e)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Add a reply
app.post('/api/game/reply', mongoChecker, authenticate, (req, res) => {
  const reply = req.body.reply

  Game.findByIdAndUpdate({ _id: req.body.game_id }, {$push: { 'replies': reply }}, { new: true, useFindAndModify: false })
	.then((g) => {
		if (!g) {
			res.status(404).send('Resource not found')
		} else {   
			res.send({
				replies: g.replies
			})
		}
	})
	.catch((e) => {
		log(e)
		if (isMongoError(e)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Edit game
app.patch('/api/game', mongoChecker, authenticateAuth, async (req, res) => {
  const fieldsToUpdate = {
    'description': req.description,
    'title': req.title,
  }

  try {
    const game = await Game.findByIdAndUpdate({_id: req.body.game_id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
    if (!game) {
			res.status(404).send('Resource not found')
		} else
			res.send(game)
    } catch (error) {
      log(error)
      if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
        res.status(500).send('Internal server error')
      } else {
        res.status(400).send('Bad Request') // bad request for changing the student.
      }
    }
})

//Update user info.
app.patch('/api/user', mongoChecker, async (req, res) => {
	const id = (req.body)[0].id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}


	// Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})

	// Update the student by their id.
	try {
		const user = await User.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send({ currentUser: user})
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}

})

// Add Like
app.post('/api/game/discussion/like', mongoChecker, authenticateAuth, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate({_id: req.body.game_id}, {$set: {'likes': req.body.likes}}, {new: true, useFindAndModify: false})
    if (!game) {
			res.status(404).send('Resource not found')
		} else {
      res.send(game)
    }
    } catch (error) {
      log(error)
      if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
        res.status(500).send('Internal server error')
      } else {
        res.status(400).send('Bad Request') // bad request for changing the student.
      }
    }
})

// Add Dislike
app.post('/api/game/discussion/dislike', mongoChecker, authenticateAuth, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate({_id: req.body.game_id}, {$set: {'dislikes': req.body.likes}}, {new: true, useFindAndModify: false})
    if (!game) {
			res.status(404).send('Resource not found')
		} else {
      res.send(game)
    }
    } catch (error) {
      log(error)
      if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
        res.status(500).send('Internal server error')
      } else {
        res.status(400).send('Bad Request') // bad request for changing the student.
      }
    }
})

// Add new user
app.post('/api/user', multipartMiddleware, async (req, res) => {
  const { username, password } = req.body
  log(req.files)

  const hashedPassword = await bcrypt.hash(password, 12)

  cloudinary.uploader.upload(
    req.files.image.path,
    async function(result) {
      try {
        const newUser = new User({
          username: username,
          password: hashedPassword,
          profilePic: result.url,
        })
        log(newUser)

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
    }
  )
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
