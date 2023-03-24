import Joi from "joi"
import {Request, Response, NextFunction} from "express"
import { ModelOperation } from "../enums/permissions.enums"
import { sequelize } from "../db/config"

export const newPermissionValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().alphanum().min(3).max(200).required(),
        operations: Joi.array<string>().min(1).required(),
        modelName: Joi.string().alphanum().min(3).max(30).required()
    })
    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message.split("\"").join(""),
        status: 400
    })

    for(const operation of (req.body.operations as string[])){
        if(!Object.values(ModelOperation).includes(operation as ModelOperation)) 
            return res.status(400).send({
                success: false,
                message: res.__("invalid_operations"),
                status: 400
            })
    }

    if(!Object.keys(sequelize.models).includes(req.body.modelName)) 
        return res.status(400).send({
            success: false,
            message: res.__("invalid_model_name"),
            status: 400
        })
    return next()
}