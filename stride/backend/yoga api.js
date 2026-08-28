const express = require("express");

const YogaAsana =
    require("./models/YogaAsana");

const YogaSession =
    require("./models/YogaSession");

const User =
    require("./models/User");

const router = express.Router();


// GET ALL ASANAS

router.get("/asanas", async (req, res) => {

    try {

        const asanas =
            await YogaAsana.find();

        res.json(asanas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ONE ASANA

router.get("/asanas/:id", async (req, res) => {

    try {

        const asana =
            await YogaAsana.findById(
                req.params.id
            );

        res.json(asana);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// COMPLETE YOGA SESSION

router.post("/sessions", async (req, res) => {

    try {

        const {
            userId,
            asanas,
            duration
        } = req.body;

        const xp = 100;

        const session =
            await YogaSession.create({

                userId,

                asanas,

                duration,

                completed: true,

                xp

            });


        await User.findByIdAndUpdate(

            userId,

            {
                $inc: {
                    xp: xp,

                    totalYogaSessions: 1,

                    totalWorkouts: 1
                }
            }

        );


        res.status(201).json({

            message: "Yoga session completed",

            session,

            xp

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;