import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", noteSchema);
export default Notes;
