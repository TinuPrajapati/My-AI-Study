import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createProblem, getAllProblems, problem, checkProblem } from "../controller/problemController.js";

const problemRouter = express.Router();

problemRouter.post("/create", authMiddleware, createProblem);
problemRouter.post("/check", authMiddleware, checkProblem);
problemRouter.get("/all", authMiddleware, getAllProblems);  
problemRouter.get("/:id", authMiddleware, problem);  

export default problemRouter;