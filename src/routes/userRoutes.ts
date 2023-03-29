import express from "express"
import { createUser, signIn, logout } from "../controllers/userController"
import { verifyToken } from "../middlewares/auth.middlewares"
import { signupValidation } from "../validations/userValidations"

const userRouter = express.Router()

userRouter.post("/register", signupValidation, createUser)
userRouter.post("/signin", signIn)
userRouter.get("/logout", verifyToken, logout)

export default userRouter
