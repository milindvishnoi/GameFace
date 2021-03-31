/* Games mongoose model */
const mongoose = require('mongoose')

const Games = mongoose.model('Games', {
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

module.exports = { Student }