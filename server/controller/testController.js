import Test from "../models/testModel.js";
import checkQuizTopic from "../utils/generateQuestions.js";

export const createTest = async (req, res) => {
  const { userId } = req.user;
  const { topic, number, level, duration } = req.body;

  try {
    const obj = await checkQuizTopic(topic, number, level);
    // console.log(obj);
    if(obj.response === "Yes") {
      const test = new Test({
        title: topic,
        questions: obj.quiz.questions,
        description: obj.quiz.description,
        createdBy: userId,
        level,
        duration,
        number,
      });
      await test.save();
      res.status(201).json({ message: "Test Create Successfully" });
    }else{
      res.status(500).json({ message: "Please Enter Valid Topic" });
    }
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
