const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        title: String,

        description: String,

        type: String,

        targetValue: Number,

        xpReward: Number,

        startDate: Date,

        endDate: Date,

        participants: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },

                progress: {
                    type: Number,
                    default: 0
                },

                completed: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Challenge",
    challengeSchema
);