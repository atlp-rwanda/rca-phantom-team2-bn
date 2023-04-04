import { Response, NextFunction } from "express"
import { IRequest } from "../../types"
import { Op } from "sequelize"
import { sequelize } from "../db/config"
import { ModelOperation } from "../enums/permissions.enums"
import Permission from "../models/Permission"
import RolePermission from "../models/RolePermission"

export const hasPermission = (operation: ModelOperation, modelName: string) => {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        if (!req.auth)
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
                status: 401,
            })
        if (!Object.keys(sequelize.models).includes(modelName))
            return res.status(400).send({
                success: false,
                message: res.__("invalid_model_name"),
                status: 400,
            })

        const rolePermissions = await RolePermission.findAll({
            where: { roleId: req.auth.roleId },
        })
        const permissions = await Permission.count({
            where: {
                id: {
                    [Op.in]: rolePermissions.map(
                        (rolePermission) => rolePermission.permissionId
                    ),
                },
                operations: { [Op.contains]: [operation] },
                modelName: modelName,
            },
        })

        if (permissions < 1)
            return res.status(403).send({
                success: false,
                message: "Forbidden",
                status: 403,
            })
        return next()
    }
}
