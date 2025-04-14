import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        type: Number,
        required: true,
      },
    ],
    completeTime: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Record = mongoose.model("Record", recordSchema);
