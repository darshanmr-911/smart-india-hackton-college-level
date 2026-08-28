const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "rejected"
            ],
            default: "pending"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Friendship",
    friendshipSchema
);