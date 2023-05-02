import { hashPassword } from "./../utils/passwords/hashPassword"
import { generateResetToken } from "./../utils/passwords/resetToken"
import { Request, Response } from "express"
import dotenv from "dotenv"
import User from "../models/User"
import { API_RESPONSE } from "../utils/response/response"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendEmail, sendResetPasswordEmail } from "../utils/email/sendEmail"
import Paginator from "../utils/pagination/paginator"

dotenv.config()

export const getAllUsers = async (req: Request, res: Response) => {
    const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
    const paginator = new Paginator(User)

    const results = await paginator.paginate({}, page, perPage)
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: results
    })
}

export const createUser = async (req: Request, res: Response) => {
    const { email, roleId, firstName, lastName } = req.body

    const password: string = Math.random().toString(36).substring(2, 8)

    try {
        const userExists: User | null = await findUserByEmail(email)

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
            ...(roleId? {roleId: roleId}:{})
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
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_create_user_message"),
            status: 400,
        })
    }
}

const findUserByEmail = async (email: string) => {
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
                return API_RESPONSE(res, {
                    success: true,
                    message: res.__("user_not_found_message"),
                    data: {},
                    status: 404,
                })
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordIsValid) {
                return API_RESPONSE(res, {
                    success: false,
                    message: res.__("invalid_password_message"),
                    status: 401,
                })
            }

            const token = jwt.sign(
                { userId: user.id, roleId: user.roleId },
                String(process.env.AUTH_KEY),
                {
                    expiresIn: 86400, // 24 hours
                }
            )

            const uObject = (({ id, firstName, lastName, email, roleId }) => ({
                id,
                firstName,
                lastName,
                email,
                roleId,
            }))(user)

            return API_RESPONSE(res, {
                success: true,
                message: res.__("signin_successful_message"),
                data: { uObject, accessToken: token },
                status: 200,
            })
        })
        .catch((err) => {
            console.log("ERROR: ", err.message)
            return API_RESPONSE(res, {
                success: false,
                message: res.__("failed_to_sign_in_message"),
                status: 400,
            })
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

export const updateUserProfile = async (req: Request, res: Response) => {
    const { email, firstName, lastName, roleId } = req.body

    try {
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("user_not_found_message"),
                status: 404,
            })
        }

        user.email = email || user.email
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName

        user.roleId = roleId || user.roleId

        await user.save()

        const { ...rest } = user.toJSON()

        return API_RESPONSE(res, {
            success: true,
            message: res.__("user_updated_message"),
            data: rest,
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_update_user_message"),
            status: 400,
        })
    }
}


export const resetPasswordEmail = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const {resetToken, resetTokenExpiration} = generateResetToken()

        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetTokenExpiration
        await user.save()
        sendResetPasswordEmail(email, resetToken)

        return API_RESPONSE(res, {
            success: true,
            message: res.__("reset_password_email_sent"),
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return API_RESPONSE(res, {
            success: true,
            message: res.__("reset_password_email_fail"),
            status: 500,
        })
    }
}

const findUserByResetToken = async (token: string) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                resetPasswordToken: token,
            },
        })
        return user
    } catch (error) {
        return null
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const resetToken = req.params.resetToken
    const { newPassword } = req.body

    try {
        const user = await findUserByResetToken(resetToken)
        if (!user) {
            return API_RESPONSE(res, {
                success: true,
                message: res.__("invalid_or_expired_token"),
                status: 404,
            })
        }

        const expirationDate = user.dataValues.resetPasswordExpires

        if (expirationDate.getTime() < Date.now()) {
            return API_RESPONSE(res, {
                success: true,
                message: res.__("invalid_or_expired_token"),
                status: 404,
            })
        }

        const hashedPassword = await hashPassword(newPassword)
        user.password = hashedPassword
    
        await user.save()

        return API_RESPONSE(res, {
            success: true,
            message: res.__("user_password_updated"),
            status: 200,
        })
    } catch (error) {
        console.error(error)
        return API_RESPONSE(res, {
            success: true,
            message: res.__("failed_password_update"),
            status: 500,
        })
    }
}