import { sequelize, DataTypes } from "../db/config"
import Permission from "./Permission"
import Role from "./Role"

const RolePermission = sequelize.define("roles", {
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
    timestamps: true
})


export default RolePermission