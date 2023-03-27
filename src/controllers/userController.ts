import { hashPassword } from "./../utils/passwords/hashPassword"
import { Request, Response } from "express"
import dotenv from "dotenv"
import UserModel from "../models/UserModel"
import { API_RESPONSE } from "../utils/response/response"
import { sendEmail } from "../utils/email/sendEmail"
dotenv.config()
export const createUser = async (req: Request, res: Response) => {
    const { email, role, firstName, lastName } = req.body

    const password: string = Math.random().toString(36).substring(2, 8)

    try {
        const userExists: UserModel | null = await findUserByEmail(email)

        if (userExists) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("user_exits_message"),
                status: 400,
            })
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await UserModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            role: role
        })
        const { ...rest } = newUser.toJSON()

        sendEmail(email, password, res)
        
        return API_RESPONSE(res, {
            success: true,
            message: res.__("user_created_message"),
            data: rest,
            status: 201,
        })

    } catch (error) {
        console.log(error)
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_create_user_message"),
            status: 400,
        })
    }
}

const findUserByEmail = async (email: string) => {
    try {
        const user: UserModel | null = await UserModel.findOne({
            where: {
                email: email,
            },
        })
        return user
    } catch (error) {
        return null
    }
}