const mongoose = require("mongoose");

let QuestionSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    questionDate: {
        type: Date,
        required: true,
    },
    obs: {
        type: String,
        required: false,
    },
});

module.exports = QuestionSchema = mongoose.model("question", QuestionSchema);