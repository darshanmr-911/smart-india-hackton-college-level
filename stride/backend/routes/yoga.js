const express = require("express");
const router = express.Router();

const YogaAsana = require("../models/YogaAsana");
const YogaSession = require("../models/YogaSession");

// ==========================================
// GET ALL YOGA ASANAS
// GET /api/yoga
// ==========================================

router.get("/", async (req, res) => {
    try {
        const asanas = await YogaAsana.find({}).sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: asanas.length,
            data: asanas
        });

    } catch (error) {
        console.error("Yoga API error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch yoga asanas",
            error: error.message
        });
    }
});

// ==========================================
// GET SINGLE ASANA
// GET /api/yoga/:id
// ==========================================

router.get("/:id", async (req, res) => {
    try {
        const asana = await YogaAsana.findById(req.params.id);

        if (!asana) {
            return res.status(404).json({
                success: false,
                message: "Yoga asana not found"
            });
        }

        res.json({
            success: true,
            data: asana
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch yoga asana",
            error: error.message
        });
    }
});

// ==========================================
// CREATE YOGA SESSION
// POST /api/yoga/session
// ==========================================

router.post("/session", async (req, res) => {
    try {
        const {
            userId,
            asanaId,
            duration,
            completed
        } = req.body;

        const session = await YogaSession.create({
            userId,
            asanaId,
            duration,
            completed: completed ?? true
        });

        res.status(201).json({
            success: true,
            message: "Yoga session saved successfully",
            data: session
        });

    } catch (error) {
        console.error("Yoga session error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save yoga session",
            error: error.message
        });
    }
});

module.exports = router;
