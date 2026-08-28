const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ========================================
// TEST ROUTE
// ========================================

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Gemini AI route is connected"
    });
});

// ========================================
// AI FITNESS COACH
// ========================================

router.post("/coach", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter a question"
            });
        }

        console.log("GEMINI QUESTION:", message);

        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",

            contents: `
You are Stride AI Fitness Coach.

Stride is a sports and fitness platform.

You help users with:

- Running
- Walking
- Cricket
- Football
- Badminton
- Basketball
- Cycling
- Yoga
- General fitness
- Workout planning
- Sports training

Give practical and beginner-friendly advice.

When creating a workout include:

1. Warm-up
2. Main exercises
3. Duration
4. Rest
5. Cool-down

Keep responses clear and easy to understand.

Do not diagnose medical conditions.

If the user describes serious pain,
injury, or an emergency, recommend
consulting a qualified healthcare professional.

User question:

${message}
`
        });

        res.json({
            success: true,
            answer: response.text
        });

    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Gemini AI service failed",
            error: error.message
        });
    }
});

module.exports = router;
