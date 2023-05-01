import joi from "joi"
import { Request, Response, NextFunction } from "express"
import { API_RESPONSE } from "../utils/response/response"

export const createLocationValidation = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        name: joi.string().alphanum().min(3).max(50).required(),
        latitude: joi.number().required(),
        longitude: joi.number().required(),
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

export const updateLocationValidation = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        name: joi.string().alphanum().min(3).max(50),
        latitude: joi.number(),
        longitude: joi.number(),
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
