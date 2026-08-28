const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());
app.use(express.json());

// ======================================
// DATABASE
// ======================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// ======================================
// HEALTH CHECK
// ======================================

app.get("/api/health", (req, res) => {
    const connected = mongoose.connection.readyState === 1;

    res.status(connected ? 200 : 503).json({
        success: connected,
        message: connected
            ? "Stride API is healthy 🚀"
            : "Stride API is running, but MongoDB is disconnected",
        database: connected ? "connected" : "disconnected"
    });
});

// ======================================
// API ROUTES
// ======================================

app.use("/api/users", require("./routes/users"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/yoga", require("./routes/yoga"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/challenges", require("./routes/challenges"));
app.use("/api/events", require("./routes/events"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/ai", require("./ai api"));

// ======================================
// HOME
// ======================================

app.get("/", (req, res) => {
    res.json({
        message: "Stride API is running 🚀"
    });
});

// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// ======================================
// ERROR HANDLER
// ======================================

app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Stride server running on http://localhost:${PORT}`);
});
