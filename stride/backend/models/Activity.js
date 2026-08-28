const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        activityType: {
            type: String,
            required: true
        },

        distance: {
            type: Number,
            default: 0
        },

        duration: {
            type: Number,
            default: 0
        },

        steps: {
            type: Number,
            default: 0
        },

        calories: {
            type: Number,
            default: 0
        },

        pace: {
            type: String,
            default: ""
        },

        xp: {
            type: Number,
            default: 0
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Activity", activitySchema);