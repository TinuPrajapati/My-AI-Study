import Problem from "../models/problemModel.js";
import {User} from "../models/userModels.js";
import checkTest from "../utils/checkProblem.js";
import generateTest from "../utils/generateProblem.js";

const createProblem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { topic, level, language } = req.body;
    const user = await User.findById(userId);
    const problem = await generateTest(req.body);
    const newProblem = await new Problem({ ...problem,topic, level, language, createdBy: user.name });
    newProblem.save();
    res.status(201).json({ message: "Problem Create Successfully" });
  } catch (error) {
    console.log("Error come in createProblem route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json({ problems });
  } catch (error) {
    console.log("Error come in createProblem route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const problem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    res.status(200).json({ problem });
  } catch (error) {
    console.log("Error come in createProblem route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkProblem = async (req, res) => {
  try {
    // const { code } = req.body;
    const result = await checkTest(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error come in createProblem route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export { createProblem, getAllProblems, problem,checkProblem };
