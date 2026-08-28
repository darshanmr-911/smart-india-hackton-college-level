const express = require("express");

const Challenge =
    require("../models/Challenge");

const router = express.Router();


// CREATE CHALLENGE

router.post("/", async (req, res) => {

    try {

        const challenge =
            await Challenge.create(
                req.body
            );

        res.status(201).json(
            challenge
        );

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET CHALLENGES

router.get("/", async (req, res) => {

    try {

        const challenges =
            await Challenge.find()
                .sort({
                    createdAt: -1
                });

        res.json(challenges);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;