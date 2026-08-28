const mongoose = require("mongoose");

const leaderboardGroupSchema = new mongoose.Schema(
    {
        tier: {
            type: Number,
            required: true
        },

        weekStartDate: {
            type: Date,
            required: true
        },

        isClosed: {
            type: Boolean,
            default: false
        },

        players: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },

                weeklyXp: {
                    type: Number,
                    default: 0
                },

                rank: {
                    type: Number,
                    default: 0
                }
            }
        ]
    }
);

module.exports = mongoose.model(
    "LeaderboardGroup",
    leaderboardGroupSchema
);