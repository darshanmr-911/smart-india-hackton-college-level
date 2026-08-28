const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            default: ""
        },

        xp: {
            type: Number,
            default: 0
        },

        level: {
            type: Number,
            default: 1
        },

        streak: {
            type: Number,
            default: 0
        },

        totalSteps: {
            type: Number,
            default: 0
        },

        totalDistance: {
            type: Number,
            default: 0
        },

        totalWorkouts: {
            type: Number,
            default: 0
        },

        totalYogaSessions: {
            type: Number,
            default: 0
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);