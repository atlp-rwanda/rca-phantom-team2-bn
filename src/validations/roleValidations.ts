import { Response, Request, NextFunction } from "express"
import Joi from "joi"

export const newRoleValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().alphanum().min(3).max(200).required()
    })
    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message.split("\"").join(""),
        status: 400
    })

    return next()
}

export const updateRoleValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().alphanum().min(3).max(200).required()
    })
    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message.split("\"").join(""),
        status: 400
    })

    return next()
}