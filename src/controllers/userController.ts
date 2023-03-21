import { hashPassword } from "./../utils/passwords/hashPassword"
import { Request, Response } from "express"
import nodemailer from "nodemailer"
import UserModel from "../model/UserModel"
import { API_RESPONSE } from "../utils/response/response"
export const createUser = async (req: Request, res: Response) => {
    const { email, role, firstName, lastName } = req.body

    const password: string = Math.random().toString(36).substring(2, 8)

    try {
        const userExists: UserModel | null = await findUserById(email)

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
        const { password: _, ...rest } = newUser.toJSON()


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: res.__("login_credentials_message"),
            text: `${res.__("your_login_credentials_message")}.\nEmail: ${email}\nPassword: ${password}`,
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Email sent: ${info.response}`)
            }
        })
        
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

const findUserById = async (email: string) => {
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