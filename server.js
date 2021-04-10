"use strict";
const log = console.log;
const env = process.env.NODE_ENV
const bcrypt = require('bcryptjs')
const path = require('path')
const express = require("express"); // to store session information on the database in production

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

const session = require("express-session");
const MongoStore = require('connect-mongo');
//const { user } = require('./client/src/data');

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
  log(req.session)

  try {
    const user = await User.findById(req.session.user)
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
  log(req.session)
  try {
    const user = await User.findById(req.session.user)
    if (!user || !user.isAdmin)
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
      expires: 600000,
      httpOnly: true
  }, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.zxmpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  })
}))

app.get("/api/users/check-session", (req, res) => {
  if (req.session.user) {
    res.send({ currentUser: req.session.user, adminPriv: req.session.user.isAdmin})
  } else {
    res.status(401).send();
  }
});

app.post('/api/login', mongoChecker, async (req, res) => {
  const { username, password } = req.body
  
  try {
    // get the user
    const user = await User.findAndValidate(username, password)
    if (user) {
      req.session.user = user;
      req.session.username = user.username;
      req.session.is_admin = user.isAdmin;
      res.send({ currentUser: user, adminPriv: user.isAdmin})
      return
    }
    res.status(404).send('Username or Password is incorrect. Please try again!')
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
  req.session.destroy(error => {
    if (error) {
        res.status(500).send(error);
    } else {
        res.send()
    }
  });
})

/*** API routes below **********************************/
// Add Game
app.post('/api/game', multipartMiddleware, mongoChecker, authenticateAuth, async (req, res) => {
  cloudinary.uploader.upload(
    req.files.image.path,
    async function(result) {
      try {
        const game = new Game({
          title: req.body.title,
          imgSrc: result.url,
          description: req.body.description,
          tags: [],
          score: 50
        })
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

// Search game by game id
app.get('/api/searchbyid/:game_id', mongoChecker, (req, res) => {
  Game.findById(req.params.game_id)
  .then((g) => {
		if (!g) {
			res.status(404).send("Resource Not Found")
			return
		}
		res.send({game: g})
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
app.delete('/api/game', mongoChecker, authenticateAuth, async (req, res) => {
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

// Add a discussion
app.post('/api/discussion', mongoChecker, authenticate, async (req, res) => {
  log(req.body)

  const discussion = new Discussion({
    title: req.body.title,
    authorID: req.body.user_id,
    gameID: req.body.game_id,
    author: req.body.name,
    authorImgURL: req.body.imgLink,
    body: req.body.content
  })

  try {
    const discuss = await discussion.save();
    const game = await Game.findByIdAndUpdate({ _id: req.body.game_id }, {$push: { 'discussions': discuss }}, { new: true, useFindAndModify: false })
    const user = await User.findOneAndUpdate({ username: req.body.name }, {$push: { 'discussions': discuss }}, { new: true, useFindAndModify: false })
    if (!game) {
      res.status(404).send('Resource not found')
    } else {   
      res.send(game)
    }
  } catch(err) {
    log(e)
		if (isMongoError(e)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
  }
})

// Add a reply
app.post('/api/game/reply', mongoChecker, authenticate, async (req, res) => {
  const reply = req.body.reply
  console.log(reply)

  try {
    const discussion = await Discussion.findByIdAndUpdate({ _id: req.body.post_id }, {$push: { 'replies': reply }}, { new: true, useFindAndModify: false });
    if (!discussion) {
			res.status(404).send('Resource not found');
		}
    const game = await Game.update(
      {
          _id : discussion.gameID,
          "discussions._id": discussion._id
      },
      {
          $push: {"discussions.$.replies": reply }
      }
    );
    const user = await User.update(
      {
          _id : discussion.authorID,
          "discussions._id": discussion._id
      },
      {
          $push: {"discussions.$.replies": reply }
      }
    );
    res.send(discussion);
  } catch (e) {
    if (isMongoError(e)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
  }
})

// Edit game
app.post('/api/game/edit', mongoChecker, authenticateAuth, async (req, res) => {
  const fieldsToUpdate = {
    'description': req.body.description,
    'title': req.body.title,
    'tags': req.body.tags
  }

  log(req.body)

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
app.patch('/api/user', mongoChecker, authenticate, async (req, res) => {
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
app.post('/api/game/discussion/like', mongoChecker, authenticate, async (req, res) => {
  try {
    const disc = await Discussion.findOneAndUpdate({_id: req.body.post_id}, {$set: {'likes': req.body.likes}}, {new: true, useFindAndModify: false})
    if (!disc) {
			res.status(404).send('Resource not found')
		} else {
      const game = await Game.update(
        {
            _id : disc.gameID,
            "discussions._id": disc._id
        },
        {
            $set: {"discussions.$.likes": disc.likes }
        }
      );
      if (!game) {
        res.status(404).send('Resource not found')
      } 
      const user = await User.update(
        {
            _id : disc.authorID,
            "discussions._id": disc._id
        },
        {
            $set: {"discussions.$.likes": disc.likes }
        }
      );
      if (!user) {
        res.status(404).send('Resource not found')
      } 
      res.send(disc)
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
app.post('/api/game/discussion/dislike', mongoChecker, authenticate, async (req, res) => {
  try {
    const disc = await Discussion.findOneAndUpdate({_id: req.body.post_id}, {$set: {'dislikes': req.body.dislikes}}, {new: true, useFindAndModify: false})
    if (!disc) {
			res.status(404).send('Resource not found')
		} else {
      const game = await Game.update(
        {
            _id : disc.gameID,
            "discussions._id": disc._id
        },
        {
            $set: {"discussions.$.dislikes": disc.dislikes }
        }
      );
      if (!game) {
        res.status(404).send('Resource not found')
      } 
      const user = await User.update(
        {
            _id : disc.authorID,
            "discussions._id": disc._id
        },
        {
            $set: {"discussions.$.dislikes": disc.dislikes }
        }
      );
      if (!user) {
        res.status(404).send('Resource not found')
      } 
      res.send(disc)
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

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  //const goodPageRoutes = ["/", "/login", "/dashboard"];
  //if (!goodPageRoutes.includes(req.url)) {
      // if url not in expected page routes, set status to 404.
  //    res.status(404);
  //}

  // send index.html
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
