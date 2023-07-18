const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    question: {
      details: {
        type: String,
        required: true,
      },
      exemplesCode:[{
        type: String,
      }],
      tags: [String],

      solution: {
        type: String,
      },
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["draft", "publish", "deleted"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

