const express = require("express");

const Friendship =
    require("../models/Friendship");

const router = express.Router();


// SEND FRIEND REQUEST

router.post("/request", async (req, res) => {

    try {

        const {
            userId,
            friendId
        } = req.body;

        const friendship =
            await Friendship.create({

                userId,

                friendId

            });

        res.json(friendship);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ACCEPT FRIEND

router.post("/accept/:id", async (req, res) => {

    try {

        const friendship =
            await Friendship.findByIdAndUpdate(

                req.params.id,

                {
                    status: "accepted"
                },

                {
                    new: true
                }

            );

        res.json(friendship);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET FRIENDS

router.get("/:userId", async (req, res) => {

    try {

        const friends =
            await Friendship.find({

                $or: [

                    {
                        userId:
                            req.params.userId
                    },

                    {
                        friendId:
                            req.params.userId
                    }

                ],

                status: "accepted"

            })
            .populate(
                "userId friendId",
                "username avatar xp level streak"
            );


        res.json(friends);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;