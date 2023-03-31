import { hashPassword } from "./../utils/passwords/hashPassword"
import { Request, Response } from "express"
import User from "../models/User"
import { API_RESPONSE } from "../utils/response/response"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendEmail } from "../utils/email/sendEmail"

export const createUser = async (req: Request, res: Response) => {
    const { email, roleId, firstName, lastName } = req.body

    const password: string = Math.random().toString(36).substring(2, 8)

    try {
        const userExists: User | null = await findUserById(email)

        if (userExists) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("user_exits_message"),
                status: 400,
            })
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            roleId: roleId,
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

const findUserById = async (email: string) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                email: email,
            },
        })
        return user
    } catch (error) {
        return null
    }
}

export const signIn = (req: Request, res: Response) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." })
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                })
            }

            const token = jwt.sign({ userId: user.id, roleId: user.roleId }, String(process.env.AUTH_KEY), {
                expiresIn: 86400, // 24 hours
            })

            const uObject = (({ id, firstName, lastName, email, roleId }) => ({
                id,
                firstName,
                lastName,
                email,
                roleId,
            }))(user)

            req.session.save()

            res.status(200).send({
                user: uObject,
                accessToken: token,
            })
        })
        .catch((err) => {
            res.status(500).send({ message: err.message })
        })
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        res.status(200).send("Logged out successfully")
    })
}


