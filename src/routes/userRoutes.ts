import express from "express"
import { createUser } from "../controllers/userController"
import { signupValidation } from "../validations/userValidations"

const userRouter = express.Router()

userRouter.post("/register", signupValidation, createUser)

export default userRouter