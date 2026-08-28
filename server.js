const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ================================
// DATABASE
// ================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


// ================================
// ROUTES
// ================================

app.use("/api/users", require("./routes/users"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/yoga", require("./routes/yoga"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/challenges", require("./routes/challenges"));
app.use("/api/events", require("./routes/events"));
app.use("/api/notifications", require("./routes/notifications"));


// ================================
// HOME
// ================================

app.get("/", (req, res) => {
    res.json({
        message: "Stride API is running 🚀"
    });
});


// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Stride API is healthy 🚀",
        database:
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected"
    });
});


// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl
    });
});


// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Stride server running on http://localhost:${PORT}`);
});

