import { Model } from "sequelize"
import { sequelize, DataTypes } from "../db/config"
import Permission from "./Permission"
import Role from "./Role"

class RolePermission extends Model {
    declare id: string
    declare roleId: string
    declare permissionId: string
}

RolePermission.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Role,
            key: "id"
        }
    },
    permissionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Permission,
            key: "id"
        }
    }
},{
    sequelize: sequelize,
    timestamps: true,
    modelName: "RolePermission"
})


export default RolePermission