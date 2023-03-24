import { sequelize, DataTypes } from "../db/config"
import Permission from "./Permission"
import RolePermission from "./RolePermission"

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" })


export default Role
