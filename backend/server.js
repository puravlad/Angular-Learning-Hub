require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const topicRoutes = require("./routes/topicRoutes");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "AngularJS Learning Hub API is running!" });
});

// API routes
app.use("/api/topics", topicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();