
const express = require("express");
const router = express.Router();

const {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic
} = require("../controllers/topicController");

router.get("/", getTopics);
router.get("/:id", getTopicById);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
