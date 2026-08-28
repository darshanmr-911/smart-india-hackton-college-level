const express = require("express");

const Event =
    require("../models/Event");

const router = express.Router();


// CREATE EVENT

router.post("/", async (req, res) => {

    try {

        const event =
            await Event.create(
                req.body
            );

        res.status(201).json(event);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET EVENTS

router.get("/", async (req, res) => {

    try {

        const events =
            await Event.find()
                .populate(
                    "creatorId",
                    "username"
                )
                .populate(
                    "players",
                    "username"
                )
                .sort({
                    eventDate: 1
                });

        res.json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// JOIN EVENT

router.post("/:id/join", async (req, res) => {

    try {

        const {
            userId
        } = req.body;

        const event =
            await Event.findById(
                req.params.id
            );

        if (!event) {

            return res.status(404).json({
                message: "Event not found"
            });

        }


        if (
            event.players.length >=
            event.maxPlayers
        ) {

            return res.status(400).json({
                message: "Event is full"
            });

        }


        if (
            event.players
                .some(
                    id =>
                        id.toString() ===
                        userId
                )
        ) {

            return res.status(400).json({
                message: "Already joined"
            });

        }


        event.players.push(userId);

        await event.save();


        res.json({

            message: "Joined event",

            event

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;