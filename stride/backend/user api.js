const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const router = express.Router();


// REGISTER

router.post("/register", async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({

            username,

            email,

            password: hashedPassword

        });

        res.status(201).json({

            message: "User created",

            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const valid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!valid) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(
            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        );

        res.json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                xp: user.xp,
                level: user.level,
                streak: user.streak
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;
