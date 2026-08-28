const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
    name: String,

    description: String,

    icon: String,

    xpReward: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model(
    "Badge",
    badgeSchema
);