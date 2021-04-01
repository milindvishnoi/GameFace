const mongoose = require("mongoose");
const validator = require('validator');

const gamerTagSchema = mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    }, 
    gamerTag: {
        type: String,
        minlength: 1,
        required: true
    }
})

const UserSchema = mongoose.Schema({
    email: {
        // email attributes taken from react auth express example
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail, 
			message: 'Not valid email'
		}
	},
    username: {
        type: String,
        minlength: 1,
        required: true
    },
    nickname: {
        type: String,
        minlength: 1
    },
    country: {
        type: String,
        minlength: 2
    },
    password: {
        type: String,
        minlength: 3
    },
    posts: {
    	type: Array,
		required: true,
		default: []
  	},
    profilePicSrc: {
        type: String,
        required: true,
        default: ''
    },
    backgroundPicSrc: {
        type: String,
        required: true,
        default: ''
    },
    gamerTags: [gamerTagSchema]
})

module.exports = mongoose.model('User', UserSchema)