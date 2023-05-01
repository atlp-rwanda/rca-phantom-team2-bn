import express, { NextFunction, Request, Response } from "express"
import {
    createUser,
    signIn,
    logout,
    updateUserProfile,
    resetPasswordEmail,
    resetPassword,
} from "../controllers/userController"
import { ModelOperation } from "../enums/permissions.enums"
import { verifyToken } from "../middlewares/auth.middlewares"
import { hasPermission } from "../middlewares/roles.middlewares"
import { signupValidation } from "../validations/userValidations"

const userRouter = express.Router()

userRouter.post("/register", signupValidation, (req: Request, res: Response, next: NextFunction)=> {
    if(req.body.roleId) [verifyToken, hasPermission(ModelOperation.CREATE, "Role")]
        .forEach(fn=> !res.headersSent && fn(req, res, next, false))
    if(!res.headersSent) createUser(req, res)
})
userRouter.post("/signin", signIn)
userRouter.get("/logout", verifyToken, logout)
userRouter.put("/updateUser/:id", verifyToken, updateUserProfile)
userRouter.post("/forgot-password", resetPasswordEmail)
userRouter.post("/reset-password/:resetToken", resetPassword)

export default userRouter
