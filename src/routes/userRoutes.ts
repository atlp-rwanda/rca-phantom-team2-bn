import express from "express";
import { createUser, signIn, logout } from "../controllers/userController";
import { signupValidation } from "../validations/userValidations";

const userRouter = express.Router();

userRouter.post("/register", signupValidation, createUser);
userRouter.post("/signin", signIn);
userRouter.post("/logout", logout);

export default userRouter;
