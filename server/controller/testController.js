import Test from "../models/testModel.js";
import { generateQuestions } from "../utils/generateQuestions.js";

export const createTest = async (req, res) => {
  const { userId } = req.user;
  const { topic, number, level, duration } = req.body;

  try {
    const obj = await generateQuestions(topic, number, level);
    const test = new Test({
      title: topic,
      questions: obj.questions,
      description: obj.description,
      createdBy: userId,
      level,
      duration,
      number,
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
    const { userId } = req.user;
    const tests = await Test.find({ createdBy: userId });
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
    res.status(200).json(test);
  } catch (error) {
    console.log("Error come in getTestById route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
