const mongoose = require("mongoose");

const yogaSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        asanas: [
            {
                asanaId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "YogaAsana"
                },

                duration: Number,

                completed: {
                    type: Boolean,
                    default: false
                }
            }
        ],

        duration: Number,

        completed: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model(
    "YogaSession",
    yogaSessionSchema
);