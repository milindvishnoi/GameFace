const mongoose = require("mongoose");

const repliesSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
        default: false
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    body: {
        type: String,
        required: true,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    replies: [repliesSchema]
});

module.exports = mongoose.model("Discussion", discussionSchema);