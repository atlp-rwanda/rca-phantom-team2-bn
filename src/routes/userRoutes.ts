import express from "express";
import { createUser, signIn, logout, resetPassword } from "../controllers/userController";
import { signupValidation } from "../validations/userValidations";
import authJwt from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", signupValidation, createUser);
userRouter.post("/signin", signIn);
userRouter.get("/logout", authJwt.verifyToken, logout);
userRouter.post("/reset-password", resetPassword)

export default userRouter;
