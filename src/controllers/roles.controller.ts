import { Response, Request } from "express"
import Role from "../models/Role"
import RolePermission from "../models/RolePermission"
import Paginator from "../utils/pagination/paginator"
import Joi from "joi"
import { API_RESPONSE } from "../utils/response/response"
import User from "../models/User"

export const registerRole = async (req: Request, res: Response)=> {
    const role = await Role.create({
        name: req.body.name,
        description: req.body.description
    })
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("role_created"),
        status: 201,
        data: role
    })
}

export const getAllRoles = async (req: Request, res: Response)=> {
    const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
    const paginator = new Paginator(Role)
    const results = await paginator.paginate({}, page, perPage)
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: results
    })
}

export const getRoleById = async (req: Request, res: Response)=> {
    if(Joi.string().uuid({version: "uuidv4"}).validate(req.params.roleId).error)
        return API_RESPONSE(res, {
            success: false,
            message: res.__("role_not_found"),
            err: res.__("role_not_found"),
            status: 404
        })
    const role = await Role.findByPk(req.params.roleId)
    if(!role) return API_RESPONSE(res, {
        success: false,
        message: res.__("role_not_found"),
        err: res.__("role_not_found"),
        status: 404
    })
    else return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: role
    })
}

export const updateRoleById = async (req: Request, res: Response)=> {
    const updateCount = await Role.update({
        name: req.body.name,
        description: req.body.description
    }, {
        where: { id: req.params.roleId }
    })

    if(updateCount[0] < 1) return API_RESPONSE(res, {
        success: false,
        message: res.__("role_not_found"),
        err: res.__("role_not_found"),
        status: 404
    })
    
    else return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: {count: updateCount[0]}
    })
}

export const deleteRoleById = async (req: Request, res: Response)=> {
    const deleteCount = await Role.destroy({where: {
        id: req.params.roleId
    }})
    if(deleteCount < 1) return API_RESPONSE(res, {
        success: false,
        message: res.__("role_not_found"),
        err: res.__("role_not_found"),
        status: 404
    })
    else return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: {count: deleteCount}
    })
}

export const grantRolePermission = async (req: Request, res: Response)=> {
    const rolePermission = await RolePermission.create(req.body)

    return API_RESPONSE(res, {
        success: true,
        status: 201,
        message: res.__("permission_granted"),
        data: rolePermission
    })
}

export const grantUserRole = async (req: Request, res: Response)=> {
    const [count] = await User.update(
        {roleId: req.body.roleId},
        {where: {id: req.body.userId}}
    )

    return API_RESPONSE(res, {
        success: true,
        status: 201,
        message: res.__("role_granted"),
        data: count
    })
}