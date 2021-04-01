/* Games mongoose model */
const mongoose = require('mongoose')

const GameScheme = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlegth: 1,
	},
	score: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
		minlegth: 1,
	},
  tags: {
		type: Array,
		required: true,
	},
  discussions: {
    type: Array,
  },
	link: {
		type: String
	},
	imgSrc: {
		type: String
	}
})

// make a model using the Game schema
module.exports = mongoose.model('Game', GameScheme)