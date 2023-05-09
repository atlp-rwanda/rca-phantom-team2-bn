import { Response, Request, NextFunction } from "express"
import Joi from "joi"
import Permission from "../models/Permission"
import Role from "../models/Role"
import User from "../models/User"

export const newRoleValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(200).required()
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
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(200).required()
    })
    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message.split("\"").join(""),
        status: 400
    })

    return next()
}

export const rolePermissionValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        roleId: Joi.string().uuid({version: "uuidv4"}).required(),
        permissionId: Joi.string().uuid({version: "uuidv4"}).required()
    })
    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message.split("\"").join(""),
        status: 400
    })

    const role = await Role.findByPk(req.body.roleId)
    const permission = await Permission.findByPk(req.body.permissionId)

    if(!role || !permission) return res.status(404).send({
        success: false,
        message: !role? res.__("role_not_found"):res.__("permission_not_found"),
        status: 404
    })

    return next()
}

export const grantRoleValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        roleId: Joi.string().uuid({version: "uuidv4"}).required(),
        userId: Joi.string().uuid({version: "uuidv4"}).required()
    })
    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message.split("\"").join(""),
        status: 400
    })

    const role = await Role.findByPk(req.body.roleId)
    const user = await User.findByPk(req.body.userId)

    if(!role || !user) return res.status(404).send({
        success: false,
        message: !role? res.__("role_not_found"):res.__("user_not_found_message"),
        status: 404
    })

    return next()
}