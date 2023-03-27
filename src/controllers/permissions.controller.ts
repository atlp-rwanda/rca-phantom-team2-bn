import {Request, Response} from "express"
import { ModelOperation } from "../enums/permissions.enums"
import { sequelize } from "../db/config"
import Permission from "../models/Permission"

export const getSupportedOperations = (req: Request, res: Response)=> {
    return res.status(200).send({
        success: true,
        message: res.__("success"),
        status: 200,
        data: Object.values(ModelOperation)
    })
}

export const getAllModels = (req: Request, res: Response)=> {
    return res.status(200).send({
        success: true,
        message: res.__("success"),
        status: 200,
        data: Object.keys(sequelize.models)
    })
}

export const registerNewPermission = async (req: Request, res: Response)=> {
    const permission = await Permission.create(req.body)
    
    return res.status(201).send({
        success: true,
        message: res.__("permission_created"),
        status: 201,
        data: permission
    })
}