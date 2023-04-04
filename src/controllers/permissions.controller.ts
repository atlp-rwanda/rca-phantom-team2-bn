import {Request, Response} from "express"
import { ModelOperation } from "../enums/permissions.enums"
import { sequelize } from "../db/config"
import Permission from "../models/Permission"
import Paginator from "../utils/pagination/paginator"
import { API_RESPONSE } from "../utils/response/response"

export const getSupportedOperations = (req: Request, res: Response)=> {
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: Object.values(ModelOperation)
    })
}

export const getAllModels = (req: Request, res: Response)=> {
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: Object.keys(sequelize.models)
    })
}

export const registerNewPermission = async (req: Request, res: Response)=> {
    const permission = await Permission.create(req.body)
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("permission_created"),
        status: 201,
        data: permission
    })
}

export const getAllPermissions = async (req: Request, res: Response)=> {
    const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
    const paginator = new Paginator(Permission)

    const results = await paginator.paginate({}, page, perPage)
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: results
    })
}