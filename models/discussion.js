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
        required: true,
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
    replies: [repliesSchema]
});

module.exports = mongoose.model("Discussion", discussionSchema);