const mongoose = require("mongoose");

const userLeagueSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        currentTier: {
            type: Number,
            default: 1
        },

        weeklyXp: {
            type: Number,
            default: 0
        },

        currentGroupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LeaderboardGroup",
            default: null
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model(
    "UserLeague",
    userLeagueSchema
);