import express from "express"
import { createUser, signIn } from "../controllers/userController"
import { signupValidation } from "../validations/userValidations"

const userRouter = express.Router()

userRouter.post("/register", signupValidation, createUser)
userRouter.post("/signin", signIn)

export default userRouter
