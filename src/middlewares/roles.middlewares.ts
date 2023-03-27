import { Request, Response, NextFunction } from "express"
import { sequelize } from "../db/config"
import { ModelOperation } from "../enums/permissions.enums"

export const hasPermission = (operation: ModelOperation, modelName: string)=> {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!Object.keys(sequelize.models).includes(modelName)) return res.status(400).send({
            success: false,
            message: res.__("invalid_model_name"),
            status: 400
        })
        
        return next()
    }
}