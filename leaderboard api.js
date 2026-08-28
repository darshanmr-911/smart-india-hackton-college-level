const express = require("express");

const UserLeague =
    require("../models/UserLeague");

const User =
    require("../models/User");

const router = express.Router();


// GET LEADERBOARD

router.get("/", async (req, res) => {

    try {

        const players =
            await UserLeague.find()
                .populate(
                    "userId",
                    "username avatar xp level"
                )
                .sort({
                    weeklyXp: -1
                })
                .limit(30);


        const leaderboard =
            players.map((player, index) => ({

                rank: index + 1,

                username:
                    player.userId.username,

                xp:
                    player.weeklyXp,

                tier:
                    player.currentTier,

                level:
                    player.userId.level

            }));


        res.json(leaderboard);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;