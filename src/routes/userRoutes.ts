import express from "express"
import { createUser, signIn, logout, updateUserProfile, resetPasswordEmail, resetPassword } from "../controllers/userController"
import { verifyToken } from "../middlewares/auth.middlewares"
import { signupValidation } from "../validations/userValidations"

const userRouter = express.Router()

userRouter.post("/register", signupValidation, createUser)
userRouter.post("/signin", signIn)
userRouter.get("/logout", verifyToken, logout)
userRouter.put("/updateUser/:id", updateUserProfile)
userRouter.post("/forgot-password", resetPasswordEmail)
userRouter.post("/reset-password/:resetToken", resetPassword)

export default userRouter
