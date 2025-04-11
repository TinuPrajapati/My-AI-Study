import Test from "../models/testModel.js";
import { User } from "../models/userModels.js";
import { generateQuestions } from "../utils/generateQuestions.js";

export const createTest = async (req, res) => {
  const { userId } = req.user;
  const { topic, number, level, duration } = req.body;

  try {
    const obj = await generateQuestions(topic, number, level);
    const user = await User.findById(userId);
    const test = new Test({
      title: topic,
      questions: obj.questions,
      description: obj.description,
      createdBy: user.name,
      level,
      duration,
      number
    });
    await test.save();
    res.status(201).json({ message: "Test Create Successfully" });
  } catch (error) {
    console.log("Error come in createTest route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json({ tests });
  } catch (error) {
    console.log("Error come in getAllTests route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    res.status(200).json({ test });
  } catch (error) {
    console.log("Error come in getTestById route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
