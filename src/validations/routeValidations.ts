import joi from "joi"
import { Request, Response, NextFunction } from "express"
import { API_RESPONSE } from "../utils/response/response"
import Bus from "../models/Bus"
import Route from "../models/Route"

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

export const linkBusToRouteValidation = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    const schema = joi.object({
        busId: joi
            .string()
            .uuid({ version: "uuidv4" })
            .required(),
        routeId: joi
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
    const route = await Route.findByPk(req.body.routeId)

    if (!bus || !route)
        return res.status(404).send({
            success: false,
            message: !bus ? res.__("bus_not_found") : res.__("route_not_found"),
            status: 404,
        })

    return next()
}
