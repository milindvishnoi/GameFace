/* Games mongoose model */
const mongoose = require('mongoose')

const GameScheme = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	rating: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
  tags: {
		type: Array[String],
		required: true,
	},
  discussions: {
    type: Array
  }
})

// make a model using the User schema
const Game = mongoose.model('Game', GameScheme)
module.exports = { Game }