
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const topicRoutes = require("./routes/topicRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AngularJS Learning Hub API is running!"
  });
});

// Topics API
app.use("/api/topics", topicRoutes);

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
