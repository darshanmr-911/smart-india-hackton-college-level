const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        title: {
            type: String,
            required: true
        },

        sport: {
            type: String,
            required: true
        },

        description: String,

        location: String,

        eventDate: Date,

        maxPlayers: {
            type: Number,
            default: 10
        },

        skillLevel: {
            type: String,
            default: "Any"
        },

        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Event",
    eventSchema
);