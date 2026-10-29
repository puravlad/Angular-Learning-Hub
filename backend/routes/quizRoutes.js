const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  saveQuizAttempt,
  getMyQuizAttempts,
} = require("../controllers/quizController");

router.post("/attempts", protect, saveQuizAttempt);
router.get("/attempts", protect, getMyQuizAttempts);

module.exports = router;