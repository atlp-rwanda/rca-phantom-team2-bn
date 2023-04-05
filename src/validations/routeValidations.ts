import joi from "joi"
import { Request, Response, NextFunction } from "express"
import { API_RESPONSE } from "../utils/response/response"

export const createRouteValidation = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        origin: joi.string().uuid({ version: "uuidv4" }).required(),
        destination: joi.string().uuid({ version: "uuidv4" }).required(),
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

export const updateRouteValidation = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        name: joi.string().alphanum().min(3).max(50),
        origin: joi.string().uuid({ version: "uuidv4" }),
        destination: joi.string().uuid({ version: "uuidv4" }),
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
