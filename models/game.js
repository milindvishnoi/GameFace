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
		default: []
	},
  	discussions: {
    	type: Array,
		required: true,
		default: []
  	},
	link: {
		type: String,
		required: true
	},
	imgSrc: {
		type: String,
		required: true,
		default: ''
	}
})

// make a model using the Game schema
module.exports = mongoose.model('Game', GameScheme)