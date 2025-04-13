import mongoose from "mongoose";
const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    questions: [
      {
        question: {
          type: String,
          required: [true, "Please add a question"],
        },
        options: [
          {
            type: String,
            required: [true, "Please add an option"],
          },
        ],
        answer: {
          type: String,
          required: [true, "Please add an answer"],
        },
        description: {
          type: String,
          required: [true, "Please add a description"],
        },
      },
    ],
    image: {
      type: String,
      required: [true, "Please add an image"],
      default:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    },
    level: {
      type: String,
      required: [true, "Please add a level"],
    },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a User Name"],
    },
    duration: {
      type: Number,
      default: 10,
    },
    number:{
      type: Number,
      required: [true, "Please add a numbers of questions"],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Test", TestSchema);
