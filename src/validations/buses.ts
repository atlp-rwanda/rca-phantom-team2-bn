import { Request, NextFunction, Response } from "express"
import { API_RESPONSE } from "../utils/response/response"
import joi from "joi"
import User from "../models/User"
import Bus from "../models/Bus"

export const busValidation = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        busId: joi
            .string()
            .uuid({ version: "uuidv4" })
            .optional(),
        type: joi
            .string()
            .min(3)
            .max(30)
            .required(),
        plateNumber: joi
            .string()
            .min(3)
            .max(30)
            .required(),
        regNumber: joi
            .string()
            .min(3)
            .max(30)
            .required(),
        model: joi
            .string()
            .min(3)
            .max(30)
            .required(),
        manufacturer: joi
            .string()
            .min(3)
            .max(30)
            .required(),
        numOfSeats: joi.number().min(1).required(),
        availbleSeats: joi.number().min(0).required(),
        status: joi.string().min(3).required()
    })

    const { error } = schema.validate(
        req.params.busId ? { busId: req.params.busId, ...req.body } : req.body
    )

    if (error) {
        return API_RESPONSE(res, {
            success: false,
            message: error.details[0].message.split("\"").join(""),
            status: 400,
        })
    }

    return next()
}

export const assignValidation = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        busId: joi
            .string()
            .uuid({ version: "uuidv4" })
            .required(),
        driverId: joi
            .string()
            .uuid({ version: "uuidv4" })
            .required(),
    })
    const { error } = schema.validate(req.body)

    if (error)
        return res.status(400).send({
            success: false,
            message: error.details[0].message.split("\"").join(""),
            status: 400,
        })

    const bus = await Bus.findByPk(req.body.busId)
    const driverId = await User.findByPk(req.body.driverId)

    if (!bus || !driverId)
        return res.status(404).send({
            success: false,
            message: !bus ? res.__("bus_not_found") : res.__("user_not_found"),
            status: 404,
        })

    return next()
}
