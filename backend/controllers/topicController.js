
const Topic = require("../models/Topic");

// GET /api/topics - Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: 1 });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch topics" });
  }
};

// GET /api/topics/:id - Get one topic
const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    res.status(500).json({ message: "Failed to fetch topic" });
  }
};

// POST /api/topics - Create a topic
const createTopic = async (req, res) => {
  try {
    const {
      title,
      description,
      explanation,
      studyMaterial,
      codeExample,
      output,
      points
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const topic = await Topic.create({
      title: title.trim(),
      description: description.trim(),
      explanation,
      studyMaterial,
      codeExample,
      output,
      points
    });

    res.status(201).json({
      message: "Topic created successfully",
      topic
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A topic with this title already exists"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to create topic" });
  }
};

// PUT /api/topics/:id - Update a topic
const updateTopic = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "explanation",
      "studyMaterial",
      "codeExample",
      "output",
      "points"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      ("title" in updates &&
        (typeof updates.title !== "string" || !updates.title.trim())) ||
      ("description" in updates &&
        (typeof updates.description !== "string" ||
          !updates.description.trim()))
    ) {
      return res.status(400).json({
        message: "Title and description cannot be empty"
      });
    }

    if (typeof updates.title === "string") {
      updates.title = updates.title.trim();
    }

    if (typeof updates.description === "string") {
      updates.description = updates.description.trim();
    }

    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({
      message: "Topic updated successfully",
      topic
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "A topic with this title already exists"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to update topic" });
  }
};

// DELETE /api/topics/:id - Delete a topic
const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    res.status(500).json({ message: "Failed to delete topic" });
  }
};

module.exports = {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic
};
