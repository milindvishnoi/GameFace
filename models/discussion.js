const mongoose = require("mongoose");

const repliesSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
        minlength: 1
    }, 
    reply: {
        type: String,
        required: true,
        default: ''
    }
});

const discussionSchema = mongoose.Schema({
    pinned: {
        type: Boolean,
        required: true,
        default: false
    }, 
    originalPoster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    body: {
        type: String,
        required: true,
        default: ''
    },
    replies: [repliesSchema]
});

module.exports = mongoose.model("Discussion", discussionSchema);