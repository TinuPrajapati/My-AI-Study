import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createNote, getAllNotes, deleteNote } from "../controller/notesController.js";

const notesRouter = express.Router();   

notesRouter.post("/create", authMiddleware, createNote);
notesRouter.get("/all", authMiddleware, getAllNotes);
notesRouter.delete("/:id", authMiddleware, deleteNote);

export default notesRouter;