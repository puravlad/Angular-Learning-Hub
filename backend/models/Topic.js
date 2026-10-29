
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    explanation: {
      type: String,
      default: ""
    },
    studyMaterial: {
      type: String,
      default: ""
    },
    codeExample: {
      type: String,
      default: ""
    },
    output: {
      type: String,
      default: ""
    },
    points: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
