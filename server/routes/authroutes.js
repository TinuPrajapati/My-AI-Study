import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { register, login, logout, checkUser, getAllUsers } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/check-user", authMiddleware, checkUser);
authRoutes.get("/all-users", authMiddleware, getAllUsers);

export default authRoutes;
