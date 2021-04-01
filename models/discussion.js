var mongoose = require("mongoose");

var discussionSchema = mongoose.Schema({
    comment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    replies: [discussionSchema]
});

module.exports = mongoose.model("Discussion", discussionSchema);