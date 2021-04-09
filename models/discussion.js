const mongoose = require("mongoose");

const repliesSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    authorImgURL: {
        type: String,
        required: true
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
    title: {
        type: String,
        required: true,
        default: ''
    }, 
    author: {
        type: String,
        required: true
    },
    authorImgURL: {
        type: String,
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