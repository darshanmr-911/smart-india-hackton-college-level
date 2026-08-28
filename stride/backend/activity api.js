const express = require("express");

const Activity = require("./models/Activity");
const User = require("./models/User");

const router = express.Router();


// CREATE ACTIVITY

router.post("/", async (req, res) => {

    try {

        const {
            userId,
            activityType,
            distance,
            duration,
            steps,
            calories,
            pace,
            xp
        } = req.body;

        const activity =
            await Activity.create({

                userId,

                activityType,

                distance,

                duration,

                steps,

                calories,

                pace,

                xp

            });


        await User.findByIdAndUpdate(

            userId,

            {
                $inc: {
                    xp: xp || 0,

                    totalSteps:
                        steps || 0,

                    totalDistance:
                        distance || 0,

                    totalWorkouts: 1
                }
            }

        );


        res.status(201).json(activity);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET USER ACTIVITIES

router.get("/:userId", async (req, res) => {

    try {

        const activities =
            await Activity.find({

                userId: req.params.userId

            }).sort({

                createdAt: -1

            });

        res.json(activities);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;
