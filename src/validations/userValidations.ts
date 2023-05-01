import joi from "joi"
import { Request, Response, NextFunction } from "express"
import { API_RESPONSE } from "../utils/response/response"

export const signupValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        firstName: joi.string().alphanum().min(3).max(30).required(),
        lastName: joi.string().alphanum().min(3).max(30).required(),
        email: joi.string().email().required(),
        roleId: joi.string().uuid({version: "uuidv4"}).optional()
    })
    const { error } = schema.validate(req.body)

    if (error) {
        return API_RESPONSE(res, {
            success: false,
            message: error.details[0].message.split("\"").join(""),
            status: 400,
        })
    }

    return next()
}
