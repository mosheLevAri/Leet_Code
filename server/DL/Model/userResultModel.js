const mongoose = require("mongoose");


const userResultSchema = new mongoose.Schema(
    {
      answer: {
        type: String,
        required: true,
      },
      creationTime: {
        type: Date,
        default: Date.now,
      },
      duration: {
        type: Number,
      },
      feedback: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
module.exports = mongoose.model("UserResult", userResultSchema);

