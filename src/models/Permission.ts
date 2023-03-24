import { sequelize, DataTypes } from "../db/config"
import Role from "./Role"
import RolePermission from "./RolePermission"

const Permission = sequelize.define("Permission", {
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

Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" })

export default Permission