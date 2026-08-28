const mongoose = require("mongoose");

const yogaAsanaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        englishName: {
            type: String,
            required: true
        },

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
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "YogaAsana",
    yogaAsanaSchema
);
