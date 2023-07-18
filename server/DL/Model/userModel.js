const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permission: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImg: {
      type: String,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
    preferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
    userResults: [
      {
        userResult: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserResult",
        },
        exercise_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schemaUser);

