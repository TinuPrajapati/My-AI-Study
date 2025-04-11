import mongoose from "mongoose";

const problem = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    level: { type: String, required: true },
    language: { type: String, required: true },
    createdBy: { type: String, required: true },
    title: {
      type: String,
      required: [true, "Please add Test Title"],
    },
    description: {
      type: String,
      required: [true, "Please add Test description"],
    },
    function_signature: {
      type: String,
      required: [true, "Please add test function signature"],
    },
    test_cases: [
      {
        Input:[{
          type:String
        }],
        Expected:{
          type:String
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problem);

export default Problem;
