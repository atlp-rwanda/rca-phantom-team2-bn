import { Response, Request } from "express"
import Role from "../models/Role"
import RolePermission from "../models/RolePermission"
import Paginator from "../utils/pagination/paginator"

const paginator = new Paginator(Role)

export const registerRole = async (req: Request, res: Response)=> {
    const role = await Role.create({
        name: req.body.name,
        description: req.body.description
    })
    
    return res.status(201).send({
        success: true,
        message: res.__("role_created"),
        data: role
    })
}

export const getAllRoles = async (req: Request, res: Response)=> {
    const page = parseInt((String(req.query.page ? req.query.page : 1)))
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10)))
    const results = await paginator.paginate({}, page, perPage)
    
    return res.status(200).send({
        success: true,
        message: res.__("success"),
        status: 200,
        data: results
    })
}

export const getRoleById = async (req: Request, res: Response)=> {
    const role = await Role.findByPk(req.params.roleId)
    if(!role) return res.status(404).send({
        success: false,
        message: res.__("role_not_found"),
        status: 404
    })
    else return res.status(200).send({
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

    if(updateCount[0] < 1) return res.status(404).send({
        success: false,
        message: res.__("role_not_found"),
        status: 404
    })
    
    else return res.status(200).send({
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
    if(deleteCount < 1) return res.status(404).send({
        success: false,
        message: res.__("role_not_found"),
        status: 404
    })
    else return res.status(200).send({
        success: true,
        message: res.__("success"),
        status: 200,
        data: {count: deleteCount}
    })
}

export const grantRolePermission = async (req: Request, res: Response)=> {
    const rolePermission = await RolePermission.create(req.body)

    return res.status(201).send({
        success: true,
        message: res.__("permission_granted"),
        data: rolePermission
    })
}