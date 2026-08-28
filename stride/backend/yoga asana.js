const mongoose = require("mongoose");

const yogaAsanaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    englishName: String,

    description: String,

    instructions: [String],

    breathing: String,

    commonMistakes: [String],

    duration: {
        type: Number,
        default: 30
    },

    difficulty: {
        type: String,
        default: "Beginner"
    },

    focus: String,

    animation: String
});

module.exports = mongoose.model(
    "YogaAsana",
    yogaAsanaSchema
);