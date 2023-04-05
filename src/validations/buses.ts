import { Request, NextFunction, Response } from "express"
import { API_RESPONSE } from "../utils/response/response"
import joi from "joi"

export const busValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        busId: joi.string().uuid({version: "uuidv4"}).optional(),
        type: joi.string().min(3).max(30).required(),
        plateNumber: joi.string().min(3).max(30).required(),
        regNumber: joi.string().min(3).max(30).required(),
        model: joi.string().min(3).max(30).required(),
        manufacturer: joi.string().min(3).max(30).required() 
    })
    
    const { error } = schema.validate(req.params.busId? {busId: req.params.busId, ...req.body}:req.body)

    if (error) {
        return API_RESPONSE(res, {
            success: false,
            message: error.details[0].message.split("\"").join(""),
            status: 400,
        })
    }

    return next()
}